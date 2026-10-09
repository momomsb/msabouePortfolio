import { cacheLife } from "next/cache";

/**
 * Real GitHub data for the "Building in public" section.
 * - Public REST API works without a token (60 req/h, shared per IP).
 * - With GITHUB_TOKEN (server-only), the contribution calendar is fetched too.
 * Results are cached for hours, so the API is hit at build time / on revalidation only.
 */

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  updatedAt: string;
}

export interface GitHubActivity {
  username: string;
  profileUrl: string;
  repoCount: number;
  languages: Array<{ name: string; count: number }>;
  recentRepos: GitHubRepo[];
  /** Weeks of daily contribution counts, oldest first. Requires GITHUB_TOKEN. */
  contributions: { total: number; weeks: number[][] } | null;
}

interface RestRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

interface ContributionResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{ contributionDays: Array<{ contributionCount: number }> }>;
        };
      };
    } | null;
  };
}

const API = "https://api.github.com";

function headers(token?: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-building-in-public",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function fetchRepos(username: string, token?: string) {
  const res = await fetch(`${API}/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&per_page=100`, {
    headers: headers(token),
  });
  if (!res.ok) return null;
  const repos = (await res.json()) as RestRepo[];
  return repos.filter((repo) => !repo.fork && !repo.private);
}

async function fetchContributions(username: string, token: string) {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { contributionCount } }
        }
      }
    }
  }`;
  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: username } }),
  });
  if (!res.ok) return null;
  const json = (await res.json()) as ContributionResponse;
  const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) return null;
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => week.contributionDays.map((day) => day.contributionCount)),
  };
}

export async function getGitHubActivity(username: string): Promise<GitHubActivity | null> {
  "use cache";
  cacheLife("hours");

  const token = process.env.GITHUB_TOKEN || undefined;

  try {
    const [repos, contributions] = await Promise.all([
      fetchRepos(username, token),
      token ? fetchContributions(username, token) : Promise.resolve(null),
    ]);
    if (!repos) return null;

    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }

    return {
      username,
      profileUrl: `https://github.com/${username}`,
      repoCount: repos.length,
      languages: [...languageCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6),
      recentRepos: repos
        .filter((repo) => !repo.archived)
        .slice(0, 6)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          updatedAt: repo.pushed_at,
        })),
      contributions,
    };
  } catch {
    return null;
  }
}
