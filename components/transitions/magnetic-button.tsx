"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { cn } from "@/lib/utils";

const MAX_OFFSET = 8;
const spring = { stiffness: 260, damping: 18, mass: 0.4 };

/** Leans its child a few pixels towards the pointer (desktop only). No re-render: motion values. */
export function MagneticButton({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const rich = useRichMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const clamp = (value: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value * strength));
    x.set(clamp(event.clientX - (rect.left + rect.width / 2)));
    y.set(clamp(event.clientY - (rect.top + rect.height / 2)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className={cn("inline-flex", className)}
      style={rich ? { x, y } : undefined}
      onPointerMove={rich ? handleMove : undefined}
      onPointerLeave={rich ? reset : undefined}
    >
      {children}
    </motion.span>
  );
}
