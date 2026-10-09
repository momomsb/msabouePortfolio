import type { Certification } from "@/types";

/**
 * Certifications: the section, its filters, the spotlight and the AI assistant
 * update automatically. Only add certifications you hold.
 *
 * Fields: title, issuer, date ("2026-03"), category ("AI / ML" | "Data" | "Cloud" | "Programming" | "Other"),
 * skills, and optionally credentialId, credentialUrl ("Verify credential"),
 * image (logo/badge under /public), certificateFile (PDF/image under /public, "View certificate"),
 * featured (the first featured one goes in the spotlight).
 */
export const certifications: Certification[] = [
  {
    title: "AWS Cloud Foundations (Training Badge)",
    issuer: "AWS Academy",
    date: "2026-04",
    category: "Cloud",
    skills: [],
    image: "/certifications/aws-academy-cloud-foundations.png",
    // TODO: add the Credly verification link as `credentialUrl`.
    featured: true,
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google",
    date: "2026-01",
    category: "Data",
    skills: [],
    // TODO: add the Coursera verification link as `credentialUrl`.
  },
  {
    title: "GitHub Foundations",
    issuer: "DataCamp",
    date: "2026-01",
    category: "Programming",
    skills: [],
    // TODO: add the verification link as `credentialUrl`.
  },
];
