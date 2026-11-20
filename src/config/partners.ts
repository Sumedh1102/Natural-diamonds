/**
 * Organisations the business is associated with, shown in "Associated With".
 *
 * Logos are the client-supplied artwork in `public/images/partners/`. Keep each
 * file's true width and height so its proportions and colours are preserved.
 * A partner with `logo: null` shows a labelled placeholder. Never recreate or
 * redraw an organisation's logo.
 */
export type Partner = {
  id: string;
  name: string;
  /** Shown beneath the logo. */
  descriptor: string;
  logo: { src: string; width: number; height: number } | null;
};

export const partners: Partner[] = [
  {
    id: "bdb",
    name: "Bharat Diamond Bourse",
    descriptor: "Bharat Diamond Bourse, Mumbai",
    logo: { src: "/images/partners/bharat-diamond-bourse.webp", width: 500, height: 468 },
  },
  {
    id: "gjepc",
    name: "GJEPC",
    descriptor: "Gem & Jewellery Export Promotion Council",
    logo: { src: "/images/partners/gjepc.svg", width: 360, height: 156 },
  },
];
