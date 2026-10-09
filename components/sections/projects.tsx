import { ArrowUpRight } from "lucide-react";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { projectFilters, projects } from "@/data/projects";
import { getFeaturedProject, getSocial } from "@/lib/content";

export function Projects() {
  const featured = getFeaturedProject();
  const github = getSocial("github");

  return (
    <Section id="projects">
      <SectionHeader
        id="projects"
        index={3}
        tag="Projects · Lab bench"
        title="Systems I've built."
        description="Selected work across AI, data and backend engineering."
      />

      {featured && <FeaturedProjectCard project={featured} />}

      <div className="mt-20">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-2xl font-medium tracking-tight text-fg">All projects</h3>
          {github?.href && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              More on GitHub <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </Reveal>
        <ProjectGrid projects={projects} filters={projectFilters} />
        {projects.length < 3 && (
          <ContentPlaceholder file="projects.ts" className="mt-6">
            Add more projects (title, slug, description, categories, technologies, year…). Never invent links.
          </ContentPlaceholder>
        )}
      </div>
    </Section>
  );
}
