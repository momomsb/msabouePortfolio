import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { engineeringDomains, techStack } from "@/data/skills";
import { socials } from "@/data/socials";
import { localize, type Locale } from "@/i18n/config";
import type { SocialLink } from "@/types";

/**
 * Read-side access to `data/`, resolved for one locale.
 * Components never read raw (bilingual) data themselves.
 */
function build(locale: Locale) {
  return {
    locale,
    profile: localize(profile, locale),
    navigation: localize(navigation, locale),
    experiences: localize(experiences, locale),
    projects: localize(projects, locale),
    certifications: localize(certifications, locale),
    education: localize(education, locale),
    engineeringDomains: localize(engineeringDomains, locale),
    techStack: localize(techStack, locale),
  };
}

export type Content = ReturnType<typeof build>;

const cache = new Map<Locale, Content>();

export function getContent(locale: Locale): Content {
  let content = cache.get(locale);
  if (!content) {
    content = build(locale);
    cache.set(locale, content);
  }
  return content;
}

export function getFeaturedProject(content: Content) {
  return content.projects.find((project) => project.featured) ?? null;
}

export function getSpotlightCertification(content: Content) {
  return content.certifications.find((cert) => cert.featured) ?? null;
}

export type AvailableSocialLink = SocialLink & { href: string };

export function getAvailableSocials(): AvailableSocialLink[] {
  return socials.filter((social): social is AvailableSocialLink => Boolean(social.href));
}

/** Web profiles open in a new tab; mailto: and tel: links don't. */
export function socialLinkProps(platform: SocialLink["platform"]) {
  return platform === "email" || platform === "phone" ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

export function getSocial(platform: SocialLink["platform"]) {
  return socials.find((social) => social.platform === platform) ?? null;
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9+#]/g, "");

/** Where a technology is actually used, derived from projects and experience. */
export function getTechnologyUsage(content: Content, technology: string) {
  const key = normalize(technology);
  const matches = (list: string[]) => list.some((item) => normalize(item) === key);
  return {
    projects: content.projects.filter((project) => matches(project.technologies)),
    experiences: content.experiences.filter((experience) => matches(experience.technologies)),
  };
}
