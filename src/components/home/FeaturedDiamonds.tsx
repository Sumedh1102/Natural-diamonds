import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHref } from "@/lib/inquiry";
import { getFeaturedProducts } from "@/lib/catalogue";

/** Genuine featured inventory only. Sample listings live in their own section. */
export function FeaturedDiamonds() {
  const featured = getFeaturedProducts(4);
  const hasFeatured = featured.length > 0;

  return (
    <section id="featured" aria-labelledby="featured-title" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured"
            title={
              <span id="featured-title">
                Selected <em>Natural Diamonds</em>
              </span>
            }
            description={
              hasFeatured
                ? "A considered selection across shapes and sizes. Open any diamond for its full specifications and to ask about it directly."
                : "Our featured selection will appear here as stones are confirmed. Tell us what you are looking for and we will source it."
            }
          />
          <ButtonLink href={hasFeatured ? "/natural-diamonds" : contactHref("Loose natural diamond")} className="self-start lg:self-auto">
            {hasFeatured ? "View all diamonds" : "Ask about availability"}
          </ButtonLink>
        </div>

        {hasFeatured && (
          <ul className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {featured.map((product) => (
              <li key={product.slug} className="w-[80%] shrink-0 snap-start sm:w-auto">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
