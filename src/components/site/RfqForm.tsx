import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buyerTypes, categories } from "@/data/catalog";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

type Variant = "product" | "bom" | "custom" | "project" | "distributor" | "general";

const accepts: Record<Variant, string> = {
  product: ".pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png",
  bom: ".xls,.xlsx,.csv,.pdf",
  custom: ".pdf,.dwg,.dxf,.step,.stp,.jpg,.jpeg,.png,.xlsx",
  project: ".pdf,.xls,.xlsx,.csv,.doc,.docx",
  distributor: ".pdf,.xlsx,.csv",
  general: ".pdf,.jpg,.jpeg,.png,.xlsx",
};

export function RfqForm({
  variant = "product",
  submitLabel = "Submit RFQ",
  presetProducts,
}: {
  variant?: Variant;
  submitLabel?: string;
  presetProducts?: string | undefined;
}) {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error("Please enter a valid business email address.");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      setFileNames([]);
      toast.success("Request received", {
        description: "Our sales engineering team will review your requirement and reply by email.",
      });
    }, 500);
  };

  const selectClass =
    "h-9 w-full border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <p className="eyebrow mb-3">Contact</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <Input name="name" required maxLength={100} />
          </Field>
          <Field label="Company">
            <Input name="company" required maxLength={120} />
          </Field>
          <Field label="Business email">
            <Input name="email" type="email" required maxLength={160} />
          </Field>
          <Field label="Phone / WhatsApp / WeChat">
            <Input name="phone" maxLength={60} />
          </Field>
          <Field label="Country">
            <Input name="country" required maxLength={80} />
          </Field>
          <Field label="Website">
            <Input name="website" maxLength={160} placeholder="Optional" />
          </Field>
        </div>
      </div>

      {variant !== "general" && (
        <div>
          <p className="eyebrow mb-3">Buyer profile</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Buyer type">
              <select name="buyerType" className={selectClass} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {buyerTypes.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Target market">
              <Input name="market" maxLength={120} placeholder="Optional" />
            </Field>
          </div>
        </div>
      )}

      {(variant === "product" || variant === "custom" || variant === "project") && (
        <div>
          <p className="eyebrow mb-3">Requirement</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Product category">
              <select name="category" className={selectClass} defaultValue="">
                <option value="">Select</option>
                {categories.map((c) => (
                  <option key={c.slug}>{c.short}</option>
                ))}
              </select>
            </Field>
            <Field label="Diameter">
              <Input name="diameter" placeholder="e.g. M20" maxLength={40} />
            </Field>
            <Field label="Length">
              <Input name="length" maxLength={40} />
            </Field>
            <Field label="Thread">
              <Input name="thread" maxLength={40} />
            </Field>
            <Field label="Grade">
              <Input name="grade" placeholder="e.g. 10.9" maxLength={40} />
            </Field>
            <Field label="Material">
              <Input name="material" maxLength={60} />
            </Field>
            <Field label="Surface treatment">
              <Input name="surface" maxLength={60} />
            </Field>
            <Field label="Standard / drawing">
              <Input name="standard" placeholder="DIN / ISO / GB / drawing" maxLength={60} />
            </Field>
            <Field label="Quantity">
              <Input name="quantity" maxLength={40} />
            </Field>
            <Field label="Annual volume">
              <Input name="annual" maxLength={40} placeholder="Optional" />
            </Field>
            <Field label="Target delivery">
              <Input name="delivery" maxLength={60} placeholder="Optional" />
            </Field>
            <Field label="Application / industry">
              <Input name="application" maxLength={120} placeholder="Optional" />
            </Field>
          </div>
        </div>
      )}

      {variant === "distributor" && (
        <div>
          <p className="eyebrow mb-3">Distribution profile</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Markets covered">
              <Input name="markets" maxLength={160} />
            </Field>
            <Field label="Years in business">
              <Input name="years" maxLength={20} />
            </Field>
            <Field label="Existing fastener business">
              <Input name="existing" maxLength={160} />
            </Field>
            <Field label="Customer types">
              <Input name="customers" maxLength={160} />
            </Field>
            <Field label="Products sold">
              <Input name="productsSold" maxLength={160} />
            </Field>
            <Field label="Warehouses">
              <Input name="warehouses" maxLength={120} />
            </Field>
            <Field label="Sales channels">
              <Input name="channels" maxLength={160} />
            </Field>
            <Field label="Estimated annual purchase">
              <Input name="annualPurchase" maxLength={80} />
            </Field>
            <Field label="Product interests">
              <Input name="interests" maxLength={160} />
            </Field>
            <Field label="Target cooperation date">
              <Input name="coopDate" maxLength={60} />
            </Field>
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3">Details & files</p>
        <div className="space-y-4">
          <Field label="Requirement description">
            <Textarea
              name="message"
              rows={5}
              maxLength={2000}
              defaultValue={presetProducts}
              placeholder="Product list, specifications, application, project background..."
            />
          </Field>
          <Field
            label={
              variant === "bom"
                ? "Upload BOM (XLS, XLSX, CSV, PDF)"
                : variant === "custom"
                  ? "Upload drawing (PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX)"
                  : "Attachments (RFQ, BOM, drawing, image)"
            }
          >
            <Input
              type="file"
              name="files"
              multiple
              accept={accepts[variant]}
              onChange={(e) =>
                setFileNames(Array.from(e.target.files ?? []).map((f) => f.name).slice(0, 10))
              }
              className="file:mr-3 file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs"
            />
          </Field>
          {fileNames.length > 0 && (
            <ul className="spec-value space-y-1 text-xs text-muted-foreground">
              {fileNames.map((n) => (
                <li key={n}>· {n}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={sending}>
        {sending ? "Sending..." : submitLabel}
      </Button>
      <p className="text-xs text-muted-foreground">
        Technical fields are optional — provide what you have and our engineering team will clarify
        the rest during review.
      </p>
    </form>
  );
}
