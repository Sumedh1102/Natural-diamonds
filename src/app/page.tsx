import { AboutTeaser } from "@/components/home/AboutTeaser";
import { AssociatedWith } from "@/components/home/AssociatedWith";
import { CalibratedParcel } from "@/components/home/CalibratedParcel";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { EducationTeaser } from "@/components/home/EducationTeaser";
import { EnquirySection } from "@/components/home/EnquirySection";
import { FeaturedDiamonds } from "@/components/home/FeaturedDiamonds";
import { Hero } from "@/components/home/Hero";
import { LooseCertified } from "@/components/home/LooseCertified";
import { MatchingLayout } from "@/components/home/MatchingLayout";
import { OriginJourney } from "@/components/home/OriginJourney";
import { SampleListings } from "@/components/home/SampleListings";
import { ShapesSection } from "@/components/home/ShapesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { WorldOfJewellery } from "@/components/home/WorldOfJewellery";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: `${siteConfig.name} — Mined by Nature. Defined by Time.`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/*
 * Homepage sequence: hero → calibrated parcels → matching layouts → jewellery →
 * categories and shapes → sample and featured listings → craftsmanship → brand →
 * education → why choose us → loose & certified → enquiry → associations →
 * the origin story, which closes the page above the footer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CalibratedParcel />
      <MatchingLayout />
      <WorldOfJewellery />
      <CategoriesSection />
      <ShapesSection />
      <SampleListings />
      <FeaturedDiamonds />
      <Craftsmanship />
      <AboutTeaser />
      <EducationTeaser />
      <WhyChooseUs />
      <LooseCertified />
      <EnquirySection />
      <AssociatedWith />
      <OriginJourney />
    </>
  );
}
