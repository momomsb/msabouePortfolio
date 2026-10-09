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
} as const;

/** Placeholders for missing content are only rendered in development. */
export const showContentPlaceholders = process.env.NODE_ENV === "development";
