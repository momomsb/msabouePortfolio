import { ExperienceCard } from "@/components/experience/experience-card";
import { TimelineHandoff } from "@/components/experience/timeline-handoff";
import { ScrollLine } from "@/components/transitions/scroll-line";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { getI18n } from "@/i18n/server";
import { getFeaturedProject } from "@/lib/content";

export async function Experience() {
  const { locale, dict, content } = await getI18n();
  const featured = getFeaturedProject(content);
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
        {/* Timeline rail: a faint track, and an accent line that draws itself with the scroll */}
        <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong/60 md:left-[calc(25%+7px)]" />
        <ScrollLine className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent/70 via-accent/50 to-accent md:left-[calc(25%+7px)]" />
        <ol>
          {content.experiences.map((experience) => (
            <Reveal as="li" key={experience.id}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </ol>
        {featured && <TimelineHandoff label={dict.experience.ledTo} project={featured.title} href={`/${locale}#featured-project`} />}
      </div>
    </Section>
  );
}
