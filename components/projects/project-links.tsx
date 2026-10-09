import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { getProjectRepositories } from "@/lib/content";
import type { Project } from "@/types";

/** Case study / GitHub / demo actions. Links that don't exist are never rendered. */
export function ProjectLinks({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.hasCaseStudy && (
        <ButtonLink href={`/projects/${project.slug}`} size={size}>
          Read the case study
          <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
        </ButtonLink>
      )}
      {getProjectRepositories(project).map((repo) => (
        <ButtonLink
          key={repo.url}
          href={repo.url}
          external
          variant="secondary"
          size={size}
          aria-label={`${project.title}: ${repo.label} on GitHub (opens in a new tab)`}
        >
          <GitHubIcon className="size-4" />
          {repo.label}
        </ButtonLink>
      ))}
      {project.demo && (
        <ButtonLink href={project.demo} external variant="secondary" size={size} aria-label={`${project.title} live demo`}>
          Live demo
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
      )}
    </div>
  );
}
