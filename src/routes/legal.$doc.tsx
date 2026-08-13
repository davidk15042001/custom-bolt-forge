import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { COMPANY } from "@/data/catalog";
import { useT } from "@/lib/i18n";

const docs: Record<string, { title: string; titleZh: string; body: { en: string; zh: string }[] }> = {
  privacy: {
    title: "Privacy",
    titleZh: "隐私政策",
    body: [
      {
        en: "We process the contact and requirement details you submit through our request forms solely to review your enquiry, prepare a quotation and communicate with you about it.",
        zh: "我们仅将您通过请求表单提交的联系方式及需求信息用于审核您的咨询、准备报价并与您沟通相关事宜。",
      },
      {
        en: "Uploaded files such as BOMs, drawings and specifications are treated as confidential business information and shared internally only with the technical and commercial team handling your request.",
        zh: "上传的BOM清单、图纸及规格等文件将作为保密商业信息处理，仅在内部与负责处理您请求的技术及商务团队共享。",
      },
      {
        en: "You can ask us to correct or delete your data at any time by contacting " + COMPANY.email + ".",
        zh: "您可以随时通过联系 " + COMPANY.email + " 要求更正或删除您的数据。",
      },
    ],
  },
  terms: {
    title: "Terms",
    titleZh: "条款",
    body: [
      {
        en: "Information published on this website describes the product portfolio and capability scope. It does not constitute a binding offer.",
        zh: "本网站发布的信息用于介绍产品系列及能力范围，不构成具有约束力的要约。",
      },
      {
        en:
          "Specifications, quantities, packaging, delivery and commercial terms become binding only in a written quotation or order confirmation issued by " +
          COMPANY.name +
          ".",
        zh:
          "规格、数量、包装、交货及商务条款仅在由 " +
          COMPANY.name +
          " 出具的书面报价或订单确认中方具有约束力。",
      },
      {
        en: "Technical values are confirmed per item before quotation. Where a value is not published, it has not yet been confirmed for that product.",
        zh: "技术参数将在报价前逐项确认。如某项数值未公开，则表示该产品尚未确认该参数。",
      },
    ],
  },
  cookies: {
    title: "Cookies",
    titleZh: "Cookie政策",
    body: [
      {
        en: "This website stores your RFQ list in your browser's local storage so your selection is preserved between visits. It is not transmitted until you submit a request.",
        zh: "本网站将您的询价清单存储在浏览器本地存储中，以便在多次访问间保留您的选择。在您提交请求之前，该数据不会被传输。",
      },
      {
        en: "No advertising or third-party tracking cookies are set by default.",
        zh: "默认情况下不会设置任何广告或第三方跟踪Cookie。",
      },
    ],
  },
};

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    const doc = docs[params.doc];
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.doc.title} | ${COMPANY.shortName}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.doc.body[0]?.en.slice(0, 150) ?? "" },
        { property: "og:title", content: title },
        { property: "og:url", content: `/legal/${params.doc}` },
      ],
      links: [{ rel: "canonical", href: `/legal/${params.doc}` }],
    };
  },
  component: LegalPage,
});

function LegalPage() {
  const t = useT();
  const { doc } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={t("Legal", "法律信息")} title={t(doc.title, doc.titleZh)} intro={COMPANY.name} />
      <Section className="py-12">
        <div className="max-w-3xl space-y-4 text-muted-foreground">
          {doc.body.map((p) => (
            <p key={p.en}>{t(p.en, p.zh)}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
