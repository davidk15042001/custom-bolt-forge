import { describe, expect, test } from "bun:test";
import { COMPANY_PHONE, COMPANY_PHONE_URI, COMPANY_WHATSAPP_URL } from "./contact";

describe("company contact number", () => {
  test("telephone uses the supplied company number", () => {
    expect(COMPANY_PHONE).toBe("+86 13633204771");
    expect(COMPANY_PHONE_URI).toBe("tel:+8613633204771");
  });

  test("WhatsApp uses the supplied company number", () => {
    expect(COMPANY_WHATSAPP_URL).toBe("https://wa.me/8613633204771");
  });
});