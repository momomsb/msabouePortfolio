import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { techStack } from "@/data/skills";
import { getAvailableSocials, getFeaturedProject } from "@/lib/content";
import { formatDateRange, formatDuration, formatPartialDate } from "@/lib/utils";

/**
 * Deterministic answers built from `data/`, used when no LLM key is configured
 * (or the LLM call fails). Keyword routing is intentionally simple: every
 * answer is assembled from real portfolio content, never generated.
 */

interface Intent {
  keywords: string[];
  answer: () => string;
}

const first = profile.firstName;

const intents: Intent[] = [
  {
    keywords: [
      "internship",
      "intern",
      "attijariwafa",
      "experience",
      "work",
      "bank",
      "stage",
      "job history",
      "ministry",
      "mauritania",
      "laravel",
    ],
    answer: () => {
      if (experiences.length === 0) return `${first} hasn't listed professional experience yet.`;
      return experiences
        .map((exp) => {
          const duration = formatDuration(exp.start, exp.end);
          return [
            `**${exp.company}**${exp.team ? ` (${exp.team})` : ""}: ${exp.role}, ${exp.type.toLowerCase()}, ${formatDateRange(exp.start, exp.end, { withDay: true })}${duration ? ` (${duration})` : ""}.`,
            `Subject: ${exp.title}.`,
            `What he did: ${exp.responsibilities.join(" ")}`,
            `Stack: ${exp.technologies.join(", ")}.`,
          ].join("\n\n");
        })
        .join("\n\n");
    },
  },
  {
    keywords: ["project", "stock", "analyst", "main", "agent", "case study"],
    answer: () => {
      const project = getFeaturedProject();
      if (!project) return `${first}'s projects will be listed here soon.`;
      return [
        `His main AI project is **${project.title}**${project.year ? ` (${project.year})` : ""}. ${project.description}`,
        project.highlights?.length ? `It works with indicators such as ${project.highlights.join(", ")}.` : "",
        `Built with ${project.technologies.join(", ")}.`,
        project.hasCaseStudy ? `The full case study is at /projects/${project.slug}.` : "",
      ]
        .filter(Boolean)
        .join("\n\n");
    },
  },
  {
    keywords: ["projects", "other project", "all project", "built", "build", "side project"],
    answer: () => `${first}'s projects:\n\n${projects.map((project) => `• **${project.title}**: ${project.description}`).join("\n")}`,
  },
  {
    keywords: ["certification", "certificate", "certified", "credential", "course", "learning"],
    answer: () => {
      if (certifications.length === 0) {
        return `No certifications are listed on the portfolio yet. The Certifications section will be updated as ${first} adds them.`;
      }
      return `${first}'s certifications:\n\n${certifications.map((cert) => `• **${cert.title}**, ${cert.issuer} (${formatPartialDate(cert.date)})`).join("\n")}`;
    },
  },
  {
    keywords: ["opportunit", "looking", "hire", "hiring", "available", "availability", "open to", "recruit", "position", "role"],
    answer: () =>
      `${profile.availability.available ? `${first} is ${profile.availability.label.toLowerCase()}.` : ""} He is looking for: ${profile.lookingFor}\n\nThe fastest way to reach him is the Contact section.`.trim(),
  },
  {
    keywords: ["technolog", "stack", "skill", "tools", "programming", "python", "framework", "use", "know"],
    answer: () =>
      `${first}'s tech stack:\n\n${techStack
        .map((group) => `• ${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`)
        .join("\n")}`,
  },
  {
    keywords: ["education", "school", "study", "studies", "ensaj", "university", "degree", "student"],
    answer: () =>
      education
        .map(
          (entry) =>
            `${first} is studying for an ${entry.program} at ${entry.institution}${entry.shortName ? ` (${entry.shortName})` : ""}: ${entry.status.toLowerCase()}.`,
        )
        .join("\n\n"),
  },
  {
    keywords: ["contact", "email", "linkedin", "github", "reach", "talk"],
    answer: () => {
      const links = getAvailableSocials().map(
        (social) => `• ${social.label}: ${social.handle ?? social.href.replace(/^(mailto|tel):/, "")}`,
      );
      return [`You can reach ${first} through the contact form in the Contact section.`, ...links].join("\n");
    },
  },
  {
    keywords: ["languages", "speak", "spoken", "french", "english", "arabic", "location", "based", "where", "country", "morocco"],
    answer: () =>
      `${first} is based in ${profile.location} and speaks ${profile.languages.map((language) => `${language.name} (${language.level.toLowerCase()})`).join(", ")}.`,
  },
  {
    keywords: ["who", "about", "profile", "yourself", "introduce", "summary"],
    answer: () => `${profile.name}, ${profile.role}. ${profile.summary}\n\nInterests: ${profile.interests.join(", ")}.`,
  },
];

const FALLBACK = `I can only answer questions about ${first}'s profile: his experience, projects, skills, education, certifications and what he's looking for. Try one of the suggested questions.`;

export function answerLocally(question: string) {
  const normalized = question.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of intents) {
    const score = intent.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? keyword.length : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best ? best.intent.answer() : FALLBACK;
}
