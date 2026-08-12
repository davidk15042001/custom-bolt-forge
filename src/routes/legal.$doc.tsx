import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { COMPANY } from "@/data/catalog";

const docs: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy",
    body: [
      "We process the contact and requirement details you submit through our request forms solely to review your enquiry, prepare a quotation and communicate with you about it.",
      "Uploaded files such as BOMs, drawings and specifications are treated as confidential business information and shared internally only with the technical and commercial team handling your request.",
      "You can ask us to correct or delete your data at any time by contacting " + COMPANY.email + ".",
    ],
  },
  terms: {
    title: "Terms",
    body: [
      "Information published on this website describes the product portfolio and capability scope. It does not constitute a binding offer.",
      "Specifications, quantities, packaging, delivery and commercial terms become binding only in a written quotation or order confirmation issued by " +
        COMPANY.name +
        ".",
      "Technical values are confirmed per item before quotation. Where a value is not published, it has not yet been confirmed for that product.",
    ],
  },
  cookies: {
    title: "Cookies",
    body: [
      "This website stores your RFQ list in your browser's local storage so your selection is preserved between visits. It is not transmitted until you submit a request.",
      "No advertising or third-party tracking cookies are set by default.",
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
        { name: "description", content: loaderData.doc.body[0]?.slice(0, 150) ?? "" },
        { property: "og:title", content: title },
        { property: "og:url", content: `/legal/${params.doc}` },
      ],
      links: [{ rel: "canonical", href: `/legal/${params.doc}` }],
    };
  },
  component: LegalPage,
});

function LegalPage() {
  const { doc } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} intro={COMPANY.name} />
      <Section className="py-12">
        <div className="max-w-3xl space-y-4 text-muted-foreground">
          {doc.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
