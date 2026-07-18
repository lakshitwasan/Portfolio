import { publications } from "@/lib/content";
import Reveal from "./Reveal";

export default function Publications() {
  return (
    <section id="publications" className="container-page scroll-mt-24 py-24">
      <div className="mb-12 flex flex-col gap-3">
        <p className="eyebrow">Beyond shipping</p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Publications &amp; certifications</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {publications.map((pub, i) => (
          <Reveal as="article" key={pub.title} delay={i * 0.05} className="h-full">
            <div className="card-surface flex h-full flex-col p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{pub.kind}</p>
              <h3 className="mt-2 font-display text-lg font-bold leading-tight">{pub.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pub.description}</p>
              {pub.link && (
                <a
                  href={pub.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {pub.link.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
