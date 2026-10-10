import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { getI18n } from "@/i18n/server";

export async function About() {
  const { locale, dict, content } = await getI18n();
  const { profile } = content;
  const school = content.education.find((entry) => entry.kind === "degree");

  const spec = [
    {
      label: dict.about.education,
      value: dict.about.educationValue,
      detail: school ? `${school.shortName ?? school.institution} · ${school.status}` : undefined,
    },
    { label: dict.about.focus, value: dict.about.focusValue },
    {
      label: dict.about.languages,
      value: profile.languages.map((language) => language.name).join(" · "),
      detail: profile.languages
        .map((language) => `${language.name}${locale === "fr" ? " : " : ": "}${language.level.toLowerCase()}`)
        .join(" · "),
    },
    { label: dict.about.location, value: profile.location },
  ];

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader id="about" index={1} tag={dict.about.tag} title={dict.about.title} />
          <Reveal>
            <p className="font-display text-2xl leading-snug font-light text-fg sm:text-3xl">{profile.summary}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="brackets overflow-hidden panel">
            <div className="border-b border-line px-5 py-3">
              <span className="label-mono text-subtle">{dict.about.specSheet}</span>
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
