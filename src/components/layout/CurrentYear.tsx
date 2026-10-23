"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The year is read in the browser only, so the prerendered shell never
 * depends on the build date.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
