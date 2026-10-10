"use client";

import { motion } from "motion/react";
import { useScrollSections } from "@/components/transitions/scroll-provider";

type Tint = "cyan" | "blue" | "violet";

/** Very faint washes of light; only their opacity animates (compositor-only). */
const LAYERS: Record<Tint, string> = {
  cyan: "radial-gradient(55% 45% at 88% 8%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 70%)",
  blue: "radial-gradient(50% 45% at 8% 18%, color-mix(in srgb, var(--color-blue) 7%, transparent), transparent 70%)",
  violet: "radial-gradient(50% 50% at 92% 55%, color-mix(in srgb, var(--color-violet) 7%, transparent), transparent 70%)",
};

/** How much of each tint a section gets: the mood shifts without the page changing color. */
const MOODS: Record<string, Partial<Record<Tint, number>>> = {
  about: { blue: 1 },
  experience: { blue: 0.5, cyan: 0.5 },
  projects: { cyan: 1 },
  skills: { cyan: 0.6, blue: 0.4 },
  certifications: { violet: 1 },
  education: { violet: 0.5, blue: 0.5 },
  contact: { cyan: 0.7 },
};

/** Fixed backdrop behind the whole page that follows the active section. */
export function AmbientBackground() {
  const { active } = useScrollSections();
  const mood = (active && MOODS[active]) || {};

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {(Object.keys(LAYERS) as Tint[]).map((tint) => (
        <motion.div
          key={tint}
          className="absolute inset-0"
          style={{ backgroundImage: LAYERS[tint] }}
          initial={false}
          animate={{ opacity: mood[tint] ?? 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
