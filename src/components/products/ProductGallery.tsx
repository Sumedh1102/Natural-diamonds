"use client";

import { useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";
import type { ProductImage } from "@/types";
import { StoneImage } from "./StoneImage";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
  /** Adds a "representative image" caption for sample listings. */
  representative?: boolean;
};

export function ProductGallery({ images, productName, representative = false }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const image = images[index];
  const count = images.length;

  const go = (next: number) => setIndex((next + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div role="region" aria-roledescription="image gallery" aria-label={`${productName} images`} onKeyDown={onKeyDown}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/10">
        <StoneImage
          key={`${image.src}-${index}`}
          src={image.src}
          alt={image.alt}
          tone={image.tone}
          zoom={image.zoom}
          preload={index === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-square motion-safe:animate-[rise_0.5s_var(--ease-luxe)_both]"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-bronze hover:text-bronze"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-bronze hover:text-bronze"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}
        <p
          aria-live="polite"
          className={cn(
            "absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm",
            image.tone === "light" ? "bg-white/70 text-ink" : "bg-black/50 text-white/75",
          )}
        >
          {image.label} · {index + 1}/{count}
        </p>
      </div>

      {count > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((thumb, thumbIndex) => (
            <li key={`${thumb.src}-${thumb.label}`}>
              <button
                type="button"
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Show image ${thumbIndex + 1} of ${count}: ${thumb.label}`}
                aria-current={thumbIndex === index ? "true" : undefined}
                className={cn(
                  "block w-full overflow-hidden rounded-xl border transition-colors",
                  thumbIndex === index ? "border-bronze" : "border-white/10 hover:border-white/35",
                )}
              >
                <StoneImage src={thumb.src} alt="" tone={thumb.tone} zoom={thumb.zoom} sizes="96px" className="aspect-square" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {representative && (
        <p className="mt-4 text-xs leading-relaxed text-white/55">
          Representative image of the shape. Ask us for photographs of the individual diamond.
        </p>
      )}
    </div>
  );
}
