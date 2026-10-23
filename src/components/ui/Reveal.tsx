"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, for gentle staggering. */
  delay?: number;
  /** Vertical travel in pixels. */
  offset?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Restrained fade-and-rise on first scroll into view. Motion settings
 * (including reduced-motion handling) come from MotionProvider. The same
 * element renders on server and client, so hydration never leaves content hidden.
 */
export function Reveal({ children, className, delay = 0, offset = 24, as = "div" }: RevealProps) {
  const MotionTag = m[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
