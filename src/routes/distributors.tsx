import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/distributors")({
  head: () => ({
    meta: [
      { title: "Become a Fastener Distributor — Partnership Application | Xiangjinxin" },
      {
        name: "description",
        content:
          "Distribution cooperation for industrial fastener distributors, hardware distributors, importers, construction suppliers and solar hardware distributors.",
      },
      { property: "og:title", content: "Become a Fastener Distributor" },
      {
        property: "og:description",
        content: "Apply for distribution cooperation across the fastener portfolio.",
      },
      { property: "og:url", content: "/distributors" },
    ],
    links: [{ rel: "canonical", href: "/distributors" }],
  }),
  component: Distributors,
});

const scopeItems = [
  { en: "Broad product portfolio across nine fastener categories", zh: "覆盖九大紧固件品类的丰富产品线" },
  { en: "Bulk sourcing and repeat purchasing", zh: "批量采购与长期复购" },
  { en: "Standard catalogue products", zh: "标准目录产品" },
  { en: "Special and drawing-based products", zh: "特殊及来图定制产品" },
  { en: "Mixed RFQs across multiple categories", zh: "跨品类混合询价" },
  {
    en: "Regional sales agent discussions for construction, machinery, steel, fastener, solar and industrial procurement networks",
    zh: "面向建筑、机械、钢结构、紧固件、光伏及工业采购网络的区域销售代理合作洽谈",
  },
];

function Distributors() {
  const t = useT();
  return (
    <>
      <PageHero
        eyebrow={t("Partnership", "合作伙伴")}
        title={t("Become a Fastener Distributor", "成为紧固件经销商")}
        intro={t(
          "Cooperation for distributors, importers, construction suppliers and solar hardware resellers across the full portfolio.",
          "面向经销商、进口商、建筑供应商及光伏五金分销商的全系列产品合作。",
        )}
      />

      <Section eyebrow={t("Cooperation Scope", "合作范围")} title={t("What cooperation can cover", "合作可涵盖的内容")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scopeItems.map((s) => (
            <div key={s.en} className="rule-accent border border-border bg-card p-5 text-sm">
              {t(s.en, s.zh)}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          {t(
            "Commercial terms, territory arrangements and agent conditions are discussed individually. No exclusivity is implied before a written agreement.",
            "商务条款、区域安排及代理条件将逐一商议。在签署书面协议之前，不隐含任何排他性安排。",
          )}
        </p>
      </Section>

      <Section tone="muted" eyebrow={t("Application", "申请")} title={t("Submit Distributor Application", "提交经销商申请")}>
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="distributor" submitLabel={t("Submit Distributor Application", "提交经销商申请")} />
        </div>
      </Section>
    </>
  );
}
