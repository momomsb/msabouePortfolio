"use client";

import { motion, useScroll, useSpring, type UseScrollOptions } from "motion/react";
import { useRef } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { cn } from "@/lib/utils";

const DEFAULT_OFFSET: UseScrollOptions["offset"] = ["start 0.75", "end 0.55"];

/**
 * Vertical line that draws itself (top → bottom) as it scrolls through the
 * viewport. Fully drawn on touch devices and with reduced motion.
 * Size and position come from `className` (e.g. "absolute top-2 bottom-0 w-px").
 */
export function ScrollLine({ className, offset = DEFAULT_OFFSET }: { className?: string; offset?: UseScrollOptions["offset"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  return <motion.div ref={ref} aria-hidden style={rich ? { scaleY } : undefined} className={cn("origin-top", className)} />;
}
