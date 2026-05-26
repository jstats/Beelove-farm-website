import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/hive-sensors")({
  head: () => ({
    meta: [
      { title: "Hive Sensors & Field Data Collector — Beelove Farm" },
      {
        name: "description",
        content:
          "Beelove Farm's field data collector — a mobile-first tool for recording hive inspections, sensor readings, and apiary health across Makueni County.",
      },
      { property: "og:title", content: "Hive Sensors — Beelove Farm" },
      {
        property: "og:description",
        content:
          "Mobile field data collector for hive inspections and sensor readings.",
      },
    ],
  }),
  component: SensorsPage,
});

function SensorsPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-amber text-cream overflow-hidden ring-1 ring-black/5 p-10 md:p-14">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/80">
            Pilot · Field Tool
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">
            Hive sensors &<br />field data collector
          </h1>
          <p className="max-w-2xl text-cream/90">
            A mobile-first inspection tool we use to log hive health,
            temperature, weight and forage data — preview the collector
            below.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-6 mb-14">
        <div className="rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
          <iframe
            src="/embeds/field-collector.html"
            title="Beelove Field Data Collector"
            className="w-full h-[80vh] min-h-[600px] block border-0"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
