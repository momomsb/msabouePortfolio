"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useRichMotion } from "@/hooks/use-rich-motion";
import { cn } from "@/lib/utils";

/**
 * Projects → Skills: the technologies used across the projects drift by in
 * two counter-moving lines and fade, introducing the engineering profile.
 * Decorative (the same names are listed in the sections), desktop only.
 */
export function TechStream({ items, className }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const forward = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const backward = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], [0, 1, 1, 0]);

  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={rich ? { opacity } : undefined}
      className={cn(
        "pointer-events-none flex flex-col items-center gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className,
        // Kept mounted (scroll target) but hidden where scroll-linked effects are off.
        !rich && "hidden",
      )}
    >
      {rows.map((row, index) => (
        <motion.p
          key={index}
          style={{ x: index === 0 ? forward : backward }}
          className="flex gap-6 font-mono text-xs tracking-wider whitespace-nowrap text-subtle uppercase will-change-transform"
        >
          {row.map((item) => (
            <span key={item} className="flex items-center gap-6">
              <span aria-hidden className="size-1 rounded-full bg-accent/50" />
              {item}
            </span>
          ))}
        </motion.p>
      ))}
    </motion.div>
  );
}
