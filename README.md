# Xiangjinxin Industrial WordPress Theme

Xiangjinxin Industrial is a standalone, production-ready WordPress theme for a bilingual industrial fastener manufacturer. The repository contains only theme code and bundled content; no Node.js build, SPA runtime or required plugin is needed.

## Installation

1. Upload the release ZIP under **Appearance → Themes → Add New → Upload Theme**.
2. Activate **Xiangjinxin Industrial**.
3. Open **Appearance → Demo content** and run **Install complete website**.
4. Confirm the recipient under **Appearance → Customize → Xiangjinxin Theme Settings → RFQ & contact forms**.
5. Configure authenticated SMTP or a transactional mail provider for reliable RFQ delivery.

The bundled package creates the homepage, product catalog, product categories, industry pages, legal pages, menus, media and bilingual English/Chinese content. Existing unrelated WordPress content is not deleted.

## Included functionality

- 42 editable products across 9 product categories
- Product archive, filters, search, taxonomy routes and product detail templates
- English/Chinese content switching and a bundled translation dictionary
- Responsive desktop, tablet and mobile layouts
- Accessible mobile navigation, dropdown menus, tabs, dialogs and focus states
- Local fonts with no Google Fonts request from the visitor's browser
- Native RFQ list stored in the visitor's browser and passed into the enquiry form
- Six RFQ variants for products, BOMs, drawings, projects, distributors and general enquiries
- Secure attachment validation, nonce protection, honeypot and rate limiting
- WordPress Customizer controls for branding, contact data, design tokens, WhatsApp and RFQ settings
- Open Graph, Twitter Card and Organization/Product structured data when no SEO plugin is active
- Gutenberg patterns, custom logo, featured images and editor styling

## RFQ forms

Use the built-in shortcode in any page or post:

```text
[lulu_rfq_form variant="general"]
[lulu_rfq_form variant="product" title="Request product pricing"]
[lulu_rfq_form variant="bom"]
[lulu_rfq_form variant="custom"]
[lulu_rfq_form variant="project"]
[lulu_rfq_form variant="distributor"]
```

Submissions are processed through WordPress core and sent with `wp_mail()`. The form does not create a lead database by default. Uploaded files are attached to the message and removed from the server immediately afterwards.

## Content updates

The bundled content version is `2026-08-25.1`; theme assets are versioned as `4.0.2`. A newer content package can synchronize records previously created by the theme without overwriting unrelated editorial content.

## Requirements

- WordPress 6.4 or newer
- PHP 7.4 or newer
- HTTPS in production
- A working WordPress mail transport for RFQ delivery

## Development checks

Run PHP syntax checks over every PHP file and `node --check assets/theme.js`. Release archives must contain one top-level `lulu-base/` directory so they can be installed directly through WordPress.

## Licensing

Theme PHP, JavaScript and CSS are licensed under GPL-2.0-or-later. Bundled Barlow and IBM Plex Mono font files are licensed under the SIL Open Font License 1.1; see `assets/fonts/OFL.txt`.
