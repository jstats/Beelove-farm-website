import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { wa } from "@/lib/site";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero1.jpg";
import langstrothImg from "@/assets/hero2.jpg";
import fishImg from "@/assets/fish-tilapia-harvest.jpg";
import mapLandscapeImg from "@/assets/map-acacia-tree.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beelove Farm — Honey & Aquaculture, Makueni County" },
      {
        name: "description",
        content:
          "Climate-smart beekeeping and fish farming from Makueni County, Kenya. Premium raw honey, catfish & tilapia fingerlings, Azolla feed, and farmer training.",
      },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { value: "120+", label: "Active Hives", tone: "honey" },
  { value: "500+", label: "Fingerlings Sold", tone: "teal" },
  { value: "80+", label: "Farmers Trained", tone: "umber" },
  { value: "5 yrs", label: "In Operation", tone: "amber" },
] as const;

const PILLARS = [
  { title: "Bee-Friendly", copy: "No chemicals, no rush. Bees forage Makueni's native flora.", bg: "bg-honey/25" },
  { title: "Clean-Water", copy: "Oxygenated ponds, zero pollution, healthy fish.", bg: "bg-teal/10" },
  { title: "Azolla Feed", copy: "Floating fern, 25% protein — cuts feed cost by 40%.", bg: "bg-umber/10" },
  { title: "Empowerment", copy: "80+ farmers trained from first hive to first harvest.", bg: "bg-amber/20" },
] as const;

const COUNTIES = [
  { name: "Nyeri", score: 84, tier: "Prime" },
  { name: "Kirinyaga", score: 83, tier: "Prime" },
  { name: "Kakamega", score: 80, tier: "High" },
  { name: "Makueni (Beelove)", score: 68, tier: "Moderate" },
] as const;

function HomePage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          {/* Hero Tile */}
          <div className="md:col-span-8 md:row-span-2 relative overflow-hidden rounded-[24px] bg-umber text-cream p-8 md:p-12 ring-1 ring-black/5 min-h-[420px] md:min-h-[520px]">
            <img
              src={heroImg}
              alt="Beelove Farm apiary with hives in a Makueni cornfield"
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-umber via-umber/70 to-umber/30" />
            <div className="relative z-10 flex flex-col h-full justify-end">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 border border-amber/40 text-honey text-[11px] font-medium uppercase tracking-[0.18em] mb-6 w-fit">
                <Sparkles className="size-3" />
                Makueni County, Kenya
              </span>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance mb-6">
                Sustaining the land,<br />
                <span className="italic text-honey">feeding the future.</span>
              </h1>
              <p className="max-w-[44ch] text-base md:text-lg text-cream/80 text-pretty mb-8">
                Integrated climate-smart agriculture where high-yield beekeeping
                meets sustainable aquaculture — in the heart of Makueni.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="bg-amber text-cream text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full ring-1 ring-amber hover:bg-honey hover:text-umber transition-colors"
                >
                  Our Story
                </Link>
                <a
                  href={wa("Hello Beelove Farm, I'd like to make an enquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-cream/30 text-cream text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-cream/10 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-card p-6 rounded-[24px] ring-1 ring-umber/10 flex flex-col justify-center text-center min-h-[120px]"
              >
                <div
                  className={
                    "font-display text-4xl " +
                    (s.tone === "teal" ? "text-teal" : "text-amber")
                  }
                >
                  {s.value}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-umber/60 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Beekeeping enterprise */}
          <EnterpriseTile
            tone="amber"
            tag="Beekeeping"
            title="From hive to honey jar"
            copy="Raw honey, KTBH & Langstroth hives, protective gear, processing kit — plus hands-on training programs from beginner to advanced."
            shopHref="/shop/beekeeping"
            trainHref="/training/beekeeping"
            shopLabel="Shop Beekeeping"
            trainLabel="Beekeeping Training"
            image={langstrothImg}
            imageAlt="Stacked yellow Langstroth hive boxes at Beelove Farm"
          />
          <EnterpriseTile
            tone="teal"
            tag="Fish Farming"
            title="Fingerlings that feed families"
            copy="Disease-screened catfish & tilapia fingerlings, Azolla starter kits, and pond advisory — sustainable aquaculture for smallholders."
            shopHref="/shop/fish"
            trainHref="/training/fish"
            shopLabel="Shop Fish Products"
            trainLabel="Fish Farming Training"
            image={fishImg}
            imageAlt="Fresh tilapia harvest from Beelove Farm ponds"
          />

          {/* Map preview */}
          <div className="md:col-span-7 bg-card ring-1 ring-umber/10 rounded-[24px] p-8 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber">
                Research Tool
              </span>
              <h3 className="font-display text-3xl mt-2 mb-3 leading-snug">
                Hive Suitability Map
              </h3>
              <p className="text-sm text-umber/70 mb-6 text-pretty">
                A data-driven score for all 47 counties — rainfall, vegetation,
                water, urban pressure, and elevation.
              </p>
              <div className="space-y-2">
                {COUNTIES.map((c, i) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between text-xs border-b border-umber/10 pb-2 last:border-0"
                  >
                    <span className="font-medium">
                      {i < 3 ? "🏆 " : "🐝 "}
                      {c.name}
                    </span>
                    <span className="text-amber font-semibold">
                      {c.score} / 100 · {c.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-cream rounded-xl border border-umber/10 overflow-hidden relative min-h-[200px]">
              <img
                src={mapLandscapeImg}
                alt="Beelove Farm landscape in Makueni County"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Philosophy pillars */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className={`${p.bg} p-6 rounded-[24px] ring-1 ring-umber/5`}
              >
                <div className="font-display text-2xl mb-2">{p.title}</div>
                <p className="text-xs leading-relaxed text-umber/75">{p.copy}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="md:col-span-12 bg-umber text-cream p-8 md:p-12 rounded-[24px] ring-1 ring-black/5">
            <div className="max-w-3xl">
              <span className="text-amber font-display text-5xl block leading-none mb-4">
                "
              </span>
              <p className="text-xl md:text-3xl font-display leading-snug mb-8">
                I attended the beginner training and set up my first two KTBH
                hives the next week. By the third month I had my first harvest.
                Beelove really changed my life.
              </p>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-amber/30 grid place-items-center font-display text-amber">
                  JM
                </div>
                <div>
                  <div className="text-sm font-semibold">James Mutua</div>
                  <div className="text-xs text-cream/60 uppercase tracking-widest">
                    Mbooni, Makueni
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training CTA */}
          <div className="md:col-span-6 bg-honey/30 rounded-[24px] p-8 ring-1 ring-umber/10">
            <h3 className="font-display text-3xl mb-3">Train at the farm</h3>
            <p className="text-sm text-umber/75 mb-6 max-w-md">
              Hands-on courses for beginners and pros — held at Beelove Farm
              with live hives and working ponds.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/training/beekeeping"
                className="bg-umber text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-amber transition-colors inline-flex items-center gap-2"
              >
                Beekeeping <ArrowRight className="size-3" />
              </Link>
              <Link
                to="/training/fish"
                className="bg-teal text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-amber transition-colors inline-flex items-center gap-2"
              >
                Fish Farming <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* WhatsApp tile */}
          <div className="md:col-span-6 bg-amber text-cream rounded-[24px] p-8 ring-1 ring-black/5">
            <h3 className="font-display text-3xl mb-3">Order via WhatsApp</h3>
            <p className="text-sm text-cream/90 mb-6 max-w-md">
              All orders are placed on WhatsApp — we confirm availability,
              arrange payment, and organise delivery or pickup from Makueni.
            </p>
            <a
              href={wa("Hello Beelove Farm, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cream text-umber text-xs font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-umber hover:text-cream transition-colors"
            >
              Start a chat <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function EnterpriseTile({
  tone,
  tag,
  title,
  copy,
  shopHref,
  trainHref,
  shopLabel,
  trainLabel,
  placeholder,
  image,
  imageAlt,
}: {
  tone: "amber" | "teal";
  tag: string;
  title: string;
  copy: string;
  shopHref: string;
  trainHref: string;
  shopLabel: string;
  trainLabel: string;
  placeholder?: string;
  image?: string;
  imageAlt?: string;
}) {
  const bg = tone === "amber" ? "bg-amber" : "bg-teal";
  const accentBtn =
    tone === "amber" ? "text-amber" : "text-teal";
  return (
    <div
      className={`md:col-span-6 ${bg} text-cream rounded-[24px] overflow-hidden flex flex-col ring-1 ring-black/5`}
    >
      <div className="p-8 flex flex-col flex-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/70 mb-3">
          {tag}
        </span>
        <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-sm text-cream/90 max-w-[40ch] mb-8">{copy}</p>
        <div className="mt-auto flex flex-wrap gap-3">
          <Link
            to={shopHref}
            className={`bg-cream ${accentBtn} text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber hover:text-cream transition-colors`}
          >
            {shopLabel}
          </Link>
          <Link
            to={trainHref}
            className="border border-cream/40 text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-cream/10 transition-colors"
          >
            {trainLabel}
          </Link>
        </div>
      </div>
      <div className="h-44 bg-umber/30">
        {image ? (
          <img src={image} alt={imageAlt ?? ""} className="w-full h-full object-cover" />
        ) : (
          <Placeholder label={placeholder ?? ""} tone="umber" />
        )}
      </div>
    </div>
  );
}
