"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Hairline page-progress bar with a glowing head, pinned to the bottom of its parent. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const left = useTransform(progress, (value) => `${value * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-px", className)}>
      <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-accent/50" />
      <motion.span
        style={{ left, opacity: headOpacity }}
        className="absolute top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(45_226_255/0.55)]"
      />
    </div>
  );
}
