import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { STORIES, getSite, nextSite } from "@/components/site-card";
import { PERSON_LD, SITE_URL, breadcrumbs, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/worlds/$slug")({
  loader: ({ params }) => {
    const site = getSite(params.slug);
    if (!site) throw notFound();
    return { slug: site.slug };
  },
  head: ({ loaderData }) => {
    const site = loaderData ? getSite(loaderData.slug) : undefined;
    if (!site)
      return {
        meta: [{ title: "World not found — NEXA-ORBIT" }, { name: "robots", content: "noindex" }],
      };
    return pageHead({
      path: `/worlds/${site.slug}`,
      title: `${site.name} by Arjun Radaye — NEXA-ORBIT`,
      description: site.about.slice(0, 158),
      jsonLd: [
        {
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          description: site.about,
          creator: PERSON_LD,
          isPartOf: { "@type": "WebSite", name: "NEXA-ORBIT", url: SITE_URL },
        },
        breadcrumbs([
          { name: "NEXA-ORBIT", path: "/" },
          { name: "Worlds", path: "/worlds" },
          { name: site.name, path: `/worlds/${site.slug}` },
        ]),
      ],
    });
  },
  component: WorldPage,
});

function WorldPage() {
  const { slug } = Route.useLoaderData();
  const site = getSite(slug)!;
  const next = nextSite(slug)!;
  return (
    <PageShell>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          NEXA-ORBIT
        </Link>{" "}
        /{" "}
        <Link to="/worlds" className="hover:text-foreground">
          Worlds
        </Link>{" "}
        / {site.name}
      </nav>
      <article className="glass-card mx-auto mt-8 max-w-3xl rounded-[2.5rem] px-7 py-12 sm:px-14">
        <span className="bg-aurora flex size-14 items-center justify-center rounded-xl text-sm font-medium">
          {site.initials}
        </span>
        <h1 className="mt-6 text-5xl sm:text-6xl">{site.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{site.tagline}</p>
        <p className="mt-6 leading-relaxed">{site.about}</p>
        {site.slug === "story-hub" && (
          <p className="mt-4 leading-relaxed">
            Featured stories by Arjun Radaye:{" "}
            {STORIES.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && " and "}
                <Link to="/stories" hash={s.slug} className="underline underline-offset-4">
                  {s.title}
                </Link>
              </span>
            ))}
            .
          </p>
        )}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-aurora premium-interaction mt-10 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-8 font-medium shadow-[var(--shadow-soft)] hover:-translate-y-1 sm:w-auto"
        >
          Visit {site.name} <ArrowRight className="size-5" />
        </a>
      </article>
      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-between gap-4 text-sm">
        <Link to="/worlds" className="text-muted-foreground hover:text-foreground">
          ← All worlds
        </Link>
        <Link
          to="/worlds/$slug"
          params={{ slug: next.slug }}
          className="font-medium hover:underline"
        >
          Next world: {next.name} →
        </Link>
      </div>
    </PageShell>
  );
}
