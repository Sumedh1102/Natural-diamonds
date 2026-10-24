/**
 * Slims the source diamond model down to what the homepage hero needs.
 *
 *   node tools/diamond-model/optimize.mjs
 *
 * The hero shades the stone procedurally (see src/components/home/diamond-scene.ts),
 * so only the shape is kept: node transforms are baked in, vertices are welded,
 * degenerate triangles dropped, and the textures, normals and UV sets removed.
 * The stone is centred and scaled to a unit bounding sphere, and the planes of
 * its convex hull, which the shader traces light against, are stored in
 * meshes[0].extras.hullPlanes as [nx, ny, nz, d] (n · p = d on the plane).
 * The attribution in asset.extras is carried over.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("./diamond-source.glb", import.meta.url));
const target = fileURLToPath(new URL("../../public/models/diamond.glb", import.meta.url));

function readGlb(path) {
  const buf = readFileSync(path);
  if (buf.toString("ascii", 0, 4) !== "glTF") throw new Error(`${path} is not a GLB file`);
  const jsonLength = buf.readUInt32LE(12);
  const json = JSON.parse(buf.toString("utf8", 20, 20 + jsonLength));
  const binStart = 20 + jsonLength + 8;
  const bin = buf.subarray(binStart, binStart + buf.readUInt32LE(20 + jsonLength));
  return { json, bin };
}

const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const ARRAYS = { 5121: Uint8Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };

function readAccessor({ json, bin }, index) {
  const accessor = json.accessors[index];
  const view = json.bufferViews[accessor.bufferView];
  const Type = ARRAYS[accessor.componentType];
  const size = COMPONENTS[accessor.type];
  const stride = (view.byteStride ?? size * Type.BYTES_PER_ELEMENT) / Type.BYTES_PER_ELEMENT;
  const viewStart = bin.byteOffset + (view.byteOffset ?? 0);
  const all = new Type(bin.buffer.slice(viewStart + (accessor.byteOffset ?? 0), viewStart + view.byteLength));
  const out = [];
  for (let i = 0; i < accessor.count; i++) out.push(Array.from(all.subarray(i * stride, i * stride + size)));
  return out;
}

// Column-major 4x4 helpers.
const identity = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function multiply(a, b) {
  const out = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) out[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return out;
}
function nodeMatrix(node) {
  if (node.matrix) return node.matrix;
  const [x, y, z, w] = node.rotation ?? [0, 0, 0, 1];
  const [sx, sy, sz] = node.scale ?? [1, 1, 1];
  const [tx, ty, tz] = node.translation ?? [0, 0, 0];
  return [
    (1 - 2 * (y * y + z * z)) * sx, 2 * (x * y + z * w) * sx, 2 * (x * z - y * w) * sx, 0,
    2 * (x * y - z * w) * sy, (1 - 2 * (x * x + z * z)) * sy, 2 * (y * z + x * w) * sy, 0,
    2 * (x * z + y * w) * sz, 2 * (y * z - x * w) * sz, (1 - 2 * (x * x + y * y)) * sz, 0,
    tx, ty, tz, 1,
  ];
}
const transform = (m, [x, y, z]) => [0, 1, 2].map((r) => m[r] * x + m[4 + r] * y + m[8 + r] * z + m[12 + r]);

const glb = readGlb(source);
const { json } = glb;

// Collect every triangle in world space.
const triangles = [];
function visit(index, parent) {
  const node = json.nodes[index];
  const world = multiply(parent, nodeMatrix(node));
  if (node.mesh !== undefined) {
    for (const primitive of json.meshes[node.mesh].primitives) {
      if ((primitive.mode ?? 4) !== 4) continue;
      const positions = readAccessor(glb, primitive.attributes.POSITION).map((p) => transform(world, p));
      const indices = primitive.indices !== undefined ? readAccessor(glb, primitive.indices).map(([i]) => i) : positions.map((_, i) => i);
      for (let i = 0; i < indices.length; i += 3) triangles.push([positions[indices[i]], positions[indices[i + 1]], positions[indices[i + 2]]]);
    }
  }
  for (const child of node.children ?? []) visit(child, world);
}
for (const root of json.scenes[json.scene ?? 0].nodes) visit(root, identity());

// Weld vertices and drop degenerate triangles.
const vertices = [];
const lookup = new Map();
const weld = (p) => {
  const key = p.map((v) => Math.round(v * 1e5)).join(",");
  if (!lookup.has(key)) {
    lookup.set(key, vertices.length);
    vertices.push(p);
  }
  return lookup.get(key);
};
const sub = (a, b) => a.map((v, i) => v - b[i]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const indices = [];
let dropped = 0;
for (const [a, b, c] of triangles) {
  const area = Math.hypot(...cross(sub(b, a), sub(c, a))) / 2;
  const tri = [weld(a), weld(b), weld(c)];
  if (area < 1e-6 || new Set(tri).size < 3) {
    dropped++;
    continue;
  }
  indices.push(...tri);
}

// Centre on the bounding box and scale to a unit bounding sphere.
const centre = [0, 1, 2].map((i) => (Math.min(...vertices.map((v) => v[i])) + Math.max(...vertices.map((v) => v[i]))) / 2);
const radius = Math.max(...vertices.map((v) => Math.hypot(...sub(v, centre))));
for (const v of vertices) v.splice(0, 3, ...sub(v, centre).map((x) => x / radius));

// Outward winding, so the hero can cull back faces (the stone is star-shaped about its centre).
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
let flipped = 0;
for (let i = 0; i < indices.length; i += 3) {
  const [a, b, c] = [indices[i], indices[i + 1], indices[i + 2]].map((k) => vertices[k]);
  if (dot(cross(sub(b, a), sub(c, a)), [0, 1, 2].map((k) => (a[k] + b[k] + c[k]) / 3)) < 0) {
    [indices[i + 1], indices[i + 2]] = [indices[i + 2], indices[i + 1]];
    flipped++;
  }
}

// Convex hull planes by brute force (fine for a few hundred vertices), merging near-duplicates.
const planes = [];
for (let i = 0; i < vertices.length; i++) {
  for (let j = i + 1; j < vertices.length; j++) {
    for (let k = j + 1; k < vertices.length; k++) {
      let n = cross(sub(vertices[j], vertices[i]), sub(vertices[k], vertices[i]));
      const length = Math.hypot(...n);
      if (length < 1e-6) continue;
      n = n.map((x) => x / length);
      let d = dot(n, vertices[i]);
      if (d < 0) [n, d] = [n.map((x) => -x), -d];
      if (vertices.some((v) => dot(n, v) > d + 1e-5)) continue;
      if (planes.some((p) => Math.abs(p[0] - n[0]) + Math.abs(p[1] - n[1]) + Math.abs(p[2] - n[2]) < 1e-3 && Math.abs(p[3] - d) < 1e-3)) continue;
      planes.push([...n, d]);
    }
  }
}

const positions = new Float32Array(vertices.flat());
const indexArray = vertices.length > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);
const indexBytes = Math.ceil(indexArray.byteLength / 4) * 4;
const bin = Buffer.alloc(indexBytes + positions.byteLength);
Buffer.from(indexArray.buffer).copy(bin, 0);
Buffer.from(positions.buffer).copy(bin, indexBytes);

// Bounds must match the stored float32 values exactly.
const stored = (axis) => positions.filter((_, i) => i % 3 === axis);
const min = [0, 1, 2].map((axis) => Math.min(...stored(axis)));
const max = [0, 1, 2].map((axis) => Math.max(...stored(axis)));
const out = {
  asset: { version: "2.0", generator: "tools/diamond-model/optimize.mjs", extras: json.asset.extras },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ name: "Diamond", mesh: 0 }],
  meshes: [
    {
      name: "Diamond",
      primitives: [{ attributes: { POSITION: 1 }, indices: 0, mode: 4 }],
      extras: { hullPlanes: planes.flat().map((x) => Math.round(x * 1e6) / 1e6) },
    },
  ],
  accessors: [
    { bufferView: 0, componentType: indexArray instanceof Uint16Array ? 5123 : 5125, count: indexArray.length, type: "SCALAR" },
    { bufferView: 1, componentType: 5126, count: vertices.length, type: "VEC3", min, max },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: indexArray.byteLength, target: 34963 },
    { buffer: 0, byteOffset: indexBytes, byteLength: positions.byteLength, target: 34962 },
  ],
  buffers: [{ byteLength: bin.length }],
};

let jsonChunk = Buffer.from(JSON.stringify(out));
jsonChunk = Buffer.concat([jsonChunk, Buffer.alloc((4 - (jsonChunk.length % 4)) % 4, 0x20)]);
const header = Buffer.alloc(12);
header.write("glTF", 0, "ascii");
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + bin.length, 8);
const chunk = (data, type) => {
  const head = Buffer.alloc(8);
  head.writeUInt32LE(data.length, 0);
  head.write(type, 4, "ascii");
  return Buffer.concat([head, data]);
};
writeFileSync(target, Buffer.concat([header, chunk(jsonChunk, "JSON"), chunk(bin, "BIN\0")]));

console.log(`${triangles.length - dropped} triangles (${dropped} degenerate dropped, ${flipped} rewound), ${vertices.length} vertices`);
console.log(`${planes.length} hull planes`);
console.log(`wrote ${target} (${(12 + 8 + jsonChunk.length + 8 + bin.length).toLocaleString()} bytes)`);
