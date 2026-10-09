import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { getAvailableSocials } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function getPersonJsonLd() {
  const school = education.find((entry) => entry.kind === "degree");
  const socials = getAvailableSocials();
  const sameAs = socials.filter((social) => social.platform === "github" || social.platform === "linkedin").map((social) => social.href);
  const email = socials.find((social) => social.platform === "email")?.href.replace(/^mailto:/, "");
  const telephone = socials.find((social) => social.platform === "phone")?.href.replace(/^tel:/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    jobTitle: profile.role,
    description: profile.summary,
    address: { "@type": "PostalAddress", addressLocality: profile.location.split(",")[0], addressCountry: "MA" },
    knowsLanguage: profile.languages.map((language) => language.name),
    ...(email && { email }),
    ...(telephone && { telephone }),
    knowsAbout: profile.interests,
    ...(sameAs.length > 0 && { sameAs }),
    ...(school && {
      alumniOf: { "@type": "CollegeOrUniversity", name: school.institution },
    }),
  };
}

/** Serializes JSON-LD safely for an inline <script> (escapes `<`). */
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
