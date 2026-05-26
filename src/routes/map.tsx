import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Kenya Beekeeping Suitability Map — Beelove Farm" },
      {
        name: "description",
        content:
          "Interactive suitability map for beekeeping across all 47 Kenya counties — scored by rainfall, temperature, vegetation, water access, urban pressure, elevation, and honey yield.",
      },
      { property: "og:title", content: "Kenya Beekeeping Suitability Map — Beelove Farm" },
      {
        property: "og:description",
        content:
          "Data-driven county scores for beekeeping suitability across Kenya — explore the interactive map.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-umber text-cream overflow-hidden ring-1 ring-black/5 p-10 md:p-14">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
            Research Tool
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">
            Kenya beekeeping<br />suitability map
          </h1>
          <p className="max-w-2xl text-cream/85">
            All 47 counties scored on rainfall, temperature, vegetation,
            water access, urban pressure, elevation and honey yield.
            Click any county to see its breakdown.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-6 mb-14">
        <div className="rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
          <iframe
            src="/embeds/suitability-map.html"
            title="Kenya Beekeeping Suitability Map"
            className="w-full h-[80vh] min-h-[600px] block border-0"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
