import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { COMPANY } from "@/data/catalog";
import { useRfq } from "@/lib/rfq";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request Center — RFQ, BOM & Drawing Submission | Xiangjinxin" },
      {
        name: "description",
        content:
          "Submit a product RFQ, upload a BOM, send a technical drawing, request a project quotation or apply as a distributor.",
      },
      { property: "og:title", content: "Request Center" },
      {
        property: "og:description",
        content: "One place to submit RFQs, BOMs, drawings and partnership requests.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { items } = useRfq();
  const [tab, setTab] = useState(
    typeof window !== "undefined" && window.location.hash === "#bom" ? "bom" : "product",
  );

  const preset =
    items.length > 0
      ? items
          .map(
            (i) =>
              `${i.name} (${i.category}) — ${i.spec}${i.quantity ? ` — Qty: ${i.quantity}` : ""}`,
          )
          .join("\n")
      : undefined;

  return (
    <>
      <PageHero
        eyebrow="Request Center"
        title="Send your requirement to our sales engineering team"
        intro="Choose the request type that matches your need. Each request is routed to the responsible team internally."
      >
        <Button asChild variant="outline">
          <Link to="/rfq">RFQ List ({items.length})</Link>
        </Button>
      </PageHero>

      <Section className="py-12">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-secondary p-1">
            <TabsTrigger value="product">Product RFQ</TabsTrigger>
            <TabsTrigger value="bom">BOM RFQ</TabsTrigger>
            <TabsTrigger value="custom">Custom Drawing</TabsTrigger>
            <TabsTrigger value="project">Project Inquiry</TabsTrigger>
            <TabsTrigger value="distributor">Distributor Application</TabsTrigger>
            <TabsTrigger value="general">General Inquiry</TabsTrigger>
          </TabsList>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="border border-border bg-card p-6 md:p-8">
              <TabsContent value="product">
                <RfqForm variant="product" presetProducts={preset} />
              </TabsContent>
              <TabsContent value="bom" id="bom">
                <p className="mb-6 text-sm text-muted-foreground">
                  Have multiple fastener specifications? Upload your BOM or purchasing list (XLS,
                  XLSX, CSV, PDF) instead of entering each product manually.
                </p>
                <RfqForm variant="bom" submitLabel="Upload BOM" />
              </TabsContent>
              <TabsContent value="custom">
                <RfqForm variant="custom" submitLabel="Submit Technical Requirement" />
              </TabsContent>
              <TabsContent value="project">
                <RfqForm variant="project" submitLabel="Submit Project RFQ" />
              </TabsContent>
              <TabsContent value="distributor">
                <RfqForm variant="distributor" submitLabel="Submit Distributor Application" />
              </TabsContent>
              <TabsContent value="general">
                <RfqForm variant="general" submitLabel="Send Inquiry" />
              </TabsContent>
            </div>

            <aside className="space-y-4">
              <div className="border border-border bg-card p-5 text-sm">
                <p className="eyebrow mb-2">Company</p>
                <p className="font-semibold">{COMPANY.name}</p>
                <p className="mt-2 text-muted-foreground">{COMPANY.address}</p>
                <p className="mt-2 text-muted-foreground">{COMPANY.email}</p>
              </div>
              <div className="border border-border bg-card p-5 text-sm">
                <p className="eyebrow mb-2">Helpful for a fast quotation</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>· Product type and quantity</li>
                  <li>· Diameter, length and thread</li>
                  <li>· Grade, material and surface</li>
                  <li>· Standard or drawing reference</li>
                  <li>· Application and target market</li>
                </ul>
              </div>
            </aside>
          </div>
        </Tabs>
      </Section>
    </>
  );
}
