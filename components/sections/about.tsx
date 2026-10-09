import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { pad } from "@/lib/utils";

export function About() {
  const school = education.find((entry) => entry.kind === "degree");

  const spec = [
    {
      label: "Education",
      value: "Engineering Degree",
      detail: school ? `${school.shortName ?? school.institution} · ${school.status}` : undefined,
    },
    { label: "Focus", value: "AI / Data / Software" },
    {
      label: "Languages",
      value: profile.languages.map((language) => language.name).join(" · "),
      detail: profile.languages.map((language) => `${language.name}: ${language.level.toLowerCase()}`).join(" · "),
    },
    { label: "Location", value: profile.location },
  ];

  return (
    <Section id="about">
      <SectionHeader
        id="about"
        index={1}
        tag="About · Subject profile"
        title="Engineer in the making, building at the edge of data and AI."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-2xl leading-snug font-light text-fg sm:text-3xl">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <h3 className="mb-5 label-mono text-subtle">Areas of interest</h3>
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {profile.interests.map((interest, index) => (
                <li key={interest} className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-raised">
                  <span className="font-mono text-xs text-subtle transition-colors group-hover:text-accent">{pad(index + 1)}</span>
                  <span className="text-[0.9375rem] text-fg">{interest}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="brackets overflow-hidden panel">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="label-mono text-subtle">Spec sheet</span>
              <span className="font-mono text-[0.6875rem] text-subtle">profile.ts</span>
            </div>
            <dl>
              {spec.map((row) => (
                <div key={row.label} className="border-b border-line px-5 py-5 last:border-b-0">
                  <dt className="label-mono text-accent">{row.label}</dt>
                  <dd className="mt-2 font-display text-xl font-medium tracking-tight text-fg">{row.value}</dd>
                  {row.detail && <dd className="mt-1 text-sm text-muted">{row.detail}</dd>}
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
