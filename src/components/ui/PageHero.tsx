import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import type { ImageAsset } from "@/types";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  image?: ImageAsset;
  children?: ReactNode;
};

/** Interior page header: editorial title on the left, art-directed image on the right. */
export function PageHero({ eyebrow, title, description, breadcrumbs, image, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-bronze/[0.07] blur-3xl"
      />
      <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
        <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          <Breadcrumbs items={breadcrumbs} className="mb-8 sm:mb-10" />
          <Eyebrow rule className="mb-5">
            {eyebrow}
          </Eyebrow>
          <h1 className="font-serif text-[2.6rem] font-light leading-[1.05] text-balance text-white sm:text-6xl lg:text-[4.25rem] [&_em]:italic [&_em]:text-bronze-200">
            {title}
          </h1>
          {description && (
            <div className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">{description}</div>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 lg:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                quality={85}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 36rem, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
