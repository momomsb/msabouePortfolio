import { ArrowUpRight } from "lucide-react";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { projectFilters } from "@/data/projects";
import { getI18n } from "@/i18n/server";
import { getFeaturedProject, getSocial } from "@/lib/content";

export async function Projects() {
  const { dict, content } = await getI18n();
  const t = dict.projects;
  const featured = getFeaturedProject(content);
  const github = getSocial("github");

  return (
    <Section id="projects">
      <SectionHeader id="projects" index={3} tag={t.tag} title={t.title} description={t.description} />

      {featured && <FeaturedProjectCard project={featured} />}

      <div className="mt-20">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-2xl font-medium tracking-tight text-fg">{t.allProjects}</h3>
          {github?.href && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              {t.moreOnGitHub} <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </Reveal>
        <ProjectGrid projects={content.projects} filters={projectFilters} />
      </div>
    </Section>
  );
}
