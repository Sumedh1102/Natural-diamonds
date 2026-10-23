import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SampleNotice } from "@/components/products/SampleNotice";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections, getCollection } from "@/data/collections";
import { getProductsInCollection } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return pageMetadata({
    title: collection.title,
    description: `${collection.summary} ${collection.description[0]}`.slice(0, 300),
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = collection.kind === "catalogue" ? getProductsInCollection(collection.slug) : [];
  const others = collections.filter((other) => other.slug !== collection.slug).slice(0, 3);
  const contactQuery = `?interest=${encodeURIComponent(collection.inquiryInterest)}`;

  return (
    <>
      <PageHero
        eyebrow={collection.eyebrow}
        title={collection.title}
        description={
          <div className="space-y-4">
            {collection.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        }
        breadcrumbs={[{ label: "Collections", href: "/collections" }, { label: collection.title }]}
        image={collection.image}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {collection.kind === "catalogue" ? (
            <ButtonLink href={`/natural-diamonds${collection.catalogueQuery ?? ""}`}>Refine in the catalogue</ButtonLink>
          ) : (
            <ButtonLink href={`/contact${contactQuery}`}>Start an inquiry</ButtonLink>
          )}
          <ButtonLink href="/diamond-education" variant="outline" icon="none">
            Diamond education
          </ButtonLink>
        </div>
      </PageHero>

      {collection.highlights && (
        <section aria-label="Highlights" className="border-b border-white/10">
          <Container>
            <ul className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {collection.highlights.map((highlight, index) => (
                <li key={highlight.title} className="py-8 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0">
                  <span className="text-xs tracking-[0.2em] text-bronze">0{index + 1}</span>
                  <h2 className="mt-3 font-serif text-2xl font-light text-white">{highlight.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{highlight.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {collection.kind === "catalogue" && (
        <section aria-labelledby="collection-diamonds" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                size="md"
                eyebrow={`${items.length} ${items.length === 1 ? "diamond" : "diamonds"}`}
                title={
                  <span id="collection-diamonds">
                    In This <em>Collection</em>
                  </span>
                }
              />
              <ButtonLink
                href={`/natural-diamonds${collection.catalogueQuery ?? ""}`}
                variant="outline"
                className="self-start sm:self-auto"
              >
                Search &amp; filter
              </ButtonLink>
            </div>
            <SampleNotice show={items.some((item) => item.isSample)} className="mb-8 max-w-3xl" />
            {items.length > 0 ? (
              <ProductGrid products={items} className="lg:grid-cols-3" />
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
                <h3 className="font-serif text-3xl font-light text-white">No listings at the moment</h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
                  There are no listings in this collection right now. Tell us what you are looking for and we will be in
                  touch.
                </p>
                <ButtonLink href={`/contact${contactQuery}`} className="mt-8">
                  Enquire
                </ButtonLink>
              </div>
            )}
          </Container>
        </section>
      )}

      {collection.process && (
        <section aria-labelledby="collection-process" className="bg-ink-900 py-16 sm:py-20 lg:py-28">
          <Container>
            <SectionHeading
              eyebrow="The Process"
              title={
                <span id="collection-process">
                  How It <em>Comes Together</em>
                </span>
              }
              className="mb-12 lg:mb-16"
            />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {collection.process.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.08} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink">
                  {step.image ? (
                    <div className="relative aspect-[4/3]">
                      <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#2c2622,#111)]">
                      <span className="font-serif text-7xl font-light text-bronze/40">0{index + 1}</span>
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <span className="text-xs tracking-[0.2em] text-bronze">Step 0{index + 1}</span>
                    <h3 className="mt-2 font-serif text-2xl font-light text-white">{step.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/55">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <section aria-labelledby="other-collections" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            size="md"
            eyebrow="Explore More"
            title={
              <span id="other-collections">
                Other <em>Collections</em>
              </span>
            }
            className="mb-10"
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug} className="flex">
                <CollectionCard collection={other} className="w-full" sizes="(min-width: 768px) 33vw, 100vw" showSummary={false} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ConsultationCta contactQuery={contactQuery} />
    </>
  );
}
