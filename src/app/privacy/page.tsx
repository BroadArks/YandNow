import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/blog/Markdown";
import { MaskLines, Reveal } from "@/components/motion-primitives";
import { privacy } from "@/lib/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Y&Now, operated by BroadArks Technology Private Limited, collects, uses, shares and protects personal information.",
};

/* Split the policy at its `## ` headings so each section reveals on its own:
   one Reveal around the whole policy never reaches its in-view threshold,
   because the text is several screens tall. */
const sections = privacy.body
  .trim()
  .split(/^## /m)
  .filter(Boolean)
  .map((chunk) => {
    const [title, ...rest] = chunk.split("\n");
    const id = title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return { id, title: title.trim(), body: rest.join("\n").trim() };
  });

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function PrivacyPage() {
  return (
    <>
      {/* Header: same dark plate as every inner page, text-led */}
      <section className="relative overflow-hidden bg-indigo-ink text-paper-warm">
        <div className="shell pt-[132px] pb-16 md:pt-[168px] md:pb-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
              <Link href="/" className="eyebrow text-white/60 transition-colors hover:text-cyan-brand">
                Home
              </Link>
              <span className="eyebrow text-white/45">/</span>
              <span className="eyebrow text-white/60">Privacy</span>
            </nav>
          </Reveal>

          <MaskLines as="h1" className="display-lg mt-10 max-w-[22ch] font-semibold" lines={["Privacy Policy"]} />

          <Reveal delay={0.15}>
            <p className="lede mt-7 max-w-[56ch] text-white/65">
              How Y&amp;Now, operated by BroadArks Technology Private Limited, handles information
              about visitors, learners, client representatives, trainers and applicants.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-10 border-t border-white/12 pt-7 font-mono text-[0.75rem] tracking-[0.12em] text-white/65 uppercase tabular-nums">
              Effective {privacy.effective} · Version {privacy.version}
            </p>
          </Reveal>
        </div>
      </section>

      <article className="bg-paper-warm pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="shell grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <nav aria-label="Policy sections" className="sticky top-32 pt-1">
              <p className="eyebrow text-ink-30">On this page</p>
              <span className="mt-5 block h-px w-full bg-line" />
              <ol className="mt-5 space-y-2.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex gap-3 text-[0.875rem] leading-snug text-ink-50 transition-colors duration-300 hover:text-indigo-brand"
                    >
                      <span className="w-5 shrink-0 pt-px font-mono text-[0.75rem] text-ink-30 tabular-nums transition-colors duration-300 group-hover:text-indigo-brand">
                        {num(i)}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 max-w-[44rem]">
            {sections.map((s, i) => (
              <Reveal key={s.id} amount={0.08}>
                <section
                  id={s.id}
                  className={`scroll-mt-28 ${i > 0 ? "mt-14 border-t border-line pt-14" : ""}`}
                >
                  <p className="font-mono text-[0.8125rem] tracking-[0.12em] text-indigo-brand tabular-nums">
                    {num(i)}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,1.95rem)] leading-[1.15] font-semibold tracking-[-0.032em] text-ink">
                    {s.title}
                  </h2>
                  <div className="mt-6">
                    <Markdown>{s.body}</Markdown>
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
