import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getContent } from "@/lib/content";

/** Current locale from the `[lang]` root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Locale, interface strings and localized content in one call. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale), content: getContent(locale) };
}
