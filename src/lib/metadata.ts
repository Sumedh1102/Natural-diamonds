import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const defaultImage = {
  url: "/images/brand/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Mined by Nature. Defined by Time.`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path used for the canonical URL, e.g. "/about". */
  path: string;
  /** Use the full title verbatim instead of the "%s | Site" template. */
  absoluteTitle?: boolean;
};

/**
 * Page metadata with a canonical URL and complete Open Graph/Twitter fields.
 * Next.js merges metadata shallowly, so each page sets these objects in full.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: fullTitle,
      description,
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultImage.url],
    },
  };
}
