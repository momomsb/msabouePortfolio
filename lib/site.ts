import { profile } from "@/data/profile";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Provided automatically by Vercel.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  title: `${profile.name} | ${profile.role}`,
  description: `${profile.name}, ${profile.role}. ${profile.summary} ${profile.tagline}`,
  locale: "en_US",
} as const;

/** Placeholders for missing content are only rendered in development. */
export const showContentPlaceholders = process.env.NODE_ENV === "development";
