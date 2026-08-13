import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/site/Section";
import { RfqForm } from "@/components/site/RfqForm";
import { workflow } from "@/data/catalog";
import drawingImg from "@/assets/custom-drawing.jpg";
import largeBoltImg from "@/assets/large-bolts.jpg";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/custom-manufacturing")({
  head: () => ({
    meta: [
      { title: "Custom Fastener Manufacturer — Drawing-Based Bolts M30–M120 | Xiangjinxin" },
      {
        name: "description",
        content:
          "Custom fastener manufacturing from your drawing: special-shaped bolts, oversized and extra-long components, reverse thread and trapezoidal threaded rods.",
      },
      { property: "og:title", content: "Custom Fastener Manufacturing" },
      {
        property: "og:description",
        content: "Send us your drawing, dimensions or sample for technical and commercial review.",
      },
      { property: "og:url", content: "/custom-manufacturing" },
    ],
    links: [{ rel: "canonical", href: "/custom-manufacturing" }],
  }),
  component: CustomManufacturing,
});

const capabilities = [
  {
    en: "Special Bolt Shapes",
    zh: "特殊形状螺栓",
    de: "T-slot, eye, articulated, square-head and other non-standard geometries.",
    dz: "T型槽螺栓、吊环螺栓、活节螺栓、方头螺栓及其他非标外形。",
  },
  {
    en: "Oversized Components",
    zh: "超大规格部件",
    de: "Custom bolts handled in the M30 to M120 category.",
    dz: "可定制生产M30至M120规格的大型螺栓。",
  },
  {
    en: "Extended Fasteners",
    zh: "加长紧固件",
    de: "Extra-long components beyond standard catalogue lengths.",
    dz: "超出标准目录长度范围的加长部件。",
  },
  {
    en: "Reverse Thread",
    zh: "反向螺纹",
    de: "Left-hand thread screws for specific mechanical requirements.",
    dz: "用于特定机械需求的左旋螺纹螺钉。",
  },
  {
    en: "Trapezoidal Threads",
    zh: "梯形螺纹",
    de: "Trapezoidal threaded rods for motion and load transfer.",
    dz: "用于传动与承载的梯形螺纹杆。",
  },
  {
    en: "Drawing-Based Products",
    zh: "来图定制产品",
    de: "Components manufactured to your PDF, DWG, DXF or STEP file.",
    dz: "根据您提供的PDF、DWG、DXF或STEP文件加工的部件。",
  },
  {
    en: "Application-Specific Components",
    zh: "特定应用部件",
    de: "Parts defined by application, sample or existing part.",
    dz: "根据应用场景、样品或现有零件确定规格的部件。",
  },
];

function CustomManufacturing() {
  const t = useT();
  return (
    <>
      <PageHero
        eyebrow={t("Custom Manufacturing", "定制加工")}
        title={t(
          "Send Us Your Drawing. We'll Review the Requirement.",
          "发送图纸给我们，我们将为您评估需求。",
        )}
        intro={t(
          "Special geometries, oversized parts, reverse threads and drawing-based components reviewed by our technical and commercial team.",
          "特殊外形、超大规格部件、反向螺纹及来图定制产品，均由我们的技术与商务团队进行评估。",
        )}
      >
        <Button asChild>
          <Link to="/custom-manufacturing" hash="drawing">
            {t("Upload Technical Drawing", "上传技术图纸")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/products/$category" params={{ category: "custom-fasteners" }}>
            {t("Custom Portfolio", "定制产品系列")}
          </Link>
        </Button>
      </PageHero>

      <Section eyebrow={t("Capabilities", "加工能力")} title={t("What can be customised", "可定制内容")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.en} className="border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{t(c.en, c.zh)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(c.de, c.dz)}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-graphite text-graphite-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <img
            src={largeBoltImg}
            alt="Large diameter custom bolt on a machining table"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full border border-graphite-foreground/15 object-cover"
          />
          <div>
            <p className="eyebrow text-safety">{t("Large & Oversized Fasteners", "大型及超大规格紧固件")}</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t("Custom bolts from M30 up to M120", "定制螺栓，规格覆盖M30至M120")}
            </h2>
            <p className="mt-4 text-graphite-foreground/80">
              {t(
                "For heavy machinery, steel construction, infrastructure, energy, mining equipment, heavy transport and industrial plants. Length, grade, material and finish are agreed against your documentation — contact us for details.",
                "适用于重型机械、钢结构、基础设施、能源、矿山设备、重型运输及工业厂房。长度、等级、材质与表面处理将根据您的技术文件确认——详情请联系我们。",
              )}
            </p>
            <Button asChild size="lg" className="mt-7">
              <Link to="/custom-manufacturing" hash="drawing">
                {t("Request Large Bolt Quote", "获取大型螺栓报价")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section tone="muted" eyebrow={t("Process", "工艺流程")} title={t("Customisation Workflow", "定制流程")}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((w) => (
            <li key={w.step} className="border border-border bg-card p-5">
              <p className="spec-value text-sm text-safety">{w.step}</p>
              <p className="mt-1 font-semibold">{t(w.title)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(w.text)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="drawing" eyebrow={t("Custom Fastener RFQ", "定制紧固件询价")} title={t("Submit Technical Requirement", "提交技术需求")}>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="border border-border bg-card p-6 md:p-8">
            <RfqForm variant="custom" submitLabel={t("Submit Technical Requirement", "提交技术需求")} />
          </div>
          <aside>
            <img
              src={drawingImg}
              alt="Engineering drawing with dimension lines and machined fastener"
              loading="lazy"
              width={1200}
              height={800}
              className="w-full border border-border object-cover"
            />
            <div className="mt-4 border border-border bg-card p-5 text-sm text-muted-foreground">
              {t(
                "Accepted files: PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX. If you only have a sample or an application description, send that instead — the specification is defined during technical review.",
                "支持的文件格式：PDF、DWG、DXF、STEP、STP、JPG、PNG、XLSX。如果您只有样品或应用场景说明，也可以直接提供——具体规格将在技术评审阶段确定。",
              )}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
