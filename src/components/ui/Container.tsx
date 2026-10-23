import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/format";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "wide" | "narrow";
} & ComponentPropsWithoutRef<T>;

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
};

export function Container<T extends ElementType = "div">({ as, size = "default", className, ...props }: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("mx-auto w-full px-4 sm:px-6 lg:px-12", sizes[size], className)} {...props} />;
}
