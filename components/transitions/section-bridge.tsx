"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";

/**
 * Education → Contact, the calm transition: a line runs down from the
 * academic path and ends on a point, which hands over to the ✦ that opens
 * the Contact section (<BridgeStar />). Past → present → "let's connect".
 */
export function SectionBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const dotOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <div aria-hidden className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 7px wide: centred on the ✦ / square markers of the section tags. */}
      <div ref={ref} className="relative h-24 w-[7px] sm:h-32">
        <motion.div
          style={rich ? { scaleY } : undefined}
          className="absolute inset-y-0 left-[3px] w-px origin-top bg-gradient-to-b from-transparent via-accent/40 to-accent/80"
        />
        <motion.span
          style={rich ? { opacity: dotOpacity } : undefined}
          className="absolute -bottom-0.5 left-0 size-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_rgb(45_226_255/0.55)]"
        />
      </div>
    </div>
  );
}

/** The point at the end of the bridge, turned into a star: the Contact section marker. */
export function BridgeStar() {
  return (
    <motion.span
      aria-hidden
      className="inline-block w-[7px] text-center text-sm leading-none text-accent"
      initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      ✦
    </motion.span>
  );
}
