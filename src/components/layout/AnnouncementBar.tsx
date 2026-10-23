import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  const { announcement } = siteConfig;
  if (!announcement) return null;

  return (
    <section aria-label="Announcement" className="relative z-50 border-b border-white/5 bg-ink-950 text-white/70">
      <div className="mx-auto flex min-h-9 max-w-screen-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[10px] uppercase tracking-[0.22em] sm:text-[11px]">
        <span className="hidden size-1 rounded-full bg-bronze sm:inline-block" aria-hidden="true" />
        <span className="sm:hidden">{announcement.shortText}</span>
        <span className="hidden sm:inline">{announcement.text}</span>
        <Link
          href={announcement.href}
          className="group inline-flex items-center gap-1.5 text-bronze transition-colors hover:text-bronze-300"
        >
          {announcement.linkLabel}
          <ArrowRight aria-hidden="true" className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
