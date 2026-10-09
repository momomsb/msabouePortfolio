import { BarChart3, Brain, Cloud, Database, Layers, LayoutTemplate, Server, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getI18n } from "@/i18n/server";
import type { EngineeringDomain } from "@/types";

const icons: Record<EngineeringDomain["icon"], LucideIcon> = {
  brain: Brain,
  database: Database,
  server: Server,
  layout: LayoutTemplate,
  layers: Layers,
  cloud: Cloud,
  chart: BarChart3,
  workflow: Workflow,
};

export async function EngineeringProfile() {
  const { dict, content } = await getI18n();
  return (
    <Section id="skills">
      <SectionHeader id="skills" index={4} tag={dict.skills.tag} title={dict.skills.title} description={dict.skills.description} />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.engineeringDomains.map((domain, index) => {
          const Icon = icons[domain.icon];
          return (
            <Reveal as="li" key={domain.id} delay={(index % 4) * 0.06} className="h-full">
              <SpotlightCard className="group flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-6 transition-colors duration-300 hover:border-line-strong">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-raised text-accent transition-colors group-hover:border-accent/40">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[0.6875rem] text-subtle">M-{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-fg">{domain.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{domain.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 font-mono text-[0.8125rem] leading-relaxed text-fg/85">
                  {domain.technologies.map((tech, i) => (
                    <li key={tech} className="flex items-center gap-3">
                      {i > 0 && (
                        <span aria-hidden className="text-accent/60">
                          ·
                        </span>
                      )}
                      {tech}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
