import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-title" className="relative overflow-hidden border-y border-white/10 bg-ink-900">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[22rem] lg:min-h-[38rem]">
          <Image
            src="/images/editorial/design-sketch.webp"
            alt="A designer sketching a diamond ring at her desk"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink-900/50" />
        </Reveal>
        <Container className="flex items-center py-16 sm:py-20 lg:max-w-none lg:px-16 lg:py-24 xl:px-24">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="About the Brand"
              title={
                <span id="about-teaser-title">
                  A Dedicated Home for <em>Natural Diamonds</em>
                </span>
              }
              description={`${siteConfig.name} is a space created by ${siteConfig.company} in Mumbai for those drawn to the character of a diamond formed by nature — presented clearly, chosen with guidance and set with care.`}
              size="md"
            />
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Natural and laboratory-grown diamonds are different choices, and each deserves to be presented on its own
              terms. That is why this website is devoted to natural diamonds alone.
            </p>
            <ButtonLink href="/about" variant="outline" className="mt-10">
              Our story
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
}
