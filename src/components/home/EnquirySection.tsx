import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { contactHref } from "@/lib/inquiry";
import type { InquiryInterest } from "@/types";

/** Each topic opens the existing contact form with that interest preselected. */
const topics: { label: string; interest: InquiryInterest }[] = [
  { label: "Loose Diamonds", interest: "Loose natural diamond" },
  { label: "Certified Diamonds", interest: "Certified diamond" },
  { label: "Calibrated Parcels", interest: "Calibrated parcel" },
  { label: "Matching Layouts", interest: "Matched pair or layout" },
  { label: "Jewellery Requirements", interest: "Bespoke jewellery" },
  { label: "B2B Requirements", interest: "B2B requirement" },
];

export function EnquirySection() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="border-t border-white/10 bg-ink-900 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-bronze sm:text-xs">Enquiries</p>
          <h2
            id="enquiry-title"
            className="mt-5 font-serif text-[2.25rem] font-light uppercase leading-[1.1] tracking-wide text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Have a diamond requirement? <em className="normal-case text-bronze-200">Let&rsquo;s connect.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Customers and business partners alike — choose what you are looking for and we will take it from there.
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <Reveal as="li" key={topic.interest} delay={(index % 3) * 0.05} className="border-b border-r border-white/10">
              <Link
                href={contactHref(topic.interest)}
                className="group flex h-full items-center justify-between gap-4 px-6 py-7 transition-colors hover:bg-white/[0.03] sm:px-8 sm:py-9"
              >
                <span>
                  <span className="block text-[10px] tracking-[0.25em] text-bronze">0{index + 1}</span>
                  <span className="mt-2 block font-serif text-xl font-light text-white sm:text-2xl">{topic.label}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-white/40 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                />
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/contact" size="lg">
            Send an enquiry
          </ButtonLink>
          <ExternalButton href={whatsappHref()} variant="outline" size="lg" leadingIcon={<WhatsAppIcon className="size-4" />}>
            Chat on WhatsApp
          </ExternalButton>
        </div>
        <p className="mt-6 text-center text-sm text-white/55">
          Or call{" "}
          <a href={siteConfig.contact.phones[0].href} className="text-white/80 underline-offset-4 hover:underline">
            {siteConfig.contact.phones[0].display}
          </a>
        </p>
      </Container>
    </section>
  );
}
