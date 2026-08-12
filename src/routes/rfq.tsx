import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero, Section } from "@/components/site/Section";
import { useRfq } from "@/lib/rfq";

export const Route = createFileRoute("/rfq")({
  head: () => ({
    meta: [
      { title: "RFQ List — Request Quotation for Selected Fasteners | Xiangjinxin" },
      {
        name: "description",
        content:
          "Review the fasteners you selected, add sizes, quantities and technical notes, then submit one combined quotation request.",
      },
      { property: "og:title", content: "RFQ List" },
      {
        property: "og:description",
        content: "Combine multiple fastener products into a single quotation request.",
      },
      { property: "og:url", content: "/rfq" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/rfq" }],
  }),
  component: RfqPage,
});

function RfqPage() {
  const { items, update, remove, clear } = useRfq();

  return (
    <>
      <PageHero
        eyebrow="Request for Quotation"
        title={`RFQ List (${items.length})`}
        intro="Add sizes, quantities and technical notes to each line, then submit one combined request."
      />

      <Section className="py-12">
        {items.length === 0 ? (
          <div className="border border-border bg-card p-10 text-center">
            <p className="text-lg font-semibold">Your RFQ list is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add products from the catalogue, or submit a BOM or drawing directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact" hash="bom">
                  Upload BOM
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow">{item.category}</p>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="spec-value mt-1 text-xs text-muted-foreground">{item.spec}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Input
                    value={item.quantity}
                    maxLength={40}
                    placeholder="Quantity (e.g. 5,000 pcs)"
                    onChange={(e) => update(item.id, { quantity: e.target.value })}
                  />
                  <Input
                    value={item.note}
                    maxLength={200}
                    placeholder="Size / grade / notes (e.g. M20, 10.9, HDG)"
                    onChange={(e) => update(item.id, { note: e.target.value })}
                  />
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild size="lg">
                <Link to="/contact">Request Quotation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact" hash="bom">
                  Upload BOM Instead
                </Link>
              </Button>
              <Button variant="ghost" size="lg" onClick={clear}>
                Clear list
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
