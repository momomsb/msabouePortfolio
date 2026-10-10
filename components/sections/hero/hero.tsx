import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDownRight } from "lucide-react";
import { CvMenu } from "@/components/sections/hero/cv-menu";
import { HeroBackdrop, HeroForeground } from "@/components/sections/hero/hero-scene";
import { MagneticButton } from "@/components/transitions/magnetic-button";
import { ParallaxElement } from "@/components/transitions/parallax-element";
import { ButtonLink } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/tag";
import type { Dictionary } from "@/i18n/dictionaries";
import { getI18n } from "@/i18n/server";
import type { Content } from "@/lib/content";

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

/** Text animations are pure CSS so the hero paints instantly, before hydration. */
export async function Hero() {
  const { locale, dict, content } = await getI18n();
  const { profile } = content;
  const school = content.education[0];
  const latest = content.experiences[0];

  const readout = [
    { label: dict.hero.focus, value: dict.hero.focusValue },
    { label: dict.hero.basedIn, value: profile.location },
    school && { label: dict.hero.currently, value: `${dict.hero.engineeringStudent}, ${school.shortName ?? school.institution}` },
    latest && { label: dict.hero.latest, value: `${dict.experience.types[latest.type]} · ${latest.company}` },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroBackdrop />

      <HeroForeground className="flex flex-1 flex-col">
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 pt-(--nav-height) sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="py-10 sm:py-24 lg:col-span-8">
            {/* Mobile & tablet portrait (desktop shows the large one on the right) */}
            {profile.photo && (
              <div className="relative mb-8 w-44 animate-fade-in sm:w-52 lg:hidden" style={delay(0.05)}>
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-full bg-accent/15 blur-3xl" />
                <div className="brackets relative overflow-hidden rounded-3xl border border-line-strong bg-raised">
                  <Image
                    src={profile.photo}
                    alt={`${dict.hero.portraitAlt} ${profile.name}`}
                    width={648}
                    height={874}
                    sizes="(min-width: 640px) 208px, 176px"
                    preload
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
                </div>
              </div>
            )}
            <div className="mb-8 flex animate-fade-in items-center gap-4" style={delay(0.1)}>
              {profile.availability.available && (
                <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-raised/60 py-1.5 pr-4 pl-3 text-xs text-muted backdrop-blur">
                  <StatusDot />
                  {profile.availability.label}
                </p>
              )}
            </div>

            <h1 id="home-title" className="text-display font-medium tracking-tight text-fg uppercase lg:text-[min(10.5vw,8.5rem)]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="block animate-reveal-up" style={delay(0.15)}>
                  {profile.firstName}
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="block animate-reveal-up text-muted/80" style={delay(0.28)}>
                  {profile.lastName}
                </span>
              </span>
            </h1>

            <p
              className="mt-8 flex animate-fade-in items-center gap-3 font-mono text-sm tracking-[0.2em] text-accent uppercase sm:text-base"
              style={delay(0.4)}
            >
              <span aria-hidden className="text-subtle">
                &gt;
              </span>
              {profile.role}
              <span aria-hidden className="inline-block h-[1.1em] w-[0.55em] animate-blink bg-accent" />
            </p>

            <p className="mt-6 max-w-xl animate-fade-in text-lg leading-relaxed text-muted sm:text-xl" style={delay(0.5)}>
              {profile.tagline}
            </p>

            <div className="relative z-20 mt-10 flex animate-fade-in flex-wrap items-center gap-3" style={delay(0.6)}>
              <MagneticButton>
                <ButtonLink href={`/${locale}#projects`} size="lg">
                  {dict.hero.explore}
                  <ArrowDownRight
                    className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5"
                    aria-hidden
                  />
                </ButtonLink>
              </MagneticButton>
              <CvMenu files={profile.cv} />
            </div>
          </div>

          {profile.photo && (
            <ParallaxElement distance={28} className="hidden lg:col-span-4 lg:block">
              <Portrait src={profile.photo} profile={profile} dict={dict} />
            </ParallaxElement>
          )}
        </div>

        <div className="mx-auto w-full max-w-7xl animate-fade-in px-4 pb-8 sm:px-6 lg:px-8" style={delay(0.7)}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:grid-cols-4">
            {readout.map((item) => (
              <div key={item.label}>
                <dt className="label-mono text-subtle">{item.label}</dt>
                <dd className="mt-1.5 text-sm text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </HeroForeground>
    </section>
  );
}

/** Portrait in a "lab viewfinder" frame (desktop only; mobile shows an avatar). */
function Portrait({ src, profile, dict }: { src: string; profile: Content["profile"]; dict: Dictionary }) {
  return (
    <figure className="relative animate-fade-in" style={delay(0.35)}>
      <div className="brackets relative overflow-hidden rounded-3xl border border-line-strong bg-raised">
        <Image
          src={src}
          alt={`${dict.hero.portraitAlt} ${profile.name}`}
          width={648}
          height={874}
          sizes="(min-width: 1280px) 400px, 32vw"
          className="aspect-[4/5] w-full object-cover object-top"
        />
        {/* Instrument overlay: hairline grid + tint fading into the page */}
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <span>
            <span className="block label-mono text-accent">{dict.hero.subject}</span>
            <span className="mt-1 block font-display text-lg font-medium text-fg">{profile.name}</span>
          </span>
          <span className="text-right font-mono text-[0.6875rem] leading-relaxed text-muted">
            {profile.headline}
            <br />
            {profile.location}
          </span>
        </figcaption>
      </div>
      <span
        aria-hidden
        className="absolute -top-3 right-6 rounded-full border border-accent/30 bg-ink px-2.5 py-1 font-mono text-[0.625rem] tracking-widest text-accent"
      >
        ID · AI/DATA
      </span>
    </figure>
  );
}
