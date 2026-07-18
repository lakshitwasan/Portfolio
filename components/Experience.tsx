import { experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-panel/70 dark:bg-panel/30">
      <div className="container-page scroll-mt-24 py-24">
        <div className="mb-12 flex flex-col gap-3">
          <p className="eyebrow">Track record</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Experience</h2>
        </div>

        <ol className="relative border-l border-line pl-6 md:pl-8">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.company}-${job.period}`} delay={i * 0.05} className="relative pb-12 last:pb-0">
              <span
                className={`absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full md:-left-[calc(2rem+5px)] ${
                  job.current ? "bg-accent ring-4 ring-accent/20" : "bg-line"
                }`}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-bold">{job.role}</h3>
                  <span className="font-mono text-xs text-ink-soft">{job.period}</span>
                </div>
                <p className="text-sm text-ink-soft">
                  {job.company} · {job.location}
                </p>
              </div>

              <ul className="mt-4 flex flex-col gap-2">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {job.stack.map((s) => (
                  <span key={s} className="font-mono text-[11px] text-ink-soft">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
