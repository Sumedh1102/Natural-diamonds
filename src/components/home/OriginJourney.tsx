import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formation, originSteps } from "@/data/education";
import { EarthCrossSection } from "./EarthCrossSection";

/** "From Earth to Diamond": the natural origin of every diamond on the site. */
export function OriginJourney() {
  return (
    <section id="origin" aria-labelledby="origin-title" className="relative bg-ink-950 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)]">
                  <EarthCrossSection className="mx-auto block h-auto w-full max-w-md" />
                </div>
              </Reveal>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                {formation.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col">
                    <dt className="order-last mt-2 text-xs leading-snug text-white/55">{fact.label}</dt>
                    <dd className="font-serif text-3xl font-light text-bronze-200">
                      {fact.value}
                      <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.2em] text-white/60">{fact.unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="From Earth to Diamond"
              title={
                <span id="origin-title">
                  A Journey Measured in <em>Billions of Years</em>
                </span>
              }
              description={formation.lead}
            />

            <ol className="mt-12 border-t border-white/10">
              {originSteps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.05} className="border-b border-white/10 py-8 sm:py-10">
                  <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <span className="font-serif text-4xl font-light text-bronze/70 sm:text-5xl">0{index + 1}</span>
                    <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start md:gap-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-bronze">{step.meta}</p>
                        <h3 className="mt-2 font-serif text-[1.75rem] font-light leading-tight text-white">{step.title}</h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">{step.text}</p>
                      </div>
                      {step.image && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 md:w-44">
                          <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 768px) 11rem, 90vw" className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#craftsmanship" variant="outline">
                From rough to polished
              </ButtonLink>
              <ButtonLink href="/diamond-education#formation" variant="text" icon="right">
                Read more about formation
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
