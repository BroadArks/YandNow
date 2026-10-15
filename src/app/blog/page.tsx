import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPosts } from "@/lib/blog";

// Posts are managed in the yandnow-backend admin panel; re-read Supabase at
// most once a minute so a publish shows up without a redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from YandNow's training floors: workforce learning, CSR skilling, industry trades and what actually changes outcomes.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights · Blog"
        lines={["Notes from", "the floor."]}
        lede="What we learn running hands-on programmes across six verticals: how skills get built, measured and kept, written by the people who deliver them."
        photo="engine-briefing"
        photoAlt="A trainer briefing a cohort around a live engine"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        meta={[
          { label: "Articles", value: String(posts.length) },
          { label: "Topics", value: String(new Set(posts.map((p) => p.category)).size) },
        ]}
      />
      <BlogIndex posts={posts} />
    </>
  );
}
