import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITES, SiteCard } from "./site-card";

export function WorldDiscovery() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredSites = useMemo(
    () =>
      SITES.filter((site) =>
        `${site.name} ${site.tagline}`.toLocaleLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  return (
    <section id="worlds" className="section-reveal px-5 pb-28 sm:px-8 lg:pb-36">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.4em] text-muted-foreground uppercase">
            Discover
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl">Find your next world</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Search every experience connected to NEXA-ORBIT.
          </p>
        </header>

        <div className="relative mx-auto mt-10 max-w-xl">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search worlds"
            aria-label="Search worlds"
            className="glass-card h-14 rounded-full border-border/70 bg-card/55 pr-14 pl-13 text-base shadow-[var(--shadow-glass)] placeholder:text-muted-foreground focus-visible:ring-2"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              aria-label="Clear world search"
              title="Clear search"
              className="absolute top-1/2 right-2 size-10 -translate-y-1/2 rounded-full"
            >
              <X aria-hidden="true" />
            </Button>
          )}
        </div>

        <p
          className="mt-5 text-center text-xs text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {filteredSites.length} {filteredSites.length === 1 ? "world" : "worlds"} found
        </p>

        {filteredSites.length > 0 ? (
          <div className="mt-10 grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSites.map((site) => (
              <SiteCard key={site.name} site={site} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-xl border-y border-border/70 py-14 text-center">
            <h3 className="text-2xl">No worlds found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try a different name or interest.</p>
          </div>
        )}
      </div>
    </section>
  );
}
