import Image from "next/image";
import { Compass, Eye, Gem, HandHeart, MapPin } from "lucide-react";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { CraftJourney } from "@/components/home/CraftJourney";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { craftSteps } from "@/data/education";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Story",
  description:
    "NAV Natural Diamonds is a dedicated home for natural diamonds from NAV Diamonds in Mumbai — presented clearly, chosen with guidance and set with care.",
  path: "/about",
});

/*
 * Copy on this page is deliberately general. Add verified details — the
 * company's history, team, expertise and any credentials — before launch.
 */
const principles = [
  {
    icon: Eye,
    title: "Clarity first",
    text: "Every diamond is described plainly — shape, carat weight, colour and clarity — so you always know what you are looking at.",
  },
  {
    icon: Compass,
    title: "Guidance, not pressure",
    text: "Choosing a diamond should be a pleasure. We answer questions patiently and help you weigh what matters to you.",
  },
  {
    icon: Gem,
    title: "Natural, and only natural",
    text: "This website is devoted entirely to natural diamonds. Laboratory-grown diamonds are never mixed into this collection.",
  },
  {
    icon: HandHeart,
    title: "Care in the making",
    text: "When a diamond becomes jewellery, each piece is designed and set with attention to comfort, durability and the security of the stone.",
  },
];

const consultationSteps = [
  { title: "Tell us what you are looking for", text: "A shape, a size, a budget or simply the moment you want to mark." },
  { title: "Review a considered selection", text: "We share natural diamonds that suit your brief, with their specifications." },
  { title: "Ask anything", text: "Compare options, understand the grades and take the time you need." },
  { title: "Keep it loose or make it yours", text: "Choose the stone alone, or have it set through our bespoke service." },
];

export default function AboutPage() {
  const { address } = siteConfig.contact;

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            A Dedicated Home for <em>Natural Diamonds</em>
          </>
        }
        description={`${siteConfig.name} is a space created by ${siteConfig.company} in Mumbai for those drawn to the character of a diamond formed by nature — presented clearly, chosen with guidance and set with care.`}
        breadcrumbs={[{ label: "Our Story" }]}
        image={{
          src: "/images/editorial/rough-sunlit.webp",
          alt: "Rough diamond crystals of different colours in soft sunlight",
        }}
      />

      <section aria-labelledby="approach-title" className="py-20 sm:py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/editorial/kimberlite-rock.webp"
                alt="Crystals embedded in layered dark rock"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[20%_50%]"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our Approach"
              title={
                <span id="approach-title">
                  Why Natural Diamonds <em>Stand Apart</em>
                </span>
              }
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/60 sm:text-lg">
              <p>
                Every natural diamond carries a history that began deep within the Earth, long before it was found, cut
                and polished. Its inclusions, its colour and its proportions are a record of that journey, and no two are
                alike.
              </p>
              <p>
                Natural and laboratory-grown diamonds are different choices, and we believe each deserves to be presented
                on its own terms. That is why this website is dedicated to natural diamonds alone.
              </p>
            </div>
            <blockquote className="mt-10 border-l-2 border-bronze/50 pl-6">
              <p className="font-serif text-2xl font-light italic leading-snug text-white sm:text-[1.7rem]">
                &ldquo;Every natural diamond represents elegance, authenticity and brilliance — a testament to
                nature&rsquo;s power and human craftsmanship.&rdquo;
              </p>
            </blockquote>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="border-y border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            align="center"
            title={
              <span id="principles-title">
                Our <em>Principles</em>
              </span>
            }
            className="mb-14"
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 0.07} className="bg-ink-900 p-8">
                <principle.icon aria-hidden="true" className="size-6 text-bronze" strokeWidth={1.25} />
                <h3 className="mt-6 font-serif text-2xl font-light text-white">{principle.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{principle.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="journey-title" className="py-20 sm:py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="The Journey of a Diamond"
            title={
              <span id="journey-title">
                From Rough Stone to <em>Finished Diamond</em>
              </span>
            }
            description="Transforming a rough natural diamond into a finished gem involves a precise, highly skilled journey of planning, cutting and polishing."
            className="mb-12 lg:mb-16"
          />
          <CraftJourney steps={craftSteps} />
        </Container>
      </section>

      <section aria-labelledby="consultation-steps-title" className="bg-ivory py-20 text-ink sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="light"
              eyebrow="Working With Us"
              title={
                <span id="consultation-steps-title">
                  How a Consultation <em>Works</em>
                </span>
              }
              description="Whether you know exactly what you want or are just beginning, the process is simple and unhurried."
            />
            <ButtonLink href="/contact" variant="solid-dark" className="mt-10">
              Book a consultation
            </ButtonLink>
          </div>
          <ol className="lg:col-span-7">
            {consultationSteps.map((step, index) => (
              <li key={step.title} className="flex gap-6 border-b border-ivory-300 py-7 first:pt-0 last:border-b-0">
                <span className="font-serif text-4xl font-light text-bronze-700">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl font-light text-ink">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-taupe">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="visit-title" className="py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-5">
            <MapPin aria-hidden="true" className="mt-1 size-6 shrink-0 text-bronze" strokeWidth={1.25} />
            <div>
              <h2 id="visit-title" className="font-serif text-3xl font-light text-white">
                Based in Mumbai
              </h2>
              <p className="mt-3 text-white/55">{address.lines.join(", ")}</p>
            </div>
          </div>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </Container>
      </section>

      <ConsultationCta />
    </>
  );
}
