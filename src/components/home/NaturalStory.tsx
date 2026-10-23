import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formation } from "@/data/education";

export function NaturalStory() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <figure className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/editorial/rough-and-polished.webp"
                alt="Rough natural diamond crystals beside a polished Asscher-cut diamond"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/55">
              From rough crystal to polished diamond
            </figcaption>
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -left-10 -z-10 size-56 rounded-full bg-bronze/10 blur-3xl"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The Natural Story"
            title={
              <span id="story-title">
                Formed Deep Within <em>the Earth</em>
              </span>
            }
            size="md"
          />
          <p className="mt-6 text-lg leading-relaxed text-white/70">{formation.lead}</p>
          <p className="mt-4 text-base leading-relaxed text-white/60">{formation.paragraphs[0]}</p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {formation.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block font-serif text-3xl font-light text-bronze-200 sm:text-4xl">{fact.value}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/60">{fact.unit}</span>
                  <span aria-hidden="true" className="mt-2 block text-xs leading-snug text-white/55">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <ButtonLink href="/diamond-education#formation" variant="outline" className="mt-10">
            How natural diamonds form
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
