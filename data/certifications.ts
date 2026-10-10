import type { CertificationData } from "@/types";

/**
 * Certifications: the section, its filters and the spotlight update automatically. Only add certifications you hold.
 *
 * Files live in /public/certifications. To add a verification link, fill
 * `credentialUrl` ("Verify credential" button appears automatically).
 *
 * Fields: title, issuer, date ("2026-03"), category ("AI / ML" | "Data" | "Cloud" | "Programming" | "Other"),
 * skills, credentialId?, credentialUrl?, image? (badge/logo), certificateFile? (PDF or image),
 * featured? (the first featured one goes in the spotlight).
 */
export const certifications: CertificationData[] = [
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    date: "2026-04",
    category: "Cloud",
    skills: ["AWS Architecture", "AWS Cloud", "AWS Core Services"],
    image: "/certifications/aws-academy-cloud-foundations.png",
    credentialUrl: "https://www.credly.com/badges/a4220d70-76ee-4742-bd54-28b4b1488dae/public_url",
    featured: true,
  },
  {
    title: "AWS Academy Cloud Security Foundations",
    issuer: "AWS Academy",
    // Issue date from the public Credly assertion (30 May 2026).
    date: "2026-05",
    category: "Cloud",
    skills: ["AWS", "AWS Cloud Security", "Cloud Security"],
    image: "/certifications/aws-academy-cloud-security-foundations.png",
    credentialUrl: "https://www.credly.com/badges/0987a1d0-8861-493b-a188-a9f126249ebc/public_url",
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google · Coursera",
    date: "2026-01-29",
    category: "Data",
    skills: ["Analysis", "Data Ethics", "Data Analysis", "Data Processing"],
    credentialId: "TN7ZMQN52FKR",
    certificateFile: "/certifications/google-foundations-data-data-everywhere.png",
    credentialUrl: "https://coursera.org/share/ed2a99650de91b3df1277c60e445b3d5",
  },
  {
    title: "GitHub Foundations",
    issuer: "DataCamp",
    date: "2026-01-17",
    category: "Programming",
    skills: ["Git", "GitHub", "Software Project Management", "Project Planning"],
    credentialId: "#778,736",
    certificateFile: "/certifications/datacamp-github-foundations.png",
    credentialUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/track/571144efc2fad35c9f67f274917c4630bf170260",
  },
];
