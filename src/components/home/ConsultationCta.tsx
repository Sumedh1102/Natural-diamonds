import Image from "next/image";
import type { ReactNode } from "react";
import { whatsappHref } from "@/config/site";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppIcon } from "@/components/ui/icons";

type ConsultationCtaProps = {
  title?: ReactNode;
  text?: string;
  /** Query string appended to /contact, e.g. "?interest=Bespoke%20jewellery". */
  contactQuery?: string;
};

export function ConsultationCta({
  title = (
    <>
      Find the Diamond That <em>Speaks to You</em>
    </>
  ),
  text = "Tell us what you are looking for — a shape, a size, a moment to mark — and we will guide you through natural diamonds that suit it, at your own pace.",
  contactQuery = "",
}: ConsultationCtaProps) {
  return (
    <section aria-labelledby="consultation-title" className="relative isolate overflow-hidden bg-black">
      <Image
        src="/images/collections/loose-diamonds-velvet.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-45"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.9)_75%)]" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        <Eyebrow className="justify-center">Private Consultation</Eyebrow>
        <h2
          id="consultation-title"
          className="mt-6 font-serif text-[2.5rem] font-light leading-[1.08] text-balance text-white sm:text-6xl lg:text-7xl [&_em]:italic [&_em]:text-bronze-200"
        >
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href={`/contact${contactQuery}`} size="lg">
            Book a consultation
          </ButtonLink>
          <ExternalButton
            href={whatsappHref()}
            variant="outline"
            size="lg"
            leadingIcon={<WhatsAppIcon className="size-4" />}
          >
            Chat on WhatsApp
          </ExternalButton>
        </div>
      </div>
    </section>
  );
}
