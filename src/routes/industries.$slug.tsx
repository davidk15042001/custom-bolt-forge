import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { getIndustry, industries } from "@/data/catalog";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { industry } = loaderData;
    return {
      meta: [
        { title: `${industry.headline} | Xiangjinxin` },
        { name: "description", content: industry.description },
        { property: "og:title", content: industry.headline },
        { property: "og:description", content: industry.description },
        { property: "og:url", content: `/industries/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/industries/${params.slug}` }],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <PageHero eyebrow="Industry" title={industry.headline} intro={industry.description}>
        <Button asChild>
          <Link to="/contact">{industry.cta}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products">Browse Products</Link>
        </Button>
      </PageHero>

      <Section eyebrow="Relevant Products" title="Typical fastening components">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industry.products.map((p) => (
            <div key={p} className="rule-accent border border-border bg-card p-5 font-medium">
              {p}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="RFQ" title={industry.cta}>
        <div className="border border-border bg-card p-6 md:p-8">
          <RfqForm variant="project" submitLabel={industry.cta} presetProducts={`Industry: ${industry.name}\n`} />
        </div>
      </Section>

      <Section className="py-12">
        <p className="eyebrow mb-3">Other industries</p>
        <div className="flex flex-wrap gap-2">
          {others.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
            >
              {i.name}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
