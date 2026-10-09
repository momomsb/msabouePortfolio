import { Suspense } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { githubUsername } from "@/data/socials";
import { getGitHubActivity, type GitHubActivity } from "@/lib/github";
import { cn, formatPartialDate } from "@/lib/utils";

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  PHP: "#4F5D95",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#DA5B0B",
};

export function BuildingInPublic() {
  if (!githubUsername) return null;

  return (
    <Section id="building-in-public">
      <SectionHeader
        id="building-in-public"
        index={8}
        tag="GitHub · Live feed"
        title="Building in public."
        description="Live data from GitHub: public repositories, languages and recent activity."
      />
      <Suspense fallback={<ActivitySkeleton />}>
        <Activity username={githubUsername} />
      </Suspense>
    </Section>
  );
}

async function Activity({ username }: { username: string }) {
  const activity = await getGitHubActivity(username);
  if (!activity) return <ProfileLink username={username} />;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Reveal className="flex flex-col panel p-6 sm:p-8">
        <p className="label-mono text-subtle">Public repositories</p>
        <p className="mt-3 font-display text-6xl font-medium tracking-tight text-fg">{activity.repoCount}</p>
        {activity.contributions && (
          <p className="mt-2 text-sm text-muted">
            <span className="text-fg">{activity.contributions.total}</span> contributions in the last year
          </p>
        )}
        <LanguageBreakdown languages={activity.languages} />
        <a
          href={activity.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-accent hover:text-accent-strong"
        >
          <GitHubIcon className="size-4" /> @{activity.username}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </Reveal>

      <Reveal delay={0.08} className="panel p-6 sm:p-8 lg:col-span-2">
        {activity.contributions && <ContributionGraph weeks={activity.contributions.weeks} />}
        <p className="mb-4 label-mono text-subtle">Recently updated</p>
        {activity.recentRepos.length === 0 ? (
          <p className="text-sm text-muted">No public repositories yet.</p>
        ) : (
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {activity.recentRepos.map((repo) => (
              <li key={repo.name} className="bg-surface">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col p-4 transition-colors hover:bg-raised"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-sm text-fg group-hover:text-accent">{repo.name}</span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-subtle transition-colors group-hover:text-accent" aria-hidden />
                  </span>
                  {repo.description && <span className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{repo.description}</span>}
                  <span className="mt-auto flex items-center gap-4 pt-3 font-mono text-[0.6875rem] text-subtle">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden
                          className="size-2 rounded-full"
                          style={{ background: LANGUAGE_COLORS[repo.language] ?? "var(--color-accent)" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3" aria-hidden /> {repo.stars}
                      </span>
                    )}
                    <span>Updated {formatPartialDate(repo.updatedAt.slice(0, 7))}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

function LanguageBreakdown({ languages }: { languages: GitHubActivity["languages"] }) {
  if (languages.length === 0) return null;
  const total = languages.reduce((sum, language) => sum + language.count, 0);
  return (
    <div className="mt-8">
      <p className="mb-3 label-mono text-subtle">Primary languages</p>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-raised" aria-hidden>
        {languages.map((language) => (
          <span
            key={language.name}
            style={{ width: `${(language.count / total) * 100}%`, background: LANGUAGE_COLORS[language.name] ?? "var(--color-accent)" }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {languages.map((language) => (
          <li key={language.name} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-muted">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ background: LANGUAGE_COLORS[language.name] ?? "var(--color-accent)" }}
              />
              {language.name}
            </span>
            <span className="font-mono text-xs text-subtle">
              {language.count} repo{language.count > 1 ? "s" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContributionGraph({ weeks }: { weeks: number[][] }) {
  const max = Math.max(1, ...weeks.flat());
  const level = (count: number) => (count === 0 ? 0 : Math.ceil((count / max) * 4));
  const shades = ["bg-raised", "bg-accent/20", "bg-accent/40", "bg-accent/65", "bg-accent"];

  return (
    <div className="mb-8">
      <p className="mb-4 label-mono text-subtle">Contributions · last 12 months</p>
      <div className="overflow-x-auto pb-2" role="img" aria-label="GitHub contribution calendar for the last 12 months">
        <div className="flex gap-[3px]">
          {weeks.map((days, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {days.map((count, j) => (
                <span key={j} className={cn("size-2.5 rounded-[2px]", shades[level(count)])} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileLink({ username }: { username: string }) {
  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-6 panel p-6 transition-colors hover:border-line-strong sm:p-8"
    >
      <span className="flex items-center gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-raised text-fg">
          <GitHubIcon className="size-5" />
        </span>
        <span>
          <span className="block text-lg font-medium text-fg">Follow the work on GitHub</span>
          <span className="font-mono text-sm text-subtle">@{username}</span>
        </span>
      </span>
      <ArrowUpRight className="size-5 text-subtle transition-colors group-hover:text-accent" aria-hidden />
    </a>
  );
}

function ActivitySkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3" aria-hidden>
      <div className="h-72 animate-pulse panel" />
      <div className="h-72 animate-pulse panel lg:col-span-2" />
    </div>
  );
}
