import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getAvailableSocials, getContent, getFeaturedProject, type Content } from "@/lib/content";
import { formatDateRange, formatDuration, formatPartialDate } from "@/lib/utils";

/**
 * Deterministic answers built from `data/`, used when no LLM key is configured
 * (or the LLM call fails). Keyword routing is intentionally simple: every
 * answer is assembled from real portfolio content, never generated.
 * Keywords cover English and French; answers follow the page language.
 */

interface Intent {
  keywords: string[];
  answer: (content: Content, locale: Locale) => string;
}

const fr = (locale: Locale) => locale === "fr";
/** French typography puts a space before the colon. */
const colon = (locale: Locale) => (fr(locale) ? " :" : ":");

const intents: Intent[] = [
  {
    keywords: [
      "internship",
      "intern",
      "experience",
      "work",
      "bank",
      "attijariwafa",
      "ministry",
      "mauritania",
      "laravel",
      "stage",
      "expérience",
      "ministère",
      "travail",
    ],
    answer: ({ experiences, profile }, locale) => {
      if (experiences.length === 0)
        return fr(locale) ? "Aucune expérience n'est encore listée." : "No professional experience is listed yet.";
      const types = getDictionary(locale).experience.types;
      return experiences
        .map((exp) => {
          const duration = formatDuration(exp.start, exp.end, locale);
          const dates = formatDateRange(exp.start, exp.end, locale);
          return [
            `**${exp.company}**${exp.team ? ` (${exp.team})` : ""}${colon(locale)} ${exp.role}, ${types[exp.type].toLowerCase()}, ${dates}${duration ? ` (${duration})` : ""}.`,
            `${fr(locale) ? "Sujet" : "Subject"}${colon(locale)} ${exp.title}.`,
            `${fr(locale) ? `Ce que ${profile.firstName} a fait` : "What he did"}${colon(locale)} ${exp.responsibilities.join(" ")}`,
            `Stack${colon(locale)} ${exp.technologies.join(", ")}.`,
          ].join("\n\n");
        })
        .join("\n\n");
    },
  },
  {
    keywords: ["project", "stock", "analyst", "main", "agent", "case study", "projet", "principal", "bourse", "étude de cas"],
    answer: (content, locale) => {
      const project = getFeaturedProject(content);
      if (!project) return fr(locale) ? "Les projets arrivent bientôt." : "Projects will be listed here soon.";
      const year = project.year ? ` (${project.year})` : "";
      return [
        fr(locale)
          ? `Son projet IA principal est **${project.title}**${year}. ${project.description}`
          : `His main AI project is **${project.title}**${year}. ${project.description}`,
        project.highlights?.length
          ? fr(locale)
            ? `Il s'appuie notamment sur${colon(locale)} ${project.highlights.join(", ")}.`
            : `It works with: ${project.highlights.join(", ")}.`
          : "",
        `${fr(locale) ? "Technologies" : "Built with"}${colon(locale)} ${project.technologies.join(", ")}.`,
        project.hasCaseStudy
          ? fr(locale)
            ? `L'étude de cas complète${colon(locale)} /${locale}/projects/${project.slug}`
            : `Full case study: /${locale}/projects/${project.slug}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n");
    },
  },
  {
    keywords: [
      "projects",
      "other project",
      "all project",
      "built",
      "build",
      "side project",
      "projets",
      "autres projets",
      "réalisé",
      "construit",
    ],
    answer: ({ projects, profile }, locale) =>
      `${fr(locale) ? `Les projets de ${profile.firstName}` : `${profile.firstName}'s projects`}${colon(locale)}\n\n${projects
        .map((project) => `• **${project.title}**${colon(locale)} ${project.description}`)
        .join("\n")}`,
  },
  {
    keywords: ["certification", "certificate", "certified", "credential", "course", "learning", "certificat", "badge"],
    answer: ({ certifications, profile }, locale) => {
      if (certifications.length === 0)
        return fr(locale) ? "Aucune certification n'est encore listée." : "No certifications are listed yet.";
      return `${fr(locale) ? `Certifications de ${profile.firstName}` : `${profile.firstName}'s certifications`}${colon(locale)}\n\n${certifications
        .map((cert) => `• **${cert.title}**, ${cert.issuer}${cert.date ? ` (${formatPartialDate(cert.date, locale)})` : ""}`)
        .join("\n")}`;
    },
  },
  {
    keywords: [
      "opportunit",
      "looking",
      "hire",
      "hiring",
      "available",
      "availability",
      "open to",
      "recruit",
      "position",
      "recherche",
      "disponible",
      "embauche",
      "recrut",
      "poste",
    ],
    answer: ({ profile }, locale) =>
      fr(locale)
        ? `${profile.firstName} est ${profile.availability.label.toLowerCase()}. Il recherche${colon(locale)} ${profile.lookingFor}\n\nLe plus simple pour le contacter${colon(locale)} la section Contact.`
        : `${profile.firstName} is ${profile.availability.label.toLowerCase()}. He is looking for: ${profile.lookingFor}\n\nThe fastest way to reach him is the Contact section.`,
  },
  {
    keywords: [
      "technolog",
      "stack",
      "skill",
      "tools",
      "programming",
      "python",
      "framework",
      "use",
      "know",
      "compétence",
      "outils",
      "programmation",
      "utilise",
      "maîtrise",
    ],
    answer: ({ techStack, profile }, locale) =>
      `${fr(locale) ? `La stack de ${profile.firstName}` : `${profile.firstName}'s tech stack`}${colon(locale)}\n\n${techStack
        .map((group) => `• ${group.title}${colon(locale)} ${group.skills.map((skill) => skill.name).join(", ")}`)
        .join("\n")}`,
  },
  {
    keywords: [
      "education",
      "school",
      "study",
      "studies",
      "ensaj",
      "university",
      "degree",
      "student",
      "formation",
      "école",
      "études",
      "diplôme",
      "étudiant",
      "prépa",
    ],
    answer: ({ education, profile }, locale) =>
      [
        fr(locale) ? `Le parcours de ${profile.firstName} :` : `${profile.firstName}'s education:`,
        ...education.map(
          (entry) =>
            `• **${entry.program}**, ${entry.institution}${entry.start ? ` (${formatDateRange(entry.start, entry.end ?? null, locale)})` : ""}${colon(locale)} ${entry.status}.`,
        ),
      ].join("\n"),
  },
  {
    keywords: ["contact", "email", "mail", "linkedin", "github", "reach", "talk", "joindre", "contacter"],
    answer: ({ profile }, locale) => {
      const links = getAvailableSocials().map(
        (social) => `• ${social.label}${colon(locale)} ${social.handle ?? social.href.replace(/^(mailto|tel):/, "")}`,
      );
      const intro = fr(locale)
        ? `Vous pouvez contacter ${profile.firstName} via le formulaire de la section Contact :`
        : `You can reach ${profile.firstName} through the contact form in the Contact section:`;
      return [intro, ...links].join("\n");
    },
  },
  {
    keywords: [
      "languages",
      "speak",
      "spoken",
      "french",
      "english",
      "arabic",
      "location",
      "based",
      "where",
      "country",
      "morocco",
      "langues",
      "parle",
      "français",
      "anglais",
      "arabe",
      "maroc",
      "habite",
    ],
    answer: ({ profile }, locale) => {
      const languages = profile.languages.map((language) => `${language.name} (${language.level.toLowerCase()})`).join(", ");
      return fr(locale)
        ? `${profile.firstName} est basé à ${profile.location} et parle ${languages}.`
        : `${profile.firstName} is based in ${profile.location} and speaks ${languages}.`;
    },
  },
  {
    keywords: ["who", "about", "profile", "yourself", "introduce", "summary", "qui est", "présente", "profil", "résumé"],
    answer: ({ profile }, locale) =>
      `${profile.name}, ${profile.role}. ${profile.summary}\n\n${fr(locale) ? "Centres d'intérêt" : "Interests"}${colon(locale)} ${profile.interests.join(", ")}.`,
  },
];

export function declinedMessage(locale: Locale) {
  return fr(locale)
    ? "Je ne peux pas répondre à celle-ci. Posez-moi une question sur l'expérience, les projets, les compétences ou la formation présentés dans ce portfolio."
    : "I can't help with that one. Ask me about the experience, projects, skills or education listed on this portfolio.";
}

export function answerLocally(question: string, locale: Locale) {
  const content = getContent(locale);
  const normalized = question.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of intents) {
    const score = intent.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? keyword.length : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  if (best) return best.intent.answer(content, locale);

  const name = content.profile.firstName;
  return fr(locale)
    ? `Je réponds uniquement aux questions sur le profil de ${name}${colon(locale)} expérience, projets, compétences, formation, certifications et opportunités recherchées. Essayez une des questions suggérées.`
    : `I can only answer questions about ${name}'s profile: experience, projects, skills, education, certifications and what he's looking for. Try one of the suggested questions.`;
}
