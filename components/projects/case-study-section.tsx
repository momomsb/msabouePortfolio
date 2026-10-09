import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ProjectGallery } from "@/components/projects/project-gallery";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CaseStudySection, Project } from "@/types";

/** Whether a section has something to show (empty sections are hidden in production). */
export function isSectionFilled(section: CaseStudySection, project: Project) {
  switch (section.kind) {
    case "text":
      return section.body.length > 0;
    case "features":
      return section.groups.length > 0;
    case "stack":
      return section.items.length > 0;
    case "gallery":
      return Boolean(project.gallery?.length);
    default:
      return true;
  }
}

/** Renders one case-study section body according to its kind. */
export function CaseStudySectionBody({ section, project, dict }: { section: CaseStudySection; project: Project; dict: Dictionary }) {
  switch (section.kind) {
    case "text":
      return <Prose paragraphs={section.body} bullets={section.bullets} />;

    case "architecture":
      return (
        <>
          <Prose paragraphs={section.body} />
          <div className="mt-8">
            <ArchitectureDiagram layers={section.layers} label={dict.caseStudy.diagramLabel} caption={dict.caseStudy.diagramCaption} />
          </div>
        </>
      );

    case "features":
      return (
        <>
          {section.body && <Prose paragraphs={section.body} />}
          <div className="grid gap-4 md:grid-cols-2">
            {section.groups.map((group, index) => (
              <div key={group.title} className={index === 0 && section.groups.length % 2 === 1 ? "panel p-6 md:col-span-2" : "panel p-6"}>
                <h3 className="mb-4 label-mono text-accent">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      );

    case "stack":
      return (
        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {section.items.map((item) => (
            <div key={item.name} className="grid gap-1 bg-surface/80 px-5 py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="font-mono text-sm text-fg">{item.name}</dt>
              <dd className="text-sm text-muted sm:col-span-2">{item.role}</dd>
            </div>
          ))}
        </dl>
      );

    case "indicators":
      return (
        <>
          <Prose paragraphs={section.body} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {section.indicators.map((indicator) => (
              <li key={indicator.name} className="panel p-5">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl font-medium tracking-tight text-accent">{indicator.name}</span>
                  <span className="text-right font-mono text-[0.6875rem] text-subtle">{indicator.fullName}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{indicator.description}</p>
              </li>
            ))}
          </ul>
        </>
      );

    case "gallery":
      return (
        <>
          {section.body && <Prose paragraphs={section.body} />}
          {project.gallery && <ProjectGallery images={project.gallery} />}
        </>
      );
  }
}

function Prose({ paragraphs, bullets }: { paragraphs: string[]; bullets?: string[] }) {
  if (paragraphs.length === 0 && !bullets?.length) return null;
  return (
    <div className="mb-8 max-w-3xl space-y-5 text-lg leading-relaxed text-muted last:mb-0">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {bullets && (
        <ul className="space-y-3 pt-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-base text-fg/90">
              <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
