"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import indiaMap from "@svg-maps/india";
import {
  MaskLines,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const REGIONS = [
  { name: "Madhya Pradesh", note: "Bhopal hub · 6 centres" },
  { name: "Maharashtra", note: "Pune · Nashik" },
  { name: "Assam", note: "Dibrugarh · Guwahati" },
  { name: "Karnataka", note: "Bhadravathi cluster" },
  { name: "Gujarat", note: "Ahmedabad · Rajkot" },
  { name: "Meghalaya", note: "Shillong cluster" },
  { name: "Telangana", note: "Mobile units" },
  { name: "Odisha", note: "Remuna · Balasore" },
  { name: "Punjab", note: "On-unit defence" },
  { name: "Himachal Pradesh", note: "Camp delivery" },
  { name: "Andhra Pradesh", note: "Transport academy" },
];

type MapData = {
  viewBox: string;
  locations: { id: string; name: string; path: string }[];
};

// The package's own typings point at an unpublished module, so the shape we
// rely on is stated here.
const MAP = indiaMap as unknown as MapData;
const ORDER = new Map(REGIONS.map((r, i) => [r.name, i]));

const FILL_IDLE = "rgba(255,255,255,0.05)";
const FILL_ACTIVE = "rgba(39,170,225,0.5)";
const FILL_HOVER = "rgba(111,200,236,0.95)";

/**
 * Reach on the official outline of India, with the states we deliver in lit
 * up one by one as the map scrolls in. The register and the map are linked:
 * hovering either highlights the same state in both.
 */
export default function Reach() {
  const reduce = useReducedMotion();
  const mapRef = useRef<SVGSVGElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.35 });
  const [hover, setHover] = useState<string | null>(null);
  const hovered = REGIONS.find((r) => r.name === hover);
  const lit = inView || !!reduce;

  const bind = (name: string) => ({
    onMouseEnter: () => setHover(name),
    onMouseLeave: () => setHover(null),
  });

  return (
    <section className="relative overflow-hidden bg-ink text-paper-warm">
      <div className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-cyan-brand">Footprint</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-lg mt-6 max-w-[18ch] font-semibold"
            lines={["We go where", "the cohort is."]}
          />
          <Reveal delay={0.12}>
            <p className="lede mt-7 max-w-[46ch] text-white/60">
              Nineteen states, fixed centres and mobile training units. If a district
              has the demand but no infrastructure, the unit is driven in and the
              classroom arrives with it.
            </p>
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-10 sm:grid-cols-3"
            stagger={0.045}
          >
            {REGIONS.map((r) => {
              const on = hover === r.name;
              return (
                <RevealItem key={r.name} y={16}>
                  <button
                    type="button"
                    {...bind(r.name)}
                    onFocus={() => setHover(r.name)}
                    onBlur={() => setHover(null)}
                    className="block w-full text-left"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                          on ? "bg-cyan-brand" : "bg-white/25"
                        }`}
                      />
                      <span
                        className={`text-[0.9375rem] font-medium transition-colors duration-300 ${
                          on ? "text-cyan-brand" : ""
                        }`}
                      >
                        {r.name}
                      </span>
                    </span>
                    <span className="mt-0.5 block pl-3.5 font-mono text-[0.75rem] tracking-[0.1em] text-white/35 uppercase">
                      {r.note}
                    </span>
                  </button>
                </RevealItem>
              );
            })}
            <RevealItem y={16}>
              <p className="pl-3.5 text-[0.9375rem] font-medium">+ 8 more states</p>
              <p className="mt-0.5 pl-3.5 font-mono text-[0.75rem] tracking-[0.1em] text-white/35 uppercase">
                Programme-linked
              </p>
            </RevealItem>
          </RevealGroup>
        </div>

        <div>
          <Reveal y={30}>
            <div className="relative mx-auto max-w-[34rem]">
              {/* Still light behind the subcontinent, same language as the
                  image aura. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[12%] rounded-full bg-cyan-brand/10 blur-3xl"
              />
              <svg
                ref={mapRef}
                viewBox={MAP.viewBox}
                className="relative h-auto w-full"
                role="img"
                aria-label={`Map of India highlighting ${REGIONS.map((r) => r.name).join(", ")}`}
              >
                {MAP.locations.map((loc) => {
                  const i = ORDER.get(loc.name);
                  const active = i !== undefined;
                  const on = hover === loc.name;
                  return (
                    <motion.path
                      key={loc.id}
                      d={loc.path}
                      {...(active ? bind(loc.name) : {})}
                      initial={{ fill: FILL_IDLE }}
                      animate={{
                        fill: !active || !lit ? FILL_IDLE : on ? FILL_HOVER : FILL_ACTIVE,
                      }}
                      transition={{
                        duration: 0.6,
                        // Stagger only the first reveal; hover must be instant.
                        delay: reduce || hover !== null || !active ? 0 : 0.25 + (i ?? 0) * 0.09,
                        ease: EASE,
                      }}
                      stroke={active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.14)"}
                      strokeWidth={0.6}
                      strokeLinejoin="round"
                      className={active ? "cursor-pointer" : undefined}
                    >
                      <title>{loc.name}</title>
                    </motion.path>
                  );
                })}
              </svg>

              {/* Read-out for the hovered state */}
              <div className="pointer-events-none absolute top-0 right-0 text-right">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={hovered?.name ?? "idle"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <p className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
                      {hovered ? hovered.name : `${REGIONS.length} states shown`}
                    </p>
                    <p className="mt-1 font-mono text-[0.75rem] tracking-[0.1em] text-white/45 uppercase">
                      {hovered ? hovered.note : "Hover to explore"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 border border-white/12 p-6">
              <p className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.04em]">
                12
              </p>
              <p className="mt-3 text-[0.9375rem] font-medium">Mobile training units</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                Each fitted with a live engine rig, diagnostic bench and seating for
                sixteen. Commissioned, maintained and staffed by us.
              </p>
            </div>
          </Reveal>

          {/* The outline is CC BY 4.0, which asks for visible credit. */}
          <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.08em] text-white/25">
            Map outline: svg-maps, CC BY 4.0
          </p>
        </div>
      </div>
    </section>
  );
}
