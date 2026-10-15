import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import Method from "@/components/sections/Method";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import Faq from "@/components/Faq";
import Leadership from "@/components/sections/Leadership";
import { faqs, leadership, metrics } from "@/lib/site";
import {
  Counter,
  MaskLines,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
  ScaleInFrame,
} from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "YandNow is a skill development organisation delivering hands-on technical training across India — six verticals, nineteen states, fixed and mobile centres.",
};

const PRINCIPLES = [
  {
    title: "Hands-on time comes first (70% minimum)",
    body: "Reading about a machine isn't the same as running one. If a lesson can't be practised with real tools, it has no place in our classrooms.",
  },
  {
    title: "We never grade our own learners",
    body: "Self-marking is a conflict of interest. Independent, third-party examiners conduct every evaluation so our certificates carry genuine weight on the shopfloor.",
  },
  {
    title: "We bring the lab to the learner",
    body: "Long commutes kill attendance faster than tough lessons. We pack up equipment and deploy directly inside plant bays, community centres and mobile units.",
  },
  {
    title: "Proof means a paycheck, not a piece of paper",
    body: "We track whether graduates are working at 90 days and whether small businesses are trading at 12 months. When numbers fall short, we show them anyway.",
  },
];

const EXECUTION = [
  {
    title: "Built around industry standards",
    body: "We don't invent generic courses. We take your manuals, your audit standards and your machinery tolerances, then turn them into training modules.",
  },
  {
    title: "Accountable to the end",
    body: "From verifying employment at 90 days to checking micro-enterprises at 12 months, we stick around to ensure the learning actually takes root.",
  },
];

// The About band words each headline figure for the story of the network,
// rather than reusing the homepage's shorter notes.
const METRIC_NOTES = [
  "Practical trade skills across all 6 verticals",
  "Permanent facilities, mobile units and on-site setups",
  "Confirmed 90 days after certification",
  "Grassroots and industrial footprints across India",
];

const TRAINER_STATS = [
  ["180+", "Certified trainers on roll", "Full-time technical instructors deployed across India"],
  ["5 Yrs", "Minimum floor experience", "Real-world site background required for every hire"],
  ["Annual", "Re-assessment on craft", "Regular testing on both technical precision and instructional skill"],
  ["1:12", "Trainer-to-trainee ratio", "Small cohort sizing for continuous hands-on guidance"],
] as const;

const TRAINER_HIGHLIGHTS = [
  {
    title: "Practitioners, not lecturers",
    body: "Every trainer has spent years troubleshooting real machinery, managing live repair bays or operating plant floors.",
  },
  {
    title: "Strict re-certification",
    body: "Annual independent audits ensure trainers stay up to date with current OEM standards, new diagnostic tools and evolving safety protocols.",
  },
  {
    title: "Dedicated attention",
    body: "Low trainer-to-trainee ratios ensure every student gets direct supervision during 70% practical contact hours.",
  },
];

const TIMELINE = [
  {
    year: "2020",
    title: "First cohorts in Bhopal",
    body: "Launched foundation courses in plumbing, refrigeration/air conditioning (RAC) and sheet-metal trades through the pandemic year, backed by Reliance Foundation at CRISP, Bhopal.",
    photo: "plumbing-workshop" as const,
  },
  {
    year: "2021–22",
    title: "Expanding into industrial machining",
    body: "Added CNC operation, heavy welding and tractor mechanics in partnership with CRISP and GIZ — establishing our core industrial shopfloor training capability.",
    photo: "cnc-operation" as const,
  },
  {
    year: "2022–23",
    title: "Dealer networks & North East expansion",
    body: "Rolled out automotive service training across Indore and Pune with ASDC, Veedol and IOCL, alongside rural micro-enterprise initiatives in Meghalaya.",
    photo: "car-lift-training" as const,
  },
  {
    year: "2023–24",
    title: "Defence resettlement & healthcare trades",
    body: "Introduced on-unit technical reskilling for military and CAPF personnel transitioning to civilian careers, and launched our first allied health technician cohorts.",
    photo: "defence-engine-class" as const,
  },
  {
    year: "2024–25",
    title: "Training at your doorstep (mobile units)",
    body: "Commissioned full-scale mobile workshops — driving live-engine rigs directly into districts lacking fixed training infrastructure.",
    photo: "mobile-training-unit" as const,
  },
  {
    year: "2025–26",
    title: "Pan-India multi-vertical engine",
    body: "Operating all 6 verticals concurrently across 19 states — delivering hands-on training for corporate networks, CSR partners, industrial plants, defence units, schools and micro-entrepreneurs.",
    photo: "two-wheeler-lab" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The YandNow story · Who we are"
        lines={["Training is only as", "good as the work that", "happens after it."]}
        lede="In 2020, we launched YandNow with a handful of practical trade classes in Bhopal. Today, we run 6 specialised verticals across 19 states. The locations changed, but the goal stayed identical: giving people the actual floor experience they need to perform confidently from day one."
        photo="welding-shopfloor"
        photoAlt="A welding workshop floor with equipment laid out and trainees at the benches"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        meta={[
          { label: "Day one", value: "2020" },
          { label: "Verticals", value: "06" },
          { label: "States covered", value: "19" },
        ]}
      />

      {/* What drives us — the guiding principle, with the 70% figure pinned
          to a photo that breathes as it scrolls into place */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="lg:w-[13rem]">
            <Reveal>
              <p className="eyebrow text-indigo-brand">What drives us</p>
            </Reveal>
            <span className="mt-5 block h-px w-full bg-line" />
          </div>

          <div>
            <MaskLines
              as="h2"
              className="display-lg max-w-[20ch] font-semibold"
              lines={["Real confidence comes", "from handling real tools."]}
            />
            <Reveal delay={0.12}>
              <p className="lede mt-8 max-w-[54ch] text-ink-70">
                You can&apos;t learn diagnostics from a slide deck or welding from a
                textbook. We spend 70% of every programme on live equipment, cutaway
                engines and testing benches so trainees face real errors before they
                step onto a customer site or factory line.
              </p>
            </Reveal>

            <div className="relative mt-14">
              <ScaleInFrame className="aspect-[4/3] w-full sm:aspect-[16/8]">
                <Frame
                  name="engine-hands-on"
                  alt="Trainees working hands-on with a live engine on a training bench"
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </ScaleInFrame>
              <Reveal
                delay={0.2}
                className="absolute bottom-0 left-0 bg-indigo-brand px-6 py-5 text-paper-warm md:px-8 md:py-6"
              >
                <Counter
                  to={70}
                  suffix="%"
                  className="block font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] tabular-nums"
                />
                <p className="mt-2 max-w-[20ch] text-sm leading-snug text-white/70">
                  of every programme spent on live equipment
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Execution model */}
      <section className="bg-ink py-24 text-paper-warm md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-cyan-brand">Execution model</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-lg mt-6 max-w-[20ch] font-semibold"
            lines={["Designed for the field,", "not the auditorium."]}
          />

          <RevealGroup
            className="mt-16 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2"
            stagger={0.08}
          >
            {EXECUTION.map((e, i) => (
              <RevealItem key={e.title} className="group relative bg-ink p-8 md:p-12" y={18}>
                {/* Hairline that draws across the top edge on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-cyan-brand transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.8125rem] tracking-[0.16em] text-cyan-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[1.625rem] leading-[1.12] font-semibold tracking-[-0.032em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 md:text-[2rem]">
                  {e.title}
                </h3>
                <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/60">
                  {e.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow text-indigo-brand">Non-negotiables</p>
              </Reveal>
              <MaskLines
                as="h2"
                className="display-lg mt-6 max-w-[20ch] font-semibold"
                lines={["Our", "non-negotiables."]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-50">
                We&apos;ve lost projects by sticking to these standards. We&apos;ve also
                built six years of repeat client partnerships because of them.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2"
            stagger={0.07}
          >
            {PRINCIPLES.map((p, i) => (
              <RevealItem key={p.title} className="bg-paper-warm p-8 md:p-10" y={18}>
                <span className="font-mono text-[0.8125rem] tracking-[0.16em] text-indigo-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.375rem] leading-[1.18] font-semibold tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-70">
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Numbers band */}
      <section className="bg-indigo-brand py-20 text-paper-warm md:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-cyan-soft">Key metrics at a glance</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4 lg:gap-x-8">
            {metrics.map((m, i) => (
              <Reveal key={m.label}>
                <Counter
                  to={m.value}
                  suffix={m.suffix}
                  className="block font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] tabular-nums"
                />
                <p className="mt-3 text-[0.9375rem] font-medium">{m.label}</p>
                <p className="mt-1.5 max-w-[24ch] text-sm leading-relaxed text-white/55">
                  {METRIC_NOTES[i] ?? m.note}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow text-indigo-brand">Track record</p>
              </Reveal>
              <MaskLines
                as="h2"
                className="display-lg mt-6 max-w-[18ch] font-semibold"
                lines={["Six years of ground", "execution, year by year."]}
              />
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-50">
                How a small trade setup in Bhopal grew into a 19-state hands-on
                training engine.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 border-t border-line">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="border-b border-line">
                <div className="grid gap-6 py-10 md:grid-cols-[7rem_1fr_16rem] md:items-start md:gap-10 lg:grid-cols-[8rem_1fr_20rem]">
                  <Reveal>
                    <span className="font-mono text-[0.8125rem] tracking-[0.16em] text-indigo-brand tabular-nums">
                      {t.year}
                    </span>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h3 className="font-display text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.032em] md:text-[1.75rem]">
                      {t.title}
                    </h3>
                    <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-70">
                      {t.body}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1} y={20}>
                    <Parallax distance={i % 2 === 0 ? 18 : -18}>
                      <Frame
                        name={t.photo}
                        alt={t.title}
                        className="aspect-[4/3] w-full"
                        sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw"
                      />
                    </Parallax>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Method />

      {/* Trainers */}
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">Our trainers</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[20ch] font-semibold"
              lines={["Instructors who have", "actually worked the floor."]}
            />
            <Reveal delay={0.12}>
              <p className="lede mt-7 max-w-[48ch]">
                Our trainers come straight from shopfloors, service bays and diagnostic
                labs — not lecture halls. Every instructor holds certified trade
                qualifications, brings at least five years of live site experience, and
                undergoes annual re-assessments on both craft precision and teaching
                skills.
              </p>
            </Reveal>

            <RevealGroup className="mt-11 grid gap-x-8 gap-y-7 sm:grid-cols-2" stagger={0.07}>
              {TRAINER_STATS.map(([stat, label, note]) => (
                <RevealItem key={label} y={16}>
                  <p className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.04em] text-indigo-brand tabular-nums">
                    {stat}
                  </p>
                  <p className="mt-2 text-[0.9375rem] font-medium text-ink">{label}</p>
                  <p className="mt-1 max-w-[28ch] text-sm leading-relaxed text-ink-50">{note}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Parallax distance={32} className="pt-10">
              <Frame
                name="component-demo"
                alt="A trainer walking a group through engine components on a bench"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
            </Parallax>
            <Parallax distance={-32}>
              <Frame
                name="pathology-training"
                alt="Two trainees operating laboratory equipment under supervision"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
            </Parallax>
          </div>
        </div>

        {/* Capability highlights */}
        <div className="shell mt-20 md:mt-24">
          <RevealGroup className="grid border-t border-line md:grid-cols-3" stagger={0.08}>
            {TRAINER_HIGHLIGHTS.map((h, i) => (
              <RevealItem
                key={h.title}
                y={18}
                className="group relative border-b border-line py-9 md:border-b-0 md:py-10 md:pr-10 md:not-first:border-l md:not-first:pl-10"
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-[2px] w-full origin-left scale-x-0 bg-indigo-brand transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.8125rem] tracking-[0.16em] text-indigo-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.375rem] leading-[1.18] font-semibold tracking-[-0.03em]">
                  {h.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-70">{h.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Leadership
        people={leadership}
        lines={["The people accountable", "for every cohort."]}
        intro="Two operational seats, zero ivory towers. Neither of us sits behind a closed door when a field project needs an immediate decision on the ground."
      />

      <Faq items={faqs} />
      <PartnerMarquee />
    </>
  );
}
