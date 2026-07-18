import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.title}`;

// Branded share card used for OpenGraph/Twitter previews.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0D12",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#35D6C4" }} />
          <div style={{ color: "#9AA2B0", fontSize: 30, letterSpacing: 2, fontFamily: "monospace" }}>
            {profile.githubHandle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ color: "#35D6C4", fontSize: 30, fontFamily: "monospace" }}>
            Backend &amp; AI Systems Engineer
          </div>
          <div style={{ color: "#E9ECF2", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ color: "#9AA2B0", fontSize: 34, maxWidth: 900, lineHeight: 1.3 }}>
            LLM APIs, RAG pipelines &amp; multi-agent systems — built on scalable, cloud-native backends.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["FastAPI", "LangGraph", "PostgreSQL", "AWS", "RAG"].map((t) => (
            <div
              key={t}
              style={{
                color: "#9AA2B0",
                fontSize: 26,
                fontFamily: "monospace",
                border: "1px solid #222834",
                borderRadius: 999,
                padding: "8px 22px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
