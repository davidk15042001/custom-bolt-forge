# SEITENWEISE PROMPT-DOKUMENTATION

Hebei Xiangjinxin Metal Products Co., Ltd. — Industrial Fasteners Website
Ziel: Jede Seite lässt sich mit dem jeweiligen Prompt 1:1 nachbauen.

---

## 0. GLOBALER BASIS-PROMPT (immer voranstellen)

> Baue eine produktionsreife B2B-Industriewebsite für **Hebei Xiangjinxin Metal Products Co., Ltd.**
> Stack: **TanStack Start v1 + React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui**.
> Routing über Dateirouten in `src/routes` (kein react-router-dom). Kein `App.tsx`-Seitenwechsler.

### Firmendaten (`src/data/catalog.ts` → `COMPANY`)
```
name:        Hebei Xiangjinxin Metal Products Co., Ltd.
shortName:   Xiangjinxin
creditCode:  91130408MAEMXJG14R
address:     Row 2 No. 3, West Industrial Zone, Xisuining Village,
             Liuying Town, Yongnian District, Handan, Hebei, China
established: 19 June 2025
email:       sales@xiangjinxin-fasteners.com
positioning: Industrial fastener manufacturer and wholesale supplier for
             standard, high-strength and drawing-based custom applications.
```

### Designsystem (`src/styles.css`, alle Farben als OKLCH-Tokens, nie hardcodiert)
```
--radius: 3px                      /* kantig, industriell — keine runden Cards */
--background: oklch(0.995 0.001 250)   Papierweiß
--foreground: oklch(0.21 0.02 255)     Tiefes Navy-Grau
--primary:    oklch(0.35 0.09 258)     Navy (Buttons, Links, Akzent-Headlines)
--secondary:  oklch(0.945 0.005 250)
--muted:      oklch(0.955 0.004 250)   Sektionshintergrund "muted"
--border:     oklch(0.9 0.006 250)     1px-Linien überall statt Schatten
--graphite:   oklch(0.235 0.018 255)   Dunkle Full-Bleed-Sektionen
--steel:      oklch(0.62 0.015 250)
--safety:     oklch(0.68 0.19 46)      Signal-Orange, nur sparsam als Akzent
--grid-line:  oklch(0.35 0.09 258 / 8%)
Dark Mode: eigenes `.dark`-Set (background oklch(0.19 0.015 255), primary heller).
```
Typografie:
```
--font-sans:    "Barlow"            Fließtext
--font-display: "Barlow Condensed"  h1–h4, letter-spacing -0.01em
--font-mono:    "IBM Plex Mono"     Spezifikationswerte, Eyebrows
```
Fonts per `<link>` im `__root.tsx`-Head laden (nie `@import` in CSS).

Eigene Tailwind-Utilities:
- `.blueprint-grid` — 48×48px Linienraster (Hero-Hintergrund)
- `.eyebrow` — Mono, 11px, `letter-spacing .18em`, uppercase, muted
- `.spec-value` — Mono + `tabular-nums` für Maße/Grade
- `.rule-accent` — 3px linke Orange-Kante + 14px Padding

Regeln für **jede** Seite:
- Kein Purple/Indigo-Gradient, keine Glasmorphism-Cards, keine `rounded-xl`-Optik.
- Karten = `border border-border bg-card`, keine `shadow`.
- Sektionen über die Komponente `<Section>` (Varianten `tone="default" | "muted"`), Seitenkopf über `<PageHero>`.
- Jede Route hat eigenes `head()` mit `title`, `description`, `og:title`, `og:description`, `og:url`, `canonical`.
- Vollständig zweisprachig EN/中文 über `useT("English", "中文")`; Katalogtexte über das Wörterbuch `src/data/i18n-dict.ts`.
- Bilder: `loading="lazy"`, feste `width`/`height`, beschreibender Alt-Text.

---

## 1. GLOBALES LAYOUT — `src/routes/__root.tsx`

> Erzeuge die Root-Route mit `<LanguageProvider>` → `<RfqProvider>` → `<SiteHeader />` → `<main><Outlet /></main>` → `<SiteFooter />` → `<FloatingActions />` → `<Toaster />` (sonner).
> Lade Barlow, Barlow Condensed und IBM Plex Mono im Head. Setze `<html lang>` dynamisch auf `en` bzw. `zh-CN`.

### 1.1 SiteHeader
> Sticky Header, `border-b border-border bg-background/95 backdrop-blur`.
> Obere Utility-Leiste (dunkel, `bg-graphite`, Text 12px): Firmenkurzname, Standort Handan/Hebei, E-Mail, rechts der LanguageSwitcher.
> Hauptleiste: links Wortmarke „XIANGJINXIN" in Barlow Condensed uppercase + Untertitel „Industrial Fasteners"; mittig Navigation: Products (Dropdown mit allen 9 Kategorien), Custom Manufacturing, Industries, Wholesale, Manufacturing, Quality, Resources; rechts Buttons „RFQ List (n)" (Zähler aus RFQ-Context) und primär „Request Quote".
> Mobil: Sheet-Menü mit denselben Punkten, Sprachumschalter oben.

### 1.2 LanguageSwitcher
> Kleine Gruppe mit Globe-Icon (lucide, 3.5), zwei Buttons „EN" und „中文", `aria-pressed`, aktiver Zustand `bg-primary text-primary-foreground`, Rahmen 1px, kantig. Auswahl in `localStorage` unter `xjx-lang`.

### 1.3 FloatingActions
> Fixiert unten rechts, `z-50`, vertikaler Stack mit 12px Abstand:
> 1. WhatsApp-Button (grün, MessageCircle-Icon) → `https://wa.me/4917641474606`, `target="_blank" rel="noopener"`, `aria-label="Chat on WhatsApp"`.
> 2. Chat-Trigger (Navy, Bot-Icon) öffnet das ChatWidget.

### 1.4 ChatWidget
> Panel 380×560px, kantig, `border border-border bg-card`, Header mit Titel „Sales Assistant" und Schließen-Button.
> Nachrichtenliste über die AI-Elements (`conversation`, `message`, `shimmer`), Eingabe über `prompt-input`.
> Backend: Server-Funktion `src/lib/chat.functions.ts` (`createServerFn`), Lovable AI Gateway, Modell `google/gemini-3.5-flash`, System-Prompt: Vertriebsingenieur für Industrieschrauben; antwortet zu Produkten, Werkstoffen, Güteklassen, MOQ, RFQ-Prozess; nennt keine Preise; verweist bei konkreten Anfragen auf `/contact` oder WhatsApp; antwortet in der Sprache des Nutzers (EN/中文).

### 1.5 SiteFooter
> Vierspaltig (`bg-graphite text-graphite-foreground`): Spalte 1 Firmenname, Positionierung, Adresse, E-Mail, Kreditcode; Spalte 2 Produkte (9 Kategorien); Spalte 3 Unternehmen (Manufacturing, Quality, Custom Manufacturing, Wholesale, Distributors, Resources); Spalte 4 Anfragen (Contact, RFQ List, BOM Upload, Drawing Upload).
> Unten Trennlinie: Copyright + Links zu `/legal/privacy`, `/legal/terms`, `/legal/cookies`.

### 1.6 Wiederverwendbare Bausteine
- `<Section tone eyebrow title intro id className>` — max-w-7xl, px-4, py-16/20, Eyebrow-Mono-Label, h2 3xl/4xl bold, Intro max-w-3xl muted.
- `<PageHero eyebrow title intro>{CTAs}</PageHero>` — `blueprint-grid`-Hintergrund, h1 4xl/5xl, darunter Button-Reihe.
- `<ProductCard product categorySlug categoryName>` — Kartenrahmen, Kategorie-Eyebrow, Produktname h3, Summary, Spec-Liste in `.spec-value`, Badge „Custom" wenn `product.custom`, Buttons „Add to RFQ" und „Request Quote".
- `<RfqForm variant submitLabel presetProducts>` — siehe Abschnitt 13.

---

## 2. STARTSEITE — `src/routes/index.tsx`

> Baue die Startseite als 22-stufige Industrie-Verkaufshierarchie. Alle Texte zweisprachig.

**Head:** Title „Industrial Fasteners, Bolts & Custom Bolts up to M120 | Xiangjinxin"; Description „Industrial fastener manufacturer and wholesale supplier: hex and high-strength bolts, nuts, anchors, threaded rods, solar fasteners and drawing-based custom bolts M30–M120."; JSON-LD `FAQPage` mit den ersten 8 FAQs.

Abschnitte in exakt dieser Reihenfolge:

1. **Hero** — Vollbreite, `blueprint-grid`, links Eyebrow „Industrial Fastener Manufacturer", h1 „Industrial Fasteners, Bolts & Custom Bolts up to M120", Intro-Absatz, CTAs „Request Quote" / „Upload Drawing" / „Browse Products"; rechts `hero-fasteners.jpg`.
2. **Trust-Strip** — Mono-Chips: Wholesale · OEM · Project Supply · Custom Fasteners · Drawing-Based Manufacturing.
3. **Buyer Routing (4 Karten, Icons Boxes/Handshake/FileSpreadsheet/Ruler)** —
   Standard Fasteners → `/products`; Wholesale Supply → `/wholesale`; Project Supply → `/contact`; Custom Fasteners → `/custom-manufacturing`.
4. **Produktkategorien** (`tone="muted"`) — Grid 1/2/3, alle 9 Kategorien als Link-Karten mit „n product families", Name, Intro, „View category →"; darunter Button „View All Products".
5. **High-Strength** — Eyebrow „Grades 8.8 · 10.9 · 12.9", drei `.rule-accent`-Karten mit riesiger Mono-Zahl (8.8 / 10.9 / 12.9) und Anwendungssatz; Button „Explore High-Strength Bolts" → `/products/bolts`.
6. **Large Bolts** — Full-Bleed `bg-graphite`, links Text „Custom Heavy-Duty Bolts Up to M120", CTAs „Request Custom Bolt Quote" + „Custom Portfolio", rechts `large-bolts.jpg`.
7. **Anchors & Construction** — bis zu 8 Produkte aus `anchor-bolts` + `expansion-anchors` als kompakte Karten.
8. **Solar** (`tone="muted"`, zweispaltig) — links `solar-fasteners.jpg`, rechts Liste mit Orange-Quadrat-Bullets: PV bolts and nuts, Pressure-block bolts, C-channel fasteners, Support components, Clamps, Triangle connectors, Tile hooks; CTAs „Explore Solar Fasteners" + „Request PV Project Quote".
9. **Custom Manufacturing** — links `custom-drawing.jpg`, rechts nummerierte 7-Schritt-Liste (01–07): Drawing → Engineering Requirement → Technical Review → Quotation → Production → Inspection → Delivery; Button „Upload Your Drawing".
10. **Industries** (`tone="muted"`) — alle 9 Branchen als Link-Karten.
11. **Manufacturing & Quality** — zwei Karten mit Factory- bzw. ShieldCheck-Icon und Buttons zu `/manufacturing` und `/quality`.
12. **Wholesale + BOM CTA** — Full-Bleed `bg-primary`, links „Wholesale & Project Supply" + Button „Request Wholesale Quote", rechts umrandeter Block „Upload Your BOM" (XLS, XLSX, CSV, PDF) → `/contact#bom`.
13. **Distributor + Resources** — zwei Karten: „Become a Fastener Distributor" → `/distributors`, „Technical Resources" → `/resources`.
14. **RFQ-Formular** (`id="rfq"`, `tone="muted"`) — `<RfqForm variant="product" />` in Kartenrahmen.
15. **FAQ** — shadcn Accordion (single, collapsible, max-w-3xl) mit allen FAQs aus dem Katalog.
16. **Final CTA** — `bg-graphite`, zentriert: „Need Standard or Custom Fasteners?", drei Buttons (Submit RFQ / Upload Drawing / Download Catalog), Fußzeile mit Firmenname + „7-step custom manufacturing workflow".

---

## 3. PRODUKTÜBERSICHT — `src/routes/products.index.tsx`

> Filterbare Katalogseite mit Sidebar.

**Head:** „Industrial Fastener Products — Bolts, Nuts, Anchors | Xiangjinxin", Description über die neun Kategorien, canonical `/products`.

- **PageHero:** Eyebrow „Product Portfolio", h1 „Industrial Fastener Products", Intro zum Filtern und Sammeln im RFQ; CTAs „Open RFQ List" → `/rfq`, „Submit RFQ" → `/contact`.
- **Layout:** `grid lg:grid-cols-[260px_1fr]`.
- **Sidebar (Client-State, kein Backend):**
  - Suchfeld mit Search-Icon, `maxLength={80}`, Placeholder „Search bolts, nuts, sizes or specifications...".
  - Kategorie-Liste: „All categories" + 9 Kategorien als linksbündige Buttons mit unterer Trennlinie, aktiv = `font-semibold text-primary`.
  - Standard/Custom: drei Chips (all / standard / custom).
  - Durchmesser-Chips: M4, M6, M8, M10, M12, M16, M20, M24, M30, M120 (Toggle).
  - Grade-Chips: 4.8, 8.8, 10.9, 12.9 (Toggle, teilt sich State mit Durchmesser).
  - Ghost-Button „Reset filters".
- **Ergebnisse:** Zähler „n product families" in `.spec-value`; pro Kategorie Überschrift h2 + Link „Category page"; Produkte im Grid 1/2/3 als `<ProductCard>`.
- **Leerzustand:** Hinweistext mit Link „Request Center" → `/contact`.
- **Suchlogik:** Volltext über Name, Summary, Kategoriename, alle Spec-Werte und Applications (lowercase `includes`).

---

## 4. KATEGORIESEITE — `src/routes/products.$category.tsx`

> Dynamische Route mit Loader: `getCategory(params.category)`, sonst `notFound()`.

**Head:** `"${category.name} Manufacturer & Supplier | Xiangjinxin"`, Description = `category.intro`, `og:type = product.group`, canonical `/products/${slug}`, JSON-LD `BreadcrumbList` (Products → Kategorie).

1. **PageHero:** Eyebrow „Products", Titel = Kategoriename, Intro = Kategorie-Intro; CTAs „Request Quote" + „Upload Drawing".
2. **Produkt-Grid:** alle Produkte als `<ProductCard>`, jede Karte mit `id={product.slug}` und `scroll-mt-28` für Deep-Links.
3. **Spezifikationsmatrix** (`tone="muted"`): Tabelle `min-w-[640px]`, Kopf `bg-secondary`, Spalten **Product | Key specification | Type | Applications**; Specs als `Label: Wert · …` in Mono; Type = „Custom" oder „Standard"; darunter Disclaimer, dass Werkstoffe, Oberflächen, Normen und Toleranzen pro Anfrage bestätigt werden.
4. **RFQ-Sektion:** Titel „Request a quotation for <kategorie>", links `<RfqForm variant="product" presetProducts="Category: …">`, rechts Aside mit „Other categories" (alle übrigen Kategorien) und Block „Multiple specifications?" mit Button „Upload BOM" → `/contact#bom`.

---

## 5. RFQ-LISTE — `src/routes/rfq.tsx`

**Head:** „RFQ List — Request Quotation for Selected Fasteners | Xiangjinxin", zusätzlich `robots: noindex`.

- **PageHero:** Eyebrow „Request for Quotation", Titel „RFQ List (n)", Intro zum Ergänzen von Größen, Mengen und Notizen.
- **Leerzustand:** zentrierte Karte „Your RFQ list is empty" + Buttons „Browse Products" und „Upload BOM".
- **Zeilen:** je Position Karte mit Kategorie-Eyebrow, Produktname h2, Spec in Mono, Trash-Icon-Button zum Entfernen; darunter zwei Inputs: Quantity (`maxLength 40`, Placeholder „Quantity (e.g. 5,000 pcs)") und Note (`maxLength 200`, Placeholder „Size / grade / notes (e.g. M20, 10.9, HDG)").
- **Aktionen:** „Request Quotation" → `/contact`, „Upload BOM Instead" → `/contact#bom`, Ghost „Clear list".
- **State:** `useRfq()` aus `src/lib/rfq.tsx` — React Context + `localStorage`, Methoden `add/update/remove/clear`, Item `{ id, name, category, spec, quantity, note }`.

---

## 6. CUSTOM MANUFACTURING — `src/routes/custom-manufacturing.tsx`

**Head:** „Custom Fastener Manufacturer — Drawing-Based Bolts M30–M120 | Xiangjinxin".

1. **PageHero:** Eyebrow „Custom Manufacturing", Titel zu zeichnungsbasierter Fertigung und Sonderabmessungen; CTAs „Upload Drawing" (Anker `#drawing`) + Outline-Button zum Custom-Portfolio.
2. **„What can be customised"** — Karten-Grid: Geometrie/Sonderformen, Übergrößen & Überlängen, Linksgewinde, Werkstoff & Wärmebehandlung, Oberfläche, Gewindeform, Kennzeichnung, Verpackung.
3. **M30–M120-Block** — dunkle Sektion mit `large-bolts.jpg`, Text zu Großdurchmessern für Schwermaschinen, Infrastruktur, Energie, Bergbau.
4. **„Customisation Workflow"** (`tone="muted"`) — 7 Schritte aus `workflow` als nummerierte Karten.
5. **RFQ** (`id="drawing"`) — `<RfqForm variant="custom" submitLabel="Submit Technical Requirement" />`; Upload akzeptiert `.pdf,.dwg,.dxf,.step,.stp,.jpg,.jpeg,.png,.xlsx`.

---

## 7. BRANCHEN — `src/routes/industries.index.tsx` + `industries.$slug.tsx`

**Übersicht** (`/industries`): Head „Industries We Serve — Fasteners by Application | Xiangjinxin"; PageHero „Industries We Serve"; Grid mit allen 9 Branchen (Construction, Steel Structures, Machinery, Solar / Photovoltaic, Infrastructure, Energy, Mining, Transport/Automotive, Distribution & Trade) als Link-Karten mit Headline h2 und Beschreibung.

**Detailseite** (`/industries/$slug`): Loader über den Slug, sonst `notFound()` und `robots: noindex`.
Head-Title `"${industry.headline} | Xiangjinxin"`.
1. PageHero mit Eyebrow „Industry", Headline und Beschreibung, CTAs „Request Quote" + Outline zu passenden Produkten.
2. „Typical fastening components" — Karten der branchenrelevanten Produkte.
3. RFQ (`tone="muted"`) — `<RfqForm variant="project" submitLabel={industry.cta} presetProducts={"Industry: …"} />`.

---

## 8. WHOLESALE — `src/routes/wholesale.tsx`

**Head:** „Industrial Fasteners Wholesale — Distributor & Importer Supply | Xiangjinxin".
1. PageHero: Eyebrow „Wholesale", Titel „Fastener Supply for Distributors, Importers and Industrial Buyers", CTAs „Request Wholesale Pricing" (`#form`) + Outline „Browse Products".
2. „What you can request a quotation for" — Karten: Einzelprodukt, Mischspezifikationen, Großmengen, Jahresbedarf, Projektbedarf, OEM/Private Label, Lagerhaltungsprogramme.
3. RFQ (`id="form"`, `tone="muted"`): `<RfqForm variant="product" submitLabel="Submit RFQ" />`.

---

## 9. DISTRIBUTORS — `src/routes/distributors.tsx`

**Head:** „Become a Fastener Distributor — Partnership Application | Xiangjinxin".
1. PageHero: Eyebrow „Partnership", Titel „Become a Fastener Distributor".
2. „What cooperation can cover" — Karten zu Gebietsschutz, Musterlieferung, Katalog-/Marketingunterlagen, technischer Support, wiederkehrende Lieferpläne, Private Label.
3. RFQ (`tone="muted"`): `<RfqForm variant="distributor" submitLabel="Submit Distributor Application" />`.

---

## 10. MANUFACTURING — `src/routes/manufacturing.tsx`

**Head:** „Manufacturing Capability — Fastener Production | Xiangjinxin".
1. PageHero: Eyebrow „Capability", Titel „Manufacturing Capability".
2. „Production sequence" — nummerierte Prozessstufen: Materialauswahl → Kaltumformung/Warmschmieden → Gewindeformen/-schneiden → Wärmebehandlung → Oberflächenbehandlung → Prüfung → Verpackung.
3. „Large fastener manufacturing" (`tone="muted"`) — Abschnitt zu Großdurchmessern und Überlängen inkl. Hinweis auf zeichnungsbasierte Fertigung.

---

## 11. QUALITY — `src/routes/quality.tsx`

**Head:** „Quality Control & Standards | Xiangjinxin Fasteners".
1. PageHero: Eyebrow „Quality", Titel „Quality Control".
2. „Control stages" — Wareneingang, Maßprüfung, Gewindelehren, Härte-/Mechanikprüfung, Oberflächen-/Schichtdickenprüfung, Sichtprüfung, Endkontrolle vor Versand.
3. „Documentation on request" (`tone="muted"`) — zwei Spalten: **Certifications** und **Standards** (DIN, ISO, GB, ANSI/ASTM), jeweils mit Hinweis „auf Anfrage".

---

## 12. RESOURCES — `src/routes/resources.tsx`

**Head:** „Technical Resources — Catalog, Datasheets & Documents | Xiangjinxin".
1. PageHero: Eyebrow „Resources", Titel „Technical Resources".
2. „What you can request" — Karten: Produktkatalog (PDF), Datenblätter, Zeichnungen, Normenübersicht, Zertifikate, RFQ-Vorlage, Verpackungs-/Versanddaten.
3. Dokumentanfrage (`tone="muted"`): `<RfqForm variant="general" submitLabel="Request Document" />`.

---

## 13. REQUEST CENTER — `src/routes/contact.tsx` + `RfqForm`

**Head:** „Request Center — RFQ, BOM & Drawing Submission | Xiangjinxin".

- **PageHero:** Eyebrow „Request Center", Titel „Send your requirement to our sales engineering team", Intro zur internen Weiterleitung; Outline-Button „RFQ List (n)".
- **Tabs** (`bg-secondary p-1`, umbruchfähig): **Product RFQ · BOM RFQ · Custom Drawing · Project Inquiry · Distributor Application · General Inquiry**. Beim Aufruf mit Hash `#bom` startet der BOM-Tab aktiv.
- Jeder Tab rendert `<RfqForm>` mit passender Variante und Submit-Label; der Product-Tab füllt das Feld „Requirement description" automatisch mit den RFQ-Listen-Einträgen (`Name (Kategorie) — Spec — Qty: …`).
- **Aside:** Karte mit Firmenname, Adresse, E-Mail; zweite Karte „Helpful for a fast quotation": Produkttyp und Menge, Durchmesser/Länge/Gewinde, Grade/Material/Oberfläche, Norm oder Zeichnung, Anwendung und Zielmarkt.

### RfqForm — exakte Spezifikation
Varianten: `product | bom | custom | project | distributor | general`.

**Block „Contact"** (2 Spalten): Full name (required, 100), Company (required, 120), Business email (required, type=email, 160), Phone / WhatsApp / WeChat (60), Country (required, 80), Website (160, Placeholder „Optional").

**Block „Buyer profile"** (außer `general`): Buyer type (Select aus `buyerTypes`), Target market (120, optional).

**Block „Technical specification"** (bei `product`, `project`, `custom`): Product category (Select aus den 9 Kategorien), Diameter (Placeholder „e.g. M20"), Length, Thread, Grade (Placeholder „e.g. 10.9"), Material, Surface treatment, Standard / drawing (Placeholder „DIN / ISO / GB / drawing"), Quantity, Annual volume, Target delivery, Application / industry.

**Block „Distributor profile"** (nur `distributor`): Markets covered, Years in business, Existing fastener business, Customer types, Products sold, Warehouses, Sales channels, Estimated annual purchase, Product interests, Target cooperation date.

**Abschluss:** Textarea „Requirement description" (vorbelegbar über `presetProducts`), Datei-Upload mit Variantenfilter:
```
product      .pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png
bom          .xls,.xlsx,.csv,.pdf
custom       .pdf,.dwg,.dxf,.step,.stp,.jpg,.jpeg,.png,.xlsx
project      .pdf,.xls,.xlsx,.csv,.doc,.docx
distributor  .pdf,.xlsx,.csv
general      .pdf,.jpg,.jpeg,.png,.xlsx
```
Ausgewählte Dateinamen werden unter dem Feld gelistet. Submit validiert die E-Mail per Regex (`toast.error` „Please enter a valid business email address."), zeigt Ladezustand und danach `toast.success` „Request received" mit Beschreibung „Our sales engineering team will review your requirement and reply by email."; Formular wird zurückgesetzt.
Labels: 11–12px, uppercase, `tracking-wide`, muted; Inputs kantig, Höhe 36px, Fokus `ring-2 ring-ring`.

---

## 14. LEGAL — `src/routes/legal.$doc.tsx`

> Eine dynamische Route für drei Dokumente: `privacy`, `terms`, `cookies` (unbekannter Slug → `notFound()` + `robots: noindex`).
> PageHero: Eyebrow „Legal", Titel = Dokumenttitel (EN/中文), Intro = Firmenname.
> Inhalt: Absatzliste `max-w-3xl`, zweisprachig, Themen: Datenverarbeitung bei Anfragen, Speicherdauer, Kontaktadresse, Nutzungsbedingungen und Angebotsvorbehalt, Cookie-Einsatz (nur funktional: Sprache und RFQ-Liste in localStorage).

---

## 15. SEO, DATEN & QUALITÄTSKRITERIEN

- `public/robots.txt`: explizite Allow-Regeln für Googlebot, Bingbot, Twitterbot, facebookexternalhit und `*`.
- `public/sitemap.xml`: alle statischen Routen + 9 Kategorien + 9 Branchen; `/rfq` bleibt noindex.
- JSON-LD: `Organization` global, `FAQPage` auf der Startseite, `BreadcrumbList` auf Kategorieseiten.
- Genau **eine** h1 pro Seite; Sektionsüberschriften h2, Kartentitel h3.
- Katalogdatei `src/data/catalog.ts` exportiert: `COMPANY`, `categories` (9), `industries` (9), `faqs`, `workflow` (7 Schritte), `buyerTypes`.
- i18n-Wörterbuch `src/data/i18n-dict.ts` mit über 340 Einträgen (Produkte, Specs, Applications, Branchen, FAQs) — keine doppelten Keys.
- Abnahme: `bunx tsgo --noEmit` fehlerfrei, Sprachumschalter wirkt auf allen Seiten, RFQ-Liste überlebt Reload, WhatsApp- und Chat-Button auf jeder Route sichtbar, mobile Breakpoints 375/768/1280 geprüft.
