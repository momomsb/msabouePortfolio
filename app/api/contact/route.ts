import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { validateContact } from "@/lib/validation";
import type { ContactResponse } from "@/types/api";

const reply = (body: ContactResponse, status: number, headers?: HeadersInit) => Response.json(body, { status, headers });

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${getClientIp(request)}`, { limit: 5, windowMs: 60 * 60_000 });
  if (!limit.ok) return reply({ status: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter) });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ status: "invalid", errors: ["form"] }, 400);
  }

  const parsed = validateContact(body);
  if (!parsed.ok) return reply({ status: "invalid", errors: parsed.errors }, 422);

  // Honeypot filled: pretend success so bots learn nothing.
  if (parsed.data.website) return reply({ status: "sent" }, 200);

  if (!isEmailConfigured()) return reply({ status: "not_configured" }, 503);

  try {
    await sendContactEmail(parsed.data);
    return reply({ status: "sent" }, 200);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return reply({ status: "error" }, 502);
  }
}
