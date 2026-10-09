import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import type { PartialDate } from "@/types";

// Register custom theme tokens so `text-display` is merged as a font size, not a color.
const twMerge = extendTailwindMerge({ extend: { theme: { text: ["display"] } } });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parsePartialDate(value: PartialDate) {
  const [year, month, day] = value.split("-").map(Number);
  return { year, month: month || undefined, day: day || undefined };
}

/** "2026-07-13" → "13 Jul 2026", "2026-07" → "Jul 2026", "2026" → "2026". */
export function formatPartialDate(value: PartialDate, { withDay = false } = {}) {
  const { year, month, day } = parsePartialDate(value);
  if (!month) return String(year);
  const monthLabel = MONTHS[month - 1];
  return withDay && day ? `${day} ${monthLabel} ${year}` : `${monthLabel} ${year}`;
}

export function formatDateRange(start: PartialDate, end: PartialDate | null, opts?: { withDay?: boolean }) {
  if (end === start) return formatPartialDate(start, opts);
  return `${formatPartialDate(start, opts)} → ${end ? formatPartialDate(end, opts) : "Present"}`;
}

/** Duration between two full dates, e.g. "8 weeks". Returns null for partial or open ranges. */
export function formatDuration(start: PartialDate, end: PartialDate | null) {
  if (!end) return null;
  const a = parsePartialDate(start);
  const b = parsePartialDate(end);
  if (!a.month || !a.day || !b.month || !b.day) return null;
  const days = (Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day)) / 86_400_000;
  if (days < 60) return `${Math.round(days / 7)} weeks`;
  const months = Math.round(days / 30.44);
  return `${months} months`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Zero-padded index used for "lab module" labels: 1 → "01". */
export function pad(index: number) {
  return String(index).padStart(2, "0");
}
