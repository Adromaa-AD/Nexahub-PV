import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { STORIES } from "@/components/site-card";
import { PERSON_LD, breadcrumbs, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/stories")({
  head: () =>
    pageHead({
      path: "/stories",
      title: "Zero Fever & The Rise of Vedhav — Stories by Arjun Radaye",
      description:
        "Original stories written by Arjun Radaye, including Zero Fever and The Rise of Vedhav. Read more fiction on Story Hub.",
      jsonLd: [
        ...STORIES.map((s) => ({
          "@type": "CreativeWork",
          name: s.title,
          genre: "Fiction",
          author: PERSON_LD,
        })),
        breadcrumbs([
          { name: "NEXA-ORBIT", path: "/" },
          { name: "Stories", path: "/stories" },
        ]),
      ],
    }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <PageShell>
      <h1 className="text-center text-5xl sm:text-6xl">
        Stories by <span className="text-aurora italic">Arjun Radaye</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
        Original fiction from the NEXA-ORBIT universe. Explore more novels and stories on{" "}
        <Link
          to="/worlds/$slug"
          params={{ slug: "story-hub" }}
          className="underline underline-offset-4"
        >
          Story Hub
        </Link>
        .
      </p>
      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        {STORIES.map((s) => (
          <article key={s.slug} id={s.slug} className="glass-card scroll-mt-28 rounded-[2rem] p-8">
            <h2 className="text-3xl">{s.title}</h2>
            <p className="mt-4 text-muted-foreground">{s.summary}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
