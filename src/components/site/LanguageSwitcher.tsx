import { Globe } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cn(
        "flex items-center gap-1 border border-border bg-background px-1 py-0.5",
        className,
      )}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="mx-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={cn(
            "px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            lang === o.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
