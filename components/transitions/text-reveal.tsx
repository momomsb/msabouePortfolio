"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * - rise: the text slides up from behind a mask (like the hero name);
 * - wipe: revealed left to right with a clip-path;
 * - focus: blurred, then sharp.
 */
export type TextRevealVariant = "rise" | "wipe" | "focus";

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Record<TextRevealVariant, { hidden: TargetAndTransition; shown: TargetAndTransition; duration: number }> = {
  rise: { hidden: { y: "105%" }, shown: { y: "0%" }, duration: 0.9 },
  wipe: { hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)" }, duration: 1.1 },
  focus: { hidden: { opacity: 0, filter: "blur(12px)" }, shown: { opacity: 1, filter: "blur(0px)" }, duration: 0.9 },
};

/** One-shot reveal for headings. Falls back to a plain fade when the user prefers reduced motion. */
export function TextReveal({
  children,
  variant = "rise",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: TextRevealVariant;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { hidden, shown, duration } = reduced ? { hidden: { opacity: 0 }, shown: { opacity: 1 }, duration: 0.4 } : variants[variant];
  const motionProps = {
    initial: hidden,
    whileInView: shown,
    viewport: { once: true, margin: "0px 0px -12% 0px" },
    transition: { duration, delay, ease },
  };

  if (variant === "rise" && !reduced) {
    // The mask clips the travelling text; a little bottom padding keeps descenders visible.
    // The mask (always on screen) is what's observed: the hidden text itself never
    // intersects the viewport, so a whileInView on it would never fire.
    return (
      <motion.span
        className={cn("block overflow-hidden pb-[0.08em]", className)}
        initial="hidden"
        whileInView="shown"
        viewport={motionProps.viewport}
      >
        <motion.span className="block" variants={{ hidden, shown: { ...shown, transition: motionProps.transition } }}>
          {children}
        </motion.span>
      </motion.span>
    );
  }
  return (
    <motion.span className={cn("block", className)} {...motionProps}>
      {children}
    </motion.span>
  );
}
