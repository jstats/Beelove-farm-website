import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import tilapiaImg from "@/assets/fish-tilapia-hand.jpg";
import tilapiaHarvestImg from "@/assets/fish-tilapia-harvest.jpg";
import catfishImg from "@/assets/prod-catfish-fingerlings.jpg";
import azollaImg from "@/assets/prod-azolla.jpg";
import pondImg from "@/assets/fish-pond.jpg";
import landscapeImg from "@/assets/map-farm-landscape.jpg";

export const Route = createFileRoute("/shop/fish")({
  head: () => ({
    meta: [
      { title: "Shop Fish Farming — Fingerlings & Azolla | Beelove Farm" },
      {
        name: "description",
        content:
          "Disease-screened catfish and tilapia fingerlings, Azolla starter kits, and pond advisory packages from Beelove Farm. Order via WhatsApp.",
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
  features?: string[];
  image: string;
};

const SECTIONS: {
  id: string;
  title: string;
  intro: string;
  species?: string;
  items: Product[];
}[] = [
  {
    id: "fingerlings",
    title: "Catfish Fingerlings",
    species: "Clarias gariepinus",
    intro:
      "African catfish — hardy, fast-growing, and well-suited to Makueni's climate. Disease-screened and size-graded before delivery.",
    items: [
      {
        name: "Catfish Fingerlings (100 pcs)",
        tag: "Starter pack",
        price: "KSH 2,000",
        copy: "100 healthy fingerlings, size-graded for uniformity and transported in oxygenated bags.",
        features: ["KSH 20 each", "Size 5–8cm at delivery", "Free pond stocking advisory"],
        image: catfishImg,
      },
      {
        name: "Catfish Fingerlings (500 pcs)",
        tag: "Medium scale",
        price: "KSH 9,000",
        copy: "Bulk order for medium-scale pond stocking with a discounted per-fish rate and priority delivery.",
        features: ["KSH 18 each", "Multiple oxygenated bags", "On-farm pond check available"],
        image: catfishImg,
      },
      {
        name: "Catfish Fingerlings (1,000 pcs)",
        tag: "Commercial",
        price: "KSH 16,000",
        copy: "Commercial-scale order with the best price per fingerling and free delivery within Makueni County.",
        features: ["KSH 16 each", "Free Makueni delivery", "Restock guarantee at 3 months"],
        image: pondImg,
      },
    ],
  },
  {
    id: "tilapia",
    title: "Tilapia Fingerlings",
    species: "Oreochromis niloticus",
    intro:
      "Nile tilapia — fast-growing and ideal for integrated farming. A reliable choice for first-time fish farmers.",
    items: [
      {
        name: "Tilapia Fingerlings (100 pcs)",
        tag: "Starter pack",
        price: "KSH 1,500",
        copy: "Fast-growing, disease-resistant, and suitable for mixed-sex stocking.",
        features: ["KSH 15 each", "Size 4–6cm at delivery", "Harvest in 5–7 months"],
        image: tilapiaImg,
      },
      {
        name: "Tilapia Fingerlings (500 pcs)",
        tag: "Medium scale",
        price: "KSH 6,500",
        copy: "Bulk order for medium-to-large pond operations. Includes free Makueni delivery and a pond management guide.",
        features: ["KSH 13 each", "Free Makueni delivery", "Pond management guide"],
        image: tilapiaHarvestImg,
      },
    ],
  },
  {
    id: "azolla",
    title: "Azolla & Feed",
    intro:
      "Azolla is a floating fern that doubles as a high-protein fish feed — cutting feed costs by up to 40%.",
    items: [
      {
        name: "Azolla Starter Kit",
        tag: "Feed",
        price: "KSH 500",
        copy: "Live Azolla culture with a setup guide. Grows rapidly in a basin or shallow pond — producing free protein-rich feed within two weeks.",
        features: ["Live culture (1 kg)", "Setup & care guide", "25–35% crude protein"],
        image: azollaImg,
      },
      {
        name: "Azolla + Pond Advisory",
        tag: "Feed + Advisory",
        price: "KSH 2,500",
        copy: "Azolla kit plus a one-hour on-farm advisory: pond setup, feeding schedules, water quality and harvest planning.",
        image: azollaImg,
      },
    ],
  },
];

function ShopFishPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] overflow-hidden ring-1 ring-umber/10 relative bg-teal text-cream min-h-[360px]">
          <img
            src={pondImg}
            alt="Fish pond at Beelove Farm"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
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
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-cream/15 hover:bg-cream hover:text-teal transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            ["KSH 15", "Per tilapia"],
            ["KSH 16", "Per catfish (1k)"],
            ["5–7 mo", "To harvest"],
            ["40%", "Feed cost saved with Azolla"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="bg-card ring-1 ring-umber/10 rounded-2xl px-4 py-4"
            >
              <div className="font-display text-2xl text-teal">{v}</div>
              <div className="text-[10px] uppercase tracking-widest text-umber/60 mt-1">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial alternating sections */}
      {SECTIONS.map((section, sIdx) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-7xl mx-auto px-6 mt-16 scroll-mt-20"
        >
          <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
            <div className="max-w-2xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal">
                {String(sIdx + 1).padStart(2, "0")} · Catalogue
              </span>
              <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
                {section.title}
              </h2>
              {section.species && (
                <p className="italic text-umber/55 text-sm mt-1">
                  {section.species}
                </p>
              )}
              <p className="text-umber/75 mt-3">{section.intro}</p>
            </div>
            <span className="text-xs uppercase tracking-widest text-umber/40">
              {section.items.length}{" "}
              {section.items.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="space-y-4">
            {section.items.map((p, i) => (
              <EditorialRow key={p.name} product={p} flip={i % 2 === 1} />
            ))}
          </div>
        </section>
      ))}

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
          <div className="rounded-[20px] overflow-hidden h-56 md:h-64">
            <img
              src={landscapeImg}
              alt="Beelove Farm landscape"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function EditorialRow({
  product,
  flip,
}: {
  product: Product;
  flip: boolean;
}) {
  const message = `Hello Beelove Farm, I'd like to order: ${product.name}.`;
  return (
    <article
      className={`bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden grid md:grid-cols-5 gap-0 hover:ring-teal/30 transition-all`}
    >
      <div
        className={`md:col-span-2 h-56 md:h-auto md:min-h-[260px] ${
          flip ? "md:order-2" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:col-span-3 p-7 md:p-9 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-teal bg-teal/10 px-2.5 py-1 rounded-full">
            {product.tag}
          </span>
          <span className="font-display text-2xl text-umber">
            {product.price}
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl mb-3 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-umber/75 mb-4 max-w-xl">{product.copy}</p>
        {product.features && (
          <ul className="grid sm:grid-cols-3 gap-2 mb-5">
            {product.features.map((f) => (
              <li
                key={f}
                className="text-xs text-umber/70 bg-umber/5 rounded-lg px-3 py-2"
              >
                {f}
              </li>
            ))}
          </ul>
        )}
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
