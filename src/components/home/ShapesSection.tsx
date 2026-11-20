import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProducts, getFilterOptions } from "@/lib/catalogue";
import { ShapeRail } from "./ShapeRail";

/** "Shapes of Diamonds": a sliding rail of every shape the catalogue offers. */
export function ShapesSection() {
  const { shapes } = getFilterOptions(getAllProducts());

  return (
    <section id="shapes" aria-labelledby="shapes-title" className="border-t border-white/10 pb-20 pt-16 sm:pb-24 lg:pb-32 lg:pt-20">
      <Container>
        <SectionHeading
          eyebrow="Browse by Shape"
          size="md"
          title={
            <span id="shapes-title">
              Shapes of <em>Diamonds</em>
            </span>
          }
          description="Slide through the outlines we offer and open the catalogue at any shape."
          className="mb-10"
        />
        <ShapeRail shapes={shapes} />
      </Container>
    </section>
  );
}
