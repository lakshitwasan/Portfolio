"use client";

import { useLens } from "@/lib/lens";
import { skillGroups } from "@/lib/content";
import Reveal from "./Reveal";

export default function Skills() {
  const { lens } = useLens();

  return (
    <section id="skills" className="container-page scroll-mt-24 py-24">
      <div className="mb-12 flex flex-col gap-3">
        <p className="eyebrow">Toolkit</p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Skills &amp; stack</h2>
        <p className="max-w-2xl text-ink-soft">
          Groups most relevant to your current lens are highlighted.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const emphasized = group.emphasis === lens || group.emphasis === "both";
          return (
            <Reveal as="div" delay={i * 0.05} key={group.title}>
              <div
                className={`h-full rounded-2xl border p-5 transition-accent ${
                  emphasized
                    ? "border-accent/40 bg-accent/[0.07] shadow-card dark:shadow-none"
                    : "border-line bg-panel/60 opacity-80 dark:bg-panel/20"
                }`}
              >
                <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft">
                  {emphasized && <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />}
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-ground/50 px-2.5 py-1 text-xs text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
