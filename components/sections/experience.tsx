import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { experiences } from "@/data/experience";
import { formatDateRange, formatDuration } from "@/lib/utils";
import type { Experience as ExperienceEntry } from "@/types";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        index={2}
        tag="Experience · Field log"
        title="Where I've applied it."
        description="Professional experience, from context to delivery."
      />

      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute top-2 bottom-0 left-[7px] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent md:left-[calc(25%+7px)]"
        />
        <ol>
          {experiences.map((experience) => (
            <TimelineEntry key={experience.id} experience={experience} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function TimelineEntry({ experience }: { experience: ExperienceEntry }) {
  const duration = formatDuration(experience.start, experience.end);

  return (
    <Reveal as="li" className="relative grid gap-6 pb-12 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
      <div className="md:pr-10 md:text-right">
        <p className="font-mono text-sm text-fg">{formatDateRange(experience.start, experience.end, { withDay: true })}</p>
        {duration && <p className="mt-1 font-mono text-xs text-subtle">{duration}</p>}
      </div>

      {/* Node */}
      <span aria-hidden className="absolute top-1 left-0 grid size-[15px] place-items-center md:left-[25%]">
        <span className="absolute size-[15px] rounded-full bg-accent/20" />
        <span className="size-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_rgb(45_226_255/0.6)]" />
      </span>

      <article className="overflow-hidden panel md:col-span-3 md:ml-10">
        <header className="border-b border-line p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.6875rem] text-accent">
              {experience.type}
            </span>
            {experience.team && <span className="font-mono text-xs text-subtle">{experience.team}</span>}
            {experience.location && <span className="font-mono text-xs text-subtle">{experience.location}</span>}
          </div>
          <h3 className="mt-4 text-2xl font-medium tracking-tight text-fg sm:text-3xl">{experience.company}</h3>
          <p className="mt-2 text-base text-muted sm:text-lg">
            <span className="text-fg/90">{experience.role}</span> · {experience.title}
          </p>
        </header>

        <div className="grid gap-px bg-line md:grid-cols-2">
          <Block label="Context">{experience.context}</Block>
          <Block label="Problem">{experience.problem}</Block>
        </div>

        <div className="space-y-8 border-t border-line p-6 sm:p-8">
          <div>
            <h4 className="mb-4 label-mono text-subtle">Responsibilities</h4>
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
            <h4 className="mb-4 label-mono text-subtle">Technologies</h4>
            <TagList items={experience.technologies} />
          </div>

          {experience.results.length > 0 ? (
            <div>
              <h4 className="mb-4 label-mono text-subtle">Results</h4>
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
              href={`/projects/${experience.projectSlug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              Read the case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
      </article>
    </Reveal>
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
