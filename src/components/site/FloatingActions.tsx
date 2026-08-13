import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatWidget } from "@/components/site/ChatWidget";
import { useT } from "@/lib/i18n";

export const WHATSAPP_NUMBER = "4917641474606";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.23 8.23z" />
    </svg>
  );
}

export function FloatingActions() {
  const t = useT();
  const [chatOpen, setChatOpen] = useState(false);

  const waText = encodeURIComponent(
    t(
      "Hello, I would like to request a quote for fasteners.",
      "您好，我想咨询紧固件报价。",
    ),
  );

  return (
    <>
      <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("Chat on WhatsApp", "WhatsApp 咨询")}
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label={t("Open sales assistant", "打开在线客服")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
