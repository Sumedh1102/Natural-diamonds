import type { CategoryInfo, DiamondCategory } from "@/types";

/**
 * Colour families of natural diamonds. General gemmological descriptions;
 * they make no claim about the client's stock in each category.
 */
export const categories: CategoryInfo[] = [
  {
    id: "white",
    label: "White Diamonds",
    shortLabel: "White",
    eyebrow: "Colourless to near-colourless",
    summary:
      "The classic natural diamond: bright, colourless to near-colourless stones chosen for solitaires, earrings and fine jewellery.",
    grading: "Graded D (colourless) to Z, with clarity and — for rounds — cut grades.",
    image: "/images/shapes/round.webp",
  },
  {
    id: "champagne",
    label: "Champagne & Brown Diamonds",
    shortLabel: "Champagne",
    eyebrow: "Warm natural tones",
    summary:
      "Natural diamonds in soft champagne through deep cognac tones — warm, understated and increasingly sought after.",
    grading: "Described by tone, often on a C1 (light champagne) to C7 (deep cognac) scale.",
    image: "/images/colours/brown.webp",
  },
  {
    id: "fancy-colour",
    label: "Natural Fancy Colour",
    shortLabel: "Fancy colour",
    eyebrow: "Colour formed in nature",
    summary:
      "Diamonds whose yellow, pink or other hues formed naturally in the Earth. Strong natural colour is rare, so each stone is assessed individually.",
    grading: "Described by hue and intensity, from Fancy Light to Fancy Vivid.",
    image: "/images/colours/yellow.webp",
  },
  {
    id: "black",
    label: "Black Diamonds",
    shortLabel: "Black",
    eyebrow: "Bold and opaque",
    summary:
      "Opaque, lustrous and dramatic. Most black diamonds in the trade owe their colour to treatment, and every treated stone here is labelled as such.",
    grading: "Opaque, so colour and clarity are not graded; colour origin is always stated.",
    image: "/images/colours/black.webp",
  },
];

const categoryMap = new Map(categories.map((category) => [category.id, category]));

export function getCategory(id: DiamondCategory): CategoryInfo {
  const category = categoryMap.get(id);
  if (!category) throw new Error(`Unknown diamond category: ${id}`);
  return category;
}

export function isDiamondCategory(value: string): value is DiamondCategory {
  return categoryMap.has(value as DiamondCategory);
}
