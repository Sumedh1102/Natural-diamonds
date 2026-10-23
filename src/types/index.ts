export type DiamondShape =
  | "round"
  | "oval"
  | "cushion"
  | "pear"
  | "princess"
  | "emerald"
  | "marquise"
  | "heart"
  | "asscher"
  | "radiant";

/** GIA-style colour scale for colourless to near-colourless diamonds. */
export type ColorGrade = "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M";

export type ClarityGrade = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2" | "I1";

/** Laboratories issue a cut grade only for standard round brilliants. */
export type CutGrade = "Excellent" | "Very Good" | "Good" | "Fair";

export type FinishGrade = "Excellent" | "Very Good" | "Good" | "Fair";

export type Fluorescence = "None" | "Faint" | "Medium" | "Strong" | "Very Strong";

export type ImageAsset = {
  src: string;
  alt: string;
};

export type ProductImage = ImageAsset & {
  /** Short caption shown on the gallery thumbnail. */
  label: string;
  /** Background the stone is presented on. */
  tone: "dark" | "light";
  /** Optional magnification for detail views (1 = none). */
  zoom?: number;
};

export type GradingReport = {
  laboratory: string;
  reportNumber: string;
  /** Only set to true once the report has been checked against the laboratory's records. */
  verified: boolean;
  /** Link to the laboratory's own report-check page, if available. */
  verificationUrl?: string;
};

export type Price = {
  amount: number;
  /** ISO 4217 code, e.g. "INR" or "USD". */
  currency: string;
};

export type Product = {
  slug: string;
  /** Internal stock reference shown to customers. */
  reference: string;
  name: string;
  shape: DiamondShape;
  carat: number;
  color: ColorGrade;
  clarity: ClarityGrade;
  cut?: CutGrade;
  polish?: FinishGrade;
  symmetry?: FinishGrade;
  fluorescence?: Fluorescence;
  /** Length x width x depth in millimetres, e.g. "6.45 x 6.48 x 3.99". */
  measurements?: string;
  description: string;
  images: ProductImage[];
  /** Slugs of the collections this diamond appears in. */
  collections: string[];
  featured?: boolean;
  gradingReport?: GradingReport;
  /** Leave undefined for "price on request". */
  price?: Price;
  /**
   * True for illustrative starter listings. Sample listings are labelled as
   * such throughout the site and must be replaced with real inventory.
   */
  isSample: boolean;
};

export type CollectionKind = "catalogue" | "service";

export type ProcessStep = {
  title: string;
  text: string;
  image?: ImageAsset;
};

export type Collection = {
  slug: string;
  title: string;
  /** Short label above the title. */
  eyebrow: string;
  /** One-sentence summary used on cards. */
  summary: string;
  /** Longer introduction paragraphs for the collection page. */
  description: string[];
  image: ImageAsset;
  /**
   * "catalogue" collections list diamonds from the catalogue;
   * "service" collections describe an inquiry-led service.
   */
  kind: CollectionKind;
  highlights?: { title: string; text: string }[];
  process?: ProcessStep[];
  /** Pre-filtered catalogue link, e.g. "?shape=round". */
  catalogueQuery?: string;
  /** Pre-selected "area of interest" for the inquiry form. */
  inquiryInterest: InquiryInterest;
};

export type ShapeInfo = {
  id: DiamondShape;
  label: string;
  image: string;
  summary: string;
};

export const inquiryInterests = [
  "Loose natural diamond",
  "Engagement diamond",
  "Matched pair or layout",
  "Bespoke jewellery",
  "A specific listed diamond",
  "General guidance",
] as const;

export type InquiryInterest = (typeof inquiryInterests)[number];

export const budgetRanges = [
  "Prefer not to say",
  "Under ₹5 lakh",
  "₹5 – 15 lakh",
  "₹15 – 40 lakh",
  "Above ₹40 lakh",
] as const;

export type BudgetRange = (typeof budgetRanges)[number];

export type InquiryData = {
  name: string;
  email: string;
  phone: string;
  interest: InquiryInterest | "";
  budget: BudgetRange | "";
  diamondReference: string;
  message: string;
  consent: boolean;
};

export type InquiryErrors = Partial<Record<keyof InquiryData, string>>;
