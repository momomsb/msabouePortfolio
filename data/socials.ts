import type { SocialLink } from "@/types";

/**
 * `href: null` = not provided yet. Hidden in production, flagged in development.
 */
export const socials: SocialLink[] = [
  {
    platform: "email",
    label: "Email",
    href: "mailto:mohamedmsb6@gmail.com",
    handle: "mohamedmsb6@gmail.com",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: null, // TODO: e.g. "https://www.linkedin.com/in/<your-handle>"
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/momomsb",
    handle: "momomsb",
  },
  {
    platform: "phone",
    label: "Phone",
    // Public on the site: set to null to hide it.
    href: "tel:+212610510183",
    handle: "+212 6 10 51 01 83",
  },
];

/** GitHub username used by the "Building in public" section. */
export const githubUsername: string | null = "momomsb";
