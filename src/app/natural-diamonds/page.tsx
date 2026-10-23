import { Suspense } from "react";
import { CatalogueExplorer } from "@/components/products/CatalogueExplorer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SampleNotice } from "@/components/products/SampleNotice";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { getAllProducts, getFilterOptions } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/metadata";
import type { Product } from "@/types";

export const metadata = pageMetadata({
  title: "Natural Diamonds",
  description:
    "Browse natural diamonds by shape, carat weight, colour and clarity. Search the collection, compare specifications and enquire about any diamond.",
  path: "/natural-diamonds",
});

/** Prerendered view shown before the URL filters are applied in the browser. */
function CatalogueFallback({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12" aria-busy="true">
      <div className="hidden lg:col-span-3 lg:block">
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-xl bg-white/[0.04]" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-9">
        <div className="h-12 animate-pulse rounded-full bg-white/[0.04]" />
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/60">Loading filters…</p>
        <SampleNotice show={products.some((product) => product.isSample)} className="mt-6" />
        <ProductGrid products={products} className="mt-8" />
      </div>
    </div>
  );
}

export default function NaturalDiamondsPage() {
  const products = getAllProducts();
  const options = getFilterOptions(products);

  return (
    <>
      <PageHero
        eyebrow="The Catalogue"
        title={
          <>
            Natural <em>Diamonds</em>
          </>
        }
        description="Each diamond here was formed by nature. Search and refine by shape, carat weight, colour and clarity, then open any listing for its full specifications."
        breadcrumbs={[{ label: "Natural Diamonds" }]}
        image={{
          src: "/images/collections/loose-diamonds-velvet.webp",
          alt: "Loose natural diamonds in different shapes on black velvet",
        }}
      />

      <section aria-label="Diamond catalogue" className="py-12 sm:py-16 lg:py-20">
        <Container>
          <Suspense fallback={<CatalogueFallback products={products} />}>
            <CatalogueExplorer products={products} options={options} />
          </Suspense>
        </Container>
      </section>

      <ConsultationCta
        title={
          <>
            Not Sure Where <em>to Begin?</em>
          </>
        }
        text="Share what matters to you — shape, size, budget or the moment you are marking — and we will help you narrow the choice."
      />
    </>
  );
}
