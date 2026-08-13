import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero, Section } from "@/components/site/Section";
import { useRfq } from "@/lib/rfq";
import { useT } from "@/lib/i18n";

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
  const t = useT();
  const { items, update, remove, clear } = useRfq();

  return (
    <>
      <PageHero
        eyebrow={t("Request for Quotation", "询价请求")}
        title={`${t("RFQ List", "询价清单")} (${items.length})`}
        intro={t(
          "Add sizes, quantities and technical notes to each line, then submit one combined request.",
          "为每一行添加尺寸、数量及技术备注，然后一并提交请求。",
        )}
      />

      <Section className="py-12">
        {items.length === 0 ? (
          <div className="border border-border bg-card p-10 text-center">
            <p className="text-lg font-semibold">{t("Your RFQ list is empty", "您的询价清单为空")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Add products from the catalogue, or submit a BOM or drawing directly.",
                "请从产品目录中添加产品，或直接提交BOM清单或图纸。",
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/products">{t("Browse Products", "浏览产品")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact" hash="bom">
                  {t("Upload BOM", "上传BOM清单")}
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
                    placeholder={t("Quantity (e.g. 5,000 pcs)", "数量（例如：5,000件）")}
                    onChange={(e) => update(item.id, { quantity: e.target.value })}
                  />
                  <Input
                    value={item.note}
                    maxLength={200}
                    placeholder={t("Size / grade / notes (e.g. M20, 10.9, HDG)", "尺寸 / 等级 / 备注（例如：M20，10.9级，热镀锌）")}
                    onChange={(e) => update(item.id, { note: e.target.value })}
                  />
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild size="lg">
                <Link to="/contact">{t("Request Quotation", "申请报价")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact" hash="bom">
                  {t("Upload BOM Instead", "改为上传BOM清单")}
                </Link>
              </Button>
              <Button variant="ghost" size="lg" onClick={clear}>
                {t("Clear list", "清空清单")}
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
