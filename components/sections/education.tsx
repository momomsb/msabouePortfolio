import { BookOpen, GraduationCap, MapPin, School, type LucideIcon } from "lucide-react";
import { ParallaxElement } from "@/components/transitions/parallax-element";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getI18n } from "@/i18n/server";
import { cn, formatDateRange } from "@/lib/utils";
import type { Education as EducationEntry, EducationKind } from "@/types";

const icons: Record<EducationKind, LucideIcon> = {
  degree: GraduationCap,
  preparatory: BookOpen,
  secondary: School,
  training: BookOpen,
};

export async function Education() {
  const { locale, dict, content } = await getI18n();
  const [current, ...previous] = content.education;

  return (
    <Section id="education">
      <SectionHeader id="education" index={7} tag={dict.education.tag} title={dict.education.title} />

      {current && (
        <Reveal>
          <EducationCard entry={current} locale={locale} dict={dict} featured />
        </Reveal>
      )}

      {previous.length > 0 && (
        <ol className="mt-4 grid gap-4 md:grid-cols-2">
          {previous.map((entry, index) => (
            <Reveal as="li" key={entry.id} delay={index * 0.06} className="h-full">
              <EducationCard entry={entry} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  );
}

interface EducationCardProps {
  entry: EducationEntry;
  locale: Locale;
  dict: Dictionary;
  featured?: boolean;
}

function EducationCard({ entry, locale, dict, featured = false }: EducationCardProps) {
  const Icon = icons[entry.kind];
  const label = dict.education.kinds[entry.kind];
  const ongoing = Boolean(entry.ongoing);

  return (
    <article className={cn("relative h-full overflow-hidden panel", featured && "brackets")}>
      {featured && entry.shortName && (
        <ParallaxElement distance={30} className="pointer-events-none absolute -right-4 -bottom-10">
          <span
            aria-hidden
            className="font-display text-[9rem] leading-none font-semibold tracking-tighter text-fg/[0.03] select-none sm:text-[13rem]"
          >
            {entry.shortName}
          </span>
        </ParallaxElement>
      )}
      <div className={cn("relative grid gap-6", featured ? "p-6 sm:p-10 md:grid-cols-[auto_1fr] md:gap-8" : "p-6 sm:p-8")}>
        <span
          className={cn(
            "grid place-items-center rounded-2xl border border-line-strong bg-raised text-accent",
            featured ? "size-14" : "size-11 rounded-xl",
          )}
        >
          <Icon className={featured ? "size-6" : "size-5"} aria-hidden />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono text-accent">{label}</span>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem]",
                ongoing ? "border-success/30 bg-success/10 text-success" : "border-line bg-raised/60 text-muted",
              )}
            >
              {ongoing && <span aria-hidden className="size-1.5 rounded-full bg-success" />}
              {entry.status}
            </span>
          </div>
          <h3 className={cn("mt-4 font-medium tracking-tight text-fg", featured ? "text-2xl sm:text-3xl" : "text-xl")}>{entry.program}</h3>
          <p className={cn("mt-2 text-muted", featured ? "text-base sm:text-lg" : "text-sm")}>
            {entry.institution}
            {entry.shortName && <span className="text-subtle"> · {entry.shortName}</span>}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-subtle">
            {entry.start && <span>{formatDateRange(entry.start, entry.end ?? null, locale)}</span>}
            {entry.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden />
                {entry.location}
              </span>
            )}
          </div>
          {entry.description && <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{entry.description}</p>}
          {entry.highlights && entry.highlights.length > 0 && (
            <ul className="mt-5 space-y-2">
              {entry.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
