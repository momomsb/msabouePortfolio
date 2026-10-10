import type { NavItemData } from "@/types";

export const navigation: NavItemData[] = [
  { label: { en: "Home", fr: "Accueil" }, sectionId: "home" },
  { label: { en: "About", fr: "À propos" }, sectionId: "about", index: 1 },
  { label: { en: "Experience", fr: "Expérience" }, sectionId: "experience", index: 2 },
  { label: { en: "Projects", fr: "Projets" }, sectionId: "projects", index: 3 },
  { label: { en: "Skills", fr: "Compétences" }, sectionId: "skills", index: 4 },
  { label: "Certifications", sectionId: "certifications", index: 6 },
  { label: { en: "Education", fr: "Formation" }, sectionId: "education", index: 7 },
  { label: "Contact", sectionId: "contact", index: 8 },
];
