export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie remembering the visitor's language choice (read by proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = { en: "English", fr: "Français" };

/** Remembers the visitor's language for proxy.ts (client-side only). */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function hasLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

/** "/en/projects/x" → "/fr/projects/x". */
export function switchLocalePath(pathname: string, target: Locale) {
  const segments = pathname.split("/");
  if (hasLocale(segments[1])) segments[1] = target;
  else segments.splice(1, 0, target);
  return segments.join("/") || `/${target}`;
}

/**
 * Text in data files: a plain string when identical in both languages,
 * or one value per locale.
 */
export type Localized = { en: string; fr: string };
export type Text = string | Localized;

/** Replaces every Localized value in T with a string, recursively. */
export type Resolved<T> = T extends Localized
  ? string
  : T extends string | number | boolean | null | undefined
    ? T
    : T extends ReadonlyArray<infer U>
      ? Resolved<U>[]
      : { [K in keyof T]: Resolved<T[K]> };

function isLocalized(value: unknown): value is Localized {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === 2 && typeof (value as Localized).en === "string" && typeof (value as Localized).fr === "string";
}

/** Deeply resolves localized values for one locale. */
export function localize<T>(value: T, locale: Locale): Resolved<T> {
  if (isLocalized(value)) return value[locale] as Resolved<T>;
  if (Array.isArray(value)) return value.map((item) => localize(item, locale)) as Resolved<T>;
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)])) as Resolved<T>;
  }
  return value as Resolved<T>;
}
