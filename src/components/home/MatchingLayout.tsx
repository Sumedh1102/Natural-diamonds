import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getShape } from "@/data/shapes";
import { contactHref } from "@/lib/inquiry";
import type { DiamondShape } from "@/types";

const rows: { shape: DiamondShape; title: string; text: string }[] = [
  { shape: "round", title: "Matched pairs", text: "Two diamonds chosen to mirror each other for earrings and studs." },
  { shape: "oval", title: "Consistent size & shape", text: "Dimensions and outline aligned so the stones sit as one." },
  { shape: "pear", title: "Colour & clarity", text: "Grades matched across every stone in the set." },
];

export function MatchingLayout() {
  return (
    <section id="matching-layout" aria-labelledby="matching-title" className="border-y border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Matching Layout"
              title={
                <span id="matching-title">
                  Stones That <em>Belong Together</em>
                </span>
              }
              description="From a single matched pair to a multi-stone layout, we assemble natural diamonds of consistent size, shape, colour and clarity — so the finished piece looks balanced from every angle."
            />
            <Reveal className="relative mt-10 aspect-[4/3] overflow-hidden">
              <Image
                src="/images/collections/fancy-shapes-blue.webp"
                alt="Natural diamonds in round, oval, pear, marquise and emerald shapes arranged on deep blue paper"
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-luxe motion-safe:hover:scale-[1.04]"
              />
            </Reveal>
            <ButtonLink href={contactHref("Matched pair or layout")} size="lg" className="mt-10">
              Enquire about matching
            </ButtonLink>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {rows.map((row, index) => {
                const shape = getShape(row.shape);
                return (
                  <Reveal as="li" key={row.title} delay={index * 0.06} className="group grid items-center gap-6 py-8 sm:grid-cols-[auto_1fr] sm:gap-10">
                    <span className="flex items-center gap-3 sm:gap-4" aria-hidden="true">
                      {[0, 1].map((n) => (
                        <span key={n} className="relative block size-24 sm:size-28">
                          <Image
                            src={shape.image}
                            alt=""
                            fill
                            sizes="7rem"
                            className="object-contain transition-transform duration-500 ease-luxe group-hover:scale-105"
                            style={n === 1 ? { transform: "scaleX(-1)" } : undefined}
                          />
                        </span>
                      ))}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-bronze">{shape.label}</p>
                      <h3 className="mt-2 font-serif text-2xl font-light text-white sm:text-3xl">{row.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/60">{row.text}</p>
                    </div>
                  </Reveal>
                );
              })}
              <li className="py-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-bronze">Multi-stone layouts</p>
                <h3 className="mt-2 font-serif text-2xl font-light text-white sm:text-3xl">Sets planned stone by stone</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/60">
                  Tell us the layout — a trio, a line, a halo — and we will source natural diamonds to fit it, matched across every position.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
