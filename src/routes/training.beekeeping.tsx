import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import trainingCommunity from "@/assets/training-community.jpg";
import trainingOutdoor from "@/assets/training-outdoor-2.jpg";
import trainingCircle from "@/assets/training-circle.jpg";
import beekeeperApiary from "@/assets/beekeeper-apiary.jpg";

const COURSE_IMAGES = [beekeeperApiary, trainingCommunity, trainingOutdoor, trainingCircle];

export const Route = createFileRoute("/training/beekeeping")({
  head: () => ({
    meta: [
      { title: "Beekeeping Training — Beelove Farm, Makueni" },
      {
        name: "description",
        content:
          "Practical, hands-on beekeeping courses at Beelove Farm: Introduction, Hive Making, Advanced Colony Management, and group bookings.",
      },
    ],
  }),
  component: TrainingBeekeepingPage,
});

const COURSES = [
  {
    badge: "Beginner",
    title: "Introduction to Beekeeping",
    days: "3 Days",
    max: "Max 15",
    price: "KSH 5,000",
    copy: "Everything you need to start your first hive — bee biology, hive types, protective gear, colony installation and basic pest management.",
    points: [
      "Bee biology and behaviour",
      "KTBH, Langstroth & Log Hive",
      "Protective gear and safe handling",
      "Colony installation",
      "Basic honey harvesting",
    ],
    tone: "honey" as const,
  },
  {
    badge: "Most Popular",
    title: "Hive Making Workshop",
    days: "2 Days",
    max: "Max 12",
    price: "KSH 3,500",
    copy: "Build your own KTBH hive from scratch. Learn timber selection, measurements, joinery and finishing — you take home the hive you build.",
    points: [
      "Timber sourcing and selection",
      "KTBH measurements & design",
      "Carpentry and joinery",
      "Finishing, painting, mounting",
      "Take home your completed hive",
    ],
    tone: "amber" as const,
  },
  {
    badge: "Advanced",
    title: "Advanced Colony Management",
    days: "2 Days",
    max: "Max 15",
    price: "KSH 4,500",
    copy: "For beekeepers with at least one season's experience. Queen rearing, swarm control, disease diagnosis and honey processing.",
    points: [
      "Queen rearing techniques",
      "Swarm prevention & capture",
      "Common diseases & treatment",
      "Hygienic extraction & bottling",
      "Record keeping for commercial apiaries",
    ],
    tone: "honey" as const,
  },
  {
    badge: "Groups",
    title: "Group & NGO Training",
    days: "Flexible",
    max: "20+ pax",
    price: "Contact for quote",
    copy: "We travel to your location. Ideal for women's groups, youth programmes, county extension and NGO projects.",
    points: [
      "Customised programme",
      "We bring equipment & demo hives",
      "Certificates for all participants",
      "Available across Kenya",
    ],
    tone: "amber" as const,
  },
];

const WHY = [
  ["🐝", "Live Hive Practice", "Suit up, inspect, and harvest under expert guidance."],
  ["🧑‍🏫", "Expert Instructors", "Years in the field, 100+ hives managed across Makueni."],
  ["📋", "Certificate", "Useful for county extension and grant applications."],
  ["🤝", "Alumni Support", "WhatsApp group with pest alerts and seasonal tips."],
] as const;

function TrainingBeekeepingPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-umber text-cream overflow-hidden ring-1 ring-black/5 grid md:grid-cols-12 min-h-[320px]">
          <div className="md:col-span-7 p-10 md:p-14">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
              Beekeeping Training
            </span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">
              Learn beekeeping<br />at the farm
            </h1>
            <p className="max-w-md text-cream/85">
              Practical, hands-on courses for beginners and experienced
              beekeepers — held at Beelove Farm, Makueni County.
            </p>
          </div>
          <div className="md:col-span-5 min-h-[200px]">
            <img
              src={trainingCommunity}
              alt="Beelove trainer leading a beekeeping class in Makueni"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map(([icon, title, copy]) => (
            <div
              key={title}
              className="bg-honey/25 ring-1 ring-umber/10 rounded-[24px] p-6"
            >
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-xs text-umber/75 leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="mb-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
            Our Programs
          </span>
          <h2 className="font-display text-4xl mt-2">Choose your course</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {COURSES.map((c, i) => (
            <article
              key={c.title}
              className="bg-card ring-1 ring-umber/10 rounded-[24px] overflow-hidden flex flex-col"
            >
              <div className="h-40">
                <img
                  src={COURSE_IMAGES[i]}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest bg-amber text-cream px-2.5 py-1 rounded-full">
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
                  className="mt-auto bg-amber text-cream text-xs font-semibold uppercase tracking-widest px-4 py-3 rounded-full hover:bg-umber transition-colors text-center"
                >
                  Book via WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-5 bg-amber text-cream rounded-[24px] p-10">
            <h2 className="font-display text-3xl mb-3">Bring your team</h2>
            <p className="text-sm text-cream/90 mb-6">
              Custom group training for cooperatives, NGOs, county extension
              offices and CSR teams. We can come to your location.
            </p>
            <ul className="text-xs space-y-2 mb-6">
              <li>✔ Minimum 10 participants</li>
              <li>✔ Customised curriculum</li>
              <li>✔ On-site delivery (Makueni & surrounding counties)</li>
              <li>✔ 15% off per head for 15+ participants</li>
            </ul>
            <a
              href={wa("Hello Beelove Farm, I'm interested in group training.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-cream text-amber text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-umber hover:text-cream transition-colors"
            >
              Enquire about group training
            </a>
          </div>
          <div className="md:col-span-7 bg-card ring-1 ring-umber/10 rounded-[24px] p-10">
            <h3 className="font-display text-2xl mb-6">Frequently asked</h3>
            <dl className="space-y-5">
              {[
                ["When are the next dates?", "Training runs throughout the year. WhatsApp us for the current schedule."],
                ["Do I need to bring anything?", "Just yourself and comfortable clothes. We provide all tools and gear."],
                ["Is accommodation available?", "We can recommend affordable guesthouses nearby — mention it when booking."],
                ["Can I combine two programs?", "Yes — book Beginner + Hive Making back-to-back for a 5-day intensive at 10% off."],
              ].map(([q, a]) => (
                <div key={q}>
                  <dt className="font-semibold text-umber">{q}</dt>
                  <dd className="text-sm text-umber/75 mt-1">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-umber text-cream rounded-[28px] p-10 md:p-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-3">
            Ready to book?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Message us on WhatsApp with your name, the program and preferred
            dates — we'll confirm within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={wa("Hello Beelove Farm, I'd like to book a training program.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-honey hover:text-umber transition-colors"
            >
              Book via WhatsApp
            </a>
            <Link
              to="/shop/beekeeping"
              className="border border-cream/30 text-cream px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-cream/10 transition-colors"
            >
              Shop beekeeping
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
