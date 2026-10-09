"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { CertificationCard } from "@/components/certifications/certification-card";
import { FilterBar } from "@/components/ui/filter-bar";
import { useI18n } from "@/i18n/locale-provider";
import type { Certification, CertificationCategory } from "@/types";

type Filter = "All" | CertificationCategory;

const FILTERS: Filter[] = ["All", "AI / ML", "Data", "Cloud", "Programming", "Other"];

export function CertificationGrid({ certifications }: { certifications: Certification[] }) {
  const { dict } = useI18n();
  const t = dict.certifications;
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const result: Partial<Record<Filter, number>> = { All: certifications.length };
    for (const option of FILTERS) {
      if (option !== "All") result[option] = certifications.filter((cert) => cert.category === option).length;
    }
    return result;
  }, [certifications]);

  const visible = filter === "All" ? certifications : certifications.filter((cert) => cert.category === filter);

  return (
    <div>
      <FilterBar
        label={t.filterLabel}
        getLabel={(option) => t.categories[option]}
        options={FILTERS}
        value={filter}
        onChange={setFilter}
        counts={counts}
        className="mb-8"
      />
      <p className="sr-only" aria-live="polite">
        {t.shown(visible.length)}
      </p>
      <motion.ul layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((certification) => (
            <motion.li
              key={`${certification.issuer}-${certification.title}`}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <CertificationCard certification={certification} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
