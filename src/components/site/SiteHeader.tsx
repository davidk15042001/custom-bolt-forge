import { Link } from "@tanstack/react-router";
import { Menu, FileUp, ClipboardList, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories, industries, COMPANY } from "@/data/catalog";
import { useRfq } from "@/lib/rfq";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";

const customLinkDefs = [
  { en: "Custom Bolts", zh: "非标螺栓", to: "/custom-manufacturing" },
  { en: "Large-Diameter Fasteners", zh: "大规格紧固件", to: "/products/custom-fasteners" },
  { en: "Drawing-Based Parts", zh: "图纸定制件", to: "/custom-manufacturing" },
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
  const t = useT();
  const [open, setOpen] = useState(false);

  type NavItem = { label: string; to: string; params?: Record<string, string> };

  const productItems: NavItem[] = [
    { label: t("All Products", "全部产品"), to: "/products" },
    ...categories.map((c) => ({
      label: c.short,
      to: "/products/$category",
      params: { category: c.slug },
    })),
  ];
  const industryItems: NavItem[] = [
    { label: t("All Industries", "全部行业"), to: "/industries" },
    ...industries.slice(0, 7).map((i) => ({
      label: i.name,
      to: "/industries/$slug",
      params: { slug: i.slug },
    })),
  ];

  const flatLinks = [
    { label: t("Wholesale", "批发供应"), to: "/wholesale" },
    { label: t("Manufacturing", "生产制造"), to: "/manufacturing" },
    { label: t("Quality", "质量管理"), to: "/quality" },
    { label: t("Resources", "资料下载"), to: "/resources" },
    { label: t("Distributors", "经销商"), to: "/distributors" },
    { label: t("Contact", "联系我们"), to: "/contact" },
  ];

  return (
    <>
      <div className="bg-graphite text-graphite-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <p className="spec-value text-[11px] uppercase tracking-[0.14em] text-graphite-foreground/80">
            {t(
              "Wholesale · Project Supply · OEM · Custom Fasteners · Drawing-Based Manufacturing",
              "批发供应 · 工程配套 · OEM · 非标紧固件 · 图纸定制生产",
            )}
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="spec-value text-[11px] uppercase tracking-[0.14em] text-safety hover:underline"
            >
              {t("Request Quote", "获取报价")} →
            </Link>
            <LanguageSwitcher className="border-graphite-foreground/30 bg-transparent" />
          </div>
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
              <span className="eyebrow block">{t("Industrial Fasteners", "工业紧固件")}</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center xl:flex">
            <NavDropdown label={t("Products", "产品中心")} items={productItems} />
            <NavDropdown label={t("Industries", "应用行业")} items={industryItems} />
            <NavDropdown label={t("Custom Manufacturing", "非标定制")} items={customLinkDefs.map((c) => ({ label: t(c.en, c.zh), to: c.to }))} />
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
                {t("RFQ List", "询价单")} ({items.length})
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/contact">{t("Request Quote", "获取报价")}</Link>
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
                    <p className="eyebrow mb-2">{t("Products", "产品中心")}</p>
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
                    <p className="eyebrow mb-2">{t("Industries", "应用行业")}</p>
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
                    <p className="eyebrow mb-2">{t("Company", "公司")}</p>
                    <div className="grid gap-1">
                      <Link
                        to="/custom-manufacturing"
                        onClick={() => setOpen(false)}
                        className="border-b border-border/60 py-2 text-sm"
                      >
                        {t("Custom Manufacturing", "非标定制")}
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
          <ClipboardList className="h-4 w-4" /> {t("RFQ", "询价")} ({items.length})
        </Link>
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <FileUp className="h-4 w-4" /> {t("Request Quote", "获取报价")}
        </Link>
      </div>
    </>
  );
}
