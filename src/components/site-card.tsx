import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export type Site = {
  name: string;
  tagline: string;
  url: string;
  initials: string;
  slug: string;
  about: string;
};

export const SITES: Site[] = [
  {
    name: "Adromaa AD",
    tagline: "Creative digital space featuring games, experiments and projects.",
    url: "https://adromaa-ad.lovable.app/",
    initials: "AD",
    slug: "adromaa-ad",
    about:
      "Adromaa AD (also searched as Adromaa, Adroma or AdromaaAD) is the primary creative brand by Arjun Radaye — a digital space for games, experiments and original projects.",
  },
  {
    name: "Zowari AD",
    tagline: "An interactive digital experience built around creativity and personality.",
    url: "https://zowari.lovable.app/",
    initials: "ZW",
    slug: "zowari-ad",
    about:
      "Zowari AD is an interactive digital experience by Arjun Radaye, built around creativity, personality and playful exploration.",
  },
  {
    name: "Inkveil",
    tagline: "A creative space for discovering and sharing stories.",
    url: "https://inkveil.lovable.app/",
    initials: "IV",
    slug: "inkveil",
    about:
      "Inkveil is a creative space by Arjun Radaye for discovering, writing and sharing stories.",
  },
  {
    name: "Story Hub",
    tagline: "A place to read and explore stories and novels.",
    url: "https://storyhub-ad.lovable.app/",
    initials: "SH",
    slug: "story-hub",
    about:
      "Story Hub is where Arjun Radaye's stories and novels live — a calm place to read and explore original fiction such as Zero Fever and The Rise of Vedhav.",
  },
  {
    name: "Detective AD",
    tagline: "An interactive mystery and detective experience.",
    url: "https://detective-ad.lovable.app/",
    initials: "DA",
    slug: "detective-ad",
    about:
      "Detective AD is an interactive mystery and detective experience by Arjun Radaye, where every clue leads you deeper into the case.",
  },
  {
    name: "Code AD",
    tagline: "A focused space for coding and development.",
    url: "https://code-ad.lovable.app/",
    initials: "CA",
    slug: "code-ad",
    about:
      "Code AD is a focused coding and development space by Arjun Radaye for building, learning and experimenting with code.",
  },
  {
    name: "Magnet Game",
    tagline: "An interactive physics-based magnet game.",
    url: "https://pole-play.lovable.app/",
    initials: "MG",
    slug: "magnet-game",
    about:
      "Magnet Game is an interactive physics-based magnet game by Arjun Radaye — attract, repel and play with magnetic poles.",
  },
];

export function SiteCard({
  site,
  label = "Visit Website",
  className = "",
  active = false,
}: {
  site: Site;
  label?: string;
  className?: string;
  active?: boolean;
}) {
  return (
    <article
      className={`glass-card glass-sheen premium-interaction premium-lift group relative flex h-full flex-col gap-5 rounded-[2rem] p-6 sm:p-8 ${
        active ? "scale-[1.02] shadow-[var(--shadow-float)]" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-4">
        <span className="bg-aurora premium-interaction flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-medium tracking-wide text-foreground shadow-[var(--shadow-soft)] group-hover:rotate-3 group-hover:scale-105">
          {site.initials}
        </span>
        <h3 className="text-2xl sm:text-[1.75rem]">{site.name}</h3>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{site.tagline}</p>

      <a
        href={site.url}
        aria-label={`${label}: ${site.name} (opens in a new tab)`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-aurora premium-interaction mt-auto inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-medium text-foreground shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-float)] hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 active:scale-[0.97]"
      >
        {label}
        <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
      </a>
      <Link
        to="/worlds/$slug"
        params={{ slug: site.slug }}
        className="-mt-2 text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        About {site.name}
      </Link>
    </article>
  );
}

export const WORLD_CHAIN = [
  "story-hub",
  "detective-ad",
  "code-ad",
  "magnet-game",
  "zowari-ad",
  "adromaa-ad",
  "inkveil",
];

export function getSite(slug: string) {
  return SITES.find((s) => s.slug === slug);
}

export function nextSite(slug: string) {
  const i = WORLD_CHAIN.indexOf(slug);
  return getSite(WORLD_CHAIN[(i + 1) % WORLD_CHAIN.length] ?? "");
}

export const STORIES = [
  {
    slug: "zero-fever",
    title: "Zero Fever",
    summary: "An original story written by Arjun Radaye.",
  },
  {
    slug: "the-rise-of-vedhav",
    title: "The Rise of Vedhav",
    summary: "An original story written by Arjun Radaye.",
  },
];
