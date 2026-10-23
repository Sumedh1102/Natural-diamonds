import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <span className="relative mb-10 block size-28 opacity-80">
          <Image src="/images/shapes/round.webp" alt="" fill sizes="112px" className="object-contain" />
        </span>
        <Eyebrow className="justify-center">Error 404</Eyebrow>
        <h1 className="mt-5 font-serif text-5xl font-light text-white sm:text-6xl">
          This page has <em className="italic text-bronze-200">slipped away</em>
        </h1>
        <p className="mt-5 max-w-md text-white/55">
          The page you are looking for may have moved, or the diamond may no longer be listed.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/natural-diamonds">Browse natural diamonds</ButtonLink>
          <ButtonLink href="/" variant="outline" icon="none">
            Return home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
