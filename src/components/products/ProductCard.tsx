import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getCategory } from "@/data/categories";
import { getShape } from "@/data/shapes";
import { clarityLabel, cn, colorLabel, formatCarat, priceLabel } from "@/lib/format";
import type { Product } from "@/types";
import { SampleBadge } from "./SampleNotice";
import { StoneImage } from "./StoneImage";

type ProductCardProps = {
  product: Product;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function TreatedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-amber-300/50 bg-amber-950/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-amber-200 backdrop-blur-sm",
        className,
      )}
    >
      Treated colour
    </span>
  );
}

export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 80vw",
  headingLevel: Heading = "h3",
  className,
}: ProductCardProps) {
  const shape = getShape(product.shape);
  const category = getCategory(product.category);
  const cover = product.images[0];
  const href = `/natural-diamonds/${product.slug}`;
  const specs = [
    { label: "Carat", value: formatCarat(product.carat) },
    { label: "Colour", value: colorLabel(product) },
    { label: "Clarity", value: product.clarity ? product.clarity : "—" },
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
          <span className="rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-bronze-200 backdrop-blur-sm">
            {category.shortLabel}
          </span>
        </div>
        {product.colourOrigin === "treated" && <TreatedBadge className="absolute bottom-3 left-3" />}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-bronze">
          Natural diamond <span className="text-white/55">·</span> {product.reference}
        </p>
        <Heading className="mt-2 font-serif text-[1.45rem] font-light leading-tight text-white">
          <Link
            href={href}
            data-card-link=""
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[[data-card-link]:focus-visible]:underline"
          >
            {product.name}
          </Link>
        </Heading>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-3 text-center">
          {specs.map((spec) => (
            <div key={spec.label} className="px-1.5">
              <dt className="text-[9px] uppercase tracking-[0.18em] text-white/55">{spec.label}</dt>
              <dd className="mt-1 text-[13px] leading-snug text-white/90">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60">
          <span>{shape.label}</span>
          {product.cut && (
            <>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span>{product.cut} cut</span>
            </>
          )}
          <span aria-hidden="true" className="text-white/30">/</span>
          <span className={product.colourOrigin === "treated" ? "text-amber-200" : undefined}>
            {product.colourOrigin === "treated" ? "Treated colour" : "Natural colour"}
          </span>
          {!product.clarity && (
            <>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span>Clarity {clarityLabel(product).toLowerCase()}</span>
            </>
          )}
        </p>

        <div className="mt-auto pt-5">
          <p className="text-sm text-white/70">{priceLabel(product)}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            {/* Sits above the stretched card link */}
            <Link
              href={`/contact?diamond=${encodeURIComponent(product.slug)}`}
              aria-label={`Enquire about ${product.name}`}
              className="relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-bronze hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="size-3.5" />
              Enquire
            </Link>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-bronze transition-colors group-hover:text-bronze-300">
              Details
              <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
      {/* Visible focus ring for the stretched link. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-bronze ring-offset-2 ring-offset-ink opacity-0 group-has-[[data-card-link]:focus-visible]:opacity-100"
      />
    </article>
  );
}
