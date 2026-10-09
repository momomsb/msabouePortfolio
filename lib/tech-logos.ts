import "server-only";
import * as simpleIcons from "simple-icons";

export interface BrandLogo {
  /** SVG path for a 24×24 viewBox. */
  path: string;
  /** Brand color, or null when it would be unreadable (near-black / near-white): the UI then uses the text color. */
  color: string | null;
}

type SimpleIcon = { slug: string; path: string; hex: string };

const bySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons as unknown as Record<string, SimpleIcon>)
    .filter((icon) => typeof icon === "object" && icon !== null && "slug" in icon)
    .map((icon) => [icon.slug, icon]),
);

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Logo from Simple Icons (CC0). Brand colors too close to black or white adapt to the theme. */
export function getBrandLogo(slug: string | undefined): BrandLogo | null {
  const icon = slug ? bySlug.get(slug) : undefined;
  if (!icon) return null;
  const l = luminance(icon.hex);
  return { path: icon.path, color: l < 0.04 || l > 0.85 ? null : `#${icon.hex}` };
}
