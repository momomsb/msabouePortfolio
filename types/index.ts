/**
 * Content model for the portfolio. Every section renders from `data/`,
 * so these interfaces are the contract between content and UI.
 *
 * Convention: optional / `null` fields mean "not provided yet". The UI hides
 * them in production and shows a visible placeholder in development.
 */

/** ISO-like partial date: "2026", "2026-07" or "2026-07-13". */
export type PartialDate = string;

export type ProjectCategory = "AI" | "Data" | "Backend" | "Frontend" | "Big Data";

export interface Project {
  title: string;
  slug: string;
  /** One or two sentences shown on cards. */
  description: string;
  /** A project can belong to several filters (e.g. AI + Data). */
  categories: ProjectCategory[];
  technologies: string[];
  /** Path under /public or remote URL. `null` renders a generated visual. */
  image: string | null;
  github: string | null;
  demo: string | null;
  featured: boolean;
  /** Omit when the date isn't documented: the UI simply hides it. */
  year?: number;
  /** Short context line, e.g. "Internship · Attijariwafa Bank". */
  context?: string;
  /** Key features or concepts, shown as tags. */
  highlights?: string[];
  /** Heading above the highlights (default "Highlights"). */
  highlightsTitle?: string;
  /** Extra public repositories for multi-repo projects (e.g. frontend + backend). */
  repositories?: Array<{ label: string; url: string }>;
  /** Ordered pipeline stages, rendered as a flow on the featured card. */
  pipeline?: string[];
  /** When true, the card links to /projects/[slug]. */
  hasCaseStudy?: boolean;
}

export type CertificationCategory = "AI / ML" | "Data" | "Cloud" | "Programming" | "Other";

export interface Certification {
  title: string;
  issuer: string;
  /** Date of issue, e.g. "2026-03". */
  date: PartialDate;
  category: CertificationCategory;
  skills: string[];
  credentialId?: string;
  /** Public verification page. */
  credentialUrl?: string;
  /** Issuer logo / badge under /public. */
  image?: string;
  /** Certificate file under /public (PDF or image), opened in a new tab. */
  certificateFile?: string;
  /** The first featured certification is shown in the spotlight. */
  featured?: boolean;
}

export interface Language {
  name: string;
  level: string;
}

export interface Skill {
  name: string;
  /** Two-letter "element" symbol in the tech stack table. Derived from the name when omitted. */
  symbol?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Short line describing what this group covers. */
  description?: string;
  skills: Skill[];
}

export interface EngineeringDomain {
  id: string;
  title: string;
  summary: string;
  icon: "brain" | "database" | "server" | "layout" | "layers" | "cloud" | "chart" | "workflow";
  technologies: string[];
}

export interface Experience {
  id: string;
  company: string;
  team?: string;
  role: string;
  type: "Internship" | "Full-time" | "Part-time" | "Freelance";
  title: string;
  start: PartialDate;
  /** `null` = ongoing. */
  end: PartialDate | null;
  location?: string;
  context: string;
  problem: string;
  technologies: string[];
  responsibilities: string[];
  /** Measured outcomes. Leave empty until real results are documented. */
  results: string[];
  /** Related project slug, links to its case study. */
  projectSlug?: string;
}

export type EducationKind = "degree" | "preparatory" | "secondary" | "training";

export interface Education {
  id: string;
  kind: EducationKind;
  institution: string;
  shortName?: string;
  program: string;
  status: string;
  start?: PartialDate;
  end?: PartialDate | null;
  location?: string;
  description?: string;
  highlights?: string[];
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

export interface NavItem {
  label: string;
  href: string;
  /** Section id observed for the active state. */
  sectionId: string;
}

export interface CaseStudyBlock {
  id: string;
  title: string;
  /** Paragraphs. Empty = not documented yet. */
  body: string[];
  bullets?: string[];
}

export interface TechnicalIndicator {
  name: string;
  fullName: string;
  description: string;
}

export interface ArchitectureNode {
  label: string;
  detail: string;
}

export interface ArchitectureLayer {
  title: string;
  nodes: ArchitectureNode[];
}

export interface StackRole {
  name: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  tagline: string;
  problem: CaseStudyBlock;
  context: CaseStudyBlock;
  solution: CaseStudyBlock;
  architecture: CaseStudyBlock & { layers: ArchitectureLayer[] };
  /** "Technologies" section: each tool and what it does in the system. */
  stack: StackRole[];
  dataPipeline: CaseStudyBlock;
  aiAgent: CaseStudyBlock;
  technicalAnalysis: CaseStudyBlock & { indicators: TechnicalIndicator[] };
  results: CaseStudyBlock;
  lessons: CaseStudyBlock;
}
