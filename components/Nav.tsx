"use client";

import { useEffect, useState } from "react";
import LensToggle from "./LensToggle";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/lib/content";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "border-b border-line bg-ground/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2 font-display text-base font-bold">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent transition-transform group-hover:rotate-45" />
          <span>{profile.name}</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LensToggle size="sm" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
