export const COMPANY = {
  name: "Hebei Xiangjinxin Metal Products Co., Ltd.",
  shortName: "Xiangjinxin",
  creditCode: "91130408MAEMXJG14R",
  address:
    "Row 2 No. 3, West Industrial Zone, Xisuining Village, Liuying Town, Yongnian District, Handan, Hebei, China",
  established: "19 June 2025",
  email: "sales@xiangjinxin-fasteners.com",
  positioning:
    "Industrial fastener manufacturer and wholesale supplier for standard, high-strength and drawing-based custom applications.",
};

export type Product = {
  slug: string;
  name: string;
  summary: string;
  specs: { label: string; value: string }[];
  custom?: boolean;
  applications: string[];
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  products: Product[];
};

export const categories: Category[] = [
  {
    slug: "bolts",
    name: "Industrial Bolts",
    short: "Bolts",
    intro:
      "Standard, high-strength and structural bolts, plus large-diameter custom bolts manufactured to drawing.",
    products: [
      {
        slug: "hex-bolts",
        name: "Hex Bolts — Grade 4.8",
        summary: "General purpose hex head bolts for standard industrial assembly.",
        specs: [
          { label: "Diameter", value: "M6 – M24" },
          { label: "Grade", value: "4.8" },
          { label: "Head type", value: "Hex" },
        ],
        applications: ["General assembly", "Construction", "Equipment mounting"],
      },
      {
        slug: "high-strength-bolts",
        name: "High-Strength Hex Bolts",
        summary: "High-strength hex bolts for structural and demanding load applications.",
        specs: [
          { label: "Diameter", value: "M8 – M30" },
          { label: "Grade", value: "8.8 / 10.9 / 12.9" },
          { label: "Head type", value: "Hex" },
        ],
        applications: ["Steel structures", "Machinery", "Heavy equipment"],
      },
      {
        slug: "custom-large-bolts",
        name: "Extra-Large Custom Bolts",
        summary:
          "Large-diameter custom bolts manufactured to customer drawing for heavy industrial applications.",
        specs: [
          { label: "Diameter", value: "M30 – M120" },
          { label: "Basis", value: "Customer drawing / specification" },
          { label: "Grade", value: "Contact us for details" },
        ],
        custom: true,
        applications: ["Heavy machinery", "Infrastructure", "Energy", "Mining equipment"],
      },
      {
        slug: "flange-bolts",
        name: "Hex Flange Bolts",
        summary: "Integrated flange head bolts distributing load without a separate washer.",
        specs: [
          { label: "Diameter", value: "M6 – M16" },
          { label: "Head type", value: "Hex flange" },
        ],
        applications: ["Machinery", "Vehicle and trailer assembly"],
      },
      {
        slug: "socket-head-screws",
        name: "Socket Head Cap Screws",
        summary: "Internal hex drive cap screws for compact, high-torque assemblies.",
        specs: [
          { label: "Grade", value: "8.8 / 10.9 / 12.9" },
          { label: "Drive", value: "Internal hex" },
        ],
        applications: ["Machinery", "Tooling", "Equipment manufacturing"],
      },
      {
        slug: "countersunk-socket-screws",
        name: "Countersunk Socket Screws",
        summary: "Flat head socket screws for flush-mounted assemblies.",
        specs: [
          { label: "Diameter", value: "M4 – M24" },
          { label: "Head type", value: "Countersunk" },
        ],
        applications: ["Machinery", "Panels and fixtures"],
      },
      {
        slug: "tension-control-bolts",
        name: "Tension Control / Torshear Bolts",
        summary: "Torshear type bolt assemblies for controlled structural bolting.",
        specs: [{ label: "Diameter", value: "M16 – M24" }],
        applications: ["Steel structures", "Bridges", "Towers"],
      },
      {
        slug: "special-shaped-bolts",
        name: "Special-Shaped Bolts",
        summary:
          "T-slot bolts, eye bolts, articulated and lifting eye bolts, square-head and reverse-thread bolts.",
        specs: [{ label: "Basis", value: "Standard range or customer drawing" }],
        custom: true,
        applications: ["Lifting", "Machine tooling", "Special fixtures"],
      },
    ],
  },
  {
    slug: "nuts",
    name: "Industrial Nuts",
    short: "Nuts",
    intro:
      "Hex, flange, locking, heavy forged and application-specific nuts for industrial and project supply.",
    products: [
      {
        slug: "hex-nuts",
        name: "Hex Nuts",
        summary: "Standard hex nuts, coarse and fine thread variants where applicable.",
        specs: [{ label: "Thread", value: "Coarse / fine" }],
        applications: ["General assembly", "Construction", "Machinery"],
      },
      {
        slug: "flange-nuts",
        name: "Flange Nuts",
        summary: "Flanged nuts with integrated bearing surface.",
        specs: [{ label: "Type", value: "Flange" }],
        applications: ["Machinery", "Vehicle assembly"],
      },
      {
        slug: "lock-nuts",
        name: "Nylon Lock Nuts & Slotted Self-Locking Nuts",
        summary: "Prevailing-torque and nylon insert locking nuts for vibration environments.",
        specs: [{ label: "Type", value: "Nylon insert / slotted self-locking" }],
        applications: ["Machinery", "Transport equipment"],
      },
      {
        slug: "heavy-nuts",
        name: "Thick / Heavy & Hot-Forged Nuts",
        summary: "Heavy pattern and hot-forged nuts for high-load structural connections.",
        specs: [{ label: "Type", value: "Heavy hex / hot forged" }],
        applications: ["Steel structures", "Infrastructure", "Towers"],
      },
      {
        slug: "weld-nuts",
        name: "Weld Nuts",
        summary: "Weldable nuts for fabricated and OEM assemblies.",
        specs: [{ label: "Type", value: "Weld" }],
        applications: ["Fabrication", "OEM manufacturing"],
      },
      {
        slug: "special-nuts",
        name: "Round, Wing, Cap, Slotted, Cylindrical & Anti-Theft Nuts",
        summary: "Application-specific nut families available across the portfolio.",
        specs: [{ label: "Type", value: "Multiple families" }],
        applications: ["Equipment", "Fixtures", "Security fastening"],
      },
      {
        slug: "solar-tower-nuts",
        name: "Solar / PV Nuts & Tower Nuts",
        summary: "Nuts supplied for photovoltaic mounting systems and tower structures.",
        specs: [{ label: "Type", value: "PV / tower" }],
        applications: ["Solar mounting", "Towers"],
      },
    ],
  },
  {
    slug: "threaded-rods",
    name: "Threaded Rods & Stud Bolts",
    short: "Threaded Rods & Studs",
    intro: "Double-end studs and fully threaded rods for flanges, structures and equipment.",
    products: [
      {
        slug: "stud-bolts",
        name: "Double-End Studs",
        summary: "Double-end stud bolts for flanged and bolted connections.",
        specs: [{ label: "Type", value: "Double-end stud" }],
        applications: ["Flange connections", "Machinery", "Energy"],
      },
      {
        slug: "fully-threaded-rods",
        name: "Fully Threaded Rods",
        summary: "Fully threaded rod supplied in standard and cut-to-requirement lengths.",
        specs: [{ label: "Type", value: "Fully threaded" }],
        applications: ["Construction", "Suspension systems", "Anchoring"],
      },
      {
        slug: "trapezoidal-thread-rods",
        name: "Trapezoidal Threaded Rods",
        summary: "Trapezoidal thread rods for motion and load transfer applications.",
        specs: [{ label: "Thread", value: "Trapezoidal" }],
        custom: true,
        applications: ["Machinery", "Lifting equipment"],
      },
    ],
  },
  {
    slug: "anchor-bolts",
    name: "Anchor & Foundation Fasteners",
    short: "Anchor Fasteners",
    intro: "Foundation and embedded fastening components for structures and machinery bases.",
    products: [
      {
        slug: "foundation-bolts",
        name: "Anchor Bolts / Foundation Bolts",
        summary: "Embedded anchor and foundation bolts, standard shapes or to drawing.",
        specs: [{ label: "Basis", value: "Standard shapes or customer drawing" }],
        applications: ["Steel structures", "Machinery foundations", "Infrastructure"],
      },
      {
        slug: "u-bolts",
        name: "U-Bolts",
        summary: "U-shaped clamping bolts for pipe, tube and structural fixing.",
        specs: [{ label: "Type", value: "U-bolt" }],
        applications: ["Piping", "Transport", "Construction"],
      },
      {
        slug: "washers",
        name: "Washers, Spring Washers & Special Washers",
        summary: "Flat, spring and special washers supplied with bolt assemblies.",
        specs: [{ label: "Type", value: "Flat / spring / special" }],
        applications: ["All bolted connections"],
      },
    ],
  },
  {
    slug: "expansion-anchors",
    name: "Expansion & Anchoring Systems",
    short: "Expansion Anchors",
    intro: "Mechanical and chemical anchoring systems for concrete and masonry.",
    products: [
      {
        slug: "external-expansion-bolts",
        name: "External Expansion Bolts",
        summary: "Through-bolt style expansion anchors.",
        specs: [{ label: "Type", value: "External expansion" }],
        applications: ["Construction", "Equipment mounting"],
      },
      {
        slug: "internal-expansion-anchors",
        name: "Internal & Countersunk Expansion Anchors",
        summary: "Internally set anchors including countersunk versions.",
        specs: [{ label: "Type", value: "Internal / countersunk" }],
        applications: ["Concrete fixing", "Interior structures"],
      },
      {
        slug: "chemical-anchors",
        name: "Chemical Anchors",
        summary: "Chemically bonded anchoring components.",
        specs: [{ label: "Type", value: "Chemical" }],
        applications: ["Concrete", "Retrofit anchoring"],
      },
      {
        slug: "sleeve-wedge-anchors",
        name: "Sleeve & Wedge / Heavy-Duty Anchors",
        summary: "Sleeve, wedge and heavy-duty anchoring fasteners.",
        specs: [{ label: "Type", value: "Sleeve / wedge / heavy duty" }],
        applications: ["Structural fixing", "Machinery bases"],
      },
    ],
  },
  {
    slug: "self-drilling-screws",
    name: "Self-Drilling & Self-Tapping Fasteners",
    short: "Self-Drilling Fasteners",
    intro: "Drilling and tapping screws for sheet metal, roofing, board and interior systems.",
    products: [
      {
        slug: "hex-self-drilling-screws",
        name: "Hex Self-Drilling Screws",
        summary: "Hex washer head self-drilling screws.",
        specs: [{ label: "Head type", value: "Hex washer" }],
        applications: ["Roofing", "Steel sheet", "Cladding"],
      },
      {
        slug: "stainless-self-drilling-screws",
        name: "Stainless Steel Self-Drilling Screws",
        summary: "Stainless self-drilling screws for corrosion-exposed assemblies.",
        specs: [{ label: "Material", value: "Stainless steel" }],
        applications: ["Outdoor structures", "Solar", "Coastal projects"],
      },
      {
        slug: "self-tapping-screws",
        name: "Self-Tapping & Countersunk Self-Tapping Screws",
        summary: "Self-tapping screws in multiple head types.",
        specs: [{ label: "Head type", value: "Multiple" }],
        applications: ["Sheet metal", "Assembly"],
      },
      {
        slug: "drywall-fiberboard-screws",
        name: "Drywall & Fiberboard Screws",
        summary: "Board fixing screws for interior construction.",
        specs: [{ label: "Type", value: "Drywall / fiberboard" }],
        applications: ["Interior construction", "Board systems"],
      },
    ],
  },
  {
    slug: "pins-rivets",
    name: "Pins, Rivets & Retaining Components",
    short: "Pins & Rivets",
    intro: "Positioning, joining and retaining components for machinery and fabrication.",
    products: [
      {
        slug: "pins",
        name: "Cylindrical, Taper, Cotter & Locating Pins",
        summary: "Pin families for positioning and securing components.",
        specs: [{ label: "Type", value: "Cylindrical / taper / cotter / locating" }],
        applications: ["Machinery", "Equipment assembly"],
      },
      {
        slug: "rivets",
        name: "Round-Head & Blind Rivets",
        summary: "Solid and blind rivets for permanent joints.",
        specs: [{ label: "Type", value: "Round head / blind" }],
        applications: ["Fabrication", "Sheet assembly"],
      },
      {
        slug: "welding-studs",
        name: "Structural Welding Studs",
        summary: "Shear connector style welding studs for structural work.",
        specs: [{ label: "Type", value: "Welding stud" }],
        applications: ["Steel structures", "Composite decks"],
      },
      {
        slug: "retaining-rings",
        name: "Shaft & Internal Retaining Rings / Circlips",
        summary: "External and internal retaining rings.",
        specs: [{ label: "Type", value: "External / internal" }],
        applications: ["Machinery", "Drive assemblies"],
      },
    ],
  },
  {
    slug: "solar-fasteners",
    name: "Solar & Photovoltaic Fasteners",
    short: "Solar Fasteners",
    intro:
      "Fastening and connection components for PV mounting systems, ground structures and rooftop installations.",
    products: [
      {
        slug: "pv-bolts-nuts",
        name: "PV Bolts & Nuts",
        summary: "Bolt and nut components for photovoltaic mounting structures.",
        specs: [{ label: "Application", value: "PV mounting" }],
        applications: ["Solar mounting", "EPC projects"],
      },
      {
        slug: "pressure-block-bolts",
        name: "Pressure Block Bolts",
        summary: "Module pressure block bolt sets.",
        specs: [{ label: "Application", value: "Module clamping" }],
        applications: ["Solar mounting"],
      },
      {
        slug: "c-channel-bolts",
        name: "C-Channel Matching Bolts",
        summary: "Bolts matched to C-channel mounting profiles.",
        specs: [{ label: "Application", value: "C-channel profiles" }],
        applications: ["Solar structures"],
      },
      {
        slug: "solar-support-components",
        name: "Support Brace Rods & Seismic Support Accessories",
        summary: "Bracing rods and seismic support accessory components.",
        specs: [{ label: "Type", value: "Support / bracing" }],
        applications: ["Solar structures", "Building services"],
      },
      {
        slug: "clamps-connectors-hooks",
        name: "Clamps, Triangle Connectors & Tile Hooks",
        summary: "Connection hardware for rooftop and ground-mount systems.",
        specs: [{ label: "Type", value: "Clamp / connector / hook" }],
        applications: ["Rooftop PV", "Ground mount PV"],
      },
    ],
  },
  {
    slug: "custom-fasteners",
    name: "Custom & Non-Standard Fasteners",
    short: "Custom Fasteners",
    intro:
      "Drawing-based components, special geometries, oversized and reverse-thread fasteners reviewed case by case.",
    products: [
      {
        slug: "custom-special-shaped-bolts",
        name: "Custom Special-Shaped Bolts",
        summary: "Non-standard geometries manufactured to customer drawing.",
        specs: [{ label: "Basis", value: "Customer drawing" }],
        custom: true,
        applications: ["OEM", "Machinery", "Special equipment"],
      },
      {
        slug: "oversized-components",
        name: "Oversized & Extra-Long Components",
        summary: "Components beyond standard catalogue dimensions.",
        specs: [{ label: "Diameter", value: "Custom bolts M30 – M120" }],
        custom: true,
        applications: ["Heavy industry", "Infrastructure", "Energy"],
      },
      {
        slug: "reverse-thread-fasteners",
        name: "Reverse-Thread Screws",
        summary: "Left-hand thread fasteners for specific mechanical requirements.",
        specs: [{ label: "Thread", value: "Left-hand / reverse" }],
        custom: true,
        applications: ["Machinery", "Rotating assemblies"],
      },
      {
        slug: "drawing-based-fasteners",
        name: "Drawing-Based Custom Components",
        summary:
          "Send a drawing, sample or specification for technical and commercial review.",
        specs: [{ label: "Input", value: "PDF / DWG / DXF / STEP / sample" }],
        custom: true,
        applications: ["All industrial sectors"],
      },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export type Industry = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  products: string[];
  cta: string;
};

export const industries: Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    headline: "Construction Fasteners & Anchoring",
    description:
      "Anchoring and structural fastening components for building, civil and site works.",
    products: [
      "Anchor bolts",
      "Foundation bolts",
      "Expansion bolts",
      "Chemical anchors",
      "Sleeve anchors",
      "U-bolts",
      "Washers",
    ],
    cta: "Request Construction Quote",
  },
  {
    slug: "steel-structures",
    name: "Steel Structures",
    headline: "Fasteners for Steel Structures",
    description:
      "High-strength and structural fastening components for fabricated steel construction.",
    products: [
      "High-strength bolts",
      "Tension control bolts",
      "Heavy nuts",
      "Washers",
      "Anchor bolts",
      "Welding studs",
    ],
    cta: "Request Structural Fastener Quote",
  },
  {
    slug: "machinery",
    name: "Machinery",
    headline: "Fasteners for Machinery Manufacturing",
    description: "Standard and drawing-based fasteners for OEM machinery production.",
    products: [
      "High-strength bolts",
      "Socket screws",
      "Studs",
      "Locking nuts",
      "Pins",
      "Retaining rings",
      "Custom components",
    ],
    cta: "Discuss OEM Requirements",
  },
  {
    slug: "solar",
    name: "Solar / Photovoltaic",
    headline: "Solar & Photovoltaic Fastening Solutions",
    description:
      "Mounting hardware and connection components for PV manufacturers, EPC contractors and installers.",
    products: [
      "PV bolts and nuts",
      "Pressure-block bolts",
      "Bracing components",
      "C-channel bolts",
      "Clamps",
      "Triangle connectors",
      "Tile hooks",
    ],
    cta: "Request Solar Fastener Quote",
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    headline: "Infrastructure Fasteners",
    description: "Heavy fasteners and anchoring components for infrastructure projects.",
    products: ["Anchor bolts", "Heavy nuts", "Large-diameter custom bolts", "Threaded rods"],
    cta: "Submit Project RFQ",
  },
  {
    slug: "energy",
    name: "Energy",
    headline: "Industrial & Project Fasteners for Energy",
    description: "Fastening components for energy plants, equipment and project supply.",
    products: ["Stud bolts", "High-strength bolts", "Heavy nuts", "Custom bolts"],
    cta: "Submit Project RFQ",
  },
  {
    slug: "equipment-manufacturing",
    name: "Equipment Manufacturing",
    headline: "OEM & Drawing-Based Fasteners",
    description:
      "Repeat-supply fasteners for equipment, trailer, agricultural and heavy machinery producers.",
    products: ["Custom bolts", "Flange bolts", "Socket screws", "Weld nuts", "Pins"],
    cta: "Request OEM Quote",
  },
  {
    slug: "towers",
    name: "Towers",
    headline: "Tower Fastening Components",
    description: "Tower nuts and structural fastening components.",
    products: ["Tower nuts", "High-strength bolts", "Washers", "Anchor bolts"],
    cta: "Request Project Quote",
  },
  {
    slug: "heavy-duty",
    name: "Heavy-Duty Applications",
    headline: "Oversized & Special Fasteners",
    description:
      "Large-diameter and special fasteners for applications beyond standard fastener ranges.",
    products: ["Custom bolts M30 – M120", "Special-shaped bolts", "Hot-forged heavy nuts"],
    cta: "Request Large Bolt Quote",
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

export const buyerTypes = [
  "Distributor",
  "Wholesaler",
  "Importer",
  "Manufacturer",
  "Construction Company",
  "Steel Structure Company",
  "Solar Company",
  "EPC",
  "Engineering Company",
  "Project Buyer",
  "Other",
];

export const workflow = [
  { step: "01", title: "Requirement", text: "Product list, specification or application." },
  { step: "02", title: "Drawing / Sample", text: "Drawing, dimensions or physical sample." },
  { step: "03", title: "Technical Review", text: "Feasibility and specification check." },
  { step: "04", title: "Specification Confirmation", text: "Agreed technical definition." },
  { step: "05", title: "Commercial Quotation", text: "Pricing against confirmed specification." },
  { step: "06", title: "Production", text: "Manufacturing to the confirmed specification." },
  { step: "07", title: "Inspection", text: "Dimensional and visual inspection." },
  { step: "08", title: "Shipment", text: "Packing and export dispatch." },
];

export const faqs = [
  {
    q: "What fasteners do you supply?",
    a: "Bolts, nuts, threaded rods and studs, anchor and foundation fasteners, expansion anchors, self-drilling and self-tapping screws, pins, rivets and retaining components, solar / PV fasteners, and custom non-standard fasteners.",
  },
  {
    q: "Which bolt sizes are available?",
    a: "Hex bolts in grade 4.8 are listed from M6 to M24, high-strength hex bolts from M8 to M30, flange bolts from M6 to M16, countersunk socket screws from M4 to M24 and tension control bolts from M16 to M24. Custom large bolts are handled in the M30 to M120 category.",
  },
  {
    q: "Do you supply high-strength bolts?",
    a: "Yes. Grades 8.8, 10.9 and 12.9 are listed for high-strength hex bolts and socket head cap screws.",
  },
  {
    q: "Do you offer large-diameter bolts?",
    a: "Yes. Custom bolts are handled in an M30 to M120 category. Length, grade, material and finish are confirmed case by case against your drawing.",
  },
  {
    q: "Can you manufacture non-standard fasteners?",
    a: "Yes. Drawing-based custom components, special geometries, oversized and extra-long parts are reviewed against your technical documentation.",
  },
  {
    q: "Do you manufacture reverse-thread products?",
    a: "Reverse-thread (left-hand) screws and trapezoidal threaded rods are part of the custom portfolio.",
  },
  {
    q: "Do you supply solar fasteners?",
    a: "Yes — PV bolts and nuts, pressure-block bolts, support brace rods, seismic support accessories, C-channel matching bolts, clamps, triangle connectors and tile hooks.",
  },
  {
    q: "How can I request pricing?",
    a: "Add products to your RFQ list and submit it, or send your product list directly through the Request Center.",
  },
  {
    q: "Can I upload a BOM?",
    a: "Yes. XLS, XLSX, CSV and PDF purchasing lists can be submitted instead of entering each item manually.",
  },
  {
    q: "Can I send a drawing?",
    a: "Yes. PDF, DWG, DXF, STEP/STP, JPG, PNG and XLSX files can be submitted with a custom fastener request.",
  },
  {
    q: "Do you work with distributors?",
    a: "Yes. Distributor and importer cooperation is handled through the distributor application.",
  },
  {
    q: "What information should I provide for an RFQ?",
    a: "Product type, diameter, length, thread, grade, material, surface treatment, standard or drawing, and quantity. Provide what you have — missing details are clarified during technical review.",
  },
];
