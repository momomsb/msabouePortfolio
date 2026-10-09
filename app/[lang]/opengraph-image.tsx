import { ImageResponse } from "next/og";
import { profile as profileData } from "@/data/profile";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { getContent } from "@/lib/content";

export const alt = `${profileData.name}, AI / Data Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { profile } = getContent(hasLocale(lang) ? lang : defaultLocale);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#05070a",
        backgroundImage:
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        color: "#e7edf4",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 6, color: "#2de2ff" }}>
        <div style={{ width: 12, height: 12, background: "#2de2ff", borderRadius: 2 }} />
        {profile.role.toUpperCase()} · DIGITAL LAB
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>{profile.firstName.toUpperCase()}</div>
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95, color: "#9aa6b6" }}>
          {profile.lastName.toUpperCase()}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#9aa6b6" }}>
        <span>{profile.tagline}</span>
        <span style={{ color: "#e7edf4" }}>{profile.location}</span>
      </div>
    </div>,
    size,
  );
}
