import { ArrowUpRight } from "lucide-react";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { ProjectGrid } from "@/components/projects/project-grid";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
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
        <Reveal className="mb-6">
          <h3 className="text-2xl font-medium tracking-tight text-fg">{t.allProjects}</h3>
        </Reveal>
        <ProjectGrid projects={content.projects} filters={projectFilters} />
      </div>

      {github?.href && (
        <Reveal className="mt-12">
          <div className="brackets flex flex-col items-start justify-between gap-6 panel p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="flex items-center gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-raised text-fg">
                <GitHubIcon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-medium tracking-tight text-fg">{t.moreTitle}</p>
                <p className="mt-1 text-muted">{t.moreText}</p>
              </div>
            </div>
            <ButtonLink href={github.href} external size="lg" aria-label={`${t.moreButton} (${dict.common.opensInNewTab})`}>
              {t.moreButton}
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
