import type { EducationData } from "@/types";

/** Newest first. Text fields: a plain string or `{ en, fr }`. */
export const education: EducationData[] = [
  {
    id: "ensaj-engineering",
    kind: "degree",
    institution: "École Nationale des Sciences Appliquées d'El Jadida",
    shortName: "ENSAJ",
    program: {
      en: "Engineering Degree: Computer Engineering & Emerging Technologies",
      fr: "Cycle ingénieur : Ingénierie Informatique et Technologies Émergentes",
    },
    status: { en: "Third and final year, in progress", fr: "Troisième et dernière année, en cours" },
    ongoing: true,
    start: "2024-09",
    end: null,
    location: { en: "El Jadida, Morocco", fr: "El Jadida, Maroc" },
    description: {
      en: "Engineering cycle in computer science (Ingénierie Informatique et Technologies Émergentes), with a personal focus on data and AI.",
      fr: "Cycle ingénieur en informatique, avec une orientation personnelle vers la data et l'IA.",
    },
  },
  {
    id: "ensaj-prepa",
    kind: "preparatory",
    institution: "École Nationale des Sciences Appliquées d'El Jadida",
    shortName: "ENSAJ",
    program: { en: "Integrated Preparatory Classes", fr: "Classes préparatoires intégrées" },
    status: { en: "Completed", fr: "Validées" },
    start: "2022-09",
    end: "2024-06",
    location: { en: "El Jadida, Morocco", fr: "El Jadida, Maroc" },
  },
  {
    id: "baccalaureate",
    kind: "secondary",
    institution: "Lycée El Maarif",
    program: { en: "Scientific Baccalaureate (Série D)", fr: "Baccalauréat scientifique (Série D)" },
    status: { en: "With honors (Mention Bien)", fr: "Mention Bien" },
    start: "2021",
    end: "2021",
    location: { en: "Mauritania", fr: "Mauritanie" },
  },
];
