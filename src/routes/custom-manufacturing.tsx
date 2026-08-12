import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { workflow } from "@/data/catalog";
import drawingImg from "@/assets/custom-drawing.jpg";
import largeBoltImg from "@/assets/large-bolts.jpg";

export const Route = createFileRoute("/custom-manufacturing")({
  head: () => ({
    meta: [
      { title: "Custom Fastener Manufacturer — Drawing-Based Bolts M30–M120 | Xiangjinxin" },
      {
        name: "description",
        content:
          "Custom fastener manufacturing from your drawing: special-shaped bolts, oversized and extra-long components, reverse thread and trapezoidal threaded rods.",
      },
      { property: "og:title", content: "Custom Fastener Manufacturing" },
      {
        property: "og:description",
        content: "Send us your drawing, dimensions or sample for technical and commercial review.",
      },
      { property: "og:url", content: "/custom-manufacturing" },
    ],
    links: [{ rel: "canonical", href: "/custom-manufacturing" }],
  }),
  component: CustomManufacturing,
});

const capabilities = [
  { t: "Special Bolt Shapes", d: "T-slot, eye, articulated, square-head and other non-standard geometries." },
  { t: "Oversized Components", d: "Custom bolts handled in the M30 to M120 category." },
  { t: "Extended Fasteners", d: "Extra-long components beyond standard catalogue lengths." },
  { t: "Reverse Thread", d: "Left-hand thread screws for specific mechanical requirements." },
  { t: "Trapezoidal Threads", d: "Trapezoidal threaded rods for motion and load transfer." },
  { t: "Drawing-Based Products", d: "Components manufactured to your PDF, DWG, DXF or STEP file." },
  { t: "Application-Specific Components", d: "Parts defined by application, sample or existing part." },
];

function CustomManufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Custom Manufacturing"
        title="Send Us Your Drawing. We'll Review the Requirement."
        intro="Special geometries, oversized parts, reverse threads and drawing-based components reviewed by our technical and commercial team."
      >
        <Button asChild>
          <Link to="/custom-manufacturing" hash="drawing">
            Upload Technical Drawing
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products/$category" params={{ category: "custom-fasteners" }}>
            Custom Portfolio
          </Link>
        </Button>
      </PageHero>

      <Section eyebrow="Capabilities" title="What can be customised">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.t} className="border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-graphite text-graphite-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <img
            src={largeBoltImg}
            alt="Large diameter custom bolt on a machining table"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full border border-graphite-foreground/15 object-cover"
          />
          <div>
            <p className="eyebrow text-safety">Large & Oversized Fasteners</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Custom bolts from M30 up to M120</h2>
            <p className="mt-4 text-graphite-foreground/80">
              For heavy machinery, steel construction, infrastructure, energy, mining equipment,
              heavy transport and industrial plants. Length, grade, material and finish are agreed
              against your documentation — contact us for details.
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link to="/custom-manufacturing" hash="drawing">
                Request Large Bolt Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section tone="muted" eyebrow="Process" title="Customisation Workflow">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((w) => (
            <li key={w.step} className="border border-border bg-card p-5">
              <p className="spec-value text-sm text-safety">{w.step}</p>
              <p className="mt-1 font-semibold">{w.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="drawing" eyebrow="Custom Fastener RFQ" title="Submit Technical Requirement">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border border-border bg-card p-6 md:p-8">
            <RfqForm variant="custom" submitLabel="Submit Technical Requirement" />
          </div>
          <aside>
            <img
              src={drawingImg}
              alt="Engineering drawing with dimension lines and machined fastener"
              loading="lazy"
              width={1200}
              height={800}
              className="w-full border border-border object-cover"
            />
            <div className="mt-4 border border-border bg-card p-5 text-sm text-muted-foreground">
              Accepted files: PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX. If you only have a sample or
              an application description, send that instead — the specification is defined during
              technical review.
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
