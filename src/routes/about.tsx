import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import firstLogHiveImg from "@/assets/about-first-log-hive.jpg";
import { wa } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Beelove Farm, Kiunduani, Makueni" },
      {
        name: "description",
        content:
          "How a single hive in Kiunduani grew into a circular climate-smart farm — bees, fish, rabbits, black soldier flies, and the farmers who learn alongside us.",
      },
      { property: "og:title", content: "Our Story — Beelove Farm" },
      {
        property: "og:description",
        content:
          "A founder, a forgotten hilltop in Makueni, and a question nobody else was asking. This is how Beelove began.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    n: "01",
    title: "Farm with nature, not against it.",
    copy: "Every part of our system feeds the next — bee, fish, rabbit, fly, soil. Nothing is waste.",
  },
  {
    n: "02",
    title: "Knowledge belongs to the community that grew it.",
    copy: "The elders of Kiunduani know which tree flowers in which month. Our work begins by listening.",
  },
  {
    n: "03",
    title: "Technology should serve the farmer, not replace her.",
    copy: "A sensor in a log hive only matters if a woman in Makueni can read what it tells her.",
  },
  {
    n: "04",
    title: "A healthy hive and a healthy pond feed the same family.",
    copy: "We don't choose between enterprises. We build them so each one makes the others stronger.",
  },
] as const;

const TIMELINE = [
  { year: "2021", title: "The first hive", body: "A single log hive goes up behind a family home in Kiunduani, Makueni County." },
  { year: "2022", title: "First farmer cohort", body: "We train our first group of smallholders in queen rearing and indigenous forage trees." },
  { year: "2023", title: "Fingerling hatchery", body: "Broodstock ponds and nursery tanks open — Nile tilapia and African catfish for the county." },
  { year: "2024", title: "Closing the loop", body: "Azolla, rabbits, and black soldier fly farming join the system. Waste becomes feed, feed becomes harvest." },
  { year: "2025", title: "AI for Traditional Beekeepers", body: "First prototypes of low-cost hive sensors measuring temperature, humidity, weight, and sound." },
  { year: "2026", title: "Where we are now", body: "120+ hives under management, farmers trained across Kenya, and a national suitability map in the works." },
] as const;

function AboutPage() {
  return (
    <SiteLayout>
      {/* 1. Opening image + single sentence */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] overflow-hidden ring-1 ring-umber/10 relative min-h-[60vh] md:min-h-[70vh] grid">
          <div className="absolute inset-0">
            <Placeholder label="Sunrise over the Kiunduani hills" tone="amber" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-umber/90 via-umber/40 to-transparent" />
          <div className="relative z-10 self-end p-10 md:p-16 text-cream max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full border border-honey/50 text-honey text-[11px] font-medium uppercase tracking-[0.18em] mb-6">
              Our Story · Est. 2021
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
              It started with a single hive, and a question nobody was asking.
            </h1>
          </div>
        </div>
      </section>

      {/* 2. The problem that started it all */}
      <section className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
          The Beginning
        </span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-8 leading-tight">
          Something was disappearing in Makueni.
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-umber/85">
          <p>
            In 2021, farmers around Makueni County were watching their bee
            colonies vanish. Pesticides drifted in from neighbouring fields.
            The rains came late, or not at all. The old men and women who knew
            which trees flowered in which month — and which honey came from
            which bloom — were passing on, and their knowledge was leaving
            with them.
          </p>
          <p>
            A few kilometres away, fish ponds sat empty. Not because farmers
            didn't want to stock them, but because nobody nearby was producing
            healthy fingerlings. Families that should have been eating protein
            from their own ponds were buying tilapia trucked in from hundreds
            of kilometres away.
          </p>
          <p>
            Somebody had to do something about it. Quietly, locally, and from
            the ground up.
          </p>
        </div>
      </section>

      {/* 3. The founding moment — narrative scene */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="grid md:grid-cols-12 gap-4 items-stretch">
          <div className="md:col-span-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 min-h-[420px]">
            <Placeholder label="First log hive, Kiunduani, 2021" tone="honey" />
          </div>
          <div className="md:col-span-7 bg-card ring-1 ring-umber/10 rounded-[24px] p-10 md:p-14">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
              The First Hive
            </span>
            <h2 className="font-display text-4xl mt-3 mb-6 leading-tight">
              One log, one tree, one family's backyard.
            </h2>
            <p className="text-base text-umber/85 leading-relaxed mb-5">
              The first Beelove hive went up in 2021 — a single improved log
              hive lashed to an acacia behind the founder's family home in
              Kiunduani. No sensors. No website. No five-year plan. Just a
              hypothesis: that if you treated bees like neighbours instead of
              livestock, they would stay.
            </p>
            <p className="text-base text-umber/85 leading-relaxed">
              They stayed. And within a season, neighbours started asking how.
            </p>
            <blockquote className="mt-8 border-l-2 border-olive pl-6 italic font-display text-2xl text-olive leading-snug">
              "I didn't set out to build a company. I set out to keep one hive
              alive."
              <footer className="mt-3 not-italic font-sans text-xs uppercase tracking-widest text-umber/60">
                — Founder, Beelove Farm
                {/* TODO: replace with founder's real name + title */}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 4. What we believe — principles */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
            What We Believe
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            Four principles we farm by.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.n}
              className="bg-card ring-1 ring-umber/10 rounded-[24px] p-8 md:p-10"
            >
              <div className="font-display text-3xl text-olive mb-4">{p.n}</div>
              <h3 className="font-display text-2xl mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-umber/75 leading-relaxed">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The journey — timeline */}
      <section className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
          The Journey
        </span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-12 leading-tight">
          Five years, four enterprises, one circular farm.
        </h2>
        <ol className="relative border-l border-olive/30 pl-8 space-y-10">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[37px] top-1.5 size-3 rounded-full bg-olive ring-4 ring-cream" />
              <div className="text-xs uppercase tracking-[0.2em] text-amber font-semibold mb-1">
                {t.year}
              </div>
              <h3 className="font-display text-2xl mb-2 leading-snug">
                {t.title}
              </h3>
              <p className="text-base text-umber/80 leading-relaxed">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. The circular model — pulled directly from your profile */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="bg-olive text-cream rounded-[28px] p-10 md:p-16">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
              The System
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              Nothing here is wasted.
            </h2>
          </div>
          <p className="text-base md:text-lg text-cream/85 leading-relaxed max-w-3xl mb-10">
            Bees pollinate the trees. Trees feed the bees and shade the ponds.
            Pond water nourishes the fields. Organic waste feeds black soldier
            fly larvae, which feed the fish and the rabbits. Rabbit manure
            returns to the soil as fertilizer. Rabbit urine becomes a natural
            pesticide. It's not a slogan — it's how the farm actually works.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { tag: "Apiculture", body: "120+ hives, indigenous forage trees, queen rearing, multi-product harvest." },
              { tag: "Aquaculture", body: "Tilapia and catfish fingerlings from our own hatchery, fed with Azolla." },
              { tag: "Rabbit Farming", body: "Heat-tolerant breeds, low-emission protein, manure and urine recycled." },
              { tag: "Black Soldier Fly", body: "Turns organic waste into 50% protein feed — cuts feed costs by up to 38%." },
            ].map((c) => (
              <div key={c.tag} className="bg-cream/10 rounded-[20px] p-6 ring-1 ring-cream/15">
                <div className="text-[10px] uppercase tracking-[0.2em] text-honey font-semibold mb-2">
                  {c.tag}
                </div>
                <p className="text-sm text-cream/85 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The people */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
            The People
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            Farmers, first. Founders, second.
          </h2>
        </div>
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 min-h-[380px]">
            <Placeholder label="Founder portrait, in the apiary" tone="amber" />
          </div>
          <div className="md:col-span-7 bg-card ring-1 ring-umber/10 rounded-[24px] p-10 md:p-12">
            <div className="text-[10px] uppercase tracking-widest text-umber/60 mb-2">
              Founder & Chief Executive
            </div>
            <h3 className="font-display text-3xl mb-5">
              {/* TODO: replace with founder's real name */}
              The Founder
            </h3>
            <p className="text-base text-umber/85 leading-relaxed mb-4">
              Born and raised in Makueni County, our founder spent years
              watching the rhythms of the land change — and decided to do
              something measurable about it. What began as a single backyard
              hive is now a four-enterprise farm with national training reach
              and a research programme bridging traditional knowledge and
              modern sensors.
            </p>
            <p className="text-base text-umber/85 leading-relaxed">
              Beelove is not run from a corner office. It is run from the
              apiary, the pond bank, and the village hall.
            </p>
          </div>
        </div>
      </section>

      {/* 8. A farmer's voice — testimonial as story */}
      <section className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
        <div className="bg-honey/30 rounded-[24px] p-10 md:p-14 ring-1 ring-umber/10">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
            A Farmer's Voice
          </span>
          <blockquote className="mt-5 font-display text-2xl md:text-3xl leading-snug text-umber">
            "Before Beelove, I lost two colonies a year and I didn't know why.
            They taught me which trees to plant, when to harvest, and how to
            split a colony without losing the queen. Last season I harvested
            from six hives — and my daughter is in secondary school because of
            that honey."
          </blockquote>
          <footer className="mt-6 text-xs uppercase tracking-widest text-umber/70">
            {/* TODO: replace with a real farmer/trainee name + village */}
            — Mama Mwikali, farmer · Kiunduani ward
          </footer>
        </div>
      </section>

      {/* 9. Where we're going */}
      <section className="max-w-3xl mx-auto px-6 mt-20 md:mt-28">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-olive">
          What's Next
        </span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-tight">
          The next five years.
        </h2>
        <p className="text-lg text-umber/85 leading-relaxed">
          We want to restore <strong className="text-olive">1,000 hectares</strong>{" "}
          of indigenous bee forage across the drylands of Eastern Kenya. We
          want to train <strong className="text-olive">1,000 women farmers</strong>{" "}
          in apiculture, aquaculture, and circular farming. And we want to
          open-source our hive sensor design, so any beekeeper anywhere can
          build one for the cost of a phone charger.
        </p>
      </section>

      {/* 10. Quiet closing CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="bg-umber text-cream rounded-[28px] p-12 md:p-20 text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
            Come visit us in Kiunduani.
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-10 text-lg">
            Or just say hello. We answer every message.
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
              Plan a farm visit
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
