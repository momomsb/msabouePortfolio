import Image from "next/image";
import { ScreenshotsButton } from "@/components/projects/screenshots-button";
import { SignalVisual } from "@/components/projects/signal-visual";
import { ParallaxElement } from "@/components/transitions/parallax-element";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagList } from "@/components/ui/tag";
import { getI18n } from "@/i18n/server";
import type { Project } from "@/types";

/** Large card for the featured project: presentation, technologies and a visual. */
export async function FeaturedProjectCard({ project }: { project: Project }) {
  const { dict } = await getI18n();
  const t = dict.projects;
  // The cover's pixel size comes from its gallery entry, so it can be shown uncropped.
  const cover = project.gallery?.find((shot) => shot.src === project.image);
  return (
    <Reveal id="featured-project">
      <SpotlightCard className="brackets overflow-hidden rounded-3xl border border-line-strong bg-surface">
        <article className="grid lg:grid-cols-2">
          <div className="flex flex-col p-6 sm:p-10">
            {/* Same node as the end of the experience timeline: the internship led here. */}
            <p className="flex items-center gap-3 label-mono text-accent">
              <span aria-hidden className="size-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_rgb(45_226_255/0.6)]" />
              {t.featured}
            </p>
            <h3 className="mt-5 text-4xl font-medium tracking-tight text-fg sm:text-5xl">{project.title}</h3>
            {project.context && <p className="mt-3 font-mono text-xs text-subtle">{project.context}</p>}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

            <div className="mt-8">
              <p className="mb-3 label-mono text-subtle">{t.stack}</p>
              <TagList items={project.technologies} />
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <ScreenshotsButton images={project.gallery} title={project.title} className="mt-auto self-start pt-8" />
            )}
          </div>

          <div className="relative min-h-72 overflow-hidden border-t border-line bg-ink/60 lg:border-t-0 lg:border-l">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
            {cover ? (
              <div className="relative flex h-full items-center p-4 sm:p-8">
                <ParallaxElement distance={14} className="w-full">
                  <Image
                    src={cover.src}
                    alt={`${project.title}, ${t.coverAlt}`}
                    width={cover.width}
                    height={cover.height}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="h-auto w-full rounded-xl border border-line-strong shadow-[0_24px_60px_-24px_rgb(0_0_0/0.6)]"
                  />
                </ParallaxElement>
              </div>
            ) : project.image ? (
              <Image
                src={project.image}
                alt={`${project.title}, ${t.coverAlt}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-left-top"
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
