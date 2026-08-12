import { Link } from "@tanstack/react-router";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/catalog";
import { useRfq } from "@/lib/rfq";

export function ProductCard({
  product,
  categorySlug,
  categoryName,
}: {
  product: Product;
  categorySlug: string;
  categoryName: string;
}) {
  const { items, add } = useRfq();
  const id = `${categorySlug}/${product.slug}`;
  const inList = items.some((i) => i.id === id);

  return (
    <article className="flex flex-col border border-border bg-card p-5 transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">{categoryName}</p>
        <Badge variant={product.custom ? "default" : "secondary"} className="rounded-none text-[10px]">
          {product.custom ? "Custom" : "Standard"}
        </Badge>
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug">{product.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{product.summary}</p>

      <dl className="mt-4 space-y-1.5 border-t border-border pt-4">
        {product.specs.map((s) => (
          <div key={s.label} className="flex justify-between gap-4 text-sm">
            <dt className="text-muted-foreground">{s.label}</dt>
            <dd className="spec-value text-right font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">{product.applications.join(" · ")}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to="/products/$category" params={{ category: categorySlug }} hash={product.slug}>
            View Specifications
          </Link>
        </Button>
        <Button
          size="sm"
          variant={inList ? "secondary" : "default"}
          onClick={() =>
            add({
              id,
              name: product.name,
              category: categoryName,
              spec: product.specs.map((s) => `${s.label}: ${s.value}`).join(" · "),
            })
          }
        >
          {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {inList ? "In RFQ List" : "Add to RFQ"}
        </Button>
      </div>
    </article>
  );
}
