"use client";

import { motion, type HTMLMotionProps } from "motion/react";

interface RevealOptions {
  delay?: number;
  /** Vertical travel in px. Ignored when the user prefers reduced motion. */
  distance?: number;
}

type RevealProps =
  | (RevealOptions & { as?: "div" } & HTMLMotionProps<"div">)
  /** Use "li" inside lists to keep valid markup. */
  | (RevealOptions & { as: "li" } & HTMLMotionProps<"li">);

const animation = (delay: number, distance: number) =>
  ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }) as const;

/** Fades and lifts its content once, when it scrolls into view. */
export function Reveal(props: RevealProps) {
  if (props.as === "li") {
    const { as, delay = 0, distance = 24, ...rest } = props;
    return <motion.li {...animation(delay, distance)} {...rest} />;
  }
  const { as, delay = 0, distance = 24, ...rest } = props;
  return <motion.div {...animation(delay, distance)} {...rest} />;
}
