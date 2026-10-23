import type { Price, Product } from "@/types";

export function formatCarat(carat: number) {
  return `${carat.toFixed(2)} ct`;
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
