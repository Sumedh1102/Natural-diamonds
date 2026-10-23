"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Animation features load after hydration, keeping them out of the initial bundle.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Site-wide motion settings. `reducedMotion="user"` keeps fades but drops
 * movement for visitors who prefer reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
