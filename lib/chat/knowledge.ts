import { getAvailableSocials, getContent } from "@/lib/content";
import { formatDateRange, formatPartialDate } from "@/lib/utils";

/**
 * Everything the assistant is allowed to know, generated from `data/`.
 * Adding a project or certification there updates the assistant automatically.
 * Built from the English content; the model answers in the visitor's language.
 */
export function buildKnowledgeBase() {
  const content = getContent("en");
  const { profile, experiences, projects, engineeringDomains, techStack, education, certifications } = content;
  const lines: string[] = [];
  const section = (title: string) => lines.push("", `## ${title}`);

  section("Profile");
  lines.push(
    `Name: ${profile.name}`,
    `Role: ${profile.role}`,
    `Summary: ${profile.summary}`,
    `Tagline: ${profile.tagline}`,
    `Location: ${profile.location}`,
    `Headline: ${profile.headline}`,
    `Languages: ${profile.languages.map((language) => `${language.name} (${language.level})`).join(", ")}`,
    `Interests: ${profile.interests.join(", ")}`,
    `Availability: ${profile.availability.available ? profile.availability.label : "Not currently available"}`,
    `Looking for: ${profile.lookingFor}`,
  );

  section("Experience");
  for (const exp of experiences) {
    lines.push(
      `- ${exp.role} (${exp.type}) at ${exp.company}${exp.team ? ` (${exp.team})` : ""}, ${formatDateRange(exp.start, exp.end, "en")}`,
      `  Subject: ${exp.title}`,
      `  Context: ${exp.context}`,
      `  Problem: ${exp.problem}`,
      `  Responsibilities: ${exp.responsibilities.join(" ")}`,
      `  Technologies: ${exp.technologies.join(", ")}`,
    );
    if (exp.results.length > 0) lines.push(`  Results: ${exp.results.join(" ")}`);
  }

  section("Projects");
  for (const project of projects) {
    lines.push(
      `- ${project.title}${project.featured ? " [main / featured project]" : ""}: ${project.description}`,
      `  Categories: ${project.categories.join(", ")}`,
      `  Technologies: ${project.technologies.join(", ")}`,
    );
    if (project.context) lines.push(`  Context: ${project.context}`);
  }

  section("Engineering domains");
  for (const domain of engineeringDomains) {
    lines.push(`- ${domain.title}: ${domain.technologies.join(", ")}`);
  }

  section("Tech stack");
  for (const group of techStack) {
    lines.push(`- ${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`);
  }

  section("Education");
  for (const entry of education) {
    const dates = entry.start ? `, ${formatDateRange(entry.start, entry.end ?? null, "en")}` : "";
    lines.push(`- ${entry.program}, ${entry.institution}${entry.shortName ? ` (${entry.shortName})` : ""}${dates}. ${entry.status}.`);
  }

  section("Certifications");
  if (certifications.length === 0) {
    lines.push("No certifications are listed on the portfolio yet.");
  } else {
    for (const cert of certifications) {
      const date = cert.date ? ` (${formatPartialDate(cert.date, "en")})` : "";
      lines.push(`- ${cert.title}, issued by ${cert.issuer}${date}${cert.skills.length ? `. Skills: ${cert.skills.join(", ")}` : ""}`);
    }
  }

  section("Contact");
  const socials = getAvailableSocials();
  if (socials.length === 0) lines.push("Use the contact form on the portfolio.");
  for (const social of socials) lines.push(`- ${social.label}: ${social.handle ?? social.href.replace(/^(mailto|tel):/, "")}`);
  lines.push("- Contact form: the Contact section of the portfolio.");

  return lines.join("\n").trim();
}
