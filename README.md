# NAV Natural Diamonds

A standalone website for the client's natural diamond business, built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**. Its look follows the existing NAV Diamonds website ([Sumedh1102/Diamond_WebsiteORG](https://github.com/Sumedh1102/Diamond_WebsiteORG)): charcoal grounds, a bronze accent (`#B88A6A`), Cormorant Garamond headings, pill buttons and numbered editorial details. Its content, catalogue and routes belong to natural diamonds alone.

The existing site is not modified by this project. The two applications share no code, dependencies or deployment.

> **Before launch:** the catalogue contains **illustrative sample listings**, the homepage mine imagery is a **computer-generated render** (not a photograph of a real mine), and some business details need the client's confirmation. See [Before going live](#before-going-live).

---

## Quick start

Requirements: Node.js 20.9 or later (developed on Node 22) and npm.

```bash
npm install
cp .env.example .env.local   # optional: set the site URL and inquiry webhook
npm run dev                  # http://localhost:3000
```

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                            |
| `npm run build`     | Production build (TypeScript is checked during the build)     |
| `npm start`         | Serve the production build (`npm start -- -p 3001` for a port) |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)           |
| `npm run typecheck` | Generate route types, then run `tsc --noEmit`                 |

## Routes

| Route                          | Page                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `/`                            | Homepage: mine hero → From Earth to Diamond → categories (and shapes) → featured diamonds → craftsmanship → collections → about → education → why choose us → consultation |
| `/natural-diamonds`            | Catalogue: category tabs, search, filters (colour origin, shape, carat, colour grade, clarity, cut), sorting, grid or list view — all kept in the URL |
| `/natural-diamonds/[slug]`     | Diamond detail: gallery, specifications, inquiry and WhatsApp CTAs, related diamonds        |
| `/collections`                 | All collections                                                                            |
| `/collections/[slug]`          | A collection: its diamonds, or its service process (matched pairs, bespoke jewellery)       |
| `/about`                       | Our Story                                                                                  |
| `/diamond-education`           | 4Cs, shapes, formation, grading reports, natural vs lab-grown, FAQ (anchored sections)     |
| `/contact`                     | Contact details and inquiry form (`?diamond=<slug>` or `?interest=<interest>` prefill it)  |
| `/api/inquiry`                 | `POST` endpoint that validates inquiries and forwards them to your webhook                 |
| `/sitemap.xml`, `/robots.txt`  | Generated from the routes and data                                                         |

Catalogue URLs can be shared and linked, e.g. `/natural-diamonds?category=white&shape=oval,pear&carat=1-1.49&color=E,F&sort=carat-desc&view=list`. Other parameters: `origin=natural|treated`, `clarity=`, `cut=`, `q=` (search).

## Project structure

```
public/images/        Client-owned imagery, optimised from the existing site
  brand/              NAV mark, Open Graph image
  hero/               mine-desktop / mine-mobile: rendered open-pit mine (see tools/mine-render)
public/models/        diamond.glb: the hero's turning diamond (made by tools/diamond-model)
  editorial/          Story photography, plus mine-aerial (rendered)
  colours/            Representative coloured diamonds (champagne, yellow, pink, black)
  collections/        Collection imagery
  shapes/             Cut-out photographs of each diamond shape
src/
  app/                Routes (App Router), metadata, sitemap, robots, API route
  components/
    layout/           Announcement bar, header + mobile menu, footer, logo
    home/             Homepage sections
    products/         Product card, gallery, catalogue explorer, filters
    collections/      Collection card
    contact/          Inquiry form
    ui/               Buttons, headings, containers, page hero, breadcrumbs, motion
    seo/              JSON-LD helper
  config/             site.ts (business details), navigation.ts
  data/               products, categories, collections, shapes, education, FAQs
  lib/                Catalogue logic, inquiry validation, formatting, metadata
  types/              Shared TypeScript types
  proxy.ts            Returns a real 404 for unknown product/collection slugs
tools/mine-render/    Offline three.js renderer for the hero mine imagery (not part of the build)
tools/diamond-model/  Source and optimiser for the hero diamond model, with its licence (not part of the build)
```

Pages are Server Components. Client Components are limited to the interactive parts: the header, catalogue explorer, gallery, tabs, accordion, inquiry form, scroll reveals and the hero diamond.

## Before going live

### 1. Replace the sample catalogue

`src/data/products.ts` holds **16 illustrative listings** (references `NDS-101` to `NDS-116`): 12 white diamonds and one each of champagne, fancy yellow, fancy pink and treated black, so every category and the treated-colour labelling can be seen working. Their grades are examples, their images show the shape or colour rather than the individual stone, and they carry no grading reports or prices. Each has `isSample: true`, which adds a "Sample listing" badge and an explanatory notice wherever it appears. Once no sample listings remain, the badges and notices disappear on their own.

For each real diamond, provide:

```ts
{
  slug: "round-1-02ct-abc123",          // URL segment, unique
  reference: "ABC123",                  // stock reference shown to customers
  name: "1.02 ct Round Brilliant Natural Diamond",
  category: "white",                    // white | champagne | fancy-colour | black
  colourOrigin: "natural",              // "treated" for any colour treatment — always from the report
  treatmentNote: undefined,             // e.g. "HPHT processed" for treated stones
  shape: "round",                       // see DiamondShape in src/types
  carat: 1.02,
  color: "F",                           // D–M grade for white diamonds…
  colorDescription: undefined,          // …or e.g. "Fancy Light Pink", "Cognac (C6)", "Black"
  clarity: "VS1",                       // omit for opaque stones
  cut: "Excellent",                     // round brilliants only
  polish: "Excellent", symmetry: "Excellent", fluorescence: "None",
  measurements: "6.45 x 6.48 x 3.99",   // optional, mm
  description: "…",
  images: [{ src: "/images/products/abc123-1.webp", alt: "…", label: "Face-up", tone: "dark" }],
  collections: ["loose-natural-diamonds", "engagement-diamonds"],
  featured: true,                       // shown on the homepage (first four)
  gradingReport: { laboratory: "…", reportNumber: "…", verified: true, verificationUrl: "…" },
  price: { amount: 450000, currency: "INR" },   // omit for "Price on request"
  isSample: false,
}
```

- Only set `gradingReport.verified: true` after checking the report with the issuing laboratory. Unverified reports are never displayed.
- **Colour origin:** set `colourOrigin: "treated"` for any diamond whose colour has been treated (most black diamonds, irradiated or HPHT-processed colours). Treated stones get a "Treated colour" badge, a disclosure note and their own filter value; never mark a stone `"natural"` without the report to support it.
- Categories and their descriptions live in `src/data/categories.ts`. A category with no listings still appears on the homepage, linking to an enquiry instead of the catalogue.
- Filters adapt to the data: each one lists only values present in the catalogue and is hidden when there is nothing to choose between, and price sorting only appears once diamonds have prices.
- Product structured data (JSON-LD) is output only for listings where `isSample` is `false`.
- **Connecting an API or CMS:** change `getAllProducts()` and `getProduct()` in `src/lib/catalogue.ts` and keep returning `Product[]`. Every page uses these functions. If slugs come from an API, update the slug check in `src/proxy.ts`, or remove it and accept a streamed `noindex` 404 page with a 200 status.

Collections live in `src/data/collections.ts`. A diamond appears in a collection when its `collections` array contains the collection's slug.

### 2. Confirm business details

Everything is in `src/config/site.ts`:

- **Contact details** (address, email, two phone numbers, WhatsApp number) were copied from the existing NAV site. Confirm they apply to the natural diamond business.
- **Brand name:** the site uses "NAV Natural Diamonds" with the client's NAV mark. Change `name`, `company` and `tagline` if the natural business trades under another name.
- **Social links:** the existing site only links to placeholders, so none are shown. Add real URLs to `social` and they appear in the footer and on the contact page.
- **Announcement bar:** edit the text, or set `announcement: null` to hide it.
- **Budget ranges** on the inquiry form are in INR (`budgetRanges` in `src/types/index.ts`). Adjust them or remove the field.

The About page (`src/app/about/page.tsx`), the homepage "About the Brand" and "Why Choose Us" sections (`src/components/home/AboutTeaser.tsx`, `WhyChooseUs.tsx`) are written in deliberately general terms. Add verified company history, team and expertise there; do not publish claims about origin, ethics, certification or heritage that the client cannot support.

### 3. Connect the inquiry form

The form posts to `/api/inquiry`, which validates the submission on the server and forwards it as JSON to `INQUIRY_WEBHOOK_URL`.

```bash
# .env.local or your hosting provider's environment settings
INQUIRY_WEBHOOK_URL=https://formspree.io/f/xxxxxxx   # or a Zapier/Make hook, CRM intake URL, your own API
INQUIRY_WEBHOOK_SECRET=optional-shared-secret        # sent as "Authorization: Bearer …"
```

Payload sent to the webhook:

```json
{
  "source": "NAV Natural Diamonds",
  "submittedAt": "2026-10-23T07:36:18.584Z",
  "name": "…", "email": "…", "phone": "…",
  "interest": "Engagement diamond", "budget": "…",
  "diamondReference": "NDS-102",
  "message": "…",
  "summary": "Plain-text version of the inquiry for email-style integrations"
}
```

**Until a webhook is configured, nothing is sent.** The form says so plainly ("Online sending is not connected yet") and offers prefilled email and WhatsApp alternatives, so no inquiry is silently lost. A hidden honeypot field filters simple bots. For heavier spam protection, add a CAPTCHA or rate limiting in front of the endpoint.

### 4. Set the production domain

Set `NEXT_PUBLIC_SITE_URL` to the production domain (e.g. `https://www.example.com`) before building. Canonical URLs, Open Graph tags, the sitemap and `robots.txt` use it. Without it they fall back to `http://localhost:3000`.

### 5. Replace the hero render with licensed imagery (recommended)

The homepage hero (`public/images/hero/mine-desktop.webp` 2560×1440, `mine-mobile.webp` 1080×1920) and the aerial view in the origin story (`public/images/editorial/mine-aerial.webp`) are **computer-generated renders of a generic open-pit kimberlite mine**, made with `tools/mine-render` because no licensed mine photography could be obtained. They depict no specific mine, and the hero carries a small "Illustration" caption. To use licensed photography or footage instead:

- Overwrite the files with the same names and similar compositions: in the landscape frame the pit sits right of centre with darker ground on the left for the text; in the portrait frame a dark sky sits at the top and the pit is centred.
- Remove the "Illustration · open-pit kimberlite mine" captions in `src/components/home/Hero.tsx` if the new image is a photograph, and update the `alt` text there.
- Hero video: the hero background is image-only for performance. If you add a video, keep the current image as its `poster`, load it only on landscape screens, and skip autoplay when `prefers-reduced-motion` or Save-Data is set.

The turning diamond over the mine is a third-party 3D model, **"Diamond" by Karolina Renkiewicz, CC BY 4.0**. Its licence requires the credit shown in the hero, so keep it (or replace the model, see `tools/diamond-model/README.md`).

### 6. Legal pages

No privacy policy or terms pages are included, because their content must come from the client. The inquiry form collects personal data, so add a privacy notice and link it from the footer (`src/components/layout/Footer.tsx`) and the form's consent text before launch.

## Deployment

The site needs a Node.js host, because of the inquiry API route and the 404 proxy. Vercel works without extra configuration, and any platform that runs `npm run build && npm start` will do. Pages are prerendered at build time, so after editing `src/data/*`, rebuild and redeploy.

## Design notes

- **Adapted from the existing site:** the palette, Cormorant Garamond serif, black header with a bronze hairline and growing underline on hover, glass dropdowns, a full-screen numbered serif mobile menu, the WhatsApp inquiry pill, bronze eyebrows, numbered rows, the feature-selector layout (used for the craftsmanship journey), the numbered FAQ accordion, the shapes slider, and the jewellery process copy (designing, CAD, setting and polishing, presentation). The formation and rough-to-polished copy also comes from the existing site's natural diamond page.
- **BHC Diamonds references:** bhcdiamonds.com could not be reached from the build environment (its domain did not resolve), so its pages were not inspected directly. Published descriptions of the business informed the approach: diamonds organised by colour category, with size and quality ranges, and treated stones identified as such. That shaped the category section, the category tabs and overview on the catalogue, the colour-origin labelling and the list (spec-sheet) view. No BHC branding, assets or copy are used.
- **Homepage storytelling:** a cinematic mine hero (rendered imagery, transparent header over it), a "From Earth to Diamond" section with a not-to-scale cross-section diagram (`EarthCrossSection.tsx`), then categories, featured diamonds, craftsmanship, collections, brand, education, why choose us and consultation. The FAQ moved to the education page.
- **Hero diamond:** a 3D diamond turns slowly above the mine (`HeroDiamond.tsx`, `diamond-scene.ts`). It is drawn with plain WebGL2 rather than three.js, so it costs about 4 KB of gzipped script plus a 9 KB model, loaded once the page is idle. Each pixel traces light through the stone's facets, so it sparkles and shows fire as it turns. It draws only while on screen, lowers its resolution or holds still on slow GPUs, holds still for `prefers-reduced-motion`, and is skipped with Save-Data or without WebGL2. The hero is complete without it.
- **Changed deliberately:** the hero background is a rendered still with a slow CSS "settle" rather than the existing site's three.js scene. Headings are set in the serif throughout, and ivory sections add rhythm. Images showing lab-grown reactors, "NavLab" branding or laboratory certificates were not reused.
- **Accessibility:** skip link, landmarks, keyboard-operable menus and tabs, a native `<dialog>` for mobile filters, labelled form errors with focus management, AA colour contrast, and `prefers-reduced-motion` support (fades without movement). Content stays visible without JavaScript.
- **Motion:** Framer Motion powers the scroll reveals and loads its animation features on demand after hydration. Other transitions are CSS.
