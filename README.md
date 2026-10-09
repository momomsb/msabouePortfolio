# Mohamed M'Saboue · AI / Data Engineer Portfolio

"Digital Lab" portfolio built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run lint       # ESLint
npm run typecheck  # route types + tsc
npm run format     # Prettier (+ Tailwind class sorting)
```

## Editing content

All content lives in `data/`. Components never hold content.

| File                     | What it controls                                                            |
| ------------------------ | --------------------------------------------------------------------------- |
| `data/profile.ts`        | Name, role, tagline, summary, availability, languages, interests, CV path   |
| `data/socials.ts`        | GitHub / LinkedIn / Email links (`null` = hidden) and the GitHub username   |
| `data/experience.ts`     | Experience timeline                                                         |
| `data/projects.ts`       | Projects grid, filters and the featured project                             |
| `data/case-studies.ts`   | Long-form case studies (`/projects/[slug]`) and their architecture diagrams |
| `data/certifications.ts` | Certifications, filters and the spotlight (`featured: true`)                |
| `data/skills.ts`         | Engineering domains and the tech stack element table                        |
| `data/education.ts`      | Education entries                                                           |
| `data/navigation.ts`     | Navbar links                                                                |

Missing content (empty results, missing links, no CV…) shows a purple **TODO** note in `npm run dev` only. Production never shows placeholders: the empty element is simply hidden.

- **Photo**: `photo` in `data/profile.ts` (file in `public/images/`).
- **CV**: put the PDF in `public/cv/` and set `cvPath` in `data/profile.ts` to show "Download CV".
- **Project images**: put them in `public/projects/` and set `image`. Without an image, a generated visual is shown.
- **Certificates**: logos and PDFs go in `public/certifications/` (`image`, `certificateFile`).

The "Ask my AI" assistant builds its knowledge from the same files, so it updates automatically.

## Environment variables

Copy `.env.example` to `.env.local`. All keys are optional; the site works without them.

| Variable                                                   | Scope  | Effect                                                                                                              |
| ---------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                     | public | Canonical URL for metadata, sitemap, JSON-LD (falls back to Vercel's production URL)                                |
| `ANTHROPIC_API_KEY`                                        | server | Enables Claude for "Ask my AI". Without it, the assistant runs in demo mode with deterministic answers from `data/` |
| `ANTHROPIC_MODEL`                                          | server | Model override (default `claude-opus-5-5`)                                                                          |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | server | Contact form delivery via Resend. Without them, the form tells visitors it isn't connected yet                      |
| `GITHUB_TOKEN`                                             | server | Adds the contribution calendar to "Building in public" and raises GitHub API limits                                 |

Secrets are only read in server code (`app/api/*`, `lib/chat/claude.ts`, `lib/email.ts`, `lib/github.ts`). `.env*` files are git-ignored except `.env.example`.

## Architecture

```
app/                    routes, metadata, sitemap, robots, OG image, API routes
  api/chat              "Ask my AI" (Claude or demo responder), rate-limited
  api/contact           contact form (validation, honeypot, rate limit, Resend)
  projects/[slug]       case study pages (statically generated)
components/
  layout/               navbar, mobile menu, footer
  sections/             one component per home section
  projects/ certifications/ contact/ ai/
  ui/                   design-system primitives (Button, Section, Reveal, Tag…)
data/                   all editable content
lib/                    content helpers, SEO, GitHub, validation, rate limiting, chat
types/                  content and API contracts
```

Design tokens (colors, fonts, display size, animations) are defined in `app/globals.css` under `@theme`.

## Deploying to Vercel

1. Push to GitHub and import the repository in Vercel (framework preset: Next.js).
2. Add the environment variables you need in Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` once you have a custom domain.

The home page is static and revalidates hourly (for GitHub data); API routes run on demand.
