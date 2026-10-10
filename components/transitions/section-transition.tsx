"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { cn } from "@/lib/utils";

/**
 * Hands a section over to the next one: while its end scrolls from the bottom
 * to the top of the viewport, the content lifts and dims, so the next section
 * seems to take its place. Scroll-linked, translate and opacity only; static
 * on touch devices and with reduced motion.
 *
 * No scale: a scaled will-change layer is a resized bitmap and makes text blurry.
 * Offsets are rounded to whole pixels for the same reason.
 *
 * - lift: drifts up (default);
 * - converge: a shorter, gentler drift, like cards settling into place.
 */
export function SectionTransition({
  children,
  exit = "lift",
  className,
}: {
  children: ReactNode;
  exit?: "lift" | "converge";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end 0.9", "end 0.15"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const distance = exit === "converge" ? -32 : -56;
  const y = useTransform(scrollYProgress, (value) => Math.round(value * distance));

  return (
    <motion.div ref={ref} style={rich ? { opacity, y } : undefined} className={cn(rich && "will-change-[transform,opacity]", className)}>
      {children}
    </motion.div>
  );
}
