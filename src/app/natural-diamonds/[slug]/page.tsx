import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { TreatedBadge } from "@/components/products/ProductCard";
import { SampleBadge, SampleNotice } from "@/components/products/SampleNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { absoluteUrl, siteConfig, whatsappHref } from "@/config/site";
import { getCategory } from "@/data/categories";
import { getShape } from "@/data/shapes";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/catalogue";
import { colorLabel, formatCarat, priceLabel } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import type { Product } from "@/types";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/natural-diamonds/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Diamond not found" };
  const shape = getShape(product.shape);
  return pageMetadata({
    title: product.name,
    description: `${formatCarat(product.carat)} ${shape.label.toLowerCase()} natural diamond, ${colorLabel(product)} colour${product.clarity ? `, ${product.clarity} clarity` : ""}${product.cut ? `, ${product.cut} cut` : ""}${product.colourOrigin === "treated" ? ", treated colour" : ""}. Reference ${product.reference}. ${product.description}`,
    path: `/natural-diamonds/${product.slug}`,
  });
}

function specRows(product: Product) {
  const shape = getShape(product.shape);
  const report = product.gradingReport;
  const rows: { label: string; value: ReactNode }[] = [
    { label: "Diamond type", value: "Natural diamond" },
    { label: "Category", value: getCategory(product.category).label },
    {
      label: "Colour origin",
      value:
        product.colourOrigin === "treated" ? (
          <span className="text-amber-200">Treated{product.treatmentNote ? ` — ${product.treatmentNote}` : ""}</span>
        ) : (
          "Natural colour"
        ),
    },
    { label: "Shape", value: shape.label },
    { label: "Carat weight", value: formatCarat(product.carat) },
    { label: "Colour", value: colorLabel(product) },
    {
      label: "Clarity",
      value: product.clarity ?? <span className="text-white/55">Not graded (opaque stone)</span>,
    },
    {
      label: "Cut grade",
      value: product.cut ?? (
        <span className="text-white/55">
          {product.category !== "white"
            ? "Not graded for coloured diamonds"
            : product.shape === "round"
              ? "Not graded"
              : "Not graded for fancy shapes"}
        </span>
      ),
    },
  ];
  if (product.polish) rows.push({ label: "Polish", value: product.polish });
  if (product.symmetry) rows.push({ label: "Symmetry", value: product.symmetry });
  if (product.fluorescence) rows.push({ label: "Fluorescence", value: product.fluorescence });
  if (product.measurements) rows.push({ label: "Measurements", value: `${product.measurements} mm` });
  rows.push({
    label: "Grading report",
    value:
      report && report.verified ? (
        <span>
          {report.laboratory} · {report.reportNumber}
          {report.verificationUrl && (
            <a
              href={report.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 text-bronze hover:text-bronze-300"
            >
              Verify <ExternalLink aria-hidden="true" className="size-3" />
            </a>
          )}
        </span>
      ) : (
        <span className="text-white/55">Ask us for report details</span>
      ),
  });
  rows.push({ label: "Reference", value: product.reference });
  return rows;
}

export default async function ProductPage({ params }: PageProps<"/natural-diamonds/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const shape = getShape(product.shape);
  const related = getRelatedProducts(product, 3);
  const inquiryMessage = `Hello, I would like to ask about the natural diamond ${product.reference} (${product.name}).`;
  const keySpecs = [
    { label: "Carat", value: formatCarat(product.carat) },
    { label: "Colour", value: colorLabel(product) },
    { label: "Clarity", value: product.clarity ?? "—" },
    { label: "Cut", value: product.cut ?? "—" },
  ];

  return (
    <>
      <section className="border-b border-white/10 bg-ink-900 pb-16 pt-10 sm:pb-20 lg:pb-24">
        <Container>
          <Breadcrumbs
            items={[{ label: "Natural Diamonds", href: "/natural-diamonds" }, { label: product.reference }]}
            className="mb-8 sm:mb-10"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-28">
                <ProductGallery images={product.images} productName={product.name} representative={product.isSample} />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-bronze/40 bg-bronze/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-bronze-200">
                  Natural Diamond
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">
                  {getCategory(product.category).label}
                </span>
                {product.colourOrigin === "treated" && <TreatedBadge className="bg-transparent" />}
                {product.isSample && <SampleBadge className="bg-transparent" />}
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-bronze">
                {shape.label} · Ref. {product.reference}
              </p>
              <h1 className="mt-3 font-serif text-4xl font-light leading-[1.08] text-white text-balance sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{product.description}</p>

              <dl className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4">
                {keySpecs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`p-5 text-center ${index % 2 === 1 ? "border-l border-white/10" : ""} ${index >= 2 ? "border-t border-white/10 sm:border-t-0" : ""} ${index === 2 ? "sm:border-l" : ""}`}
                  >
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-white/55">{spec.label}</dt>
                    <dd className={`mt-2 font-serif leading-tight text-white ${spec.value.length > 8 ? "text-lg" : "text-2xl"}`}>
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {product.colourOrigin === "treated" && (
                <p
                  role="note"
                  className="mt-6 rounded-xl border border-amber-300/30 bg-amber-950/40 p-4 text-sm leading-relaxed text-amber-100/90"
                >
                  <strong className="font-medium text-amber-100">Treated colour.</strong> This is a natural diamond whose
                  colour has been altered by treatment. Treated diamonds are always disclosed as such and are valued
                  differently from diamonds with natural colour.
                </p>
              )}

              <div className="mt-8 flex flex-col gap-1 border-b border-white/10 pb-8">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Price</span>
                <span className="font-serif text-3xl font-light text-white">{priceLabel(product)}</span>
                {!product.price && (
                  <span className="text-sm text-white/55">Enquire for pricing and current availability.</span>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={`/contact?diamond=${encodeURIComponent(product.slug)}`}
                  size="lg"
                  leadingIcon={<MessageCircle aria-hidden="true" className="size-4" />}
                  className="sm:flex-1"
                >
                  Enquire about this diamond
                </ButtonLink>
                <ExternalButton
                  href={whatsappHref(inquiryMessage)}
                  variant="outline"
                  size="lg"
                  leadingIcon={<WhatsAppIcon className="size-4" />}
                  className="sm:flex-1"
                >
                  WhatsApp
                </ExternalButton>
              </div>

              <SampleNotice show={product.isSample} className="mt-8" />

              <div className="mt-10">
                <h2 className="font-serif text-2xl font-light text-white">Specifications</h2>
                <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {specRows(product).map((row) => (
                    <div key={row.label} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 py-3.5 text-sm">
                      <dt className="text-white/55">{row.label}</dt>
                      <dd className="text-white/85">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-[11px] uppercase tracking-[0.25em] text-bronze">About the {shape.label.toLowerCase()} shape</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{shape.summary}</p>
                <Link
                  href="/diamond-education#shapes"
                  className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bronze transition-colors hover:text-bronze-300"
                >
                  Compare diamond shapes <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-20 sm:py-24">
          <Container>
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Continue Exploring"
                size="md"
                title={
                  <span id="related-title">
                    You May Also <em>Consider</em>
                  </span>
                }
              />
              <ButtonLink href="/natural-diamonds" variant="outline" className="self-start sm:self-auto">
                All diamonds
              </ButtonLink>
            </div>
            <ProductGrid products={related} className="lg:grid-cols-3" />
          </Container>
        </section>
      )}

      {/* Structured data only for real inventory, never for sample listings. */}
      {!product.isSample && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            sku: product.reference,
            description: product.description,
            url: absoluteUrl(`/natural-diamonds/${product.slug}`),
            image: absoluteUrl(product.images[0].src),
            brand: { "@type": "Brand", name: siteConfig.company },
            ...(product.price
              ? {
                  offers: {
                    "@type": "Offer",
                    price: product.price.amount,
                    priceCurrency: product.price.currency,
                    url: absoluteUrl(`/natural-diamonds/${product.slug}`),
                  },
                }
              : {}),
          }}
        />
      )}
    </>
  );
}
