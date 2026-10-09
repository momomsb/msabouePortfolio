import Anthropic from "@anthropic-ai/sdk";
import { askClaude, isClaudeConfigured } from "@/lib/chat/claude";
import { answerLocally } from "@/lib/chat/local-responder";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { validateChat } from "@/lib/validation";
import type { ChatResponse } from "@/types/api";

const DECLINED = "I can't help with that one. Ask me about the experience, projects, skills or education listed on this portfolio.";

export async function POST(request: Request) {
  const limit = rateLimit(`chat:${getClientIp(request)}`, { limit: 20, windowMs: 10 * 60_000 });
  if (!limit.ok) {
    return Response.json(
      { error: "Too many questions in a short time. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = validateChat(body);
  if (!parsed.ok) return Response.json({ error: parsed.errors.messages }, { status: 400 });

  const turns = parsed.data;
  const question = turns.at(-1)!.content;
  const demo = (): Response => Response.json({ reply: answerLocally(question), mode: "demo" } satisfies ChatResponse);

  if (!isClaudeConfigured()) return demo();

  try {
    const answer = await askClaude(turns);
    const reply = answer.kind === "answer" ? answer.text : DECLINED;
    return Response.json({ reply, mode: "ai" } satisfies ChatResponse);
  } catch (error) {
    // Degrade to the deterministic responder instead of surfacing an error.
    if (error instanceof Anthropic.RateLimitError) {
      console.warn("[chat] Claude rate limited, using local responder");
    } else if (error instanceof Anthropic.APIError) {
      console.error(`[chat] Claude API error ${error.status}: ${error.message}`);
    } else {
      console.error("[chat] Unexpected error", error);
    }
    return demo();
  }
}
