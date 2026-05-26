import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { wa } from "@/lib/site";
import fishImg from "@/assets/fish-tilapia-harvest.jpg";

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
};

const SECTIONS: {
  id: string;
  title: string;
  intro: string;
  items: Product[];
  accent: "teal" | "amber";
}[] = [
  {
    id: "fingerlings",
    title: "Catfish Fingerlings",
    accent: "teal",
    intro:
      "African Catfish (Clarias gariepinus) — disease-screened, size-graded, and ready for pond stocking.",
    items: [
      {
        name: "Catfish Fingerlings (100 pcs)",
        tag: "Fingerlings",
        price: "KSH 2,000 · KSH 20 each",
        copy: "100 healthy fingerlings, size-graded for uniformity and transported in oxygenated bags.",
        features: ["Size 5–8cm at delivery", "Oxygenated transport bags", "Free pond stocking advisory"],
      },
      {
        name: "Catfish Fingerlings (500 pcs)",
        tag: "Fingerlings",
        price: "KSH 9,000 · KSH 18 each",
        copy: "Bulk order for medium-scale pond stocking. Discounted rate with priority delivery.",
        features: ["Size 5–8cm at delivery", "Multiple oxygenated bags", "On-farm pond check available"],
      },
      {
        name: "Catfish Fingerlings (1,000 pcs)",
        tag: "Fingerlings",
        price: "KSH 16,000 · KSH 16 each",
        copy: "Commercial-scale order. Best price per fingerling, includes free Makueni delivery.",
        features: ["Free delivery in Makueni", "Dedicated after-sales support", "Restock guarantee at 3 months"],
      },
    ],
  },
  {
    id: "tilapia",
    title: "Tilapia Fingerlings",
    accent: "teal",
    intro:
      "Nile Tilapia (Oreochromis niloticus) — fast-growing and ideal for integrated farming.",
    items: [
      {
        name: "Tilapia Fingerlings (100 pcs)",
        tag: "Tilapia",
        price: "KSH 1,500 · KSH 15 each",
        copy: "Fast-growing, disease-resistant, suitable for mixed-sex stocking.",
        features: ["Size 4–6cm at delivery", "Mixed sex, male-dominated", "Harvest in 5–7 months"],
      },
      {
        name: "Tilapia Fingerlings (500 pcs)",
        tag: "Tilapia",
        price: "KSH 6,500 · KSH 13 each",
        copy: "Bulk order for medium-to-large pond operations. Includes free Makueni delivery and a pond management guide.",
      },
    ],
  },
  {
    id: "azolla",
    title: "Azolla & Feed",
    accent: "amber",
    intro:
      "Azolla is a floating fern that doubles as a high-protein fish feed — cutting feed costs by up to 40%.",
    items: [
      {
        name: "Azolla Starter Kit",
        tag: "Feed",
        price: "KSH 500",
        copy: "Live Azolla culture with setup guide. Grows rapidly in a basin or shallow pond — producing free protein-rich feed within 2 weeks.",
        features: ["Live culture (1kg)", "Setup and care guide", "25–35% crude protein"],
      },
      {
        name: "Azolla + Pond Advisory",
        tag: "Feed",
        price: "KSH 2,500",
        copy: "Azolla kit plus a one-hour on-farm advisory: pond setup, feeding schedules, water quality, harvest planning.",
      },
    ],
  },
];

function ShopFishPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-teal text-cream overflow-hidden ring-1 ring-black/5 grid md:grid-cols-12 min-h-[320px]">
          <div className="md:col-span-7 p-10 md:p-14">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/80">
              Aquaculture
            </span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">
              Shop fish farming
            </h1>
            <p className="max-w-md text-cream/90">
              Premium fingerlings, Azolla kits and pond advisory — from our
              farm in Makueni to yours.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 text-center">
              {[
                ["KSH 20", "Per Catfish"],
                ["100+", "Min. Order"],
                ["~6 mo", "To Harvest"],
                ["🚚", "Makueni & Nairobi"],
              ].map(([v, l]) => (
                <div key={l} className="bg-cream/10 rounded-2xl px-3 py-3">
                  <div className="font-display text-xl">{v}</div>
                  <div className="text-[9px] uppercase tracking-widest text-cream/70 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 min-h-[200px]">
            <img src={fishImg} alt="Fresh tilapia harvest from Beelove pond" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-7xl mx-auto px-6 mt-12 scroll-mt-20"
        >
          <div className="mb-6">
            <span
              className={
                "text-[10px] font-medium uppercase tracking-[0.2em] " +
                (section.accent === "teal" ? "text-teal" : "text-amber")
              }
            >
              Category
            </span>
            <h2 className="font-display text-4xl mt-2">{section.title}</h2>
            <p className="text-sm text-umber/70 mt-1 max-w-2xl">
              {section.intro}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {section.items.map((p) => (
              <ProductCard key={p.name} product={p} accent={section.accent} />
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-14">
        <div className="bg-teal text-cream rounded-[28px] p-10 md:p-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Ready to start your fish farm?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Talk to us about pond setup, fingerling delivery, and the training
            you need to run a profitable aquaculture operation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
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
      </section>
    </SiteLayout>
  );
}

function ProductCard({
  product,
  accent,
}: {
  product: Product;
  accent: "teal" | "amber";
}) {
  const message = `Hello Beelove Farm, I'd like to order: ${product.name}.`;
  const tagClr = accent === "teal" ? "text-teal" : "text-amber";
  const btnClr =
    accent === "teal" ? "bg-teal hover:bg-umber" : "bg-amber hover:bg-umber";
  return (
    <article className="bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform">
      <div className="h-44">
        {accent === "teal" ? (
          <img src={fishImg} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Placeholder label={product.name} tone={accent} />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.18em] ${tagClr} mb-2`}
        >
          {product.tag}
        </span>
        <h3 className="font-display text-xl mb-2 leading-snug">{product.name}</h3>
        <p className="text-sm text-umber/75 mb-4">{product.copy}</p>
        {product.features && (
          <ul className="text-xs text-umber/70 space-y-1 mb-4">
            {product.features.map((f) => (
              <li key={f}>✔ {f}</li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-umber/10">
          <span className="font-display text-base text-umber">
            {product.price}
          </span>
          <a
            href={wa(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnClr} text-cream text-[10px] font-semibold uppercase tracking-widest px-3 py-2 rounded-full transition-colors`}
          >
            Order
          </a>
        </div>
      </div>
    </article>
  );
}
