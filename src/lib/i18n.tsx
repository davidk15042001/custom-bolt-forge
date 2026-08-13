import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { zhDict } from "@/data/i18n-dict";

export type Lang = "en" | "zh";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "xjx-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "zh" || stored === "en") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/**
 * Translation helper.
 *   t("Products")             -> looks the English string up in zhDict
 *   t("Products", "产品")      -> uses the inline Chinese translation
 */
export function useT() {
  const { lang } = useLang();
  return useCallback(
    (en: string, zh?: string) => {
      if (lang !== "zh") return en;
      return zh ?? zhDict[en] ?? en;
    },
    [lang],
  );
}

/** Translate a data string (catalog content) via the dictionary. */
export function translate(lang: Lang, en: string) {
  if (lang !== "zh") return en;
  return zhDict[en] ?? en;
}
