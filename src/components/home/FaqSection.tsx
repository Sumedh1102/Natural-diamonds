import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            size="md"
            title={
              <span id="faq-title">
                Questions, <em>Answered</em>
              </span>
            }
            description="Helpful answers about natural diamonds and how we can help you choose one."
          />
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
