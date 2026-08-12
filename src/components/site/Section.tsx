import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = "default",
  id,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "dark";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-20",
        tone === "muted" && "bg-secondary/60",
        tone === "dark" && "bg-graphite text-graphite-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        {(eyebrow || title || intro) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? (
              <p className={cn("eyebrow", tone === "dark" && "text-safety")}>{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
            ) : null}
            {intro ? (
              <p
                className={cn(
                  "mt-3 text-base",
                  tone === "dark" ? "text-graphite-foreground/75" : "text-muted-foreground",
                )}
              >
                {intro}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="blueprint-grid border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.05] md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
