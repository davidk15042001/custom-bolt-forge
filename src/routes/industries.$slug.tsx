import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { getIndustry, industries } from "@/data/catalog";
import { useT } from "@/lib/i18n";

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
  const t = useT();
  const { industry } = Route.useLoaderData();
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <PageHero eyebrow={t("Industry", "行业")} title={t(industry.headline)} intro={t(industry.description)}>
        <Button asChild>
          <Link to="/contact">{t(industry.cta)}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products">{t("Browse Products", "浏览产品")}</Link>
        </Button>
      </PageHero>

      <Section eyebrow={t("Relevant Products", "相关产品")} title={t("Typical fastening components", "典型紧固部件")}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industry.products.map((p) => (
            <div key={p} className="rule-accent border border-border bg-card p-5 font-medium">
              {t(p)}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={t("RFQ", "询价")} title={t(industry.cta)}>
        <div className="border border-border bg-card p-6 md:p-8">
          <RfqForm variant="project" submitLabel={t(industry.cta)} presetProducts={`Industry: ${industry.name}\n`} />
        </div>
      </Section>

      <Section className="py-12">
        <p className="eyebrow mb-3">{t("Other industries", "其他行业")}</p>
        <div className="flex flex-wrap gap-2">
          {others.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
            >
              {t(i.name)}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
