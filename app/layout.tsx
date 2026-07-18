import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import ThemeProviders from "@/components/ThemeProviders";
import { profile, siteUrl } from "@/lib/content";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Lakshit Wasan builds production backend and AI systems — LLM-powered APIs, RAG pipelines, multi-agent systems and scalable microservices on cloud infrastructure.",
  keywords: [
    "Lakshit Wasan",
    "Backend Engineer",
    "AI Engineer",
    "LLMOps",
    "RAG",
    "FastAPI",
    "Multi-agent systems",
    "Software Engineer",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.title}`,
    description:
      "Production backend and AI systems: LLM APIs, RAG pipelines, multi-agent systems and scalable microservices.",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: "Production backend and AI systems engineer.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0D12" },
    { media: "(prefers-color-scheme: light)", color: "#FBFBFA" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-ground text-ink antialiased">
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
