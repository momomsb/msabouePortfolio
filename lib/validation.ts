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
