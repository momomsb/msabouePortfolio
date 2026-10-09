"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getContent } from "@/lib/content";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Locale, interface strings and localized content for Client Components. */
export function useI18n() {
  const locale = useContext(LocaleContext);
  if (!locale) throw new Error("useI18n must be used inside <LocaleProvider>");
  return { locale, dict: getDictionary(locale), content: getContent(locale) };
}
