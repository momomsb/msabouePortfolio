import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getCaseStudySlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/** Every page exists in each locale; hreflang alternates link them together. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...getCaseStudySlugs().map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: path ? ("yearly" as const) : ("monthly" as const),
      priority: path ? 0.8 : 1,
      alternates: {
        languages: Object.fromEntries(locales.map((alt) => [alt, `${siteConfig.url}/${alt}${path}`])),
      },
    })),
  );
}
