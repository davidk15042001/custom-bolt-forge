import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Technical Resources — Catalog, Datasheets & Documents | Xiangjinxin" },
      {
        name: "description",
        content:
          "Request the product catalog, technical datasheets, drawings, standards, certificates, installation information and RFQ templates.",
      },
      { property: "og:title", content: "Technical Resources" },
      {
        property: "og:description",
        content: "Fastener catalog, datasheets and technical documentation on request.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const docs = [
  { t: "Product Catalog", d: "Overview of the fastener portfolio by category." },
  { t: "Technical Datasheets", d: "Specification sheets for confirmed product families." },
  { t: "Drawings", d: "Dimensional drawings for standard and custom items." },
  { t: "Standards", d: "Applicable standard references per quoted item." },
  { t: "Certificates", d: "Certification documents relevant to your product scope." },
  { t: "Installation Information", d: "Handling and installation notes where available." },
  { t: "RFQ Templates", d: "Structured templates for product and BOM requests." },
];

function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Technical Resources"
        intro="Documents are released against your product scope. Tell us what you need and we will send the relevant files."
      />

      <Section eyebrow="Available Documents" title="What you can request">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <div key={d.t} className="border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">{d.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{d.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Document Request" title="Request Technical Document">
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="general" submitLabel="Request Document" />
        </div>
      </Section>
    </>
  );
}
