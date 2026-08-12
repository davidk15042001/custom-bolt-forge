import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { RfqForm } from "@/components/site/RfqForm";
import { categories, getCategory } from "@/data/catalog";

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

  return (
    <>
      <PageHero eyebrow="Products" title={category.name} intro={category.intro}>
        <Button asChild>
          <Link to="/contact">Request Quote</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/custom-manufacturing">Upload Drawing</Link>
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

      <Section tone="muted" eyebrow="Specification Matrix" title="Product Family Overview">
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-secondary">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Key specification</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Applications</th>
              </tr>
            </thead>
            <tbody>
              {category.products.map((p) => (
                <tr key={p.slug} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="spec-value px-4 py-3 text-muted-foreground">
                    {p.specs.map((s) => `${s.label}: ${s.value}`).join(" · ")}
                  </td>
                  <td className="px-4 py-3">{p.custom ? "Custom" : "Standard"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.applications.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Values shown are confirmed portfolio ranges. Materials, surface treatments, standards and
          tolerances are confirmed per requirement — contact us for details.
        </p>
      </Section>

      <Section eyebrow="RFQ" title={`Request a quotation for ${category.short.toLowerCase()}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border border-border bg-card p-6 md:p-8">
            <RfqForm variant="product" presetProducts={`Category: ${category.name}\n`} />
          </div>
          <aside className="space-y-4">
            <div className="border border-border bg-card p-5">
              <p className="eyebrow mb-2">Other categories</p>
              <ul className="space-y-2">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/products/$category"
                      params={{ category: c.slug }}
                      className="text-sm hover:text-primary"
                    >
                      {c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-card p-5">
              <p className="font-semibold">Multiple specifications?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload your BOM or purchasing list instead of entering each item.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-4">
                <Link to="/contact" hash="bom">
                  Upload BOM
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
