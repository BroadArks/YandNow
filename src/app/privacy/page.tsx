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
            <p className="mt-10 border-t border-white/12 pt-7 font-mono text-[0.75rem] tracking-[0.12em] text-white/65 uppercase tabular-nums">
              Effective {privacy.effective} · Version {privacy.version}
            </p>
          </Reveal>
        </div>
      </section>

      <article className="bg-paper-warm pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="shell">
          <Reveal>
            <div className="max-w-[44rem]">
              <Markdown>{privacy.body}</Markdown>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
