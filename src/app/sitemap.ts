import type { MetadataRoute } from "next";
import { solutions } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://yandnow.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages = ["", "/solutions", "/impact", "/about", "/contact", "/blog", "/privacy"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const verticals = solutions.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = (await getAllPosts()).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...verticals, ...posts];
}
