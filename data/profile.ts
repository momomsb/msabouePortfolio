import type { Locale, Text } from "@/i18n/config";
import type { Language } from "@/types";

/**
 * Core identity. Edit here: every section and the SEO metadata read from this file.
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
    en: "Final-year computer engineering student (Data & AI) at ENSA El Jadida, I design data systems, process data at scale and build AI-powered solutions.",
    fr: "Élève ingénieur en dernière année d'informatique (Data & IA) à l'ENSA d'El Jadida, je conçois des systèmes data, traite des données à grande échelle et développe des solutions fondées sur l'intelligence artificielle.",
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
   * CV files under /public/cv, one per language. "Download CV" opens a menu
   * to pick one; an empty list hides the button.
   */
  cv: [
    { language: "fr", path: "/cv/CV_Msaboue_Mohamed_FR1.pdf" },
    { language: "en", path: "/cv/CV_Msaboue_Mohamed_EN1.pdf" },
  ] as Array<{ language: Locale; path: string }>,
};

export type ProfileData = typeof profile;
