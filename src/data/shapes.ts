import type { DiamondShape, ShapeInfo } from "@/types";

/** Shape reference used by the catalogue filters, product pages and education hub. */
export const shapes: ShapeInfo[] = [
  {
    id: "round",
    label: "Round",
    image: "/images/shapes/round.webp",
    summary:
      "The round brilliant's 57 or 58 facets are arranged to return as much light as possible, which is why it remains the most widely chosen shape.",
  },
  {
    id: "oval",
    label: "Oval",
    image: "/images/shapes/oval.webp",
    summary:
      "An elongated brilliant. Its length can make it appear larger than a round of the same carat weight; some ovals show a darker 'bow-tie' across the centre.",
  },
  {
    id: "cushion",
    label: "Cushion",
    image: "/images/shapes/cushion.webp",
    summary: "A square to rectangular outline with softly rounded corners, giving a romantic, pillow-like look.",
  },
  {
    id: "pear",
    label: "Pear",
    image: "/images/shapes/pear.webp",
    summary: "A teardrop that combines a rounded end with a single point. Symmetry between its two shoulders matters.",
  },
  {
    id: "princess",
    label: "Princess",
    image: "/images/shapes/princess.webp",
    summary: "A square brilliant with crisp, pointed corners, usually set with protective prongs at each corner.",
  },
  {
    id: "emerald",
    label: "Emerald",
    image: "/images/shapes/emerald.webp",
    summary:
      "A rectangular step cut with long, parallel facets and cropped corners. Its open facets favour clarity, so inclusions are easier to see.",
  },
  {
    id: "marquise",
    label: "Marquise",
    image: "/images/shapes/marquise.webp",
    summary: "A long, slender outline with two pointed ends that maximises the apparent size of the stone.",
  },
  {
    id: "heart",
    label: "Heart",
    image: "/images/shapes/heart.webp",
    summary: "A brilliant-cut heart. A clearly defined cleft and even lobes are the marks of a well-cut example.",
  },
  {
    id: "asscher",
    label: "Asscher",
    image: "/images/shapes/asscher.webp",
    summary: "A square step cut with deeply cropped corners, known for its layered, 'hall of mirrors' appearance.",
  },
  {
    id: "radiant",
    label: "Radiant",
    image: "/images/shapes/radiant.webp",
    summary:
      "A square or rectangular outline with trimmed corners, faceted like a brilliant for lively sparkle.",
  },
];

const shapeMap = new Map(shapes.map((shape) => [shape.id, shape]));

export function getShape(id: DiamondShape): ShapeInfo {
  const shape = shapeMap.get(id);
  if (!shape) throw new Error(`Unknown diamond shape: ${id}`);
  return shape;
}

export function isDiamondShape(value: string): value is DiamondShape {
  return shapeMap.has(value as DiamondShape);
}

/** Additional fancy outlines shown in the education hub only (not catalogue filters). */
export const specialtyShapes = [
  { label: "Trillion", image: "/images/shapes/trillion.webp" },
  { label: "Baguette", image: "/images/shapes/baguette.webp" },
  { label: "Hexagon", image: "/images/shapes/hexagon.webp" },
  { label: "Kite", image: "/images/shapes/kite.webp" },
  { label: "Half Moon", image: "/images/shapes/half-moon.webp" },
  { label: "Shield", image: "/images/shapes/shield.webp" },
];
