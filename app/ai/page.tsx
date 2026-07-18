import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Site from "@/components/Site";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} — AI Systems Engineer`,
  description: "AI systems engineer: LLM-powered APIs, RAG pipelines and multi-agent systems in production.",
  alternates: { canonical: "/ai" },
};

export default function AiPage() {
  return (
    <Providers initialLens="ai">
      <Site />
    </Providers>
  );
}
