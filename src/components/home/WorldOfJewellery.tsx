import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactHref } from "@/lib/inquiry";

const frames = [
  {
    src: "/images/editorial/setting-loupe.webp",
    alt: "A jeweller inspecting a natural diamond held in a setting through a loupe",
    caption: "Setting",
    aspect: "aspect-[4/5]",
    className: "",
  },
  {
    src: "/images/editorial/design-sketch.webp",
    alt: "A designer sketching a diamond ring on a tablet, with ring drawings pinned behind her",
    caption: "Design",
    aspect: "aspect-square",
    className: "sm:mt-16",
  },
  {
    src: "/images/collections/cushion-tweezers.webp",
    alt: "A cushion-cut natural diamond held in tweezers beneath a microscope",
    caption: "Selection",
    aspect: "aspect-[3/4]",
    className: "hidden lg:block lg:mt-8",
  },
];

export function WorldOfJewellery() {
  return (
    <section id="world-of-jewellery" aria-labelledby="jewellery-title" className="bg-ink-950 py-20 sm:py-24 lg:py-32">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:pt-6">
            <SectionHeading
              eyebrow="Craft & Design"
              title={
                <span id="jewellery-title">
                  World of <em>Jewellery</em>
                </span>
              }
              description="Every piece of fine jewellery begins with a natural diamond. We follow it from selection through design to the setting, so the stone and the craftsmanship around it are considered together."
              size="lg"
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/collections/bespoke-jewellery" variant="outline">
                Bespoke jewellery
              </ButtonLink>
              <ButtonLink href={contactHref("Bespoke jewellery")} variant="text" className="self-start py-3!">
                Share a requirement
              </ButtonLink>
            </div>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-8">
            {frames.map((frame, index) => (
              <Reveal as="li" key={frame.src} delay={index * 0.08} className={frame.className}>
                <figure className="group">
                  <div className={`relative overflow-hidden ${frame.aspect}`}>
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-[1200ms] ease-luxe motion-safe:group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60">
                    <span aria-hidden="true" className="h-px w-8 bg-bronze" />
                    {frame.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
