"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroGraph from "./HeroGraph";
import { useLens } from "@/lib/lens";
import { lensConfig, profile } from "@/lib/content";

export default function Hero() {
  const { lens } = useLens();
  const reduce = useReducedMotion();
  const cfg = lensConfig[lens];

  const swap = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ambient accent glow — gives both themes depth behind the graph. */}
        <div className="absolute right-[-15%] top-[-20%] h-[75vh] w-[75vh] rounded-full bg-accent/[0.12] blur-[130px] transition-accent" />
        <div className="absolute bottom-[-25%] left-[-10%] h-[45vh] w-[45vh] rounded-full bg-accent/[0.06] blur-[120px] transition-accent" />
        <HeroGraph lens={lens} />
      </div>

      <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.p key={cfg.role} {...swap} className="eyebrow mb-6">
              {profile.name} · {cfg.role}
            </motion.p>
          </AnimatePresence>

          <h1 className="font-display text-[clamp(2.4rem,7vw,4.75rem)] font-extrabold leading-[1.02]">
            <span className="block text-ink-soft">{cfg.headlineLead}</span>
            <AnimatePresence mode="wait">
              <motion.span key={cfg.headline} {...swap} className="block text-accent transition-accent">
                {cfg.headline}
              </motion.span>
            </AnimatePresence>
          </h1>

          <AnimatePresence mode="wait">
            <motion.p key={cfg.sub} {...swap} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              {cfg.sub}
            </motion.p>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ground transition-accent hover:opacity-90"
            >
              View work
            </a>
            <AnimatePresence mode="wait">
              <motion.a
                key={cfg.resumeFile}
                {...swap}
                href={cfg.resumeFile}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {cfg.resumeLabel}
                <span className="font-mono text-xs text-ink-soft">↓ PDF</span>
              </motion.a>
            </AnimatePresence>
          </div>

          <p className="mt-6 font-mono text-xs text-ink-soft">
            One engineer, two lenses — use the toggle to switch focus between AI and backend.
          </p>
        </div>
      </div>
    </section>
  );
}
