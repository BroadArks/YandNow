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
                <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
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
        <div className="shell grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {metrics.map((m) => (
            <Reveal key={m.label}>
              <Counter
                to={m.value}
                suffix={m.suffix}
                className="block font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] tabular-nums"
              />
              <p className="mt-3 text-[0.9375rem] font-medium">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-indigo-brand">Track record</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-lg mt-6 max-w-[18ch] font-semibold"
            lines={["Six years of ground", "execution, year by year."]}
          />

          <ol className="mt-16 border-t border-line">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="border-b border-line">
                <div className="grid gap-6 py-10 md:grid-cols-[7rem_1fr_16rem] md:items-start md:gap-10 lg:grid-cols-[8rem_1fr_20rem]">
                  <Reveal>
                    <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
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
              {[
                ["180+", "Certified trainers on roll"],
                ["5 Yrs", "Minimum floor experience"],
                ["Annual", "Re-assessment on craft"],
                ["1:12", "Trainer-to-trainee ratio"],
              ].map(([stat, label]) => (
                <RevealItem key={label} y={16}>
                  <p className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.04em] text-indigo-brand tabular-nums">
                    {stat}
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-ink-50">{label}</p>
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
