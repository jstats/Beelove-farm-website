import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import { ArrowRight, ChevronDown } from "lucide-react";
import hero1 from "@/assets/beelove-honey-comb.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";

import fishImg from "@/assets/fish-farmer-tilapia.jpg";
import catfishHeroImg from "@/assets/fish-catfish-large-hero-sharp.jpg";
import tilapiaPlatterImg from "@/assets/fish-tilapia-platter.jpg";
import hiveStandImg from "@/assets/hive-stand.jpg";
import honeycombImg from "@/assets/honeycomb-closeup.jpg";
import honeyProductsImg from "@/assets/honey-products.jpg";
import training2 from "@/assets/training2.jpg";
import prodHoney1kg from "@/assets/prod-honey-1kg.jpg";
import mapLandscapeImg from "@/assets/map-acacia-landscape.jpg";
import trainingCommunity from "@/assets/training-community.jpg";
import trainingCircle from "@/assets/training-circle.jpg";
import beekeeperApiary from "@/assets/beekeeper-apiary.jpg";
import beeShopFront from "@/assets/bee-shop-front.jpg";
import catfishHarvestFresh from "@/assets/catfish-harvest-fresh.jpg";
import honeyBottleKenya from "@/assets/prod-honey-bottle-kenya.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beelove Farm — Premium Honey & Aquaculture" },
      {
        name: "description",
        content:
          "Beelove Farm produces premium raw honey, catfish & tilapia fingerlings, beekeeping equipment, training and aquaculture products — shipped worldwide.",
      },
      { property: "og:title", content: "Beelove Farm" },
      { property: "og:description", content: "Climate-smart beekeeping & fish farming, delivered worldwide." },
    ],
    links: [{ rel: "preload", as: "image", href: hero1 }],
  }),
  component: HomePage,
});

const SLIDES = [
  { src: hero1, alt: "Fresh Beelove honeycomb harvest" },
  { src: fishImg, alt: "Fresh tilapia harvest" },
  { src: catfishHeroImg, alt: "Farmer holding a large African catfish" },
  { src: hero2, alt: "Beelove branded hive" },
  { src: tilapiaPlatterImg, alt: "Fresh tilapia served on a platter" },
  { src: hiveStandImg, alt: "Hive stand in apiary" },
   { src: hero3, alt: "Beelove farm landscape" },
];

const STATS = [
  { value: "120+", label: "Beehives Managed", tone: "amber" },
  { value: "500+", label: "Fingerlings Sold", tone: "teal" },
  { value: "80+", label: "Farmers Trained", tone: "amber" },
  { value: "5 yrs", label: "In Operation", tone: "amber" },
] as const;

const PILLARS = [
  { icon: "🐝", title: "Bee-Friendly Apiaries", copy: "No chemicals, no rush. Our bees forage diverse native flora and thrive on their own terms." },
  { icon: "🐟", title: "Clean-Water Aquaculture", copy: "Fish raised in clean, oxygenated ponds with Azolla as natural feed — healthy fish, lower costs, zero pollution." },
  { icon: "🌿", title: "Azolla Integration", copy: "We grow Azolla — a floating fern that doubles as high-protein fish feed, cutting feed costs by up to 40%." },
  { icon: "🎓", title: "Farmer Empowerment", copy: "We don't just sell products. We train farmers to be self-sufficient — from first hive to first harvest." },
];

const TESTIMONIALS = [
  { initials: "JM", name: "James Mutua", place: "Mbooni, Makueni", quote: "I attended the beginner training and set up my first two KTBH hives the very next week. By the third month I had my first harvest. Beelove really changed my life." },
  { initials: "GW", name: "Grace Wambua", place: "Kibwezi, Makueni", quote: "The catfish fingerlings I got from Beelove were healthy and grew so fast. I stocked 200 and harvested within six months. I'm already planning my second batch." },
  { initials: "PN", name: "Peter Nzomo", place: "Machakos Town", quote: "The honey quality is exceptional — my customers keep asking for more. I now buy in bulk and resell. The team is very responsive on WhatsApp." },
];

const VIDEOS = [
  { id: "Ze-ccaGRAdw", title: "Welcome to Beelove Apiaries" },
  { id: "PyUev1oTdzU", title: "How To Harvest Fresh Honey" },
  { id: "hNpSLPfqXUM", title: "Training for Beekeepers" },
  { id: "KyqkpklknLc", title: "CEO Masterclass: Starting Beekeeping" },
];

function HomePage() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <SiteLayout>
      {/* HERO SLIDESHOW */}
      <section
        className="relative h-[88vh] min-h-[560px] overflow-hidden bg-honey"
        style={{ backgroundColor: "#e8b84a" }}
      >
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i === slide ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-umber/60 via-umber/40 to-umber/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-cream">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/25 border border-amber/40 text-honey text-xs font-medium uppercase tracking-[0.18em] mb-6">
            🌿 Climate-smart farming · Worldwide
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6 max-w-4xl text-balance">
            Welcome to<br />
            <em className="text-honey">Beelove Farm</em>
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-cream/90 text-pretty mb-8">
            Where honey meets the harvest. We practice sustainable beekeeping and fish farming —
            working with nature to nourish families, train farmers, and build a better future for agriculture.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#welcome" className="bg-amber text-cream text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-honey hover:text-umber transition-colors">
              Discover Our Farm
            </a>
            <Link to="/contact" className="border border-cream/40 text-cream text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-cream/10 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/70 text-[10px] uppercase tracking-[0.2em]">
          <span>Scroll</span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-honey" : "w-1.5 bg-cream/50"}`}
            />
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-umber text-cream">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className={`font-display text-4xl md:text-5xl ${s.tone === "teal" ? "text-teal" : "text-honey"}`}>{s.value}</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-cream/70 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WELCOME + PHILOSOPHY */}
      <section id="welcome" className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">🌱 Our Philosophy</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-tight">
              Farming With Nature,<br />Not Against It
            </h2>
            <div className="space-y-4 text-umber/80 text-pretty">
              <p>At Beelove Farm, sustainability is not a slogan — it is how we work every day. Our bees pollinate the land, our fish enrich the ecosystem, and our farmers learn to produce more while taking less from the earth.</p>
              <p>We believe the healthiest food comes from the healthiest land. That is why every hive is placed where bees can forage freely, and every pond is fed with Azolla — a natural, protein-rich plant that replaces expensive commercial feeds and keeps our water clean.</p>
              <p>From our home farm to growers around the world, Beelove Farm is proving that sustainable agriculture is not just better for the planet — it is better for business too.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="bg-card ring-1 ring-umber/10 rounded-[20px] p-6">
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h4 className="font-display text-lg mb-2">{p.title}</h4>
                <p className="text-sm text-umber/70 leading-relaxed">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE CARDS */}
      <section className="bg-umber/95 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 text-cream">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">Choose Your Path</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">What Brings You Here Today?</h2>
            <p className="text-cream/80 max-w-2xl mx-auto">Whether you're drawn to the world of bees or the promise of fish farming — we have the products, training, and expertise to help you succeed.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <EnterpriseCard
              tone="amber"
              icon="🍯"
              title="Beekeeping"
              copy="Raw honey, hives, protective gear, tools, and honey processing equipment — plus expert training programs from beginner to advanced."
              image={hero2}
              imageAlt="Beelove branded hive"
              shopHref="/shop/beekeeping"
              trainHref="/training/beekeeping"
              shopLabel="🛒 Shop Beekeeping"
              trainLabel="🎓 Attend Training"
            />
            <EnterpriseCard
              tone="teal"
              icon="🐟"
              title="Fish Farming"
              copy="Premium catfish and tilapia fingerlings, Azolla starter kits, and fish farming training — everything to start or grow your aquaculture operation."
              image={fishImg}
              imageAlt="Fresh tilapia harvest at Beelove Farm"
              shopHref="/shop/fish"
              trainHref="/training/fish"
              shopLabel="🛒 Shop Fish Products"
              trainLabel="🎓 Attend Training"
            />
          </div>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">Our Story</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-tight">
              Rooted in the Land,<br />Guided by the Bee
            </h2>
            <div className="space-y-4 text-umber/80 text-pretty">
              <p>Beelove Farm was born from a deep respect for nature and a passion for sustainable farming. We work with the land — not against it — to produce raw honey of exceptional quality and raise healthy catfish fingerlings for a growing global aquaculture sector.</p>
              <p>Every jar of honey tells a story of diverse flora, clean water, and bees allowed to thrive on their own terms. Every fingerling is raised in clean water, ready to grow strong on your farm.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 mt-6 bg-teal text-cream text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-amber transition-colors">
              Get in Touch <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-[24px] overflow-hidden ring-1 ring-umber/10">
              <img src={hero1} alt="Fresh Beelove honeycomb frame" className="w-full h-[420px] object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card ring-1 ring-umber/10 rounded-2xl px-4 py-3 text-xs flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🐟</span>
              <div>
                <div className="font-semibold">Aquaculture</div>
                <div className="text-umber/60">Catfish · Azolla</div>
              </div>
            </div>
            <div className="absolute top-6 -right-4 bg-card ring-1 ring-umber/10 rounded-2xl px-4 py-3 text-xs flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🎓</span>
              <div>
                <div className="font-semibold">Training</div>
                <div className="text-umber/60">Hands-on Programs</div>
              </div>
            </div>
            <div className="absolute -bottom-4 right-12 bg-card ring-1 ring-umber/10 rounded-2xl px-4 py-3 text-xs flex items-center gap-3 shadow-sm">
              <span className="text-2xl">🗺️</span>
              <div>
                <div className="font-semibold">Research</div>
                <div className="text-umber/60">Suitability Mapping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP TEASER */}
      <section className="bg-honey/20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[24px] overflow-hidden ring-1 ring-umber/10 order-2 md:order-1">
            <img src={mapLandscapeImg} alt="Beelove farm landscape" className="w-full h-[360px] object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">🗺️ Research Tool</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-tight">
              Hive Suitability<br />Mapping
            </h2>
            <p className="text-umber/80 mb-4">Beelove Farm developed a data-driven suitability map — visualising vegetation density, flora, water sources, and existing hive locations to help identify the best sites for new apiaries.</p>
            <p className="text-umber/80 mb-6">Field data is collected by our team using GPS-enabled forms and synced live to the map. Open to farmers, NGOs, and county extension officers.</p>
            <Link to="/map" className="inline-flex items-center gap-2 bg-teal text-cream text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-amber transition-colors">
              Open the Map <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">❤️ From Our Customers</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Farmers Who Trust Beelove</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card ring-1 ring-umber/10 rounded-[24px] p-8">
                <p className="text-umber/85 italic mb-6 text-pretty">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-umber/10">
                  <div className="size-11 rounded-full bg-amber/20 grid place-items-center font-display text-amber">{t.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-umber/60">{t.place}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-honey/15 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">Our Farm in Pictures</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-3">See Beelove in Action</h2>
            <p className="text-umber/75 max-w-2xl mx-auto">Real moments from our apiaries, training sessions, and honey harvests.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
            <div className="row-span-2 rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={beekeeperApiary} alt="Beelove beekeeper inspecting hive" className="w-full h-full object-cover" /></div>
            <div className="rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={trainingCommunity} alt="Community beekeeping training in the field" className="w-full h-full object-cover" /></div>
            <div className="rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={catfishHarvestFresh} alt="Fresh catfish harvest" className="w-full h-full object-cover" /></div>
            <div className="rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={honeycombImg} alt="Honeycomb" className="w-full h-full object-cover" /></div>
            <div className="col-span-2 rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={trainingCircle} alt="Women farmers gathered for beekeeping training" className="w-full h-full object-cover" /></div>
            <div className="rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={beeShopFront} alt="Beelove Apiaries shop front" className="w-full h-full object-cover" /></div>
            <div className="rounded-[20px] overflow-hidden ring-1 ring-umber/10"><img src={honeyBottleKenya} alt="Beelove honey bottle, Made in Kenya" className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </section>

      {/* YOUTUBE VIDEOS */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">Watch & Learn</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-3">From Our YouTube Channel</h2>
            <p className="text-umber/75 max-w-2xl mx-auto">Practical beekeeping guides and farm stories — straight from Beelove Apiaries.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VIDEOS.map((v) => (
              <div key={v.id} className="bg-card ring-1 ring-umber/10 rounded-[20px] overflow-hidden">
                <div className="aspect-video bg-umber">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
                <p className="px-4 py-3 text-sm font-medium">{v.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/@beeloveapiarieskenya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-teal text-teal text-sm font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-teal hover:text-cream transition-colors"
            >
              ▶ View All Videos on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-amber text-cream py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-cream/90 mb-8 max-w-2xl mx-auto">Order products, book a training, or just say hello — we're always happy to hear from a fellow farmer.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={wa("Hello Beelove Farm, I'm interested in your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cream text-umber text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-honey transition-colors"
            >
              💬 WhatsApp Us
            </a>
            <Link to="/shop/beekeeping" className="border border-cream/50 text-cream text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-cream/10 transition-colors">
              Browse the Shop
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function EnterpriseCard({
  tone, icon, title, copy, image, imageAlt, shopHref, trainHref, shopLabel, trainLabel,
}: {
  tone: "amber" | "teal";
  icon: string; title: string; copy: string;
  image: string; imageAlt: string;
  shopHref: string; trainHref: string; shopLabel: string; trainLabel: string;
}) {
  const bg = tone === "amber" ? "bg-amber" : "bg-teal";
  const accent = tone === "amber" ? "text-amber" : "text-teal";
  return (
    <div className={`${bg} text-cream rounded-[28px] overflow-hidden ring-1 ring-black/5 flex flex-col`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover object-center" />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <span className="text-4xl mb-3">{icon}</span>
        <h3 className="font-display text-3xl mb-3">{title}</h3>
        <p className="text-sm text-cream/90 mb-6 flex-1">{copy}</p>
        <div className="flex flex-wrap gap-3">
          <Link to={shopHref} className={`bg-cream ${accent} text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber hover:text-cream transition-colors`}>
            {shopLabel}
          </Link>
          <Link to={trainHref} className="border border-cream/50 text-cream text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-cream/10 transition-colors">
            {trainLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
