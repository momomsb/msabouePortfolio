import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { PartialDate } from "@/types";

// Register custom theme tokens so `text-display` is merged as a font size, not a color.
const twMerge = extendTailwindMerge({ extend: { theme: { text: ["display"] } } });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parsePartialDate(value: PartialDate) {
  const [year, month, day] = value.split("-").map(Number);
  return { year, month: month || undefined, day: day || undefined };
}

/** "2026-07-13" → "13 Jul 2026" / "13 juil. 2026", "2026-07" → "Jul 2026", "2026" → "2026". */
export function formatPartialDate(value: PartialDate, locale: Locale, { withDay = false } = {}) {
  const { year, month, day } = parsePartialDate(value);
  if (!month) return String(year);
  const monthLabel = getDictionary(locale).dates.months[month - 1];
  return withDay && day ? `${day} ${monthLabel} ${year}` : `${monthLabel} ${year}`;
}

export function formatDateRange(start: PartialDate, end: PartialDate | null, locale: Locale, opts?: { withDay?: boolean }) {
  if (end === start) return formatPartialDate(start, locale, opts);
  const endLabel = end ? formatPartialDate(end, locale, opts) : getDictionary(locale).dates.present;
  return `${formatPartialDate(start, locale, opts)} → ${endLabel}`;
}

/** Zero-padded index used for "lab module" labels: 1 → "01". */
export function pad(index: number) {
  return String(index).padStart(2, "0");
}
