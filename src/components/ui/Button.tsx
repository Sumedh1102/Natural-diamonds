import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/format";

type Variant = "primary" | "outline" | "outline-dark" | "solid-dark" | "text";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-luxe focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60 sm:text-xs";

const variants: Record<Variant, string> = {
  primary:
    "bg-bronze text-ink-900 shadow-[0_10px_30px_-12px_rgba(184,138,106,0.8)] hover:bg-bronze-400 hover:shadow-[0_14px_34px_-10px_rgba(184,138,106,0.9)]",
  outline: "border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink-900",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "solid-dark": "bg-ink-900 text-white hover:bg-ink-800",
  text: "px-0! py-0! text-bronze hover:text-bronze-300 rounded-none",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 py-3",
  lg: "min-h-12 px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow: "right" for internal links, "external" for outbound. */
  icon?: "right" | "external" | "none";
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function Trailing({ icon }: { icon: CommonProps["icon"] }) {
  if (icon === "right") {
    return <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />;
  }
  if (icon === "external") {
    return (
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      />
    );
  }
  return null;
}

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

export function ButtonLink({ variant, size, icon = "right", leadingIcon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {leadingIcon}
      {children}
      <Trailing icon={icon} />
    </Link>
  );
}

type ExternalButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;

/** For outbound links (WhatsApp, email, phone). */
export function ExternalButton({ variant, size, icon = "external", leadingIcon, className, children, ...props }: ExternalButtonProps) {
  const isWeb = typeof props.href === "string" && props.href.startsWith("http");
  return (
    <a
      className={buttonClasses({ variant, size, className })}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {leadingIcon}
      {children}
      <Trailing icon={icon} />
    </a>
  );
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({ variant, size, icon = "none", leadingIcon, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      {leadingIcon}
      {children}
      <Trailing icon={icon} />
    </button>
  );
}
