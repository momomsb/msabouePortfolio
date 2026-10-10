"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { cn } from "@/lib/utils";

/**
 * Drifts its content by ±`distance` px while it crosses the viewport: depth,
 * not motion sickness. Keep distances small (8–40 px). Static on touch
 * devices and with reduced motion.
 */
export function ParallaxElement({ children, distance = 24, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Whole pixels keep text and images crisp on the promoted layer.
  const y = useTransform(scrollYProgress, (value) => Math.round(distance - value * 2 * distance));

  return (
    <motion.div ref={ref} style={rich ? { y } : undefined} className={cn(rich && "will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
