import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Control & Standards | Xiangjinxin Fasteners" },
      {
        name: "description",
        content:
          "Fastener quality control: incoming material, production, dimensional, thread, surface and final inspection, plus certification and standards handling.",
      },
      { property: "og:title", content: "Quality Control" },
      {
        property: "og:description",
        content: "Inspection stages and standards handling for industrial fasteners.",
      },
      { property: "og:url", content: "/quality" },
    ],
    links: [{ rel: "canonical", href: "/quality" }],
  }),
  component: Quality,
});

const steps = [
  "Incoming Materials",
  "Production Inspection",
  "Dimension Inspection",
  "Thread Inspection",
  "Mechanical Testing",
  "Surface Inspection",
  "Final Inspection",
  "Packaging",
];

function Quality() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Quality Control"
        intro="Inspection is applied against the specification confirmed for each order. Scope and documentation are agreed before production."
      >
        <Button asChild>
          <Link to="/resources">Request Documentation</Link>
        </Button>
      </PageHero>

      <Section eyebrow="Inspection Flow" title="Control stages">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="border border-border bg-card p-5">
              <p className="spec-value text-sm text-safety">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-semibold">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" eyebrow="Certifications & Standards" title="Documentation on request">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Certifications</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Certification records — name, standard, issuer, number, date, product scope and PDF —
              are provided when they apply to your product scope. Contact us for details.
            </p>
          </div>
          <div className="border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Standards</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Products can be quoted against DIN, ISO, GB, ANSI, ASTM, JIS, a customer standard or a
              drawing. The applicable standard is confirmed per item before quotation.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
