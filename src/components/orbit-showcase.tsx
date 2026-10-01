import { Suspense, lazy } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { SITES, SiteCard } from "./site-card";

const OrbitCarousel = lazy(() => import("./orbit-carousel"));

function CarouselFallback() {
  const [firstSite] = SITES;
  if (!firstSite) return null;
  return (
    <div className="px-2 py-3">
      <SiteCard site={firstSite} />
    </div>
  );
}

export function OrbitShowcase() {
  return (
    <section id="explore" className="section-reveal relative px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.4em] text-muted-foreground uppercase">
            The Orbit
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl">Worlds in orbit</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every creation circles one center. Pick a world and step inside.
          </p>
        </header>

        <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-2xl lg:block">
          <div className="animate-orbit absolute inset-[5%] rounded-full border border-champagne/60" />
          <div className="animate-orbit-reverse absolute inset-[19%] rounded-full border border-pastel/50" />
          <div className="absolute inset-[33%] rounded-full border border-border/50" />
          <div className="absolute inset-0">
            {SITES.map((site, index) => {
              const angle = (index / SITES.length) * Math.PI * 2 - Math.PI / 2;
              const left = 50 + Math.cos(angle) * 43;
              const top = 50 + Math.sin(angle) * 43;
              return (
                <span
                  key={site.name}
                  className="orbit-node premium-interaction absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3 text-xs font-medium whitespace-nowrap hover:scale-105"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span className="bg-aurora flex size-7 items-center justify-center rounded-full text-[9px] text-foreground">
                    {site.initials}
                  </span>
                  {site.name}
                </span>
              );
            })}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="orb-sphere animate-float premium-interaction flex size-52 flex-col items-center justify-center rounded-full text-center hover:scale-105">
              <span className="logo-breathe font-display text-2xl tracking-[0.14em]">NEXA</span>
              <span className="text-[10px] tracking-[0.45em] text-muted-foreground">ORBIT</span>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="orb-sphere animate-float premium-interaction mx-auto mb-12 flex size-36 flex-col items-center justify-center rounded-full text-center lg:hidden">
            <span className="logo-breathe font-display text-xl tracking-[0.14em]">NEXA</span>
            <span className="text-[10px] tracking-[0.45em] text-muted-foreground">ORBIT</span>
          </div>

          <ClientOnly fallback={<CarouselFallback />}>
            <Suspense fallback={<CarouselFallback />}>
              <OrbitCarousel />
            </Suspense>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
