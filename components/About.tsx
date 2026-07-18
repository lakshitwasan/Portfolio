"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLens } from "@/lib/lens";
import { about, aboutLead, highlights, profile } from "@/lib/content";

export default function About() {
  const { lens } = useLens();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="border-y border-line bg-panel/70 dark:bg-panel/30">
      <div className="container-page py-20">
        <p className="eyebrow mb-8">About</p>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Narrative */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={lens}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="max-w-2xl font-display text-2xl font-bold leading-snug sm:text-[1.75rem]">
                  {aboutLead[lens]}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{about[lens]}</p>
              </motion.div>
            </AnimatePresence>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {highlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-display text-2xl font-bold text-accent transition-accent sm:text-3xl">
                    {h.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{h.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Facts */}
          <div className="card-surface flex flex-col gap-6 p-6 lg:self-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Currently</p>
              <p className="mt-1 font-medium">Software Engineer — Backend &amp; AI Systems</p>
              <p className="text-sm text-ink-soft">Nebula9.ai · since Aug 2025</p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Education</p>
              <p className="mt-1 font-medium">{profile.education.degree}</p>
              <p className="text-sm text-ink-soft">
                {profile.education.school} · {profile.education.period}
              </p>
              <p className="text-sm text-ink-soft">GPA {profile.education.gpa}</p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Based in</p>
              <p className="mt-1 font-medium">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
