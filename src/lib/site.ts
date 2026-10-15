import type { PhotoKey } from "./photos";

export const site = {
  name: "YandNow",
  legal: "YandNow Skill Development",
  tagline: "Skills that hold up on the floor.",
  description:
    "YandNow builds workforce capability across six verticals — corporate, CSR, industry, defence, schools and micro-entrepreneurship — with hands-on training delivered at scale.",
  email: "connect@yandnow.com",
  phone: "+91 98765 43210",
  address: ["YandNow Skill Development", "Bhopal · Pune · Guwahati", "India"],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
] as const;

/* ──────────────────────────────────────────────────────────
   Headline metrics
   ────────────────────────────────────────────────────────── */
export const metrics = [
  { value: 48000, suffix: "+", label: "People trained", note: "Across 6 programme verticals" },
  { value: 210, suffix: "+", label: "Training centres", note: "Fixed, mobile and on-site" },
  { value: 86, suffix: "%", label: "Placement rate", note: "Within 90 days of certification" },
  { value: 19, suffix: "", label: "States covered", note: "From Meghalaya to Karnataka" },
] as const;

/* ──────────────────────────────────────────────────────────
   Six solution verticals
   ────────────────────────────────────────────────────────── */
export type Solution = {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  lede: string;
  /** Written per vertical: "Open CSR programmes" reads better than a derived
   *  "Open csr", and lowercasing a title would ruin the acronyms. */
  ctaLabel: string;
  hero: PhotoKey;
  accent: "indigo" | "cyan";
  audience: string[];
  offerings: { title: string; body: string }[];
  formats: string[];
  outcomes: { stat: string; label: string }[];
  gallery: PhotoKey[];
  /** "What we deliver" headline, pre-broken into display lines. */
  deliverLines: string[];
  /** "From this vertical" gallery headline, pre-broken into display lines. */
  fieldLines: string[];
  /** Sub-text under the "What we deliver" headline. */
  deliverSub: string;
  /** Caption under the gallery headline. */
  fieldSub: string;
};

export const solutions: Solution[] = [
  {
    slug: "corporate",
    index: "01",
    title: "Corporate Training",
    short: "Corporate",
    summary:
      "Sharpening technical know-how and floor discipline for service networks, dealer technicians and frontline crews.",
    lede:
      "Your technicians are the product experience. We build hands-on training around your exact service manuals, diagnostic tools and quality standards — running cohorts across your dealer network until every floor operates with confidence.",
    ctaLabel: "Open corporate training",
    hero: "engine-cohort",
    accent: "indigo",
    audience: [
      "OEM service networks",
      "Dealer & workshop technicians",
      "Fleet maintenance teams",
      "Frontline supervisors",
    ],
    offerings: [
      {
        title: "Product & platform induction",
        body: "New-model rollouts taught directly on live assemblies and cutaway rigs, ensuring technicians know the platform inside out before day one on the shopfloor.",
      },
      {
        title: "Diagnostics & electronics",
        body: "Scan-tool workflows, sensor logic and step-by-step fault-tree reasoning — practised on instrumented benches wired to real ECUs.",
      },
      {
        title: "Train-the-trainer",
        body: "We certify your internal master technicians, giving your in-house teams the tools and structure to keep training long after our team demobilises.",
      },
      {
        title: "Service excellence & floor discipline",
        body: "Bay organisation, clean customer handovers and accurate documentation standards — benchmarked directly against your internal audit scores.",
      },
    ],
    formats: ["On-site at your plant or dealership", "Mobile training unit at your gate", "Blended: short digital theory + practical floor blocks"],
    outcomes: [
      { stat: "12,400+", label: "Technicians certified" },
      { stat: "31%", label: "Drop in repeat repairs" },
      { stat: "4.2 days", label: "Average programme length" },
    ],
    gallery: ["engine-cohort", "diagnostics-console", "engine-stand-training", "component-demo", "cohort-classroom", "engine-teardown"],
    deliverLines: ["Practical modules built", "for your service floor."],
    fieldLines: ["Real technicians.", "Real workshop bays."],
    deliverSub: "Every module is 70% hands-on practice, designed to get technicians confident on live equipment before they touch a customer vehicle.",
    fieldSub: "Photographed on live YandNow corporate cohorts between 2020 and 2026.",
  },
  {
    slug: "csr",
    index: "02",
    title: "CSR Programmes",
    short: "CSR",
    summary:
      "Deploying CSR funds directly where training happens, with full tracking and bulletproof data.",
    lede:
      "CSR succeeds when it reaches the last mile. Great intent needs grounded execution. We handle every step — mobilisation, hands-on training, certification, real placement and the transparent data trail your board and auditors require.",
    ctaLabel: "Open CSR programmes",
    hero: "medical-camp",
    accent: "cyan",
    audience: [
      "CSR & sustainability teams",
      "Corporate foundations",
      "PSU community programmes",
      "Implementation partners",
    ],
    offerings: [
      {
        title: "Livelihood skilling",
        body: "Job-linked training selected directly from local labour demand data — focusing on skills that actually lead to work, not just what is easy to run.",
      },
      {
        title: "Community health camps",
        body: "Primary care, vision screenings and health camps delivered alongside skilling, ensuring basic health needs don't disrupt learning and progress.",
      },
      {
        title: "Environment & green skills",
        body: "Plantation drives, clean-cooking transitions and practical waste-handling programmes measured against clear environmental baselines.",
      },
      {
        title: "Impact measurement",
        body: "Geo-tagged attendance, third-party certification and 90 to 180-day post-training tracking built into every project as standard practice.",
      },
    ],
    formats: ["District-level cohorts", "Camp-based delivery", "Multi-year programme management"],
    outcomes: [
      { stat: "₹41 Cr", label: "CSR funds deployed" },
      { stat: "18,600+", label: "Beneficiaries reached" },
      { stat: "100%", label: "Programmes audit-cleared" },
    ],
    gallery: ["medical-camp", "vision-screening", "tree-plantation", "medical-camp-community", "volunteer-cohort", "plantation-hands"],
    deliverLines: ["Grounded initiatives built", "for lasting community impact."],
    fieldLines: ["Real communities.", "Real progress."],
    deliverSub: "Programmes designed around real district needs, combining practical skills with clear, audit-ready data.",
    fieldSub: "Photographed on live YandNow CSR cohorts between 2020 and 2026.",
  },
  {
    slug: "industry",
    index: "03",
    title: "Industry Solutions",
    short: "Industry",
    summary:
      "Hands-on skill building across welding, machining and site safety. Getting workforce operators shopfloor-ready from day one.",
    lede:
      "A weld either holds or it doesn't. Industrial trades are tested on site, not in theory. We teach on production-grade machinery built to the exact same tolerances as the plants our trainees join — so every worker hits the shopfloor fully ready.",
    ctaLabel: "Open industry solutions",
    hero: "welding-sparks",
    accent: "indigo",
    audience: [
      "Manufacturing & fabrication plants",
      "Infrastructure & construction firms",
      "EPC contractors",
      "Hydrocarbon & energy operators",
    ],
    offerings: [
      {
        title: "Welding & fabrication",
        body: "SMAW, MIG and TIG techniques combined with weld-inspection theory — graded directly on visual and bend testing rather than simple attendance.",
      },
      {
        title: "CNC & machining",
        body: "Turning, milling and CNC programming on production-spec equipment — covering offsets, setup, tooling and first-article inspection.",
      },
      {
        title: "Electrical & instrumentation",
        body: "Panel wiring, motor control, Lockout/Tagout (LOTO) discipline and instrument calibration built for plant maintenance roles.",
      },
      {
        title: "Safety & compliance",
        body: "Work-at-height, confined space protocols, PPE regimes and daily toolbox talks — mapped directly to your internal HSE framework.",
      },
    ],
    formats: ["Centre-based long-term courses", "In-plant short modules", "Assessment & certification only"],
    outcomes: [
      { stat: "9,800+", label: "Trade certifications" },
      { stat: "94%", label: "First-attempt weld pass rate" },
      { stat: "0", label: "Lost-time injuries on programme" },
    ],
    gallery: ["welding-sparks", "cnc-operation", "welding-bay", "electrical-bench", "milling-practical", "sheet-metal-bench"],
    deliverLines: ["Practical trades taught to", "exact shopfloor standards."],
    fieldLines: ["Real trade floors.", "Real precision."],
    deliverSub: "Heavy skills focused on real-world testing, precise machinery setup and uncompromising site safety.",
    fieldSub: "Photographed on live YandNow industry cohorts between 2020 and 2026.",
  },
  {
    slug: "defence",
    index: "04",
    title: "Defence Programmes",
    short: "Defence",
    summary:
      "Helping serving personnel and veterans transition smoothly into real-world industry jobs.",
    lede:
      "Service personnel already have the discipline. We add the civilian credential. Service members bring maintenance instincts, teamwork and strong checklist discipline under pressure. We help translate those years of hands-on experience into recognised credentials, bringing the training directly to the unit when needed.",
    ctaLabel: "Open defence programmes",
    hero: "defence-engine-class",
    accent: "cyan",
    audience: [
      "Army, Navy & Air Force units",
      "Central Armed Police Forces",
      "Resettlement & DGR cells",
      "Veteran associations",
    ],
    offerings: [
      {
        title: "Vehicle & equipment maintenance",
        body: "Heavy-vehicle, generator and auxiliary-system maintenance practised on live engines using our mobile training setups.",
      },
      {
        title: "Resettlement certification",
        body: "Recognition-of-Prior-Learning (RPL) assessments that convert years of service experience into portable national trade credentials.",
      },
      {
        title: "On-unit delivery",
        body: "Training brought directly to your station or garrison — eliminating personnel movement and keeping unit routine undisturbed.",
      },
      {
        title: "Second-career placement",
        body: "Direct career pathways into fleet management, logistics and plant maintenance roles that value service discipline.",
      },
    ],
    formats: ["On-unit mobile deployment", "Pre-retirement cohorts", "Veteran open batches"],
    outcomes: [
      { stat: "3,100+", label: "Personnel trained" },
      { stat: "27", label: "Units & stations served" },
      { stat: "78%", label: "Placed within 6 months" },
    ],
    gallery: ["defence-engine-class", "defence-mobile-unit", "defence-assembly", "hcv-engine-bay", "van-engine-instruction", "mobile-classroom"],
    deliverLines: ["Practical pathways from military", "service to industry careers."],
    fieldLines: ["Real service members.", "Real career transitions."],
    deliverSub: "Structured modules designed to recognise existing experience and build industry-ready technical skills right on station.",
    fieldSub: "Photographed on live YandNow defence cohorts between 2020 and 2026.",
  },
  {
    slug: "schools",
    index: "05",
    title: "School Solutions",
    short: "Schools",
    summary:
      "Bridging classroom learning with real-world skills through practical career labs for Classes 9 to 12.",
    lede:
      "Most students pick careers from a list of four jobs they've heard of. We put real tools in their hands early — so career choices are driven by practical experience rather than hearsay.",
    ctaLabel: "Open school solutions",
    hero: "sheet-metal-bench",
    accent: "indigo",
    audience: [
      "CBSE, ICSE & state-board schools",
      "Government school clusters",
      "ITIs & polytechnics",
      "Education departments",
    ],
    offerings: [
      {
        title: "NSQF vocational electives",
        body: "Board-aligned trade subjects delivered with complete practical support — equipment, consumables and instructors fully included.",
      },
      {
        title: "Career discovery labs",
        body: "Rotational workshops where students explore six distinct trades over six weeks before committing to a single pathway.",
      },
      {
        title: "Teacher capacity building",
        body: "Subject teachers trained and certified to guide practical sessions confidently between our team's visits.",
      },
      {
        title: "Industry exposure visits",
        body: "Structured plant and workshop tours paired with pre-reading and debriefs — turning field trips into genuine learning experiences.",
      },
    ],
    formats: ["Annual school partnership", "Cluster programmes", "Lab setup & handover"],
    outcomes: [
      { stat: "240+", label: "Partner schools" },
      { stat: "31,000+", label: "Students in labs" },
      { stat: "68%", label: "Report clearer career intent" },
    ],
    gallery: ["helmet-engine-lab", "safety-briefing", "engine-hands-on", "plumbing-workshop", "engine-briefing", "cnc-instruction"],
    deliverLines: ["Practical career pathways built", "for school classrooms and labs."],
    fieldLines: ["Real students.", "Real tools."],
    deliverSub: "Interactive programmes designed to give students early technical exposure, practical skills and clear industry understanding.",
    fieldSub: "Photographed on live YandNow school cohorts between 2020 and 2026.",
  },
  {
    slug: "micro-entrepreneurship",
    index: "06",
    title: "Micro-Entrepreneurship",
    short: "Micro-Entrepreneurship",
    summary:
      "Empowering local communities and collectives to grow hands-on skills into real, income-generating enterprises.",
    lede:
      "A tailoring certificate is not an income. We take trainees beyond the basic trade into real business skills — unit costing, raw material sourcing, credit access and finding their first ten customers — so the enterprise is still thriving a year later.",
    ctaLabel: "Open micro-entrepreneurship",
    hero: "tailoring-floor",
    accent: "cyan",
    audience: [
      "Self-help groups & federations",
      "Rural livelihood missions",
      "Women's collectives",
      "Nano & micro enterprises",
    ],
    offerings: [
      {
        title: "Trade + enterprise bundle",
        body: "Tailoring, food processing, packaging or repair trades paired directly with practical unit costing, clear pricing and quality control.",
      },
      {
        title: "Credit & scheme readiness",
        body: "Bank linkages, loan documentation and government scheme applications completed directly alongside the trainee — not just explained in a classroom.",
      },
      {
        title: "Market linkage & sales",
        body: "Buyer introductions, group aggregation support and product packaging built to hold up on a retail shelf.",
      },
      {
        title: "Twelve-month handholding",
        body: "Quarterly mentor visits throughout the critical first year — providing support right when most small businesses struggle.",
      },
    ],
    formats: ["Village & cluster cohorts", "SHG federation programmes", "Incubation with mentor visits"],
    outcomes: [
      { stat: "5,400+", label: "Enterprises started" },
      { stat: "71%", label: "Active after 12 months" },
      { stat: "2.3×", label: "Median income change" },
    ],
    gallery: ["tailoring-floor", "packaging-line", "tailoring-hands", "food-processing", "packaging-practical", "farm-implement"],
    deliverLines: ["Practical enterprise building for", "lasting community livelihoods."],
    fieldLines: ["Real local entrepreneurs.", "Real sustainable income."],
    deliverSub: "Structured modules that combine hands-on trade training with real-world business setup, market access and ongoing mentorship.",
    fieldSub: "Photographed on live YandNow micro-entrepreneurship cohorts between 2020 and 2026.",
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

/* ──────────────────────────────────────────────────────────
   How we work — the delivery method
   ────────────────────────────────────────────────────────── */
export const method = [
  {
    step: "01",
    title: "Gap identification",
    body: "We start by watching the work happen — observing the service bay, plant floor or local market to see where trainees get stuck.",
    photo: "engine-briefing" as PhotoKey,
  },
  {
    step: "02",
    title: "Curriculum development",
    body: "Every lesson starts with what a person needs to do on day one. Matched to national standards and your quality checks, with 70% pure hands-on practice.",
    photo: "cnc-instruction" as PhotoKey,
  },
  {
    step: "03",
    title: "Learning right at your door",
    body: "From permanent centres and plant floors to mobile units parked right at your gate. People learn best where the actual work lives.",
    photo: "mobile-training-unit" as PhotoKey,
  },
  {
    step: "04",
    title: "Assessment and placement",
    body: "Independent testing and recognised certificates, followed by real introductions, job placements and 90 days of tracking on the job.",
    photo: "two-wheeler-lab" as PhotoKey,
  },
];

/* ──────────────────────────────────────────────────────────
   Leadership

   PLACEHOLDER CONTENT. The names below are not real and the bios describe the
   remit of each seat rather than anybody's career — inventing history for a
   real person is worse than leaving it blank. Replace `name`, `bio` and
   `linkedin`, then drop a portrait at public/team/<slug>.webp and set `photo`.
   Until `photo` is set the card falls back to a monogram plate, so the section
   is presentable with no imagery at all.
   ────────────────────────────────────────────────────────── */
export type Leader = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  linkedin?: string;
  /** Portrait path, e.g. "/team/asha-menon.webp". Omit for the monogram plate. */
  photo?: string;
};

export const leadership: Leader[] = [
  {
    slug: "founder",
    name: "Founder name",
    role: "Founder & Managing Director",
    bio: "Sets what YandNow will and will not take on. Owns the partner relationships that turn a mandate into a funded programme, and holds the line on our core rules whenever a client requests a shortcut.",
    focus: ["Partnerships", "Programme strategy"],
  },
  {
    slug: "co-founder",
    name: "Co-founder name",
    role: "Co-founder & Director, Delivery",
    bio: "Runs everything between the signed scope and the certificate — training centres, mobile units, the trainer bench and the assessment calendar. Accountable for ensuring the numbers published on our Impact page match what the field actually returned.",
    focus: ["Delivery & operations", "Trainer capability"],
  },
];

/* ──────────────────────────────────────────────────────────
   Programme archive — real delivery history
   ────────────────────────────────────────────────────────── */
export type Programme = {
  year: string;
  title: string;
  partner: string;
  vertical: string;
  place: string;
  trades: string[];
  photos: PhotoKey[];
};

export const programmes: Programme[] = [
  {
    year: "2025–26",
    title: "Heavy commercial vehicle technician upskilling",
    partner: "TotalEnergies",
    vertical: "Corporate",
    place: "Multi-state, mobile units",
    trades: ["HCV maintenance", "Diagnostics"],
    photos: ["hcv-engine-bay", "hcv-hands-on", "mobile-classroom"],
  },
  {
    year: "2025–26",
    title: "Two-wheeler and tractor service network programme",
    partner: "Gulf Oil",
    vertical: "Corporate",
    place: "Gujarat · Karnataka",
    trades: ["2-wheeler", "Tractor", "HCV"],
    photos: ["two-wheeler-lab", "engine-cohort", "tractor-engine"],
  },
  {
    year: "2025–26",
    title: "Clean cooking transition and community skilling",
    partner: "TotalEnergies Foundation",
    vertical: "CSR",
    place: "Karnataka",
    trades: ["Clean cooking", "Community mobilisation"],
    photos: ["volunteer-cohort", "food-processing"],
  },
  {
    year: "2025–26",
    title: "Free vision screening and spectacles distribution",
    partner: "Essilor · OneSight",
    vertical: "CSR",
    place: "Meghalaya · Himachal Pradesh",
    trades: ["Vision screening", "Optometry support"],
    photos: ["vision-screening", "medical-camp-community"],
  },
  {
    year: "2024–25",
    title: "Allied healthcare and pathology technician training",
    partner: "BPCL",
    vertical: "CSR",
    place: "Madhya Pradesh",
    trades: ["Lab technician", "Phlebotomy"],
    photos: ["healthcare-lab", "pathology-training"],
  },
  {
    year: "2024–25",
    title: "Construction site safety and finishing trades",
    partner: "NAREDCO · Everest Industries",
    vertical: "Industry",
    place: "Maharashtra · Odisha",
    trades: ["Site safety", "Dry construction", "Electrical"],
    photos: ["site-safety-cohort", "electrical-safety", "safety-briefing"],
  },
  {
    year: "2024–25",
    title: "Training at your doorstep — mobile HCV programme",
    partner: "TotalEnergies · Ashok Leyland",
    vertical: "Corporate",
    place: "Telangana · Andhra Pradesh",
    trades: ["HCV maintenance"],
    photos: ["mobile-training-unit", "van-engine-instruction", "cohort-classroom"],
  },
  {
    year: "2023–24",
    title: "Defence personnel technical resettlement",
    partner: "TotalEnergies",
    vertical: "Defence",
    place: "Assam · Punjab",
    trades: ["Vehicle maintenance", "RPL certification"],
    photos: ["defence-engine-class", "defence-mobile-unit", "defence-assembly"],
  },
  {
    year: "2023–24",
    title: "Hydrocarbon sector welding and fabrication",
    partner: "Hydrocarbon SSC",
    vertical: "Industry",
    place: "Assam",
    trades: ["Welding", "Fabrication"],
    photos: ["welding-sparks", "welding-shopfloor"],
  },
  {
    year: "2023–24",
    title: "Rural livelihood and enterprise development",
    partner: "NABARD",
    vertical: "Micro-Entrepreneurship",
    place: "Madhya Pradesh",
    trades: ["Tailoring", "Enterprise management"],
    photos: ["tailoring-hands", "tailoring-floor"],
  },
  {
    year: "2022–23",
    title: "Automotive service dealer network training",
    partner: "ASDC · Veedol · IOCL",
    vertical: "Corporate",
    place: "Indore · Pune",
    trades: ["4-wheeler", "2-wheeler", "Lubricants"],
    photos: ["car-lift-training", "scooter-service", "undercarriage-check"],
  },
  {
    year: "2022–23",
    title: "Traditional medicine and food packaging enterprises",
    partner: "Skill Meghalaya",
    vertical: "Micro-Entrepreneurship",
    place: "Meghalaya",
    trades: ["Food processing", "Packaging", "Handicraft"],
    photos: ["packaging-line", "packaging-practical"],
  },
  {
    year: "2021–22",
    title: "CNC, welding and tractor mechanic trades",
    partner: "CRISP · GIZ",
    vertical: "Industry",
    place: "Bhopal",
    trades: ["CNC", "Welding", "Tractor", "2/4-wheeler"],
    photos: ["cnc-operation", "welding-bay", "milling-practical"],
  },
  {
    year: "2020–21",
    title: "Plumbing, RAC and sheet metal foundation courses",
    partner: "CRISP · Reliance Foundation",
    vertical: "Schools",
    place: "Bhopal",
    trades: ["Plumbing", "RAC", "Sheet metal"],
    photos: ["plumbing-workshop", "plumbing-practical", "sheet-metal-bench"],
  },
];

/* Client and partner marks now come from src/lib/brand.ts, generated from the
   artwork in public/y&now client logos by scripts/build-brand.mjs. */


export const testimonials = [
  {
    quote:
      "They did not hand us a curriculum and leave. Their trainers stood in our bays for three weeks until our own masters could run the module themselves.",
    name: "Service Network Head",
    org: "Commercial vehicle OEM",
  },
  {
    quote:
      "The reporting was the surprise. Geo-tagged attendance, third-party assessment, tracer study at 180 days — our auditors had nothing to ask for.",
    name: "CSR Lead",
    org: "Energy major",
  },
  {
    quote:
      "For our personnel approaching retirement, a portable certificate changes the conversation with employers entirely. The mobile unit meant nobody left the station.",
    name: "Resettlement Officer",
    org: "Central Armed Police Force",
  },
];

export const faqs = [
  {
    q: "How quickly can a programme start?",
    a: "A scoped short module can be operational on the ground in three weeks. Multi-district CSR initiatives typically require six to eight weeks for mobilisation, baseline surveys and training centre setup.",
  },
  {
    q: "Do you deliver at our site or yours?",
    a: "Both. We operate fixed centres, deploy mobile training units with live engine rigs, and run in-plant blocks inside partner facilities. The delivery mode is decided entirely by where the work actually happens.",
  },
  {
    q: "Which certifications do trainees receive?",
    a: "Graduates receive NSQF-aligned certification through the relevant Sector Skill Council via independent third-party assessment. Where partners require their own custom credential, we run both systems in parallel.",
  },
  {
    q: "How is impact measured?",
    a: "We track attendance and assessment data during training, verify employment at 90 days, and conduct tracer studies at 180 days. For micro-entrepreneurship initiatives, we track active trading and revenue at 12 months.",
  },
  {
    q: "Can you take over an existing programme mid-cycle?",
    a: "Yes. A substantial portion of our work involves stepping in to rescue stalled programmes — we audit current progress, retain what works and restructure delivery around the remaining cohort.",
  },
];
