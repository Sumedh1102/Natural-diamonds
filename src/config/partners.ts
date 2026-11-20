/**
 * Organisations the business is associated with, shown in "Associated With".
 *
 * Official logos are NOT bundled: add each organisation's own artwork (as
 * supplied by the organisation or the client) to `public/images/partners/`
 * and set `logo`, keeping the file's true width and height so its proportions
 * and colours are preserved. Until then the section shows a labelled
 * placeholder. Never recreate or redraw an organisation's logo.
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
    descriptor: "Mumbai, India",
    // logo: { src: "/images/partners/bharat-diamond-bourse.png", width: 0, height: 0 },
    logo: null,
  },
  {
    id: "gjepc",
    name: "GJEPC",
    descriptor: "Gem & Jewellery Export Promotion Council",
    // logo: { src: "/images/partners/gjepc.png", width: 0, height: 0 },
    logo: null,
  },
];
