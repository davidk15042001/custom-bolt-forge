export const COMPANY_PHONE = "+86 13633204771";
export const COMPANY_PHONE_URI = `tel:${COMPANY_PHONE.replace(/\s/g, "")}`;
export const WHATSAPP_NUMBER = COMPANY_PHONE.replace(/\D/g, "");
export const COMPANY_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;