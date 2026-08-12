import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";

export const Route = createFileRoute("/distributors")({
  head: () => ({
    meta: [
      { title: "Become a Fastener Distributor — Partnership Application | Xiangjinxin" },
      {
        name: "description",
        content:
          "Distribution cooperation for industrial fastener distributors, hardware distributors, importers, construction suppliers and solar hardware distributors.",
      },
      { property: "og:title", content: "Become a Fastener Distributor" },
      {
        property: "og:description",
        content: "Apply for distribution cooperation across the fastener portfolio.",
      },
      { property: "og:url", content: "/distributors" },
    ],
    links: [{ rel: "canonical", href: "/distributors" }],
  }),
  component: Distributors,
});

function Distributors() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Become a Fastener Distributor"
        intro="Cooperation for distributors, importers, construction suppliers and solar hardware resellers across the full portfolio."
      />

      <Section eyebrow="Cooperation Scope" title="What cooperation can cover">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Broad product portfolio across nine fastener categories",
            "Bulk sourcing and repeat purchasing",
            "Standard catalogue products",
            "Special and drawing-based products",
            "Mixed RFQs across multiple categories",
            "Regional sales agent discussions for construction, machinery, steel, fastener, solar and industrial procurement networks",
          ].map((t) => (
            <div key={t} className="rule-accent border border-border bg-card p-5 text-sm">
              {t}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Commercial terms, territory arrangements and agent conditions are discussed individually.
          No exclusivity is implied before a written agreement.
        </p>
      </Section>

      <Section tone="muted" eyebrow="Application" title="Submit Distributor Application">
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="distributor" submitLabel="Submit Distributor Application" />
        </div>
      </Section>
    </>
  );
}
