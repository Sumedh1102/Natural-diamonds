import { Info } from "lucide-react";
import { cn } from "@/lib/format";

/** Small label marking an illustrative starter listing. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm",
        className,
      )}
    >
      Sample listing
    </span>
  );
}

/** Explains that starter listings are placeholders. Renders nothing once real inventory is in place. */
export function SampleNotice({ show, className }: { show: boolean; className?: string }) {
  if (!show) return null;
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-bronze/25 bg-bronze/[0.06] px-4 py-3 text-xs leading-relaxed text-white/60 sm:text-[13px]",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-bronze" />
      <span>
        <strong className="font-medium text-white/80">Illustrative listings.</strong> These sample diamonds show how
        natural diamonds will be presented. Grades are examples and images are representative of each shape or colour — ask us
        for current availability and full details.
      </span>
    </p>
  );
}
