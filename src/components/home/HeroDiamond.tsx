"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/format";
import type { DiamondScene } from "./diamond-scene";

const MODEL_URL = "/models/diamond.glb";
/** Where the turn starts, in seconds of rotation; also the pose shown when motion is reduced. */
const START_TIME = 1.6;

/**
 * Slowly turning 3D diamond for the homepage hero. Purely decorative: the WebGL
 * renderer is fetched once the page is idle, and if WebGL2 is unavailable, data
 * saving is on or anything fails, the hero simply shows without it. It draws only
 * while on screen, and holds a still pose when reduced motion is preferred or the
 * GPU cannot keep up.
 *
 * The canvas is created per mount, so a route hidden by <Activity> releases its
 * WebGL context and gets a fresh one when shown again.
 */
export function HeroDiamond({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!container || connection?.saveData) return;

    const canvas = document.createElement("canvas");
    canvas.className =
      "absolute inset-0 size-full bg-[radial-gradient(closest-side,rgba(255,240,222,0.2),rgba(217,181,146,0.1)_50%,transparent)] opacity-0 transition-opacity duration-[1800ms] ease-(--ease-luxe) data-ready:opacity-100";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let scene: DiamondScene | undefined;
    let disposed = false;
    let inView = false;
    let frame = 0;
    let last = 0;
    let time = START_TIME;
    // Frame pacing is sampled over the first seconds of turning: if the GPU struggles, the
    // resolution drops once, and if it still cannot keep up the stone holds a still pose.
    let resolution = 1;
    let tooSlow = false;
    let sample: { frames: number; seconds: number } | undefined = { frames: 0, seconds: 0 };

    const draw = () => scene?.render(time);
    const resize = () => {
      scene?.resize(container.clientWidth, container.clientHeight, window.devicePixelRatio * resolution);
      draw();
    };
    const measure = (delta: number) => {
      if (!sample) return;
      sample.frames++;
      sample.seconds += delta;
      if (sample.seconds < 2) return;
      const frameTime = sample.seconds / sample.frames;
      sample = undefined;
      if (frameTime <= 1 / 28) return;
      if (resolution === 1) {
        resolution = 0.6;
        resize();
        sample = { frames: 0, seconds: 0 };
      } else if (frameTime > 1 / 15) {
        tooSlow = true;
        sync();
      }
    };
    const tick = (now: number) => {
      const elapsed = (now - last) / 1000;
      last = now;
      time += Math.min(elapsed, 0.1);
      draw();
      frame = requestAnimationFrame(tick);
      // Gaps of a second or more are pauses (another tab, a busy main thread), not slow drawing.
      if (elapsed < 1) measure(elapsed);
    };
    // Runs the loop only while the stone is visible and motion is welcome.
    const sync = () => {
      const run = scene !== undefined && inView && !reducedMotion.matches && !tooSlow;
      if (run && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });

    const onContextLost = () => {
      scene = undefined;
      delete canvas.dataset.ready;
      sync();
    };

    const start = async () => {
      try {
        const { createDiamondScene } = await import("./diamond-scene");
        const created = await createDiamondScene(canvas, MODEL_URL);
        if (disposed) {
          created.dispose();
          return;
        }
        scene = created;
        canvas.addEventListener("webglcontextlost", onContextLost);
        container.append(canvas);
        resizeObserver.observe(container);
        intersectionObserver.observe(container);
        reducedMotion.addEventListener("change", sync);
        // Fade in once the first frame is on screen.
        requestAnimationFrame(() => {
          if (scene) canvas.dataset.ready = "";
        });
      } catch {
        // Decorative only: the hero is complete without it.
      }
    };

    const idle = "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2500 }) : undefined;
    const timeout = idle === undefined ? setTimeout(start, 500) : undefined;

    return () => {
      disposed = true;
      if (idle !== undefined) cancelIdleCallback(idle);
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", sync);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      scene?.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={cn("pointer-events-none relative", className)} />;
}
