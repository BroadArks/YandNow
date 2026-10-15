import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Article body renderer. Raw HTML in the Markdown is never executed
 * (react-markdown's default), so CMS content can't inject scripts. Every
 * element is mapped onto the site's own type scale instead of a prose plugin.
 */
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-16 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.15] font-semibold tracking-[-0.032em] text-ink first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-12 font-display text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.028em] text-ink">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-[1.125rem] leading-[1.75] text-ink-70 first:mt-0">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-indigo-brand underline decoration-indigo-brand/30 underline-offset-4 transition-colors hover:decoration-indigo-brand"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="mt-6 space-y-3">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 marker:font-mono marker:text-[0.875rem] marker:text-indigo-brand">
      {children}
    </ol>
  ),
  // Bulleted items get a short cyan rule; numbered ones keep their marker.
  li: ({ children }) => (
    <li className="relative pl-7 text-[1.0625rem] leading-[1.7] text-ink-70 [ol_&]:pl-1">
      <span
        aria-hidden
        className="absolute top-[0.8em] left-0 h-[2px] w-4 bg-cyan-brand [ol_&]:hidden"
      />
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-12 border-l-[3px] border-cyan-brand pl-7 font-display text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.35] font-medium tracking-[-0.025em] text-ink [&_p]:text-inherit [&_p]:leading-inherit [&_p]:text-[length:inherit]">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  hr: () => <hr className="my-14 border-line" />,
  code: ({ children }) => (
    <code className="rounded bg-ink/[0.05] px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
      {children}
    </code>
  ),
  img: ({ src, alt }) => (
    // CMS images can live on any host, so this is a plain <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="my-10 w-full" />
  ),
  table: ({ children }) => (
    <div className="my-10 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[0.9375rem]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-ink/20 py-3 pr-6 font-mono text-[0.75rem] tracking-[0.12em] text-ink-50 uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-line py-3 pr-6 text-ink-70">{children}</td>,
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
