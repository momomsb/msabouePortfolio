# Mohamed M'Saboue · AI / Data Engineer Portfolio

Portfolio built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Motion.
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

| File                     | What it controls                                                          |
| ------------------------ | ------------------------------------------------------------------------- |
| `data/profile.ts`        | Name, role, tagline, summary, availability, languages, interests, CV path |
| `data/socials.ts`        | GitHub / LinkedIn / Email links (`null` = hidden)                         |
| `data/experience.ts`     | Experience timeline                                                       |
| `data/projects.ts`       | Projects grid, filters and the featured project                           |
| `data/certifications.ts` | Certifications, filters and the spotlight (`featured: true`)              |
| `data/skills.ts`         | Engineering domains and the tech stack element table                      |
| `data/education.ts`      | Education entries                                                         |
| `data/navigation.ts`     | Navbar links                                                              |

Missing content (empty results, missing links, no CV…) shows a purple **TODO** note in `npm run dev` only. Production never shows placeholders: the empty element is simply hidden.

- **Photo**: `photo` in `data/profile.ts` (file in `public/images/`).
- **CV**: put one PDF per language in `public/cv/` and list them in `cv` in `data/profile.ts`; "Download CV" then offers the French or English version.
- **Projects**: a short presentation, technologies and screenshots only (no dates, no repository links). Put screenshots in `public/projects/<Project>/`, set `image` (cover) and `gallery` (opened in a fullscreen viewer from the card).
- **Certificates**: badges and certificate files go in `public/certifications/` (`image` for a badge, `certificateFile` for the certificate itself: an image shows a preview + "View certificate").
- **Verification links**: paste each link in the `credentialUrl` field of `data/certifications.ts`; the "Verify credential" button appears automatically.

Interface strings (buttons, section titles, form messages…) live in `i18n/dictionaries/en.ts` and `fr.ts`. TypeScript enforces that both files have the same keys.

## Languages and theme

- Every page exists at `/en/…` and `/fr/…`. `proxy.ts` sends `/` to the visitor's saved language (cookie), else the browser language, else English.
- The EN/FR switch reloads the same page in the other language, on the section being read.
- The dark/light switch is saved in `localStorage` and applied before first paint (no flash). Light-theme colors are in `app/globals.css` under `:root[data-theme="light"]`.

## Environment variables

Copy `.env.example` to `.env.local`. All keys are optional; the site works without them.

| Variable                                                   | Scope  | Effect                                                                                         |
| ---------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                     | public | Canonical URL for metadata, sitemap, JSON-LD (falls back to Vercel's production URL)           |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | server | Contact form delivery via Resend. Without them, the form tells visitors it isn't connected yet |

Secrets are only read in server code (`app/api/*`, `lib/email.ts`). `.env*` files are git-ignored except `.env.example`.

## Architecture

```
app/
  [lang]/               localized pages (root layout, home, OG image)
  api/contact           contact form (validation, honeypot, rate limit, Resend)
  global-not-found.tsx  bilingual 404 for unknown URLs
components/
  layout/               navbar, theme & language toggles, mobile menu, footer
  sections/             one component per home section
  transitions/          scroll engine (Lenis + scroll spy), section transitions, reveals, parallax
  projects/ certifications/ contact/
  ui/                   design-system primitives (Button, Section, Reveal, Tag…)
data/                   all editable content (bilingual)
i18n/                   locales, dictionaries, locale helpers
lib/                    content helpers, SEO, theme, tech logos, validation, rate limiting
proxy.ts                locale redirect for "/" and unprefixed paths
types/                  content and API contracts
```

Design tokens (colors, fonts, display size, animations) are defined in `app/globals.css` under `@theme`.

## Deploying to Vercel

1. Push to GitHub and import the repository in Vercel (framework preset: Next.js).
2. Add the environment variables you need in Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` once you have a custom domain.

Pages are fully static; API routes run on demand.
