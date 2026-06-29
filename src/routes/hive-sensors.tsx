import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";

export const Route = createFileRoute("/hive-sensors")({
  head: () => ({
    meta: [
      { title: "Hive Sensors — Coming Soon — Beelove Farm" },
      {
        name: "description",
        content:
          "Beelove Farm is building a smart hive monitoring system with IoT sensors for real-time hive health data. Join the waitlist.",
      },
      { property: "og:title", content: "Hive Sensors — Beelove Farm" },
      { property: "og:description", content: "Smart hive monitoring — coming soon. Join the waitlist." },
    ],
    links: [{ rel: "canonical", href: "https://beelovefarm.lovable.app/hive-sensors" }],
  }),
  component: SensorsPage,
});

const FEATURES = [
  { icon: "🌡️", title: "Temperature Monitoring", copy: "Know instantly if your hive is too hot or too cold. Critical during honey ripening and winter clusters." },
  { icon: "⚖️", title: "Weight Tracking", copy: "Track colony weight daily — detect honey build-up, swarm events, and starvation before they become problems." },
  { icon: "🔊", title: "Acoustic Analysis", copy: "Listen to your bees. Detect queenlessness, swarming intent, or Varroa stress from bee sound patterns." },
  { icon: "💧", title: "Humidity Sensing", copy: "Monitor internal hive humidity to prevent mould, ensure correct honey curing, and optimise ventilation." },
];

function SensorsPage() {
  return (
    <SiteLayout>
      <section className="relative min-h-[88vh] bg-teal text-cream flex items-center justify-center px-6 py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, oklch(0.78 0.16 70 / 0.22) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, oklch(0.45 0.12 200 / 0.55) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-3xl text-center">
          <div className="text-7xl mb-4 animate-pulse">📡</div>
          <span className="inline-block bg-amber text-cream text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
            Coming Soon
          </span>
          <h1 className="font-display text-4xl md:text-6xl mb-5 leading-tight">Smart Hive Monitoring</h1>
          <p className="text-cream/85 text-lg mb-10 max-w-xl mx-auto">
            Beelove Farm is developing an IoT sensor system that gives beekeepers real-time
            visibility into their hive health — from anywhere, on any device.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-cream/5 border border-cream/15 rounded-2xl p-5">
                <span className="text-2xl block mb-2">{f.icon}</span>
                <h4 className="font-display text-base mb-1">{f.title}</h4>
                <p className="text-sm text-cream/70">{f.copy}</p>
              </div>
            ))}
          </div>

          <a
            href={wa("Hello Beelove Farm, I'd like to join the waitlist for the Hive Sensors system.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-amber text-cream text-sm font-semibold uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-honey hover:text-umber transition-colors"
          >
            Join the Waitlist via WhatsApp
          </a>
          <p className="mt-4 text-xs text-cream/55">
            We'll notify you when the first units are ready for pilot farmers.
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber">Preview · Field Tool</span>
            <h2 className="font-display text-3xl md:text-4xl mt-2">Field Data Collector</h2>
            <p className="text-umber/70 max-w-2xl mx-auto mt-2 text-sm">
              While the sensors are in development, our team logs hive inspections with this mobile-first tool.
            </p>
          </div>
          <div className="rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
            <iframe
              src="/embeds/field-collector.html"
              title="Beelove Field Data Collector"
              className="w-full h-[80vh] min-h-[600px] block border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
