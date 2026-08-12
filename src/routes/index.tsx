import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileUp,
  Ruler,
  Factory,
  ShieldCheck,
  Boxes,
  FileSpreadsheet,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { categories, industries, faqs, workflow, COMPANY } from "@/data/catalog";
import heroImg from "@/assets/hero-fasteners.jpg";
import largeBoltImg from "@/assets/large-bolts.jpg";
import solarImg from "@/assets/solar-fasteners.jpg";
import drawingImg from "@/assets/custom-drawing.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Industrial Fasteners, Bolts & Custom Bolts up to M120 | Xiangjinxin" },
      {
        name: "description",
        content:
          "Industrial fastener manufacturer and wholesale supplier: hex and high-strength bolts, nuts, anchors, threaded rods, solar fasteners and drawing-based custom bolts M30–M120.",
      },
      { property: "og:title", content: "Industrial Fasteners for Standard, Heavy-Duty & Custom Applications" },
      {
        property: "og:description",
        content:
          "Bolts, nuts, anchors, threaded components, solar fasteners and custom hardware for distributors, manufacturers and project buyers.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.slice(0, 8).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const routing = [
  {
    title: "Standard Fasteners",
    text: "Browse bolts, nuts, anchors and threaded hardware.",
    cta: "Browse Products",
    to: "/products",
    icon: Boxes,
  },
  {
    title: "Wholesale Supply",
    text: "For distributors and repeat-volume buyers.",
    cta: "Request Wholesale Pricing",
    to: "/wholesale",
    icon: Handshake,
  },
  {
    title: "Project Supply",
    text: "Submit multiple specifications or a full BOM.",
    cta: "Submit RFQ",
    to: "/contact",
    icon: FileSpreadsheet,
  },
  {
    title: "Custom Fasteners",
    text: "Upload a drawing or special requirement.",
    cta: "Upload Drawing",
    to: "/custom-manufacturing",
    icon: Ruler,
  },
] as const;

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite text-graphite-foreground">
        <img
          src={heroImg}
          alt="Heavy industrial hex bolts and nuts on a dark steel surface"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-safety">Manufacturer · Wholesale · OEM · Export</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.03] md:text-6xl">
              Industrial Fasteners for Standard, Heavy-Duty &amp; Custom Applications
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-graphite-foreground/80">
              Bolts, nuts, anchors, threaded components, solar fasteners and custom hardware for
              distributors, manufacturers, engineering companies and project buyers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Request B2B Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-graphite-foreground/40 bg-transparent text-graphite-foreground hover:bg-graphite-foreground/10 hover:text-graphite-foreground"
              >
                <Link to="/custom-manufacturing">
                  <FileUp className="h-4 w-4" /> Upload Your Drawing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4">
          {[
            "Wholesale",
            "OEM",
            "Project Supply",
            "Custom Fasteners",
            "Drawing-Based Manufacturing",
          ].map((t) => (
            <span key={t} className="spec-value text-xs uppercase tracking-[0.16em]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Buyer routing */}
      <Section eyebrow="Buyer Routing" title="What Do You Need?">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routing.map((r) => (
            <div key={r.title} className="flex flex-col border border-border bg-card p-6">
              <r.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.text}</p>
              <Button asChild variant="outline" size="sm" className="mt-5 self-start">
                <Link to={r.to}>{r.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Product categories */}
      <Section
        tone="muted"
        eyebrow="Product Portfolio"
        title="Industrial Fastener Categories"
        intro="Nine core categories covering standard assembly, structural connections, anchoring, photovoltaic mounting and non-standard components."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              className="group border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <p className="eyebrow">{c.products.length} product families</p>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                View category <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </Section>

      {/* High-strength */}
      <Section
        eyebrow="Grades 8.8 · 10.9 · 12.9"
        title="High-Strength Fasteners for Demanding Applications"
        intro="High-strength hex bolts and socket head cap screws are listed in grades 8.8, 10.9 and 12.9 for structural, machinery and heavy equipment connections."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { g: "8.8", t: "General structural and machinery connections." },
            { g: "10.9", t: "Higher-load structural and equipment assemblies." },
            { g: "12.9", t: "High-torque socket screw applications." },
          ].map((x) => (
            <div key={x.g} className="rule-accent border border-border bg-card p-6">
              <p className="spec-value text-4xl font-bold">{x.g}</p>
              <p className="mt-2 text-sm text-muted-foreground">{x.t}</p>
            </div>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/products/$category" params={{ category: "bolts" }}>
            Explore High-Strength Bolts
          </Link>
        </Button>
      </Section>

      {/* Large bolts */}
      <section className="bg-graphite text-graphite-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-safety">Large Diameter Fasteners</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Custom Heavy-Duty Bolts Up to M120
            </h2>
            <p className="mt-4 text-graphite-foreground/80">
              For heavy machinery, structures, equipment and industrial projects requiring
              dimensions beyond standard fastener ranges. Length, grade, material and finish are
              confirmed against your drawing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">Request Custom Bolt Quote</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/products/$category" params={{ category: "custom-fasteners" }}>
                  Custom Portfolio
                </Link>
              </Button>
            </div>
          </div>
          <img
            src={largeBoltImg}
            alt="Large diameter forged industrial bolt in a factory"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full border border-graphite-foreground/15 object-cover"
          />
        </div>
      </section>

      {/* Anchors / construction */}
      <Section
        eyebrow="Anchoring"
        title="Anchor & Construction Fasteners"
        intro="Foundation bolts, U-bolts, washers, expansion anchors, chemical anchors and sleeve or wedge anchoring systems for construction and machinery bases."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ...(categories.find((c) => c.slug === "anchor-bolts")?.products ?? []),
            ...(categories.find((c) => c.slug === "expansion-anchors")?.products ?? []),
          ]
            .slice(0, 8)
            .map((p) => (
              <div key={p.slug} className="border border-border bg-card p-5">
                <h3 className="text-base font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              </div>
            ))}
        </div>
      </Section>

      {/* Solar */}
      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={solarImg}
            alt="Stainless steel solar mounting clamps and bolts on a photovoltaic structure"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full border border-border object-cover"
          />
          <div>
            <p className="eyebrow">Solar / PV</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Fasteners for Solar Mounting Systems
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "PV bolts and nuts",
                "Pressure-block bolts",
                "C-channel fasteners",
                "Support components",
                "Clamps",
                "Triangle connectors",
                "Tile hooks",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-safety" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/products/$category" params={{ category: "solar-fasteners" }}>
                  Explore Solar Fasteners
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/industries/$slug" params={{ slug: "solar" }}>
                  Request PV Project Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Custom manufacturing */}
      <Section
        eyebrow="Custom Manufacturing"
        title="Standard Doesn't Fit Your Application?"
        intro="From special geometries to oversized M30–M120 bolts and drawing-based components, submit your technical requirement for review."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <img
            src={drawingImg}
            alt="Technical drawing with dimension lines beside machined fastener components"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full border border-border object-cover"
          />
          <div>
            <ol className="space-y-3">
              {[
                "Drawing",
                "Engineering Requirement",
                "Technical Review",
                "Quotation",
                "Production",
                "Inspection",
                "Delivery",
              ].map((s, idx) => (
                <li key={s} className="flex items-center gap-4 border border-border bg-card p-3">
                  <span className="spec-value w-8 text-sm text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <Button asChild size="lg" className="mt-7">
              <Link to="/custom-manufacturing">
                <FileUp className="h-4 w-4" /> Upload Your Drawing
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Industries */}
      <Section tone="muted" eyebrow="Applications" title="Industries We Serve">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group border border-border bg-card p-6 hover:border-primary"
            >
              <h3 className="text-lg font-semibold group-hover:text-primary">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Manufacturing & quality */}
      <Section eyebrow="Capability" title="Manufacturing & Quality">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <Factory className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-2xl font-semibold">Manufacturing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Standard catalogue supply alongside drawing-based production for special geometries
              and large-diameter components. Process details are confirmed per project.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/manufacturing">Manufacturing Capability</Link>
            </Button>
          </div>
          <div className="border border-border bg-card p-8">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-2xl font-semibold">Quality Control</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dimensional, thread and visual inspection stages applied to confirmed specifications.
              Documentation is provided according to the agreed scope.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/quality">Quality Process</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Wholesale + BOM CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Wholesale &amp; Project Supply</h2>
            <p className="mt-3 text-primary-foreground/80">
              Request quotations for a single product, mixed specifications, bulk quantities,
              annual purchasing or full project requirements.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-6">
              <Link to="/wholesale">Request Wholesale Quote</Link>
            </Button>
          </div>
          <div className="border border-primary-foreground/25 p-6">
            <h3 className="text-2xl font-semibold">Upload Your BOM</h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Have multiple fastener specifications? Upload your BOM or purchasing list (XLS, XLSX,
              CSV, PDF) instead of entering each product manually.
            </p>
            <Button asChild variant="secondary" className="mt-5">
              <Link to="/contact" hash="bom">
                Upload BOM
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Distributor + resources */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold">Become a Fastener Distributor</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Cooperation for fastener distributors, hardware distributors, importers, construction
              suppliers and solar hardware distributors.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/distributors">Apply for Distribution</Link>
            </Button>
          </div>
          <div className="border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold">Technical Resources</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Product catalog, datasheets, drawings, standards, certificates and RFQ templates on
              request.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/resources">Download Catalog</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* RFQ form */}
      <Section
        tone="muted"
        id="rfq"
        eyebrow="B2B RFQ"
        title="Submit Your Requirement"
        intro="Send your product list, dimensions, quantities, BOM or technical drawing for quotation."
      >
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="product" />
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Products & B2B Questions">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-border bg-graphite text-graphite-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Need Standard or Custom Fasteners?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-graphite-foreground/80">
            Send us your product list, dimensions, quantities, BOM or technical drawing for
            quotation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">Submit RFQ</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/custom-manufacturing">Upload Drawing</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-graphite-foreground/40 bg-transparent text-graphite-foreground hover:bg-graphite-foreground/10 hover:text-graphite-foreground"
            >
              <Link to="/resources">Download Catalog</Link>
            </Button>
          </div>
          <p className="mt-8 text-xs text-graphite-foreground/50">
            {COMPANY.name} · {workflow.length}-step custom manufacturing workflow
          </p>
        </div>
      </section>
    </>
  );
}
