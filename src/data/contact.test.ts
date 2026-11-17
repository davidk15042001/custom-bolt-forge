import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { COMPANY_PHONE, COMPANY_PHONE_URI, COMPANY_WHATSAPP_URL } from "./contact";

describe("company contact number", () => {
  test("telephone uses the supplied company number", () => {
    assert.equal(COMPANY_PHONE, "+86 13633204771");
    assert.equal(COMPANY_PHONE_URI, "tel:+8613633204771");
  });

  test("WhatsApp uses the supplied company number", () => {
    assert.equal(COMPANY_WHATSAPP_URL, "https://wa.me/8613633204771");
  });
});