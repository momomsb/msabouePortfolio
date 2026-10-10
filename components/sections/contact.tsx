import { ArrowUpRight, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { BridgeStar } from "@/components/transitions/section-bridge";
import { ParallaxElement } from "@/components/transitions/parallax-element";
import { TextReveal } from "@/components/transitions/text-reveal";
import { SocialIcon } from "@/components/ui/brand-icons";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section, revealForIndex } from "@/components/ui/section";
import { StatusDot } from "@/components/ui/tag";
import { socials } from "@/data/socials";
import { getI18n } from "@/i18n/server";
import { getAvailableSocials, socialLinkProps } from "@/lib/content";

export async function Contact() {
  const { dict, content } = await getI18n();
  const t = dict.contact;
  const { profile } = content;
  const channels = getAvailableSocials();
  const missing = socials.filter((social) => !social.href).map((social) => social.label);

  return (
    <Section id="contact" className="isolate overflow-hidden pt-6 sm:pt-8">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full">
        <div className="absolute inset-0 bg-grid mask-fade-edges" />
        <ParallaxElement distance={40} className="absolute top-1/3 left-1/2 -translate-x-1/2">
          <div className="size-[640px] rounded-full bg-accent/[0.06] blur-[140px]" />
        </ParallaxElement>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="mb-5 flex items-center gap-3 label-mono text-accent">
            <BridgeStar />
            <span>
              <span className="text-subtle">[08]</span> {t.tag}
            </span>
          </p>
          <h2 id="contact-title" className="text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl">
            <TextReveal variant={revealForIndex(8)} delay={0.08}>
              {t.title}
            </TextReveal>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{profile.lookingFor}</p>

          {profile.availability.available && (
            <p className="mt-8 inline-flex items-center gap-2.5 text-sm text-fg">
              <StatusDot /> {profile.availability.label}
            </p>
          )}

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {channels.map((channel) => (
              <li key={channel.platform}>
                <a
                  href={channel.href}
                  {...socialLinkProps(channel.platform)}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="flex items-center gap-4">
                    <SocialIcon platform={channel.platform} className="size-4.5 text-subtle transition-colors group-hover:text-accent" />
                    <span>
                      <span className="block label-mono text-subtle">{channel.label}</span>
                      <span className="mt-1 block text-fg transition-colors group-hover:text-accent">
                        {channel.handle ?? channel.href.replace(/^mailto:/, "")}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-4">
              <MapPin className="size-4.5 text-subtle" aria-hidden />
              <span>
                <span className="block label-mono text-subtle">{t.location}</span>
                <span className="mt-1 block text-fg">{profile.location}</span>
              </span>
            </li>
          </ul>

          {missing.length > 0 && (
            <ContentPlaceholder file="socials.ts" className="mt-4">
              {`Missing links: ${missing.join(", ")}.`}
            </ContentPlaceholder>
          )}
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
