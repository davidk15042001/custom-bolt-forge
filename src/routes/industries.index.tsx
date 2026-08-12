import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { industries } from "@/data/catalog";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Fasteners by Application | Xiangjinxin" },
      {
        name: "description",
        content:
          "Fastening components for construction, steel structures, machinery, solar, infrastructure, energy, towers and heavy-duty applications.",
      },
      { property: "og:title", content: "Industries We Serve" },
      {
        property: "og:description",
        content: "Fastener supply by industrial application and project type.",
      },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Industries We Serve"
        intro="Product selection, specification and supply arrangements organised around the way industrial buyers purchase."
      />
      <Section className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col border border-border bg-card p-6 hover:border-primary"
            >
              <h2 className="text-xl font-semibold group-hover:text-primary">{i.headline}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{i.description}</p>
              <p className="mt-4 text-xs text-muted-foreground">{i.products.join(" · ")}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
