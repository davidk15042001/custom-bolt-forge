import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buyerTypes, categories } from "@/data/catalog";
import { useT } from "@/lib/i18n";

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
  submitLabel,
  presetProducts,
}: {
  variant?: Variant;
  submitLabel?: string | undefined;
  presetProducts?: string | undefined;
}) {
  const t = useT();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error(t("Please enter a valid business email address.", "请输入有效的企业邮箱地址。"));
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      setFileNames([]);
      toast.success(t("Request received", "已收到您的需求"), {
        description: t(
          "Our sales engineering team will review your requirement and reply by email.",
          "我们的销售工程团队将审核您的需求并通过邮件回复。",
        ),
      });
    }, 500);
  };

  const selectClass =
    "h-9 w-full border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <p className="eyebrow mb-3">{t("Contact", "联系方式")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("Full name", "姓名")}>
            <Input name="name" required maxLength={100} />
          </Field>
          <Field label={t("Company", "公司名称")}>
            <Input name="company" required maxLength={120} />
          </Field>
          <Field label={t("Business email", "企业邮箱")}>
            <Input name="email" type="email" required maxLength={160} />
          </Field>
          <Field label={t("Phone / WhatsApp / WeChat", "电话 / WhatsApp / 微信")}>
            <Input name="phone" maxLength={60} />
          </Field>
          <Field label={t("Country", "国家")}>
            <Input name="country" required maxLength={80} />
          </Field>
          <Field label={t("Website", "网站")}>
            <Input name="website" maxLength={160} placeholder={t("Optional", "选填")} />
          </Field>
        </div>
      </div>

      {variant !== "general" && (
        <div>
          <p className="eyebrow mb-3">{t("Buyer profile", "采购方信息")}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("Buyer type", "采购类型")}>
              <select name="buyerType" className={selectClass} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {buyerTypes.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label={t("Target market", "目标市场")}>
              <Input name="market" maxLength={120} placeholder={t("Optional", "选填")} />
            </Field>
          </div>
        </div>
      )}

      {(variant === "product" || variant === "custom" || variant === "project") && (
        <div>
          <p className="eyebrow mb-3">{t("Requirement", "需求参数")}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={t("Product category", "产品类别")}>
              <select name="category" className={selectClass} defaultValue="">
                <option value="">{t("Select", "请选择")}</option>
                {categories.map((c) => (
                  <option key={c.slug}>{c.short}</option>
                ))}
              </select>
            </Field>
            <Field label={t("Diameter", "直径")}>
              <Input name="diameter" placeholder="e.g. M20" maxLength={40} />
            </Field>
            <Field label={t("Length", "长度")}>
              <Input name="length" maxLength={40} />
            </Field>
            <Field label={t("Thread", "螺纹")}>
              <Input name="thread" maxLength={40} />
            </Field>
            <Field label={t("Grade", "强度等级")}>
              <Input name="grade" placeholder="e.g. 10.9" maxLength={40} />
            </Field>
            <Field label={t("Material", "材质")}>
              <Input name="material" maxLength={60} />
            </Field>
            <Field label={t("Surface treatment", "表面处理")}>
              <Input name="surface" maxLength={60} />
            </Field>
            <Field label={t("Standard / drawing", "标准 / 图纸")}>
              <Input name="standard" placeholder={t("DIN / ISO / GB / drawing", "DIN / ISO / GB / 图纸")} maxLength={60} />
            </Field>
            <Field label={t("Quantity", "数量")}>
              <Input name="quantity" maxLength={40} />
            </Field>
            <Field label={t("Annual volume", "年度用量")}>
              <Input name="annual" maxLength={40} placeholder={t("Optional", "选填")} />
            </Field>
            <Field label={t("Target delivery", "交期要求")}>
              <Input name="delivery" maxLength={60} placeholder={t("Optional", "选填")} />
            </Field>
            <Field label={t("Application / industry", "应用 / 行业")}>
              <Input name="application" maxLength={120} placeholder={t("Optional", "选填")} />
            </Field>
          </div>
        </div>
      )}

      {variant === "distributor" && (
        <div>
          <p className="eyebrow mb-3">{t("Distribution profile", "经销信息")}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("Markets covered", "覆盖市场")}>
              <Input name="markets" maxLength={160} />
            </Field>
            <Field label={t("Years in business", "经营年限")}>
              <Input name="years" maxLength={20} />
            </Field>
            <Field label={t("Existing fastener business", "现有紧固件业务")}>
              <Input name="existing" maxLength={160} />
            </Field>
            <Field label={t("Customer types", "客户类型")}>
              <Input name="customers" maxLength={160} />
            </Field>
            <Field label={t("Products sold", "销售产品")}>
              <Input name="productsSold" maxLength={160} />
            </Field>
            <Field label={t("Warehouses", "仓库")}>
              <Input name="warehouses" maxLength={120} />
            </Field>
            <Field label={t("Sales channels", "销售渠道")}>
              <Input name="channels" maxLength={160} />
            </Field>
            <Field label={t("Estimated annual purchase", "预计年采购额")}>
              <Input name="annualPurchase" maxLength={80} />
            </Field>
            <Field label={t("Product interests", "感兴趣的产品")}>
              <Input name="interests" maxLength={160} />
            </Field>
            <Field label={t("Target cooperation date", "计划合作时间")}>
              <Input name="coopDate" maxLength={60} />
            </Field>
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3">{t("Details & files", "详细说明与附件")}</p>
        <div className="space-y-4">
          <Field label={t("Requirement description", "需求描述")}>
            <Textarea
              name="message"
              rows={5}
              maxLength={2000}
              defaultValue={presetProducts}
              placeholder={t(
                "Product list, specifications, application, project background...",
                "产品清单、规格、应用场景、项目背景……",
              )}
            />
          </Field>
          <Field
            label={
              variant === "bom"
                ? t("Upload BOM (XLS, XLSX, CSV, PDF)", "上传 BOM 清单 (XLS, XLSX, CSV, PDF)")
                : variant === "custom"
                  ? t(
                      "Upload drawing (PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX)",
                      "上传图纸 (PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX)",
                    )
                  : t("Attachments (RFQ, BOM, drawing, image)", "附件（询价单、BOM、图纸、图片）")
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
        {sending ? t("Sending...", "发送中…") : (submitLabel ?? t("Submit RFQ", "提交询价"))}
      </Button>
      <p className="text-xs text-muted-foreground">
        {t(
          "Technical fields are optional — provide what you have and our engineering team will clarify the rest during review.",
          "技术参数为选填项——请提供您已知的信息，其余内容我们的工程团队会在评审时与您确认。",
        )}
      </p>
    </form>
  );
}
