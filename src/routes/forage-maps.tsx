import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/forage-maps")({
  head: () => ({
    meta: [
      { title: "Bee Intelligence Maps — Beelove Farm" },
      {
        name: "description",
        content:
          "Satellite maps showing where bees can forage across Kenya — now, ahead, and long-term. Forage timeline and beekeeping suitability intelligence.",
      },
      { property: "og:title", content: "Bee Intelligence Maps — Beelove Farm" },
      {
        property: "og:description",
        content:
          "Satellite maps showing where bees can forage across Kenya — now, ahead, and long-term.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://beelovefarm.lovable.app/forage-maps" },
    ],
  }),
  component: ForageMapsPage,
});

const HOW_TO_READ = [
  {
    title: "Flowering",
    body: "Where the food is now. Satellites detect blooming vegetation; the green areas are where bees are eating today.",
  },
  {
    title: "Migratory route",
    body: "The path to follow the flowers. Flowering moves across Kenya month by month; the yellow line shows where to move hives to stay in the bloom.",
  },
  {
    title: "Forecast",
    body: "A head start. Rain now means blooms soon, so the map predicts where flowering will be 1–3 months ahead — move hives before the bloom, not after.",
  },
];

function MapCaption() {
  return (
    <p className="text-xs text-umber/60 mt-3">
      This map may take a few seconds to load.
    </p>
  );
}

function ForageMapsPage() {
  return (
    <SiteLayout>
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-umber text-cream overflow-hidden ring-1 ring-black/5 p-8 md:p-14">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
            Bee Intelligence
          </span>
          <h1 className="font-display text-4xl md:text-6xl mt-3 mb-4 leading-tight">
            Beelove Bee Intelligence Maps
          </h1>
          <p className="max-w-2xl text-cream/85 text-lg">
            Satellite maps showing where bees can forage across Kenya — now,
            ahead, and long-term.
          </p>
        </div>
      </section>

      {/* Forage Timeline */}
      <section className="max-w-7xl mx-auto px-6 mt-10 md:mt-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl text-umber mb-3">
            Forage Timeline
          </h2>
          <p className="text-umber/75">
            Where bees can forage across Kenya, month by month — the observed
            past and a 1–3 month forecast, with the optimal migratory route.
          </p>
        </div>
        <div className="mt-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
          <iframe
            src="https://project-8ed4c563-3539-4c49-9b3.projects.earthengine.app/view/beelove-forage-timeline"
            title="Beelove Forage Timeline"
            className="w-full block"
            style={{ minHeight: 600, border: "none" }}
            loading="lazy"
          />
        </div>
        <MapCaption />
      </section>

      {/* Beekeeping Suitability */}
      <section className="max-w-7xl mx-auto px-6 mt-10 md:mt-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl text-umber mb-3">
            Beekeeping Suitability
          </h2>
          <p className="text-umber/75">
            Where bees thrive long-term across Kenya — from rainfall,
            temperature, elevation and vegetation, adjusted for urbanisation,
            farming, deforestation and light pollution.
          </p>
        </div>
        <div className="mt-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
          <iframe
            src="https://project-8ed4c563-3539-4c49-9b3.projects.earthengine.app/view/beelove-suitability"
            title="Beelove Beekeeping Suitability"
            className="w-full block"
            style={{ minHeight: 600, border: "none" }}
            loading="lazy"
          />
        </div>
        <MapCaption />
      </section>

      {/* How to read the maps */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-16 mb-16">
        <h2 className="font-display text-3xl md:text-4xl text-umber mb-6">
          How to read the maps
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {HOW_TO_READ.map((c) => (
            <div
              key={c.title}
              className="rounded-[24px] bg-olive/10 ring-1 ring-umber/10 p-6"
            >
              <h3 className="font-display text-xl text-umber mb-2">{c.title}</h3>
              <p className="text-sm text-umber/75 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-umber/60 mt-6 italic">
          The forecast is a model — use it alongside what you see in the field.
        </p>
      </section>
    </SiteLayout>
  );
}
