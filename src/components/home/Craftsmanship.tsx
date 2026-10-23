import { Gem, MessagesSquare, PenTool } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { craftSteps } from "@/data/education";
import { CraftJourney } from "./CraftJourney";

const values = [
  {
    icon: MessagesSquare,
    title: "Personal guidance",
    text: "Speak with our team by phone, WhatsApp or email for help comparing diamonds and understanding their details.",
  },
  {
    icon: Gem,
    title: "Clear specifications",
    text: "Every listing sets out shape, carat weight, colour and clarity, so you can compare natural diamonds like for like.",
  },
  {
    icon: PenTool,
    title: "Bespoke craftsmanship",
    text: "Our jewellery service designs, models and sets each piece around the natural diamond you choose.",
  },
];

export function Craftsmanship() {
  return (
    <section aria-labelledby="craft-title" className="bg-ink-900 py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Craftsmanship"
          title={
            <span id="craft-title">
              From Rough Stone to <em>Finished Diamond</em>
            </span>
          }
          description="Transforming a rough natural diamond into a finished gem is a precise, highly skilled journey of planning, cutting and polishing."
          className="mb-12 lg:mb-16"
        />
        <CraftJourney steps={craftSteps} />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3 lg:mt-20">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index * 0.08} className="bg-ink-900 p-8 sm:p-10">
              <value.icon aria-hidden="true" className="size-6 text-bronze" strokeWidth={1.25} />
              <h3 className="mt-6 font-serif text-2xl font-light text-white">{value.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">{value.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
