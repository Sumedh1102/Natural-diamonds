import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { collections } from "@/data/collections";
import { getAllProducts } from "@/lib/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/natural-diamonds", "/collections", "/about", "/diamond-education", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const collectionPages = collections.map((collection) => ({
    url: absoluteUrl(`/collections/${collection.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = getAllProducts().map((product) => ({
    url: absoluteUrl(`/natural-diamonds/${product.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...pages, ...collectionPages, ...productPages];
}
