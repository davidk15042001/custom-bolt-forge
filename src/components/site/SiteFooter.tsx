import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/data/catalog";

const columns: { title: string; links: { label: string; to: string; params?: Record<string, string> }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Bolts", to: "/products/$category", params: { category: "bolts" } },
      { label: "Nuts", to: "/products/$category", params: { category: "nuts" } },
      { label: "Threaded Rods", to: "/products/$category", params: { category: "threaded-rods" } },
      { label: "Anchors", to: "/products/$category", params: { category: "anchor-bolts" } },
      {
        label: "Self-Drilling Screws",
        to: "/products/$category",
        params: { category: "self-drilling-screws" },
      },
      {
        label: "Solar Fasteners",
        to: "/products/$category",
        params: { category: "solar-fasteners" },
      },
      {
        label: "Custom Fasteners",
        to: "/products/$category",
        params: { category: "custom-fasteners" },
      },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Construction", to: "/industries/$slug", params: { slug: "construction" } },
      { label: "Steel Structures", to: "/industries/$slug", params: { slug: "steel-structures" } },
      { label: "Machinery", to: "/industries/$slug", params: { slug: "machinery" } },
      { label: "Solar", to: "/industries/$slug", params: { slug: "solar" } },
      { label: "Infrastructure", to: "/industries/$slug", params: { slug: "infrastructure" } },
      { label: "Heavy Industry", to: "/industries/$slug", params: { slug: "heavy-duty" } },
    ],
  },
  {
    title: "Custom Manufacturing",
    links: [
      { label: "Large Bolts", to: "/custom-manufacturing" },
      { label: "Drawing-Based Fasteners", to: "/custom-manufacturing" },
      {
        label: "Special Fasteners",
        to: "/products/$category",
        params: { category: "custom-fasteners" },
      },
      { label: "Upload Drawing", to: "/contact" },
    ],
  },
  {
    title: "B2B",
    links: [
      { label: "Wholesale", to: "/wholesale" },
      { label: "Submit RFQ", to: "/contact" },
      { label: "Upload BOM", to: "/contact" },
      { label: "Distributor Cooperation", to: "/distributors" },
      { label: "RFQ List", to: "/rfq" },
    ],
  },
  {
    title: "Resources & Company",
    links: [
      { label: "Catalog & Datasheets", to: "/resources" },
      { label: "Manufacturing", to: "/manufacturing" },
      { label: "Quality", to: "/quality" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-graphite text-graphite-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-bold">{COMPANY.shortName}</p>
            <p className="mt-3 text-sm text-graphite-foreground/70">{COMPANY.positioning}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3 text-graphite-foreground/60">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      params={l.params as never}
                      className="text-sm text-graphite-foreground/85 hover:text-safety"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-graphite-foreground/15 pt-6 text-xs text-graphite-foreground/60">
          <p className="font-medium text-graphite-foreground/85">{COMPANY.name}</p>
          <p className="mt-1">{COMPANY.address}</p>
          <p className="mt-1">
            Unified social credit code {COMPANY.creditCode} · Established {COMPANY.established}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link to="/legal/$doc" params={{ doc: "privacy" }} className="hover:text-safety">
              Privacy
            </Link>
            <Link to="/legal/$doc" params={{ doc: "terms" }} className="hover:text-safety">
              Terms
            </Link>
            <Link to="/legal/$doc" params={{ doc: "cookies" }} className="hover:text-safety">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
