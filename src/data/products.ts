/**
 * STARTER CATALOGUE — ILLUSTRATIVE ONLY.
 *
 * These listings are placeholders that demonstrate how natural diamonds are
 * presented, searched and filtered. They are NOT real inventory: the grades are
 * examples, images are representative shape photography, and no grading
 * reports or prices are attached. Every entry is flagged `isSample: true`,
 * which shows a "Sample listing" label across the site.
 *
 * To go live, replace this array with the client's inventory (or load it from
 * an API/CMS in `src/lib/catalogue.ts`) and set `isSample: false` on real stones.
 */
import type { DiamondShape, Product, ProductImage } from "@/types";
import { getShape } from "./shapes";

function shapeGallery(shape: DiamondShape): ProductImage[] {
  const { label, image } = getShape(shape);
  const alt = `${label} cut diamond, representative image`;
  return [
    { src: image, alt: `${alt}, face-up view`, label: "Face-up", tone: "dark" },
    { src: image, alt: `${alt}, on an ivory background`, label: "On ivory", tone: "light" },
    { src: image, alt: `${alt}, close view of the facets`, label: "Facet detail", tone: "dark", zoom: 1.9 },
  ];
}

type SampleInput = Omit<Product, "images" | "isSample" | "name"> & { name?: string };

function sample(input: SampleInput): Product {
  const { label } = getShape(input.shape);
  return {
    ...input,
    name: input.name ?? `${input.carat.toFixed(2)} ct ${label} Natural Diamond`,
    images: shapeGallery(input.shape),
    isSample: true,
  };
}

export const products: Product[] = [
  sample({
    slug: "round-brilliant-1-02ct-nds-101",
    reference: "NDS-101",
    name: "1.02 ct Round Brilliant Natural Diamond",
    shape: "round",
    carat: 1.02,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    description:
      "A classic round brilliant presented as a solitaire centre stone, with balanced grades across colour and clarity.",
    collections: ["loose-natural-diamonds", "engagement-diamonds"],
    featured: true,
  }),
  sample({
    slug: "oval-1-21ct-nds-102",
    reference: "NDS-102",
    shape: "oval",
    carat: 1.21,
    color: "G",
    clarity: "VS1",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "None",
    description:
      "An elongated oval brilliant whose graceful outline lengthens the finger in a solitaire or three-stone setting.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
    featured: true,
  }),
  sample({
    slug: "emerald-1-31ct-nds-103",
    reference: "NDS-103",
    shape: "emerald",
    carat: 1.31,
    color: "E",
    clarity: "VVS1",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    description:
      "A step-cut emerald with long, open facets — a shape chosen for its calm, architectural character and high clarity.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
    featured: true,
  }),
  sample({
    slug: "cushion-1-50ct-nds-104",
    reference: "NDS-104",
    shape: "cushion",
    carat: 1.5,
    color: "H",
    clarity: "VS2",
    polish: "Very Good",
    symmetry: "Very Good",
    fluorescence: "Faint",
    description:
      "A softly rounded cushion brilliant with a broad face-up spread, suited to vintage-inspired and halo designs.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
    featured: true,
  }),
  sample({
    slug: "round-brilliant-2-01ct-nds-105",
    reference: "NDS-105",
    name: "2.01 ct Round Brilliant Natural Diamond",
    shape: "round",
    carat: 2.01,
    color: "E",
    clarity: "VS2",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    description: "A larger round brilliant for a statement solitaire, graded high on the colour scale.",
    collections: ["loose-natural-diamonds", "engagement-diamonds"],
  }),
  sample({
    slug: "pear-0-90ct-nds-106",
    reference: "NDS-106",
    shape: "pear",
    carat: 0.9,
    color: "F",
    clarity: "VVS2",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "None",
    description: "A balanced teardrop, equally suited to a pendant or an engagement ring set point-up or point-down.",
    collections: ["loose-natural-diamonds", "fancy-shapes"],
  }),
  sample({
    slug: "asscher-1-12ct-nds-107",
    reference: "NDS-107",
    shape: "asscher",
    carat: 1.12,
    color: "E",
    clarity: "VS1",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    description: "A square step cut with deeply cropped corners and the layered, mirrored look Asschers are known for.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
  }),
  sample({
    slug: "radiant-1-70ct-nds-108",
    reference: "NDS-108",
    shape: "radiant",
    carat: 1.7,
    color: "G",
    clarity: "VS2",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "Faint",
    description: "A rectangular radiant pairing a clean, trimmed outline with brilliant faceting for lively sparkle.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
  }),
  sample({
    slug: "princess-1-00ct-nds-109",
    reference: "NDS-109",
    shape: "princess",
    carat: 1.0,
    color: "G",
    clarity: "SI1",
    polish: "Very Good",
    symmetry: "Very Good",
    fluorescence: "None",
    description: "A crisp square princess cut, a contemporary alternative to the round for solitaires and earrings.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
  }),
  sample({
    slug: "round-brilliant-0-71ct-nds-110",
    reference: "NDS-110",
    name: "0.71 ct Round Brilliant Natural Diamond",
    shape: "round",
    carat: 0.71,
    color: "G",
    clarity: "VVS2",
    cut: "Very Good",
    polish: "Very Good",
    symmetry: "Very Good",
    fluorescence: "None",
    description: "A versatile round brilliant suited to solitaire pendants, stud earrings or a delicate ring.",
    collections: ["loose-natural-diamonds"],
  }),
  sample({
    slug: "marquise-0-80ct-nds-111",
    reference: "NDS-111",
    shape: "marquise",
    carat: 0.8,
    color: "H",
    clarity: "VS1",
    polish: "Very Good",
    symmetry: "Good",
    fluorescence: "Medium",
    description: "A slender marquise whose pointed ends maximise its face-up size for the carat weight.",
    collections: ["loose-natural-diamonds", "fancy-shapes"],
  }),
  sample({
    slug: "heart-1-05ct-nds-112",
    reference: "NDS-112",
    shape: "heart",
    carat: 1.05,
    color: "F",
    clarity: "VS2",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "None",
    description: "A brilliant-cut heart with even lobes and a defined cleft, a meaningful choice for a gift.",
    collections: ["loose-natural-diamonds", "engagement-diamonds", "fancy-shapes"],
  }),
];
