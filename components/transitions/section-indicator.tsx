"use client";

import { AnimatePresence, motion } from "motion/react";
import { useScrollSections } from "@/components/transitions/scroll-provider";
import { useI18n } from "@/i18n/locale-provider";
import { pad } from "@/lib/utils";

/**
 * "03 / 08 · PROJECTS", flashed on the right edge when the active section
 * changes, then faded out. Decorative (the navbar carries aria-current), desktop only.
 */
export function SectionIndicator() {
  const { content } = useI18n();
  const { active } = useScrollSections();
  const item = content.navigation.find((entry) => entry.sectionId === active);
  const total = Math.max(...content.navigation.map((entry) => entry.index ?? 0));

  return (
    <div aria-hidden className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 2xl:block">
      <AnimatePresence>
        {item?.index !== undefined && (
          <motion.div
            key={item.sectionId}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: [0, 1, 1, 0], x: [8, 0, 0, 0] }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 1.9, times: [0, 0.12, 0.7, 1], ease: "easeOut" }}
            className="absolute top-0 right-0 flex flex-col items-end gap-1 text-right"
          >
            <span className="font-mono text-[0.6875rem] text-subtle">
              <span className="text-accent">{pad(item.index)}</span> / {pad(total)}
            </span>
            <span className="label-mono text-muted">{item.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
