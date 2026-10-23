import { Gem, MapPin, MessagesSquare, PenTool, ScanSearch, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

/*
 * Keep every point factual and supportable. Add verified credentials
 * (grading partners, memberships, experience) here only once confirmed.
 */
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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Why Choose Us"
              size="md"
              title={
                <span id="why-title">
                  Choosing With <em>Clarity</em>
                </span>
              }
              description="A natural diamond is a considered purchase. These are the commitments behind every listing and every conversation."
            />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-8">
            {reasons.map((reason, index) => (
              <Reveal as="li" key={reason.title} delay={(index % 2) * 0.06} className="bg-ink p-7 sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-full border border-bronze/30 text-bronze">
                  <reason.icon aria-hidden="true" className="size-5" strokeWidth={1.4} />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-light text-white">{reason.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{reason.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
