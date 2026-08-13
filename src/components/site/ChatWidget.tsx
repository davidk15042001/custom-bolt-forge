import { useState } from "react";
import { X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { sendChatMessage } from "@/lib/chat.functions";
import { useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import botLogo from "@/assets/chat-assistant.png";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function ChatWidget({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const t = useT();
  const { lang } = useLang();
  const send = useServerFn(sendChatMessage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const suggestions = [
    t("M42 anchor bolts, 500 pcs", "M42 地脚螺栓，500 件"),
    t("Do you supply grade 10.9 hex bolts?", "有 10.9 级外六角螺栓吗？"),
    t("Custom bolt from my drawing", "按图纸定制螺栓"),
  ];

  async function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    const next = [...messages, { role: "user" as const, content: value }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await send({ data: { lang, messages: next.slice(-20) } });
      const errorText =
        res.error === "rate_limit"
          ? t("Too many requests, please try again shortly.", "请求过于频繁，请稍后再试。")
          : res.error
            ? t(
                "The assistant is unavailable right now. Please use the RFQ form or WhatsApp.",
                "客服助手暂时不可用，请使用询价表单或 WhatsApp 联系我们。",
              )
            : null;
      setMessages([
        ...next,
        { role: "assistant", content: errorText ?? res.reply ?? "" },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: t(
            "Connection problem. Please try again.",
            "连接出现问题，请重试。",
          ),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-36 right-4 z-50 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col border border-border bg-background shadow-2xl",
        "sm:bottom-24",
      )}
      role="dialog"
      aria-label={t("Sales assistant", "在线客服")}
    >
      <div className="flex items-center gap-3 border-b border-border bg-graphite px-4 py-3 text-graphite-foreground">
        <img
          src={botLogo}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="h-8 w-8 object-contain"
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold">{t("Fastener Sales Assistant", "紧固件在线客服")}</p>
          <p className="text-[11px] text-graphite-foreground/70">
            {t("Specs, grades & RFQ support", "规格、等级与询价支持")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label={t("Close chat", "关闭对话")}
          className="ml-auto text-graphite-foreground/70 hover:text-graphite-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <Conversation className="flex-1">
        <ConversationContent className="gap-3 p-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {t(
                  "Ask about standards, grades, diameters up to M120 or custom drawings.",
                  "欢迎咨询标准、强度等级、最大 M120 的规格或图纸定制。",
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="border border-border px-2.5 py-1.5 text-xs text-foreground hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <Message key={i} from={m.role}>
              <MessageContent
                className={cn(
                  m.role === "assistant" && "bg-transparent p-0 text-foreground",
                )}
              >
                <MessageResponse>{m.content}</MessageResponse>
              </MessageContent>
            </Message>
          ))}
          {busy && <Shimmer className="text-sm">{t("Thinking...", "正在思考…")}</Shimmer>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3">
        <PromptInput
          onSubmit={(_, e) => {
            e.preventDefault();
            void submit(input);
          }}
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("Type your enquiry…", "请输入您的需求…")}
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              {...(busy ? { status: "submitted" as const } : {})}
              disabled={!input.trim()}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
