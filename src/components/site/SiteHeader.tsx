import { Link } from "@tanstack/react-router";
import { Menu, FileUp, ClipboardList, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories, industries, COMPANY } from "@/data/catalog";
import { useRfq } from "@/lib/rfq";

const customLinks = [
  { label: "Custom Bolts", to: "/custom-manufacturing" },
  { label: "Large-Diameter Fasteners", to: "/products/custom-fasteners" },
  { label: "Drawing-Based Parts", to: "/custom-manufacturing" },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; to: string; params?: Record<string, string> }[];
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
        {label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-64 border border-border bg-popover opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <Link
            key={item.label + item.to}
            to={item.to}
            params={item.params as never}
            className="block border-b border-border/60 px-4 py-2.5 text-sm text-popover-foreground last:border-b-0 hover:bg-secondary"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { items } = useRfq();
  const [open, setOpen] = useState(false);

  type NavItem = { label: string; to: string; params?: Record<string, string> };

  const productItems: NavItem[] = [
    { label: "All Products", to: "/products" },
    ...categories.map((c) => ({
      label: c.short,
      to: "/products/$category",
      params: { category: c.slug },
    })),
  ];
  const industryItems: NavItem[] = [
    { label: "All Industries", to: "/industries" },
    ...industries.slice(0, 7).map((i) => ({
      label: i.name,
      to: "/industries/$slug",
      params: { slug: i.slug },
    })),
  ];

  const flatLinks = [
    { label: "Wholesale", to: "/wholesale" },
    { label: "Manufacturing", to: "/manufacturing" },
    { label: "Quality", to: "/quality" },
    { label: "Resources", to: "/resources" },
    { label: "Distributors", to: "/distributors" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <div className="bg-graphite text-graphite-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <p className="spec-value text-[11px] uppercase tracking-[0.14em] text-graphite-foreground/80">
            Wholesale · Project Supply · OEM · Custom Fasteners · Drawing-Based Manufacturing
          </p>
          <Link
            to="/contact"
            className="spec-value text-[11px] uppercase tracking-[0.14em] text-safety hover:underline"
          >
            Request Quote →
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
              <span className="font-display text-lg font-bold">X</span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-tight">
                {COMPANY.shortName}
              </span>
              <span className="eyebrow block">Industrial Fasteners</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center xl:flex">
            <NavDropdown label="Products" items={productItems} />
            <NavDropdown label="Industries" items={industryItems} />
            <NavDropdown label="Custom Manufacturing" items={customLinks} />
            {flatLinks.slice(0, 4).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/rfq">
                <ClipboardList className="h-4 w-4" />
                RFQ List ({items.length})
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/contact">Request Quote</Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="xl:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] overflow-y-auto sm:w-96">
                <div className="mt-8 space-y-6 px-4 pb-24">
                  <div>
                    <p className="eyebrow mb-2">Products</p>
                    <div className="grid gap-1">
                      {productItems.map((i) => (
                        <Link
                          key={i.label}
                          to={i.to}
                          params={i.params as never}
                          onClick={() => setOpen(false)}
                          className="border-b border-border/60 py-2 text-sm"
                        >
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Industries</p>
                    <div className="grid gap-1">
                      {industryItems.map((i) => (
                        <Link
                          key={i.label}
                          to={i.to}
                          params={i.params as never}
                          onClick={() => setOpen(false)}
                          className="border-b border-border/60 py-2 text-sm"
                        >
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Company</p>
                    <div className="grid gap-1">
                      <Link
                        to="/custom-manufacturing"
                        onClick={() => setOpen(false)}
                        className="border-b border-border/60 py-2 text-sm"
                      >
                        Custom Manufacturing
                      </Link>
                      {flatLinks.map((l) => (
                        <Link
                          key={l.to}
                          to={l.to}
                          onClick={() => setOpen(false)}
                          className="border-b border-border/60 py-2 text-sm"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background sm:hidden">
        <Link
          to="/rfq"
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold"
        >
          <ClipboardList className="h-4 w-4" /> RFQ ({items.length})
        </Link>
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <FileUp className="h-4 w-4" /> Request Quote
        </Link>
      </div>
    </>
  );
}
