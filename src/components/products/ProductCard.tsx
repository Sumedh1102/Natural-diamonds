import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getShape } from "@/data/shapes";
import { cn, formatCarat, priceLabel } from "@/lib/format";
import type { Product } from "@/types";
import { SampleBadge } from "./SampleNotice";
import { StoneImage } from "./StoneImage";

type ProductCardProps = {
  product: Product;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 80vw",
  headingLevel: Heading = "h3",
  className,
}: ProductCardProps) {
  const shape = getShape(product.shape);
  const cover = product.images[0];
  const specs = [
    { label: "Carat", value: formatCarat(product.carat) },
    { label: "Colour", value: product.color },
    { label: "Clarity", value: product.clarity },
    { label: "Cut", value: product.cut ?? "—" },
  ];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-850 transition-[border-color,transform,box-shadow] duration-500 ease-luxe hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="relative">
        <StoneImage
          src={cover.src}
          alt={cover.alt}
          tone={cover.tone}
          sizes={sizes}
          className="aspect-square"
          imageClassName="group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {product.isSample ? <SampleBadge /> : <span />}
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-bronze-200 backdrop-blur-sm">
            Natural
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-bronze">
          {shape.label} <span className="text-white/55">·</span> {product.reference}
        </p>
        <Heading className="mt-2 font-serif text-2xl font-light leading-tight text-white">
          <Link
            href={`/natural-diamonds/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[a:focus-visible]:underline"
          >
            {product.name}
          </Link>
        </Heading>

        <dl className="mt-5 grid grid-cols-4 divide-x divide-white/10 border-y border-white/10 py-3 text-center">
          {specs.map((spec) => (
            <div key={spec.label} className="px-1">
              <dt className="text-[9px] uppercase tracking-[0.18em] text-white/55">{spec.label}</dt>
              <dd className="mt-1 text-[13px] text-white/85">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-sm text-white/60">{priceLabel(product)}</span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-bronze transition-colors group-hover:text-bronze-300">
            Details
            <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      {/* Visible focus ring for the stretched link. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-bronze ring-offset-2 ring-offset-ink opacity-0 group-has-[a:focus-visible]:opacity-100"
      />
    </article>
  );
}
