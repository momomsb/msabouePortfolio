import { TechExplorer, type TechGroup } from "@/components/sections/tech-stack/tech-explorer";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { getI18n } from "@/i18n/server";
import { getTechnologyUsage } from "@/lib/content";
import { getBrandLogo } from "@/lib/tech-logos";

export async function TechStack() {
  const { dict, content } = await getI18n();

  // Logos and usage are resolved on the server and shipped as plain props.
  const groups: TechGroup[] = content.techStack.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description ?? "",
    items: group.skills.map((skill) => {
      const usage = getTechnologyUsage(content, skill.name);
      return {
        name: skill.name,
        logo: getBrandLogo(skill.logo),
        icon: skill.icon ?? "code",
        domains: content.engineeringDomains.filter((domain) => domain.technologies.includes(skill.name)).map((domain) => domain.title),
        projects: usage.projects.map((project) => ({
          title: project.title,
          slug: project.slug,
          hasCaseStudy: Boolean(project.hasCaseStudy),
        })),
        experiences: usage.experiences.map((experience) => `${dict.experience.types[experience.type]} · ${experience.company}`),
      };
    }),
  }));

  return (
    <Section id="tech-stack" className="pt-0 sm:pt-0">
      <SectionHeader
        id="tech-stack"
        index={5}
        tag={dict.techStack.tag}
        title={dict.techStack.title}
        description={dict.techStack.description}
      />
      <Reveal>
        <TechExplorer groups={groups} />
      </Reveal>
    </Section>
  );
}
