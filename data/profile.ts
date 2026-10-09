import type { Language } from "@/types";

/**
 * Core identity. Edit here: every section, the SEO metadata and the
 * "Ask my AI" knowledge base read from this file.
 */
export const profile = {
  name: "Mohamed M'Saboue",
  firstName: "Mohamed",
  lastName: "M'Saboue",
  role: "AI / Data Engineer",
  headline: "Computer engineering student (Data & AI)",
  tagline: "Building intelligent systems — from raw data to production.",
  summary:
    "Second-year computer engineering student (Data & AI) at ENSA El Jadida, working at the intersection of software engineering, data engineering and artificial intelligence.",
  availability: {
    available: true,
    label: "Available for opportunities",
  },
  lookingFor: "Internships, job opportunities and collaborations in Data Engineering, AI and Software Engineering.",
  location: "Casablanca, Morocco",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Fluent" },
    { name: "English", level: "Fluent" },
  ] satisfies Language[],
  interests: [
    "Artificial Intelligence",
    "Data Engineering",
    "Machine Learning",
    "Big Data",
    "Backend Development",
    "Software Engineering",
    "Cloud / DevOps",
  ],
  /** Portrait under /public. `null` hides it. */
  photo: "/images/mohamed-msaboue.png" as string | null,
  /**
   * Path to the CV under /public, e.g. "/cv/mohamed-msaboue-cv.pdf".
   * `null` hides the "Download CV" button until the file is added.
   */
  cvPath: null as string | null,
} as const;

export type Profile = typeof profile;
