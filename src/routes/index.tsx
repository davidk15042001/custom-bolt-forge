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
import { useT } from "@/lib/i18n";
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

function Home() {
  const t = useT();

  const routing = [
    {
      title: t("Standard Fasteners", "标准紧固件"),
      text: t("Browse bolts, nuts, anchors and threaded hardware.", "浏览螺栓、螺母、地脚螺栓及各类螺纹紧固件。"),
      cta: t("Browse Products", "浏览产品"),
      to: "/products" as const,
      icon: Boxes,
    },
    {
      title: t("Wholesale Supply", "批发供应"),
      text: t("For distributors and repeat-volume buyers.", "面向经销商及长期批量采购客户。"),
      cta: t("Request Wholesale Pricing", "获取批发价格"),
      to: "/wholesale" as const,
      icon: Handshake,
    },
    {
      title: t("Project Supply", "项目供货"),
      text: t("Submit multiple specifications or a full BOM.", "提交多规格需求或完整物料清单（BOM）。"),
      cta: t("Submit RFQ", "提交询价"),
      to: "/contact" as const,
      icon: FileSpreadsheet,
    },
    {
      title: t("Custom Fasteners", "非标定制紧固件"),
      text: t("Upload a drawing or special requirement.", "上传图纸或特殊技术要求。"),
      cta: t("Upload Drawing", "上传图纸"),
      to: "/custom-manufacturing" as const,
      icon: Ruler,
    },
  ];

  const trustStrip = [
    t("Wholesale", "批发供应"),
    t("OEM", "OEM代工"),
    t("Project Supply", "项目供货"),
    t("Custom Fasteners", "非标定制"),
    t("Drawing-Based Manufacturing", "图纸定制加工"),
  ];

  const gradeCards = [
    { g: "8.8", t: t("General structural and machinery connections.", "通用结构件及机械设备连接。") },
    { g: "10.9", t: t("Higher-load structural and equipment assemblies.", "高承载结构件及设备装配。") },
    { g: "12.9", t: t("High-torque socket screw applications.", "高扭矩内六角螺钉应用。") },
  ];

  const solarItems = [
    t("PV bolts and nuts", "光伏螺栓与螺母"),
    t("Pressure-block bolts", "压块螺栓"),
    t("C-channel fasteners", "C型钢连接件"),
    t("Support components", "支撑组件"),
    t("Clamps", "夹具"),
    t("Triangle connectors", "三角连接件"),
    t("Tile hooks", "瓦片挂钩"),
  ];

  const workflowSteps = [
    t("Drawing", "图纸"),
    t("Engineering Requirement", "工程需求"),
    t("Technical Review", "技术评审"),
    t("Quotation", "报价"),
    t("Production", "生产"),
    t("Inspection", "检验"),
    t("Delivery", "交付"),
  ];

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
            <p className="eyebrow text-safety">{t("Manufacturer · Wholesale · OEM · Export", "生产制造 · 批发供应 · OEM代工 · 出口")}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.03] md:text-6xl">
              {t(
                "Industrial Fasteners for Standard, Heavy-Duty & Custom Applications",
                "工业紧固件 —— 标准件、重型及非标定制解决方案",
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-graphite-foreground/80">
              {t(
                "Bolts, nuts, anchors, threaded components, solar fasteners and custom hardware for distributors, manufacturers, engineering companies and project buyers.",
                "为经销商、制造商、工程公司及项目采购方提供螺栓、螺母、地脚螺栓、螺纹件、光伏紧固件及非标定制五金件。",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  {t("Request B2B Quote", "获取B2B报价")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/products">{t("Explore Products", "浏览产品")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-graphite-foreground/40 bg-transparent text-graphite-foreground hover:bg-graphite-foreground/10 hover:text-graphite-foreground"
              >
                <Link to="/custom-manufacturing">
                  <FileUp className="h-4 w-4" /> {t("Upload Your Drawing", "上传您的图纸")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4">
          {trustStrip.map((s) => (
            <span key={s} className="spec-value text-xs uppercase tracking-[0.16em]">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Buyer routing */}
      <Section eyebrow={t("Buyer Routing", "采购导航")} title={t("What Do You Need?", "您需要什么？")}>
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
        eyebrow={t("Product Portfolio", "产品系列")}
        title={t("Industrial Fastener Categories", "工业紧固件分类")}
        intro={t(
          "Nine core categories covering standard assembly, structural connections, anchoring, photovoltaic mounting and non-standard components.",
          "九大核心类别，涵盖标准装配、结构连接、锚固、光伏安装及非标定制件。",
        )}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              className="group border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <p className="eyebrow">
                {c.products.length} {t("product families", "产品系列")}
              </p>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{t(c.name)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(c.intro)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("View category", "查看分类")} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/products">{t("View All Products", "查看全部产品")}</Link>
          </Button>
        </div>
      </Section>

      {/* High-strength */}
      <Section
        eyebrow={t("Grades 8.8 · 10.9 · 12.9", "强度等级 8.8 · 10.9 · 12.9")}
        title={t("High-Strength Fasteners for Demanding Applications", "高强度紧固件，满足严苛应用")}
        intro={t(
          "High-strength hex bolts and socket head cap screws are listed in grades 8.8, 10.9 and 12.9 for structural, machinery and heavy equipment connections.",
          "高强度六角螺栓及内六角螺钉提供8.8、10.9、12.9强度等级，适用于结构件、机械及重型设备连接。",
        )}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {gradeCards.map((x) => (
            <div key={x.g} className="rule-accent border border-border bg-card p-6">
              <p className="spec-value text-4xl font-bold">{x.g}</p>
              <p className="mt-2 text-sm text-muted-foreground">{x.t}</p>
            </div>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/products/$category" params={{ category: "bolts" }}>
            {t("Explore High-Strength Bolts", "查看高强度螺栓")}
          </Link>
        </Button>
      </Section>

      {/* Large bolts */}
      <section className="bg-graphite text-graphite-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-safety">{t("Large Diameter Fasteners", "大直径紧固件")}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t("Custom Heavy-Duty Bolts Up to M120", "非标重型螺栓，最大可达M120")}
            </h2>
            <p className="mt-4 text-graphite-foreground/80">
              {t(
                "For heavy machinery, structures, equipment and industrial projects requiring dimensions beyond standard fastener ranges. Length, grade, material and finish are confirmed against your drawing.",
                "适用于超出标准紧固件规格范围的重型机械、结构、设备及工业项目。长度、强度等级、材质及表面处理均根据您的图纸确认。",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">{t("Request Custom Bolt Quote", "获取非标螺栓报价")}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/products/$category" params={{ category: "custom-fasteners" }}>
                  {t("Custom Portfolio", "非标产品系列")}
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
        eyebrow={t("Anchoring", "锚固")}
        title={t("Anchor & Construction Fasteners", "地脚螺栓及建筑紧固件")}
        intro={t(
          "Foundation bolts, U-bolts, washers, expansion anchors, chemical anchors and sleeve or wedge anchoring systems for construction and machinery bases.",
          "地脚螺栓、U型螺栓、垫圈、膨胀锚栓、化学锚栓及套筒或楔式锚固系统，适用于建筑及机械基础。",
        )}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ...(categories.find((c) => c.slug === "anchor-bolts")?.products ?? []),
            ...(categories.find((c) => c.slug === "expansion-anchors")?.products ?? []),
          ]
            .slice(0, 8)
            .map((p) => (
              <div key={p.slug} className="border border-border bg-card p-5">
                <h3 className="text-base font-semibold">{t(p.name)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(p.summary)}</p>
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
            <p className="eyebrow">{t("Solar / PV", "光伏 / PV")}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t("Fasteners for Solar Mounting Systems", "光伏支架安装紧固件")}
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {solarItems.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-safety" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/products/$category" params={{ category: "solar-fasteners" }}>
                  {t("Explore Solar Fasteners", "查看光伏紧固件")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/industries/$slug" params={{ slug: "solar" }}>
                  {t("Request PV Project Quote", "获取光伏项目报价")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Custom manufacturing */}
      <Section
        eyebrow={t("Custom Manufacturing", "非标定制加工")}
        title={t("Standard Doesn't Fit Your Application?", "标准件不适用于您的应用场景？")}
        intro={t(
          "From special geometries to oversized M30–M120 bolts and drawing-based components, submit your technical requirement for review.",
          "从特殊几何形状到超大规格M30-M120螺栓及图纸定制零件，请提交您的技术需求以供评审。",
        )}
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
              {workflowSteps.map((s, idx) => (
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
                <FileUp className="h-4 w-4" /> {t("Upload Your Drawing", "上传您的图纸")}
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Industries */}
      <Section tone="muted" eyebrow={t("Applications", "应用领域")} title={t("Industries We Serve", "服务行业")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group border border-border bg-card p-6 hover:border-primary"
            >
              <h3 className="text-lg font-semibold group-hover:text-primary">{t(i.name)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(i.description)}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Manufacturing & quality */}
      <Section eyebrow={t("Capability", "生产能力")} title={t("Manufacturing & Quality", "生产制造与质量控制")}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <Factory className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-2xl font-semibold">{t("Manufacturing", "生产制造")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Standard catalogue supply alongside drawing-based production for special geometries and large-diameter components. Process details are confirmed per project.",
                "在提供标准目录产品的同时，也可根据图纸生产特殊几何形状及大直径零件。工艺细节按项目确认。",
              )}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/manufacturing">{t("Manufacturing Capability", "生产能力")}</Link>
            </Button>
          </div>
          <div className="border border-border bg-card p-8">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-2xl font-semibold">{t("Quality Control", "质量控制")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Dimensional, thread and visual inspection stages applied to confirmed specifications. Documentation is provided according to the agreed scope.",
                "针对已确认规格进行尺寸、螺纹及外观检验。相关文件根据约定范围提供。",
              )}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/quality">{t("Quality Process", "质量流程")}</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Wholesale + BOM CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{t("Wholesale & Project Supply", "批发与项目供货")}</h2>
            <p className="mt-3 text-primary-foreground/80">
              {t(
                "Request quotations for a single product, mixed specifications, bulk quantities, annual purchasing or full project requirements.",
                "无论是单一产品、混合规格、批量采购、年度采购还是完整项目需求，均可获取报价。",
              )}
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-6">
              <Link to="/wholesale">{t("Request Wholesale Quote", "获取批发报价")}</Link>
            </Button>
          </div>
          <div className="border border-primary-foreground/25 p-6">
            <h3 className="text-2xl font-semibold">{t("Upload Your BOM", "上传您的物料清单")}</h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {t(
                "Have multiple fastener specifications? Upload your BOM or purchasing list (XLS, XLSX, CSV, PDF) instead of entering each product manually.",
                "有多种紧固件规格需求？上传您的物料清单（BOM）或采购清单（XLS、XLSX、CSV、PDF），无需逐项手动填写。",
              )}
            </p>
            <Button asChild variant="secondary" className="mt-5">
              <Link to="/contact" hash="bom">
                {t("Upload BOM", "上传物料清单")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Distributor + resources */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold">{t("Become a Fastener Distributor", "成为紧固件经销商")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Cooperation for fastener distributors, hardware distributors, importers, construction suppliers and solar hardware distributors.",
                "面向紧固件经销商、五金经销商、进口商、建筑供应商及光伏五金经销商开展合作。",
              )}
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/distributors">{t("Apply for Distribution", "申请成为经销商")}</Link>
            </Button>
          </div>
          <div className="border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold">{t("Technical Resources", "技术资料")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Product catalog, datasheets, drawings, standards, certificates and RFQ templates on request.",
                "可提供产品目录、技术数据表、图纸、标准、证书及询价模板。",
              )}
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/resources">{t("Download Catalog", "下载产品目录")}</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* RFQ form */}
      <Section
        tone="muted"
        id="rfq"
        eyebrow={t("B2B RFQ", "B2B询价")}
        title={t("Submit Your Requirement", "提交您的需求")}
        intro={t(
          "Send your product list, dimensions, quantities, BOM or technical drawing for quotation.",
          "发送您的产品清单、尺寸、数量、物料清单（BOM）或技术图纸以获取报价。",
        )}
      >
        <div className="border border-border bg-card p-6 md:p-10">
          <RfqForm variant="product" />
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow={t("FAQ", "常见问题")} title={t("Products & B2B Questions", "产品与B2B常见问题")}>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {t(f.q)}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{t(f.a)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-border bg-graphite text-graphite-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl">{t("Need Standard or Custom Fasteners?", "需要标准件或非标定制紧固件？")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-graphite-foreground/80">
            {t(
              "Send us your product list, dimensions, quantities, BOM or technical drawing for quotation.",
              "请将您的产品清单、尺寸、数量、物料清单（BOM）或技术图纸发送给我们以获取报价。",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">{t("Submit RFQ", "提交询价")}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/custom-manufacturing">{t("Upload Drawing", "上传图纸")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-graphite-foreground/40 bg-transparent text-graphite-foreground hover:bg-graphite-foreground/10 hover:text-graphite-foreground"
            >
              <Link to="/resources">{t("Download Catalog", "下载产品目录")}</Link>
            </Button>
          </div>
          <p className="mt-8 text-xs text-graphite-foreground/50">
            {COMPANY.name} · {workflow.length}{t("-step custom manufacturing workflow", "步非标定制加工流程")}
          </p>
        </div>
      </section>
    </>
  );
}
