import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { RwandaMaps } from "@/components/RwandaMaps";

const COUNTRIES = [
  { id: "kenya", label: "Kenya" },
  { id: "rwanda", label: "Rwanda" },
] as const;
type Country = (typeof COUNTRIES)[number]["id"];

export const Route = createFileRoute("/forage-maps")({
  validateSearch: (s: Record<string, unknown>): { country?: Country } =>
    COUNTRIES.some((c) => c.id === s.country) && s.country !== "kenya" ? { country: s.country as Country } : {},
  head: () => ({
    meta: [
      { title: "Bee Intelligence Maps — Beelove Farm" },
      {
        name: "description",
        content:
          "Bee maps for Kenya and Rwanda: seasonal rain outlook, forage timeline and beekeeping suitability. Pick your country.",
      },
      { property: "og:title", content: "Bee Intelligence Maps — Beelove Farm" },
      {
        property: "og:description",
        content:
          "Bee maps for Kenya and Rwanda — rain outlook, forage and suitability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://beelovefarm.org/forage-maps" },
    ],
  }),
  component: ForageMapsPage,
});

type LegendItem = { color: string; label: string };

const WET_LEGEND: LegendItem[] = [
  { color: "#8c510a", label: "Drier than usual" },
  { color: "#f5f0e6", label: "About usual" },
  { color: "#7fcdbb", label: "Wetter" },
  { color: "#08589e", label: "Much wetter" },
];

const FORAGE_LEGEND: LegendItem[] = [
  { color: "#d73027", label: "Very poor" },
  { color: "#fee08b", label: "Moderate" },
  { color: "#91cf60", label: "Good" },
  { color: "#1a9850", label: "Excellent" },
];

function MapPanel({
  title,
  blurb,
  image,
  alt,
  legend,
  caption,
  liveUrl,
}: {
  title: string;
  blurb: string;
  image: string;
  alt: string;
  legend: LegendItem[];
  caption: string;
  liveUrl?: string;
}) {
  const [live, setLive] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10 md:mt-14">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl text-umber mb-3">
          {title}
        </h2>
        <p className="text-umber/75">{blurb}</p>
      </div>

      <div className="mt-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
        {live && liveUrl ? (
          <iframe
            src={liveUrl}
            title={title}
            className="w-full block"
            style={{ minHeight: 600, border: "none" }}
          />
        ) : (
          <div className="p-6 md:p-10">
            <img
              src={image}
              alt={alt}
              width={823}
              height={1000}
              loading="lazy"
              className="w-full max-w-[440px] mx-auto block"
            />
            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {legend.map((l) => (
                <span
                  key={l.label}
                  className="inline-flex items-center gap-2 text-xs text-umber/70"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-sm ring-1 ring-umber/15"
                    style={{ background: l.color }}
                  />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-xs text-umber/60">{caption}</p>
        {liveUrl && !live && (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="text-xs font-medium text-umber underline underline-offset-4 hover:text-honey"
          >
            Open the interactive map
          </button>
        )}
      </div>
    </section>
  );
}

function ForageMapsPage() {
  const country: Country = Route.useSearch().country ?? "kenya";
  const navigate = useNavigate({ from: "/forage-maps" });
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
            {country === "kenya"
              ? "Satellite maps showing where bees can forage across Kenya — now, ahead, and long-term."
              : "Will this season's rains be wetter or drier than usual where your bees are, and how far can you trust that?"}
          </p>
          <label className="mt-6 inline-flex items-center gap-3 text-sm text-cream/85">
            Country
            <select
              value={country}
              onChange={(e) =>
                navigate({ search: e.target.value === "kenya" ? {} : { country: e.target.value as Country }, replace: true })
              }
              className="rounded-full bg-honey text-umber font-medium px-4 py-2 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cream"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {country === "rwanda" ? <RwandaMaps /> : (<>

      <MapPanel
        title="Season Ahead — October to December 2026"
        blurb="How this season's rainfall compares with the last 44 years, place by place. Built and tested on four decades of satellite rainfall records. Rain is the biggest driver of forage in Kenya's drylands, so a wetter season usually means a stronger bloom behind it."
        image="/images/map-forecast-ond-2026.png"
        alt="Map of Kenya showing the chance of above-normal rainfall for October to December 2026. Every part of the country is above the usual one-in-three chance, strongest in the north and north-east."
        legend={WET_LEGEND}
        caption="Chance of above-normal rainfall, October–December 2026. Tested against every year since 1982: this forecast beats a long-term average across 97% of Kenya. Read it alongside the Kenya Meteorological Department forecast."
      />

      <MapPanel
        title="Forage Timeline"
        blurb="Where bees can forage across Kenya, month by month — satellite-observed greenness for months already past, and a modelled outlook for the months ahead. Red diamonds on the interactive version mark the strongest flush each month."
        image="/images/map-forage-sep-2026.png"
        alt="Map of Kenya showing modelled forage levels for September 2026, mostly amber and orange at the end of the dry season."
        legend={FORAGE_LEGEND}
        caption="September 2026, modelled. The interactive version has a 15-month slider but is slow, and may not load when the satellite service is busy."
        liveUrl="https://project-8ed4c563-3539-4c49-9b3.projects.earthengine.app/view/beelove-forage-timeline"
      />

      <MapPanel
        title="Beekeeping Suitability"
        blurb="Where bees thrive long-term across Kenya — from rainfall, temperature, elevation and vegetation, adjusted for urbanisation, farming, deforestation and light pollution. This is the map to check before deciding whether a place is worth putting hives in at all."
        image="/images/map-suitability.png"
        alt="Map of Kenya showing long-term beekeeping suitability, green through the south, west and coastal hinterland, orange across the arid north and north-east."
        legend={FORAGE_LEGEND}
        caption="Long-term baseline. It changes slowly, so it does not need refreshing each season."
        liveUrl="https://project-8ed4c563-3539-4c49-9b3.projects.earthengine.app/view/beelove-suitability"
      />

      {/* How to read these */}
      <section className="max-w-7xl mx-auto px-6 mt-14 md:mt-20 mb-16 md:mb-24">
        <div className="rounded-[28px] bg-card ring-1 ring-umber/10 p-8 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl text-umber mb-6">
            How to read these maps
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl text-umber mb-2">
                Start with suitability
              </h3>
              <p className="text-sm text-umber/75">
                It answers one question: is this place worth keeping bees in at
                all? Long-run conditions, minus the things that spoil a site.
                Check it before you invest in hives.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">
                Then the season ahead
              </h3>
              <p className="text-sm text-umber/75">
                Is the coming season better or worse than usual here? We can say
                this roughly six weeks before the rains break — not earlier. We
                tested it, and four months ahead there is no useful signal.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">
                Your own calendar still rules
              </h3>
              <p className="text-sm text-umber/75">
                A wet season means different months in different places. On the
                coast the main bloom follows the long rains around April; in the
                south-east it follows the short rains. The Beelove app gives the
                month-by-month version for your county.
              </p>
            </div>
          </div>

          <p className="text-xs text-umber/55 mt-8 max-w-3xl">
            What we can and cannot claim: the rainfall forecast is tested
            against 44 years of records and we publish how well it scores. The
            step from rainfall to what a colony actually collects is not yet
            measured — that work is underway with farmers keeping records.
            Treat these maps as a guide alongside what you can see in your own
            field, never as a replacement for it.
          </p>
        </div>
      </section>
      </>)}
    </SiteLayout>
  );
}
