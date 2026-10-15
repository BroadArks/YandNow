"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PostCover from "./PostCover";
import { formatBlogDate, type BlogPost } from "@/lib/blog";
import { MaskLines, Reveal } from "@/components/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

function Arrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
    >
      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Byline({ post }: { post: BlogPost }) {
  return (
    <p className="font-mono text-[0.75rem] tracking-[0.12em] text-ink-30 uppercase tabular-nums">
      {formatBlogDate(post.date)} · {post.readMinutes} min read
    </p>
  );
}

/**
 * Blog index: the featured post as a wide lead story, then a filterable grid.
 * Filtering animates layout like the programme archive, so a change reads as
 * a re-sort rather than a page swap.
 */
export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const lead = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== lead);

  const categories = useMemo(
    () => ["All", ...new Set(rest.map((p) => p.category))],
    [rest],
  );
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? rest : rest.filter((p) => p.category === filter);

  if (!lead) {
    return (
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell">
          <p className="lede max-w-[46ch]">
            No articles yet. New writing from the field will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Lead story */}
      <section className="bg-paper-warm pt-20 pb-10 md:pt-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-indigo-brand">Featured</p>
          </Reveal>
          <Reveal delay={0.08} y={24}>
            <Link
              href={`/blog/${lead.slug}`}
              className="group mt-8 grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
            >
              <PostCover
                post={lead}
                className="aspect-[16/10] w-full"
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div>
                <span className="rounded-full border border-line px-3 py-1.5 text-[0.8125rem] font-medium text-indigo-brand">
                  {lead.category}
                </span>
                <h2 className="display-md mt-6 max-w-[20ch] font-semibold transition-colors duration-500 group-hover:text-indigo-brand">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-70">
                  {lead.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Byline post={lead} />
                  <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                    <span className="relative">
                      Read the article
                      <span className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-indigo-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                    </span>
                    <Arrow />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All articles */}
      {rest.length > 0 && (
        <section className="bg-paper-warm pt-14 pb-24 md:pb-32">
          <div className="shell">
            <div className="grid gap-10 border-t border-line pt-14 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Reveal>
                  <p className="eyebrow text-indigo-brand">All articles</p>
                </Reveal>
                <MaskLines
                  as="h2"
                  className="display-lg mt-6 max-w-[18ch] font-semibold"
                  lines={["More from", "the field."]}
                />
              </div>

              {categories.length > 2 && (
                <Reveal delay={0.1}>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                    {categories.map((c) => {
                      const active = filter === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setFilter(c)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300 ${
                            active
                              ? "border-ink bg-ink text-paper-warm"
                              : "border-line bg-paper-warm text-ink-50 hover:border-ink-30 hover:text-ink"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </Reveal>
              )}
            </div>

            <motion.ul layout className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: EASE }}
                  >
                    <Link href={`/blog/${p.slug}`} className="group block">
                      <PostCover
                        post={p}
                        className="aspect-[4/3] w-full"
                        imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                      <p className="mt-6 font-mono text-[0.75rem] tracking-[0.12em] text-indigo-brand uppercase">
                        {p.category}
                      </p>
                      <h3 className="mt-3 font-display text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.028em] transition-colors duration-400 group-hover:text-indigo-brand">
                        {p.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-50">
                        {p.excerpt}
                      </p>
                      <div className="mt-5">
                        <Byline post={p} />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </section>
      )}
    </>
  );
}
