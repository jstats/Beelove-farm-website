import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { wa } from "@/lib/site";

export const Route = createFileRoute("/training/fish")({
  head: () => ({
    meta: [
      { title: "Fish Farming Training — Beelove Farm, Makueni" },
      {
        name: "description",
        content:
          "Practical fish farming training at Beelove Farm — catfish, tilapia, Azolla integration, pond setup and harvest. Held at our working farm in Makueni.",
      },
    ],
  }),
  component: TrainingFishPage,
});

const COURSES = [
  {
    badge: "Beginner",
    title: "Introduction to Fish Farming",
    days: "2 Days",
    max: "Max 15",
    price: "KSH 4,500",
    copy: "Pond types, species selection (catfish vs tilapia), water quality, feeding and harvest — everything to start your first fish pond.",
    points: [
      "Pond types: earthen, tarpaulin, tank",
      "Catfish vs. tilapia",
      "Stocking densities",
      "Water quality and aeration",
      "Feeding & Azolla integration",
    ],
  },
  {
    badge: "Popular",
    title: "Catfish Production Masterclass",
    days: "3 Days",
    max: "Max 12",
    price: "KSH 6,000",
    copy: "A focused course on African catfish farming — fingerling selection to commercial harvest, including Azolla production.",
    points: [
      "Fingerling quality assessment",
      "Stocking at correct densities",
      "Azolla as free feed supplement",
      "Water quality monitoring",
      "Disease prevention",
      "Grading, harvest, market linkage",
    ],
  },
  {
    badge: "Tilapia",
    title: "Tilapia Farming Course",
    days: "2 Days",
    max: "Max 15",
    price: "KSH 4,500",
    copy: "Tilapia-specific pond management, sex reversal techniques and marketing for one of Kenya's most popular farmed fish.",
    points: [
      "Tilapia biology & growth cycles",
      "Pond preparation",
      "All-male monosex production",
      "Feeding for fast growth",
      "Disease & parasite control",
    ],
  },
  {
    badge: "Groups",
    title: "Group & Community Training",
    days: "Flexible",
    max: "20+ pax",
    price: "Contact for quote",
    copy: "We come to your community, cooperative or project site to deliver practical fish farming training across Kenya.",
    points: [
      "Custom programme for your context",
      "We bring demonstration materials",
      "Certificates for all participants",
      "Available across Kenya",
    ],
  },
];

function TrainingFishPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-teal text-cream overflow-hidden ring-1 ring-black/5 grid md:grid-cols-12 min-h-[320px]">
          <div className="md:col-span-7 p-10 md:p-14">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/80">
              Fish Farming Training
            </span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">
              Learn fish farming<br />at the pond
            </h1>
            <p className="max-w-md text-cream/90">
              Practical training for new and growing fish farmers — pond setup,
              stocking, feeding, water management, and harvest.
            </p>
          </div>
          <div className="md:col-span-5 min-h-[200px]">
            <Placeholder label="Juvenile African catfish" tone="teal" />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-card ring-1 ring-umber/10 rounded-[24px] p-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal">
              Why train with Beelove
            </span>
            <h2 className="font-display text-3xl mt-2 mb-4">
              Learn at a working fish farm
            </h2>
            <p className="text-sm text-umber/80 mb-4">
              Training happens at our actual fish pond in Makueni — real ponds,
              real fish, real challenges. No theory without practice.
            </p>
            <ul className="text-sm text-umber/80 space-y-2">
              <li>✔ All training at our working fish pond</li>
              <li>✔ Hands-on pond management practice</li>
              <li>✔ Certificate of completion</li>
              <li>✔ Post-training WhatsApp support group</li>
              <li>✔ Fingerlings at discount on training day</li>
            </ul>
          </div>
          <div className="md:col-span-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 min-h-[260px]">
            <Placeholder label="Beelove fish pond" tone="teal" />
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="mb-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal">
            Training Programs
          </span>
          <h2 className="font-display text-4xl mt-2">Choose your course</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {COURSES.map((c) => (
            <article
              key={c.title}
              className="bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden flex flex-col"
            >
              <div className="h-40">
                <Placeholder label={c.title} tone="teal" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest bg-teal text-cream px-2.5 py-1 rounded-full">
                    {c.badge}
                  </span>
                  <span className="font-display text-xl text-umber">
                    {c.price}
                  </span>
                </div>
                <h3 className="font-display text-2xl mb-2">{c.title}</h3>
                <p className="text-sm text-umber/75 mb-4">{c.copy}</p>
                <ul className="text-xs text-umber/70 space-y-1 mb-4">
                  {c.points.map((p) => (
                    <li key={p}>✔ {p}</li>
                  ))}
                </ul>
                <div className="text-[11px] text-umber/60 uppercase tracking-widest mb-5 flex flex-wrap gap-3">
                  <span>📅 {c.days}</span>
                  <span>👥 {c.max}</span>
                  <span>📍 Makueni</span>
                </div>
                <a
                  href={wa(
                    `Hello Beelove Farm, I'd like to book: ${c.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-teal text-cream text-xs font-semibold uppercase tracking-widest px-4 py-3 rounded-full hover:bg-umber transition-colors text-center"
                >
                  Book via WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-teal text-cream rounded-[28px] p-10 md:p-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Ready to start fish farming?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Book your training today and get fingerlings at a discount on the
            day of your course.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={wa("Hello Beelove Farm, I'd like to book a fish farming training.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-honey hover:text-umber transition-colors"
            >
              Book via WhatsApp
            </a>
            <Link
              to="/shop/fish"
              className="border border-cream/30 text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-cream/10 transition-colors"
            >
              Shop fish products
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
