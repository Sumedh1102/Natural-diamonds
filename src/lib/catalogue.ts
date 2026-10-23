/**
 * Catalogue access, search, filtering and sorting.
 *
 * Products come from the static starter data today. To connect an API or CMS,
 * change `getAllProducts` (and keep returning `Product[]`); every page and
 * filter derives from it.
 */
import { categories, getCategory, isDiamondCategory } from "@/data/categories";
import { products } from "@/data/products";
import { getShape, isDiamondShape, shapes } from "@/data/shapes";
import type { ClarityGrade, ColorGrade, ColourOrigin, CutGrade, DiamondCategory, DiamondShape, Product } from "@/types";

export const colorScale: ColorGrade[] = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
export const clarityScale: ClarityGrade[] = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"];
export const cutScale: CutGrade[] = ["Excellent", "Very Good", "Good", "Fair"];

export type CaratRange = { id: string; label: string; min: number; max: number };

export const caratRanges: CaratRange[] = [
  { id: "0-0.74", label: "Under 0.75 ct", min: 0, max: 0.745 },
  { id: "0.75-0.99", label: "0.75 – 0.99 ct", min: 0.745, max: 0.995 },
  { id: "1-1.49", label: "1.00 – 1.49 ct", min: 0.995, max: 1.495 },
  { id: "1.5-1.99", label: "1.50 – 1.99 ct", min: 1.495, max: 1.995 },
  { id: "2-", label: "2.00 ct and above", min: 1.995, max: Number.POSITIVE_INFINITY },
];

export type SortKey = "featured" | "carat-desc" | "carat-asc" | "color" | "clarity" | "price-asc" | "price-desc";

export const sortOptions: { value: SortKey; label: string; requiresPrice?: boolean }[] = [
  { value: "featured", label: "Featured" },
  { value: "carat-desc", label: "Carat: high to low" },
  { value: "carat-asc", label: "Carat: low to high" },
  { value: "color", label: "Colour: best first" },
  { value: "clarity", label: "Clarity: best first" },
  { value: "price-asc", label: "Price: low to high", requiresPrice: true },
  { value: "price-desc", label: "Price: high to low", requiresPrice: true },
];

export const colourOrigins: { value: ColourOrigin; label: string }[] = [
  { value: "natural", label: "Natural colour" },
  { value: "treated", label: "Treated colour" },
];

export type CatalogueView = "grid" | "list";

export type CatalogueFilters = {
  query: string;
  categories: DiamondCategory[];
  origins: ColourOrigin[];
  shapes: DiamondShape[];
  carats: string[];
  colors: ColorGrade[];
  clarities: ClarityGrade[];
  cuts: CutGrade[];
  sort: SortKey;
  view: CatalogueView;
};

export const emptyFilters: CatalogueFilters = {
  query: "",
  categories: [],
  origins: [],
  shapes: [],
  carats: [],
  colors: [],
  clarities: [],
  cuts: [],
  sort: "featured",
  view: "grid",
};

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = products.filter((product) => product.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export function getProductsInCollection(slug: string): Product[] {
  return products.filter((product) => product.collections.includes(slug));
}

/** Same category first, then same shape, then closest carat weight. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === product.category ? 0 : 20) +
        (candidate.shape === product.shape ? 0 : 10) +
        Math.abs(candidate.carat - product.carat),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Filter options that the given products can actually satisfy. */
export function getFilterOptions(items: Product[]) {
  const categoryCounts = new Map<DiamondCategory, number>();
  items.forEach((p) => categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1));
  const originSet = new Set(items.map((p) => p.colourOrigin));
  const shapeIds = new Set(items.map((p) => p.shape));
  const colorSet = new Set(items.flatMap((p) => (p.color ? [p.color] : [])));
  const claritySet = new Set(items.flatMap((p) => (p.clarity ? [p.clarity] : [])));
  const cutSet = new Set(items.flatMap((p) => (p.cut ? [p.cut] : [])));
  const hasPrices = items.some((p) => p.price);

  return {
    categories: categories
      .filter((category) => categoryCounts.has(category.id))
      .map((category) => ({ ...category, count: categoryCounts.get(category.id) ?? 0 })),
    origins: colourOrigins.filter((origin) => originSet.has(origin.value)),
    shapes: shapes.filter((shape) => shapeIds.has(shape.id)),
    carats: caratRanges.filter((range) => items.some((p) => inRange(p.carat, range))),
    colors: colorScale.filter((grade) => colorSet.has(grade)),
    clarities: clarityScale.filter((grade) => claritySet.has(grade)),
    cuts: cutScale.filter((grade) => cutSet.has(grade)),
    sorts: sortOptions.filter((option) => !option.requiresPrice || hasPrices),
  };
}

export type FilterOptions = ReturnType<typeof getFilterOptions>;

/** Specification ranges for a set of diamonds, e.g. one category. */
export function getRangeSummary(items: Product[]) {
  if (items.length === 0) return null;
  const carats = items.map((p) => p.carat);
  const colors = colorScale.filter((grade) => items.some((p) => p.color === grade));
  const clarities = clarityScale.filter((grade) => items.some((p) => p.clarity === grade));
  const span = (values: string[]) => (values.length === 0 ? null : values.length === 1 ? values[0] : `${values[0]} – ${values[values.length - 1]}`);
  const shapeCount = new Set(items.map((p) => p.shape)).size;
  return {
    count: items.length,
    carat: `${Math.min(...carats).toFixed(2)} – ${Math.max(...carats).toFixed(2)} ct`,
    color: span(colors),
    clarity: span(clarities),
    shapes: shapeCount,
  };
}

function inRange(carat: number, range: CaratRange) {
  return carat >= range.min && carat < range.max;
}

function searchText(product: Product) {
  return [
    product.name,
    product.reference,
    getCategory(product.category).label,
    getShape(product.shape).label,
    `${product.carat.toFixed(2)} ct`,
    product.color ?? "",
    product.colorDescription ?? "",
    product.clarity ?? "",
    product.cut ?? "",
    product.colourOrigin === "treated" ? "treated colour" : "natural colour untreated",
    product.description,
    "natural diamond",
  ]
    .join(" ")
    .toLowerCase();
}

export function filterProducts(items: Product[], filters: CatalogueFilters): Product[] {
  const tokens = filters.query.toLowerCase().split(/\s+/).filter(Boolean);
  const ranges = caratRanges.filter((range) => filters.carats.includes(range.id));

  const result = items.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    if (filters.origins.length && !filters.origins.includes(product.colourOrigin)) return false;
    if (filters.shapes.length && !filters.shapes.includes(product.shape)) return false;
    if (filters.colors.length && (!product.color || !filters.colors.includes(product.color))) return false;
    if (filters.clarities.length && (!product.clarity || !filters.clarities.includes(product.clarity))) return false;
    if (filters.cuts.length && (!product.cut || !filters.cuts.includes(product.cut))) return false;
    if (ranges.length && !ranges.some((range) => inRange(product.carat, range))) return false;
    if (tokens.length) {
      const haystack = searchText(product);
      if (!tokens.every((token) => haystack.includes(token))) return false;
    }
    return true;
  });

  return sortProducts(result, filters.sort);
}

/** Position on a grading scale; ungraded stones sort after graded ones. */
function rank<T>(scale: T[], value: T | undefined) {
  return value === undefined ? scale.length : scale.indexOf(value);
}

export function sortProducts(items: Product[], sort: SortKey): Product[] {
  const sorted = [...items];
  const price = (p: Product) => p.price?.amount;
  switch (sort) {
    case "carat-desc":
      return sorted.sort((a, b) => b.carat - a.carat);
    case "carat-asc":
      return sorted.sort((a, b) => a.carat - b.carat);
    case "color":
      return sorted.sort((a, b) => rank(colorScale, a.color) - rank(colorScale, b.color) || b.carat - a.carat);
    case "clarity":
      return sorted.sort((a, b) => rank(clarityScale, a.clarity) - rank(clarityScale, b.clarity) || b.carat - a.carat);
    case "price-asc":
    case "price-desc": {
      const direction = sort === "price-asc" ? 1 : -1;
      // Listings without a price always sort last.
      return sorted.sort((a, b) => {
        const pa = price(a);
        const pb = price(b);
        if (pa === undefined && pb === undefined) return 0;
        if (pa === undefined) return 1;
        if (pb === undefined) return -1;
        return (pa - pb) * direction;
      });
    }
    case "featured":
    default:
      return sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
}

export function countActiveFilters(filters: CatalogueFilters) {
  return (
    filters.categories.length +
    filters.origins.length +
    filters.shapes.length +
    filters.carats.length +
    filters.colors.length +
    filters.clarities.length +
    filters.cuts.length +
    (filters.query.trim() ? 1 : 0)
  );
}

/* ---------- URL serialisation ---------- */

type ParamSource = { get(name: string): string | null };

function list(params: ParamSource, key: string) {
  return (params.get(key) ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function parseFilters(params: ParamSource): CatalogueFilters {
  const sortParam = params.get("sort");
  return {
    query: (params.get("q") ?? "").slice(0, 80),
    categories: list(params, "category").filter(isDiamondCategory),
    origins: list(params, "origin").filter((v): v is ColourOrigin => colourOrigins.some((o) => o.value === v)),
    shapes: list(params, "shape").filter(isDiamondShape),
    carats: list(params, "carat").filter((id) => caratRanges.some((range) => range.id === id)),
    colors: list(params, "color")
      .map((v) => v.toUpperCase())
      .filter((v): v is ColorGrade => colorScale.includes(v as ColorGrade)),
    clarities: list(params, "clarity")
      .map((v) => v.toUpperCase())
      .filter((v): v is ClarityGrade => clarityScale.includes(v as ClarityGrade)),
    cuts: list(params, "cut").filter((v): v is CutGrade => cutScale.includes(v as CutGrade)),
    sort: sortOptions.some((option) => option.value === sortParam) ? (sortParam as SortKey) : "featured",
    view: params.get("view") === "list" ? "list" : "grid",
  };
}

export function serializeFilters(filters: CatalogueFilters): string {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.categories.length) params.set("category", filters.categories.join(","));
  if (filters.origins.length) params.set("origin", filters.origins.join(","));
  if (filters.shapes.length) params.set("shape", filters.shapes.join(","));
  if (filters.carats.length) params.set("carat", filters.carats.join(","));
  if (filters.colors.length) params.set("color", filters.colors.join(","));
  if (filters.clarities.length) params.set("clarity", filters.clarities.join(","));
  if (filters.cuts.length) params.set("cut", filters.cuts.join(","));
  if (filters.sort !== "featured") params.set("sort", filters.sort);
  if (filters.view !== "grid") params.set("view", filters.view);
  // Keep commas readable in shared links.
  return params.toString().replace(/%2C/g, ",");
}
