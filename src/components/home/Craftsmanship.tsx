import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { craftSteps } from "@/data/education";
import { CraftJourney } from "./CraftJourney";

export function Craftsmanship() {
  return (
    <section id="craftsmanship" aria-labelledby="craft-title" className="bg-ink-950 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow="Quality, Precision & Craftsmanship"
            title={
              <span id="craft-title">
                From Rough Stone to <em>Finished Diamond</em>
              </span>
            }
            className="lg:col-span-7"
          />
          <p className="text-base leading-relaxed text-white/60 sm:text-lg lg:col-span-5">
            Transforming rough into a polished natural diamond is a precise, highly skilled journey of planning, cutting,
            polishing and grading — each stage shaping how the finished stone handles light.
          </p>
        </div>
        <CraftJourney steps={craftSteps} />
      </Container>
    </section>
  );
}
