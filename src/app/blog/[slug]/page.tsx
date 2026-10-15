import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/blog/Markdown";
import PostCover from "@/components/blog/PostCover";
import { MaskLines, Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";
import { formatBlogDate, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.seo.metaTitle ?? post.title;
  const description = post.seo.metaDescription ?? post.excerpt;
  const image = post.seo.ogImage ?? post.coverImage;
  return {
    // The CMS usually supplies a full "… | Y&Now" title; use it verbatim.
    title: post.seo.metaTitle ? { absolute: title } : title,
    description,
    keywords: post.seo.keywords,
    alternates: post.seo.canonicalUrl ? { canonical: post.seo.canonicalUrl } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.date,
      authors: [post.author.name],
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(slug, 3);

  return (
    <>
      {/* Header: same dark plate as every inner page, text-led */}
      <section className="relative overflow-hidden bg-indigo-ink text-paper-warm">
        <div className="shell pt-[132px] pb-40 md:pt-[168px] md:pb-56">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
              ].map((b) => (
                <span key={b.href} className="flex items-center gap-2">
                  <Link href={b.href} className="eyebrow text-white/40 transition-colors hover:text-cyan-brand">
                    {b.label}
                  </Link>
                  <span className="eyebrow text-white/25">/</span>
                </span>
              ))}
              <span className="eyebrow text-white/60">{post.category}</span>
            </nav>
          </Reveal>

          <MaskLines
            as="h1"
            className="display-lg mt-10 max-w-[22ch] font-semibold"
            lines={[post.title]}
          />
          <Reveal delay={0.15}>
            <p className="lede mt-7 max-w-[56ch] text-white/65">{post.excerpt}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/12 pt-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-brand/15 font-display text-[0.9375rem] font-semibold text-cyan-brand">
                  {post.author.name
                    .split(/\s+/)
                    .map((w) => w[0])
                    .filter((c) => /[A-Za-z]/.test(c))
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="text-[0.9375rem] font-medium">{post.author.name}</p>
                  <p className="text-sm text-white/50">{post.author.role}</p>
                </div>
              </div>
              <p className="font-mono text-[0.75rem] tracking-[0.12em] text-white/50 uppercase tabular-nums">
                {formatBlogDate(post.date)} · {post.readMinutes} min read
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cover lifts out of the header plate */}
      <div className="shell relative z-10 -mt-28 md:-mt-40">
        <Reveal y={30}>
          <PostCover post={post} className="aspect-[16/8] w-full" />
        </Reveal>
      </div>

      {/* Body */}
      <article className="bg-paper-warm pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="shell grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="eyebrow text-ink-30">Filed under</p>
              <span className="mt-5 block h-px w-full bg-line" />
              <p className="mt-5 font-display text-[1.0625rem] font-medium text-indigo-brand">
                {post.category}
              </p>
              <Link
                href="/blog"
                className="group mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1">
                  <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All articles
              </Link>
            </div>
          </aside>

          <Reveal>
            <div className="max-w-[44rem]">
              <Markdown>{post.content}</Markdown>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <p className="eyebrow text-indigo-brand">Keep reading</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[20ch] font-semibold"
              lines={["More from", "the field."]}
            />
            <RevealGroup className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3" stagger={0.08}>
              {related.map((p) => (
                <RevealItem key={p.slug} y={20}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <PostCover
                      post={p}
                      className="aspect-[4/3] w-full"
                      imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <p className="mt-6 font-mono text-[0.75rem] tracking-[0.12em] text-indigo-brand uppercase">
                      {p.category}
                    </p>
                    <h3 className="mt-3 font-display text-[1.3125rem] leading-[1.2] font-semibold tracking-[-0.028em] transition-colors duration-400 group-hover:text-indigo-brand">
                      {p.title}
                    </h3>
                    <p className="mt-4 font-mono text-[0.75rem] tracking-[0.12em] text-ink-30 uppercase tabular-nums">
                      {formatBlogDate(p.date)} · {p.readMinutes} min read
                    </p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
