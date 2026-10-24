import type { Collection } from "@/types";

/**
 * Natural diamond collections. "catalogue" collections list diamonds whose
 * `collections` array contains the slug; "service" collections describe an
 * inquiry-led service and link to the consultation form.
 */
export const collections: Collection[] = [
  {
    slug: "loose-natural-diamonds",
    title: "Loose Natural Diamonds",
    eyebrow: "The Collection",
    summary: "Cut and polished natural diamonds, ready to be chosen on their own merits and set to your design.",
    description: [
      "Loose diamonds have been cut and polished but not yet set. Choosing one on its own lets you weigh shape, size and quality exactly as you wish before deciding how it will be worn.",
      "Every diamond in this collection is a natural diamond. Each listing shows its shape, carat weight, colour and clarity, with further specifications available on request.",
    ],
    image: {
      src: "/images/collections/loose-diamonds-velvet.webp",
      alt: "Loose diamonds of different shapes arranged on black velvet",
    },
    kind: "catalogue",
    catalogueQuery: "",
    inquiryInterest: "Loose natural diamond",
    highlights: [
      { title: "Choose by the 4Cs", text: "Compare cut, colour, clarity and carat weight side by side." },
      { title: "Every shape", text: "From the round brilliant to step cuts and elongated fancy shapes." },
      { title: "Guided selection", text: "Ask about any listing and we will walk you through its details." },
    ],
  },
  {
    slug: "engagement-diamonds",
    title: "Engagement Diamonds",
    eyebrow: "Centre Stones",
    summary: "Natural diamonds of a carat or more, selected as centre stones for engagement rings.",
    description: [
      "An engagement ring begins with its centre stone. This edit brings together natural diamonds from one carat upwards, in the shapes most often chosen for solitaires, halos and three-stone rings.",
      "Once you have found a diamond that speaks to you, we can discuss a setting — or you can take the loose stone to your own jeweller.",
    ],
    image: {
      src: "/images/hero/round-brilliant.webp",
      alt: "A round brilliant diamond photographed face-up on black",
    },
    kind: "catalogue",
    catalogueQuery: "?category=white&carat=1-1.49,1.5-1.99,2-",
    inquiryInterest: "Engagement diamond",
    highlights: [
      { title: "One carat and above", text: "Centre stones sized for solitaire and halo settings." },
      { title: "Classic and fancy shapes", text: "Round, oval, emerald, cushion, Asscher and radiant." },
      { title: "Setting advice", text: "Guidance on proportions, prong styles and metal choices." },
    ],
  },
  {
    slug: "fancy-shapes",
    title: "Fancy Shape Diamonds",
    eyebrow: "Beyond the Round",
    summary: "Ovals, pears, emeralds, cushions and more — natural diamonds with a distinctive outline.",
    description: [
      "A fancy shape is any diamond that is not a round brilliant. Each outline handles light differently: brilliant-cut shapes such as the oval and pear sparkle intensely, while step cuts such as the emerald and Asscher show broad, mirror-like flashes.",
      "Fancy shapes are assessed on the same 4Cs as rounds, with symmetry and outline playing a larger part in their beauty.",
    ],
    image: {
      src: "/images/collections/fancy-star.webp",
      alt: "A star-shaped fancy cut diamond on a white background",
    },
    kind: "catalogue",
    catalogueQuery: "?shape=oval,cushion,pear,princess,emerald,marquise,heart,asscher,radiant",
    inquiryInterest: "Loose natural diamond",
    highlights: [
      { title: "Brilliant and step cuts", text: "Lively sparkle or calm, architectural flashes of light." },
      { title: "Outline and symmetry", text: "We point out the details that matter for each shape." },
      { title: "Special requests", text: "Looking for a rarer outline? Tell us what you have in mind." },
    ],
  },
  {
    slug: "matched-pairs",
    title: "Matched Pairs & Layouts",
    eyebrow: "On Request",
    summary: "Pairs for earrings and graduated layouts for multi-stone designs, matched by eye and by grade.",
    description: [
      "Earrings and multi-stone pieces need diamonds that belong together. A well-matched pair or layout is consistent in shape, size, colour and clarity, so the finished piece reads as one.",
      "Matching is arranged on request. Share the design you have in mind — stud earrings, a three-stone ring or a line bracelet — and we will come back to you with the options available.",
    ],
    image: {
      src: "/images/collections/matched-layout.webp",
      alt: "Rows of round diamonds laid out in matched sets on black",
    },
    kind: "service",
    inquiryInterest: "Matched pair or layout",
    highlights: [
      { title: "Shape and size", text: "Outlines and millimetre sizes aligned across every stone." },
      { title: "Colour and clarity", text: "Grades kept consistent so no single stone stands apart." },
      { title: "Built around your design", text: "Pairs, three-stone sets and graduated layouts." },
    ],
  },
  {
    slug: "bespoke-jewellery",
    title: "Bespoke Natural Diamond Jewellery",
    eyebrow: "Made for You",
    summary: "From a first sketch to the finished piece — jewellery designed around your natural diamond.",
    description: [
      "Our bespoke service brings your vision to life, combining careful craftsmanship with a natural diamond chosen for you. Each design is considered for comfort, durability and the protection of its stones.",
      "Begin with a diamond from our collection or with an idea; we will guide you through design, modelling, setting and finishing.",
    ],
    image: {
      src: "/images/collections/jewellery-necklace.webp",
      alt: "A diamond necklace with a pear-shaped drop resting on soft fabric",
    },
    kind: "service",
    inquiryInterest: "Bespoke jewellery",
    process: [
      {
        title: "Designing",
        text: "Every piece begins with careful planning. We sketch the design at length, considering how it will be worn and how best to protect each diamond.",
        image: { src: "/images/editorial/design-sketch.webp", alt: "A designer sketching a diamond ring at her desk" },
      },
      {
        title: "CAD Modelling",
        text: "The chosen sketch is refined in design software as a three-dimensional model, so it can be examined from every angle before it is made.",
        image: { src: "/images/editorial/cad-design.webp", alt: "A diamond ring modelled in 3D design software" },
      },
      {
        title: "Setting & Polishing",
        text: "Once the precious metal piece is cast and finished, the diamonds are set with precision under magnification, and the piece is polished.",
        image: { src: "/images/editorial/cutter-microscope.webp", alt: "A craftsman working under magnification at a polishing machine" },
      },
      {
        title: "Presentation",
        text: "The finished jewellery is packed with its accompanying documents, ready to be presented or delivered.",
      },
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
