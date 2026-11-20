import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCertifiedProducts } from "@/lib/catalogue";
import { contactHref } from "@/lib/inquiry";

const reportFields = ["Laboratory", "Report number", "Verification"];

/** Two categories in one section. "Certified" is claimed only for listings with a verified grading report. */
export function LooseCertified() {
  const certified = getCertifiedProducts();

  return (
    <section id="loose-certified" aria-labelledby="loose-certified-title" className="bg-ivory py-20 text-ink sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="The Stones"
          title={
            <span id="loose-certified-title">
              Loose &amp; <em>Certified Diamonds</em>
            </span>
          }
          className="mb-14 lg:mb-20"
        />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
          <Reveal className="lg:pr-14">
            <article aria-labelledby="loose-title">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/collections/diamonds-on-charcoal.webp"
                  alt="Three round brilliant natural diamonds resting on charred wood"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover transition-transform duration-[1200ms] ease-luxe motion-safe:hover:scale-[1.04]"
                />
              </div>
              <p className="mt-8 font-serif text-5xl font-light text-bronze-700" aria-hidden="true">
                01
              </p>
              <h3 id="loose-title" className="mt-2 font-serif text-3xl font-light sm:text-4xl">
                Loose Diamonds
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe">
                Natural diamonds, cut and polished but not yet set — chosen on their own merits by shape, carat, colour and clarity, then set to your design or ours.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href={contactHref("Loose natural diamond")} variant="solid-dark">
                  Enquire about loose diamonds
                </ButtonLink>
                <Link href="/natural-diamonds" className="text-[11px] uppercase tracking-[0.2em] text-bronze-700 underline-offset-4 hover:underline">
                  Browse catalogue
                </Link>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="border-ivory-300 lg:border-l lg:pl-14">
            <article aria-labelledby="certified-title">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/editorial/grading-microscope.webp"
                  alt="A round brilliant diamond on the glass stage of an inspection microscope"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover transition-transform duration-[1200ms] ease-luxe motion-safe:hover:scale-[1.04]"
                />
              </div>
              <p className="mt-8 font-serif text-5xl font-light text-bronze-700" aria-hidden="true">
                02
              </p>
              <h3 id="certified-title" className="mt-2 font-serif text-3xl font-light sm:text-4xl">
                Certified Diamonds
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe">
                Diamonds accompanied by an independent laboratory grading report. We show a report&rsquo;s laboratory and number only once it has been checked against the laboratory&rsquo;s own records.
              </p>
              <dl className="mt-6 grid max-w-md grid-cols-3 divide-x divide-ivory-300 border-y border-ivory-300 py-3 text-center">
                {reportFields.map((field) => (
                  <div key={field} className="px-2">
                    <dt className="text-[9px] uppercase tracking-[0.18em] text-taupe">Report</dt>
                    <dd className="mt-1 text-[13px]">{field}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href={contactHref("Certified diamond")} variant="solid-dark">
                  Enquire about certified diamonds
                </ButtonLink>
                {certified.length > 0 && (
                  <Link href="/natural-diamonds" className="text-[11px] uppercase tracking-[0.2em] text-bronze-700 underline-offset-4 hover:underline">
                    {certified.length} with verified {certified.length === 1 ? "report" : "reports"}
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
