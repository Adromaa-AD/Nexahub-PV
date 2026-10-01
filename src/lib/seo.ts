export const SITE_URL = "https://nexahub-ad.lovable.app";
export const CREATOR = "Arjun Radaye";

export const PERSON_LD = {
  "@type": "Person",
  "@id": `${SITE_URL}/#arjun-radaye`,
  name: CREATOR,
  url: `${SITE_URL}/about`,
  brand: {
    "@type": "Brand",
    name: "Adromaa AD",
    alternateName: ["Adromaa", "Adroma", "AdromaaAD", "AD"],
  },
};

export function pageHead({
  path,
  title,
  description,
  type = "website",
  jsonLd,
}: {
  path: string;
  title: string;
  description: string;
  type?: string;
  jsonLd?: object[];
}) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: CREATOR },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:site_name", content: "NEXA-ORBIT" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd?.map((d) => ({
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", ...d }),
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
