import { CollectionCard } from "@/components/collections/CollectionCard";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { collections } from "@/data/collections";
import { cn } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Natural Diamond Collections",
  description:
    "Explore our natural diamond collections: loose diamonds, engagement centre stones, fancy shapes, matched pairs and bespoke natural diamond jewellery.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title={
          <>
            Natural Diamond <em>Collections</em>
          </>
        }
        description="Each collection is a way into the world of natural diamonds — whether you are choosing a single stone, a matched pair or a piece made for you."
        breadcrumbs={[{ label: "Collections" }]}
      />

      <section aria-label="All collections" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {collections.map((collection, index) => (
              <Reveal
                as="li"
                key={collection.slug}
                delay={(index % 2) * 0.08}
                className={cn("flex", index === 0 && "md:col-span-2")}
              >
                <CollectionCard
                  collection={collection}
                  headingLevel="h2"
                  className={cn("w-full", index === 0 ? "min-h-[26rem] md:min-h-[32rem]" : "min-h-[26rem]")}
                  sizes={index === 0 ? "(min-width: 1280px) 80rem, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ConsultationCta />
    </>
  );
}
