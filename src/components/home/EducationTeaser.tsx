import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const topics = [
  {
    href: "/diamond-education#four-cs",
    eyebrow: "Quality",
    title: "The 4Cs",
    text: "Cut, colour, clarity and carat weight — the shared language used to describe every diamond.",
    image: { src: "/images/shapes/round.webp", alt: "" },
  },
  {
    href: "/diamond-education#shapes",
    eyebrow: "Character",
    title: "Diamond Shapes",
    text: "How ten classic outlines differ in sparkle, proportion and the way they wear.",
    image: { src: "/images/shapes/pear.webp", alt: "" },
  },
  {
    href: "/diamond-education#formation",
    eyebrow: "Origin",
    title: "Natural Formation",
    text: "Carbon, heat, pressure and time: the story of a diamond before it reaches the surface.",
    image: { src: "/images/shapes/emerald.webp", alt: "" },
  },
  {
    href: "/diamond-education#certification",
    eyebrow: "Assurance",
    title: "Grading Reports",
    text: "What an independent laboratory report records — and how to verify one yourself.",
    image: { src: "/images/shapes/cushion.webp", alt: "" },
  },
];

export function EducationTeaser() {
  return (
    <section aria-labelledby="education-title" className="bg-ivory py-20 text-ink sm:py-24 lg:py-32">
      <Container>
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            eyebrow="Diamond Education"
            title={
              <span id="education-title">
                Choose with <em>Confidence</em>
              </span>
            }
            description="Understanding a diamond makes choosing one a pleasure. Our guides explain what matters, clearly and without jargon."
          />
          <ButtonLink href="/diamond-education" variant="outline-dark" className="self-start lg:self-auto">
            Visit the education hub
          </ButtonLink>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => (
            <Reveal as="li" key={topic.href} delay={index * 0.07}>
              <Link
                href={topic.href}
                className="group flex h-full flex-col rounded-2xl border border-ivory-300 bg-white/60 p-7 transition-[background-color,border-color,transform,box-shadow] duration-500 ease-luxe hover:-translate-y-1 hover:border-bronze/50 hover:bg-white hover:shadow-[0_30px_50px_-35px_rgba(43,36,32,0.45)]"
              >
                <span className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.2em] text-bronze-700">0{index + 1}</span>
                  <span className="relative block size-16 transition-transform duration-700 ease-luxe group-hover:rotate-6 group-hover:scale-110">
                    <Image src={topic.image.src} alt={topic.image.alt} fill sizes="4rem" className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]" />
                  </span>
                </span>
                <span className="mt-8 text-[10px] uppercase tracking-[0.28em] text-taupe">{topic.eyebrow}</span>
                <span className="mt-2 font-serif text-[1.75rem] font-light leading-tight text-ink">{topic.title}</span>
                <span className="mt-3 flex-1 text-[15px] leading-relaxed text-taupe">{topic.text}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-bronze-700">
                  Read the guide
                  <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
