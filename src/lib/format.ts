import type { Price, Product } from "@/types";

/** Two decimals, or three below 0.01 ct so that melee such as 0.003 ct stays readable. */
export function caratValue(carat: number) {
  return carat.toFixed(carat < 0.01 ? 3 : 2);
}

export function formatCarat(carat: number) {
  return `${caratValue(carat)} ct`;
}

export function formatPrice(price: Price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}

export function priceLabel(product: Product) {
  return product.price ? formatPrice(product.price) : "Price on request";
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Colour grade for white diamonds, otherwise the colour description. */
export function colorLabel(product: Product) {
  return product.color ?? product.colorDescription ?? "—";
}

export function clarityLabel(product: Product) {
  return product.clarity ?? "Not graded";
}
