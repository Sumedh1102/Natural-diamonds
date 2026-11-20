import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/config/partners";

/** Organisation logos, supplied through `config/partners.ts`, shown in their original proportions and colours. */
export function AssociatedWith() {
  return (
    <section id="associated-with" aria-labelledby="associated-title" className="bg-ivory py-20 text-ink sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          tone="light"
          align="center"
          size="md"
          eyebrow="Trusted Network"
          title={<span id="associated-title">Associated <em>With</em></span>}
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-ivory-300">
          {partners.map((partner, index) => (
            <Reveal as="li" key={partner.id} delay={index * 0.08} className="group flex flex-col items-center px-6 text-center sm:px-10">
              <div className="flex h-32 w-full items-center justify-center transition-transform duration-500 ease-luxe motion-safe:group-hover:-translate-y-1">
                {partner.logo ? (
                  <Image
                    src={partner.logo.src}
                    alt={`${partner.name} logo`}
                    width={partner.logo.width}
                    height={partner.logo.height}
                    unoptimized={partner.logo.src.endsWith(".svg")}
                    className="h-auto max-h-28 w-auto max-w-full object-contain transition-[filter] duration-500 group-hover:drop-shadow-[0_10px_18px_rgba(43,36,32,0.18)]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`Official ${partner.name} logo to be added`}
                    className="flex h-28 w-full max-w-xs flex-col items-center justify-center gap-1 border border-dashed border-ivory-300 px-4 text-taupe transition-colors group-hover:border-bronze"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em]">Logo placeholder</span>
                    <span className="font-serif text-lg text-ink">{partner.name}</span>
                  </div>
                )}
              </div>
              <p className="mt-5 text-sm text-taupe">{partner.descriptor}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
