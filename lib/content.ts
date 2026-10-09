import { caseStudies } from "@/data/case-studies";
import { certifications } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import type { Project, SocialLink } from "@/types";

/** Read-side helpers over `data/`. Components never filter raw data themselves. */

export function getFeaturedProject() {
  return projects.find((project) => project.featured) ?? null;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

/** Every public repository of a project: the `repositories` list, or the single `github` link. */
export function getProjectRepositories(project: Project) {
  if (project.repositories?.length) return project.repositories;
  return project.github ? [{ label: "Code", url: project.github }] : [];
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}

export function getCaseStudySlugs() {
  return caseStudies.filter((study) => getProject(study.slug)).map((study) => study.slug);
}

export function getSpotlightCertification() {
  return certifications.find((cert) => cert.featured) ?? null;
}

export function getExperienceForProject(slug: string) {
  return experiences.find((experience) => experience.projectSlug === slug) ?? null;
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
export function getTechnologyUsage(technology: string) {
  const key = normalize(technology);
  const matches = (list: string[]) => list.some((item) => normalize(item) === key);
  return {
    projects: projects.filter((project) => matches(project.technologies)),
    experiences: experiences.filter((experience) => matches(experience.technologies)),
  };
}
