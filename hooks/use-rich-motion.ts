"use client";

import { useSyncExternalStore } from "react";

/** Desktop with a precise pointer, and no reduced-motion preference. */
const QUERY = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Whether scroll-linked effects (parallax, section transitions, smooth wheel,
 * magnetic buttons) should run. Tablets, phones and reduced-motion users get
 * the simple one-shot reveals only. Always false during SSR.
 */
export function useRichMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
