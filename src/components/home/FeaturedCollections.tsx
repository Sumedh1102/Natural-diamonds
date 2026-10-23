import { CollectionCard } from "@/components/collections/CollectionCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/data/collections";
import { cn } from "@/lib/format";

// Bento layout: one tall feature tile, then a mix of wide and standard tiles.
const tileLayout = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

const tileSizes = "(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw";

export function FeaturedCollections() {
  return (
    <section aria-labelledby="collections-title" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Collections"
            title={
              <span id="collections-title">
                Curated for <em>Every Moment</em>
              </span>
            }
            description="Explore natural diamonds by the way they will be worn — from loose stones and engagement centre stones to bespoke jewellery made around them."
          />
          <ButtonLink href="/collections" variant="outline" className="self-start lg:self-auto">
            All collections
          </ButtonLink>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:auto-rows-[17rem] lg:grid-cols-6">
          {collections.slice(0, 5).map((collection, index) => (
            <Reveal key={collection.slug} delay={index * 0.06} className={cn("flex", index === 0 && "min-h-[28rem] lg:min-h-0", tileLayout[index])}>
              <CollectionCard
                collection={collection}
                sizes={tileSizes}
                className="w-full lg:min-h-0"
                showSummary={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
