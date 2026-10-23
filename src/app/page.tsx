import { ConsultationCta } from "@/components/home/ConsultationCta";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { EducationTeaser } from "@/components/home/EducationTeaser";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedDiamonds } from "@/components/home/FeaturedDiamonds";
import { Hero } from "@/components/home/Hero";
import { NaturalStory } from "@/components/home/NaturalStory";
import { ShapeRail } from "@/components/home/ShapeRail";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllProducts, getFilterOptions } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: `${siteConfig.name} — Nature's Rarest Expression of Beauty`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const { shapes } = getFilterOptions(getAllProducts());

  return (
    <>
      <Hero />

      <section aria-labelledby="shapes-title" className="pt-20 sm:pt-24 lg:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Shop by Shape"
            title={
              <span id="shapes-title">
                Shapes of <em>Natural Diamonds</em>
              </span>
            }
            description="Every outline has its own character. Choose a shape to see the natural diamonds available in it."
            size="md"
          />
          <div className="mt-6">
            <ShapeRail shapes={shapes} />
          </div>
        </Container>
      </section>

      <FeaturedCollections />
      <FeaturedDiamonds />
      <NaturalStory />
      <Craftsmanship />
      <EducationTeaser />
      <FaqSection />
      <ConsultationCta />
    </>
  );
}
