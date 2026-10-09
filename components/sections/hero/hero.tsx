import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDownRight, Download } from "lucide-react";
import { DataNetwork } from "@/components/sections/hero/data-network";
import { ButtonLink } from "@/components/ui/button";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { StatusDot } from "@/components/ui/tag";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

/** Text animations are pure CSS so the hero paints instantly, before hydration. */
export function Hero() {
  const school = education[0];
  const latest = experiences[0];

  const readout = [
    { label: "Focus", value: "AI · Data · Software" },
    { label: "Based in", value: profile.location },
    school && { label: "Currently", value: `Engineering student, ${school.shortName ?? school.institution}` },
    latest && { label: "Latest", value: `${latest.type} · ${latest.company}` },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Backdrop: blueprint grid, data network, soft glows */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-edges" />
        <div className="absolute top-[-20%] right-[-10%] size-[720px] rounded-full bg-accent/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[-15%] size-[560px] rounded-full bg-violet/[0.05] blur-[140px]" />
        <DataNetwork className="absolute inset-0 size-full animate-fade-in [mask-image:linear-gradient(to_right,transparent,black_35%,black_80%,transparent)] max-md:opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 pt-(--nav-height) sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="py-16 sm:py-24 lg:col-span-8">
          <div className="mb-8 flex animate-fade-in items-center gap-4" style={delay(0.1)}>
            {profile.photo && (
              <Image
                src={profile.photo}
                alt=""
                width={56}
                height={56}
                className="size-14 rounded-full border border-line-strong object-cover object-top lg:hidden"
              />
            )}
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

          <div className="mt-10 flex animate-fade-in flex-wrap items-center gap-3" style={delay(0.6)}>
            <ButtonLink href="/#projects" size="lg">
              Explore my work
              <ArrowDownRight
                className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5"
                aria-hidden
              />
            </ButtonLink>
            {profile.cvPath && (
              <ButtonLink href={profile.cvPath} variant="secondary" size="lg" download>
                <Download className="size-4" aria-hidden />
                Download CV
              </ButtonLink>
            )}
          </div>
          {!profile.cvPath && (
            <ContentPlaceholder file="profile.ts" className="mt-4 max-w-md">
              Add your CV under /public/cv and set `cvPath` to show &quot;Download CV&quot;.
            </ContentPlaceholder>
          )}
        </div>

        {profile.photo && <Portrait src={profile.photo} />}
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
    </section>
  );
}

/** Portrait in a "lab viewfinder" frame (desktop only; mobile shows an avatar). */
function Portrait({ src }: { src: string }) {
  return (
    <figure className="relative hidden animate-fade-in lg:col-span-4 lg:block" style={delay(0.35)}>
      <div className="brackets relative overflow-hidden rounded-3xl border border-line-strong bg-raised">
        <Image
          src={src}
          alt={`Portrait of ${profile.name}`}
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
            <span className="block label-mono text-accent">Subject</span>
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
