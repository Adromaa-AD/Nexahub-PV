import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SITES, SiteCard } from "@/components/site-card";
import { SITE_URL, breadcrumbs, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/worlds/")({
  head: () =>
    pageHead({
      path: "/worlds",
      title: "All Worlds — Story Hub, Detective AD, Code AD & more | NEXA-ORBIT",
      description:
        "Every website by Arjun Radaye in one place: Adromaa AD, Story Hub, Detective AD, Code AD, Magnet Game, Zowari AD and Inkveil.",
      jsonLd: [
        {
          "@type": "ItemList",
          name: "NEXA-ORBIT worlds",
          itemListElement: SITES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `${SITE_URL}/worlds/${s.slug}`,
          })),
        },
        breadcrumbs([
          { name: "NEXA-ORBIT", path: "/" },
          { name: "Worlds", path: "/worlds" },
        ]),
      ],
    }),
  component: WorldsPage,
});

function WorldsPage() {
  return (
    <PageShell>
      <h1 className="text-center text-5xl sm:text-6xl">
        All <span className="text-aurora italic">Worlds</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
        NEXA-ORBIT is the central hub connecting every project by Arjun Radaye and Adromaa AD —
        stories, mysteries, code and games.
      </p>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SITES.map((s) => (
          <SiteCard key={s.slug} site={s} />
        ))}
      </div>
    </PageShell>
  );
}
