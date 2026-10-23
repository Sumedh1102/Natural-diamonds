import { NextResponse, type NextRequest } from "next/server";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

/*
 * Unlisted product and collection slugs are rendered from a streamed shell,
 * which fixes the HTTP status at 200 before the page can call notFound().
 * Checking the (local, in-memory) slug lists here returns a real 404 instead.
 * If products move to an API, keep this check fast or remove it.
 */
const productSlugs = new Set(products.map((product) => product.slug));
const collectionSlugs = new Set(collections.map((collection) => collection.slug));

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const known =
    rest.length === 0 &&
    ((section === "natural-diamonds" && productSlugs.has(slug)) || (section === "collections" && collectionSlugs.has(slug)));

  if (!known) {
    // No route matches this path, so Next.js renders the not-found page with a 404 status.
    return NextResponse.rewrite(new URL("/_unmatched", request.url));
  }
}

export const config = {
  matcher: ["/natural-diamonds/:slug+", "/collections/:slug+"],
};
