/** Response contracts shared by the API routes and their client callers. */

export type ChatMode = "ai" | "demo";

export interface ChatResponse {
  reply: string;
  mode: ChatMode;
}

export interface ApiError {
  error: string;
}

export type ContactStatus = "sent" | "invalid" | "not_configured" | "rate_limited" | "error";

export interface ContactResponse {
  status: ContactStatus;
  message: string;
  errors?: Record<string, string>;
}
