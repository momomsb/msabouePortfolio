import { TechExplorer, type TechUsage } from "@/components/sections/tech-stack/tech-explorer";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { engineeringDomains, techStack } from "@/data/skills";
import { getTechnologyUsage } from "@/lib/content";

/** Derives a two-letter symbol: "Hugging Face" → "Hf", "LangChain" → "Lc", "Python" → "Py". */
function deriveSymbol(name: string) {
  const words = name.split(/\s+/);
  if (words.length > 1) return words[0][0].toUpperCase() + words[1][0].toLowerCase();
  const capitals = name.match(/[A-Z]/g);
  if (capitals && capitals.length >= 2) return capitals[0] + capitals[1].toLowerCase();
  return name.length === 1 ? name : name[0].toUpperCase() + name[1].toLowerCase();
}

export function TechStack() {
  // Usage is computed on the server from data/ and shipped as plain props.
  const offsets = techStack.map((_, i) => techStack.slice(0, i).reduce((total, group) => total + group.skills.length, 0));
  const groups = techStack.map((group, groupIndex) => ({
    id: group.id,
    title: group.title,
    description: group.description ?? "",
    items: group.skills.map((skill, skillIndex) => {
      const usage = getTechnologyUsage(skill.name);
      const item: TechUsage = {
        name: skill.name,
        symbol: skill.symbol ?? deriveSymbol(skill.name),
        number: offsets[groupIndex] + skillIndex + 1,
        domains: engineeringDomains.filter((domain) => domain.technologies.includes(skill.name)).map((domain) => domain.title),
        projects: usage.projects.map((project) => ({
          title: project.title,
          slug: project.slug,
          hasCaseStudy: Boolean(project.hasCaseStudy),
        })),
        experiences: usage.experiences.map((experience) => `${experience.type} · ${experience.company}`),
      };
      return item;
    }),
  }));

  return (
    <Section id="tech-stack" className="pt-0 sm:pt-0">
      <SectionHeader
        id="tech-stack"
        index={5}
        tag="Tech stack · Element table"
        title="The toolkit, element by element."
        description="Select an element to see where it is actually used across this portfolio."
      />
      <Reveal>
        <TechExplorer groups={groups} />
      </Reveal>
    </Section>
  );
}
