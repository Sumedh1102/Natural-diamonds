import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoneImage } from "@/components/products/StoneImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { getAllProducts, getFilterOptions } from "@/lib/catalogue";
import { ShapeRail } from "./ShapeRail";

/** Category overview in the spirit of a diamond house's product range, driven by the catalogue data. */
export function CategoriesSection() {
  const products = getAllProducts();
  const { shapes } = getFilterOptions(products);

  return (
    <section id="categories" aria-labelledby="categories-title" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="The Range"
          title={
            <span id="categories-title">
              Explore Natural <em>Diamond Categories</em>
            </span>
          }
          description={`From classic white diamonds to warm champagne tones and rare natural colour — in sizes from ${siteConfig.sizeRange.text}, each with its colour origin stated clearly.`}
          className="mb-12 lg:mb-16"
        />

        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => {
            const count = products.filter((product) => product.category === category.id).length;
            const href = count > 0 ? `/natural-diamonds?category=${category.id}` : "/contact?interest=Loose%20natural%20diamond";
            return (
              <Reveal as="li" key={category.id} delay={index * 0.06}>
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-850 transition-[border-color,transform] duration-500 ease-luxe hover:-translate-y-1 hover:border-bronze/40"
                >
                  <StoneImage
                    src={category.image}
                    alt=""
                    sizes="(min-width: 1280px) 20rem, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[4/3]"
                    imageClassName="group-hover:scale-[1.06]"
                  />
                  <span className="flex flex-1 flex-col p-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-bronze">{category.eyebrow}</span>
                    <span className="mt-2 font-serif text-[1.65rem] font-light leading-tight text-white">{category.label}</span>
                    <span className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{category.summary}</span>
                    <span className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">{category.grading}</span>
                    <span className="mt-5 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em]">
                      <span className="text-white/60">
                        {count > 0 ? `${count} ${count === 1 ? "listing" : "listings"}` : "By enquiry"}
                      </span>
                      <span className="inline-flex items-center gap-2 text-bronze transition-colors group-hover:text-bronze-300">
                        {count > 0 ? "View" : "Enquire"}
                        <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-20 border-t border-white/10 pt-14">
          <h3 className="font-serif text-2xl font-light text-white sm:text-3xl">
            Or browse by <em className="italic text-bronze-200">shape</em>
          </h3>
          <ShapeRail shapes={shapes} />
        </div>
      </Container>
    </section>
  );
}
