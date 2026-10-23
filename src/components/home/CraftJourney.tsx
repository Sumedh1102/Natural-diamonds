"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/format";
import type { ImageAsset } from "@/types";

type Step = {
  title: string;
  quote: string;
  text: string;
  image: ImageAsset;
};

/**
 * Feature selector adapted from the existing site's product section:
 * numbered steps on the left, a detail panel on the right. Implements the
 * WAI-ARIA tabs pattern (arrow keys, Home and End move between steps).
 */
export function CraftJourney({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const step = steps[active];

  const focusTab = (index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowRight: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(steps.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="grid overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-12">
      <div role="tablist" aria-label="Stages of the journey" aria-orientation="vertical" className="lg:col-span-5">
        {steps.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.title}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative flex w-full items-center gap-5 border-b border-white/10 px-5 py-6 text-left transition-colors duration-500 last:border-b-0 sm:px-8 sm:py-8 lg:last:border-b",
                selected ? "bg-white/[0.04]" : "hover:bg-white/[0.02]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-[2px] bg-bronze transition-opacity duration-500",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
              <span
                className={cn(
                  "text-xs tracking-[0.2em] transition-colors duration-300",
                  selected ? "text-bronze" : "text-white/55",
                )}
              >
                0{index + 1}
              </span>
              <span>
                <span
                  className={cn(
                    "block font-serif text-2xl font-light transition-colors duration-300",
                    selected ? "text-white" : "text-white/60 group-hover:text-white/75",
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
                    selected ? "text-bronze" : "text-white/55",
                  )}
                >
                  Stage {index + 1} of {steps.length}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="relative border-t border-white/10 lg:col-span-7 lg:border-l lg:border-t-0"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
          {steps.map((item, index) => (
            <Image
              key={item.title}
              src={item.image.src}
              alt={index === active ? item.image.alt : ""}
              aria-hidden={index !== active}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-700 ease-luxe",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          <span
            aria-hidden="true"
            className="absolute right-6 top-2 select-none font-serif text-[7rem] leading-none text-white/[0.08] sm:text-[9rem]"
          >
            0{active + 1}
          </span>
        </div>
        <div className="relative -mt-16 p-6 sm:p-10">
          <p className="font-serif text-2xl font-light italic leading-snug text-bronze-200 sm:text-[1.7rem]">
            &ldquo;{step.quote}&rdquo;
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">{step.text}</p>
        </div>
      </div>
    </div>
  );
}
