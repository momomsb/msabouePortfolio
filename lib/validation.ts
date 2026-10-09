import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";

/**
 * Minimal runtime validation for API payloads. Never trust client input:
 * every route parses `unknown` through these helpers. Errors are field keys;
 * the client turns them into localized messages.
 */

export type ValidationResult<T, F extends string = string> = { ok: true; data: T } | { ok: false; errors: F[] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, key: string) {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot field: real users leave it empty. */
  website: string;
}

export type ContactField = "name" | "email" | "message";

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

export function validateContact(input: unknown): ValidationResult<ContactPayload, ContactField | "form"> {
  if (!isRecord(input)) return { ok: false, errors: ["form"] };

  const data: ContactPayload = {
    name: readString(input, "name"),
    email: readString(input, "email"),
    message: readString(input, "message"),
    website: readString(input, "website"),
  };

  const errors: ContactField[] = [];
  const { name, email, message } = CONTACT_LIMITS;
  if (data.name.length < name.min || data.name.length > name.max) errors.push("name");
  if (!EMAIL_PATTERN.test(data.email) || data.email.length > email.max) errors.push("email");
  if (data.message.length < message.min || data.message.length > message.max) errors.push("message");

  return errors.length > 0 ? { ok: false, errors } : { ok: true, data };
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export const CHAT_LIMITS = { maxTurns: 12, maxChars: 800 } as const;

/** Accepts a short alternating history that ends with a user question. */
export function validateChat(input: unknown): ValidationResult<{ turns: ChatTurn[]; locale: Locale }, "messages"> {
  if (!isRecord(input) || !Array.isArray(input.messages)) return { ok: false, errors: ["messages"] };

  const turns: ChatTurn[] = [];
  for (const item of input.messages.slice(-CHAT_LIMITS.maxTurns)) {
    if (!isRecord(item)) continue;
    const role = item.role === "assistant" ? "assistant" : item.role === "user" ? "user" : null;
    const content = typeof item.content === "string" ? item.content.trim().slice(0, CHAT_LIMITS.maxChars) : "";
    if (!role || !content) continue;
    // Merge consecutive same-role turns so the history always alternates.
    const previous = turns.at(-1);
    if (previous?.role === role) previous.content += `\n${content}`;
    else turns.push({ role, content });
  }

  while (turns[0]?.role === "assistant") turns.shift();
  if (turns.length === 0 || turns.at(-1)?.role !== "user") return { ok: false, errors: ["messages"] };

  const locale = typeof input.locale === "string" && hasLocale(input.locale) ? input.locale : defaultLocale;
  return { ok: true, data: { turns, locale } };
}
