# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing and catalogue site for the client's natural diamond business ("NAV Natural Diamonds"), built with Next.js 16.4 (App Router), React 19, TypeScript and Tailwind CSS 4. It is a separate application from the client's existing lab-grown site (`Sumedh1102/Diamond_WebsiteORG`), whose look it borrows. Never modify that repository. There is no database: content is typed data in `src/`.

`AGENTS.md` (auto-written by `next dev`) applies: this Next.js version has breaking changes, so read the relevant guide in `node_modules/next/dist/docs/` before using an API you are unsure of.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build        # production build (also type-checks)
npm start            # serve the build
npm run lint         # ESLint; single file: npx eslint src/components/home/Hero.tsx
npm run typecheck    # next typegen && tsc --noEmit
```

There is no test suite. Verify changes with lint, typecheck and build, then by loading the affected routes. Plain `tsc` fails without `next typegen`, because `PageProps`/`LayoutProps` are generated globals.

## Next.js 16 constraints that shape the code

`next.config.ts` enables `cacheComponents` and `partialPrefetching`. Consequences:

- **No `new Date()`, `Math.random()` etc. while prerendering**, even in Client Components. `src/components/layout/CurrentYear.tsx` reads the date via `useSyncExternalStore` with a `null` server snapshot.
- **`useSearchParams` must sit inside `<Suspense>`.** `/natural-diamonds` and `/contact` render a full, useful fallback (all products, or an unprefilled form) so the prerendered HTML is complete.
- **`generateStaticParams` must return at least one entry, and `dynamicParams` is not allowed.** Unknown slugs therefore stream with HTTP 200. `src/proxy.ts` checks product and collection slugs against the data to return real 404s, so update it if products move to an API.
- **Routes stay mounted (hidden) under React `<Activity>` after navigation.** Derive state from the URL where possible, and reset transient UI (drawers, menus) in a `useLayoutEffect` cleanup, as `CatalogueExplorer` does.
- **Image qualities are allow-listed** (`images.qualities: [75, 85]`). Use `preload`, not the deprecated `priority`.
- **Metadata merges shallowly.** Every page builds its metadata with `pageMetadata()` from `src/lib/metadata.ts`, which sets a canonical URL and complete Open Graph/Twitter objects.

## Architecture

**Data and configuration.** Business details (contact info, brand name, announcement, social links) live in `src/config/site.ts`, and menus in `src/config/navigation.ts`, which is generated from the categories and collections data. Content lives in `src/data/`: `products`, `categories`, `collections`, `shapes`, `education`, `faqs`. Types are in `src/types/index.ts`.

**Catalogue access goes through `src/lib/catalogue.ts`.** `getAllProducts()` and `getProduct()` are the single swap point for an API or CMS. The same module holds the search, filter and sort logic, `getFilterOptions()` and URL (de)serialisation. Filter options are derived from the data: a filter, tab or sort option only renders when the data offers a choice. The exception is the carat bands, which always show the full size range offered (0.003 ct to 1 ct and above, `siteConfig.sizeRange`).

**Catalogue state lives in the URL** (`?category=&origin=&shape=&carat=&color=&clarity=&cut=&q=&sort=&view=list`). `CatalogueExplorer` parses it with `useSearchParams` and writes it with `window.history.replaceState`, so there is no server round-trip. The search box uses a `{ value, base }` draft so that typing filters instantly, the URL updates on a debounce, and external URL changes (links, back/forward, Activity re-show) replace the draft. Collection pages, the header dropdown and homepage cards link into the catalogue with these query strings, e.g. `catalogueQuery` in `src/data/collections.ts`.

**Content-integrity rules are enforced in code; keep them intact:**
- `isSample: true` on starter products drives the "Sample listing" badges and the `SampleNotice` banners, and suppresses Product JSON-LD. Real inventory sets it to `false`.
- `colourOrigin: "treated"` must be shown wherever a product appears: `TreatedBadge`, the list view, and the disclosure note and spec row on the product page.
- `gradingReport` is displayed only when `verified: true`. `price` is optional ("Price on request").
- The site covers natural diamonds only. Do not add lab-grown stock, or invent claims about sourcing, certification, heritage, prices or availability. Copy in About, Why Choose Us and similar sections is deliberately general (see README "Before going live").

**Inquiry flow.** `InquiryForm` validates on the client with `src/lib/inquiry.ts`, which the API route reuses. It posts to `src/app/api/inquiry/route.ts`, and that route forwards to `INQUIRY_WEBHOOK_URL` (optional `INQUIRY_WEBHOOK_SECRET` as a Bearer token). Without the webhook it returns `503 { code: "not_configured" }`, and the form tells the visitor nothing was sent and offers prefilled email and WhatsApp links instead. `/contact?diamond=<slug>` and `?interest=<InquiryInterest>` prefill the form via `InquiryFormFromUrl`.

**Homepage.** `src/app/page.tsx` stacks the sections in `src/components/home/`. The hero (`Hero.tsx`) uses `getImageProps` with a `<picture>` that switches between the landscape and portrait mine renders by aspect ratio. Its negative top margin pairs with `Header.tsx`, which is transparent (`overHero`) only on `/` before the page scrolls. Change both together.

**Hero diamond.** `HeroDiamond.tsx` turns a 3D diamond above the mine. It creates its canvas in an effect (so a route hidden by `<Activity>` releases its WebGL context), imports `diamond-scene.ts` once the page is idle, draws only while on screen, samples frame pacing to lower resolution or hold still on slow GPUs, and holds still under reduced motion. `diamond-scene.ts` is plain WebGL2 (no three.js, by design, for bundle size): a fragment shader traces each pixel through the stone against the convex-hull planes stored in `public/models/diamond.glb`, under an analytic studio environment. Any failure leaves the hero as it is. The model is CC BY 4.0, so its credit (in the footer, `Footer.tsx`) must stay while it is shown.

**Styling.** Tailwind v4 is configured in CSS only (`src/app/globals.css`); there is no `tailwind.config`. It holds the `@theme` tokens (`ink-*`, `bronze-*`, `ivory`, `taupe`), the fonts (Cormorant Garamond serif and Jost sans via `next/font` variables), the `wide:` custom variant (`min-aspect-ratio: 5/4`, used for hero layout) and custom utilities. Tailwind runs through the `@tailwindcss/turbopack` loader set in `next.config.ts`. Small text on dark grounds should be at least `text-white/55` for AA contrast. Light sections use `bronze-700` for small text.

**Motion.** framer-motion is loaded through `LazyMotion` in `MotionProvider` (wrapping `<main>` in the layout), with `strict` set: use `m.*` (see `ui/Reveal.tsx`), not `motion.*`. Reveal elements carry `data-reveal`, which a `<noscript>` style in the layout uses to keep content visible without JavaScript. Other animations are CSS, gated with `motion-safe:`.

**Server vs Client Components.** Pages are Server Components. Client Components are limited to `Header`, `CatalogueExplorer`/`FilterPanel`, `ProductGallery`, `CraftJourney`, `FaqAccordion`, `ShapeRail`, `InquiryForm`, `Reveal`/`MotionProvider`, `CurrentYear` and `HeroDiamond`.

## Assets

- `public/images/` holds optimised client-owned imagery from the original site, plus coloured stones in `colours/`.
- The hero mine images (`hero/mine-*.webp`) are computer-generated renders made with `tools/mine-render/` (three.js, rendered in headless Chromium; see its README). That tooling is not part of the app build, and ESLint ignores `tools/**`.
- `public/models/diamond.glb` is generated by `node tools/diamond-model/optimize.mjs` from `tools/diamond-model/diamond-source.glb` ("Diamond" by Karolina Renkiewicz, CC BY 4.0). Regenerate it rather than editing it; the shader needs the `hullPlanes` the tool adds.
- The app icon and favicon are file-based metadata in `src/app/`. The Open Graph image is `public/images/brand/og-image.jpg`, referenced explicitly by `pageMetadata()`.
