"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { mainNav, type NavItem } from "@/config/navigation";
import { siteConfig, whatsappHref } from "@/config/site";
import { cn } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

const SCROLL_THRESHOLD = 12;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const normalise = (path: string) => path.replace(/[#?].*$/, "").replace(/\/+$/, "") || "/";

function isActive(item: NavItem, pathname: string) {
  const current = normalise(pathname);
  const target = normalise(item.href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

const desktopLinkClass = (active: boolean) =>
  cn(
    "group relative inline-flex items-center gap-1.5 py-2 text-[11px] font-normal uppercase tracking-[0.16em] transition-colors duration-300 xl:text-xs xl:tracking-[0.18em]",
    active ? "text-bronze" : "text-white/75 hover:text-white focus-visible:text-white",
  );

/** Bronze line under a desktop link: grows from the centre on hover and stays for the current page. */
function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-1.5 left-0 h-px w-full origin-center bg-bronze transition-transform duration-300 ease-out",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
      )}
    />
  );
}

export function Header() {
  const pathname = usePathname();
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(0);

  // Close every menu after a route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastPointerType = useRef("");

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu when the window grows into the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // Escape closes any open menu; a pointer down outside the header closes a dropdown.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenDropdown(null);
      if (mobileMenuRef.current?.contains(document.activeElement)) menuButtonRef.current?.focus();
      setMobileOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const openNow = (label: string) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  // Short delay so the menu survives the pointer crossing the gap to the panel.
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const closeAll = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  const toggleMobileMenu = () => {
    if (!mobileOpen) setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    setMobileOpen((open) => !open);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 bg-black transition-shadow duration-300",
          isScrolled && "shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto grid h-[72px] max-w-screen-2xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 sm:h-20 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-10 xl:grid-cols-[1fr_auto_1fr] xl:px-12"
        >
          <Link
            href="/"
            onClick={closeAll}
            aria-label={`${siteConfig.name} home`}
            className="justify-self-start rounded-sm"
          >
            <Logo preload className="lg:[&>span:last-child]:hidden xl:[&>span:last-child]:flex" />
          </Link>

          <ul className="hidden h-full items-center justify-center gap-6 lg:flex xl:gap-9">
            {mainNav.map((item) => {
              const active = isActive(item, pathname);

              if (!item.children) {
                return (
                  <li key={item.label} className="flex h-full items-center">
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      aria-current={active ? "page" : undefined}
                      className={desktopLinkClass(active)}
                    >
                      <span className="relative">
                        {item.label}
                        <Underline active={active} />
                      </span>
                    </Link>
                  </li>
                );
              }

              const open = openDropdown === item.label;
              const menuId = `nav-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

              return (
                <li
                  key={item.label}
                  className="relative flex h-full items-center"
                  onPointerEnter={(event) => event.pointerType === "mouse" && openNow(item.label)}
                  onPointerLeave={(event) => event.pointerType === "mouse" && closeSoon()}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenDropdown((current) => (current === item.label ? null : current));
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape" && open) {
                      event.stopPropagation();
                      setOpenDropdown(null);
                      triggerRefs.current[item.label]?.focus();
                    }
                  }}
                >
                  <button
                    type="button"
                    ref={(element) => {
                      triggerRefs.current[item.label] = element;
                    }}
                    aria-expanded={open}
                    aria-controls={menuId}
                    onPointerDown={(event) => {
                      lastPointerType.current = event.pointerType;
                    }}
                    onKeyDown={() => {
                      lastPointerType.current = "keyboard";
                    }}
                    onClick={() => {
                      // Hover already opened it for a mouse; touch and keyboard toggle on click.
                      if (lastPointerType.current === "mouse") openNow(item.label);
                      else setOpenDropdown((current) => (current === item.label ? null : item.label));
                    }}
                    className={desktopLinkClass(active || open)}
                  >
                    <span className="relative">
                      {item.label}
                      <Underline active={active || open} />
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
                    />
                  </button>

                  {/* The top padding bridges the gap to the bar so hovering across it keeps the menu open. */}
                  <div
                    id={menuId}
                    className={cn(
                      "absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-[opacity,transform,visibility] duration-200 ease-out",
                      open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="relative w-[22rem] overflow-hidden rounded-xl border border-white/10 bg-ink-950/95 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                      <span aria-hidden="true" className="hairline-bronze absolute inset-x-0 top-0 h-px" />
                      <ul className="p-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 text-white/75 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white focus-visible:bg-white/[0.06]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[11px] h-px w-3 shrink-0 bg-bronze/50 transition-all duration-300 group-hover/item:w-5 group-hover/item:bg-bronze"
                              />
                              <span className="flex flex-col gap-1">
                                <span className="text-sm leading-snug">{child.label}</span>
                                {child.description && (
                                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                                    {child.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {item.allLink && (
                        <div className="border-t border-white/10 p-2">
                          <Link
                            href={item.allLink.href}
                            onClick={closeAll}
                            className="group/all flex items-center justify-between rounded-lg px-3 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-bronze transition-colors duration-200 hover:bg-white/[0.04] hover:text-bronze-300 focus-visible:bg-white/[0.06]"
                          >
                            {item.allLink.label}
                            <ArrowRight
                              aria-hidden="true"
                              className="size-3.5 transition-transform duration-300 group-hover/all:translate-x-1"
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 justify-self-end">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp (opens in a new tab)"
              className="group/cta hidden min-h-11 items-center gap-2 rounded-full bg-bronze px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-900 shadow-[0_8px_24px_-10px_rgba(184,138,106,0.8)] transition-all duration-300 hover:bg-bronze-400 sm:inline-flex xl:px-6 xl:text-xs"
            >
              <WhatsAppIcon className="size-4" />
              <span className="lg:hidden xl:inline">Inquiry</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 lg:hidden xl:block"
              />
            </a>

            <button
              type="button"
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="relative flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-bronze/70 hover:text-bronze lg:hidden"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out",
                  mobileOpen ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out",
                  mobileOpen ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>

        <div
          aria-hidden="true"
          className={cn(
            "hairline-bronze absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-40",
          )}
        />
      </header>

      {/* Mobile menu: fills the screen below the header bar. */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        style={{ top: menuTop }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 bg-black transition-[opacity,visibility] duration-300 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-bronze/10 blur-3xl"
        />
        <div className="relative h-full overflow-y-auto overscroll-contain">
          <nav aria-label="Mobile" className="mx-auto flex min-h-full max-w-xl flex-col px-6 pb-8 pt-4 sm:px-10">
            <ul>
              {mainNav.map((item, index) => {
                const active = isActive(item, pathname);
                const number = String(index + 1).padStart(2, "0");
                const rowClass = cn(
                  "border-b border-white/10 transition-[opacity,transform] duration-500 ease-out",
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                );
                const rowStyle = { transitionDelay: mobileOpen ? `${80 + index * 50}ms` : "0ms" };
                const labelClass = cn(
                  "font-serif text-[1.75rem] leading-none transition-colors duration-300 sm:text-4xl",
                  active ? "text-bronze" : "text-white group-hover:text-bronze-200",
                );
                const numberEl = (
                  <span className="w-6 shrink-0 text-[11px] font-medium tracking-[0.2em] text-bronze">{number}</span>
                );

                if (!item.children) {
                  return (
                    <li key={item.label} className={rowClass} style={rowStyle}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-4 sm:py-5"
                      >
                        {numberEl}
                        <span className={labelClass}>{item.label}</span>
                      </Link>
                    </li>
                  );
                }

                const expanded = mobileSection === item.label;
                const sectionId = `mobile-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <li key={item.label} className={rowClass} style={rowStyle}>
                    <button
                      type="button"
                      onClick={() => setMobileSection(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      aria-controls={sectionId}
                      className="group flex w-full items-baseline gap-4 py-4 text-left sm:py-5"
                    >
                      {numberEl}
                      <span className={cn("flex-1", labelClass)}>{item.label}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-5 self-center transition-transform duration-300",
                          expanded ? "rotate-180 text-bronze" : "text-white/60",
                        )}
                      />
                    </button>
                    {/* Collapsed sections are invisible too, which keeps their links out of the tab order. */}
                    <div
                      id={sectionId}
                      className={cn(
                        "grid transition-[grid-template-rows,visibility] duration-300 ease-out",
                        expanded ? "grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-1 pb-5 pl-10">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={closeAll}
                                className="block py-2 text-[15px] leading-snug text-white/65 transition-colors duration-200 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          {item.allLink && (
                            <li>
                              <Link
                                href={item.allLink.href}
                                onClick={closeAll}
                                className="inline-flex items-center gap-2 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-bronze transition-colors duration-200 hover:text-bronze-300"
                              >
                                {item.allLink.label}
                                <ArrowRight aria-hidden="true" className="size-3.5" />
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div
              className={cn(
                "mt-auto space-y-3 pt-10 transition-[opacity,transform] duration-500 ease-out",
                mobileOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: mobileOpen ? `${80 + mainNav.length * 50}ms` : "0ms" }}
            >
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-bronze px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-900 shadow-[0_10px_30px_-10px_rgba(184,138,106,0.8)] transition-colors duration-300 hover:bg-bronze-400"
              >
                <WhatsAppIcon className="size-5" />
                WhatsApp Inquiry
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <Link
                href="/contact"
                onClick={closeAll}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink-900"
              >
                Book a consultation
              </Link>
              <p className="pt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/55 text-balance">
                Natural diamonds · {siteConfig.contact.address.locality}
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
