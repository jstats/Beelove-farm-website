import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import { Droplets, Sprout, Coins, Sun, Fish, Leaf } from "lucide-react";
import tilapiaImg from "@/assets/fish-tilapia-hand-new.jpg";
import catfishTrioImg from "@/assets/fish-catfish-trio.jpg";
import catfishBucketImg from "@/assets/fish-catfish-bucket-large.jpg";
import catfishHeldImg from "@/assets/fish-catfish-held.jpg";
import azollaImg from "@/assets/prod-azolla.jpg";
import fishFarmerImg from "@/assets/fish-farmer-tilapia.jpg";

export const Route = createFileRoute("/shop/fish")({
  head: () => ({
    meta: [
      { title: "Shop Fish Farming — Fingerlings & Azolla | Beelove Farm" },
      {
        name: "description",
        content:
          "Disease-screened catfish and tilapia fingerlings, Azolla starter kits and pond advisory from Beelove Farm in Makueni County. Order via WhatsApp.",
      },
    ],
  }),
  component: ShopFishPage,
});

type Product = {
  name: string;
  tag: string;
  price: string;
  copy: string;
  features: string[];
  image: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Catfish Fingerlings",
    tag: "Clarias gariepinus",
    price: "KSH 16–20 each",
    copy:
      "Disease-screened African catfish fingerlings — hardy, fast-growing and well-suited to Makueni's climate. Quantity-based pricing; bulk orders enjoy a lower per-fingerling rate and free Makueni delivery.",
    features: [
      "Size 5–8cm at delivery",
      "Oxygenated transport",
      "Free pond stocking advisory",
      "Bulk pricing for 500+",
    ],
    image: catfishBucketImg,
  },
  {
    name: "Tilapia Fingerlings",
    tag: "Oreochromis niloticus",
    price: "KSH 13–15 each",
    copy:
      "Nile tilapia — fast-growing, disease-resistant and ideal for first-time fish farmers or integrated aquaponic setups. Harvest in 5–7 months.",
    features: [
      "Size 4–6cm at delivery",
      "Mixed-sex or monosex on request",
      "Pond management guide",
      "Bulk pricing for 500+",
    ],
    image: tilapiaImg,
  },
  {
    name: "Azolla Starter Kit",
    tag: "Natural feed",
    price: "From KSH 500",
    copy:
      "Live Azolla culture with a setup guide. Grows rapidly in a basin or shallow pond — producing free, protein-rich feed within two weeks and cutting feed costs by up to 40%.",
    features: [
      "Live culture (1 kg)",
      "Setup & care guide",
      "25–35% crude protein",
      "Pond advisory add-on available",
    ],
    image: azollaImg,
  },
];

const WHY_ARID = [
  {
    icon: Droplets,
    title: "Water-efficient protein",
    copy: "A lined pond uses far less water per kilo of protein than livestock — and the same water can irrigate vegetables afterward.",
  },
  {
    icon: Sun,
    title: "Climate-resilient income",
    copy: "When drought hits crops, a stocked pond keeps producing. Fish farming buffers families against the worst dry-season shocks.",
  },
  {
    icon: Coins,
    title: "Fast cash cycle",
    copy: "Catfish reach market size in 5–7 months. That's two harvests a year versus one rain-fed maize crop.",
  },
  {
    icon: Sprout,
    title: "Azolla closes the loop",
    copy: "Azolla grows on the pond surface, feeds the fish for free, and the nutrient-rich pond water feeds your kitchen garden.",
  },
  {
    icon: Fish,
    title: "Catfish thrive in warm water",
    copy: "African catfish are built for our climate — they tolerate low oxygen and high temperatures that would stress other species.",
  },
  {
    icon: Leaf,
    title: "Nutrition for the household",
    copy: "Fresh fish on the family table — a reliable source of high-quality protein, especially valuable for children and expectant mothers.",
  },
];

function ShopFishPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] overflow-hidden ring-1 ring-umber/10 relative bg-teal text-cream min-h-[360px]">
          <img
            src={fishFarmerImg}
            alt="Beelove Farm aquaculture — tilapia from our pond"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-45"
          />
          <div className="relative p-10 md:p-16 max-w-3xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/85">
              Aquaculture catalogue
            </span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-5 leading-[1.05]">
              Fingerlings, feed<br />and pond support.
            </h1>
            <p className="max-w-xl text-cream/90 text-lg">
              From hatchery to harvest — everything a Makueni fish farmer needs
              to stock, feed and run a profitable pond.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              <a href="#catalogue" className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-cream/15 hover:bg-cream hover:text-teal transition-colors">Catalogue</a>
              <a href="#why-arid" className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-cream/15 hover:bg-cream hover:text-teal transition-colors">Why fish farming in arid areas</a>
            </div>
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            ["KSH 13", "Per tilapia"],
            ["KSH 16", "Per catfish (bulk)"],
            ["5–7 mo", "To harvest"],
            ["40%", "Feed cost saved with Azolla"],
          ].map(([v, l]) => (
            <div key={l} className="bg-card ring-1 ring-umber/10 rounded-2xl px-4 py-4">
              <div className="font-display text-2xl text-teal">{v}</div>
              <div className="text-[10px] uppercase tracking-widest text-umber/60 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="max-w-7xl mx-auto px-6 mt-16 scroll-mt-20">
        <div className="mb-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal">
            01 · Catalogue
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
            Three products. One healthy pond.
          </h2>
          <p className="text-umber/75 mt-3 max-w-2xl">
            We keep it simple — disease-screened fingerlings and the feed
            that grows them. All orders confirmed and priced over WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          {PRODUCTS.map((p, i) => (
            <EditorialRow key={p.name} product={p} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Why fish farming in arid areas */}
      <section id="why-arid" className="max-w-7xl mx-auto px-6 mt-20 scroll-mt-20">
        <div className="bg-card ring-1 ring-umber/10 rounded-[28px] overflow-hidden grid md:grid-cols-12">
          <div className="md:col-span-5 relative min-h-[300px]">
            <img
              src={catfishTrioImg}
              alt="Catfish harvested at Beelove Farm"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-7 p-8 md:p-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal">
              02 · Why fish farming
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
              Why fish farming<br />makes sense in arid Kenya
            </h2>
            <p className="text-umber/75 mt-4 max-w-xl">
              Makueni is dry — and that is exactly why a pond pays. A small,
              well-managed pond turns scarce water into reliable protein and
              year-round income, while crops remain at the mercy of the rains.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {WHY_ARID.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="flex gap-3">
                  <div className="shrink-0 size-9 rounded-full bg-teal/10 text-teal grid place-items-center">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-umber/70 leading-relaxed">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-teal text-cream rounded-[28px] p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-3 leading-tight">
              Ready to start<br />your fish farm?
            </h2>
            <p className="text-cream/80 max-w-md">
              Talk to us about pond setup, fingerling delivery and the training
              you need to run a profitable aquaculture operation.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={wa("Hello Beelove Farm, I'd like to start fish farming.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-honey hover:text-umber transition-colors"
              >
                WhatsApp us
              </a>
              <Link
                to="/training/fish"
                className="border border-cream/30 text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-cream/10 transition-colors"
              >
                Fish farming training
              </Link>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden aspect-[4/3]">
            <img
              src={catfishHeldImg}
              alt="Mature catfish at Beelove Farm"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function EditorialRow({ product, flip }: { product: Product; flip: boolean }) {
  const message = `Hello Beelove Farm, I'd like to order: ${product.name}.`;
  return (
    <article className="bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden grid md:grid-cols-5 gap-0 hover:ring-teal/30 transition-all">
      <div className={`md:col-span-2 aspect-[4/3] md:aspect-auto md:min-h-[300px] relative ${flip ? "md:order-2" : ""}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="md:col-span-3 p-7 md:p-9 flex flex-col">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-teal bg-teal/10 px-2.5 py-1 rounded-full">
            {product.tag}
          </span>
          <span className="font-display text-2xl text-umber">{product.price}</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl mb-3 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-umber/75 mb-4 max-w-xl">{product.copy}</p>
        <ul className="grid sm:grid-cols-2 gap-2 mb-5">
          {product.features.map((f) => (
            <li key={f} className="text-xs text-umber/70 bg-umber/5 rounded-lg px-3 py-2">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <a
            href={wa(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal text-cream text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-umber transition-colors"
          >
            Order via WhatsApp →
          </a>
        </div>
      </div>
    </article>
  );
}
