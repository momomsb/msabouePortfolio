import Image from "next/image";
import { ProjectLinks } from "@/components/projects/project-links";
import { SignalVisual } from "@/components/projects/signal-visual";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagList } from "@/components/ui/tag";
import type { Project } from "@/types";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <SpotlightCard className="brackets overflow-hidden rounded-3xl border border-line-strong bg-surface">
        <article className="grid lg:grid-cols-2">
          <div className="flex flex-col p-6 sm:p-10">
            <p className="flex items-center gap-3 label-mono text-accent">
              Featured project {project.year && <span className="text-subtle">· {project.year}</span>}
            </p>
            <h3 className="mt-5 text-4xl font-medium tracking-tight text-fg sm:text-5xl">{project.title}</h3>
            {project.context && <p className="mt-3 font-mono text-xs text-subtle">{project.context}</p>}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

            {project.highlights && (
              <div className="mt-8">
                <p className="mb-3 label-mono text-subtle">{project.highlightsTitle ?? "Highlights"}</p>
                <TagList items={project.highlights} tone="accent" />
              </div>
            )}

            <div className="mt-6">
              <p className="mb-3 label-mono text-subtle">Stack</p>
              <TagList items={project.technologies} />
            </div>

            <div className="mt-auto pt-10">
              <ProjectLinks project={project} size="lg" />
            </div>
          </div>

          <div className="relative flex min-h-80 flex-col justify-between overflow-hidden border-t border-line bg-ink/60 lg:border-t-0 lg:border-l">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <div className="relative flex items-center justify-between px-6 pt-6 font-mono text-[0.6875rem] text-subtle sm:px-8">
                  <span>{project.slug}.system</span>
                  <span>{project.categories.join(" · ")}</span>
                </div>
                <SignalVisual seed={2} className="relative h-56 w-full sm:h-64" />
                {project.pipeline && (
                  <ol
                    aria-label="Pipeline"
                    className="relative flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line px-6 py-5 font-mono text-[0.6875rem] sm:px-8"
                  >
                    {project.pipeline.map((step, index) => (
                      <li key={step} className="flex items-center gap-2">
                        {index > 0 && (
                          <span aria-hidden className="text-accent/60">
                            →
                          </span>
                        )}
                        <span className="rounded border border-line-strong bg-raised px-2 py-1 text-muted">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </>
            )}
          </div>
        </article>
      </SpotlightCard>
    </Reveal>
  );
}
