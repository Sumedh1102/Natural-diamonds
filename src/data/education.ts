/**
 * Educational content. Written as general gemmological guidance; it makes no
 * claims about specific diamonds, sources or certifications.
 */

export type FourC = {
  id: "cut" | "color" | "clarity" | "carat";
  title: string;
  tagline: string;
  summary: string;
  points: string[];
};

export const fourCs: FourC[] = [
  {
    id: "cut",
    title: "Cut",
    tagline: "How a diamond handles light",
    summary:
      "Cut describes how well a diamond's proportions, symmetry and polish return light to the eye as brightness, fire and scintillation. It is the C most shaped by human skill.",
    points: [
      "For standard round brilliants, laboratories issue an overall cut grade, commonly from Excellent to Poor.",
      "For fancy shapes there is no overall cut grade; polish, symmetry and proportions are assessed instead.",
      "Two diamonds of the same weight can look very different if one is cut more precisely than the other.",
    ],
  },
  {
    id: "color",
    title: "Colour",
    tagline: "The absence of colour",
    summary:
      "Colourless to near-colourless diamonds are graded on a scale that runs from D (colourless) to Z (light yellow or brown). The closer to D, the less colour the diamond shows.",
    points: [
      "Differences between neighbouring grades are subtle and often invisible without side-by-side comparison under controlled lighting.",
      "Shape, size and the metal of the setting all influence how much colour is noticeable once a diamond is worn.",
      "Diamonds with strong natural colour — fancy coloured diamonds — are graded on a separate system.",
    ],
  },
  {
    id: "clarity",
    title: "Clarity",
    tagline: "Nature's fingerprints",
    summary:
      "Clarity measures the size, number, position and visibility of internal inclusions and surface blemishes, assessed under 10x magnification. They formed as the diamond grew in the Earth.",
    points: [
      "The scale runs from Flawless (FL) and Internally Flawless (IF) through VVS, VS and SI to Included (I).",
      "Many diamonds in the VS and SI ranges show no inclusions visible to the unaided eye.",
      "Step cuts such as emerald and Asscher reveal inclusions more readily than brilliant cuts.",
    ],
  },
  {
    id: "carat",
    title: "Carat",
    tagline: "A measure of weight",
    summary:
      "Carat is a unit of weight, not size: one carat equals 0.2 grams and is divided into 100 points, so a 0.75 ct diamond may be described as 75 points.",
    points: [
      "How large a diamond looks depends on its shape and proportions as well as its weight.",
      "Elongated shapes such as oval, marquise and pear tend to look larger face-up than a round of the same weight.",
      "Larger natural diamonds are found far less often, so value usually rises more steeply than weight.",
    ],
  },
];

export const colorScaleGroups = [
  { range: "D E F", label: "Colourless" },
  { range: "G H I J", label: "Near colourless" },
  { range: "K L M", label: "Faint" },
  { range: "N – R", label: "Very light" },
  { range: "S – Z", label: "Light" },
];

export const clarityScaleGroups = [
  { range: "FL", label: "Flawless", text: "No inclusions or blemishes visible under 10x magnification." },
  { range: "IF", label: "Internally Flawless", text: "No inclusions visible under 10x magnification." },
  { range: "VVS1 – VVS2", label: "Very, Very Slightly Included", text: "Inclusions extremely difficult to see under 10x." },
  { range: "VS1 – VS2", label: "Very Slightly Included", text: "Minor inclusions, difficult to somewhat easy to see under 10x." },
  { range: "SI1 – SI2", label: "Slightly Included", text: "Inclusions noticeable under 10x magnification." },
  { range: "I1 – I3", label: "Included", text: "Inclusions obvious under 10x and may affect transparency or brilliance." },
];

/** Formation copy adapted from the natural diamond page of the existing NAV site. */
export const formation = {
  lead: "Natural diamonds are precious gemstones formed deep within the Earth's mantle under extreme heat and pressure, over hundreds of millions to billions of years.",
  paragraphs: [
    "Composed of pure carbon atoms arranged in a crystal lattice, they possess exceptional hardness, brilliance and durability. Most natural diamonds crystallised roughly 150 to 200 kilometres below the surface.",
    "Deep volcanic eruptions carried them upward through kimberlite pipes. Today they are recovered from these primary deposits, or from alluvial deposits where rivers and erosion have moved them over time.",
  ],
  facts: [
    { value: "1–3.5", unit: "billion years", label: "Typical age of natural diamonds" },
    { value: "150–200", unit: "km", label: "Approximate depth of formation" },
    { value: "10", unit: "Mohs", label: "Hardest naturally occurring mineral" },
  ],
};

/** From the mantle to the rough diamond: general geology, no sourcing claims. */
export const originSteps: {
  title: string;
  meta: string;
  text: string;
  image?: { src: string; alt: string };
}[] = [
  {
    title: "Formed Deep in the Mantle",
    meta: "150–200 km below the surface",
    text: "Under immense heat and pressure, carbon atoms lock into the diamond crystal lattice. Most natural diamonds formed between one and three and a half billion years ago.",
  },
  {
    title: "Carried to the Surface",
    meta: "Kimberlite eruptions",
    text: "Rare, deep-sourced volcanic eruptions rushed diamond-bearing rock upward, cooling into carrot-shaped kimberlite pipes that hold diamonds near the surface.",
  },
  {
    title: "Recovered from the Earth",
    meta: "Open-pit, underground and alluvial",
    text: "Diamonds are recovered from these pipes in open-pit and underground mines, or from alluvial deposits where rivers and erosion carried them over time.",
    image: {
      src: "/images/editorial/kimberlite-pipes-sunset.webp",
      alt: "An open-pit mine at sunset above a cutaway of kimberlite pipes rising from deep in the Earth (illustration)",
    },
  },
  {
    title: "The Rough Revealed",
    meta: "Sorting the rough",
    text: "Recovered rough is sorted by size, shape, colour and quality — the first step on its journey to becoming a polished natural diamond.",
    image: { src: "/images/editorial/rough-crystals.webp", alt: "Three rough natural diamond crystals" },
  },
];

/** The journey from rough to polished, adapted from the existing NAV site. */
export const craftSteps = [
  {
    title: "Planning",
    quote: "The rough diamond is examined carefully to decide how it should be cut.",
    text: "Experts study the stone's size, shape, natural inclusions and internal structure, planning a cut that brings out brilliance and symmetry while preserving as much of the crystal as possible.",
    image: { src: "/images/editorial/rough-and-polished.webp", alt: "Rough diamond crystals beside a polished Asscher-cut diamond" },
  },
  {
    title: "Cleaving & Sawing",
    quote: "Once the plan is final, the rough is divided into workable pieces.",
    text: "The diamond is split along its natural planes or sawn with diamond-tipped blades or lasers, removing unwanted areas and preparing it for shaping.",
    image: {
      src: "/images/editorial/cutter-microscope.webp",
      alt: "A craftsman working under a microscope at a cutting machine, with rough diamonds on the bench",
    },
  },
  {
    title: "Cutting & Polishing",
    quote: "The diamond begins to take its final shape.",
    text: "Skilled cutters form the outline — round, oval, pear, emerald and more — and polish each facet with fine diamond powder to reveal its brilliance.",
    image: { src: "/images/editorial/cutter-loupe.webp", alt: "A diamond cutter wearing a loupe, polishing a stone on a spinning wheel" },
  },
  {
    title: "Grading",
    quote: "Finally, the diamond is assessed against the 4Cs.",
    text: "Cut, colour, clarity and carat weight are evaluated to describe the diamond's quality. Independent laboratories can also issue a grading report.",
    image: { src: "/images/collections/shapes-chart.webp", alt: "Polished diamonds of many shapes laid out in rows for grading" },
  },
];

export const certification = {
  summary:
    "A diamond grading report is an independent assessment by a gemmological laboratory. It records the diamond's 4Cs alongside measurements, proportions, polish, symmetry and fluorescence.",
  points: [
    {
      title: "Natural origin",
      text: "Laboratories use specialised instruments to determine whether a diamond is natural or laboratory-grown — something that cannot be judged reliably by eye. Reputable reports state the origin clearly.",
    },
    {
      title: "A unique report number",
      text: "Each report carries its own number, which may also be laser-inscribed on the diamond's girdle. Many laboratories let you check a report number on their website.",
    },
    {
      title: "Not a valuation",
      text: "A grading report describes quality; it is not an appraisal of monetary value. Ask for the report number of any diamond you are considering and verify it with the issuing laboratory.",
    },
  ],
};
