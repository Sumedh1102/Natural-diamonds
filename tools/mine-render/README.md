# Mine hero renderer

The homepage hero (`public/images/hero/mine-desktop.webp`, `mine-mobile.webp`) and the aerial view
(`public/images/editorial/mine-aerial.webp`) are **computer-generated renders** of a generic open-pit
kimberlite mine, not photographs of a real mine. They were made because no licensed mine photography
was available. They depict no specific mine and make no claim about where any diamond comes from.

To replace them with licensed photography or video, overwrite the files above (keep the names and
roughly the same composition: pit to the right on desktop, pit centred with dark sky on mobile), or
change the paths in `src/components/home/Hero.tsx`.

## Re-rendering

```bash
cd tools/mine-render
npm install
npm run serve      # terminal 1
npm run render     # terminal 2 → out/*.png
```

`scene.html` builds the terrain procedurally with three.js: concentric benches on a polar mesh, a haul
road, depth-banded strata, a pit lake, a gradient sky with stratus streaks, a low sun and haze. Camera,
sun and fog can be changed with URL parameters (`pos`, `look`, `fov`, `sx/sy/sz`, `fog`, `exp`).

Grading used for the website (ImageMagick), e.g. for the desktop frame:

```bash
convert out/mine-desktop.png -filter Lanczos -resize 2560x1440 \
  -sigmoidal-contrast 2.2x45% -modulate 102,92,100 \
  \( -size 2560x1440 radial-gradient:'#ffffff'-'#b4b4b4' \) -compose multiply -composite \
  \( -size 2560x1440 xc:gray50 -attenuate 0.12 +noise Gaussian -colorspace gray \) -compose softlight -composite \
  -unsharp 0x0.6+0.35+0 -strip -quality 84 ../../public/images/hero/mine-desktop.webp
```
