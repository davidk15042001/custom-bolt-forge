import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Technical Resources — Catalog, Datasheets & Documents | Xiangjinxin" },
      {
        name: "description",
        content:
          "Request the product catalog, technical datasheets, drawings, standards, certificates, installation information and RFQ templates.",
      },
      { property: "og:title", content: "Technical Resources" },
      {
        property: "og:description",
        content: "Fastener catalog, datasheets and technical documentation on request.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const docs = [
  { en: "Product Catalog", zh: "产品目录", de: "Overview of the fastener portfolio by category.", dz: "按类别划分的紧固件产品概览。" },
  { en: "Technical Datasheets", zh: "技术数据表", de: "Specification sheets for confirmed product families.", dz: "已确认产品系列的规格数据表。" },
  { en: "Drawings", zh: "图纸", de: "Dimensional drawings for standard and custom items.", dz: "标准件及定制件的尺寸图纸。" },
  { en: "Standards", zh: "执行标准", de: "Applicable standard references per quoted item.", dz: "每个报价项目对应的适用标准参考。" },
  { en: "Certificates", zh: "认证证书", de: "Certification documents relevant to your product scope.", dz: "与您的产品范围相关的认证文件。" },
  { en: "Installation Information", zh: "安装信息", de: "Handling and installation notes where available.", dz: "如有提供，将附带搬运及安装说明。" },
  { en: "RFQ Templates", zh: "询价模板", de: "Structured templates for product and BOM requests.", dz: "用于产品及BOM请求的标准化模板。" },
];

function Resources() {
  const t = useT();
  return (
    <>
      <PageHero
        eyebrow={t("Resources", "资料中心")}
        title={t("Technical Resources", "技术资料")}
        intro={t(
          "Documents are released against your product scope. Tell us what you need and we will send the relevant files.",
          "文件将根据您的产品范围提供。请告知我们您的需求，我们会发送相关文件。",
        )}
      />

      <Section eyebrow={t("Available Documents", "可提供文件")} title={t("What you can request", "可申请的内容")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <div key={d.en} className="border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">{t(d.en, d.zh)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t(d.de, d.dz)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={t("Document Request", "文件申请")} title={t("Request Technical Document", "申请技术文件")}>
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="general" submitLabel={t("Request Document", "申请文件")} />
        </div>
      </Section>
    </>
  );
}
