import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Wrap words in <em> for the bronze italic accent. */
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg" | "xl";
  className?: string;
};

const titleSizes = {
  md: "text-3xl sm:text-4xl lg:text-[2.75rem]",
  lg: "text-[2.25rem] sm:text-5xl lg:text-[3.5rem]",
  xl: "text-[2.6rem] sm:text-6xl lg:text-7xl",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={tone} rule={align === "left"} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          "font-serif font-light leading-[1.08] text-balance [&_em]:italic",
          titleSizes[size],
          tone === "dark" ? "text-white [&_em]:text-bronze-200" : "text-ink [&_em]:text-bronze-600",
        )}
      >
        {title}
      </Tag>
      {description && (
        <div
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-white/55" : "text-taupe",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
