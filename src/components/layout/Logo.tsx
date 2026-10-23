import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/format";

type LogoProps = {
  className?: string;
  /** Height class for the mark, e.g. "h-7". */
  markClassName?: string;
  showTagline?: boolean;
  preload?: boolean;
};

/** The client's NAV mark paired with the "Natural Diamonds" line that identifies this site. */
export function Logo({ className, markClassName = "h-7 sm:h-8", showTagline = true, preload = false }: LogoProps) {
  const { logo, tagline } = siteConfig;
  return (
    <span className={cn("flex items-center gap-3 sm:gap-4", className)}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        preload={preload}
        sizes="120px"
        className={cn("w-auto", markClassName)}
      />
      {showTagline && (
        <span className="flex items-center gap-3 sm:gap-4">
          <span aria-hidden="true" className="h-7 w-px bg-bronze/50" />
          <span className="text-[10px] font-normal uppercase leading-tight tracking-[0.32em] text-bronze-200 sm:text-[11px]">
            {tagline.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}
