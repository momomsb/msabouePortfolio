import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    ...getCaseStudySlugs().map((slug) => ({
      url: `${siteConfig.url}/projects/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
