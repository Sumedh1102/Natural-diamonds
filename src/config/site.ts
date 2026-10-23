/**
 * Business configuration for the natural diamond website.
 *
 * Contact details below were taken from the existing NAV Diamonds website
 * (footer and contact page). Confirm with the client that they also apply to
 * the natural diamond business before going live.
 */

export type ContactPhone = {
  display: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const siteConfig = {
  name: "NAV Natural Diamonds",
  company: "NAV Diamonds",
  tagline: "Natural Diamonds",
  description:
    "Discover natural diamonds selected for life's most meaningful moments — loose diamonds, engagement stones and bespoke natural diamond jewellery, with personal guidance from the NAV team.",
  url: siteUrl,
  locale: "en_IN",
  logo: {
    src: "/images/brand/nav-mark.png",
    width: 785,
    height: 308,
    alt: "NAV",
  },
  contact: {
    email: "navkardiamonds@gmail.com",
    phones: [
      { display: "+91 99207 52390", href: "tel:+919920752390" },
      { display: "+91 92616 19050", href: "tel:+919261619050" },
    ] satisfies ContactPhone[],
    whatsapp: {
      number: "919920752390",
      defaultMessage: "Hello, I would like to enquire about natural diamonds.",
    },
    address: {
      lines: ["CE-5010 Bharat Diamond Bourse", "G Block, Bandra Kurla Complex", "Mumbai 400051, India"],
      locality: "Mumbai",
      postalCode: "400051",
      country: "IN",
    },
  },
  /**
   * The existing site only links to placeholders (#facebook, #instagram), so no
   * profiles are published here. Add real URLs and they appear in the footer
   * and on the contact page automatically.
   */
  social: [] as SocialLink[],
  /** Set to null to hide the announcement bar. */
  announcement: {
    text: "Personal guidance for choosing a natural diamond",
    shortText: "Personal diamond guidance",
    linkLabel: "Book a consultation",
    href: "/contact",
  } as { text: string; shortText: string; linkLabel: string; href: string } | null,
} as const;

export function whatsappHref(message: string = siteConfig.contact.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
