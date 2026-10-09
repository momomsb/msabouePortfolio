import type { NavItemData } from "@/types";

export const navigation: NavItemData[] = [
  { label: { en: "Home", fr: "Accueil" }, sectionId: "home" },
  { label: { en: "About", fr: "À propos" }, sectionId: "about" },
  { label: { en: "Experience", fr: "Expérience" }, sectionId: "experience" },
  { label: { en: "Projects", fr: "Projets" }, sectionId: "projects" },
  { label: { en: "Skills", fr: "Compétences" }, sectionId: "skills" },
  { label: "Certifications", sectionId: "certifications" },
  { label: { en: "Education", fr: "Formation" }, sectionId: "education" },
  { label: "Contact", sectionId: "contact" },
];
