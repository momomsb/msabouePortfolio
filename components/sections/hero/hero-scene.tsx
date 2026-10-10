"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { DataNetwork } from "@/components/sections/hero/data-network";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { cn } from "@/lib/utils";

/**
 * Hero → About. As the hero scrolls away, its environment evolves instead of
 * simply leaving: the data network slows down, sinks (parallax) and fades,
 * while the foreground drifts up, so About emerges from the same space.
 */

/** Backdrop: blueprint grid, soft glows and the data network. */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const speed = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  return (
    // The bottom fades out with a mask (not an opaque gradient), so the page backdrop stays continuous.
    <div ref={ref} aria-hidden className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
      <motion.div className={cn("absolute inset-0", rich && "will-change-[transform,opacity]")} style={rich ? { y, opacity } : undefined}>
        <div className="absolute inset-0 bg-grid mask-fade-edges" />
        <div className="absolute top-[-20%] right-[-10%] size-[720px] rounded-full bg-accent/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[-15%] size-[560px] rounded-full bg-violet/[0.05] blur-[140px]" />
        <DataNetwork
          speed={rich ? speed : undefined}
          className="absolute inset-0 size-full animate-fade-in [mask-image:linear-gradient(to_right,transparent,black_35%,black_80%,transparent)] max-md:opacity-50"
        />
      </motion.div>
    </div>
  );
}

/** Foreground (name, actions, readout): lifts and fades a little faster than the page scrolls. */
export function HeroForeground({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Whole pixels keep the text crisp on the promoted layer.
  const y = useTransform(scrollYProgress, (value) => Math.round(value * -80));
  const opacity = useTransform(scrollYProgress, [0.25, 0.85], [1, 0]);

  return (
    <motion.div ref={ref} style={rich ? { y, opacity } : undefined} className={cn(rich && "will-change-[transform,opacity]", className)}>
      {children}
    </motion.div>
  );
}
