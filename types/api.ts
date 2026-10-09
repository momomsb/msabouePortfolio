/** Response contracts shared by the API routes and their client callers. */

export type ChatMode = "ai" | "demo";

export interface ChatResponse {
  reply: string;
  mode: ChatMode;
}

export interface ApiError {
  error: "invalid_request" | "rate_limited";
}

export type ContactStatus = "sent" | "invalid" | "not_configured" | "rate_limited" | "error";

/** `status` is mapped to a localized message on the client. */
export interface ContactResponse {
  status: ContactStatus;
  /** Invalid field keys when `status` is "invalid". */
  errors?: string[];
}
