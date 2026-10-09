import type { SocialLink } from "@/types";

/**
 * `href: null` = not provided yet. Hidden in production, flagged in development.
 * A phone entry is also supported: { platform: "phone", label: "Phone", href: "tel:+…" }.
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
    href: "https://www.linkedin.com/in/mohamed-m-8482b72a7/",
    handle: "Mohamed M'Saboue",
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/momomsb",
    handle: "momomsb",
  },
];

/** GitHub username used by the "Building in public" section. */
export const githubUsername: string | null = "momomsb";
