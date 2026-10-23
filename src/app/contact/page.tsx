import { Suspense } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { InquiryFormFromUrl } from "@/components/contact/InquiryFormFromUrl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig, whatsappHref } from "@/config/site";
import { getAllProducts } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact & Consultation",
  description:
    "Ask about a natural diamond, request a consultation or begin a bespoke piece. Contact NAV Natural Diamonds by form, phone, WhatsApp or email.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, social } = siteConfig;
  const diamonds = getAllProducts().map(({ slug, reference, name }) => ({ slug, reference, name }));

  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 size-[40rem] rounded-full bg-bronze/[0.06] blur-3xl" />
      <Container className="relative grid gap-14 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-5">
          <Breadcrumbs items={[{ label: "Contact" }]} className="mb-10" />
          <Eyebrow rule>Contact &amp; Consultation</Eyebrow>
          <h1 className="mt-5 font-serif text-[2.75rem] font-light leading-[1.05] text-white text-balance sm:text-6xl">
            Let&rsquo;s Find Your <em className="italic text-bronze-200">Diamond</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
            Whether you are enquiring about a listed diamond, looking for something specific or beginning a bespoke
            piece, tell us a little about it and we will be glad to help.
          </p>

          <ul className="mt-10 space-y-6 border-t border-white/10 pt-10">
            {contact.phones.map((phone, index) => (
              <li key={phone.href} className="flex items-start gap-4">
                <Phone aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-bronze" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{index === 0 ? "Call us" : "Or"}</p>
                  <a href={phone.href} className="font-serif text-2xl text-white transition-colors hover:text-bronze-200 sm:text-3xl">
                    {phone.display}
                  </a>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-4">
              <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-bronze" />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Email</p>
                <a href={`mailto:${contact.email}`} className="break-all text-white/80 transition-colors hover:text-white">
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <WhatsAppIcon className="mt-1 size-4 shrink-0 text-bronze" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">WhatsApp</p>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
                >
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-bronze" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Address</p>
                <address className="not-italic leading-relaxed text-white/70">
                  {contact.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </li>
          </ul>

          {social.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {social.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-ink/80 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-10">
            <h2 className="font-serif text-3xl font-light text-white">Send an inquiry</h2>
            <p className="mb-8 mt-2 text-sm text-white/60">Share as much or as little detail as you like.</p>
            <Suspense fallback={<InquiryForm />}>
              <InquiryFormFromUrl diamonds={diamonds} />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
