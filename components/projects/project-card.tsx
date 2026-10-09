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

  const cover = project.image ? (
    <Image
      src={project.image}
      alt={`${project.title}, ${t.coverAlt}`}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
    />
  ) : (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <SignalVisual seed={index + 3} className="absolute inset-x-0 bottom-0 h-3/4 w-full opacity-80" />
    </>
  );

  return (
    <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink/60">
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
