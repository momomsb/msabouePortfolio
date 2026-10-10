/** Response contracts shared by the API routes and their client callers. */

export type ContactStatus = "sent" | "invalid" | "not_configured" | "rate_limited" | "error";

/** `status` is mapped to a localized message on the client. */
export interface ContactResponse {
  status: ContactStatus;
  /** Invalid field keys when `status` is "invalid". */
  errors?: string[];
}
