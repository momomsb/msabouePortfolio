import { ExperienceCard } from "@/components/experience/experience-card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { getI18n } from "@/i18n/server";

export async function Experience() {
  const { dict, content } = await getI18n();
  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        index={2}
        tag={dict.experience.tag}
        title={dict.experience.title}
        description={dict.experience.description}
      />

      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute top-2 bottom-0 left-[7px] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent md:left-[calc(25%+7px)]"
        />
        <ol>
          {content.experiences.map((experience) => (
            <Reveal as="li" key={experience.id}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
