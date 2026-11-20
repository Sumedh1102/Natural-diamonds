"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";
import type { ShapeInfo } from "@/types";

const arrowClass =
  "flex size-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-[border-color,color,opacity] hover:border-bronze hover:text-bronze disabled:pointer-events-none disabled:opacity-30";

/**
 * Horizontal shape browser. Scroll-snap gives native touch swiping on phones,
 * the arrows and mouse-drag slide it smoothly on larger screens, and the end
 * state of each arrow and a progress rule follow the scroll position. Each
 * shape opens the catalogue pre-filtered to that shape.
 */
export function ShapeRail({ shapes }: { shapes: ShapeInfo[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false, progress: 0 });

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setEdges({
      start: rail.scrollLeft <= 4,
      end: max <= 4 || rail.scrollLeft >= max - 4,
      progress: max > 0 ? rail.scrollLeft / max : 0,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [measure]);

  const scroll = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.7, behavior: "smooth" });
  };

  // Mouse drag; touch and pen use the browser's native scrolling.
  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    const rail = railRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !rail) return;
    drag.current = { x: event.clientX, left: rail.scrollLeft, moved: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const rail = railRef.current;
    const state = drag.current;
    if (!rail || !state) return;
    const delta = event.clientX - state.x;
    if (!state.moved && Math.abs(delta) > 5) {
      state.moved = true;
      rail.dataset.dragging = "";
      rail.setPointerCapture(event.pointerId);
    }
    if (state.moved) rail.scrollLeft = state.left - delta;
  };
  const endDrag = (event: PointerEvent<HTMLUListElement>) => {
    const rail = railRef.current;
    if (!rail || !drag.current) return;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    delete rail.dataset.dragging;
    // Keep `moved` until after the click that ends a drag, so it opens no link.
    window.setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-6">
        <div aria-hidden="true" className="h-px flex-1 bg-white/10">
          <div
            className="h-px origin-left bg-bronze transition-transform duration-300 ease-luxe"
            style={{ transform: `scaleX(${Math.max(0.08, edges.progress)})`, width: "100%" }}
          />
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Scroll shapes left" className={arrowClass}>
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Scroll shapes right" className={arrowClass}>
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
      <ul
        ref={railRef}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (drag.current?.moved) event.preventDefault();
        }}
        className={cn(
          "scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 sm:scroll-px-6 lg:scroll-px-12 motion-safe:scroll-smooth sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12",
          "lg:cursor-grab data-[dragging]:cursor-grabbing data-[dragging]:snap-none data-[dragging]:scroll-auto data-[dragging]:select-none",
        )}
      >
        {shapes.map((shape) => (
          <li key={shape.id} className="w-40 shrink-0 snap-start border-l border-white/10 first:border-l-0 sm:w-48 lg:w-52">
            <Link
              href={`/natural-diamonds?shape=${shape.id}`}
              draggable={false}
              className="group flex flex-col items-center px-4 py-6 text-center"
            >
              <span className="relative block size-24 sm:size-28 lg:size-32">
                <Image
                  src={shape.image}
                  alt=""
                  fill
                  sizes="8rem"
                  draggable={false}
                  className="object-contain opacity-85 grayscale transition-[transform,opacity,filter] duration-500 ease-luxe group-hover:-translate-y-2 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                />
              </span>
              <span className="mt-6 font-serif text-xl text-white transition-colors group-hover:text-bronze-200">{shape.label}</span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/55 transition-colors group-hover:text-bronze">
                View diamonds
              </span>
              <span aria-hidden="true" className="mt-3 h-px w-0 bg-bronze transition-[width] duration-500 ease-luxe group-hover:w-10" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
