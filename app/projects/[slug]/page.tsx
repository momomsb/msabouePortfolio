import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { CaseStudyToc } from "@/components/projects/case-study-toc";
import { ProjectLinks } from "@/components/projects/project-links";
import { ButtonLink } from "@/components/ui/button";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { getCaseStudy, getCaseStudySlugs, getExperienceForProject, getProject } from "@/lib/content";
import { serializeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDateRange, pad } from "@/lib/utils";
import type { CaseStudyBlock } from "@/types";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const study = getCaseStudy(slug);
  if (!project || !study) return {};

  const title = `${project.title}: case study`;
  return {
    title,
    description: `${study.tagline} ${project.description}`,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { type: "article", url: `/projects/${slug}`, title, description: study.tagline },
    twitter: { card: "summary_large_image", title, description: study.tagline },
  };
}

interface StudySection {
  id: string;
  title: string;
  /** False when nothing is documented yet: hidden in production. */
  filled: boolean;
  content: ReactNode;
  dataFile: string;
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();

  const experience = getExperienceForProject(slug);

  const fromBlock = (block: CaseStudyBlock, extra?: ReactNode): StudySection => ({
    id: block.id,
    title: block.title,
    filled: block.body.length > 0,
    dataFile: "case-studies.ts",
    content: (
      <>
        <Prose block={block} />
        {extra}
      </>
    ),
  });

  const sections: StudySection[] = [
    fromBlock(study.problem),
    fromBlock(study.context),
    fromBlock(study.solution),
    fromBlock(
      study.architecture,
      <div className="mt-8">
        <ArchitectureDiagram layers={study.architecture.layers} />
      </div>,
    ),
    fromBlock(study.dataPipeline),
    fromBlock(study.aiAgent),
    fromBlock(
      study.technicalAnalysis,
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {study.technicalAnalysis.indicators.map((indicator) => (
          <li key={indicator.name} className="panel p-5">
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-display text-2xl font-medium tracking-tight text-accent">{indicator.name}</span>
              <span className="text-right font-mono text-[0.6875rem] text-subtle">{indicator.fullName}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{indicator.description}</p>
          </li>
        ))}
      </ul>,
    ),
    {
      id: "technologies",
      title: "Technologies",
      filled: study.stack.length > 0,
      dataFile: "case-studies.ts",
      content: (
        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {study.stack.map((item) => (
            <div key={item.name} className="grid gap-1 bg-surface/80 px-5 py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="font-mono text-sm text-fg">{item.name}</dt>
              <dd className="text-sm text-muted sm:col-span-2">{item.role}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    fromBlock(study.results),
    fromBlock(study.lessons),
  ];

  const visible = sections.filter((section) => section.filled);
  const missing = sections.filter((section) => !section.filled);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title}: case study`,
    description: project.description,
    url: `${siteConfig.url}/projects/${slug}`,
    ...(project.year && { dateCreated: String(project.year) }),
    keywords: project.technologies.join(", "),
    author: { "@type": "Person", name: profile.name, url: siteConfig.url },
  };

  return (
    <article className="relative isolate">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-line pt-(--nav-height)">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid mask-fade-edges" />
          <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-accent/[0.07] blur-[140px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <ButtonLink href="/#projects" variant="ghost" className="mb-10 -ml-4">
            <ArrowLeft className="size-4" aria-hidden /> All projects
          </ButtonLink>
          <p className="label-mono text-accent">Case study{project.year && ` · ${project.year}`}</p>
          <h1 className="mt-5 text-5xl font-medium tracking-tight text-fg sm:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{study.tagline}</p>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {experience && (
              <div>
                <dt className="label-mono text-subtle">Context</dt>
                <dd className="mt-2 text-sm text-fg">
                  {experience.type} · {experience.company}
                  {experience.team && <span className="block text-muted">{experience.team}</span>}
                </dd>
              </div>
            )}
            {experience && (
              <div>
                <dt className="label-mono text-subtle">Timeline</dt>
                <dd className="mt-2 text-sm text-fg">{formatDateRange(experience.start, experience.end, { withDay: true })}</dd>
              </div>
            )}
            <div>
              <dt className="label-mono text-subtle">Domains</dt>
              <dd className="mt-2 text-sm text-fg">{project.categories.join(" · ")}</dd>
            </div>
            <div>
              <dt className="label-mono text-subtle">Core stack</dt>
              <dd className="mt-2 text-sm text-fg">{project.technologies.slice(0, 4).join(" · ")}</dd>
            </div>
          </dl>
          {(project.github || project.demo) && (
            <div className="mt-8">
              <ProjectLinks project={{ ...project, hasCaseStudy: false }} />
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:px-8">
        <aside className="hidden lg:col-span-3 lg:block">
          <CaseStudyToc items={visible.map(({ id, title }) => ({ id, title }))} />
        </aside>

        <div className="min-w-0 space-y-20 lg:col-span-9">
          {visible.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
              <Reveal>
                <p className="mb-3 label-mono text-accent">{pad(index + 1)}</p>
                <h2 id={`${section.id}-title`} className="mb-6 text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                  {section.title}
                </h2>
                {section.content}
              </Reveal>
            </section>
          ))}

          {missing.map((section) => (
            <ContentPlaceholder key={section.id} file={section.dataFile}>
              {`"${section.title}" is empty, so it's hidden in production. Document it to publish it.`}
            </ContentPlaceholder>
          ))}

          <Reveal className="brackets flex flex-col items-start justify-between gap-6 panel p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="text-2xl font-medium tracking-tight text-fg">Want to talk about this project?</p>
              <p className="mt-2 text-muted">Happy to walk through the architecture and the decisions behind it.</p>
            </div>
            <ButtonLink href="/#contact" size="lg">
              Get in touch <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Prose({ block }: { block: CaseStudyBlock }) {
  return (
    <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
      {block.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {block.bullets && (
        <ul className="space-y-3 pt-2">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-base text-fg/90">
              <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
