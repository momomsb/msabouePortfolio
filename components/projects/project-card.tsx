"use client";

import Image from "next/image";
import { useState } from "react";
import { Images } from "lucide-react";
import { ScreenshotViewer } from "@/components/projects/screenshot-viewer";
import { SignalVisual } from "@/components/projects/signal-visual";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TagList } from "@/components/ui/tag";
import { useI18n } from "@/i18n/locale-provider";
import type { Project } from "@/types";

/** Project card: cover, short presentation, technologies and, when available, its screenshots. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { dict } = useI18n();
  const t = dict.projects;
  const [viewerOpen, setViewerOpen] = useState(false);
  const shots = project.gallery ?? [];

  // Covers come in many proportions: show them whole, framed, at their own ratio.
  const coverShot = shots.find((shot) => shot.src === project.image);
  const cover = coverShot ? (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
        <Image
          src={coverShot.src}
          alt={`${project.title}, ${t.coverAlt}`}
          width={coverShot.width}
          height={coverShot.height}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="h-auto max-h-full w-auto max-w-full rounded-lg border border-line-strong shadow-[0_16px_40px_-20px_rgb(0_0_0/0.6)] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </>
  ) : project.image ? (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-4 sm:inset-5">
        <Image
          src={project.image}
          alt={`${project.title}, ${t.coverAlt}`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-contain drop-shadow-[0_16px_24px_rgb(0_0_0/0.45)] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </>
  ) : (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <SignalVisual seed={index + 3} className="absolute inset-x-0 bottom-0 h-3/4 w-full opacity-80" />
    </>
  );

  return (
    <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink/60">
        {shots.length > 0 ? (
          <button
            type="button"
            onClick={() => setViewerOpen(true)}
            aria-label={`${project.title}: ${t.viewPhotos(shots.length)}`}
            className="absolute inset-0 block"
          >
            {cover}
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-ink/85 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-fg uppercase backdrop-blur">
              <Images className="size-3" aria-hidden />
              {shots.length}
            </span>
          </button>
        ) : (
          cover
        )}
        {project.featured && (
          <span className="pointer-events-none absolute top-3 left-3 rounded-full border border-accent/30 bg-ink/80 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-accent uppercase backdrop-blur">
            {t.featuredBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[0.6875rem] text-subtle">{project.categories.map((category) => t.categories[category]).join(" · ")}</p>
        <h3 className="mt-3 text-xl font-medium tracking-tight text-fg">{project.title}</h3>
        {project.context && <p className="mt-1 font-mono text-[0.6875rem] text-subtle">{project.context}</p>}
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <TagList items={project.technologies} className="mt-5 mb-6" />

        {shots.length > 0 && (
          <button
            type="button"
            onClick={() => setViewerOpen(true)}
            className="mt-auto inline-flex items-center gap-2 self-start border-t border-line pt-4 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
          >
            <Images className="size-4" aria-hidden />
            {t.viewPhotos(shots.length)}
          </button>
        )}
      </div>

      {viewerOpen && <ScreenshotViewer images={shots} title={project.title} onClose={() => setViewerOpen(false)} />}
    </SpotlightCard>
  );
}
