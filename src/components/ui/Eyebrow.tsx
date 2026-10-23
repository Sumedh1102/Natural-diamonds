import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type EyebrowProps = {
  children: ReactNode;
  /** Draw the short bronze rule before the label. */
  rule?: boolean;
  tone?: "dark" | "light";
  className?: string;
};

export function Eyebrow({ children, rule = false, tone = "dark", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-normal uppercase tracking-[0.3em] sm:text-xs",
        tone === "dark" ? "text-bronze" : "text-bronze-700",
        className,
      )}
    >
      {rule && <span aria-hidden="true" className="h-px w-10 bg-current" />}
      {children}
    </p>
  );
}
