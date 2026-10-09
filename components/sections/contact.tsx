import { ArrowUpRight, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialIcon } from "@/components/ui/brand-icons";
import { ContentPlaceholder } from "@/components/ui/content-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { StatusDot } from "@/components/ui/tag";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { getAvailableSocials, socialLinkProps } from "@/lib/content";

export function Contact() {
  const channels = getAvailableSocials();
  const missing = socials.filter((social) => !social.href).map((social) => social.label);

  return (
    <Section id="contact" className="isolate overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full">
        <div className="absolute inset-0 bg-grid mask-fade-edges" />
        <div className="absolute top-1/3 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[140px]" />
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="mb-5 flex items-center gap-3 label-mono text-accent">
            <span aria-hidden className="inline-block size-1.5 rounded-[1px] bg-accent" />
            <span>
              <span className="text-subtle">[09]</span> Contact · Open channel
            </span>
          </p>
          <h2 id="contact-title" className="text-4xl font-medium tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Let&apos;s build something meaningful.
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
                <span className="block label-mono text-subtle">Location</span>
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
