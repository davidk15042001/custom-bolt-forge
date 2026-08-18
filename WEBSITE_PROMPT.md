# LOVABLE MASTER PROMPT — INDUSTRIAL FASTENERS & CUSTOM BOLTS MANUFACTURER WEBSITE

## 1. Project Overview

### 1.1 Purpose
Build a premium, production-ready, multilingual B2B website for **Hebei Xiangjinxin Metal Products Co., Ltd.**, an industrial fastener manufacturer and wholesale supplier based in Handan, Hebei, China.

The website must present the company as a credible, export-oriented industrial supplier for standard fasteners, high-strength structural fasteners, and drawing-based custom fasteners.

### 1.2 Business Goals
- Generate qualified B2B leads (importers, distributors, EPC contractors, solar installers, steel fabricators).
- Demonstrate manufacturing credibility and export readiness.
- Enable self-service product discovery and RFQ submission.
- Support English- and Chinese-speaking buyers.
- Build long-term SEO visibility for industrial fastener keywords.

### 1.3 Target Audiences
| Segment | Needs | Priority |
|---|---|---|
| International importers/distributors | Catalog, MOQ, certifications, stable supply | High |
| EPC / construction contractors | Project quotes, BOM upload, compliance standards | High |
| Solar / PV mounting companies | Solar hanger bolts, grounding clips, rapid delivery | High |
| Steel structure fabricators | High-strength bolts (8.8/10.9/12.9), mill certificates | High |
| OEM / machinery manufacturers | Drawing-based custom parts, tolerances, samples | Medium |
| Mining / heavy industry | Large-diameter and special-shaped fasteners | Medium |

### 1.4 Unique Selling Propositions
- Manufacturer-direct pricing from Handan, China's fastener production hub.
- Custom bolts from M30 up to M120 and special geometries based on customer drawings.
- Grades 4.8 through 12.9, with material certificates and third-party inspection reports available.
- Full export documentation support (CO, packing list, mill test reports).
- WhatsApp sales support in English and Chinese.

---

## 2. Company Details

### 2.1 Identity
- **Legal company name:** Hebei Xiangjinxin Metal Products Co., Ltd.
- **Chinese name:** 河北向锦鑫金属制品有限公司
- **Brand name:** Xiangjinxin / 向锦鑫
- **Year established:** 2020 (per business license)
- **Location:** Row 2 No. 3, West Industrial Zone, Xisuining Village, Liuying Town, Yongnian District, Handan, Hebei, China
- **Email:** sales@xiangjinxin-fasteners.com
- **WhatsApp:** +49 176 41474606
- **Website languages:** English, 简体中文

### 2.2 Business Description
Industrial fastener manufacturer and wholesale supplier for standard, high-strength, and drawing-based custom applications. Products serve construction, steel structures, machinery, solar energy, infrastructure, heavy industry, energy, towers, and mining sectors.

### 2.3 Capabilities to Highlight
- Hot forging, cold heading, threading, heat treatment, surface coating.
- Diameter range: M6 to M120.
- Length range: standard up to 3,000 mm; custom on request.
- Grades: 4.8, 6.8, 8.8, 10.9, 12.9; ASTM A325 / A490 equivalent on request.
- Coatings: black oxide, zinc plated (blue/white/yellow), hot-dip galvanized, dacromet/geomet, PTFE, HDG.
- Standards: DIN, ISO, GB, ANSI/ASME, ASTM, JIS, BS — custom non-standard accepted.
- Quality control: dimensional inspection, torque testing, tensile testing, salt-spray testing, hardness testing.

### 2.4 Certifications (verify before publishing)
- ISO 9001 Quality Management System
- Mill test certificates available per batch
- Third-party SGS/BV inspection available on request
- Material certificates for 35CrMo, 40Cr, 42CrMo, stainless steel grades available

---

## 3. Design System

### 3.1 Visual Direction
Industrial, professional B2B aesthetic. Clean, technical, and trustworthy. Avoid generic AI aesthetics (no purple gradients, no playful illustrations). Use engineering-grade photography, technical line drawings, and metal textures.

### 3.2 Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#1E3A5F` (Navy) | Header, primary buttons, links, headings |
| `--primary-foreground` | `#FFFFFF` | Text on primary backgrounds |
| `--graphite` | `#23272B` | Dark sections, footer, top bar |
| `--graphite-foreground` | `#F3F4F6` | Text on graphite backgrounds |
| `--safety` | `#F97316` (Safety Orange) | CTAs, highlights, accent borders, hover states |
| `--background` | `#FFFFFF` | Main page background |
| `--foreground` | `#111827` | Body text |
| `--muted` | `#F3F4F6` | Alternating sections, cards |
| `--border` | `#E5E7EB` | Dividers, card borders |
| `--secondary` | `#F3F4F6` | Secondary buttons, hover backgrounds |
| `--secondary-foreground` | `#111827` | Text on secondary backgrounds |

### 3.3 Typography
- **Sans-serif / body font:** Barlow (Google Fonts)
- **Display / heading font:** Barlow Condensed (Google Fonts)
- **Technical labels:** Barlow, uppercase, wide letter-spacing (`tracking-[0.14em]`)
- **Scale:**
  - H1: 48–64 px, Barlow Condensed, font-weight 700
  - H2: 36–48 px, Barlow Condensed, font-weight 600
  - H3: 24–30 px, Barlow Condensed, font-weight 600
  - Body: 16–18 px, Barlow, font-weight 400
  - Small / captions: 12–14 px, Barlow, font-weight 400
  - Eyebrow labels: 11–12 px, uppercase, tracking-wide

### 3.4 Spacing & Layout
- Max content width: `1280px` (`max-w-7xl`).
- Section vertical padding: `py-16` to `py-24`.
- Container horizontal padding: `px-4` mobile, `px-6` tablet, `px-8` desktop.
- Grid gaps: `gap-6` to `gap-8`.
- Card border radius: rounded corners consistent with shadcn defaults; avoid overly soft UI.

### 3.5 Components
- Use shadcn/ui for buttons, inputs, sheets, dialogs, tabs, accordions, cards.
- Buttons: primary (navy), secondary (outline), ghost, and safety-orange CTA variant.
- Cards: subtle border, light shadow on hover, technical data layout.
- Tables: specification matrices with alternating row colors.
- Forms: clear labels, inline validation, file upload areas with drag-and-drop.

### 3.6 Imagery
- High-resolution product photography on neutral or industrial backgrounds.
- Technical line drawings for custom/drawing-based products.
- Manufacturing process photos (forging, threading, heat treatment, inspection).
- Icons: Lucide React icons only; no emoji.

---

## 4. Product Catalog

Create a centralized catalog data file (`src/data/catalog.ts`) covering the following 9 major categories. Each product must include: `id`, `name`, `shortDescription`, `fullDescription`, `technicalSpecs` (object), `standards` (array), `applications` (array), `grades` (array), `coatings` (array), `diameterRange`, `lengthRange`, `image` (optional), and `slug`.

### 4.1 Category 1 — Bolts
- Hex bolts (DIN 933 / 931, ISO 4014 / 4017, GB/T 5782 / 5783)
- High-strength hex bolts grade 8.8, 10.9, 12.9 (GB/T 1228, ASTM A325, ASTM A490, EN 14399)
- Extra-large custom bolts M30–M120 (hot-forged, drawing-based)
- Hex flange bolts (DIN 6921)
- Socket head cap screws (DIN 912, ISO 4762)
- Countersunk socket screws (DIN 7991)
- Tension control / torshear bolts (GB/T 3632)
- Special-shaped bolts (hook, eye, U-bolt, J-bolt, anchor bolt variations)

### 4.2 Category 2 — Nuts
- Hex nuts (DIN 934, ISO 4032, GB/T 6170)
- Flange nuts (DIN 6923)
- Nylon lock nuts (DIN 985, ISO 10511)
- Slotted / castle nuts and self-locking nuts
- Thick / heavy / hot-forged nuts for structural applications

### 4.3 Category 3 — Threaded Rods & Stud Bolts
- Fully threaded rods (DIN 975, ASTM A193 B7/B8, stainless steel 304/316)
- Double-end stud bolts (DIN 938, DIN 939)
- Custom-length threaded rods up to 3,000 mm

### 4.4 Category 4 — Anchor & Foundation Fasteners
- Anchor bolts (L-bolt, J-bolt, I-bolt, foundation bolts)
- Embedded fasteners for concrete
- Base plate anchor assemblies

### 4.5 Category 5 — Expansion & Anchoring Systems
- Mechanical expansion anchors (wedge anchors, sleeve anchors, drop-in anchors)
- Chemical anchors / adhesive anchor systems
- Concrete and masonry fastening solutions

### 4.6 Category 6 — Self-Drilling & Self-Tapping Fasteners
- Roofing screws with EPDM washer
- Self-drilling screws (DIN 7504, hex washer head, pan head)
- Self-tapping screws for sheet metal and board
- Chipboard / wood screws

### 4.7 Category 7 — Pins, Rivets & Retaining Components
- Cotter pins / split pins (DIN 94)
- Spring pins / roll pins (DIN 1481)
- Solid and blind rivets
- Retaining rings / circlips (internal and external)

### 4.8 Category 8 — Solar & Photovoltaic Fasteners
- PV mounting clips and clamps
- Grounding clips and grounding lugs
- Solar hanger bolts (M10 × 200 mm, M12 × 250 mm typical)
- Rail bolts and end clamps for aluminum rails

### 4.9 Category 9 — Custom & Non-Standard Fasteners
- Drawing-based components (DWG, STEP, PDF accepted)
- Special geometries (multi-diameter, forged heads, asymmetric threads)
- Oversized fasteners above M30
- Reverse-thread, left-hand thread fasteners
- OEM branded fasteners and private-label packaging

---

## 5. Industry / Application Pages

Create dedicated application pages for the following industries. Each page must include:
- Hero with industry-specific image and headline
- Problem statement (what fasteners are needed and why)
- Recommended products with links to categories
- Relevant standards and grades
- Case study or typical project example
- CTA to request a project quote

### 5.1 Industries
1. Construction
2. Steel Structures
3. Machinery
4. Solar / Photovoltaic
5. Infrastructure
6. Heavy Industry
7. Energy
8. Towers (telecom, transmission, wind)
9. Mining

### 5.2 Content Template per Industry
- **Hero:** H1, 2-line value proposition, primary CTA.
- **Challenges:** 3 bullet challenges this industry faces with fasteners.
- **Solutions:** 3–5 recommended fastener types with specs.
- **Standards:** DIN/ISO/ASTM/GB standards commonly required.
- **Project example:** Typical dimensions, quantities, coatings.
- **Quality assurance:** Testing relevant to the sector.
- **CTA block:** "Request a project quote" + link to contact form.

---

## 6. Required Pages & Routes

All routes must have unique `head()` metadata: title < 60 chars, description < 160 chars, Open Graph title/description, `og:type`, `twitter:card`. Add `og:image` only when the route has a meaningful absolute hero/cover image URL.

### 6.1 Homepage (`/`)
- Top bar: tagline + language switcher + Request Quote link
- Hero: full-width industrial image, H1, subheadline, two CTAs (Browse Products, Request Quote)
- Trust bar: ISO 9001, export experience, fast response, custom manufacturing
- Company intro: 2–3 paragraphs + image
- Product categories grid: 9 cards linking to `/products/$category`
- Industries grid: 6 featured industries linking to `/industries/$slug`
- Custom manufacturing CTA: M30–M120 bolts, drawing-based parts
- Quality / trust signals: testing, inspection, certificates
- Testimonials / clients (optional, can be placeholder until real quotes available)
- Contact CTA + newsletter / catalog download

### 6.2 Products Index (`/products`)
- H1 + intro paragraph
- Search input
- Filter sidebar or bar: category, diameter, grade, coating, standard
- Product grid with `ProductCard`
- Empty state when no products match filters
- SEO: "Industrial Fasteners Catalog | Hex Bolts, Nuts, Anchors | Xiangjinxin"

### 6.3 Product Category (`/products/$category`)
- H1 category name + description
- Spec matrix table
- Product cards with "Add to RFQ" button
- Related standards and applications
- CTA: request category quote

### 6.4 Industries Index (`/industries`)
- H1 + intro
- Grid of all 9 industries
- Each card links to `/industries/$slug`

### 6.5 Industry Detail (`/industries/$slug`)
- Follow industry content template in Section 5.2.

### 6.6 Custom Manufacturing (`/custom-manufacturing`)
- Hero: drawing-based fasteners, M30–M120 custom bolts
- Process steps: drawing review → tooling → forging → machining → heat treatment → inspection → packing
- Accepted file formats: DWG, DXF, STEP, IGES, PDF
- Tolerance and material notes
- MOQ and sample policy
- Drawing upload CTA

### 6.7 Wholesale (`/wholesale`)
- H1 targeting distributors and high-volume importers
- Benefits: manufacturer pricing, stable supply, OEM branding, documentation
- MOQ table by product type
- Packaging and shipping options
- Distributor application CTA

### 6.8 Contact / Request Center (`/contact`)
- H1 + intro
- Tabs:
  1. Product RFQ
  2. BOM Upload (XLS / PDF)
  3. Technical Drawing Submission (DWG / STEP / PDF)
  4. Distributor Application
- Contact details card: email, WhatsApp, address
- Map placeholder or embedded map (client-side only)

### 6.9 RFQ List (`/rfq`)
- H1: "Request for Quotation"
- Persistent list from `localStorage`
- Edit quantity / notes per item
- Remove item
- Clear list
- Submit button linking to `/contact` with pre-filled context

### 6.10 Manufacturing (`/manufacturing`)
- Production capabilities overview
- Step-by-step process diagram
- Equipment highlights (forging machines, thread rollers, heat treatment lines)
- Capacity and lead time notes

### 6.11 Quality (`/quality`)
- Quality control process
- Testing equipment list
- Certifications (ISO 9001, mill certificates, third-party inspection)
- Inspection report request form

### 6.12 Resources (`/resources`)
- Catalog download (PDF)
- Datasheets per category
- FAQ accordion
- Industry guides / blog placeholder

### 6.13 Distributors (`/distributors`)
- Distributor cooperation program
- Benefits and requirements
- Application form
- Territory availability note

### 6.14 Legal Pages (`/legal/$doc`)
- Privacy Policy
- Terms & Conditions
- Imprint / Legal Notice
- Cookie Policy (optional)

---

## 7. RFQ System

### 7.1 Functional Requirements
- Users can add products to an RFQ list from product/category pages.
- Persistent list stored in `localStorage`.
- RFQ list page to review and submit selected items.
- Multi-variant contact form supporting:
  - Product RFQ
  - BOM upload (XLS / PDF)
  - Technical drawing submission (DWG / STEP / PDF)
  - Distributor application

### 7.2 Data Model
```ts
interface RfqItem {
  id: string;           // product id
  name: string;
  category: string;
  quantity: number;
  unit: string;         // pcs / kg / ton
  notes?: string;
}

interface RfqContext {
  items: RfqItem[];
  contact: {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    country: string;
  };
  inquiryType: 'product' | 'bom' | 'drawing' | 'distributor';
  message: string;
  attachments?: File[];
}
```

### 7.3 User Flow
1. User browses catalog and clicks "Add to RFQ".
2. Toast/feedback confirms addition.
3. Header shows RFQ count.
4. User visits `/rfq` to review/edit list.
5. User clicks "Submit RFQ" and is taken to `/contact` with inquiry type pre-selected.
6. Form submission can be stored in backend (Supabase) when Lovable Cloud is enabled.

### 7.4 Form Fields by Inquiry Type
**Product RFQ:**
- Full name, company, email, phone, country
- Product (pre-filled from RFQ list or free text)
- Quantity, required delivery destination
- Standard / grade / coating / diameter / length
- Additional message

**BOM Upload:**
- Same contact fields
- File upload: XLS, XLSX, PDF (max 20 MB)
- Project name, required delivery date
- Additional message

**Technical Drawing Submission:**
- Same contact fields
- File upload: DWG, DXF, STEP, IGES, PDF (max 50 MB)
- Material preference, quantity, target price range
- Additional message

**Distributor Application:**
- Company name, country, website
- Years in business, main markets
- Annual estimated volume
- Current product range
- Additional message

---

## 8. Multilingual Support

### 8.1 Requirements
- Full English / Chinese (简体中文) language switching.
- Language switcher in main navigation (desktop) and mobile menu.
- `localStorage` persistence for selected language.
- All UI strings, product names, descriptions, form labels, footer content, and legal pages must be translatable.

### 8.2 Architecture
- Implement `LanguageProvider` in `src/lib/i18n.tsx`.
- Use `useT(en, zh?)` hook for inline translations.
- Maintain `src/data/i18n-dict.ts` as English-to-Chinese dictionary for data-driven strings.
- Set `document.documentElement.lang` to `en` or `zh-CN`.

### 8.3 Translation Rules
- Keep English as source of truth in code.
- Chinese translations should be professional B2B technical Chinese, not literal machine translation.
- Product names: keep international standards (DIN/ISO/ASTM) in English, translate descriptions.
- Use formal "您" in Chinese customer-facing copy.

### 8.4 Scope
- Phase 1 (MVP): Navigation, header, footer, homepage, product names, RFQ form, contact form.
- Phase 2: Full product descriptions, industry pages, legal pages, resources.

---

## 9. Chatbot & WhatsApp

### 9.1 Sticky Floating WhatsApp Button
- Position: bottom-right, above chatbot button.
- Number: `+49 176 41474606`.
- Pre-filled message in current language.
- Green WhatsApp brand color.
- Accessible label: "Chat on WhatsApp" / "WhatsApp 咨询".

### 9.2 AI-Powered Website Chatbot
- Floating chat widget triggered by bottom-right button.
- Powered by Lovable AI Gateway (`google/gemini-3.5-flash` or equivalent).
- Server function: `src/lib/chat.functions.ts`.

### 9.3 Chatbot System Prompt Rules
- Role: online sales assistant of Hebei Xiangjinxin Metal Products Co., Ltd.
- Scope: hex bolts, high-strength bolts, nuts, washers, threaded rods, anchor bolts, chemical/expansion anchors, solar fasteners, stud bolts, screws, drawing-based custom bolts M30–M120.
- Services: wholesale, OEM, project/BOM supply, export, custom manufacturing from DWG/STEP/PDF, material certificates, inspection reports.
- Contact: sales@xiangjinxin-fasteners.com, WhatsApp +49 176 41474606.
- Rules:
  - Answer as knowledgeable B2B technical sales contact: concise, factual, professional.
  - Never invent prices, delivery dates, or certificates.
  - For pricing/lead times, ask for specs, quantity, destination, then guide to RFQ form or WhatsApp.
  - Ask relevant specs: standard (DIN/ISO/ASTM/GB), diameter, length, grade, coating, quantity.
  - Keep answers under ~120 words; use short markdown lists when helpful.
  - Reply strictly in the user's selected language (English or 简体中文).

### 9.4 Fallback Behavior
- If AI service unavailable or rate-limited, show friendly fallback message and suggest WhatsApp or email.

---

## 10. SEO & Technical

### 10.1 On-Page SEO
- Unique meta title and description for every route.
- Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (when absolute hero image exists).
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` (when applicable).
- Canonical URLs.
- Semantic HTML: one H1 per page, proper heading hierarchy.
- Alt text on all images.
- Lazy loading for below-the-fold images.

### 10.2 Structured Data (JSON-LD)
- Organization schema on homepage.
- FAQPage schema on resources/FAQ section.
- BreadcrumbList on product and industry pages.
- Product schema on product/category pages (optional).

### 10.3 Sitemap & Robots
- Generate `public/sitemap.xml` with all static and dynamic routes.
- `public/robots.txt`: allow all, point to sitemap.

### 10.4 Performance
- Optimize images (WebP where possible, responsive sizes).
- Code-split routes.
- Minimize third-party scripts.
- Target Lighthouse score > 90 for Performance and Accessibility.

### 10.5 Accessibility
- WCAG 2.1 AA compliance target.
- Focus indicators on interactive elements.
- ARIA labels on icon-only buttons.
- Sufficient color contrast (navy on white, white on graphite, safety orange only on dark).

### 10.6 Responsive Design
- Mobile-first approach.
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px.
- Hamburger menu on mobile/tablet.
- Touch-friendly tap targets (min 44 × 44 px).

---

## 11. Tech Stack

- **Framework:** TanStack Start v1
- **Language:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Barlow + Barlow Condensed via Google Fonts `<link>` in `src/routes/__root.tsx`
- **Backend:** Lovable Cloud / Supabase (when ready)
- **AI:** Lovable AI Gateway for chatbot
- **Build tool:** Vite 7
- **Package manager:** Bun

### 11.1 Architecture Notes
- Use `createServerFn` from `@tanstack/react-start` for app-internal server logic.
- Use TanStack file routes under `src/routes/api/public/*` for webhooks/public APIs.
- Do not use `src/server/*` for client-imported server functions.
- Read `process.env` only inside server function handlers.
- Protected server functions must be called from components, not public route loaders.

---

## 12. Content Strategy & Copywriting

### 12.1 Tone & Style
- Professional B2B technical sales tone.
- Concise, factual, export-oriented.
- Avoid generic AI adjectives ("revolutionary", "cutting-edge", "world-class" unless proven).
- Use active voice and concrete specifications.
- Industrial, credible, trustworthy.

### 12.2 Microcopy
- Buttons: "Add to RFQ", "Request Quote", "Download Catalog", "Send Inquiry", "Chat on WhatsApp".
- Form labels: clear and specific.
- Empty states: helpful guidance, e.g. "No products match your filters. Try adjusting diameter or grade."
- Error messages: explain what went wrong and how to fix it.

### 12.3 Trust Signals
- ISO 9001 badge
- "Factory direct" messaging
- "Mill test certificates available"
- "Export to Europe, Middle East, Southeast Asia, Africa, Americas"
- Response time commitment (e.g. "Quote within 24 hours")

---

## 13. Image & Asset Guidelines

### 13.1 Required Images
- Hero background: industrial manufacturing or close-up fasteners
- Product category thumbnails: representative product per category
- Custom manufacturing: large bolt / technical drawing visual
- Quality page: inspection/testing equipment
- Manufacturing page: production line steps

### 13.2 Image Standards
- Minimum 1200 px wide for hero images.
- WebP or optimized JPG.
- Descriptive file names and alt text.
- No stock-photo watermarks.
- Consistent lighting and neutral backgrounds for product shots.

---

## 14. Conversion & Lead Generation

### 14.1 Primary Conversion Points
- "Request Quote" buttons throughout site
- "Add to RFQ" on product cards
- WhatsApp floating button
- Contact form tabs
- Catalog download (email capture when backend ready)

### 14.2 Lead Qualification
- Capture: name, company, email, phone, country, product interest, quantity, destination.
- Route high-intent inquiries (BOM, drawing, distributor) to dedicated form tabs.

### 14.3 Tracking (future)
- Prepare data attributes for conversion events.
- Do not implement third-party tracking without explicit instruction.

---

## 15. Maintenance & Future Roadmap

### 15.1 Post-Launch Tasks
- Connect Lovable Cloud backend for form submissions and file uploads.
- Add real customer testimonials and project references.
- Upload actual certification documents.
- Implement catalog PDF download.
- Add blog / news section for SEO.

### 15.2 Expansion Ideas
- Additional languages (Spanish, Arabic, Russian, Portuguese).
- Customer portal for order tracking and document downloads.
- Live inventory / stock levels for standard items.
- API for distributor integration.

---

## 16. Acceptance Criteria

- [ ] All 14 routes render correctly in English and Chinese.
- [ ] Language switcher works and persists in `localStorage`.
- [ ] WhatsApp button opens `https://wa.me/4917641474606` with pre-filled message.
- [ ] Chatbot responds in selected language and never invents prices.
- [ ] RFQ list persists in `localStorage` and supports add/remove/edit.
- [ ] Product catalog is searchable/filterable.
- [ ] Each route has unique meta title, description, and Open Graph tags.
- [ ] `sitemap.xml` and `robots.txt` are present.
- [ ] TypeScript typecheck passes (`bunx tsgo --noEmit`).
- [ ] Site is responsive on mobile, tablet, and desktop.
- [ ] Lighthouse Performance and Accessibility scores ≥ 90.
