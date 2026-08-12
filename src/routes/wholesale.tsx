import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Industrial Fasteners Wholesale — Distributor & Importer Supply | Xiangjinxin" },
      {
        name: "description",
        content:
          "Wholesale fastener supply for distributors, importers and industrial buyers: single products, mixed specifications, bulk quantities and annual purchasing.",
      },
      { property: "og:title", content: "Industrial Fasteners Wholesale" },
      {
        property: "og:description",
        content: "Fastener supply for distributors, importers and industrial buyers.",
      },
      { property: "og:url", content: "/wholesale" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: Wholesale,
});

const scope = [
  "Single product",
  "Multiple products",
  "Mixed specifications",
  "Bulk quantities",
  "Annual purchasing",
  "Project requirements",
];

function Wholesale() {
  return (
    <>
      <PageHero
        eyebrow="Wholesale"
        title="Fastener Supply for Distributors, Importers and Industrial Buyers"
        intro="Request quotations across the full portfolio — from a single specification to a complete mixed purchasing list."
      >
        <Button asChild>
          <Link to="/wholesale" hash="form">
            Request Wholesale Quote
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products">Browse Products</Link>
        </Button>
      </PageHero>

      <Section eyebrow="Scope" title="What you can request a quotation for">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scope.map((s) => (
            <div key={s} className="rule-accent border border-border bg-card p-5 font-medium">
              {s}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Packaging, documentation, commercial terms and delivery arrangements are confirmed per
          requirement. Provide the specifications you have and our team will clarify the rest.
        </p>
      </Section>

      <Section id="form" tone="muted" eyebrow="Wholesale RFQ" title="Request Wholesale Pricing">
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="product" submitLabel="Submit RFQ" />
        </div>
      </Section>
    </>
  );
}
