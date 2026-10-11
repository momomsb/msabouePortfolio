import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AmbientBackground } from "@/components/transitions/ambient-background";
import { ScrollProvider } from "@/components/transitions/scroll-provider";
import { SectionIndicator } from "@/components/transitions/section-indicator";
import { MotionProvider } from "@/components/ui/motion-provider";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocale } from "@/i18n/server";
import { getContent } from "@/lib/content";
import { getPersonJsonLd, serializeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const { profile } = getContent(locale);
  const dict = getDictionary(locale);
  const title = `${profile.name} | ${profile.role}`;
  const description = `${profile.summary} ${dict.meta.siteDescription}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | ${profile.name}` },
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    keywords: [profile.name, profile.role, ...profile.interests, "Portfolio", "ENSAJ", "Data Engineering", "AI"],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fr: "/fr", "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      type: "profile",
      url: `/${locale}`,
      siteName: profile.name,
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    verification: { google: "vsSJm0ehRMsOtsOLI-xr4xXSk7ZyePt5N-FxHNr0ZlA" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-theme={DEFAULT_THEME}
      // The inline script may switch data-theme before hydration.
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div id="top" />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {dict.common.skipToContent}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getPersonJsonLd(locale)) }} />
        <LocaleProvider locale={locale}>
          <MotionProvider>
            <ScrollProvider>
              <AmbientBackground />
              <Navbar />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <Footer />
              <SectionIndicator />
            </ScrollProvider>
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
