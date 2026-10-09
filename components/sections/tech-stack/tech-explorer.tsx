"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn, pad } from "@/lib/utils";

export interface TechUsage {
  name: string;
  symbol: string;
  number: number;
  domains: string[];
  projects: Array<{ title: string; slug: string; hasCaseStudy: boolean }>;
  experiences: string[];
}

interface TechGroup {
  id: string;
  title: string;
  description: string;
  items: TechUsage[];
}

export function TechExplorer({ groups }: { groups: TechGroup[] }) {
  const [groupId, setGroupId] = useState(groups[0]?.id);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const group = groups.find((g) => g.id === groupId) ?? groups[0];
  const selected = group?.items.find((item) => item.name === selectedName) ?? group?.items[0];
  if (!group || !selected) return null;

  function selectGroup(index: number) {
    const next = groups[index];
    setGroupId(next.id);
    setSelectedName(null);
    tabRefs.current[index]?.focus();
  }

  /** Arrow keys move between tabs (WAI-ARIA tabs pattern). */
  function handleTabKeyDown(event: KeyboardEvent, index: number) {
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !backward && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    if (event.key === "Home") return selectGroup(0);
    if (event.key === "End") return selectGroup(groups.length - 1);
    selectGroup((index + (forward ? 1 : -1) + groups.length) % groups.length);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Category tabs */}
      <div
        role="tablist"
        aria-label="Technology categories"
        aria-orientation="vertical"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:col-span-3 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {groups.map((g, index) => {
          const active = g.id === group.id;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${g.id}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`panel-${g.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => selectGroup(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                "relative flex shrink-0 items-center justify-between gap-6 rounded-xl border px-4 py-3 text-left transition-colors duration-200 lg:py-4",
                active
                  ? "border-line-strong bg-raised text-fg"
                  : "border-line bg-surface/60 text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              <span>
                <span className="block text-[0.9375rem] font-medium">{g.title}</span>
                <span className="mt-0.5 hidden font-mono text-[0.6875rem] text-subtle lg:block">{g.description}</span>
              </span>
              <span className={cn("font-mono text-xs", active ? "text-accent" : "text-subtle")}>{pad(g.items.length)}</span>
              {active && (
                <motion.span
                  layoutId="tech-tab"
                  aria-hidden
                  className="absolute top-3 bottom-3 left-0 w-0.5 rounded-full bg-accent max-lg:hidden"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Element table + inspector */}
      <div
        id={`panel-${group.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${group.id}`}
        className="grid overflow-hidden panel lg:col-span-9 lg:grid-cols-5"
      >
        <div className="border-b border-line p-5 sm:p-6 lg:col-span-3 lg:border-r lg:border-b-0">
          <p className="mb-5 label-mono text-subtle">
            {group.title} · {group.items.length} elements
          </p>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {group.items.map((item, index) => {
                const isSelected = item.name === selected.name;
                return (
                  <motion.li
                    key={`${group.id}-${item.name}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                    exit={{ opacity: 0 }}
                  >
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={item.name}
                      onClick={() => setSelectedName(item.name)}
                      onPointerEnter={() => setSelectedName(item.name)}
                      className={cn(
                        "group relative flex aspect-square w-full flex-col justify-between rounded-xl border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-200 sm:p-3",
                        isSelected ? "border-accent/60 bg-accent/[0.07] shadow-glow" : "border-line bg-raised/50 hover:border-line-strong",
                      )}
                    >
                      <span className="font-mono text-[0.625rem] text-subtle">{item.number}</span>
                      <span
                        className={cn(
                          "font-display text-2xl font-medium tracking-tight sm:text-3xl",
                          isSelected ? "text-accent" : "text-fg",
                        )}
                      >
                        {item.symbol}
                      </span>
                      <span className="truncate font-mono text-[0.625rem] text-muted">{item.name}</span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <div className="relative p-5 sm:p-6 lg:col-span-2" aria-live="polite">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <p className="label-mono text-accent">Inspector · #{pad(selected.number)}</p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-fg">{selected.name}</h3>

              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="mb-2 label-mono text-subtle">Category</dt>
                  <dd className="text-fg">{group.title}</dd>
                </div>
                {selected.domains.length > 0 && (
                  <div>
                    <dt className="mb-2 label-mono text-subtle">Domains</dt>
                    <dd className="text-fg">{selected.domains.join(" · ")}</dd>
                  </div>
                )}
                <div>
                  <dt className="mb-2 label-mono text-subtle">Used in</dt>
                  <dd>
                    {selected.projects.length === 0 && selected.experiences.length === 0 ? (
                      <span className="text-muted">Not yet documented in a project on this site.</span>
                    ) : (
                      <ul className="space-y-2">
                        {selected.experiences.map((experience) => (
                          <li key={experience} className="text-fg">
                            {experience}
                          </li>
                        ))}
                        {selected.projects.map((project) => (
                          <li key={project.slug}>
                            {project.hasCaseStudy ? (
                              <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-1.5 text-accent">
                                {project.title}
                                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                              </Link>
                            ) : (
                              <span className="text-fg">{project.title}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
