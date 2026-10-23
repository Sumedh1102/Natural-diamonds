import Image from "next/image";
import { cn } from "@/lib/format";

type StoneImageProps = {
  src: string;
  alt: string;
  tone?: "dark" | "light";
  zoom?: number;
  sizes: string;
  preload?: boolean;
  className?: string;
  /** Extra classes for the <img>, e.g. hover transforms. */
  imageClassName?: string;
};

const tones = {
  dark: "bg-[radial-gradient(circle_at_50%_38%,#2c2622_0%,#171513_55%,#0d0d0d_100%)]",
  light: "bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#f6f1ea_55%,#e9e0d3_100%)]",
};

/** A cut-out diamond photograph presented on a soft, studio-like ground. */
export function StoneImage({ src, alt, tone = "dark", zoom = 1, sizes, preload, className, imageClassName }: StoneImageProps) {
  return (
    <div className={cn("relative overflow-hidden", tones[tone], className)}>
      <div className="absolute inset-[13%]" style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={85}
          className={cn(
            "object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-luxe",
            imageClassName,
          )}
        />
      </div>
    </div>
  );
}
