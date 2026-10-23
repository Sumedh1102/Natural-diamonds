"use client";

import { useSearchParams } from "next/navigation";
import { inquiryInterests, type InquiryData, type InquiryInterest } from "@/types";
import { InquiryForm, type DiamondContext } from "./InquiryForm";

type DiamondOption = DiamondContext & { slug: string };

/**
 * Prefills the inquiry form from the URL:
 *   /contact?diamond=<product-slug>   — from a product page
 *   /contact?interest=<interest>      — from a collection page
 */
export function InquiryFormFromUrl({ diamonds }: { diamonds: DiamondOption[] }) {
  const searchParams = useSearchParams();
  const diamondSlug = searchParams.get("diamond") ?? "";
  const interestParam = searchParams.get("interest") ?? "";

  const diamond = diamonds.find((option) => option.slug === diamondSlug);
  const interest = inquiryInterests.includes(interestParam as InquiryInterest) ? (interestParam as InquiryInterest) : "";

  const initial: Partial<InquiryData> = diamond
    ? {
        interest: "A specific listed diamond",
        diamondReference: diamond.reference,
        message: `I would like to know more about ${diamond.name} (reference ${diamond.reference}).`,
      }
    : { interest };

  // A new key resets the form when the page is revisited with a different context.
  return <InquiryForm key={`${diamondSlug}|${interest}`} initial={initial} diamond={diamond} />;
}
