import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { siteConfig, whatsappHref } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 text-[11px] font-normal uppercase tracking-[0.3em] text-bronze">{children}</h2>;
}

const linkClass = "text-sm text-white/55 transition-colors duration-200 hover:text-white";

export function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="relative border-t border-white/10 bg-ink-950 text-white/60">
      <div aria-hidden="true" className="hairline-bronze absolute inset-x-0 top-0 h-px opacity-50" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block rounded-sm">
              <Logo markClassName="h-8" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Natural diamonds, chosen with care for life&rsquo;s most meaningful moments — with personal guidance from
              first question to final choice.
            </p>
            <address className="mt-8 flex gap-3 text-sm not-italic leading-relaxed text-white/60">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-bronze" />
              <span>
                {contact.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-3">
              {footerNav.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Diamond categories" className="lg:col-span-2">
            <FooterHeading>Categories</FooterHeading>
            <ul className="space-y-3">
              {footerNav.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Collections" className="lg:col-span-2">
            <FooterHeading>Collections</FooterHeading>
            <ul className="space-y-3">
              {footerNav.collections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Say Hello</FooterHeading>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} inline-flex items-center gap-3 break-all`}>
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-bronze" />
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-3 font-serif text-xl text-white transition-colors hover:text-bronze-200"
                  >
                    <Phone aria-hidden="true" className="size-4 shrink-0 text-bronze" />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-bronze transition-colors hover:text-bronze-300"
                >
                  <WhatsAppIcon className="size-4" />
                  Message on WhatsApp
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            </ul>
            {social.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {social.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CurrentYear /> {siteConfig.company}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.25em]">Natural diamonds only</p>
        </div>
      </div>
    </footer>
  );
}
