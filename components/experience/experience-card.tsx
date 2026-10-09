"use client";

import Link from "next/link";
import { useId, useState, type PointerEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { TagList } from "@/components/ui/tag";
import { useI18n } from "@/i18n/locale-provider";
import { cn, formatDateRange, formatDuration } from "@/lib/utils";
import type { Experience } from "@/types";

/**
 * Timeline entry: a compact summary that expands on hover (mouse) or on
 * tap / Enter (touch & keyboard). Details stay in the HTML for SEO; they are
 * only collapsed visually and made inert while closed.
 */
export function ExperienceCard({ experience }: { experience: Experience }) {
  const { locale, dict } = useI18n();
  const t = dict.experience;
  const panelId = useId();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const open = pinned || hovered;
  const duration = formatDuration(experience.start, experience.end, locale);

  const onMouse = (value: boolean) => (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovered(value);
  };

  return (
    <div className="relative grid gap-6 pb-12 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
      <div className="md:pr-10 md:text-right">
        <p className="font-mono text-sm text-fg">{formatDateRange(experience.start, experience.end, locale)}</p>
        {duration && <p className="mt-1 font-mono text-xs text-subtle">{duration}</p>}
      </div>

      {/* Timeline node */}
      <span aria-hidden className="absolute top-1 left-0 grid size-[15px] place-items-center md:left-[25%]">
        <span className={cn("absolute size-[15px] rounded-full bg-accent/20 transition-transform duration-500", open && "scale-150")} />
        <span className="size-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_rgb(45_226_255/0.6)]" />
      </span>

      <article
        onPointerEnter={onMouse(true)}
        onPointerLeave={onMouse(false)}
        className={cn(
          "overflow-hidden panel transition-[border-color,box-shadow] duration-300 md:col-span-3 md:ml-10",
          open && "border-line-strong shadow-[0_20px_60px_-30px_rgb(0_0_0/0.5)]",
        )}
      >
        <h3>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setPinned((value) => !value)}
            className="group block w-full p-6 text-left sm:p-8"
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.6875rem] text-accent">
                {t.types[experience.type]}
              </span>
              {experience.team && <span className="font-mono text-xs text-subtle">{experience.team}</span>}
              {experience.location && <span className="font-mono text-xs text-subtle">{experience.location}</span>}
            </span>
            <span className="mt-4 flex items-start justify-between gap-4">
              <span className="block font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">{experience.company}</span>
              <span
                aria-hidden
                className={cn(
                  "mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-[transform,color,border-color] duration-300 group-hover:border-accent/50 group-hover:text-accent",
                  open && "rotate-180 border-accent/50 text-accent",
                )}
              >
                <ChevronDown className="size-4" />
              </span>
            </span>
            <span className="mt-2 block text-base text-muted sm:text-lg">
              <span className="text-fg/90">{experience.role}</span> · {experience.title}
            </span>
            <span
              className={cn(
                "mt-4 flex max-h-10 items-center gap-2 overflow-hidden font-mono text-[0.6875rem] tracking-wider text-subtle uppercase transition-[opacity,max-height,margin] duration-300",
                open && "mt-0 max-h-0 opacity-0",
              )}
            >
              <span aria-hidden className="h-px w-6 bg-accent/60" />
              {t.details}
            </span>
          </button>
        </h3>

        {/* Collapsible details (CSS grid-rows animation) */}
        <div
          id={panelId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="grid gap-px border-t border-line bg-line md:grid-cols-2">
              <Block label={t.context}>{experience.context}</Block>
              <Block label={t.problem}>{experience.problem}</Block>
            </div>

            <div className="space-y-8 border-t border-line p-6 sm:p-8">
              <div>
                <h4 className="mb-4 label-mono text-subtle">{t.responsibilities}</h4>
                <ul className="space-y-3">
                  {experience.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 label-mono text-subtle">{t.technologies}</h4>
                <TagList items={experience.technologies} />
              </div>

              {experience.results.length > 0 ? (
                <div>
                  <h4 className="mb-4 label-mono text-subtle">{t.results}</h4>
                  <ul className="space-y-3">
                    {experience.results.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ContentPlaceholder file="experience.ts">Add measured results for this experience.</ContentPlaceholder>
              )}

              {experience.projectSlug && (
                <Link
                  href={`/${locale}/projects/${experience.projectSlug}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  {t.readCaseStudy}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Block({ label, children }: { label: string; children: string }) {
  return (
    <div className="bg-surface p-6 sm:p-8">
      <h4 className="mb-3 label-mono text-accent">{label}</h4>
      <p className="text-[0.9375rem] leading-relaxed text-muted">{children}</p>
    </div>
  );
}
