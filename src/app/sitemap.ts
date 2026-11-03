import type { MetadataRoute } from "next";
import { solutions } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import { photos } from "@/lib/photos";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  // The blog index changes when a post lands; the static pages carry no
  // lastmod rather than a build timestamp Google would learn to ignore.
  const latestPost = posts.reduce<string | undefined>((a, p) => (!a || p.date > a ? p.date : a), undefined);

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/impact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPost ? new Date(latestPost) : undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const verticals: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${SITE_URL}/solutions/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [s.hero, ...s.gallery].map((k) => `${SITE_URL}${photos[k].src}`),
  }));

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...verticals, ...articles];
}
