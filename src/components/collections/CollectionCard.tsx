import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/format";
import type { Collection } from "@/types";

type CollectionCardProps = {
  collection: Collection;
  sizes: string;
  className?: string;
  /** Shows the summary text; hide it on very compact tiles. */
  showSummary?: boolean;
  headingLevel?: "h2" | "h3";
};

export function CollectionCard({
  collection,
  sizes,
  className,
  showSummary = true,
  headingLevel: Heading = "h3",
}: CollectionCardProps) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-ink-900",
        className,
      )}
    >
      <Image
        src={collection.image.src}
        alt={collection.image.alt}
        fill
        sizes={sizes}
        className="-z-10 object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/5 transition-opacity duration-500 group-hover:opacity-90"
      />
      <div className="mt-auto w-full p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-200">{collection.eyebrow}</p>
        <Heading className="mt-3 font-serif text-[1.75rem] font-light leading-tight text-white sm:text-3xl">
          <Link
            href={`/collections/${collection.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {collection.title}
          </Link>
        </Heading>
        {showSummary && <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">{collection.summary}</p>}
        <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 transition-colors group-hover:text-bronze-200">
          Explore
          <span aria-hidden="true" className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </span>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-bronze opacity-0 group-has-[a:focus-visible]:opacity-100"
      />
    </article>
  );
}
