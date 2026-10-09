# Mohamed M'Saboue · AI / Data Engineer Portfolio

"Digital Lab" portfolio built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Motion.
Bilingual (English / French) with a dark and a light theme.

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

**Bilingual text:** every text field is either a plain string (identical in both languages, e.g. a tool name) or an object with one value per language:

```ts
title: { en: "Internal web application for meeting management", fr: "Application web interne de gestion des réunions" },
```

| File                     | What it controls                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `data/profile.ts`        | Name, role, tagline, summary, availability, languages, interests, CV path                                      |
| `data/socials.ts`        | GitHub / LinkedIn / Email links (`null` = hidden) and the GitHub username                                      |
| `data/experience.ts`     | Experience timeline                                                                                            |
| `data/projects.ts`       | Projects grid, filters and the featured project                                                                |
| `data/case-studies.ts`   | Case studies (`/projects/[slug]`): ordered sections (text, features, architecture, stack, indicators, gallery) |
| `data/certifications.ts` | Certifications, filters and the spotlight (`featured: true`)                                                   |
| `data/skills.ts`         | Engineering domains and the tech stack element table                                                           |
| `data/education.ts`      | Education entries                                                                                              |
| `data/navigation.ts`     | Navbar links                                                                                                   |

Missing content (empty results, missing links, no CV…) shows a purple **TODO** note in `npm run dev` only. Production never shows placeholders: the empty element is simply hidden.

- **Photo**: `photo` in `data/profile.ts` (file in `public/images/`).
- **CV**: put the PDF in `public/cv/` and set `cvPath` in `data/profile.ts` to show "Download CV".
- **Project images**: put them in `public/projects/<Project>/`, set `image` (cover) and optionally `gallery` (screenshots shown in the case study with a fullscreen viewer). Without an image, a generated visual is shown.
- **Certificates**: badges and certificate files go in `public/certifications/` (`image` for a badge, `certificateFile` for the certificate itself: an image shows a preview + "View certificate").
- **Verification links**: paste each link in the `credentialUrl` field of `data/certifications.ts`; the "Verify credential" button appears automatically.

The "Ask my AI" assistant builds its knowledge from the same files, so it updates automatically.

Interface strings (buttons, section titles, form messages…) live in `i18n/dictionaries/en.ts` and `fr.ts`. TypeScript enforces that both files have the same keys.

## Languages and theme

- Every page exists at `/en/…` and `/fr/…`. `proxy.ts` sends `/` to the visitor's saved language (cookie), else the browser language, else English.
- The EN/FR switch reloads the same page in the other language, on the section being read.
- The dark/light switch is saved in `localStorage` and applied before first paint (no flash). Light-theme colors are in `app/globals.css` under `:root[data-theme="light"]`.

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
app/
  [lang]/               localized pages (root layout, home, case studies, OG image)
  api/chat              "Ask my AI" (Claude or demo responder), rate-limited
  api/contact           contact form (validation, honeypot, rate limit, Resend)
  global-not-found.tsx  bilingual 404 for unknown URLs
components/
  layout/               navbar, theme & language toggles, mobile menu, footer
  sections/             one component per home section
  projects/ certifications/ contact/ ai/
  ui/                   design-system primitives (Button, Section, Reveal, Tag…)
data/                   all editable content (bilingual)
i18n/                   locales, dictionaries, locale helpers
lib/                    content helpers, SEO, GitHub, theme, validation, rate limiting, chat
proxy.ts                locale redirect for "/" and unprefixed paths
types/                  content and API contracts
```

Design tokens (colors, fonts, display size, animations) are defined in `app/globals.css` under `@theme`.

## Deploying to Vercel

1. Push to GitHub and import the repository in Vercel (framework preset: Next.js).
2. Add the environment variables you need in Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` once you have a custom domain.

The home page is static and revalidates hourly (for GitHub data); API routes run on demand.
