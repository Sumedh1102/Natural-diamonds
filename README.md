# NAV Natural Diamonds

A standalone website for the client's natural diamond business, built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**. Its look follows the existing NAV Diamonds website ([Sumedh1102/Diamond_WebsiteORG](https://github.com/Sumedh1102/Diamond_WebsiteORG)): charcoal grounds, a bronze accent (`#B88A6A`), Cormorant Garamond headings, pill buttons and numbered editorial details. Its content, catalogue and routes belong to natural diamonds alone.

The existing site is not modified by this project. The two applications share no code, dependencies or deployment.

> **Before launch:** the catalogue contains **illustrative sample listings**, and some business details need the client's confirmation. See [Before going live](#before-going-live).

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
| `/`                            | Homepage: hero, shape browser, collections, featured diamonds, natural story, craftsmanship, education, FAQ, consultation |
| `/natural-diamonds`            | Catalogue with search, filters (shape, carat, colour, clarity, cut) and sorting, kept in the URL |
| `/natural-diamonds/[slug]`     | Diamond detail: gallery, specifications, inquiry and WhatsApp CTAs, related diamonds        |
| `/collections`                 | All collections                                                                            |
| `/collections/[slug]`          | A collection: its diamonds, or its service process (matched pairs, bespoke jewellery)       |
| `/about`                       | Our Story                                                                                  |
| `/diamond-education`           | 4Cs, shapes, formation, grading reports, natural vs lab-grown (anchored sections)          |
| `/contact`                     | Contact details and inquiry form (`?diamond=<slug>` or `?interest=<interest>` prefill it)  |
| `/api/inquiry`                 | `POST` endpoint that validates inquiries and forwards them to your webhook                 |
| `/sitemap.xml`, `/robots.txt`  | Generated from the routes and data                                                         |

Catalogue URLs can be shared and linked, e.g. `/natural-diamonds?shape=oval,pear&carat=1-1.49&color=E,F&sort=carat-desc`.

## Project structure

```
public/images/        Client-owned imagery, optimised from the existing site
  brand/              NAV mark, Open Graph image
  hero/ editorial/    Hero and story photography
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
  data/               products, collections, shapes, education, FAQs
  lib/                Catalogue logic, inquiry validation, formatting, metadata
  types/              Shared TypeScript types
  proxy.ts            Returns a real 404 for unknown product/collection slugs
```

Pages are Server Components. Client Components are limited to the interactive parts: the header, catalogue explorer, gallery, tabs, accordion, inquiry form and scroll reveals.

## Before going live

### 1. Replace the sample catalogue

`src/data/products.ts` holds **12 illustrative listings** (references `NDS-101` to `NDS-112`). Their grades are examples, their images show the shape rather than the individual stone, and they carry no grading reports or prices. Each has `isSample: true`, which adds a "Sample listing" badge and an explanatory notice wherever it appears. Once no sample listings remain, the badges and notices disappear on their own.

For each real diamond, provide:

```ts
{
  slug: "round-1-02ct-abc123",          // URL segment, unique
  reference: "ABC123",                  // stock reference shown to customers
  name: "1.02 ct Round Brilliant Natural Diamond",
  shape: "round",                       // see DiamondShape in src/types
  carat: 1.02,
  color: "F",
  clarity: "VS1",
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

The About page (`src/app/about/page.tsx`) is written in deliberately general terms. Add verified company history, team and expertise there; do not publish claims about origin, ethics, certification or heritage that the client cannot support.

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

### 5. Legal pages

No privacy policy or terms pages are included, because their content must come from the client. The inquiry form collects personal data, so add a privacy notice and link it from the footer (`src/components/layout/Footer.tsx`) and the form's consent text before launch.

## Deployment

The site needs a Node.js host, because of the inquiry API route and the 404 proxy. Vercel works without extra configuration, and any platform that runs `npm run build && npm start` will do. Pages are prerendered at build time, so after editing `src/data/*`, rebuild and redeploy.

## Design notes

- **Adapted from the existing site:** the palette, Cormorant Garamond serif, black header with a bronze hairline and growing underline on hover, glass dropdowns, a full-screen numbered serif mobile menu, the WhatsApp inquiry pill, bronze eyebrows, numbered rows, the feature-selector layout (used for the craftsmanship journey), the numbered FAQ accordion, the shapes slider, and the jewellery process copy (designing, CAD, setting and polishing, presentation). The formation and rough-to-polished copy also comes from the existing site's natural diamond page.
- **Changed deliberately:** a photographic hero replaces the existing site's three.js diamond to keep the page fast. Headings are set in the serif throughout, and ivory sections add rhythm. Images showing lab-grown reactors, "NavLab" branding or laboratory certificates were not reused.
- **Accessibility:** skip link, landmarks, keyboard-operable menus and tabs, a native `<dialog>` for mobile filters, labelled form errors with focus management, AA colour contrast, and `prefers-reduced-motion` support (fades without movement). Content stays visible without JavaScript.
- **Motion:** Framer Motion powers the scroll reveals and loads its animation features on demand after hydration. Other transitions are CSS.
