import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { RfqForm } from "@/components/site/RfqForm";
import { categories, getCategory } from "@/data/catalog";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product category unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.name} Manufacturer & Supplier | Xiangjinxin`;
    return {
      meta: [
        { title },
        { name: "description", content: category.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: category.intro },
        { property: "og:type", content: "product.group" },
        { property: "og:url", content: `/products/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/products/${params.category}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Products", item: "/products" },
              {
                "@type": "ListItem",
                position: 2,
                name: category.name,
                item: `/products/${params.category}`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const others = categories.filter((c) => c.slug !== category.slug);
  const t = useT();

  return (
    <>
      <PageHero eyebrow={t("Products", "产品")} title={t(category.name)} intro={t(category.intro)}>
        <Button asChild>
          <Link to="/contact">{t("Request Quote", "获取报价")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/custom-manufacturing">{t("Upload Drawing", "上传图纸")}</Link>
        </Button>
      </PageHero>

      <Section className="py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {category.products.map((p) => (
            <div key={p.slug} id={p.slug} className="scroll-mt-28">
              <ProductCard product={p} categorySlug={category.slug} categoryName={category.short} />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={t("Specification Matrix", "规格对照表")} title={t("Product Family Overview", "产品系列概览")}>
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-secondary">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">{t("Product", "产品")}</th>
                <th className="px-4 py-3 font-semibold">{t("Key specification", "关键规格")}</th>
                <th className="px-4 py-3 font-semibold">{t("Type", "类型")}</th>
                <th className="px-4 py-3 font-semibold">{t("Applications", "应用场景")}</th>
              </tr>
            </thead>
            <tbody>
              {category.products.map((p) => (
                <tr key={p.slug} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-medium">{t(p.name)}</td>
                  <td className="spec-value px-4 py-3 text-muted-foreground">
                    {p.specs.map((s) => `${t(s.label)}: ${t(s.value)}`).join(" · ")}
                  </td>
                  <td className="px-4 py-3">{p.custom ? t("Custom", "非标定制") : t("Standard", "标准件")}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.applications.map((a) => t(a)).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {t(
            "Values shown are confirmed portfolio ranges. Materials, surface treatments, standards and tolerances are confirmed per requirement — contact us for details.",
            "以上数值为已确认的产品系列范围。材料、表面处理（如镀锌）、执行标准及公差将根据具体需求确认——详情请联系我们。",
          )}
        </p>
      </Section>

      <Section eyebrow={t("RFQ", "询价")} title={`${t("Request a quotation for", "获取以下产品的报价")} ${t(category.short).toLowerCase()}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border border-border bg-card p-6 md:p-8">
            <RfqForm variant="product" presetProducts={`Category: ${category.name}\n`} />
          </div>
          <aside className="space-y-4">
            <div className="border border-border bg-card p-5">
              <p className="eyebrow mb-2">{t("Other categories", "其他类别")}</p>
              <ul className="space-y-2">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/products/$category"
                      params={{ category: c.slug }}
                      className="text-sm hover:text-primary"
                    >
                      {t(c.short)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-card p-5">
              <p className="font-semibold">{t("Multiple specifications?", "多种规格需求？")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  "Upload your BOM or purchasing list instead of entering each item.",
                  "上传您的物料清单（BOM）或采购清单，无需逐项手动填写。",
                )}
              </p>
              <Button asChild size="sm" variant="outline" className="mt-4">
                <Link to="/contact" hash="bom">
                  {t("Upload BOM", "上传物料清单")}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
