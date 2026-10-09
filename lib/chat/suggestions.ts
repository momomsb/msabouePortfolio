import { profile } from "@/data/profile";

export const SUGGESTED_QUESTIONS = [
  `What technologies does ${profile.firstName} use?`,
  "What is his main AI project?",
  "Tell me about his internship.",
  "What are his certifications?",
  "What kind of opportunities is he looking for?",
] as const;
