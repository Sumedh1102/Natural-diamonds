import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { absoluteUrl, siteConfig } from "@/config/site";
import "./globals.css";

// Cormorant Garamond is the serif already used by the existing NAV site.
// Both families are variable fonts, so one file per style covers every weight.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Nature's Rarest Expression of Beauty`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  // Fallback for routes without their own metadata; pages use pageMetadata().
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/images/brand/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/brand/og-image.jpg"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contact } = siteConfig;

  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Without JavaScript, show content that would otherwise fade in on scroll. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-bronze focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ink-900"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.company,
            url: absoluteUrl("/"),
            logo: absoluteUrl(siteConfig.logo.src),
            email: contact.email,
            telephone: contact.phones.map((phone) => phone.href.replace("tel:", "")),
            address: {
              "@type": "PostalAddress",
              streetAddress: contact.address.lines.slice(0, 2).join(", "),
              addressLocality: contact.address.locality,
              postalCode: contact.address.postalCode,
              addressCountry: contact.address.country,
            },
          }}
        />
      </body>
    </html>
  );
}
