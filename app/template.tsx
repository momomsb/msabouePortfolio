"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

// The first render must not animate: it would delay the initial paint (LCP).
let hasNavigated = false;

/** Page transition: a short fade-up on client-side navigations only. */
export default function Template({ children }: { children: ReactNode }) {
  const animate = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
