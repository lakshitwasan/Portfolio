"use client";

import ContactForm from "./ContactForm";
import { useLens } from "@/lib/lens";
import { lensConfig, profile } from "@/lib/content";

export default function Contact() {
  const { lens } = useLens();
  const cfg = lensConfig[lens];

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.githubHandle, href: profile.github },
    { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-panel/70 dark:bg-panel/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[55vh] w-[55vh] rounded-full bg-accent/[0.18] blur-[120px] transition-accent dark:bg-accent/[0.08]"
      />
      <div className="container-page relative scroll-mt-24 py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Let&apos;s build something reliable.
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Open to {cfg.label.toLowerCase()} roles and interesting engineering problems. Send a message
              and it lands straight in my inbox — I usually reply within a day.
            </p>

            <dl className="mt-8 flex flex-col gap-4">
              {links.map((l) => (
                <div key={l.label} className="flex items-baseline gap-4">
                  <dt className="w-20 shrink-0 font-mono text-xs uppercase tracking-wider text-ink-soft">
                    {l.label}
                  </dt>
                  <dd>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-ink transition-colors hover:text-accent"
                    >
                      {l.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline gap-4">
                <dt className="w-20 shrink-0 font-mono text-xs uppercase tracking-wider text-ink-soft">
                  Resume
                </dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href={lensConfig.ai.resumeFile} download className="text-ink transition-colors hover:text-accent">
                    AI Systems ↓
                  </a>
                  <a href={lensConfig.backend.resumeFile} download className="text-ink transition-colors hover:text-accent">
                    Backend ↓
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="card-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
