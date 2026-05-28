import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";
import honey1kg from "@/assets/beelove-honey-1kg.jpg";
import honey150g from "@/assets/beelove-honey-150g.jpg";
import honey300g from "@/assets/beelove-honey-300g.jpg";
import ktbh from "@/assets/beelove-ktbh-yellow.jpg";
import queenExcluder from "@/assets/beelove-queen-excluder.jpg";
import gloves from "@/assets/beelove-gloves.jpg";
import catfish from "@/assets/fish-catfish-bucket-large.jpg";
import tilapia from "@/assets/fish-tilapia-hand-new.jpg";
import azolla from "@/assets/prod-azolla.jpg";
import pond from "@/assets/fish-farmer-tilapia.jpg";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Beelove Farm" },
      {
        name: "description",
        content:
          "Browse Beelove Farm's beekeeping equipment, raw honey, fingerlings and Azolla. All orders are placed via WhatsApp.",
      },
    ],
  }),
  component: ShopIndex,
});

const BEEKEEPING_PREVIEW = [
  { label: "Raw Honey 1kg", img: honey1kg },
  { label: "Raw Honey 300g", img: honey300g },
  { label: "Raw Honey 150g", img: honey150g },
  { label: "Kenya Top Bar Hive", img: ktbh },
  { label: "Queen Excluder", img: queenExcluder },
  { label: "Beekeeping Gloves", img: gloves },
];

const FISH_PREVIEW = [
  { label: "Catfish Fingerlings", img: catfish },
  { label: "Tilapia Fingerlings", img: tilapia },
  { label: "Azolla Starter Kit", img: azolla },
  { label: "Pond Advisory", img: pond },
];

function ShopIndex() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="mb-10">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
            The Shop
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 leading-tight">
            Two enterprises,<br />one farm.
          </h1>
          <p className="mt-4 text-umber/75 max-w-xl">
            Premium raw honey and beekeeping equipment, plus healthy
            fingerlings and Azolla feed for fish farmers — all sourced from
            Beelove Farm.
          </p>
        </div>

        {/* Beekeeping catalogue preview */}
        <CataloguePreview
          to="/shop/beekeeping"
          tone="amber"
          eyebrow="Beekeeping"
          title="Hives · Gear · Tools · Honey"
          copy="KTBH and Langstroth hives, bee suits, smokers, extractors, strainers, and raw Beelove honey in 150g and 1kg jars."
          items={BEEKEEPING_PREVIEW}
          cta="Browse beekeeping catalogue"
        />

        {/* Fish farming catalogue preview */}
        <div className="mt-4">
          <CataloguePreview
            to="/shop/fish"
            tone="teal"
            eyebrow="Fish Farming"
            title="Fingerlings · Azolla · Advisory"
            copy="African catfish and Nile tilapia fingerlings, Azolla starter kits, and on-farm pond advisory packages."
            items={FISH_PREVIEW}
            cta="Browse fish farming catalogue"
          />
        </div>

        <div className="mt-10 bg-card ring-1 ring-umber/10 rounded-[24px] p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
            <h3 className="font-display text-2xl mb-2">How ordering works</h3>
            <p className="text-sm text-umber/75 max-w-2xl">
              All orders are placed via WhatsApp. Click any{" "}
              <strong>Order via WhatsApp</strong> button on a product and we'll
              confirm availability, arrange payment (M-Pesa), and organise
              delivery or pickup from our farm.
            </p>
          </div>
          <Link
            to="/about"
            className="border border-umber/30 text-umber px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-umber hover:text-cream transition-colors whitespace-nowrap"
          >
            About the farm
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function CataloguePreview({
  to,
  tone,
  eyebrow,
  title,
  copy,
  items,
  cta,
}: {
  to: "/shop/beekeeping" | "/shop/fish";
  tone: "amber" | "teal";
  eyebrow: string;
  title: string;
  copy: string;
  items: { label: string; img: string }[];
  cta: string;
}) {
  const bg = tone === "amber" ? "bg-amber" : "bg-teal";
  const hoverText = tone === "amber" ? "hover:text-amber" : "hover:text-teal";
  return (
    <div
      className={`${bg} text-cream rounded-[28px] p-8 md:p-10 ring-1 ring-black/5 grid md:grid-cols-12 gap-8`}
    >
      <div className="md:col-span-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/80">
          {eyebrow}
        </span>
        <h2 className="font-display text-3xl md:text-4xl mt-3 mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-sm text-cream/90 mb-6">{copy}</p>
        <Link
          to={to}
          className={`inline-flex items-center gap-2 bg-cream text-umber ${hoverText} px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors`}
        >
          {cta} <ArrowRight className="size-3" />
        </Link>
      </div>
      <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {items.map((it) => (
          <Link
            key={it.label}
            to={to}
            className="group bg-cream/10 hover:bg-cream/20 rounded-2xl overflow-hidden ring-1 ring-cream/15 transition-colors"
          >
            <div className="h-28 overflow-hidden">
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="px-3 py-2 text-[11px] uppercase tracking-widest text-cream/90">
              {it.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
