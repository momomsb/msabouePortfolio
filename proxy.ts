import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

/** Saved choice first, then the browser's Accept-Language, then the default. */
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved)) return saved;

  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { language: tag.toLowerCase().split("-")[0], q: quality ? Number(quality) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => hasLocale(entry.language));

  return (preferred?.language as Locale | undefined) ?? defaultLocale;
}

/** Redirects locale-less paths ("/", "/projects/x") to their localized version. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
