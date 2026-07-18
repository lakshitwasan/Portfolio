import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-ink-soft">
          © {year} {profile.name} · Built with Next.js, deployed on AWS.
        </p>
        <div className="flex gap-5 text-sm">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-ink-soft transition-colors hover:text-accent">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-soft transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-ink-soft transition-colors hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
