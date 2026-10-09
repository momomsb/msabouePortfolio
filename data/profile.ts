import type { Text } from "@/i18n/config";
import type { Language } from "@/types";

/**
 * Core identity. Edit here: every section, the SEO metadata and the
 * "Ask my AI" knowledge base read from this file.
 * Text fields: a plain string (same in both languages) or `{ en, fr }`.
 */
export const profile = {
  name: "Mohamed M'Saboue",
  firstName: "Mohamed",
  lastName: "M'Saboue",
  role: { en: "AI / Data Engineer", fr: "Ingénieur IA / Data" } as Text,
  headline: {
    en: "Final-year computer engineering student (Data & AI)",
    fr: "Élève ingénieur en informatique en dernière année (Data & IA)",
  } as Text,
  tagline: {
    en: "Building intelligent systems, from raw data to production.",
    fr: "Je construis des systèmes intelligents, de la donnée brute à la production.",
  } as Text,
  summary: {
    en: "Final-year computer engineering student (Data & AI) at ENSA El Jadida, working at the intersection of software engineering, data engineering and artificial intelligence.",
    fr: "Élève ingénieur en dernière année d'informatique (Data & IA) à l'ENSA d'El Jadida, au croisement du génie logiciel, de la data engineering et de l'intelligence artificielle.",
  } as Text,
  availability: {
    available: true,
    label: { en: "Available for opportunities", fr: "Ouvert aux opportunités" } as Text,
  },
  lookingFor: {
    en: "Internships, job opportunities and collaborations in Data Engineering, AI and Software Engineering.",
    fr: "Stages, opportunités d'emploi et collaborations en Data Engineering, IA et génie logiciel.",
  } as Text,
  location: { en: "Casablanca, Morocco", fr: "Casablanca, Maroc" } as Text,
  languages: [
    { name: { en: "Arabic", fr: "Arabe" }, level: { en: "Native", fr: "Langue maternelle" } },
    { name: { en: "French", fr: "Français" }, level: { en: "Fluent", fr: "Courant" } },
    { name: { en: "English", fr: "Anglais" }, level: { en: "Fluent", fr: "Courant" } },
  ] satisfies Language[],
  interests: [
    { en: "Artificial Intelligence", fr: "Intelligence artificielle" },
    "Data Engineering",
    "Machine Learning",
    "Big Data",
    { en: "Backend Development", fr: "Développement backend" },
    { en: "Software Engineering", fr: "Génie logiciel" },
    "Cloud / DevOps",
  ] as Text[],
  /** Portrait under /public. `null` hides it. */
  photo: "/images/mohamed-msaboue.png" as string | null,
  /**
   * Path to the CV under /public, e.g. "/cv/mohamed-msaboue-cv.pdf".
   * `null` hides the "Download CV" button until the file is added.
   */
  cvPath: null as string | null,
};

export type ProfileData = typeof profile;
