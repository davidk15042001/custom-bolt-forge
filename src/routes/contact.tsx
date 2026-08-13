import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { COMPANY } from "@/data/catalog";
import { useRfq } from "@/lib/rfq";
import { useT } from "@/lib/i18n";

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
  const t = useT();
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
        eyebrow={t("Request Center", "请求中心")}
        title={t(
          "Send your requirement to our sales engineering team",
          "将您的需求发送给我们的销售工程团队",
        )}
        intro={t(
          "Choose the request type that matches your need. Each request is routed to the responsible team internally.",
          "请选择与您需求相符的请求类型。每项请求都会在内部转交给相应的负责团队。",
        )}
      >
        <Button asChild variant="outline">
          <Link to="/rfq">{t("RFQ List", "询价清单")} ({items.length})</Link>
        </Button>
      </PageHero>

      <Section className="py-12">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-secondary p-1">
            <TabsTrigger value="product">{t("Product RFQ", "产品询价")}</TabsTrigger>
            <TabsTrigger value="bom">{t("BOM RFQ", "BOM清单询价")}</TabsTrigger>
            <TabsTrigger value="custom">{t("Custom Drawing", "定制图纸")}</TabsTrigger>
            <TabsTrigger value="project">{t("Project Inquiry", "项目询盘")}</TabsTrigger>
            <TabsTrigger value="distributor">{t("Distributor Application", "经销商申请")}</TabsTrigger>
            <TabsTrigger value="general">{t("General Inquiry", "一般咨询")}</TabsTrigger>
          </TabsList>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="border border-border bg-card p-6 md:p-8">
              <TabsContent value="product">
                <RfqForm variant="product" presetProducts={preset} />
              </TabsContent>
              <TabsContent value="bom" id="bom">
                <p className="mb-6 text-sm text-muted-foreground">
                  {t(
                    "Have multiple fastener specifications? Upload your BOM or purchasing list (XLS, XLSX, CSV, PDF) instead of entering each product manually.",
                    "有多种紧固件规格？可直接上传您的BOM或采购清单（XLS、XLSX、CSV、PDF），无需逐项手动填写。",
                  )}
                </p>
                <RfqForm variant="bom" submitLabel={t("Upload BOM", "上传BOM清单")} />
              </TabsContent>
              <TabsContent value="custom">
                <RfqForm variant="custom" submitLabel={t("Submit Technical Requirement", "提交技术需求")} />
              </TabsContent>
              <TabsContent value="project">
                <RfqForm variant="project" submitLabel={t("Submit Project RFQ", "提交项目询价")} />
              </TabsContent>
              <TabsContent value="distributor">
                <RfqForm variant="distributor" submitLabel={t("Submit Distributor Application", "提交经销商申请")} />
              </TabsContent>
              <TabsContent value="general">
                <RfqForm variant="general" submitLabel={t("Send Inquiry", "发送咨询")} />
              </TabsContent>
            </div>

            <aside className="space-y-4">
              <div className="border border-border bg-card p-5 text-sm">
                <p className="eyebrow mb-2">{t("Company", "公司信息")}</p>
                <p className="font-semibold">{COMPANY.name}</p>
                <p className="mt-2 text-muted-foreground">{COMPANY.address}</p>
                <p className="mt-2 text-muted-foreground">{COMPANY.email}</p>
              </div>
              <div className="border border-border bg-card p-5 text-sm">
                <p className="eyebrow mb-2">{t("Helpful for a fast quotation", "有助于快速报价的信息")}</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>· {t("Product type and quantity", "产品类型及数量")}</li>
                  <li>· {t("Diameter, length and thread", "直径、长度及螺纹规格")}</li>
                  <li>· {t("Grade, material and surface", "等级、材质及表面处理")}</li>
                  <li>· {t("Standard or drawing reference", "执行标准或图纸编号")}</li>
                  <li>· {t("Application and target market", "应用场景及目标市场")}</li>
                </ul>
              </div>
            </aside>
          </div>
        </Tabs>
      </Section>
    </>
  );
}
