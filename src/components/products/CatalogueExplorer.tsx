"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, List, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { getCategory } from "@/data/categories";
import { getShape } from "@/data/shapes";
import {
  caratRanges,
  colourOrigins,
  countActiveFilters,
  emptyFilters,
  filterProducts,
  getRangeSummary,
  parseFilters,
  serializeFilters,
  type CatalogueFilters,
  type CatalogueView,
  type FilterOptions,
  type SortKey,
} from "@/lib/catalogue";
import { cn } from "@/lib/format";
import type { Product } from "@/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { FilterPanel } from "./FilterPanel";
import { ProductGrid } from "./ProductGrid";
import { ProductList } from "./ProductList";
import { SampleNotice } from "./SampleNotice";
import { StoneImage } from "./StoneImage";

type ListKey = "categories" | "origins" | "shapes" | "carats" | "colors" | "clarities" | "cuts";

type CatalogueExplorerProps = {
  products: Product[];
  options: FilterOptions;
};

const SEARCH_DEBOUNCE_MS = 250;

/**
 * Search, filter and sort the catalogue. State lives in the URL
 * (e.g. /natural-diamonds?shape=oval&carat=1-) so results can be shared
 * and collection links can open pre-filtered views.
 */
export function CatalogueExplorer({ products, options }: CatalogueExplorerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const idPrefix = useId();

  // The search box filters instantly and writes to the URL after a pause.
  // `base` is the URL query the draft started from, so a URL change from
  // elsewhere (a link, back/forward) replaces the draft.
  const [draft, setDraft] = useState({ value: filters.query, base: filters.query });
  const changedElsewhere = filters.query !== draft.base && filters.query !== draft.value;
  if (changedElsewhere) setDraft({ value: filters.query, base: filters.query });
  const query = changedElsewhere ? filters.query : draft.value;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const writeUrl = (next: CatalogueFilters) => {
    const qs = serializeFilters(next);
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  useEffect(() => {
    if (query === filters.query) return;
    const timer = setTimeout(() => {
      writeUrl({ ...filters, query });
      setDraft((current) => (current.value === query ? { ...current, base: query } : current));
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // writeUrl is recreated each render; filters and query cover its inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  // Native <dialog> provides the focus trap, Escape handling and inert background.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
  }, [drawerOpen]);

  // Close the drawer if this page is hidden by a navigation.
  useLayoutEffect(() => () => setDrawerOpen(false), []);

  const activeFilters: CatalogueFilters = { ...filters, query };
  const results = filterProducts(products, activeFilters);
  const activeCount = countActiveFilters(activeFilters);
  const facetCount = activeCount - (query.trim() ? 1 : 0);

  const toggle = (key: ListKey, value: string) => {
    const list = filters[key] as string[];
    const nextList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
    writeUrl({ ...activeFilters, [key]: nextList });
  };

  const setSort = (sort: SortKey) => writeUrl({ ...activeFilters, sort });
  const setView = (view: CatalogueView) => writeUrl({ ...activeFilters, view });
  // Category tabs pick a single category; the chips below allow combinations.
  const setCategory = (id: (typeof filters.categories)[number] | null) =>
    writeUrl({ ...activeFilters, categories: id ? [id] : [] });

  const clearAll = () => {
    setDraft({ value: "", base: "" });
    writeUrl({ ...emptyFilters, sort: filters.sort, view: filters.view });
  };

  const clearQuery = () => {
    setDraft({ value: "", base: "" });
    writeUrl({ ...filters, query: "" });
  };

  const chips: { key: ListKey; value: string; label: string }[] = [
    ...filters.categories.map((value) => ({ key: "categories" as const, value, label: getCategory(value).shortLabel })),
    ...filters.origins.map((value) => ({
      key: "origins" as const,
      value,
      label: colourOrigins.find((origin) => origin.value === value)?.label ?? value,
    })),
    ...filters.shapes.map((value) => ({ key: "shapes" as const, value, label: getShape(value).label })),
    ...filters.carats.map((value) => ({
      key: "carats" as const,
      value,
      label: caratRanges.find((range) => range.id === value)?.label ?? value,
    })),
    ...filters.colors.map((value) => ({ key: "colors" as const, value, label: `Colour ${value}` })),
    ...filters.clarities.map((value) => ({ key: "clarities" as const, value, label: `Clarity ${value}` })),
    ...filters.cuts.map((value) => ({ key: "cuts" as const, value, label: `${value} cut` })),
  ];

  const resultsLabel = `${results.length} of ${products.length} natural ${products.length === 1 ? "diamond" : "diamonds"}`;
  const singleCategory = filters.categories.length === 1 ? getCategory(filters.categories[0]) : null;
  const categorySummary = singleCategory
    ? getRangeSummary(products.filter((product) => product.category === singleCategory.id))
    : null;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Desktop filters */}
      <aside aria-label="Filters" className="hidden lg:col-span-3 lg:block">
        <div className="pb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-light text-white">Refine</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] uppercase tracking-[0.2em] text-bronze transition-colors hover:text-bronze-300"
              >
                Clear all
              </button>
            )}
          </div>
          <FilterPanel filters={filters} options={options} onToggle={toggle} idPrefix={`${idPrefix}-side`} />
        </div>
      </aside>

      <div className="min-w-0 lg:col-span-9">
        {options.categories.length > 1 && (
          <div className="mb-6 border-b border-white/10">
            <div
              role="group"
              aria-label="Diamond category"
              className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
            >
              {[{ id: null, shortLabel: "All diamonds", count: products.length }, ...options.categories].map((tab) => {
                const active = tab.id ? filters.categories.length === 1 && filters.categories[0] === tab.id : filters.categories.length === 0;
                return (
                  <button
                    key={tab.id ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(tab.id)}
                    className={cn(
                      "relative inline-flex min-h-12 shrink-0 items-center gap-2 px-4 text-[11px] uppercase tracking-[0.18em] transition-colors",
                      active ? "text-white" : "text-white/60 hover:text-white",
                    )}
                  >
                    {tab.shortLabel}
                    <span className={cn("text-[10px] tabular-nums", active ? "text-bronze" : "text-white/60")}>{tab.count}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px bg-bronze transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {singleCategory && categorySummary && (
          <div className="mb-8 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
            <StoneImage src={singleCategory.image} alt="" sizes="96px" className="size-20 rounded-xl sm:size-24" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-bronze">{singleCategory.eyebrow}</p>
              <h2 className="mt-1 font-serif text-2xl font-light text-white">{singleCategory.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{singleCategory.summary}</p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <div>
                  <dt className="inline text-white/50">Listings </dt>
                  <dd className="inline text-white/85">{categorySummary.count}</dd>
                </div>
                <div>
                  <dt className="inline text-white/50">Carat </dt>
                  <dd className="inline text-white/85">{categorySummary.carat}</dd>
                </div>
                {categorySummary.color && (
                  <div>
                    <dt className="inline text-white/50">Colour </dt>
                    <dd className="inline text-white/85">{categorySummary.color}</dd>
                  </div>
                )}
                {categorySummary.clarity && (
                  <div>
                    <dt className="inline text-white/50">Clarity </dt>
                    <dd className="inline text-white/85">{categorySummary.clarity}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-xs text-white/50">{singleCategory.grading}</p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor={`${idPrefix}-search`} className="sr-only">
              Search natural diamonds
            </label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/55" />
            <input
              id={`${idPrefix}-search`}
              type="search"
              value={query}
              onChange={(event) => setDraft({ value: event.target.value, base: filters.query })}
              placeholder="Search by shape, grade or reference"
              autoComplete="off"
              maxLength={80}
              className="h-12 w-full rounded-full border border-white/15 bg-white/[0.03] pl-11 pr-11 text-sm text-white placeholder:text-white/45 transition-colors focus:border-bronze focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={clearQuery}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-white/40 sm:flex-none lg:hidden"
            >
              <SlidersHorizontal aria-hidden="true" className="size-4" />
              Filters
              {facetCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-bronze text-[10px] text-ink-900">
                  {facetCount}
                </span>
              )}
            </button>

            <div className="relative flex-1 sm:flex-none">
              <label htmlFor={`${idPrefix}-sort`} className="sr-only">
                Sort diamonds
              </label>
              <select
                id={`${idPrefix}-sort`}
                value={filters.sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-12 w-full cursor-pointer appearance-none rounded-full border border-white/15 bg-ink pl-4 pr-8 text-[13px] text-white transition-colors hover:border-white/40 focus:border-bronze focus:outline-none sm:w-auto sm:pl-5 sm:pr-10 sm:text-[11px] sm:uppercase sm:tracking-[0.15em]"
              >
                {options.sorts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 sm:right-4">
                ▾
              </span>
            </div>

            <div role="group" aria-label="Layout" className="flex h-12 shrink-0 rounded-full border border-white/15 p-1">
              {(
                [
                  { value: "grid", label: "Grid view", icon: LayoutGrid },
                  { value: "list", label: "List view", icon: List },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={filters.view === option.value}
                  aria-label={option.label}
                  onClick={() => setView(option.value)}
                  className={cn(
                    "flex w-10 items-center justify-center rounded-full transition-colors",
                    filters.view === option.value ? "bg-bronze text-ink-900" : "text-white/60 hover:text-white",
                  )}
                >
                  <option.icon aria-hidden="true" className="size-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status and active filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <p aria-live="polite" className="mr-2 text-xs uppercase tracking-[0.2em] text-white/60">
            Showing {resultsLabel}
          </p>
          {chips.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => toggle(chip.key, chip.value)}
              className="group inline-flex items-center gap-1.5 rounded-full border border-bronze/40 bg-bronze/10 py-1.5 pl-3 pr-2 text-xs text-white/85 transition-colors hover:border-bronze"
            >
              {chip.label}
              <X aria-hidden="true" className="size-3.5 text-bronze" />
              <span className="sr-only">(remove filter)</span>
            </button>
          ))}
          {chips.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="px-2 text-xs uppercase tracking-[0.18em] text-bronze underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <h2 className="sr-only">Results</h2>
        <SampleNotice show={results.some((product) => product.isSample)} className="mt-6" />

        {results.length > 0 ? (
          filters.view === "list" ? (
            <ProductList products={results} className="mt-8" />
          ) : (
            <ProductGrid products={results} className="mt-8" sizes="(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 92vw" />
          )
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center sm:py-20">
            <span className="flex size-14 items-center justify-center rounded-full border border-white/15 text-bronze">
              <SearchX aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 font-serif text-3xl font-light text-white">No natural diamonds match</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
              Try removing a filter or widening your search. If you have something specific in mind, tell us — we will
              let you know what is possible.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={clearAll} variant="primary">
                Clear filters
              </Button>
              <ButtonLink href="/contact?interest=Loose%20natural%20diamond" variant="outline">
                Ask our team
              </ButtonLink>
            </div>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-white/55">
          Looking for a shape or size not shown?{" "}
          <Link href="/contact" className="text-bronze underline decoration-bronze/50 underline-offset-4 hover:decoration-bronze">
            Request a consultation
          </Link>
          .
        </p>
      </div>

      {/* Mobile filter drawer */}
      <dialog
        ref={dialogRef}
        aria-labelledby={`${idPrefix}-drawer-title`}
        onClose={() => setDrawerOpen(false)}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) setDrawerOpen(false);
        }}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md bg-ink-900 p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm open:flex lg:hidden"
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <h2 id={`${idPrefix}-drawer-title`} className="font-serif text-2xl font-light">
              Refine diamonds
            </h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-bronze hover:text-bronze"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <FilterPanel filters={filters} options={options} onToggle={toggle} idPrefix={`${idPrefix}-drawer`} />
          </div>
          <div className="flex gap-3 border-t border-white/10 px-6 py-4">
            <Button onClick={clearAll} variant="outline" className={cn("flex-1", activeCount === 0 && "opacity-50")} disabled={activeCount === 0}>
              Clear all
            </Button>
            <Button onClick={() => setDrawerOpen(false)} className="flex-1">
              Show {results.length}
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
