import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { contactHref } from "@/lib/inquiry";

const points = [
  { title: "Sorted to size", text: "Stones are graded into narrow size bands, so every diamond in a parcel sits within the same range." },
  { title: "Consistent shape", text: "A parcel is cut to one outline, ready for uniform setting and repeatable production." },
  { title: "Grouped by quality", text: "Colour and clarity ranges are agreed with you up front, so the lot reads as one." },
];

export function CalibratedParcel() {
  return (
    <section id="calibrated-parcel" aria-labelledby="parcel-title" className="bg-ivory py-20 text-ink sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/collections/parcel-paper.webp"
                alt="A small parcel of cut natural diamonds in assorted sizes on folded white paper, with a loupe and tweezers"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe motion-safe:hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-bronze-700">Natural diamond parcel</p>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading
              tone="light"
              eyebrow="Calibrated Parcel"
              title={
                <span id="parcel-title">
                  Diamonds Sorted, <em>Size for Size</em>
                </span>
              }
              description={`A calibrated parcel is a lot of natural diamonds of matching size and shape, made for jewellery manufacturers and wholesalers who need consistency across many stones. Sizes range from ${siteConfig.sizeRange.text}.`}
            />
            <dl className="mt-12 divide-y divide-ivory-300 border-y border-ivory-300">
              {points.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.06} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                  <dt className="font-serif text-xl text-ink">{point.title}</dt>
                  <dd className="text-[15px] leading-relaxed text-taupe">{point.text}</dd>
                </Reveal>
              ))}
            </dl>
            <ButtonLink href={contactHref("Calibrated parcel")} variant="solid-dark" size="lg" className="mt-10">
              Enquire about parcels
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
