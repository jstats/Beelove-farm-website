import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/shop")({
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
            Beelove Farm, Makueni County.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/shop/beekeeping"
            className="group bg-amber text-cream rounded-[28px] p-10 ring-1 ring-black/5 hover:bg-umber transition-colors"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/80">
              Beekeeping
            </span>
            <h2 className="font-display text-4xl mt-3 mb-4">
              Hives · Gear · Tools · Honey
            </h2>
            <p className="text-sm text-cream/90 mb-8 max-w-md">
              KTBH and Langstroth hives, bee suits, smokers, extractors,
              strainers, and raw Makueni honey in 150g and 1kg jars.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
              Browse beekeeping <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="mt-8 h-40 rounded-2xl bg-umber/30 overflow-hidden">
              <Placeholder label="Honey jars and equipment" tone="amber" />
            </div>
          </Link>

          <Link
            to="/shop/fish"
            className="group bg-teal text-cream rounded-[28px] p-10 ring-1 ring-black/5 hover:bg-umber transition-colors"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/80">
              Fish Farming
            </span>
            <h2 className="font-display text-4xl mt-3 mb-4">
              Fingerlings · Azolla · Advisory
            </h2>
            <p className="text-sm text-cream/90 mb-8 max-w-md">
              African catfish and Nile tilapia fingerlings, Azolla starter
              kits, and on-farm pond advisory packages.
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
              Browse fish farming <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="mt-8 h-40 rounded-2xl bg-umber/30 overflow-hidden">
              <Placeholder label="Catfish fingerlings & azolla" tone="teal" />
            </div>
          </Link>
        </div>

        <div className="mt-10 bg-card ring-1 ring-umber/10 rounded-[24px] p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
            <h3 className="font-display text-2xl mb-2">How ordering works</h3>
            <p className="text-sm text-umber/75 max-w-2xl">
              All orders are placed via WhatsApp. Click any{" "}
              <strong>Order via WhatsApp</strong> button on a product and we'll
              confirm availability, arrange payment (M-Pesa), and organise
              delivery or pickup from Makueni.
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
