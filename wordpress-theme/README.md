# Lulu Base WordPress Theme

Lulu Base is a portable, translation-ready WordPress theme for industrial manufacturers, distributors, OEM suppliers and other specification-led B2B businesses. It keeps the classic PHP template surface used by Lulu-generated pages while adding a modern Customizer, Gutenberg patterns, structured products and a native RFQ workflow.

## Install

1. Zip the wordpress-theme directory as lulu-base.zip.
2. In WordPress, open Appearance → Themes → Add New → Upload Theme.
3. Activate the theme.
4. Set the desired page as the static homepage under Settings → Reading.
5. Assign menus under Appearance → Menus to Primary Menu and Footer Menu.
6. Open Appearance → Customize → Lulu Base Theme Settings to configure the site.

The theme has no required plugin dependencies. It works with core WordPress and remains compatible with WPML, Polylang and standard WordPress translation workflows.

## Main-site content migration

After activation, open **Appearance → Demo content** and choose **Migrate main site content**. The importer is built into the theme and does not require the WordPress importer plugin.

The bundled export is generated from the React site in this repository. It includes:

- All main-site routes, homepage sections, industry pages and legal pages
- All 9 product categories and 42 products with specifications, summaries and applications
- All 9 industries, 8 workflow stages, 12 FAQs, 11 buyer types and 365 Chinese translations
- The main site’s hero, large-bolt, solar-fastener and drawing images
- Primary/footer navigation and RFQ route content

The migration is additive on a fresh site. A previous Lulu demo import is recognized and matching records are synchronized once; later runs do not overwrite content. The editable generated source dataset is bundled in demo-content/content.json.

The source export carries a content version (`2026-08-24.9`). When that value changes, the theme shows an administrator notice and synchronizes only records previously created by Lulu Base. Theme assets use the separate `3.2.0` version so WordPress and CDN asset URLs are cache-busted after template, CSS or JavaScript changes.

## Customization

The native Customizer includes:

- Brand details, logo fallback, tagline, contact URL, phone, email and address
- Homepage hero image, eyebrow, headline, introduction and CTA labels
- Announcement bar, header density, sticky header and navigation CTA
- Colors, typography, content width and corner radius
- Footer description, menus, social links and contact CTA
- RFQ recipient, subject, messages, privacy notice and upload size
- Product CTA, specification visibility, archive size and breadcrumbs

The visual system is emitted as CSS custom properties, so child themes and custom CSS can extend the same tokens:

~~~css
.my-section {
    color: var(--lulu-ink);
    background: var(--lulu-soft);
}
~~~

## Products

Products are available under Products in the WordPress dashboard. The theme preserves the product post type, the /products archive and the product_category taxonomy.

Each product supports:

- Title, description, excerpt and featured image
- Part number, diameter, length, thread, grade, material, standard and surface treatment
- Additional specifications in Label: Value format
- Applications, one per line
- Drawing/custom-manufacturing flag

Product metadata appears in cards, archives, single-product pages and related-product sections.

## RFQ forms

Use the built-in shortcode anywhere shortcodes are supported:

~~~text
[lulu_rfq_form variant="general"]
[lulu_rfq_form variant="product" title="Request product pricing"]
[lulu_rfq_form variant="custom" submit_label="Send drawing for review"]
[lulu_rfq_form variant="project"]
~~~

Submissions are processed through WordPress admin-post.php and sent with wp_mail() to the configured recipient, falling back to the WordPress administration email. The workflow includes:

- Nonce validation and capability-safe handling
- Required-field and business-email validation
- Honeypot and transient rate-limit protection
- Secure MIME and size checks for attachments
- Reply-to email headers for sales follow-up
- No lead storage by default

Configure the recipient and messages under Appearance → Customize → RFQ & contact forms. The site’s mail provider still needs to be configured correctly for reliable delivery.

## Gutenberg patterns

The theme provides editable core-block patterns under the Lulu Base sections category:

- Industrial hero
- Product category grid
- Technical enquiry process
- RFQ callout

Patterns are starting points: replace text, images, links and blocks directly in the editor.

## Compatibility and child themes

The theme preserves:

- Existing Lulu-generated pages containing data-lulu-template=
- Existing primary/footer menu locations
- Custom Logo support
- Existing product URLs and taxonomy slugs
- Standard WordPress page, post, archive, search and 404 behavior

Use a child theme for overrides. The main reusable surfaces are in template-parts/, and the implementation layers are split under inc/.

## Quality and security

All public settings and product fields are sanitized, all rendered values are escaped, and form submissions require a nonce. The theme uses system font stacks by default, loads only its small navigation script, supports reduced motion, and includes keyboard navigation and visible focus states.
