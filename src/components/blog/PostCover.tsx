import type { BlogPost } from "@/lib/blog";

/**
 * A post's cover: the uploaded image when there is one, otherwise a gradient
 * built from the post's "r,g,b" tint so every card still has a plate. Wears
 * the same drifting aura as Frame, so blog imagery reads like the rest of the
 * site.
 */
export default function PostCover({
  post,
  className,
  imgClassName,
}: {
  post: BlogPost;
  className?: string;
  imgClassName?: string;
}) {
  const tint = post.tint || "46,49,146";

  return (
    <div className={`relative isolate ${className ?? ""}`}>
      <span aria-hidden className="frame-aura" />
      <div className="relative h-full w-full overflow-hidden bg-ink/[0.04]">
        {post.coverImage ? (
          // Cover URLs come from the CMS and can point at any host, so this
          // stays a plain <img> rather than a next/image remote pattern.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            className={`h-full w-full object-cover ${imgClassName ?? ""}`}
          />
        ) : (
          <div
            aria-hidden
            className={`h-full w-full ${imgClassName ?? ""}`}
            style={{
              background: `radial-gradient(120% 90% at 18% 12%, rgba(${tint},0.95), rgba(${tint},0.55) 45%, #16173d 100%)`,
            }}
          >
            <span className="grain-layer absolute inset-0 opacity-[0.18] mix-blend-overlay" />
            <span className="absolute bottom-5 left-5 font-mono text-[0.75rem] tracking-[0.14em] text-white/70 uppercase">
              {post.category}
            </span>
          </div>
        )}
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
      </div>
    </div>
  );
}
