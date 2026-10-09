import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

const en = getDictionary("en").notFound;
const fr = getDictionary("fr").notFound;

/** 404 for URLs matching no route at all; bilingual since the locale is unknown here. */
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <main className="relative isolate flex min-h-svh items-center overflow-hidden px-4">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-edges" />
          <div className="mx-auto max-w-xl text-center">
            <p className="label-mono text-accent">{en.tag}</p>
            <h1 className="mt-6 text-5xl font-medium tracking-tight text-fg sm:text-6xl">{en.title}</h1>
            <p className="mt-4 text-lg text-muted" lang="fr">
              {fr.title}
            </p>
            <div className="mt-10 flex justify-center gap-3">
              <Link href="/en" className="rounded-full bg-accent px-6 py-3 font-medium text-ink">
                {en.back}
              </Link>
              <Link href="/fr" lang="fr" className="rounded-full border border-line-strong px-6 py-3 font-medium text-fg">
                {fr.back}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
