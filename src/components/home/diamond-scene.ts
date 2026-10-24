/*
 * WebGL2 renderer for the rotating hero diamond. Loaded on demand by HeroDiamond.
 *
 * The model (public/models/diamond.glb, made by tools/diamond-model) carries the
 * stone's shape and the planes of its convex hull. Each pixel of the stone traces
 * light through it: reflection and refraction at the facet it lands on, then up to
 * BOUNCES internal reflections against the hull planes, with total internal
 * reflection and a little dispersion on the way out. The studio lighting it
 * reflects is analytic, so nothing but the model is downloaded.
 */

export type DiamondScene = {
  /** Size in CSS pixels; the drawing buffer follows the device pixel ratio, within a pixel budget. */
  resize(width: number, height: number, pixelRatio: number): void;
  /** Draws the stone at the given point of its rotation, in seconds. */
  render(time: number): void;
  dispose(): void;
};

type Model = {
  positions: Float32Array;
  indices: Uint16Array | Uint32Array;
  /** [nx, ny, nz, d] per hull plane. */
  planes: Float32Array;
};

const BOUNCES = 5;
/** Upper bound on drawing-buffer pixels: the stone is fragment-bound. */
const PIXEL_BUDGET = 900_000;
const FOV = (24 * Math.PI) / 180;
/** Tips the table towards the viewer. */
const TILT = 0.42;
/** One turn every ~20 seconds. */
const SPIN_SPEED = 0.32;

const vertexShader = /* glsl */ `#version 300 es
in vec3 position;
uniform mat3 uRotation;
uniform mat4 uViewProjection;
out vec3 vPosition;

void main() {
  vPosition = position;
  gl_Position = uViewProjection * vec4(uRotation * position, 1.0);
}`;

const fragmentShader = (planeCount: number) => /* glsl */ `#version 300 es
precision highp float;

#define PLANES ${planeCount}
#define BOUNCES ${BOUNCES}

uniform vec4 uPlanes[PLANES];
// Equal to PLANES; a uniform bound keeps drivers from unrolling the loop, which can stall compilation.
uniform int uPlaneCount;
uniform vec3 uEye;
uniform mat3 uRotation;
in vec3 vPosition;
out vec4 fragColor;

const float IOR = 2.42;
// Diamond disperses about 0.044 across the visible range; a touch more reads as fire at this size.
const float DISPERSION = 0.03;
const float R0 = 0.1724; // ((IOR - 1) / (IOR + 1))^2
// A little under 1, so the stone sits in the dusk scene rather than glaring out of it.
const float EXPOSURE = 0.85;

float fresnel(float cosTheta) {
  return R0 + (1.0 - R0) * pow(1.0 - cosTheta, 5.0);
}

// Tall softbox at the given azimuth (unit xz direction), spanning heights y0..y1.
float strip(vec3 d, vec2 azimuth, float halfWidth, float y0, float y1) {
  float horizontal = length(d.xz);
  if (horizontal < 1e-3) return 0.0;
  float across = dot(d.xz / horizontal, azimuth);
  return smoothstep(cos(halfWidth * 1.4), cos(halfWidth), across) * smoothstep(y0 - 0.06, y0, d.y) * (1.0 - smoothstep(y1, y1 + 0.06, d.y));
}

float disc(vec3 d, vec3 centre, float cosRadius, float softness) {
  return smoothstep(cosRadius - softness, cosRadius, dot(d, centre));
}

// Studio environment in world space: a dark room with soft white light, a few warm bronze panels
// (echoing the dusk sky behind the stone) and pin lights that make the facets flash as it turns.
vec3 environment(vec3 d) {
  vec3 colour = vec3(0.012) + vec3(0.035, 0.032, 0.03) * max(d.y, 0.0) + vec3(0.06, 0.036, 0.02) * exp(-abs(d.y) * 7.0);
  colour += vec3(2.6) * disc(d, vec3(0.0, 1.0, 0.0), 0.86, 0.04);
  colour += vec3(1.7) * disc(d, normalize(vec3(0.0, 0.62, 1.0)), 0.95, 0.03);
  colour += vec3(5.0) * strip(d, normalize(vec2(-0.92, 0.38)), 0.09, -0.25, 0.7);
  colour += vec3(4.6, 4.4, 4.1) * strip(d, normalize(vec2(0.95, -0.3)), 0.08, -0.15, 0.75);
  colour += vec3(2.2) * strip(d, normalize(vec2(0.42, 1.0)), 0.16, -0.05, 0.45);
  colour += vec3(2.2) * strip(d, normalize(vec2(-0.5, 1.0)), 0.14, 0.05, 0.5);
  colour += vec3(3.2, 2.2, 1.45) * strip(d, normalize(vec2(0.35, -1.0)), 0.22, -0.3, 0.05);
  colour += vec3(2.6, 1.8, 1.2) * strip(d, normalize(vec2(-0.8, -0.6)), 0.18, -0.25, 0.08);
  colour += vec3(18.0) * disc(d, normalize(vec3(0.62, 0.55, 0.56)), 0.9993, 0.0004);
  colour += vec3(18.0) * disc(d, normalize(vec3(-0.7, 0.62, 0.35)), 0.9993, 0.0004);
  colour += vec3(16.0) * disc(d, normalize(vec3(-0.3, 0.72, -0.62)), 0.9993, 0.0004);
  colour += vec3(16.0) * disc(d, normalize(vec3(0.45, 0.8, -0.4)), 0.9993, 0.0004);
  colour += vec3(14.0) * disc(d, normalize(vec3(0.1, 0.42, 0.9)), 0.9993, 0.0004);
  return colour;
}

vec3 sampleEnvironment(vec3 objectDirection) {
  return environment(uRotation * objectDirection);
}

// Narkowicz's ACES fit.
vec3 toneMap(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  // Flat facet normal, outward.
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  vec3 view = normalize(vPosition - uEye);
  if (dot(normal, view) > 0.0) normal = -normal;

  float reflectance = fresnel(clamp(dot(-view, normal), 0.0, 1.0));
  vec3 colour = sampleEnvironment(reflect(view, normal)) * reflectance;

  vec3 position = vPosition;
  vec3 direction = refract(view, normal, 1.0 / IOR);
  float energy = 1.0 - reflectance;

  for (int bounce = 0; bounce < BOUNCES; bounce++) {
    // The stone is convex: the ray leaves through the nearest plane it is heading towards.
    float travel = 1e4;
    vec3 exitNormal = vec3(0.0, 1.0, 0.0);
    for (int i = 0; i < uPlaneCount; i++) {
      vec4 plane = uPlanes[i];
      float approach = dot(direction, plane.xyz);
      if (approach > 1e-5) {
        float t = (plane.w - dot(position, plane.xyz)) / approach;
        if (t > 1e-4 && t < travel) {
          travel = t;
          exitNormal = plane.xyz;
        }
      }
    }
    if (travel > 10.0) break;
    position += direction * travel;

    vec3 exitDirection = refract(direction, -exitNormal, IOR);
    if (dot(exitDirection, exitDirection) > 0.0) {
      float internal = fresnel(clamp(dot(exitDirection, exitNormal), 0.0, 1.0));
      vec3 red = refract(direction, -exitNormal, IOR - DISPERSION);
      vec3 blue = refract(direction, -exitNormal, IOR + DISPERSION);
      if (dot(blue, blue) == 0.0) blue = exitDirection;
      vec3 transmitted = vec3(sampleEnvironment(red).r, sampleEnvironment(exitDirection).g, sampleEnvironment(blue).b);
      colour += energy * (1.0 - internal) * transmitted;
      energy *= internal;
    }
    // Otherwise total internal reflection keeps all of it inside.
    direction = reflect(direction, -exitNormal);
    if (energy < 0.01) break;
  }
  colour += energy * sampleEnvironment(direction);

  fragColor = vec4(pow(toneMap(colour * EXPOSURE), vec3(1.0 / 2.2)), 1.0);
}`;

/* ---------------------------------------------------------------------------------------------- */

let modelRequest: Promise<Model> | undefined;

function loadModel(url: string) {
  modelRequest ??= fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Diamond model: HTTP ${response.status}`);
      return response.arrayBuffer();
    })
    .then(parseModel)
    .catch((error: unknown) => {
      modelRequest = undefined;
      throw error;
    });
  return modelRequest;
}

type GltfJson = {
  accessors: { bufferView: number; byteOffset?: number; componentType: number; count: number; type: string }[];
  bufferViews: { byteOffset?: number }[];
  meshes: { primitives: { attributes: { POSITION: number }; indices: number }[]; extras?: { hullPlanes?: number[] } }[];
};

/** Reads the GLB written by tools/diamond-model: one indexed mesh with hull planes in its extras. */
function parseModel(buffer: ArrayBuffer): Model {
  const view = new DataView(buffer);
  if (view.getUint32(0, true) !== 0x46546c67) throw new Error("Diamond model: not a GLB file");
  const jsonLength = view.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, jsonLength))) as GltfJson;
  const binary = 20 + jsonLength + 8;

  const accessor = (index: number) => {
    const { bufferView, byteOffset = 0, componentType, count, type } = json.accessors[index];
    const offset = binary + (json.bufferViews[bufferView].byteOffset ?? 0) + byteOffset;
    const length = count * (type === "VEC3" ? 3 : 1);
    if (componentType === 5126) return new Float32Array(buffer, offset, length);
    if (componentType === 5125) return new Uint32Array(buffer, offset, length);
    if (componentType === 5123) return new Uint16Array(buffer, offset, length);
    throw new Error("Diamond model: unsupported accessor");
  };

  const [mesh] = json.meshes;
  const planes = mesh.extras?.hullPlanes;
  if (!planes?.length) throw new Error("Diamond model: missing hull planes (run tools/diamond-model)");
  const positions = accessor(mesh.primitives[0].attributes.POSITION);
  const indices = accessor(mesh.primitives[0].indices);
  if (!(positions instanceof Float32Array) || indices instanceof Float32Array) throw new Error("Diamond model: bad layout");
  return { positions, indices, planes: new Float32Array(planes) };
}

/* ---------------------------------------------------------------------------------------------- */

/** Compiles and links, letting the browser do it off the main thread where it can. */
async function createProgram(gl: WebGL2RenderingContext, sources: [vertex: string, fragment: string]) {
  const program = gl.createProgram();
  const shaders = [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].map((type, index) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, sources[index]);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    return shader;
  });
  gl.bindAttribLocation(program, 0, "position");
  gl.linkProgram(program);

  const parallel = gl.getExtension("KHR_parallel_shader_compile");
  if (parallel) {
    while (!gl.isContextLost() && !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
      await new Promise(requestAnimationFrame);
    }
  }
  if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {
    const log = [gl.getProgramInfoLog(program), ...shaders.map((shader) => gl.getShaderInfoLog(shader))];
    throw new Error(`Diamond shader: ${log.filter(Boolean).join("\n")}`);
  }
  return { program, shaders };
}

/** Column-major 3x3 rotation: tilt about x, then spin about the stone's own vertical axis. */
function setRotation(out: Float32Array, spin: number, tilt: number) {
  const [cs, ss, ct, st] = [Math.cos(spin), Math.sin(spin), Math.cos(tilt), Math.sin(tilt)];
  // Rx(tilt) · Ry(spin)
  out.set([cs, st * ss, -ct * ss, 0, ct, st, ss, -st * cs, ct * cs]);
  return out;
}

export async function createDiamondScene(canvas: HTMLCanvasElement, modelUrl: string): Promise<DiamondScene> {
  const model = await loadModel(modelUrl);
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "high-performance" });
  if (!gl) throw new Error("WebGL2 unavailable");
  const planeCount = model.planes.length / 4;
  const maxUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) as number;
  if (planeCount + 8 > maxUniforms) throw new Error("Diamond model: too many hull planes for this GPU");

  const { program, shaders } = await createProgram(gl, [vertexShader, fragmentShader(planeCount)]);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffers = [gl.createBuffer(), gl.createBuffer()];
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
  gl.bufferData(gl.ARRAY_BUFFER, model.positions, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers[1]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indices, gl.STATIC_DRAW);
  const indexType = model.indices instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;

  gl.useProgram(program);
  gl.uniform4fv(gl.getUniformLocation(program, "uPlanes"), model.planes);
  gl.uniform1i(gl.getUniformLocation(program, "uPlaneCount"), planeCount);
  const uniforms = {
    rotation: gl.getUniformLocation(program, "uRotation"),
    viewProjection: gl.getUniformLocation(program, "uViewProjection"),
    eye: gl.getUniformLocation(program, "uEye"),
  };

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.clearColor(0, 0, 0, 0);

  // The model fits a unit sphere; frame it with a little room to spare.
  const distance = 1.08 / Math.sin(FOV / 2);
  const viewProjection = new Float32Array(16);
  const rotation = new Float32Array(9);

  return {
    resize(width, height, pixelRatio) {
      const ratio = Math.min(pixelRatio, 2, Math.sqrt(PIXEL_BUDGET / Math.max(width * height, 1)));
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);

      // Perspective looking down -z from (0, 0, distance), fitted to the narrower side.
      const aspect = canvas.width / canvas.height;
      const f = Math.min(1, aspect) / Math.tan(FOV / 2);
      const [near, far] = [distance - 1.5, distance + 1.5];
      viewProjection.fill(0);
      viewProjection[0] = f / aspect;
      viewProjection[5] = f;
      viewProjection[10] = (far + near) / (near - far);
      viewProjection[11] = -1;
      viewProjection[14] = (2 * far * near) / (near - far) - distance * ((far + near) / (near - far));
      viewProjection[15] = distance;
    },

    render(time) {
      if (gl.isContextLost()) return;
      const r = setRotation(rotation, time * SPIN_SPEED, TILT + 0.05 * Math.sin(time * 0.45));
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix3fv(uniforms.rotation, false, r);
      gl.uniformMatrix4fv(uniforms.viewProjection, false, viewProjection);
      // Eye in object space: the transpose of the rotation applied to (0, 0, distance).
      gl.uniform3f(uniforms.eye, r[2] * distance, r[5] * distance, r[8] * distance);
      gl.drawElements(gl.TRIANGLES, model.indices.length, indexType, 0);
    },

    dispose() {
      gl.deleteBuffer(buffers[0]);
      gl.deleteBuffer(buffers[1]);
      gl.deleteVertexArray(vao);
      for (const shader of shaders) gl.deleteShader(shader);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
