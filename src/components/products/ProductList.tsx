import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory } from "@/data/categories";
import { getShape } from "@/data/shapes";
import { clarityLabel, cn, colorLabel, formatCarat, priceLabel } from "@/lib/format";
import type { Product } from "@/types";
import { StoneImage } from "./StoneImage";

function OriginLabel({ product }: { product: Product }) {
  return product.colourOrigin === "treated" ? (
    <span className="text-amber-200">Treated colour</span>
  ) : (
    <span>Natural colour</span>
  );
}

const enquireClass =
  "inline-flex min-h-9 items-center rounded-full border border-white/15 px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-bronze hover:text-white";

/** Spec-sheet view of the catalogue for comparing diamonds side by side. */
export function ProductList({ products, className }: { products: Product[]; className?: string }) {
  return (
    <div className={className}>
      {/* Tablet and desktop: a comparison table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
        <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
          <caption className="sr-only">Natural diamonds and their specifications</caption>
          <thead className="bg-white/[0.03] text-[10px] uppercase tracking-[0.2em] text-white/60">
            <tr>
              <th scope="col" className="px-4 py-3 font-normal">Diamond</th>
              <th scope="col" className="px-3 py-3 font-normal">Category</th>
              <th scope="col" className="px-3 py-3 font-normal">Carat</th>
              <th scope="col" className="px-3 py-3 font-normal">Colour</th>
              <th scope="col" className="px-3 py-3 font-normal">Clarity</th>
              <th scope="col" className="hidden px-3 py-3 font-normal xl:table-cell">Cut</th>
              <th scope="col" className="px-3 py-3 font-normal">Price</th>
              <th scope="col" className="px-4 py-3 font-normal">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.slug} className="align-middle transition-colors hover:bg-white/[0.025]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <StoneImage
                      src={product.images[0].src}
                      alt=""
                      tone={product.images[0].tone}
                      sizes="56px"
                      className="size-14 shrink-0 rounded-lg"
                    />
                    <div className="min-w-[12rem]">
                      <Link
                        href={`/natural-diamonds/${product.slug}`}
                        className="font-serif text-[17px] leading-snug text-white transition-colors hover:text-bronze-200"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-white/55">
                        {getShape(product.shape).label} · {product.reference}
                        {product.isSample && <span className="ml-2 normal-case tracking-normal text-white/60">(sample)</span>}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-white/75">
                  <span className="block">{getCategory(product.category).shortLabel}</span>
                  <span className="block text-xs">
                    <OriginLabel product={product} />
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-white/90">{formatCarat(product.carat)}</td>
                <td className="px-3 py-3 text-white/90">{colorLabel(product)}</td>
                <td className="px-3 py-3 text-white/90">{product.clarity ?? <span className="text-white/55">—</span>}</td>
                <td className="hidden px-3 py-3 text-white/75 xl:table-cell">{product.cut ?? "—"}</td>
                <td className="px-3 py-3 text-white/70">{product.price ? priceLabel(product) : "On request"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/contact?diamond=${encodeURIComponent(product.slug)}`}
                      aria-label={`Enquire about ${product.name}`}
                      className={enquireClass}
                    >
                      Enquire
                    </Link>
                    <Link
                      href={`/natural-diamonds/${product.slug}`}
                      aria-label={`View ${product.name}`}
                      className="flex size-9 items-center justify-center rounded-full border border-white/15 text-bronze transition-colors hover:border-bronze"
                    >
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: compact rows */}
      <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 md:hidden">
        {products.map((product) => (
          <li key={product.slug} className="flex gap-4 p-4">
            <StoneImage
              src={product.images[0].src}
              alt=""
              tone={product.images[0].tone}
              sizes="80px"
              className="size-20 shrink-0 rounded-lg"
            />
            <div className="min-w-0 flex-1">
              <Link href={`/natural-diamonds/${product.slug}`} className="font-serif text-lg leading-tight text-white">
                {product.name}
              </Link>
              <p className="mt-1 text-xs text-white/75">
                {formatCarat(product.carat)} · {colorLabel(product)} · {clarityLabel(product)}
                {product.cut ? ` · ${product.cut}` : ""}
              </p>
              <p className={cn("mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55")}>
                {getCategory(product.category).shortLabel} · <OriginLabel product={product} />
                {product.isSample && <span className="normal-case tracking-normal"> · sample</span>}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-white/65">{priceLabel(product)}</span>
                <Link
                  href={`/contact?diamond=${encodeURIComponent(product.slug)}`}
                  aria-label={`Enquire about ${product.name}`}
                  className={enquireClass}
                >
                  Enquire
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
