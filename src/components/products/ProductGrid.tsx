import { cn } from "@/lib/format";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  className?: string;
  sizes?: string;
};

export function ProductGrid({ products, className, sizes }: ProductGridProps) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} sizes={sizes} />
        </li>
      ))}
    </ul>
  );
}
