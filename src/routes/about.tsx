import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import firstLogHiveImg from "@/assets/about-first-log-hive.jpg";
import { wa } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Beelove Farm" },
      {
        name: "description",
        content:
          "From a single gifted hive in 2016 to sensors, hatcheries, and farm intelligence — this is the Beelove story.",
      },
      { property: "og:title", content: "Our Story — Beelove Farm" },
      {
        property: "og:description",
        content:
          "From a single gifted hive in 2016 to sensors, hatcheries, and farm intelligence — this is the Beelove story.",
      },
    ],
    links: [{ rel: "canonical", href: "https://beelovefarm.lovable.app/about" }],
  }),
  component: AboutPage,
});

const SECTIONS = [
  {
    label: "The Beginning",
    headline: "It started with a gift we almost didn't take seriously.",
    body: [
      "In 2016, a cousin handed over a traditional log hive. The first harvest was enough to ask one question: why aren't more farmers doing this?",
      "A year later we bought ten Langstroth hives and ran straight into the real problem — colonising them was nearly impossible. Wild bee populations were thinner than anyone admitted. That struggle became the foundation of everything Beelove is built on.",
    ],
  },
  {
    label: "The Brand",
    headline: "In 2021, we stopped learning quietly and started teaching loudly.",
    body: [
      "Beelove launched as a honey brand — but quickly became a platform. Training programmes, hive-making workshops, equipment sales. Then apiaries in Kitui County and the Chulu Hills, alongside the national parks, where forage is rich and wild colonies still survive.",
      "Every new site taught us something the textbooks hadn't.",
    ],
    quote: {
      text: "We didn't set out to build a company. We set out to understand why good farmers were losing their colonies — and to do something about it.",
      who: "— Founder, Beelove Farm",
    },
  },
  {
    label: "Into the Water",
    headline: "Climate change forced us to diversify. Aquaculture was the answer.",
    body: [
      "By 2024, erratic rains and shifting seasons were making beekeeping harder to predict. We moved into fish farming — African catfish and Nile tilapia — and built a fingerling hatchery so local farmers would have a quality, nearby source they could trust. The same gap we had closed in beekeeping existed here too.",
    ],
  },
  {
    label: "Farm Intelligence",
    headline: "We don't just sell hives. We help farmers understand what's happening inside them.",
    body: [
      "Hive sensors. A Kenya-wide beekeeping suitability map. Environmental data correlated with colony health.",
      "This is where Beelove is going — building the intelligence layer that helps farmers make better decisions. Not just what to farm, but when, where, and why. The farmer who understands their environment wins. We want every Beelove farmer to be that farmer.",
    ],
  },
] as const;

const TIMELINE = [
  { year: "2016", body: "A gifted log hive. The first harvest. The first question." },
  { year: "2017", body: "Ten Langstroth hives. The struggle to colonise them. The bee population problem revealed." },
  { year: "2021", body: "Beelove brand launches. Training, workshops, equipment sales begin." },
  { year: "2022–23", body: "Apiaries in Kitui and the Chulu Hills." },
  { year: "2024–25", body: "Catfish and tilapia. A fingerling hatchery. Climate-smart farming." },
  { year: "2026", body: "Hive sensors, suitability maps, and farm intelligence for every farmer we work with." },
] as const;

function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] overflow-hidden ring-1 ring-umber/10 relative min-h-[52vh] md:min-h-[64vh] grid">
          <div className="absolute inset-0">
            <img
              src={firstLogHiveImg}
              alt="The first log hive at Beelove Farm"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-umber/90 via-umber/40 to-transparent" />
          <div className="relative z-10 self-end p-10 md:p-16 text-cream max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full border border-honey/50 text-honey text-[11px] font-medium uppercase tracking-[0.18em] mb-6">
              Our Story · Est. 2016
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
              A single hive. A decade of questions. A farm built on what the answers taught us.
            </h1>
          </div>
        </div>
      </section>

      {/* Story sections */}
      {SECTIONS.map((s) => (
        <section key={s.label} className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
            {s.label}
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 mb-8 leading-tight">
            {s.headline}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-umber/85">
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {"quote" in s && s.quote && (
            <blockquote className="mt-8 border-l-2 border-olive pl-6 italic font-display text-2xl text-olive leading-snug">
              "{s.quote.text}"
              <footer className="mt-3 not-italic font-sans text-xs uppercase tracking-widest text-umber/60">
                {s.quote.who}
              </footer>
            </blockquote>
          )}
        </section>
      ))}

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
          The Journey
        </span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-12 leading-tight">
          A decade, in milestones.
        </h2>
        <ol className="relative border-l border-olive/30 pl-8 space-y-10">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[37px] top-1.5 size-3 rounded-full bg-olive ring-4 ring-cream" />
              <div className="text-xs uppercase tracking-[0.2em] text-amber font-semibold mb-1">
                {t.year}
              </div>
              <p className="text-base text-umber/80 leading-relaxed">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What's next */}
      <section className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
          What's Next
        </span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-tight">
          The next chapter.
        </h2>
        <p className="text-lg text-umber/85 leading-relaxed">
          <strong className="text-olive">500 hives</strong> fitted with sensors
          across Kenya's dryland counties.{" "}
          <strong className="text-olive">1,000 farmers</strong> trained in
          climate-smart beekeeping and aquaculture. And proof that a farm in
          Makueni can be as data-driven as any operation anywhere in the world.
        </p>
      </section>

      {/* Closing CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="bg-umber text-cream rounded-[28px] p-12 md:p-20 text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
            Want to be part of the story?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-10 text-lg">
            Buy honey or fingerlings, join a training, or just say hello. We
            answer every message.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={wa("Hello Beelove Farm, I read your story and I'd like to get in touch.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber text-cream px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-honey hover:text-umber transition-colors"
            >
              Say hello on WhatsApp
            </a>
            <Link
              to="/contact"
              className="border border-cream/30 text-cream px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-cream/10 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
