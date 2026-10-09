import type { Education } from "@/types";

/** Newest first. */
export const education: Education[] = [
  {
    id: "ensaj-engineering",
    kind: "degree",
    institution: "École Nationale des Sciences Appliquées d'El Jadida",
    shortName: "ENSAJ",
    program: "Engineering Degree: Computer Engineering & Emerging Technologies",
    status: "Second year — in progress",
    start: "2024-09",
    end: null,
    location: "El Jadida, Morocco",
    description:
      "Engineering cycle in computer science (Ingénierie Informatique et Technologies Émergentes), with a personal focus on data and AI.",
  },
  {
    id: "ensaj-prepa",
    kind: "preparatory",
    institution: "École Nationale des Sciences Appliquées d'El Jadida",
    shortName: "ENSAJ",
    program: "Integrated Preparatory Classes",
    status: "Completed",
    start: "2022-09",
    end: "2024-06",
    location: "El Jadida, Morocco",
  },
  {
    id: "baccalaureate",
    kind: "secondary",
    institution: "Lycée El Maarif",
    program: "Scientific Baccalaureate (Série D)",
    status: "With honors (Mention Bien)",
    start: "2021",
    end: "2021",
    location: "Mauritania",
  },
];
