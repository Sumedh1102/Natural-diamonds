import { ProductCard } from "@/components/products/ProductCard";
import { SampleNotice } from "@/components/products/SampleNotice";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSampleProducts } from "@/lib/catalogue";

/**
 * Illustrative starter listings, kept apart from Featured Diamonds so that
 * samples are never presented as real inventory. Renders nothing once the
 * catalogue holds no samples.
 */
export function SampleListings() {
  const samples = getSampleProducts(4);
  if (samples.length === 0) return null;

  return (
    <section id="sample-listings" aria-labelledby="samples-title" className="border-y border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Illustrative"
            title={
              <span id="samples-title">
                Sample <em>Listings</em>
              </span>
            }
            description="A look at how natural diamonds are presented here — shape, carat, colour and clarity at a glance. Open any listing to see its full layout."
          />
          <ButtonLink href="/natural-diamonds" className="self-start lg:self-auto">
            Browse the catalogue
          </ButtonLink>
        </div>

        <SampleNotice show className="mb-8 max-w-3xl" />

        {/* Swipeable on phones, a grid from tablet up */}
        <ul className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {samples.map((product) => (
            <li key={product.slug} className="w-[80%] shrink-0 snap-start sm:w-auto">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
