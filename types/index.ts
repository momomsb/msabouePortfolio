import type { Resolved, Text } from "@/i18n/config";

/**
 * Content model for the portfolio. Every section renders from `data/`.
 *
 * - `*Data` types describe the files in `data/`: any `Text` field is either a
 *   plain string (same in both languages) or `{ en, fr }`.
 * - The un-suffixed types (`Project`, `Experience`…) are the same shapes
 *   resolved for one locale: what components receive.
 *
 * Optional / `null` fields mean "not provided yet". The UI hides them in
 * production and shows a visible placeholder in development.
 */

/** ISO-like partial date: "2026", "2026-07" or "2026-07-13". */
export type PartialDate = string;

/** Filter keys. Display labels live in the dictionaries. */
export type ProjectCategory = "AI" | "Data" | "Backend" | "Frontend" | "Big Data";

export interface ProjectData {
  title: Text;
  slug: string;
  /** Short presentation shown on the card. */
  description: Text;
  /** A project can belong to several filters (e.g. AI + Data). */
  categories: ProjectCategory[];
  technologies: string[];
  /** Cover screenshot under /public. `null` renders a generated visual. */
  image: string | null;
  /** All screenshots, opened in a fullscreen viewer from the card. */
  gallery?: Array<{ src: string; alt: Text; width: number; height: number }>;
  /** Shown as the large card above the grid. */
  featured: boolean;
  /** Short context line, e.g. "Internship · Attijariwafa Bank". */
  context?: Text;
}

/** Filter keys. Display labels live in the dictionaries. */
export type CertificationCategory = "AI / ML" | "Data" | "Cloud" | "Programming" | "Other";

export interface CertificationData {
  title: Text;
  issuer: string;
  /** Date of issue, e.g. "2026-03". Omit when unknown. */
  date?: PartialDate;
  category: CertificationCategory;
  skills: Text[];
  credentialId?: string;
  /** Public verification page: shows "Verify credential". */
  credentialUrl?: string;
  /** Badge or issuer logo under /public. */
  image?: string;
  /** Certificate under /public (PDF or image): shows "View certificate" and a preview when it's an image. */
  certificateFile?: string;
  /** The first featured certification is shown in the spotlight. */
  featured?: boolean;
}

export interface Language {
  name: Text;
  level: Text;
}

/** Generic icons for tools without a brand logo. */
export type GenericIcon =
  | "brain"
  | "sparkles"
  | "search"
  | "network"
  | "message"
  | "workflow"
  | "code"
  | "chart"
  | "lineChart"
  | "cube"
  | "report"
  | "sheet"
  | "database"
  | "cloud";

export interface Skill {
  name: string;
  /** Simple Icons slug of the brand logo (https://simpleicons.org), e.g. "python". */
  logo?: string;
  /** Generic icon when no brand logo exists. */
  icon?: GenericIcon;
}

export interface SkillGroupData {
  id: string;
  title: Text;
  /** Short line describing what this group covers. */
  description?: Text;
  skills: Skill[];
}

export interface EngineeringDomainData {
  id: string;
  title: Text;
  summary: Text;
  icon: "brain" | "database" | "server" | "layout" | "layers" | "cloud" | "chart" | "workflow";
  technologies: string[];
}

export type ExperienceType = "internship" | "full-time" | "part-time" | "freelance";

export interface ExperienceData {
  id: string;
  company: Text;
  team?: Text;
  role: Text;
  type: ExperienceType;
  title: Text;
  start: PartialDate;
  /** `null` = ongoing. Same value as `start` for a single month. */
  end: PartialDate | null;
  location?: Text;
  context: Text;
  problem: Text;
  technologies: string[];
  responsibilities: Text[];
  /** Measured outcomes. Leave empty until real results are documented. */
  results: Text[];
}

export type EducationKind = "degree" | "preparatory" | "secondary" | "training";

export interface EducationData {
  id: string;
  kind: EducationKind;
  institution: string;
  shortName?: string;
  program: Text;
  status: Text;
  /** Highlights the entry as ongoing. */
  ongoing?: boolean;
  start?: PartialDate;
  end?: PartialDate | null;
  location?: Text;
  description?: Text;
  highlights?: Text[];
}

export type SocialPlatform = "github" | "linkedin" | "email" | "phone";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Full URL (`mailto:` for email, `tel:` for phone). `null` = not provided yet, hidden in production. */
  href: string | null;
  /** Human-readable handle shown in the UI. */
  handle?: string;
}

export interface NavItemData {
  label: Text;
  /** Section id: the link points to /{locale}#id. */
  sectionId: string;
}

/* ── Resolved (single-locale) shapes used by components ─────────── */
export type Project = Resolved<ProjectData>;
export type Certification = Resolved<CertificationData>;
export type SkillGroup = Resolved<SkillGroupData>;
export type EngineeringDomain = Resolved<EngineeringDomainData>;
export type Experience = Resolved<ExperienceData>;
export type Education = Resolved<EducationData>;
export type NavItem = Resolved<NavItemData>;
