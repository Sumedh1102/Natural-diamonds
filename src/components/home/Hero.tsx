import { getImageProps } from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const pathways = [
  { label: "Diamond Categories", href: "/#categories" },
  { label: "Engagement Diamonds", href: "/collections/engagement-diamonds" },
  { label: "Bespoke Jewellery", href: "/collections/bespoke-jewellery" },
];

/*
 * The mine imagery is a computer-generated render of a generic open-pit
 * kimberlite mine (see tools/mine-render). Replace the two files with licensed
 * photography when available, keeping the compositions: pit to the right in
 * the landscape frame, pit centred under a dark sky in the portrait frame.
 */
const alt = "An open-pit diamond mine at dusk: terraced benches spiral down into the earth beneath a glowing horizon";

function heroSources() {
  const common = { alt, sizes: "100vw", quality: 75, loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: landscape },
  } = getImageProps({ ...common, src: "/images/hero/mine-desktop.webp", width: 2560, height: 1440 });
  const {
    props: { srcSet: portrait, ...img },
  } = getImageProps({ ...common, src: "/images/hero/mine-mobile.webp", width: 1080, height: 1920 });
  return { landscape, portrait, img };
}

export function Hero() {
  const { landscape, portrait, img } = heroSources();

  return (
    <section
      aria-labelledby="hero-title"
      // Pulled up beneath the transparent header.
      className="relative isolate -mt-[72px] flex min-h-[calc(100svh-2.25rem)] flex-col overflow-hidden bg-ink-950 sm:-mt-20 wide:min-h-[max(40rem,calc(100svh-2.25rem))]"
    >
      <div className="absolute inset-0 -z-20 motion-safe:animate-[settle_16s_var(--ease-luxe)_both]">
        <picture>
          <source media="(min-aspect-ratio: 5/4)" srcSet={landscape} />
          <source srcSet={portrait} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img
            {...img}
            className="size-full object-cover object-[50%_62%] wide:object-[72%_55%]"
          />
        </picture>
      </div>

      {/* Legibility: dark sky band and foreground on portrait; a left-hand wash on landscape. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,0.72)_0%,rgba(8,8,8,0.25)_34%,rgba(8,8,8,0)_52%,rgba(8,8,8,0.2)_74%,rgba(8,8,8,0.9)_100%)] wide:bg-[linear-gradient(90deg,rgba(8,8,8,0.88)_0%,rgba(8,8,8,0.6)_32%,rgba(8,8,8,0.08)_62%,rgba(8,8,8,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 hidden h-40 bg-gradient-to-b from-black/70 to-transparent wide:block"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-ink-950 wide:h-56" />

      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-between px-5 pb-8 pt-[calc(72px+1.75rem)] sm:px-8 sm:pt-[calc(80px+2.5rem)] wide:justify-center wide:px-12 wide:pb-28 wide:pt-[calc(80px+3rem)]">
        <div className="max-w-xl wide:max-w-2xl">
          <div className="motion-safe:animate-[rise_0.9s_var(--ease-luxe)_both]">
            <Eyebrow rule className="text-bronze-200">
              Natural Diamonds
            </Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="mt-5 font-serif text-[2.65rem] font-light leading-[1.02] text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl wide:mt-6 wide:text-6xl xl:wide:text-7xl 2xl:wide:text-[5.4rem] motion-safe:animate-[rise_0.9s_var(--ease-luxe)_0.08s_both]"
          >
            Mined by Nature.
            <br />
            <em className="text-gold-gradient italic">Defined by Time.</em>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 sm:max-w-lg sm:text-lg wide:mt-7 wide:text-white/75 motion-safe:animate-[rise_0.9s_var(--ease-luxe)_0.18s_both]">
            Discover the extraordinary beauty of natural diamonds — formed deep within the Earth and transformed into
            timeless expressions of brilliance.
          </p>
        </div>

        <div className="mt-10 motion-safe:animate-[rise_0.9s_var(--ease-luxe)_0.3s_both]">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/natural-diamonds" size="lg">
              Explore Natural Diamonds
            </ButtonLink>
            <ButtonLink href="/#origin" variant="outline" size="lg" icon="none" className="bg-black/20 backdrop-blur-sm">
              Discover Their Origin
            </ButtonLink>
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-white/55 wide:hidden">
            Illustration · open-pit kimberlite mine
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-black/35 backdrop-blur-md wide:block">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-12">
          <nav aria-label="Featured pathways">
            <ul className="flex divide-x divide-white/10">
              {pathways.map((pathway, index) => (
                <li key={pathway.href}>
                  <Link
                    href={pathway.href}
                    className="group flex items-center gap-4 py-5 pr-8 [li+li_&]:pl-8"
                  >
                    <span className="text-[11px] tracking-[0.2em] text-bronze">0{index + 1}</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/75 transition-colors group-hover:text-white">
                      {pathway.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-5 bg-bronze/60 transition-all duration-500 group-hover:w-9 group-hover:bg-bronze"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Illustration · open-pit kimberlite mine</p>
        </div>
      </div>
    </section>
  );
}
