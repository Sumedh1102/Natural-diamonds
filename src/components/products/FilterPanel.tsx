"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { getShape } from "@/data/shapes";
import type { CatalogueFilters, FilterOptions } from "@/lib/catalogue";
import { cn } from "@/lib/format";

type ListKey = "shapes" | "carats" | "colors" | "clarities" | "cuts";

type FilterPanelProps = {
  filters: CatalogueFilters;
  options: FilterOptions;
  onToggle: (key: ListKey, value: string) => void;
  idPrefix: string;
};

function Group({ title, hint, children, id }: { title: string; hint?: string; children: ReactNode; id: string }) {
  return (
    <fieldset className="border-b border-white/10 py-6 first:pt-0 last:border-b-0">
      <legend id={id} className="float-left mb-4 w-full text-[11px] font-normal uppercase tracking-[0.25em] text-bronze">
        {title}
      </legend>
      <div className="clear-left">
        {children}
        {hint && <p className="mt-3 text-xs leading-relaxed text-white/55">{hint}</p>}
      </div>
    </fieldset>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors duration-200",
        pressed
          ? "border-bronze bg-bronze/15 text-white"
          : "border-white/15 text-white/65 hover:border-white/35 hover:text-white",
      )}
    >
      {pressed && <Check aria-hidden="true" className="size-3.5 text-bronze" />}
      {children}
    </button>
  );
}

export function FilterPanel({ filters, options, onToggle, idPrefix }: FilterPanelProps) {
  return (
    <div>
      {options.shapes.length > 1 && (
        <Group title="Shape" id={`${idPrefix}-shape`}>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
            {options.shapes.map((shape) => {
              const pressed = filters.shapes.includes(shape.id);
              return (
                <button
                  key={shape.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => onToggle("shapes", shape.id)}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-xl border px-1 py-3 text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
                    pressed
                      ? "border-bronze bg-bronze/10 text-white"
                      : "border-white/10 text-white/55 hover:border-white/30 hover:text-white",
                  )}
                >
                  <span className="relative block size-9">
                    <Image
                      src={getShape(shape.id).image}
                      alt=""
                      fill
                      sizes="36px"
                      className={cn("object-contain transition-[filter,opacity]", pressed ? "" : "opacity-70 grayscale group-hover:opacity-100")}
                    />
                  </span>
                  {shape.label}
                </button>
              );
            })}
          </div>
        </Group>
      )}

      {options.carats.length > 1 && (
        <Group title="Carat weight" id={`${idPrefix}-carat`}>
          <div className="flex flex-wrap gap-2">
            {options.carats.map((range) => (
              <Chip key={range.id} pressed={filters.carats.includes(range.id)} onClick={() => onToggle("carats", range.id)}>
                {range.label}
              </Chip>
            ))}
          </div>
        </Group>
      )}

      {options.colors.length > 1 && (
        <Group title="Colour" id={`${idPrefix}-color`} hint="D is colourless; each step along the scale shows slightly more warmth.">
          <div className="flex flex-wrap gap-2">
            {options.colors.map((grade) => (
              <Chip key={grade} pressed={filters.colors.includes(grade)} onClick={() => onToggle("colors", grade)}>
                {grade}
              </Chip>
            ))}
          </div>
        </Group>
      )}

      {options.clarities.length > 1 && (
        <Group title="Clarity" id={`${idPrefix}-clarity`}>
          <div className="flex flex-wrap gap-2">
            {options.clarities.map((grade) => (
              <Chip key={grade} pressed={filters.clarities.includes(grade)} onClick={() => onToggle("clarities", grade)}>
                {grade}
              </Chip>
            ))}
          </div>
        </Group>
      )}

      {options.cuts.length > 0 && (
        <Group
          title="Cut grade"
          id={`${idPrefix}-cut`}
          hint="Laboratories grade cut for round brilliants only, so this filter shows round diamonds."
        >
          <div className="flex flex-wrap gap-2">
            {options.cuts.map((grade) => (
              <Chip key={grade} pressed={filters.cuts.includes(grade)} onClick={() => onToggle("cuts", grade)}>
                {grade}
              </Chip>
            ))}
          </div>
        </Group>
      )}
    </div>
  );
}
