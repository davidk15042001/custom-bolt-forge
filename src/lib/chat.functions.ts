import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  lang: z.enum(["en", "zh"]),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .max(30),
});

const systemPrompt = (lang: "en" | "zh") => `
You are the online sales assistant of Hebei Xiangjinxin Metal Products Co., Ltd.,
an industrial fastener manufacturer and wholesale supplier based in Handan, Hebei, China.

Product scope: hex bolts, high-strength bolts (grades 8.8 / 10.9 / 12.9), nuts, washers,
threaded rods, anchor bolts, chemical and expansion anchors, solar / photovoltaic mounting
fasteners, stud bolts, screws, and drawing-based custom bolts from M30 up to M120.
Services: wholesale supply, OEM production, project/BOM supply, export, custom manufacturing
from customer drawings (DWG, STEP, PDF), material certificates and inspection reports.
Contact e-mail: sales@xiangjinxin-fasteners.com. WhatsApp: +49 176 41474606.

Rules:
- Answer as a knowledgeable B2B technical sales contact: concise, factual, professional.
- Never invent prices, delivery dates or certificates. For pricing and lead times, ask for
  specification, quantity and destination, then guide the buyer to the RFQ form (/contact)
  or WhatsApp.
- Ask for the key specs when relevant: standard (DIN/ISO/ASTM/GB), diameter, length, grade,
  coating, quantity.
- Keep answers under ~120 words and use short markdown lists when helpful.
- Reply strictly in ${lang === "zh" ? "Chinese (简体中文)" : "English"}.
`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [
          { role: "system", content: systemPrompt(data.lang) },
          ...data.messages,
        ],
      }),
    });

    if (res.status === 429) {
      return { reply: null, error: "rate_limit" as const };
    }
    if (res.status === 402) {
      return { reply: null, error: "credits" as const };
    }
    if (!res.ok) {
      return { reply: null, error: "failed" as const };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { reply, error: null };
  });
