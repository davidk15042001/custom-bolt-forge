import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/catalog";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Industrial Fastener Products — Bolts, Nuts, Anchors | Xiangjinxin" },
      {
        name: "description",
        content:
          "Full industrial fastener portfolio: hex and high-strength bolts, nuts, threaded rods, anchors, expansion anchors, self-drilling screws, solar fasteners and custom parts.",
      },
      { property: "og:title", content: "Industrial Fastener Products" },
      {
        property: "og:description",
        content: "Nine fastener categories for wholesale, OEM and project supply.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

const diameters = ["M4", "M6", "M8", "M10", "M12", "M16", "M20", "M24", "M30", "M120"];
const grades = ["4.8", "8.8", "10.9", "12.9"];

function ProductsIndex() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [type, setType] = useState<"all" | "standard" | "custom">("all");
  const [filter, setFilter] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => cat === "all" || c.slug === cat)
      .map((c) => ({
        category: c,
        products: c.products.filter((p) => {
          const hay = `${p.name} ${p.summary} ${c.name} ${p.specs
            .map((s) => s.value)
            .join(" ")} ${p.applications.join(" ")}`.toLowerCase();
          if (q && !hay.includes(q)) return false;
          if (type === "custom" && !p.custom) return false;
          if (type === "standard" && p.custom) return false;
          if (filter && !hay.includes(filter.toLowerCase())) return false;
          return true;
        }),
      }))
      .filter((g) => g.products.length > 0);
  }, [query, cat, type, filter]);

  const total = results.reduce((n, g) => n + g.products.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Product Portfolio"
        title="Industrial Fastener Products"
        intro="Browse the full portfolio by category, diameter, grade or application. Add any product to your RFQ list and submit one combined request."
      >
        <Button asChild>
          <Link to="/rfq">Open RFQ List</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Submit RFQ</Link>
        </Button>
      </PageHero>

      <Section className="py-10">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bolts, nuts, sizes or specifications..."
                className="pl-9"
                maxLength={80}
              />
            </div>

            <div>
              <p className="eyebrow mb-2">Category</p>
              <div className="flex flex-col">
                <button
                  onClick={() => setCat("all")}
                  className={`border-b border-border py-2 text-left text-sm ${cat === "all" ? "font-semibold text-primary" : ""}`}
                >
                  All categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setCat(c.slug)}
                    className={`border-b border-border py-2 text-left text-sm ${cat === c.slug ? "font-semibold text-primary" : ""}`}
                  >
                    {c.short}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Standard / Custom</p>
              <div className="flex flex-wrap gap-2">
                {(["all", "standard", "custom"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`border px-3 py-1 text-xs uppercase tracking-wide ${type === t ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Diameter</p>
              <div className="flex flex-wrap gap-2">
                {diameters.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilter(filter === d ? null : d)}
                    className={`spec-value border px-2.5 py-1 text-xs ${filter === d ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Grade</p>
              <div className="flex flex-wrap gap-2">
                {grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilter(filter === g ? null : g)}
                    className={`spec-value border px-2.5 py-1 text-xs ${filter === g ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setCat("all");
                setType("all");
                setFilter(null);
              }}
            >
              Reset filters
            </Button>
          </aside>

          <div>
            <p className="spec-value mb-4 text-sm text-muted-foreground">
              {total} product families
            </p>
            <div className="space-y-12">
              {results.map((group) => (
                <div key={group.category.slug}>
                  <div className="mb-4 flex items-end justify-between gap-4 border-b border-border pb-2">
                    <h2 className="text-2xl font-bold">{group.category.name}</h2>
                    <Link
                      to="/products/$category"
                      params={{ category: group.category.slug }}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Category page
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {group.products.map((p) => (
                      <ProductCard
                        key={p.slug}
                        product={p}
                        categorySlug={group.category.slug}
                        categoryName={group.category.short}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {total === 0 && (
                <p className="text-sm text-muted-foreground">
                  No products match these filters. Reset the filters or send your requirement
                  through the{" "}
                  <Link to="/contact" className="text-primary underline">
                    Request Center
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
