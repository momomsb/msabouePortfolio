"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { FilterBar } from "@/components/ui/filter-bar";
import type { Project, ProjectCategory } from "@/types";

type Filter = "All" | ProjectCategory;

export function ProjectGrid({ projects, filters }: { projects: Project[]; filters: Filter[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const result: Partial<Record<Filter, number>> = { All: projects.length };
    for (const option of filters) {
      if (option !== "All") result[option] = projects.filter((project) => project.categories.includes(option)).length;
    }
    return result;
  }, [projects, filters]);

  const visible = filter === "All" ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <div>
      <FilterBar
        label="Filter projects by category"
        options={filters}
        value={filter}
        onChange={setFilter}
        counts={counts}
        className="mb-8"
      />
      <p className="sr-only" aria-live="polite">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown
      </p>
      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} index={index} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
