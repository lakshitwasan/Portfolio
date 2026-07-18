/**
 * Single source of truth for all portfolio content, derived from Lakshit's two
 * résumés (AI Systems + Backend SWE). Everything the UI renders comes from here so
 * the two "lenses" stay in sync and nothing is hard-coded in components.
 */

export type Lens = "ai" | "backend";

export const LENSES: Lens[] = ["ai", "backend"];

/** Canonical site URL. Override per environment with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lakshitwasan.dev";

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  education: {
    degree: string;
    school: string;
    period: string;
    gpa: string;
  };
}

export const profile: Profile = {
  name: "Lakshit Wasan",
  title: "Backend & AI Systems Engineer",
  location: "New Delhi, India",
  email: "lakshitwasan31@gmail.com",
  github: "https://github.com/lakshitwasan",
  githubHandle: "lakshitwasan",
  linkedin: "https://www.linkedin.com/in/lakshitwasan",
  linkedinHandle: "lakshitwasan",
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    school: "BML Munjal University, Haryana",
    period: "2021 – 2025",
    gpa: "8.4 / 10.0",
  },
};

/** Per-lens framing: what the hero says, which résumé to offer, hero-graph labels. */
export interface LensConfig {
  key: Lens;
  label: string;
  /** Short label used inside toggles / chips. */
  short: string;
  role: string;
  headline: string;
  headlineLead: string;
  sub: string;
  /** Node labels drawn in the hero graph for this lens. */
  graphNodes: string[];
  resumeFile: string;
  resumeLabel: string;
}

export const lensConfig: Record<Lens, LensConfig> = {
  ai: {
    key: "ai",
    label: "AI Systems",
    short: "AI",
    role: "AI Systems & LLMOps Engineer",
    headlineLead: "I build AI systems that",
    headline: "reason, retrieve & route.",
    sub: "LLM-powered APIs, RAG pipelines and multi-agent systems in production — from prompt and retrieval design to routing, safety layers and observability.",
    graphNodes: ["agent", "planner", "retriever", "router", "vector db", "llm", "tool", "memory"],
    resumeFile: "/resume/Lakshit_Wasan_AI_Systems.pdf",
    resumeLabel: "AI Systems resume",
  },
  backend: {
    key: "backend",
    label: "Backend / Fullstack",
    short: "Backend",
    role: "Backend & Distributed Systems Engineer",
    headlineLead: "I build backend systems that",
    headline: "scale & stay up.",
    sub: "Production microservices and distributed APIs — owned end-to-end from system design and API contracts to containerized deployment, monitoring and performance.",
    graphNodes: ["api", "gateway", "service", "queue", "worker", "postgres", "cache", "aws"],
    resumeFile: "/resume/Lakshit_Wasan_Backend_SWE.pdf",
    resumeLabel: "Backend SWE resume",
  },
};

/** Lead line — "what I am" — mirrors the résumé profile's opening sentence. */
export const aboutLead: Record<Lens, string> = {
  ai: "Software engineer specializing in backend architecture and AI-enabled systems.",
  backend: "Software engineer specializing in backend systems, distributed APIs and cloud-native applications.",
};

/** Profile narrative — intro + "what I do" — one per lens, shown in the About section. */
export const about: Record<Lens, string> = {
  ai: "I'm Lakshit Wasan, based in New Delhi. I build scalable microservices, LLM-powered APIs, RAG pipelines and multi-agent systems on cloud infrastructure — and I own them end to end, from system design and API contracts through deployment, observability and performance. What I enjoy most is turning ambiguous product ideas into services that stay accurate, fast and safe once real users hit them.",
  backend: "I'm Lakshit Wasan, based in New Delhi. I build and own production services end to end — from system design and API contracts through deployment, monitoring and performance tuning — on a strong foundation of microservices, async processing and scalable database design. What I care about most is systems that stay reliable and fast as they grow, and code that the next engineer can actually reason about.",
};

/** Credibility stats shown alongside the About narrative. */
export const highlights: { value: string; label: string }[] = [
  { value: "99.9%", label: "uptime on production systems I own" },
  { value: "3+", label: "client platforms shipped at Nebula9.ai" },
  { value: "20–40%", label: "latency & manual-ops time reduced" },
];

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** Lenses this project appears under. */
  lenses: Lens[];
  /** Which lens it leads for (sorted first when that lens is active). */
  primary: Lens;
  stack: string[];
  metrics: Metric[];
  /** Base description; per-lens overrides reframe the same work for each audience. */
  description: string;
  lensDescription?: Partial<Record<Lens, string>>;
  links?: { label: string; href: string }[];
  /** Rendered as the large "featured" card, but only when this lens is active. */
  featuredLens?: Lens;
}

export const projects: Project[] = [
  {
    slug: "agentzero",
    name: "AgentZero",
    tagline: "Autonomous AI coding agent",
    lenses: ["ai", "backend"],
    primary: "ai",
    featuredLens: "ai",
    stack: ["Python", "Multi-Agent", "Tree-sitter", "Vector Search", "Docker", "LLM Routing"],
    metrics: [
      { value: "symbol-level", label: "code retrieval" },
      { value: "self-healing", label: "execution loop" },
      { value: "sandboxed", label: "Docker isolation" },
    ],
    description:
      "A local-first autonomous coding agent built on a multi-agent state machine spanning planning, execution and validation. AST-aware semantic retrieval (Tree-sitter + vector DB) gives high-precision code context at the symbol level, and a self-healing execution loop runs inside a secure Docker sandbox with adaptive model routing for reliability and cost.",
    lensDescription: {
      backend:
        "A local-first coding agent architected as a multi-agent state machine (planning → execution → validation). Built around a secure Docker sandbox, symbol-level code indexing over a vector DB, and an adaptive model-routing layer that balances reliability against cost.",
    },
  },
  {
    slug: "conversational-analytics",
    name: "Conversational Analytics Platform",
    tagline: "Natural-language querying over Snowflake",
    lenses: ["ai"],
    primary: "ai",
    stack: ["Snowflake Cortex", "Cortex Agents", "Streamlit", "LLM Routing", "Prompt Engineering"],
    metrics: [
      { value: "5", label: "strategy agents" },
      { value: "multi-domain", label: "NL querying" },
    ],
    description:
      "A conversational analytics platform for natural-language interaction over multi-domain marketing & retail datasets on Snowflake. Strategy-specific LLM agents sit over semantic views (UMM, MTA, Sonic, Retail, EDM) with intent routing and dynamic tool selection, turning simulation and optimization workflows into conversational execution — deployed via Streamlit on Snowflake.",
  },
  {
    slug: "financial-data-platform",
    name: "AI-Driven Financial Data Platform",
    tagline: "Production RAG for real-time financial insight",
    lenses: ["ai", "backend"],
    primary: "backend",
    stack: ["FastAPI", "PostgreSQL", "RAG Pipelines", "Vector DBs", "React"],
    metrics: [
      { value: "−25%", label: "query latency" },
      { value: "hybrid", label: "search retrieval" },
    ],
    description:
      "A production-grade RAG system delivering real-time financial insight: ingestion, vector indexing, hybrid search and LLM-orchestration APIs behind a FastAPI backend with a React frontend.",
    lensDescription: {
      ai: "A production RAG system for real-time financial insight — ingestion, vector indexing, hybrid retrieval and LLM-orchestration APIs. Tuned embedding retrieval and batching to cut model-query latency by ~25%.",
      backend:
        "A FastAPI + React platform powering a GenAI chatbot for real-time financial data. Ingestion and retrieval APIs combine insights across multiple databases for scenario-based analysis; upgraded from prototype to production architecture, cutting query latency by ~25%.",
    },
  },
  {
    slug: "event-logistics",
    name: "Enterprise Event Logistics Platform",
    tagline: "Microservices for large-scale event operations",
    lenses: ["backend", "ai"],
    primary: "backend",
    featuredLens: "backend",
    stack: ["FastAPI", "PostgreSQL", "Microservices", "Docker", "AWS"],
    metrics: [
      { value: "0", label: "downtime deploys" },
      { value: "−30%", label: "debugging time" },
    ],
    description:
      "A microservice backend for large-scale event logistics, with independently scalable booking and user services and zero-downtime releases. Secure FastAPI REST APIs, optional natural-language schedule querying via LLM APIs, and AWS deployment with observability tooling that cut debugging time by 30%.",
    lensDescription: {
      ai: "A microservice backend for large-scale event logistics with an optional natural-language interface — LLM APIs let operators query schedules conversationally over independently scalable booking and user services.",
    },
  },
  {
    slug: "ranking-platform",
    name: "Analytics & Ranking Platform",
    tagline: "Deterministic, auditable athlete rankings",
    lenses: ["backend"],
    primary: "backend",
    stack: ["FastAPI", "PostgreSQL", "Celery", "Docker"],
    metrics: [
      { value: "−50%", label: "ranking time" },
      { value: "100s", label: "of athletes" },
    ],
    description:
      "A backend that automates official athlete rankings for a sports federation with full transparency and auditability. A rule engine converts complex ranking criteria into deterministic algorithms over an optimized PostgreSQL schema built for fast recomputation, with Celery async processing cutting generation time by ~50%.",
  },
];

export interface SkillGroup {
  title: string;
  /** Lens this group most strongly signals; used to emphasize under the active lens. */
  emphasis: Lens | "both";
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI Systems & LLMOps",
    emphasis: "ai",
    items: [
      "LangChain",
      "LangGraph",
      "Google ADK",
      "Snowflake Cortex",
      "Autogen",
      "RAG pipelines",
      "Multi-agent systems",
      "Prompt engineering",
      "A2A protocols",
    ],
  },
  {
    title: "Vector Search & Retrieval",
    emphasis: "ai",
    items: ["FAISS", "PGVector", "Pinecone", "ChromaDB", "Hybrid retrieval", "Embedding generation"],
  },
  {
    title: "Backend & APIs",
    emphasis: "backend",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Microservices",
      "Async processing",
      "Caching",
      "Celery",
    ],
  },
  {
    title: "Data",
    emphasis: "both",
    items: ["PostgreSQL", "MSSQL", "MongoDB", "Snowflake"],
  },
  {
    title: "Cloud & DevOps",
    emphasis: "backend",
    items: ["Docker", "AWS", "GCP", "CI/CD", "GitHub Actions"],
  },
  {
    title: "Languages & Frontend",
    emphasis: "both",
    items: ["Python", "JavaScript", "C++", "React.js"],
  },
];

export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
}

export const experience: Job[] = [
  {
    role: "Software Engineer — Backend & AI Systems",
    company: "Nebula9.ai",
    location: "Gurgaon, India",
    period: "Aug 2025 – Present",
    current: true,
    points: [
      "Design and deploy backend services powering LLM-driven enterprise workflows, cutting manual operations time 30–40% across 3+ client platforms.",
      "Own multi-tenant delivery end-to-end — HLD/LLD, API contracts and staged rollouts with observability tooling holding 99.9% uptime.",
      "Built modular AI service layers (embeddings, vector indexing, hybrid search) that improved retrieval accuracy and cut inference latency ~20%.",
      "Shipped conversational analytics agents over Snowflake semantic views using Cortex Agents and LLM routing.",
    ],
    stack: ["FastAPI", "PostgreSQL", "LangGraph", "Snowflake Cortex", "Docker", "AWS"],
  },
  {
    role: "Software Engineer Intern — AI-Enabled Backend",
    company: "Nebula9.ai",
    location: "Gurgaon, India",
    period: "Oct 2024 – Jul 2025",
    points: [
      "Migrated a legacy MERN architecture to FastAPI + PostgreSQL, improving performance and maintainability ~35% and enabling async model-serving.",
      "Built ingestion, embedding-generation and document-chunking pipelines for vector search, improving retrieval throughput and relevance.",
      "Developed secure REST layers abstracting LLM calls, enabling real-time insights for financial and operational dashboards.",
    ],
    stack: ["FastAPI", "PostgreSQL", "LangChain", "Docker", "AWS", "MERN"],
  },
  {
    role: "Web Developer Intern",
    company: "Coding Blocks",
    location: "Delhi, India",
    period: "Jun 2022 – Aug 2022",
    points: [
      "Delivered 6+ production applications with secure authentication, optimized data models and MongoDB query efficiency improved up to 25%.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
  },
];

export interface Publication {
  title: string;
  kind: string;
  description: string;
  link?: { label: string; href: string };
}

export const publications: Publication[] = [
  {
    title: "Explainable ML for Peptide Therapeutics",
    kind: "Peer-reviewed publication",
    description:
      "Co-authored a peer-reviewed study presenting an interpretable ML framework for identifying antimicrobial peptide candidates from physicochemical properties, powering the Pred-AHCP web server for therapeutic peptide design.",
    link: {
      label: "Read the paper — J. Chem. Inf. Model.",
      href: "https://pubs.acs.org/doi/full/10.1021/acs.jcim.4c00900",
    },
  },
  {
    title: "Natural Language Processing with Classification & Vector Spaces",
    kind: "Certification — DeepLearning.AI",
    description: "Foundational NLP: text classification, vector-space models and word embeddings.",
  },
  {
    title: "Introduction to Artificial Intelligence (AI)",
    kind: "Certification — IBM",
    description: "Core AI concepts, applications and the modern ML landscape.",
  },
];

/**
 * Explicit display order per lens so the most relevant projects lead. Backend leads
 * with the strongest pure-backend work (microservices, async ranking); AI leads with
 * AgentZero. Slugs not listed fall to the end.
 */
export const lensProjectOrder: Record<Lens, string[]> = {
  ai: ["agentzero", "conversational-analytics", "financial-data-platform", "event-logistics"],
  backend: ["event-logistics", "ranking-platform", "financial-data-platform", "agentzero"],
};

/** Projects for a lens, in the curated per-lens order. */
export function projectsForLens(lens: Lens): Project[] {
  const order = lensProjectOrder[lens];
  const rank = (slug: string) => {
    const i = order.indexOf(slug);
    return i === -1 ? order.length : i;
  };
  return projects
    .filter((p) => p.lenses.includes(lens))
    .sort((a, b) => rank(a.slug) - rank(b.slug));
}

export function projectDescription(p: Project, lens: Lens): string {
  return p.lensDescription?.[lens] ?? p.description;
}
