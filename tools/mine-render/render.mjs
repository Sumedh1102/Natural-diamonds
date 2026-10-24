/**
 * Renders the procedural open-pit mine used for the homepage hero.
 *
 *   cd tools/mine-render
 *   npm install
 *   npm run serve          # in one terminal (serves scene.html on :8765)
 *   npm run render         # in another: writes out/*.png
 *
 * Each frame is then graded and exported to public/images (see README.md).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const light = "&sx=0.55&sy=0.14&sz=0.82";
const shots = [
  { name: "mine-desktop", w: 3840, h: 2160, q: `&seg=2000&fov=41&pos=-760,330,980&look=-50,80,-460${light}` },
  { name: "mine-mobile", w: 1620, h: 2880, q: `&seg=2000&fov=69&pos=-220,470,1000&look=-40,-45,-280${light}` },
];

mkdirSync("out", { recursive: true });
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.w, height: shot.h } });
  await page.goto(`http://localhost:8765/scene.html?view=custom${shot.q}`);
  await page.waitForFunction(() => window.__done === true, null, { timeout: 600000 });
  await page.screenshot({ path: `out/${shot.name}.png` });
  console.log(`rendered out/${shot.name}.png`);
  await page.close();
}
await browser.close();
