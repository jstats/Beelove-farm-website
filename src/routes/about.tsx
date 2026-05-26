import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { wa } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Beelove Farm, Kiunduani, Makueni" },
      {
        name: "description",
        content:
          "Founded in 2021, Beelove Farm bridges indigenous knowledge and modern technology — apiculture, aquaculture, training and IoT hive sensors from Makueni.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  { tag: "Apiculture", title: "Restoring bee populations", copy: "Sustainable beekeeping using indigenous tree knowledge, queen rearing, and multi-product harvesting — honey, propolis, pollen, and bee venom." },
  { tag: "Aquaculture", title: "Fingerlings that feed families", copy: "A fingerling production hub for Nile tilapia and African catfish, with Azolla integration for low-cost, sustainable pond feeding." },
  { tag: "Community", title: "Training the next generation", copy: "Hands-on training for smallholder farmers, women's groups, cooperatives and Maasai communities across Kenya." },
  { tag: "Research", title: "AI for traditional beekeepers", copy: "IoT hive sensors and cloud dashboards to help traditional beekeepers monitor colony health with real-time data." },
] as const;

const IMPACT = [
  { value: "120+", label: "Beehives Under Management" },
  { value: "500+", label: "Fingerlings Sold" },
  { value: "80+", label: "Farmers Trained" },
  { value: "5 yrs", label: "In Operation" },
  { value: "🌍", label: "Kenya-wide Training Reach" },
  { value: "♀", label: "Women-Led Farmer Groups" },
] as const;

function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-umber text-cream overflow-hidden ring-1 ring-black/5 grid md:grid-cols-12">
          <div className="md:col-span-7 p-10 md:p-14">
            <span className="inline-block px-3 py-1 rounded-full border border-honey/40 text-honey text-[11px] font-medium uppercase tracking-[0.18em] mb-6">
              Est. 2021 · Kiunduani, Makueni
            </span>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
              Who we are
            </h1>
            <p className="text-base md:text-lg text-cream/85 max-w-prose">
              A pioneering climate-smart agribusiness dedicated to sustainable
              beekeeping, aquaculture, and community empowerment across Kenya.
            </p>
            <blockquote className="mt-10 border-l-2 border-honey pl-6 italic font-display text-xl md:text-2xl text-honey">
              “Farming with nature, not against it — for sustainable livelihoods
              and a healthier Kenya.”
            </blockquote>
          </div>
          <div className="md:col-span-5 min-h-[280px] md:min-h-0">
            <Placeholder label="CEO installing a hive with farmers" tone="amber" />
          </div>
        </div>
      </section>

      {/* Pillars bento */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-card ring-1 ring-umber/10 rounded-[24px] p-8"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
                {p.tag}
              </span>
              <h3 className="font-display text-2xl mt-2 mb-3">{p.title}</h3>
              <p className="text-sm text-umber/75 leading-relaxed">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beekeeping story */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-honey/25 rounded-[24px] p-10 ring-1 ring-umber/10">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
              Apiculture
            </span>
            <h2 className="font-display text-4xl mt-2 mb-4">
              Restoring bee populations in Kenya
            </h2>
            <p className="text-sm text-umber/80 leading-relaxed mb-4">
              Bee populations across Kenya are under threat from pesticides,
              climate change, and habitat loss. We are fighting back —
              identifying indigenous trees that provide year-round nectar,
              training farmers in queen rearing, and promoting improved log
              hives that last longer.
            </p>
            <p className="text-sm text-umber/80 leading-relaxed mb-6">
              Through our <strong>AI for Traditional Beekeepers</strong>{" "}
              initiative we are developing hive sensors that track temperature,
              humidity, weight, and sound — bringing commercial-grade tools to
              smallholders.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop/beekeeping"
                className="bg-amber text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber transition-colors"
              >
                Shop Beekeeping
              </Link>
              <Link
                to="/training/beekeeping"
                className="border border-umber/30 text-umber text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber hover:text-cream transition-colors"
              >
                Beekeeping Training
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 min-h-[280px]">
            <Placeholder label="Fresh honeycomb inspection" tone="amber" />
          </div>
        </div>
      </section>

      {/* Aquaculture story */}
      <section className="max-w-7xl mx-auto px-6 mt-4">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 min-h-[280px] order-2 md:order-1">
            <Placeholder label="Fresh catfish harvest" tone="teal" />
          </div>
          <div className="md:col-span-7 bg-teal/10 rounded-[24px] p-10 ring-1 ring-umber/10 order-1 md:order-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal">
              Aquaculture
            </span>
            <h2 className="font-display text-4xl mt-2 mb-4">
              Fingerlings that feed families
            </h2>
            <p className="text-sm text-umber/80 leading-relaxed mb-4">
              Our aquaculture unit produces disease-screened, size-graded
              African catfish and Nile tilapia fingerlings from a dedicated
              hatchery with broodstock ponds, incubation units, and nursery
              tanks.
            </p>
            <p className="text-sm text-umber/80 leading-relaxed mb-6">
              What sets us apart is <strong>Azolla</strong> — a fast-growing
              floating fern that reduces commercial feed by up to 38%, keeps
              pond water clean, and makes fish farming viable for smallholders.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop/fish"
                className="bg-teal text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber transition-colors"
              >
                Shop Fish Products
              </Link>
              <Link
                to="/training/fish"
                className="border border-umber/30 text-umber text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber hover:text-cream transition-colors"
              >
                Fish Farming Training
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact grid */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="mb-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
            Our Impact
          </span>
          <h2 className="font-display text-4xl mt-2">Growing with every season</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {IMPACT.map((s, i) => (
            <div
              key={s.label}
              className={`${
                i % 2 === 0 ? "bg-amber text-cream" : "bg-umber text-cream"
              } rounded-[24px] p-6 text-center ring-1 ring-black/5`}
            >
              <div className="font-display text-3xl mb-2">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-12 gap-4 bg-card ring-1 ring-umber/10 rounded-[28px] overflow-hidden">
          <div className="md:col-span-4 min-h-[280px]">
            <Placeholder label="CEO in bee suit" tone="honey" />
          </div>
          <div className="md:col-span-8 p-8 md:p-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
              Leadership
            </span>
            <h3 className="font-display text-3xl mt-2 mb-1">Beelove Farm CEO</h3>
            <div className="text-xs uppercase tracking-widest text-umber/60 mb-4">
              Founder & Chief Executive · Kiunduani, Makueni County
            </div>
            <p className="text-sm text-umber/80 leading-relaxed mb-6">
              The driving force behind Beelove Farm's circular agriculture
              model — combining deep expertise in apiculture, aquaculture, and
              community development. Under this leadership, Beelove Farm has
              grown from a local beekeeping operation into a multi-enterprise
              climate-smart agribusiness with national training reach and
              cutting-edge IoT research.
            </p>
            <a
              href={wa("Hello Beelove Farm, I'd like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-amber text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber transition-colors"
            >
              Connect via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-umber text-cream rounded-[28px] p-10 md:p-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Ready to farm with us?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Whether you want to buy fingerlings, attend a training, or
            partner with us — we'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={wa("Hello Beelove Farm, I'd like to get in touch.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-honey hover:text-umber transition-colors"
            >
              Get in touch
            </a>
            <Link
              to="/"
              className="border border-cream/30 text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-cream/10 transition-colors"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
