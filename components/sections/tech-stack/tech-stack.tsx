import { TechExplorer, type TechGroup } from "@/components/sections/tech-stack/tech-explorer";
import { SectionTransition } from "@/components/transitions/section-transition";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { getI18n } from "@/i18n/server";
import { getBrandLogo } from "@/lib/tech-logos";

export async function TechStack() {
  const { dict, content } = await getI18n();

  // Logos and domains are resolved on the server and shipped as plain props.
  const groups: TechGroup[] = content.techStack.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description ?? "",
    items: group.skills.map((skill) => ({
      name: skill.name,
      logo: getBrandLogo(skill.logo),
      icon: skill.icon ?? "code",
      domains: content.engineeringDomains.filter((domain) => domain.technologies.includes(skill.name)).map((domain) => domain.title),
    })),
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
      {/* Skills → Certifications: what I build hands over to what I learn. */}
      <SectionTransition>
        <Reveal>
          <TechExplorer groups={groups} />
        </Reveal>
      </SectionTransition>
    </Section>
  );
}
