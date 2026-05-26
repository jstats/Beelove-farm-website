import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import apiaryHero from "@/assets/apiary-yellow-hives.jpg";
import ktbhImg from "@/assets/prod-hive-ktbh.jpg";
import langstrothImg from "@/assets/prod-langstroth.jpg";
import logHiveImg from "@/assets/map-acacia-tree.jpg";
import beeSuitImg from "@/assets/prod-bee-suit.jpg";
import beeVeilImg from "@/assets/prod-bee-veil.jpg";
import smokerImg from "@/assets/prod-smoker.jpg";
import hiveToolImg from "@/assets/prod-hive-tool.jpg";
import beeBrushImg from "@/assets/prod-bee-brush.jpg";
import beeAttractantImg from "@/assets/prod-bee-attractant.jpg";
import foundationImg from "@/assets/honeycomb-frames.jpg";
import frameFeederImg from "@/assets/shop-honey-rows.jpg";
import uncappingForkImg from "@/assets/prod-uncapping-fork.jpg";
import extractorImg from "@/assets/honey-products.jpg";
import strainerImg from "@/assets/prod-honey-strainer.jpg";
import honey150gImg from "@/assets/prod-honey-150g.jpg";
import honey1kgImg from "@/assets/prod-honey-1kg.jpg";

export const Route = createFileRoute("/shop/beekeeping")({
  head: () => ({
    meta: [
      { title: "Beekeeping Shop — Hives, Gear & Raw Honey | Beelove Farm" },
      {
        name: "description",
        content:
          "KTBH and Langstroth hives, bee suits, smokers, extractors, strainers and raw Makueni honey. Order via WhatsApp.",
      },
    ],
  }),
  component: ShopBeekeepingPage,
});

type Product = {
  name: string;
  tag: string;
  price: string;
  copy: string;
  image: string;
};

const SECTIONS: { id: string; title: string; intro: string; items: Product[] }[] = [
  {
    id: "hives",
    title: "Hives",
    intro: "Locally built for every beekeeper — from first-time keeper to commercial operator.",
    items: [
      { name: "Kenya Top Bar Hive (KTBH)", tag: "Hive", price: "KSH 4,500", copy: "Locally crafted hardwood KTBH. Ideal for natural beekeeping — no foundation needed, complete with 28 top bars.", image: ktbhImg },
      { name: "Langstroth Hive (10-frame)", tag: "Hive", price: "KSH 7,500", copy: "10-frame Langstroth with brood box, super, frames and fitted stand. Perfect for commercial honey production.", image: langstrothImg },
      { name: "Traditional Log Hive", tag: "Hive", price: "KSH 1,800", copy: "Hand-carved round log hive — low cost, excellent for attracting wild swarms in rural areas.", image: logHiveImg },
    ],
  },
  {
    id: "protection",
    title: "Protective Gear",
    intro: "Stay safe and comfortable during inspections and harvests.",
    items: [
      { name: "Full Bee Suit", tag: "Protection", price: "KSH 3,500", copy: "Full-body ventilated suit with integrated veil. Light, breathable cotton-polyester blend. Sizes S–XXL.", image: beeSuitImg },
      { name: "Bee Veil (Round)", tag: "Protection", price: "KSH 800", copy: "Round wire-mesh bee veil with adjustable straps. Lightweight for quick inspections.", image: beeVeilImg },
    ],
  },
  {
    id: "tools",
    title: "Tools & Accessories",
    intro: "Every tool a working beekeeper needs.",
    items: [
      { name: "Bee Smoker", tag: "Tools", price: "KSH 1,200", copy: "Stainless steel smoker with leather bellows. Durable, easy to light.", image: smokerImg },
      { name: "Hive Tool (J-Type)", tag: "Tools", price: "KSH 350", copy: "Stainless steel J-type tool for prying frames and scraping propolis.", image: hiveToolImg },
      { name: "Bee Brush", tag: "Tools", price: "KSH 300", copy: "Soft natural bristle brush — gentle on the colony during inspections and harvest.", image: beeBrushImg },
      { name: "Bee Attractant", tag: "Tools", price: "KSH 500", copy: "Lemongrass-based attractant spray. Proven effective in Makueni.", image: beeAttractantImg },
      { name: "Foundation Sheets", tag: "Accessories", price: "KSH 150 / sheet", copy: "Beeswax-coated sheets for Langstroth frames. Template for straight, even comb.", image: foundationImg },
      { name: "Frame Feeder", tag: "Accessories", price: "KSH 400", copy: "Plastic feeder for supplemental feeding during dearth periods.", image: frameFeederImg },
    ],
  },
  {
    id: "processing",
    title: "Honey Processing",
    intro: "Equipment for clean, hygienic extraction and bottling.",
    items: [
      { name: "Manual Honey Extractor", tag: "Processing", price: "KSH 12,000", copy: "2-frame manual radial extractor — stainless drum, gate valve. Great for small-scale operations.", image: extractorImg },
      { name: "Honey Strainer (Double)", tag: "Processing", price: "KSH 900", copy: "Double-mesh stainless strainer — removes wax and debris, leaving crystal-clear pure honey.", image: strainerImg },
      { name: "Uncapping Fork (3-pack)", tag: "Processing", price: "KSH 750", copy: "Stainless-tine uncapping forks for clean, fast removal of wax caps before extraction.", image: uncappingForkImg },
    ],
  },
  {
    id: "honey",
    title: "Raw Honey",
    intro: "Pure, unheated, unfiltered honey from Makueni's diverse flora.",
    items: [
      { name: "Raw Honey — 150g Jar", tag: "Honey", price: "KSH 350", copy: "Pure, unfiltered, unheated raw honey. Rich in enzymes and natural goodness.", image: honey150gImg },
      { name: "Raw Honey — 1kg Jar", tag: "Honey", price: "KSH 1,800", copy: "Flagship 1kg jar of pure raw Makueni honey. Perfect for households and gifting.", image: honey1kgImg },
    ],
  },
];

function ShopBeekeepingPage() {
  return (
    <SiteLayout>
      {/* Hero — distinct from fish: wide apiary photo banner with overlay */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] overflow-hidden ring-1 ring-umber/10 relative bg-umber min-h-[360px]">
          <img
            src={apiaryHero}
            alt="Beelove Farm apiary — yellow Langstroth hives on a wooden stand"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-umber/85 via-umber/55 to-transparent" />
          <div className="relative p-10 md:p-16 max-w-2xl text-cream">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
              Beekeeping Shop
            </span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-5 leading-[1.05]">
              Hives, gear<br />and raw Makueni honey.
            </h1>
            <p className="max-w-md text-cream/90 text-lg">
              Quality equipment built in Makueni — plus pure honey straight from
              our apiary. Place every order on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-cream/15 hover:bg-honey hover:text-umber transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {SECTIONS.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-7xl mx-auto px-6 mt-14 scroll-mt-20"
        >
          <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
            <div className="max-w-2xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
                {String(i + 1).padStart(2, "0")} · Category
              </span>
              <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
                {section.title}
              </h2>
              <p className="text-sm text-umber/75 mt-2">{section.intro}</p>
            </div>
            <span className="text-xs uppercase tracking-widest text-umber/40">
              {section.items.length} products
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-umber text-cream rounded-[28px] p-10 md:p-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Need a bulk quote?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Training groups, NGOs and resellers — contact us for volume pricing
            on hives, honey and equipment.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={wa("Hello Beelove Farm, I'm interested in bulk pricing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-honey hover:text-umber transition-colors"
            >
              WhatsApp for bulk quote
            </a>
            <Link
              to="/training/beekeeping"
              className="border border-cream/30 text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-cream/10 transition-colors"
            >
              Beekeeping training
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product }: { product: Product }) {
  const message = `Hello Beelove Farm, I'd like to order: ${product.name}.`;
  return (
    <article className="bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden flex flex-col hover:-translate-y-0.5 hover:ring-amber/40 transition-all">
      <div className="h-48 bg-umber/5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber mb-2">
          {product.tag}
        </span>
        <h3 className="font-display text-xl mb-2 leading-snug">{product.name}</h3>
        <p className="text-sm text-umber/75 mb-5 flex-1">{product.copy}</p>
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-umber/10">
          <span className="font-display text-lg text-umber">{product.price}</span>
          <a
            href={wa(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber text-cream text-[10px] font-semibold uppercase tracking-widest px-3 py-2 rounded-full hover:bg-umber transition-colors"
          >
            Order
          </a>
        </div>
      </div>
    </article>
  );
}
