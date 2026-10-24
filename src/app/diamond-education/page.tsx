import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, Hash, Microscope, Scale } from "lucide-react";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { FaqSection } from "@/components/home/FaqSection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shapes, specialtyShapes } from "@/data/shapes";
import { certification, clarityScaleGroups, colorScaleGroups, craftSteps, formation, fourCs } from "@/data/education";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Diamond Education",
  description:
    "A clear guide to natural diamonds: the 4Cs of cut, colour, clarity and carat, diamond shapes, how natural diamonds form, and how to read a grading report.",
  path: "/diamond-education",
});

const sections = [
  { id: "four-cs", label: "The 4Cs" },
  { id: "shapes", label: "Shapes" },
  { id: "formation", label: "Formation" },
  { id: "certification", label: "Grading reports" },
  { id: "natural-and-lab-grown", label: "Natural vs lab-grown" },
  { id: "faq", label: "FAQ" },
];

/** Approximate face-up diameters for well-proportioned round brilliants. */
// Round brilliant diameters across the size range offered; the last step covers 1 ct and above.
const caratSizes = [
  { carat: "0.003", mm: "0.9" },
  { carat: "0.01", mm: "1.3" },
  { carat: "0.05", mm: "2.4" },
  { carat: "0.10", mm: "3.0" },
  { carat: "0.25", mm: "4.1" },
  { carat: "0.50", mm: "5.2" },
  { carat: "0.75", mm: "5.8" },
  { carat: "1+", mm: "6.5" },
];

const reportIcons = [Microscope, Hash, Scale];

const comparison = [
  {
    label: "Origin",
    natural: "Crystallised in the Earth's mantle over geological time and brought up by deep volcanic eruptions.",
    lab: "Grown in a laboratory, typically over weeks, using high pressure–high temperature (HPHT) or chemical vapour deposition (CVD).",
  },
  {
    label: "Composition",
    natural: "Carbon atoms in a cubic crystal structure.",
    lab: "The same carbon crystal structure.",
  },
  {
    label: "Identification",
    natural: "Cannot be reliably told apart from lab-grown by eye; laboratories use specialised instruments.",
    lab: "Identified by the same laboratory testing.",
  },
  {
    label: "Grading reports",
    natural: "Reports state that the diamond is natural.",
    lab: "Reports state that the diamond is laboratory-grown.",
  },
];

export default function DiamondEducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Diamond Education"
        title={
          <>
            Understanding <em>Natural Diamonds</em>
          </>
        }
        description="Everything you need to choose with confidence — explained clearly, without jargon. Remember that every natural diamond is unique: these guides describe how diamonds are assessed, not the qualities of any single stone."
        breadcrumbs={[{ label: "Diamond Education" }]}
        image={{ src: "/images/editorial/grading-microscope.webp", alt: "A round brilliant diamond under an inspection microscope" }}
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-bronze hover:text-white"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* The 4Cs */}
      <section id="four-cs" aria-labelledby="four-cs-title" className="bg-ivory py-20 text-ink sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="Quality"
            title={
              <span id="four-cs-title">
                The <em>4Cs</em> of Diamond Quality
              </span>
            }
            description="Cut, colour, clarity and carat weight form the shared language used worldwide to describe a diamond, a framework popularised by the Gemological Institute of America (GIA). No single C tells the whole story; it is the balance between them that matters."
            className="mb-14"
          />

          <ol className="grid gap-5 lg:grid-cols-2">
            {fourCs.map((c, index) => (
              <Reveal as="li" key={c.id} delay={(index % 2) * 0.08}>
                <article id={c.id} className="flex h-full flex-col rounded-2xl border border-ivory-300 bg-white/70 p-7 sm:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-4xl font-light text-ink">{c.title}</h3>
                    <span
                      aria-hidden="true"
                      data-numeral={`0${index + 1}`}
                      className="font-serif text-5xl font-light text-bronze/40 before:content-[attr(data-numeral)]"
                    />
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-bronze-700">{c.tagline}</p>
                  <p className="mt-5 text-[15px] leading-relaxed text-taupe sm:text-base">{c.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-taupe">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-bronze" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-ivory-300 pt-6">
                    {c.id === "color" && (
                      <div>
                        <div
                          aria-hidden="true"
                          className="h-3 rounded-full bg-[linear-gradient(90deg,#ffffff_0%,#fbf8ef_25%,#f6edd2_50%,#efdfae_75%,#e6cc86_100%)] ring-1 ring-ivory-300"
                        />
                        <ul className="mt-3 grid grid-cols-5 gap-1 text-center">
                          {colorScaleGroups.map((group) => (
                            <li key={group.range}>
                              <span className="block text-xs font-medium text-ink">{group.range}</span>
                              <span className="block text-[10px] leading-tight text-taupe">{group.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.id === "clarity" && (
                      <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                        {clarityScaleGroups.map((group) => (
                          <div key={group.range} className="flex gap-3">
                            <dt className="w-24 shrink-0 font-medium text-ink">{group.range}</dt>
                            <dd className="text-taupe">{group.label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {c.id === "carat" && (
                      <div>
                        <p className="mb-4 text-xs text-taupe">Approximate diameter of a well-proportioned round brilliant</p>
                        <ul className="grid grid-cols-4 items-end gap-x-2 gap-y-5 sm:flex sm:justify-between">
                          {caratSizes.map((size) => (
                            <li key={size.carat} className="flex flex-col items-center gap-2">
                              <span
                                aria-hidden="true"
                                className="block rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d9d2c7)] shadow-inner ring-1 ring-ivory-300"
                                style={{ width: `${Number(size.mm) * 4}px`, height: `${Number(size.mm) * 4}px` }}
                              />
                              <span className="text-xs font-medium text-ink">{size.carat} ct</span>
                              <span className="text-[10px] text-taupe">
                                {size.carat.endsWith("+") ? "≥" : "≈"}
                                {size.mm} mm
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.id === "cut" && (
                      <div className="flex items-center gap-5">
                        <span className="relative block size-20 shrink-0">
                          <Image src="/images/shapes/round.webp" alt="" fill sizes="80px" className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]" />
                        </span>
                        <p className="text-sm leading-relaxed text-taupe">
                          Common round brilliant cut grades: <span className="text-ink">Excellent, Very Good, Good, Fair, Poor</span>.
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Shapes */}
      <section id="shapes" aria-labelledby="shapes-guide-title" className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Character"
            title={
              <span id="shapes-guide-title">
                A Guide to <em>Diamond Shapes</em>
              </span>
            }
            description="Shape describes a diamond's outline; the cutting style describes how its facets are arranged. Brilliant cuts sparkle intensely, while step cuts show broad, mirror-like flashes."
            className="mb-14"
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {shapes.map((shape) => (
              <li key={shape.id} className="bg-ink">
                <Link
                  href={`/natural-diamonds?shape=${shape.id}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="relative mx-auto block size-24">
                    <Image
                      src={shape.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain transition-transform duration-500 ease-luxe group-hover:-translate-y-1 group-hover:scale-105"
                    />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-light text-white">{shape.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{shape.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bronze">
                    View {shape.label.toLowerCase()} diamonds
                    <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-bronze">More fancy outlines</h3>
            <ul className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
              {specialtyShapes.map((shape) => (
                <li key={shape.label} className="flex flex-col items-center gap-3 text-center">
                  <span className="relative block size-16">
                    <Image src={shape.image} alt="" fill sizes="64px" className="object-contain opacity-80" />
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-white/55">{shape.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/55">
              Interested in a less common outline?{" "}
              <Link href="/contact?interest=Loose%20natural%20diamond" className="text-bronze underline decoration-bronze/50 underline-offset-4 hover:decoration-bronze">
                Ask our team
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Formation */}
      <section id="formation" aria-labelledby="formation-title" className="border-y border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Origin"
                title={
                  <span id="formation-title">
                    How Natural Diamonds <em>Form</em>
                  </span>
                }
              />
              <p className="mt-6 text-lg leading-relaxed text-white/70">{formation.lead}</p>
              {formation.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-relaxed text-white/60">
                  {paragraph}
                </p>
              ))}
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {formation.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col">
                    <dt className="order-last mt-2 text-xs leading-snug text-white/55">{fact.label}</dt>
                    <dd className="font-serif text-3xl font-light text-bronze-200">
                      {fact.value} <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">{fact.unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/editorial/kimberlite-pipes-sunset.webp"
                  alt="An open-pit mine at sunset above a cutaway of kimberlite pipes rising from deep in the Earth (illustration)"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {craftSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/10 p-6">
                <span className="text-xs tracking-[0.2em] text-bronze">0{index + 1}</span>
                <h3 className="mt-3 font-serif text-2xl font-light text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Grading reports */}
      <section id="certification" aria-labelledby="certification-title" className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Assurance"
                title={
                  <span id="certification-title">
                    Reading a <em>Grading Report</em>
                  </span>
                }
                description={certification.summary}
              />
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-bronze/25 bg-bronze/[0.06] p-5 text-sm leading-relaxed text-white/65">
                <FileCheck2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-bronze" strokeWidth={1.5} />
                <p>
                  Considering a specific diamond? Ask us for its grading report details, then check the report number
                  directly with the issuing laboratory.
                </p>
              </div>
            </div>
            <ul className="grid gap-5 lg:col-span-7">
              {certification.points.map((point, index) => {
                const Icon = reportIcons[index] ?? Microscope;
                return (
                  <Reveal as="li" key={point.title} delay={index * 0.08} className="flex gap-5 rounded-2xl border border-white/10 p-6 sm:p-8">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-bronze">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-light text-white">{point.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/55">{point.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* Natural and lab-grown */}
      <section
        id="natural-and-lab-grown"
        aria-labelledby="comparison-title"
        className="border-t border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-28"
      >
        <Container size="default">
          <SectionHeading
            eyebrow="Know the Difference"
            title={
              <span id="comparison-title">
                Natural and <em>Laboratory-Grown</em>
              </span>
            }
            description="Both are real diamonds, but they are different products with different origins. This website presents natural diamonds only."
            className="mb-12"
          />
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Comparison of natural and laboratory-grown diamonds</caption>
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-[0.2em]">
                <tr>
                  <th scope="col" className="hidden p-5 font-normal text-white/55 sm:table-cell sm:w-48">
                    Aspect
                  </th>
                  <th scope="col" className="p-5 font-normal text-bronze">
                    Natural diamond
                  </th>
                  <th scope="col" className="p-5 font-normal text-white/60">
                    Laboratory-grown diamond
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparison.map((row) => (
                  <tr key={row.label} className="align-top">
                    <th scope="row" className="hidden p-5 font-serif text-xl font-light text-white sm:table-cell">
                      {row.label}
                    </th>
                    <td className="p-5 leading-relaxed text-white/75">
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-white/55 sm:hidden">{row.label}</span>
                      {row.natural}
                    </td>
                    <td className="p-5 leading-relaxed text-white/60">
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-white/55 sm:hidden">&nbsp;</span>
                      {row.lab}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <div id="faq">
        <FaqSection />
      </div>

      <ConsultationCta
        title={
          <>
            Questions About <em>a Diamond?</em>
          </>
        }
        text="Our team is happy to explain any grade or specification and help you compare natural diamonds side by side."
        contactQuery="?interest=General%20guidance"
      />
    </>
  );
}
