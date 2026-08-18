# LOVABLE MASTER PROMPT — INDUSTRIAL FASTENERS & CUSTOM BOLTS MANUFACTURER WEBSITE

## Project Overview

Build a premium, production-ready, multilingual B2B website for **Hebei Xiangjinxin Metal Products Co., Ltd.**, an industrial fastener manufacturer and wholesale supplier based in Handan, Hebei, China.

The website should be based on the provided Chinese business license and present the company as a credible, export-oriented industrial supplier for standard, high-strength and drawing-based custom fasteners.

## Company Details

- **Company name:** Hebei Xiangjinxin Metal Products Co., Ltd. / 河北向锦鑫金属制品有限公司
- **Brand name:** Xiangjinxin / 向锦鑫
- **Location:** Row 2 No. 3, West Industrial Zone, Xisuining Village, Liuying Town, Yongnian District, Handan, Hebei, China
- **Email:** sales@xiangjinxin-fasteners.com
- **WhatsApp:** +49 176 41474606
- **Description:** Industrial fastener manufacturer and wholesale supplier for standard, high-strength and drawing-based custom applications.

## Design System

- Industrial, professional B2B aesthetic
- Primary color: Navy
- Background / dark sections: Graphite
- Accent color: Safety Orange
- Sans-serif font: Barlow
- Display / heading font: Barlow Condensed
- Clean, technical, trustworthy look

## Product Catalog

Create a centralized catalog data file covering the following 9 major categories:

1. **Bolts** — Hex bolts, high-strength hex bolts (8.8 / 10.9 / 12.9), extra-large custom bolts (M30–M120), hex flange bolts, socket head cap screws, countersunk socket screws, tension control / torshear bolts, special-shaped bolts
2. **Nuts** — Hex nuts, flange nuts, nylon lock nuts, slotted self-locking nuts, thick / heavy / hot-forged nuts
3. **Threaded Rods & Stud Bolts** — Fully threaded rods, double-end studs
4. **Anchor & Foundation Fasteners** — Anchor bolts, foundation bolts, embedded fasteners
5. **Expansion & Anchoring Systems** — Mechanical and chemical anchors for concrete and masonry
6. **Self-Drilling & Self-Tapping Fasteners** — Roofing, sheet metal and board screws
7. **Pins, Rivets & Retaining Components** — Cotter pins, spring pins, rivets, retaining rings
8. **Solar & Photovoltaic Fasteners** — PV mounting clips, grounding clips, solar hanger bolts
9. **Custom & Non-Standard Fasteners** — Drawing-based components, special geometries, oversized and reverse-thread fasteners

Each product should include: name, short description, technical specs, available standards, typical applications and optional image.

## Industry / Application Pages

Create dedicated application pages for:

- Construction
- Steel Structures
- Machinery
- Solar / Photovoltaic
- Infrastructure
- Heavy Industry
- Energy
- Towers
- Mining

## Required Pages & Routes

1. **Homepage** (`/`) — Hero, company intro, product categories, industries, custom manufacturing CTA, quality/trust signals, contact CTA
2. **Products index** (`/products`) — Searchable/filterable product catalog
3. **Product category** (`/products/$category`) — Category landing with spec matrix
4. **Industries index** (`/industries`)
5. **Industry detail** (`/industries/$slug`)
6. **Custom Manufacturing** (`/custom-manufacturing`) — Drawing-based fasteners, M30–M120 custom bolts
7. **Wholesale** (`/wholesale`) — Distributor and high-volume importer landing page
8. **Contact / Request Center** (`/contact`) — Tabs for product RFQ, BOM upload, drawing submission, distributor application
9. **RFQ List** (`/rfq`) — Persistent list of selected products before submission
10. **Manufacturing** (`/manufacturing`) — Production process and capabilities
11. **Quality** (`/quality`) — Quality control and certifications
12. **Resources** (`/resources`) — Catalog and datasheet downloads
13. **Distributors** (`/distributors`) — Distributor cooperation page
14. **Legal pages** (`/legal/$doc`) — Privacy policy, terms, imprint

## RFQ System

Implement an RFQ (Request for Quotation) system:

- Users can add products to an RFQ list from product/category pages
- Persistent list stored in `localStorage`
- RFQ list page to review and submit selected items
- Multi-variant contact form supporting:
  - Product RFQ
  - BOM upload (XLS / PDF)
  - Technical drawing submission (DWG / STEP / PDF)
  - Distributor application

## Multilingual Support

- Full English / Chinese (简体中文) language switching
- Language switcher in the main navigation
- `localStorage` persistence for selected language
- All UI strings, product names, descriptions, form labels and footer content translatable

## Chatbot & WhatsApp

- Sticky floating WhatsApp button using `+49 176 41474606`
- AI-powered website chatbot for sales/technical support
- Chatbot should answer questions about standards, grades, diameters, coatings, applications and RFQ process
- Chatbot should never invent prices or delivery dates; guide users to RFQ form or WhatsApp for quotes

## SEO & Technical

- Unique meta titles and descriptions for every route
- Open Graph tags
- JSON-LD: Organization, FAQPage, BreadcrumbList
- `sitemap.xml` and `robots.txt`
- Responsive design
- Fast loading, clean component architecture

## Tech Stack

- TanStack Start
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lovable Cloud / Supabase for backend when ready
- Lovable AI Gateway for chatbot

## Tone & Style

- Professional B2B technical sales tone
- Concise, factual, export-oriented
- Avoid generic AI aesthetics
- Industrial, credible, trustworthy
