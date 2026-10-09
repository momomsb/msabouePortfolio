import Image from "next/image";
import { SignalVisual } from "@/components/projects/signal-visual";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagList } from "@/components/ui/tag";
import { getI18n } from "@/i18n/server";
import type { Project } from "@/types";

/** Large card for the featured project: presentation, technologies and a visual. */
export async function FeaturedProjectCard({ project }: { project: Project }) {
  const { dict } = await getI18n();
  const t = dict.projects;
  return (
    <Reveal>
      <SpotlightCard className="brackets overflow-hidden rounded-3xl border border-line-strong bg-surface">
        <article className="grid lg:grid-cols-2">
          <div className="flex flex-col p-6 sm:p-10">
            <p className="label-mono text-accent">{t.featured}</p>
            <h3 className="mt-5 text-4xl font-medium tracking-tight text-fg sm:text-5xl">{project.title}</h3>
            {project.context && <p className="mt-3 font-mono text-xs text-subtle">{project.context}</p>}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

            <div className="mt-8">
              <p className="mb-3 label-mono text-subtle">{t.stack}</p>
              <TagList items={project.technologies} />
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden border-t border-line bg-ink/60 lg:border-t-0 lg:border-l">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title}, ${t.coverAlt}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="relative flex h-full flex-col justify-center gap-6 py-8">
                <p className="px-6 text-right font-mono text-[0.6875rem] text-subtle sm:px-8">
                  {project.categories.map((category) => t.categories[category]).join(" · ")}
                </p>
                <SignalVisual seed={2} className="h-56 w-full sm:h-64" />
              </div>
            )}
          </div>
        </article>
      </SpotlightCard>
    </Reveal>
  );
}
