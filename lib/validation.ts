/**
 * Minimal runtime validation for API payloads. Never trust client input:
 * every route parses `unknown` through these helpers.
 */

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: Record<string, string> };

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

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

export function validateContact(input: unknown): ValidationResult<ContactPayload> {
  if (!isRecord(input)) return { ok: false, errors: { form: "Invalid request." } };

  const data: ContactPayload = {
    name: readString(input, "name"),
    email: readString(input, "email"),
    message: readString(input, "message"),
    website: readString(input, "website"),
  };

  const errors: Record<string, string> = {};
  const { name, email, message } = CONTACT_LIMITS;

  if (data.name.length < name.min || data.name.length > name.max) {
    errors.name = `Please enter your name (${name.min}–${name.max} characters).`;
  }
  if (!EMAIL_PATTERN.test(data.email) || data.email.length > email.max) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.message.length < message.min || data.message.length > message.max) {
    errors.message = `Your message should be ${message.min}–${message.max} characters.`;
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export const CHAT_LIMITS = { maxTurns: 12, maxChars: 800 } as const;

/** Accepts a short alternating history that ends with a user question. */
export function validateChat(input: unknown): ValidationResult<ChatTurn[]> {
  if (!isRecord(input) || !Array.isArray(input.messages)) {
    return { ok: false, errors: { messages: "Invalid request." } };
  }

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
  if (turns.length === 0 || turns.at(-1)?.role !== "user") {
    return { ok: false, errors: { messages: "Ask a question to get an answer." } };
  }
  return { ok: true, data: turns };
}
