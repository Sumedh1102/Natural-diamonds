import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/config/site";
import { cn } from "@/lib/format";
import { JsonLd } from "@/components/seo/JsonLd";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[11px] uppercase tracking-[0.2em]", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/55">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.href && !last ? (
                  <Link href={crumb.href} className="transition-colors hover:text-bronze-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "text-white/75" : undefined}>
                    {crumb.label}
                  </span>
                )}
                {!last && <ChevronRight aria-hidden="true" className="size-3 text-white/55" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
          })),
        }}
      />
    </>
  );
}
