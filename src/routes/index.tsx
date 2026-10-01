import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { applyLightMotion } from "@/lib/motion";
import { OrbitShowcase } from "@/components/orbit-showcase";
import { LightField } from "@/components/light-field";
import { InstallAppButton } from "@/components/install-app-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorldDiscovery } from "@/components/world-discovery";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/page-shell";
import { SITES } from "@/components/site-card";
import { PERSON_LD, SITE_URL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "NEXA-ORBIT (Nexahub) — Every World by Arjun Radaye & Adromaa AD",
      description:
        "NEXA-ORBIT is the central hub for Arjun Radaye's websites: Adromaa AD, Story Hub, Detective AD, Code AD, Magnet Game, Zowari AD and Inkveil.",
      jsonLd: [
        {
          "@type": "WebSite",
          name: "NEXA-ORBIT",
          alternateName: ["NexaOrbit", "Nexahub", "NEXA ORBIT"],
          url: `${SITE_URL}/`,
          creator: PERSON_LD,
        },
        {
          "@type": "ItemList",
          name: "Worlds connected by NEXA-ORBIT",
          itemListElement: SITES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `${SITE_URL}/worlds/${s.slug}`,
          })),
        },
      ],
    }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#explore" },
  { label: "Worlds", href: "#worlds" },
  { label: "About", href: "#about" },
];

function Index() {
  useEffect(() => {
    applyLightMotion();
  }, []);

  return (
    <main id="home" className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden="true"
        className="page-loader fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        <div className="relative flex size-24 items-center justify-center">
          <span className="loader-orbit absolute inset-0 rounded-full border border-champagne">
            <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-skin" />
          </span>
          <span className="font-display text-xl tracking-[0.14em]">NEXA</span>
        </div>
      </div>
      <LightField />

      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-8 sm:pt-6">
        <nav className="glass-card premium-interaction mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-2xl px-3 py-2.5 hover:shadow-[var(--shadow-glass-hover)] sm:gap-3 sm:px-6">
          <span className="logo-breathe font-display text-sm tracking-[0.26em] sm:text-base">
            NEXA·ORBIT
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-1 md:flex md:gap-2">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="premium-interaction rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:-translate-y-0.5 hover:bg-accent/60 hover:text-foreground active:translate-y-0 active:scale-[0.97] sm:text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <MobileNavigation />
            <ThemeToggle />
            <InstallAppButton />
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-16 pb-24 text-center sm:px-8 sm:pt-24 lg:pt-32 lg:pb-28">
        <span className="animate-rise glass-card rounded-full px-5 py-2 text-[10px] font-medium tracking-[0.35em] text-muted-foreground uppercase">
          Central Home
        </span>
        <h1
          className="animate-rise mt-8 text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Explore <span className="text-aurora italic">Every World.</span>
        </h1>
        <p
          className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          NEXA-ORBIT is the central hub connecting every website, story and game by Arjun Radaye and
          Adromaa AD.
        </p>
        <a
          href="#explore"
          className="bg-aurora premium-interaction animate-rise mt-11 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-9 text-base font-medium text-foreground shadow-[var(--shadow-float)] hover:-translate-y-1 hover:shadow-[var(--shadow-glass-hover)] hover:brightness-[1.03] active:translate-y-0 active:scale-[0.97]"
          style={{ animationDelay: "0.3s" }}
        >
          Explore Websites
          <ArrowDown className="size-5" />
        </a>
      </section>

      <OrbitShowcase />

      <WorldDiscovery />

      {/* About */}
      <section id="about" className="section-reveal px-5 pb-28 sm:px-8 lg:pb-36">
        <div className="glass-card glass-sheen premium-interaction premium-lift relative mx-auto max-w-3xl rounded-[2.5rem] px-7 py-14 text-center sm:px-14 sm:py-16">
          <p className="text-[11px] font-medium tracking-[0.4em] text-muted-foreground uppercase">
            About
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl">One orbit, many worlds</h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            NEXA-ORBIT gathers everything Arjun Radaye builds under Adromaa AD into a single calm
            space made of light and glass — from Story Hub and Detective AD to Code AD and Magnet
            Game.{" "}
            <Link to="/about" className="underline underline-offset-4">
              Meet the creator
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
