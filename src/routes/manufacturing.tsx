import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing Capability — Fastener Production | Xiangjinxin" },
      {
        name: "description",
        content:
          "Fastener manufacturing capability: standard catalogue supply and drawing-based production for special geometries and large-diameter components.",
      },
      { property: "og:title", content: "Manufacturing Capability" },
      {
        property: "og:description",
        content: "Standard supply and drawing-based production for industrial fasteners.",
      },
      { property: "og:url", content: "/manufacturing" },
    ],
    links: [{ rel: "canonical", href: "/manufacturing" }],
  }),
  component: Manufacturing,
});

const stages = [
  "Raw Material",
  "Cold Forming",
  "Hot Forging",
  "Machining",
  "Thread Rolling",
  "Heat Treatment",
  "Surface Treatment",
  "Inspection",
  "Packaging",
];

function Manufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Capability"
        title="Manufacturing Capability"
        intro="Supply covers standard catalogue products alongside drawing-based production for special and large-diameter components."
      >
        <Button asChild>
          <Link to="/contact">Discuss Your Requirement</Link>
        </Button>
      </PageHero>

      <Section eyebrow="Process Stages" title="Production sequence">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => (
            <div key={s} className="border border-border bg-card p-5">
              <p className="spec-value text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-semibold">{s}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Applied according to the confirmed product specification — contact us for details of
                a specific process.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Equipment lists, capacities and process certifications are shared on request once the
          product requirement is defined. We do not publish figures that have not been confirmed.
        </p>
      </Section>

      <Section tone="muted" eyebrow="Heavy & Large-Diameter" title="Large fastener manufacturing">
        <p className="max-w-3xl text-muted-foreground">
          Custom bolts are handled in an M30 to M120 category for heavy industrial applications.
          Production quantity, dimensions and finishing are agreed case by case against your
          drawing.
        </p>
        <Button asChild className="mt-6">
          <Link to="/custom-manufacturing">Custom Manufacturing</Link>
        </Button>
      </Section>
    </>
  );
}
