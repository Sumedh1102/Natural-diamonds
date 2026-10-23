"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShapeInfo } from "@/types";

/**
 * Horizontal shape browser adapted from the "Shapes of Diamond" slider on the
 * existing site. Each shape opens the catalogue pre-filtered to that shape.
 */
export function ShapeRail({ shapes }: { shapes: ShapeInfo[] }) {
  const railRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Scroll shapes left"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-bronze hover:text-bronze"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Scroll shapes right"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-bronze hover:text-bronze"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
      <ul
        ref={railRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
      >
        {shapes.map((shape) => (
          <li key={shape.id} className="w-40 shrink-0 snap-start border-l border-white/10 first:border-l-0 sm:w-48 lg:w-52">
            <Link
              href={`/natural-diamonds?shape=${shape.id}`}
              className="group flex flex-col items-center px-4 py-6 text-center"
            >
              <span className="relative block size-24 sm:size-28 lg:size-32">
                <Image
                  src={shape.image}
                  alt=""
                  fill
                  sizes="8rem"
                  className="object-contain opacity-85 grayscale transition-[transform,opacity,filter] duration-500 ease-luxe group-hover:-translate-y-1.5 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </span>
              <span className="mt-6 font-serif text-xl text-white transition-colors group-hover:text-bronze-200">
                {shape.label}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/55 transition-colors group-hover:text-bronze">
                View diamonds
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
