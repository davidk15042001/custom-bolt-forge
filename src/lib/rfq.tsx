import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type RfqItem = {
  id: string;
  name: string;
  category: string;
  spec: string;
  quantity: string;
  note: string;
};

type RfqContextValue = {
  items: RfqItem[];
  add: (item: Omit<RfqItem, "quantity" | "note"> & Partial<Pick<RfqItem, "quantity" | "note">>) => void;
  update: (id: string, patch: Partial<RfqItem>) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const RfqContext = createContext<RfqContextValue | null>(null);
const STORAGE_KEY = "xjx-rfq-list";

export function RfqProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RfqItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as RfqItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<RfqContextValue>(
    () => ({
      items,
      add: (item) =>
        setItems((prev) =>
          prev.some((p) => p.id === item.id)
            ? prev
            : [...prev, { quantity: "", note: "", ...item }],
        ),
      update: (id, patch) =>
        setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      clear: () => setItems([]),
    }),
    [items],
  );

  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
}

export function useRfq() {
  const ctx = useContext(RfqContext);
  if (!ctx) throw new Error("useRfq must be used within RfqProvider");
  return ctx;
}
