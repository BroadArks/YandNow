import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { photos, type PhotoKey } from "@/lib/photos";

/* Until posts carry their own uploads, covers fall back to field photography
   from /public, picked by category so related posts look related. */
const BY_CATEGORY: Record<string, PhotoKey> = {
  "Learning & Development": "cohort-classroom",
  "CSR & Impact": "medical-camp-community",
  Industry: "welding-shopfloor",
  Defence: "defence-engine-class",
  Schools: "helmet-engine-lab",
  "Micro-Entrepreneurship": "tailoring-floor",
};
const POOL: PhotoKey[] = [
  "engine-briefing",
  "cnc-instruction",
  "mobile-classroom",
  "diagnostics-group",
  "safety-briefing",
  "packaging-practical",
];

function fallbackPhoto(post: BlogPost): PhotoKey {
  const mapped = BY_CATEGORY[post.category];
  if (mapped) return mapped;
  let h = 0;
  for (const c of post.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return POOL[h % POOL.length];
}

/** A post's cover: the CMS upload when there is one, otherwise a site photo. */
export default function PostCover({
  post,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}: {
  post: BlogPost;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const p = photos[fallbackPhoto(post)];

  return (
    <div className={`relative overflow-hidden bg-ink/[0.04] ${className ?? ""}`}>
      {post.coverImage ? (
        // Cover URLs come from the CMS and can point at any host, so this
        // stays a plain <img> rather than a next/image remote pattern.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className={`h-full w-full object-cover ${imgClassName ?? ""}`}
        />
      ) : (
        <Image
          src={p.src}
          alt=""
          width={p.w}
          height={p.h}
          placeholder="blur"
          blurDataURL={p.blur}
          sizes={sizes}
          priority={priority}
          quality={82}
          className={`h-full w-full object-cover ${imgClassName ?? ""}`}
        />
      )}
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
    </div>
  );
}
