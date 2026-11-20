import Image from "next/image";
import { Gem, MapPin, MessagesSquare, PenTool, ScanSearch, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { contactHref } from "@/lib/inquiry";
import { ButtonLink } from "@/components/ui/Button";

/*
 * Keep every point factual and supportable. Add verified credentials
 * (grading partners, memberships, experience) here only once confirmed.
 */
const highlights = [
  {
    eyebrow: "B2B Operations",
    title: "Working With the Trade",
    text: "We provide B2B services and work with business partners, wholesalers and jewellery manufacturers, supplying natural diamonds to the trade.",
    image: {
      src: "/images/editorial/rough-inspection.webp",
      alt: "Gloved hands examining a rough diamond under a microscope, with trays of rough stones beside it",
    },
    cta: { label: "Enquire as a business", href: contactHref("B2B requirement") },
  },
  {
    eyebrow: "In-house Machinery",
    title: "Our Own Machinery",
    text: "We own and operate our own machinery, keeping the work on our diamonds under our own care.",
    image: {
      src: "/images/editorial/cutter-loupe.webp",
      alt: "A diamond cutter wearing a loupe, polishing a stone on a spinning wheel",
    },
    cta: { label: "Ask about our work", href: contactHref("General guidance") },
  },
];

const reasons = [
  {
    icon: Gem,
    title: "Natural diamonds only",
    text: "This website presents natural diamonds exclusively. Laboratory-grown diamonds are never mixed into the collection.",
  },
  {
    icon: ShieldCheck,
    title: "Colour origin disclosed",
    text: "Every listing states whether its colour is natural or the result of treatment, so you always know what you are looking at.",
  },
  {
    icon: ScanSearch,
    title: "Clear specifications",
    text: "Category, shape, carat weight, colour and clarity are set out for each diamond, so you can compare like for like.",
  },
  {
    icon: MessagesSquare,
    title: "Personal guidance",
    text: "Speak with our team by phone, WhatsApp or email for help understanding grades and narrowing your choice.",
  },
  {
    icon: PenTool,
    title: "Bespoke craftsmanship",
    text: "Our jewellery service designs, models and sets each piece around the natural diamond you choose.",
  },
  {
    icon: MapPin,
    title: `Based in ${siteConfig.contact.address.locality}`,
    text: `Find us at ${siteConfig.contact.address.lines[0]}, in the heart of the city's diamond trade.`,
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          size="md"
          title={
            <span id="why-title">
              Choosing With <em>Clarity</em>
            </span>
          }
          description="A natural diamond is a considered purchase. These are the commitments behind every listing and every conversation."
          className="mb-12 lg:mb-16"
        />

        <ul className="grid gap-10 md:grid-cols-2 lg:gap-14">
          {highlights.map((item, index) => (
            <Reveal as="li" key={item.eyebrow} delay={index * 0.08} className="group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1280px) 36rem, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[1200ms] ease-luxe motion-safe:group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-bronze">{item.eyebrow}</p>
              <h3 className="mt-3 font-serif text-3xl font-light text-white sm:text-4xl">{item.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">{item.text}</p>
              <ButtonLink href={item.cta.href} variant="text" className="mt-5">
                {item.cta.label}
              </ButtonLink>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason.title} delay={(index % 3) * 0.06} className="bg-ink p-7 sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-full border border-bronze/30 text-bronze">
                <reason.icon aria-hidden="true" className="size-5" strokeWidth={1.4} />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-light text-white">{reason.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{reason.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
