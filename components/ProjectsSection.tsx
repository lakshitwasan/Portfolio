"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLens } from "@/lib/lens";
import { projectsForLens, projectDescription, lensConfig, type Project, type Lens } from "@/lib/content";

function ProjectCard({ project, lens }: { project: Project; lens: Lens }) {
  const reduce = useReducedMotion();
  const featured = project.featuredLens === lens;

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`card-surface group relative flex flex-col p-6 transition-colors hover:border-accent/50 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold leading-tight">{project.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>
        </div>
        {featured && (
          <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
            Featured
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">{projectDescription(project, lens)}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.metrics.map((m) => (
          <span key={m.label} className="metric-chip">
            <span className="font-semibold text-success">{m.value}</span>
            {m.label}
          </span>
        ))}
      </div>

      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-[11px] text-ink-soft">
            {s}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { lens } = useLens();
  const list = projectsForLens(lens);

  return (
    <section id="work" className="relative overflow-hidden scroll-mt-24 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-accent/[0.16] blur-[120px] transition-accent dark:bg-accent/[0.06]"
      />
      <div className="container-page relative">
        <div className="mb-12 flex flex-col gap-3">
        <p className="eyebrow">Selected work</p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Selected work for <span className="text-accent transition-accent">{lensConfig[lens].label}</span>
        </h2>
        <p className="max-w-2xl text-ink-soft">
          Prioritized and described for a {lensConfig[lens].label.toLowerCase()} audience — switch lenses to
          re-rank them. Most were built in client and production environments, so the source is proprietary;
          I&apos;m always happy to walk through the architecture and trade-offs.
        </p>
      </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.slug} project={p} lens={lens} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
