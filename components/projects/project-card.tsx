import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SignalVisual } from "@/components/projects/signal-visual";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tag } from "@/components/ui/tag";
import { useI18n } from "@/i18n/locale-provider";
import { getProjectRepositories } from "@/lib/content";
import type { Project } from "@/types";

const MAX_TAGS = 5;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { locale, dict } = useI18n();
  const t = dict.projects;
  const extraTags = project.technologies.length - MAX_TAGS;
  const repositories = getProjectRepositories(project, t.code);

  return (
    <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink/60">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
            <SignalVisual seed={index + 3} className="absolute inset-x-0 bottom-0 h-3/4 w-full opacity-80" />
          </>
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full border border-accent/30 bg-ink/80 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-accent uppercase backdrop-blur">
            {t.featuredBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-[0.6875rem] text-subtle">
          <span>{project.categories.map((category) => t.categories[category]).join(" · ")}</span>
          {project.year && <span>{project.year}</span>}
        </div>
        <h3 className="mt-3 text-xl font-medium tracking-tight text-fg">
          {project.hasCaseStudy ? (
            // Stretched link: the whole card opens the case study.
            <Link href={`/${locale}/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5" aria-label={project.highlightsTitle ?? t.highlights}>
            {project.highlights.slice(0, 4).map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.8125rem] text-fg/85">
                <span aria-hidden className="h-px w-2.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 mb-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {extraTags > 0 && (
            <li>
              <Tag className="text-subtle">+{extraTags}</Tag>
            </li>
          )}
        </ul>

        {(repositories.length > 0 || project.demo) && (
          <div className="relative z-10 mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 text-sm">
            {repositories.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title}: ${repo.label} ${dict.common.onGitHub} (${dict.common.opensInNewTab})`}
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
              >
                <GitHubIcon className="size-4" /> {repo.label}
              </a>
            ))}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
              >
                {t.liveDemo} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
