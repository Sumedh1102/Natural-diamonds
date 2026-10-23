import { ProductCard } from "@/components/products/ProductCard";
import { SampleNotice } from "@/components/products/SampleNotice";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/lib/catalogue";

export function FeaturedDiamonds() {
  const featured = getFeaturedProducts(4);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-title" className="border-y border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured"
            title={
              <span id="featured-title">
                Selected <em>Natural Diamonds</em>
              </span>
            }
            description="A considered selection across shapes and sizes. Open any diamond for its full specifications and to ask about it directly."
          />
          <ButtonLink href="/natural-diamonds" className="self-start lg:self-auto">
            View all diamonds
          </ButtonLink>
        </div>

        <SampleNotice show={featured.some((product) => product.isSample)} className="mb-8 max-w-3xl" />

        {/* Swipeable on phones, a grid from tablet up */}
        <ul className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {featured.map((product) => (
            <li key={product.slug} className="w-[80%] shrink-0 snap-start sm:w-auto">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
