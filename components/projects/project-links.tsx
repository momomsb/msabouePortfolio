import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { getI18n } from "@/i18n/server";
import { getProjectRepositories } from "@/lib/content";
import type { Project } from "@/types";

/** Case study / GitHub / demo actions. Links that don't exist are never rendered. */
export async function ProjectLinks({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const { locale, dict } = await getI18n();
  const t = dict.projects;

  return (
    <div className="flex flex-wrap gap-2">
      {project.hasCaseStudy && (
        <ButtonLink href={`/${locale}/projects/${project.slug}`} size={size}>
          {t.readCaseStudy}
          <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
        </ButtonLink>
      )}
      {getProjectRepositories(project, t.code).map((repo) => (
        <ButtonLink
          key={repo.url}
          href={repo.url}
          external
          variant="secondary"
          size={size}
          aria-label={`${project.title}: ${repo.label} ${dict.common.onGitHub} (${dict.common.opensInNewTab})`}
        >
          <GitHubIcon className="size-4" />
          {repo.label}
        </ButtonLink>
      ))}
      {project.demo && (
        <ButtonLink
          href={project.demo}
          external
          variant="secondary"
          size={size}
          aria-label={`${project.title}: ${t.liveDemo} (${dict.common.opensInNewTab})`}
        >
          {t.liveDemo}
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
      )}
    </div>
  );
}
