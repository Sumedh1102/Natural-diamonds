"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/format";
import type { Faq } from "@/data/faqs";

/** Numbered accordion in the style of the existing site's FAQ. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="border-t border-white/10">
      {items.map((faq, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={faq.question} className="border-b border-white/10">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left"
              >
                <span className="flex items-start gap-5">
                  <span
                    className={cn(
                      "mt-1.5 text-xs tracking-[0.2em] transition-colors duration-300",
                      open ? "text-bronze" : "text-white/55",
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      "font-serif text-xl leading-snug transition-colors duration-300 sm:text-2xl",
                      open ? "text-white" : "text-white/60 group-hover:text-white/85",
                    )}
                  >
                    {faq.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    open
                      ? "border-bronze bg-bronze text-ink-900"
                      : "border-white/15 text-white/55 group-hover:border-white/35 group-hover:text-white/70",
                  )}
                >
                  {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-luxe",
                open ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-8 pl-9 pr-4 text-[15px] leading-relaxed text-white/55 sm:pl-11 sm:pr-16">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
