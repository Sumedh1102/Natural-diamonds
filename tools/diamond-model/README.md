# Hero diamond model

The turning diamond in the homepage hero is **"Diamond" by Karolina Renkiewicz**
(<https://sketchfab.com/3d-models/diamond-1ab1e8de5a604b4081c15326eaa5682b>), licensed under
**[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**. The licence allows commercial use on condition
that the author is credited and changes are indicated, so the hero shows the credit
("3D diamond adapted from “Diamond” by Karolina Renkiewicz · CC BY 4.0", in `src/components/home/Hero.tsx`).
Keep it wherever the model is shown.

- `diamond-source.glb`: the model as downloaded (2.1 MB, mostly 4K textures).
- `optimize.mjs`: writes `public/models/diamond.glb` (about 9 KB), which is what the site loads.

The site does not use the model's textures or materials. `src/components/home/diamond-scene.ts` shades the stone
itself, tracing light through it (refraction, total internal reflection and dispersion) under an analytic studio
environment, in plain WebGL2 without three.js. The optimiser therefore keeps only the shape:

1. bakes the node transforms into the vertices, welds them and drops degenerate triangles;
2. centres the stone and scales it to a unit bounding sphere;
3. computes the planes of its convex hull, which the shader traces light against, and stores them in
   `meshes[0].extras.hullPlanes`;
4. drops textures, normals and UV sets, and carries over the attribution in `asset.extras`.

## Re-running

```bash
node tools/diamond-model/optimize.mjs
```

No dependencies are needed.

## Using another model

Replace `diamond-source.glb` and run the optimiser. The shader assumes the stone is **convex** (as cut diamonds
are), stands with its table facing +Y, and has at most about 200 hull planes (it reports the count). Update the
credit in `Hero.tsx` to the new model's licence.
