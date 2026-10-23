import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { EducationTeaser } from "@/components/home/EducationTeaser";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedDiamonds } from "@/components/home/FeaturedDiamonds";
import { Hero } from "@/components/home/Hero";
import { OriginJourney } from "@/components/home/OriginJourney";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: `${siteConfig.name} — Mined by Nature. Defined by Time.`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/*
 * The homepage follows a natural diamond from the Earth to the finished stone:
 * origin → categories → featured diamonds → craftsmanship → collections →
 * brand → education → why choose us → consultation.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OriginJourney />
      <CategoriesSection />
      <FeaturedDiamonds />
      <Craftsmanship />
      <FeaturedCollections />
      <AboutTeaser />
      <EducationTeaser />
      <WhyChooseUs />
      <ConsultationCta />
    </>
  );
}
