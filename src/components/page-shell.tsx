import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LightField } from "@/components/light-field";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITES, STORIES } from "@/components/site-card";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Worlds", to: "/worlds" },
  { label: "Stories", to: "/stories" },
  { label: "About", to: "/about" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 text-sm sm:grid-cols-3">
        <div>
          <p className="font-display text-lg tracking-[0.22em]">NEXA-ORBIT</p>
          <p className="mt-3 text-muted-foreground">
            Explore Every World. From One Orbit. The Nexahub of Arjun Radaye and Adromaa AD.
          </p>
        </div>
        <nav aria-label="Worlds">
          <p className="mb-3 font-medium">Worlds</p>
          <ul className="space-y-2 text-muted-foreground">
            {SITES.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/worlds/$slug"
                  params={{ slug: s.slug }}
                  className="hover:text-foreground"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="More">
          <p className="mb-3 font-medium">More</p>
          <ul className="space-y-2 text-muted-foreground">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            {STORIES.map((s) => (
              <li key={s.slug}>
                <Link to="/stories" hash={s.slug} className="hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LightField />
      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-8 sm:pt-6">
        <nav className="glass-card mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-2xl px-3 py-2.5 sm:px-6">
          <Link to="/" className="font-display text-sm tracking-[0.26em] sm:text-base">
            NEXA·ORBIT
          </Link>
          <div className="flex items-center gap-0.5 sm:gap-2">
            {LINKS.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-foreground" }}
                className="rounded-xl px-2 py-2 text-xs font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground sm:px-3 sm:text-sm"
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-5 pt-14 pb-24 sm:px-8 sm:pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
