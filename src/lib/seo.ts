import type { Metadata } from "next";
import { site } from "./site";

/* ──────────────────────────────────────────────────────────
   Search & social metadata

   One origin for every absolute URL the site emits. The apex domain
   308-redirects to www on Vercel, so www is the canonical host: pointing
   canonicals, the sitemap or og:url at the apex would send crawlers
   through a redirect on every URL.
   ────────────────────────────────────────────────────────── */
export const SITE_URL = "https://www.yandnow.com";

/** The registered brand is "Y&Now"; "YandNow" is how people type it into a
 *  search box and what the domain spells, so both are declared to Google. */
export const BRAND = "Y&Now";
export const BRAND_ALIASES = ["YandNow", "Y and Now", "Y&Now Skill Development"];

/** Homepage title: the brand, the spelling people search for, and what we do. */
export const HOME_TITLE = `${BRAND} (YandNow) | Skill Development & Workforce Training`;

/** 157 characters, inside the ~160 Google shows before truncating. */
export const HOME_DESCRIPTION =
  "Y&Now (YandNow) builds workforce capability with hands-on skill training across India: corporate, CSR, industry, defence, schools and micro-entrepreneurship.";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * Per-page metadata with canonical, Open Graph and X card filled in.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's whole `openGraph` object, and one that doesn't inherits the
 * homepage's title and image. Every page goes through here so each preview
 * carries its own title, URL and card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Path under /public, e.g. "/og/impact.jpg". */
  image: string;
  imageAlt?: string;
  /** Skip the "| Y&Now" template, for titles that already carry the brand. */
  absoluteTitle?: boolean;
}): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${BRAND}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt ?? shareTitle }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: "en_IN",
      url: path,
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  };
}

/** Search titles and descriptions for the six verticals. The on-page title
 *  ("CSR Programmes") is too thin to rank on its own, so the metadata says
 *  what the vertical delivers, using the vertical's own copy. */
export const solutionSeo: Record<string, { title: string; description: string }> = {
  "corporate": {
    title: "Corporate Technical Training for Service Networks",
    description:
      "Hands-on corporate technical training for OEM service networks, dealer technicians and frontline crews: product induction, diagnostics and train-the-trainer.",
  },
  "csr": {
    title: "CSR Skilling Programmes with Audit-Ready Impact Data",
    description:
      "End-to-end CSR programmes: livelihood skilling, community health camps and green skills, with geo-tagged attendance and impact data your auditors can trust.",
  },
  "industry": {
    title: "Industrial Skills Training: Welding, CNC & Safety",
    description:
      "Industrial skills training in welding, CNC machining, electrical work and site safety on production-grade equipment, so workers are shopfloor-ready on day one.",
  },
  "defence": {
    title: "Defence Resettlement & Veteran Skilling Programmes",
    description:
      "Resettlement training for serving personnel and veterans: RPL certification, vehicle maintenance and on-unit delivery that leads to second careers in industry.",
  },
  "schools": {
    title: "Vocational Training & Career Labs for Schools",
    description:
      "Practical career labs for Classes 9 to 12: NSQF vocational electives, career discovery workshops and teacher training for CBSE, ICSE and state-board schools.",
  },
  "micro-entrepreneurship": {
    title: "Micro-Entrepreneurship & Livelihood Training",
    description:
      "Trade training that becomes income: unit costing, credit and scheme access, market linkages and twelve months of mentoring for SHGs and women's collectives.",
  },
};

/* ──────────────────────────────────────────────────────────
   Structured data (schema.org JSON-LD)
   ────────────────────────────────────────────────────────── */
const ORG_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: BRAND,
  alternateName: BRAND_ALIASES,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/icon-512.png"),
    width: 512,
    height: 512,
  },
  image: absoluteUrl("/og/home.jpg"),
  description: HOME_DESCRIPTION,
  foundingDate: "2020",
  email: site.email,
  telephone: site.phones.map((p) => `+91 ${p.replace(/^0/, "")}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.slice(0, 3).join(", "),
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    postalCode: "462042",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  // The social links in the footer are the parent company's accounts, so they
  // belong on BroadArks, not in a `sameAs` that would merge the two entities.
  parentOrganization: {
    "@type": "Organization",
    name: "BroadArks Technology Private Limited",
    url: "https://broadarks.com",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BRAND,
  alternateName: BRAND_ALIASES,
  url: `${SITE_URL}/`,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

export const breadcrumbJsonLd = (trail: { label: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.label,
    item: absoluteUrl(b.href),
  })),
});

export const orgRef = { "@id": ORG_ID };
