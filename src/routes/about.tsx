import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SITES, STORIES } from "@/components/site-card";
import { PERSON_LD, SITE_URL, breadcrumbs, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About Arjun Radaye — Creator of Adromaa AD & NEXA-ORBIT",
      description:
        "Arjun Radaye is the creator of Adromaa AD (Adromaa), NEXA-ORBIT (Nexahub), Story Hub, Detective AD, Code AD, Zowari AD and Magnet Game.",
      type: "profile",
      jsonLd: [
        {
          ...PERSON_LD,
          description: "Creator of Adromaa AD, NEXA-ORBIT and connected websites and stories.",
          sameAs: SITES.map((s) => s.url),
          mainEntityOfPage: `${SITE_URL}/about`,
        },
        breadcrumbs([
          { name: "NEXA-ORBIT", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <article className="glass-card mx-auto max-w-3xl rounded-[2.5rem] px-7 py-12 sm:px-14">
        <h1 className="text-5xl sm:text-6xl">About Arjun Radaye</h1>
        <p className="mt-6 leading-relaxed">
          Arjun Radaye is the creator behind <strong>Adromaa AD</strong> — sometimes written
          Adromaa, Adroma or AdromaaAD — and every world gathered in <strong>NEXA-ORBIT</strong>,
          also known as Nexahub or NexaOrbit.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          NEXA-ORBIT is the central hub that connects these projects so each one is easy to find.
        </p>
        <h2 className="mt-10 text-3xl">Worlds created by Arjun Radaye</h2>
        <ul className="mt-4 space-y-2">
          {SITES.map((s) => (
            <li key={s.slug}>
              <Link
                to="/worlds/$slug"
                params={{ slug: s.slug }}
                className="underline underline-offset-4"
              >
                {s.name}
              </Link>{" "}
              <span className="text-muted-foreground">— {s.tagline}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-3xl">Stories</h2>
        <ul className="mt-4 space-y-2">
          {STORIES.map((s) => (
            <li key={s.slug}>
              <Link to="/stories" hash={s.slug} className="underline underline-offset-4">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}
