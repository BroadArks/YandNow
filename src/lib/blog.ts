/* ============================================================
   BLOG DATA LAYER

   Source of truth is the Supabase `posts` table, managed from the
   separate `yandnow-backend` admin panel. Content is authored as
   Markdown and rendered with <Markdown> on the reader pages.

   If Supabase isn't configured (no env vars) the layer falls back
   to the bundled seed posts below, so the site always builds and
   renders something sensible. The seed content mirrors the columns
   of the Supabase table 1:1.
   ============================================================ */

import { supabase } from "@/lib/supabase";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-07-28". */
  date: string;
  readMinutes: number;
  author: { name: string; role: string };
  /** "r,g,b" brand tint used for the gradient cover. */
  tint: string;
  /** Optional cover image URL - takes precedence over the tint gradient. */
  coverImage?: string;
  featured?: boolean;
  /** Article body as Markdown. */
  content: string;
  /** SEO / social metadata. */
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    keywords?: string;
  };
}

/* ----------------------------------------------------------------
   Supabase row → BlogPost mapper
   ---------------------------------------------------------------- */
interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  content: string | null;
  cover_tint: string | null;
  cover_image: string | null;
  author_name: string | null;
  author_role: string | null;
  read_minutes: number | null;
  featured: boolean | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string | null;
  published_at: string | null;
  created_at: string | null;
}

function mapRow(row: PostRow): BlogPost {
  const published = row.published_at ?? row.created_at ?? new Date().toISOString();
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "General",
    date: published.slice(0, 10),
    readMinutes: row.read_minutes ?? estimateReadMinutes(row.content ?? ""),
    author: {
      name: row.author_name ?? "Y&Now Editorial",
      role: row.author_role ?? "Editorial",
    },
    tint: row.cover_tint ?? "46,49,146",
    coverImage: row.cover_image ?? undefined,
    featured: row.featured ?? false,
    content: row.content ?? "",
    seo: {
      metaTitle: row.meta_title ?? undefined,
      metaDescription: row.meta_description ?? undefined,
      ogImage: row.og_image ?? undefined,
      canonicalUrl: row.canonical_url ?? undefined,
      keywords: row.keywords ?? undefined,
    },
  };
}

const POST_COLUMNS =
  "slug,title,excerpt,category,content,cover_tint,cover_image,author_name,author_role,read_minutes,featured,meta_title,meta_description,og_image,canonical_url,keywords,published_at,created_at";

/* ----------------------------------------------------------------
   Public API - all async so the source can be a DB or the seed.
   ---------------------------------------------------------------- */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("posts")
      .select(POST_COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (!error && data) return (data as PostRow[]).map(mapRow);
  }
  return [...SEED_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (supabase) {
    const { data, error } = await supabase
      .from("posts")
      .select(POST_COLUMNS)
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return mapRow(data as PostRow);
    if (!error) return undefined;
  }
  return SEED_POSTS.find((p) => p.slug === slug);
}

/** Related posts - same category first, then most recent, excluding `slug`. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** "2026-07-28" → "28 July 2026". */
export function formatBlogDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Rough reading-time estimate from Markdown length (200 wpm). */
export function estimateReadMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ================================================================
   SEED CONTENT - fallback + reference shape for the Supabase seed.
   Keep in sync with supabase/seed.sql in yandnow-backend.
   ================================================================ */
export const SEED_POSTS: BlogPost[] = [
  {
    slug: "how-role-based-assessment-improves-workforce-learning",
    title: "How Role-Based Assessment Improves Workforce Learning",
    excerpt:
      "Training everyone on the same thing is the fastest way to waste everyone's time. Starting from the role tells you what to teach, and to whom.",
    category: "Learning & Development",
    date: "2026-07-28",
    readMinutes: 5,
    author: { name: "Y&Now Editorial", role: "Learning Practice" },
    tint: "46,49,146",
    featured: true,
    content: `Most workforce training starts with a course and hopes it lands. Role-based assessment starts somewhere more useful: with what a specific job actually asks of the person doing it.

## Start with the role, not the catalogue

A role has requirements you can write down. The tasks people carry out, the standards they work to, the decisions they make on their own. Assess against those requirements and you get a clear picture of where the gaps are, rather than an assumption about where they might be.

- Describe what the role has to do, in plain terms.
- Assess current skill against that description.
- Train against the gaps the assessment finds.
- Re-check after the learning, not just at the end of the course.

## Why it changes the programme

When the starting point is a real gap, the learning gets shorter and more relevant. People stop sitting through material they already know, and the time saved goes into the parts they genuinely need. Managers also get something they can act on: a view of readiness by role, not a list of who attended.

> Assessment is not a test at the end. It is the thing that tells you what the programme should contain.`,
    seo: {
      metaTitle: "How Role-Based Assessment Improves Workforce Learning | Y&Now",
      metaDescription:
        "Starting from the role tells you what to teach and to whom. A practical look at role-based assessment in workforce learning.",
      keywords: "role-based assessment, skill gap mapping, workforce learning, competency",
    },
  },
  {
    slug: "what-makes-csr-skilling-programmes-effective",
    title: "What Makes CSR Skilling Programmes Effective",
    excerpt:
      "Community programmes need more than attendance records. They need relevance, participation, follow-through, and a clear view of what changed.",
    category: "CSR & Impact",
    date: "2026-07-15",
    readMinutes: 6,
    author: { name: "Y&Now Editorial", role: "CSR Practice" },
    tint: "39,170,226",
    content: `A skilling programme can run cleanly, fill every seat, and still change very little. The difference usually shows up long before delivery starts.

## Define the community, the need, and the outcome

A strong programme begins with three things written down: which community it is for, what that community actually needs, and what is supposed to be different at the end. Skip any of the three and the programme drifts towards whatever is easiest to deliver.

## Build the record as you go

- Participation records and beneficiary information.
- Attendance across the programme, not just at the start.
- Assessment results against what the programme set out to build.
- Progress updates and photographic evidence.

Assembled from the first week, this becomes the report almost by itself. Reconstructed at the end, it is guesswork.

## Follow through after the sessions end

Relevance and participation get people through the programme. Follow-through is what turns it into something durable, whether that is a livelihood, a first job, or the confidence to take the next step.

> Attendance tells you people came. It does not tell you anything changed.`,
    seo: {
      metaTitle: "What Makes CSR Skilling Programmes Effective | Y&Now",
      metaDescription:
        "Relevance, participation, follow-through, and a clear view of what changed: what separates effective CSR skilling programmes from busy ones.",
      keywords: "CSR skilling, community programmes, livelihood training, impact reporting",
    },
  },
  {
    slug: "how-to-design-learning-for-plant-operations",
    title: "How to Design Learning for Plant Operations",
    excerpt:
      "On a plant floor, the gap between knowing and doing is the whole problem. Design the learning around the work and the gap closes.",
    category: "Industry",
    date: "2026-06-30",
    readMinutes: 5,
    author: { name: "Y&Now Editorial", role: "Industry Practice" },
    tint: "31,34,103",
    content: `Plant environments are unforgiving of learning that stays theoretical. The equipment, the shift pattern, the noise, and the safety rules all shape what someone can actually apply, and training that ignores them tends to evaporate on contact with the job.

## Study the work before designing the course

Look at the role, the workflow, the tools, and the conditions people face. What does a shift actually look like? Where do mistakes happen, and what causes them? The answers usually reshape the programme more than any content decision.

- Build around what people need to do, not only what they need to know.
- Use the equipment and terminology they will meet on the floor.
- Fit the sessions to the shift, rather than the other way round.
- Assess against the standard the role is held to.

## Keep learning close to the line

Practical application matters most where the consequences are real. Workplace tasks, supervisor check-ins, and sign-off against role requirements do more for retention than any amount of classroom time, and they leave a record of who is competent at what.

> If the training does not survive contact with the shift, it was designed for the wrong place.`,
    seo: {
      metaTitle: "How to Design Learning for Plant Operations | Y&Now",
      metaDescription:
        "Design workforce learning around the role, workflow, tools, and conditions people face on the plant floor.",
      keywords: "plant operations training, industrial learning, technical skills, workforce readiness",
    },
  },
];
