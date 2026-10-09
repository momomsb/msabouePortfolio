import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { engineeringDomains, techStack } from "@/data/skills";
import { getAvailableSocials, getCaseStudy } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";

/**
 * Everything the assistant is allowed to know, generated from `data/`.
 * Adding a project or certification there updates the assistant automatically.
 */
export function buildKnowledgeBase() {
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
      `- ${exp.role} (${exp.type}) at ${exp.company}${exp.team ? ` (${exp.team})` : ""}, ${formatDateRange(exp.start, exp.end, { withDay: true })}`,
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
      `- ${project.title}${project.year ? ` (${project.year})` : ""}${project.featured ? " [main / featured project]" : ""}: ${project.description}`,
      `  Categories: ${project.categories.join(", ")}`,
      `  Technologies: ${project.technologies.join(", ")}`,
    );
    if (project.context) lines.push(`  Context: ${project.context}`);
    if (project.highlights?.length) lines.push(`  ${project.highlightsTitle ?? "Highlights"}: ${project.highlights.join(", ")}`);
    const repos = [project.github, ...(project.repositories ?? []).map((repo) => repo.url)].filter(Boolean);
    if (repos.length) lines.push(`  Code: ${repos.join(", ")}`);
    const study = getCaseStudy(project.slug);
    if (study) {
      const blocks = [study.problem, study.solution, study.dataPipeline, study.aiAgent, study.results, study.lessons];
      for (const block of blocks) {
        if (block.body.length > 0) lines.push(`  ${block.title}: ${[...block.body, ...(block.bullets ?? [])].join(" ")}`);
      }
    }
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
    const dates = entry.start ? `, ${formatDateRange(entry.start, entry.end ?? null)}` : "";
    lines.push(`- ${entry.program}, ${entry.institution}${entry.shortName ? ` (${entry.shortName})` : ""}${dates}. ${entry.status}.`);
  }

  section("Certifications");
  if (certifications.length === 0) {
    lines.push("No certifications are listed on the portfolio yet.");
  } else {
    for (const cert of certifications) {
      lines.push(`- ${cert.title}, issued by ${cert.issuer} (${cert.date}). Skills: ${cert.skills.join(", ")}`);
    }
  }

  section("Contact");
  const socials = getAvailableSocials();
  if (socials.length === 0) lines.push("Use the contact form on the portfolio.");
  for (const social of socials) lines.push(`- ${social.label}: ${social.handle ?? social.href.replace(/^(mailto|tel):/, "")}`);
  lines.push("- Contact form: the Contact section of the portfolio.");

  return lines.join("\n").trim();
}
