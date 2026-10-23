import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const pathways = [
  { label: "Loose Natural Diamonds", href: "/collections/loose-natural-diamonds" },
  { label: "Engagement Diamonds", href: "/collections/engagement-diamonds" },
  { label: "Bespoke Jewellery", href: "/collections/bespoke-jewellery" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-black">
      {/* Warm studio glow behind the stone */}
      <div
        aria-hidden="true"
        className="absolute right-[-20%] top-[-10%] -z-10 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(184,138,106,0.22)_0%,rgba(184,138,106,0.06)_45%,transparent_70%)] lg:right-[-6%] lg:top-[2%] lg:size-[52rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink"
      />

      <div className="mx-auto grid max-w-screen-2xl items-center gap-4 px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-16">
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6 xl:pl-8">
          <div className="motion-safe:animate-[rise_0.9s_var(--ease-luxe)_both]">
            <Eyebrow rule>Natural Diamonds by NAV</Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="mt-6 font-serif text-[2.9rem] font-light leading-[1.02] text-balance text-white sm:text-7xl xl:text-[5.5rem]"
          >
            Nature&rsquo;s <em className="text-gold-gradient italic">Rarest</em> Expression of Beauty
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg motion-safe:animate-[rise_0.9s_var(--ease-luxe)_0.15s_both]">
            Discover the enduring brilliance of natural diamonds — shaped by the Earth over billions of years and
            selected for life&rsquo;s most meaningful moments.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 motion-safe:animate-[rise_0.9s_var(--ease-luxe)_0.3s_both]">
            <ButtonLink href="/natural-diamonds" size="lg">
              Explore Natural Diamonds
            </ButtonLink>
            <ButtonLink href="/about" variant="outline" size="lg" icon="none">
              Discover Our Story
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-bronze/20 blur-[90px] motion-safe:animate-shimmer" />
            <div className="relative size-full motion-safe:animate-float">
              <Image
                src="/images/hero/round-brilliant.webp"
                alt="A round brilliant natural diamond, photographed face-up"
                fill
                preload
                quality={85}
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 28rem, 22rem"
                className="mask-vignette object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Featured pathways" className="relative border-t border-white/10">
        <ul className="mx-auto grid max-w-screen-2xl divide-y divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-12">
          {pathways.map((pathway, index) => (
            <li key={pathway.href}>
              <Link
                href={pathway.href}
                className="group flex items-center gap-4 py-5 transition-colors sm:justify-center sm:px-4 sm:py-6"
              >
                <span className="text-[11px] tracking-[0.2em] text-bronze">0{index + 1}</span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/70 transition-colors group-hover:text-white">
                  {pathway.label}
                </span>
                <span aria-hidden="true" className="h-px w-5 bg-bronze/60 transition-all duration-500 group-hover:w-9 group-hover:bg-bronze" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
