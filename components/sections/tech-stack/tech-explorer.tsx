"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  Box,
  Brain,
  Cloud,
  Code,
  Database,
  FileText,
  LineChart,
  MessageSquareText,
  Network,
  ScanSearch,
  Sheet,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/i18n/locale-provider";
import type { BrandLogo } from "@/lib/tech-logos";
import { cn } from "@/lib/utils";
import type { GenericIcon } from "@/types";

export interface TechItem {
  name: string;
  logo: BrandLogo | null;
  icon: GenericIcon;
  domains: string[];
  projects: Array<{ title: string; slug: string; hasCaseStudy: boolean }>;
  experiences: string[];
}

export interface TechGroup {
  id: string;
  title: string;
  description: string;
  items: TechItem[];
}

const genericIcons: Record<GenericIcon, LucideIcon> = {
  brain: Brain,
  sparkles: Sparkles,
  search: ScanSearch,
  network: Network,
  message: MessageSquareText,
  workflow: Workflow,
  code: Code,
  chart: BarChart3,
  lineChart: LineChart,
  cube: Box,
  report: FileText,
  sheet: Sheet,
  database: Database,
  cloud: Cloud,
};

const ALL = "all";

/** Category tabs + logo tiles; hovering, focusing or tapping a tile shows where the tool is used. */
export function TechExplorer({ groups }: { groups: TechGroup[] }) {
  const { locale, dict } = useI18n();
  const t = dict.techStack;
  const tabs = [
    ...groups.map((group) => ({ id: group.id, label: group.title, count: group.items.length })),
    { id: ALL, label: t.all, count: groups.reduce((total, group) => total + group.items.length, 0) },
  ];

  const [tab, setTab] = useState(groups[0]?.id ?? ALL);
  const [inspected, setInspected] = useState<TechItem | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const visibleGroups = tab === ALL ? groups : groups.filter((group) => group.id === tab);

  function selectTab(index: number) {
    setTab(tabs[index].id);
    setInspected(null);
    tabRefs.current[index]?.focus();
  }

  /** Arrow keys move between tabs (WAI-ARIA tabs pattern). */
  function handleTabKeyDown(event: KeyboardEvent, index: number) {
    const targets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    selectTab((targets[event.key] + tabs.length) % tabs.length);
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label={t.categoriesLabel}
          className="mx-auto flex w-max gap-1 rounded-full border border-line bg-surface/80 p-1"
        >
          {tabs.map((item, index) => {
            const active = item.id === tab;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`tech-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="tech-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200 sm:px-4",
                  active ? "text-ink" : "text-muted hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tech-tab-indicator"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">
                  {item.label}
                  <span className={cn("ml-1.5 font-mono text-[0.6875rem]", active ? "text-ink/60" : "text-subtle")}>{item.count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logo tiles */}
      <div id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${tab}`} className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            {visibleGroups.map((group) => (
              <section key={group.id} aria-labelledby={`tech-group-${group.id}`}>
                <div className="mb-6 text-center">
                  <h3
                    id={`tech-group-${group.id}`}
                    className="inline-block border-b border-line-strong pb-2 font-mono text-sm font-medium tracking-[0.18em] text-muted uppercase"
                  >
                    {group.title}
                  </h3>
                  {group.description && <p className="mt-2 text-xs text-subtle">{group.description}</p>}
                </div>
                <ul className="flex flex-wrap justify-center gap-3">
                  {group.items.map((item, index) => (
                    <motion.li
                      key={`${group.id}-${item.name}`}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
                    >
                      <TechTile item={item} active={inspected?.name === item.name} onInspect={() => setInspected(item)} />
                    </motion.li>
                  ))}
                </ul>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Where the inspected tool is used */}
        <div aria-live="polite" className="mx-auto mt-10 min-h-16 max-w-3xl rounded-2xl border border-line bg-surface/80 px-5 py-4 text-sm">
          {inspected ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
              <p className="flex shrink-0 items-center gap-2.5 font-medium text-fg">
                <TechLogo item={inspected} className="size-5" />
                {inspected.name}
              </p>
              <div className="space-y-1.5 text-muted">
                {inspected.domains.length > 0 && (
                  <p>
                    <span className="mr-2 label-mono text-subtle">{t.domains}</span>
                    {inspected.domains.join(" · ")}
                  </p>
                )}
                <p>
                  <span className="mr-2 label-mono text-subtle">{t.usedIn}</span>
                  {inspected.projects.length === 0 && inspected.experiences.length === 0 ? (
                    t.notDocumented
                  ) : (
                    <>
                      {inspected.experiences.join(" · ")}
                      {inspected.experiences.length > 0 && inspected.projects.length > 0 && " · "}
                      {inspected.projects.map((project, index) => (
                        <span key={project.slug}>
                          {index > 0 && " · "}
                          {project.hasCaseStudy ? (
                            <Link href={`/${locale}/projects/${project.slug}`} className="group inline-flex items-center gap-1 text-accent">
                              {project.title}
                              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                            </Link>
                          ) : (
                            <span className="text-fg">{project.title}</span>
                          )}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-subtle">{t.hint}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TechTile({ item, active, onInspect }: { item: TechItem; active: boolean; onInspect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onPointerEnter={onInspect}
      onFocus={onInspect}
      onClick={onInspect}
      className={cn(
        "group flex h-28 w-26 flex-col items-center justify-center gap-3 rounded-2xl border bg-surface/80 px-2 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow sm:w-28",
        active ? "-translate-y-1 border-accent/60 shadow-glow" : "border-line",
      )}
    >
      <TechLogo item={item} className="size-9 transition-transform duration-300 group-hover:scale-110" />
      <span className="line-clamp-2 text-center font-mono text-[0.6875rem] leading-tight text-muted transition-colors group-hover:text-fg">
        {item.name}
      </span>
    </button>
  );
}

function TechLogo({ item, className }: { item: TechItem; className?: string }) {
  if (item.logo) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        fill="currentColor"
        className={cn("shrink-0", !item.logo.color && "text-fg", className)}
        style={item.logo.color ? { color: item.logo.color } : undefined}
      >
        <path d={item.logo.path} />
      </svg>
    );
  }
  const Icon = genericIcons[item.icon];
  return <Icon aria-hidden strokeWidth={1.75} className={cn("shrink-0 text-accent", className)} />;
}
