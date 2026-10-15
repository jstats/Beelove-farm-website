import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { RWANDA_DISTRICTS, RWANDA_OUTLOOK, type RwandaDistrict } from "@/lib/rwandaOutlook";

const SHARE_IMAGE = "https://beelovefarm.org/images/rwanda-outlook-ond-2026-share.jpg";

export const Route = createFileRoute("/rwanda")({
  head: () => ({
    meta: [
      { title: "Rwanda Rain Outlook, October–December 2026 — Beelove Farm" },
      {
        name: "description",
        content:
          "Will the short rains be wetter or drier than usual in your district? Beelove's October–December 2026 rain outlook for Rwanda, with how far to trust it.",
      },
      { property: "og:title", content: "Rwanda Rain Outlook, October–December 2026 — Beelove Farm" },
      {
        property: "og:description",
        content:
          "District by district: the chance of more or less rain than usual this season, and where the outlook has worked before.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SHARE_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1290" },
      { property: "og:image:alt", content: "Map of Rwanda showing the October–December 2026 rain outlook by area" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://beelovefarm.org/rwanda" }],
  }),
  component: RwandaPage,
});

type LegendItem = { color?: string; label: string; hatch?: boolean };

const HATCH = "repeating-linear-gradient(135deg, #e6e1d8 0 3px, #b8ae9f 3px 4px)";

const OUTLOOK_LEGEND: LegendItem[] = [
  { color: "#8c510a", label: "Drier than usual" },
  { color: "#f5f0e6", label: "About usual" },
  { color: "#7fcdbb", label: "Wetter" },
  { color: "#08589e", label: "Much wetter" },
  { hatch: true, label: "No useful outlook" },
];

const SKILL_LEGEND: LegendItem[] = [
  { hatch: true, label: "No skill" },
  { color: "#cde2fb", label: "Weak ●○○" },
  { color: "#6da7ec", label: "Fair ●●○" },
  { color: "#184f95", label: "Good ●●●" },
];

const pct = (p: number) => `${Math.round(p * 100)}%`;
const sign = (x: number) => (x > 0 ? `+${x.toFixed(3)}` : x.toFixed(3));

function Legend({ items }: { items: LegendItem[] }) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
      {items.map((l) => (
        <span key={l.label} className="inline-flex items-center gap-2 text-xs text-umber/70">
          <span
            className="w-3.5 h-3.5 rounded-sm ring-1 ring-umber/15"
            style={{ background: l.hatch ? HATCH : l.color }}
          />
          {l.label}
        </span>
      ))}
    </div>
  );
}

function Dots({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-1 align-middle" aria-label={`${n} of 3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#2e7d4f]"
          style={{ background: i <= n ? "#2e7d4f" : "transparent" }}
        />
      ))}
    </span>
  );
}

/** The interactive map, sized to its content (the embed posts its height). */
function LiveMap() {
  const [height, setHeight] = useState(1100);
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const d = e.data as { type?: string; id?: string; height?: number } | null;
      if (d && d.type === "beelove-embed-height" && d.id === "rwanda-forecast" && typeof d.height === "number") {
        setHeight(Math.max(600, Math.ceil(d.height) + 4));
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  return (
    <iframe
      src="/embeds/rwanda-forecast.html"
      title="Interactive rain outlook map for Rwanda"
      className="w-full block border-0"
      style={{ height }}
    />
  );
}

function MapPanel({
  title,
  blurb,
  image,
  alt,
  legend,
  caption,
  live,
  extra,
}: {
  title: string;
  blurb: string;
  image: string;
  alt: string;
  legend: LegendItem[];
  caption: string;
  live?: boolean;
  extra?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10 md:mt-14">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl text-umber mb-3">{title}</h2>
        <p className="text-umber/75">{blurb}</p>
      </div>

      <div className="mt-5 rounded-[24px] overflow-hidden ring-1 ring-umber/10 bg-card">
        {open && live ? (
          <LiveMap />
        ) : (
          <div className="p-6 md:p-10">
            <img
              src={image}
              alt={alt}
              width={1225}
              height={1088}
              loading="lazy"
              className="w-full max-w-[640px] mx-auto block"
            />
            <Legend items={legend} />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-xs text-umber/60">{caption}</p>
        {live && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs font-medium text-umber underline underline-offset-4 hover:text-honey"
          >
            Open the interactive map
          </button>
        )}
        {extra}
      </div>
    </section>
  );
}

function DistrictRow({ d }: { d: RwandaDistrict }) {
  return (
    <tr className="border-t border-umber/10">
      <td className="py-2.5 pr-3">
        <span className="font-medium text-umber">{d.name}</span>
        <span className="block text-xs text-umber/55">
          {d.province === "Kigali City" ? "Kigali City" : `${d.province} Province`}
        </span>
      </td>
      {d.outlook ? (
        <>
          <td className="py-2.5 pr-3 font-semibold text-[#1f6f6a]">{pct(d.pAbove)}</td>
          <td className="py-2.5 pr-3 text-umber/75">{pct(d.pBelow)}</td>
          <td className="py-2.5 pr-3 text-umber/75 hidden sm:table-cell">
            ~{d.predMm} <span className="text-umber/45">/ {d.normalMm}</span>
          </td>
        </>
      ) : (
        <td className="py-2.5 pr-3 text-umber/60 text-sm" colSpan={3}>
          No useful outlook. Plan for a usual season (~{d.normalMm} mm)
        </td>
      )}
      <td className="py-2.5">
        <Dots n={d.dots} />
      </td>
    </tr>
  );
}

function RwandaPage() {
  const O = RWANDA_OUTLOOK;
  const withOutlook = RWANDA_DISTRICTS.filter((d) => d.outlook);
  const wetter = withOutlook.filter((d) => d.pAbove >= 0.5).length;
  const noOutlook = RWANDA_DISTRICTS.filter((d) => !d.outlook).map((d) => d.name);

  return (
    <SiteLayout>
      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14">
        <div className="rounded-[28px] bg-umber text-cream overflow-hidden ring-1 ring-black/5 p-8 md:p-14">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-honey">
            Bee Intelligence · Rwanda
          </span>
          <h1 className="font-display text-4xl md:text-6xl mt-3 mb-4 leading-tight">
            Rwanda rain outlook
          </h1>
          <p className="max-w-2xl text-cream/85 text-lg">
            {O.season}. Will the short rains be wetter or drier than usual where your bees are, and how
            far can you trust that?
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl">
            <div className="rounded-2xl bg-cream/10 p-4">
              <div className="font-display text-3xl text-honey">
                {O.squaresWithOutlook} of {O.squares}
              </div>
              <div className="text-sm text-cream/80">areas have an outlook this season</div>
            </div>
            <div className="rounded-2xl bg-cream/10 p-4">
              <div className="font-display text-3xl text-honey">Wetter</div>
              <div className="text-sm text-cream/80">
                leaning wetter in {wetter} of {RWANDA_DISTRICTS.length} districts, most clearly in the east
              </div>
            </div>
            <div className="rounded-2xl bg-cream/10 p-4">
              <div className="font-display text-3xl text-honey">Weak</div>
              <div className="text-sm text-cream/80">signal: treat it as a lean, not a promise</div>
            </div>
          </div>
        </div>
      </section>

      <MapPanel
        title={`Season Ahead — ${O.season}`}
        blurb="The chance of more or less rain than usual, area by area. Fitted from four decades of satellite rainfall and the ocean temperatures that drive East Africa's short rains. Hatched areas are where this method has not worked in the past, so we show no outlook there."
        image="/images/map-forecast-ond-2026-rwanda.png"
        alt="Map of Rwanda for October to December 2026. Most of the south and east is shaded towards wetter than usual, strongest around Kirehe and Kayonza. The north and north-west, and a few other areas, are hatched: no useful outlook."
        legend={OUTLOOK_LEGEND}
        caption={`Chance of above- or below-normal rainfall, ${O.season}, from ocean temperatures in ${O.window}. Computed ${O.computed}. Read it alongside Meteo Rwanda's seasonal forecast.`}
        live
        extra={
          <a
            href="/images/rwanda-outlook-ond-2026-share.jpg"
            download
            className="text-xs font-medium text-umber underline underline-offset-4 hover:text-honey"
          >
            Download the map to share
          </a>
        }
      />

      <MapPanel
        title="How far to trust it"
        blurb="We tested the method on every year since 1982, each time hiding that year from it. This map shows where it beat simply expecting a usual season. The dots are the same ones the Beelove app shows."
        image="/images/map-skill-ond-rwanda.png"
        alt="Map of Rwanda showing forecast skill. No skill across the north and north-west and in a few other areas; weak to fair skill across most of the south and east, best in one area of the east."
        legend={SKILL_LEGEND}
        caption={`Ranked probability skill score per area of about 28 km, leave-one-year-out, ${O.years}.`}
      />

      {/* District table */}
      <section className="max-w-7xl mx-auto px-6 mt-14 md:mt-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl text-umber mb-3">District by district</h2>
          <p className="text-umber/75">
            Each district is the average of the areas it covers. Expected and usual rain are totals for
            October to December, in millimetres.
          </p>
        </div>
        <div className="mt-5 rounded-[24px] ring-1 ring-umber/10 bg-card p-4 md:p-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-umber/55">
                <th className="pb-2 pr-3 font-medium">District</th>
                <th className="pb-2 pr-3 font-medium">More rain</th>
                <th className="pb-2 pr-3 font-medium">Less rain</th>
                <th className="pb-2 pr-3 font-medium hidden sm:table-cell">Expected / usual</th>
                <th className="pb-2 font-medium">Trust</th>
              </tr>
            </thead>
            <tbody>
              {RWANDA_DISTRICTS.map((d) => (
                <DistrictRow key={d.name} d={d} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* For beekeepers */}
      <section className="max-w-7xl mx-auto px-6 mt-14 md:mt-20">
        <div className="rounded-[28px] bg-card ring-1 ring-umber/10 p-8 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl text-umber mb-6">What it means for your bees</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-display text-xl text-umber mb-2">Where it leans wetter</h3>
              <ul className="text-sm text-umber/75 list-disc pl-5 space-y-1.5">
                <li>Bait empty hives now: swarms follow the rains.</li>
                <li>Move hives away from riverbanks and flood paths.</li>
                <li>Before harvesting, check honey is capped. Wet-season honey can ferment.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">Where there is no useful outlook</h3>
              <p className="text-sm text-umber/75 mb-2">
                Plan for a usual season in {noOutlook.length} districts, including{" "}
                {noOutlook.slice(0, 5).join(", ")}.
              </p>
              <ul className="text-sm text-umber/75 list-disc pl-5 space-y-1.5">
                <li>Inspect and clean hives before the rains.</li>
                <li>Bait empty hives so they are ready for swarms.</li>
                <li>Get harvesting gear and containers ready.</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-umber/75 mt-8 max-w-3xl">
            Flowering usually picks up a few weeks after good rains. Rain is only part of the story: what
            your bees find depends on what grows near you.
          </p>
        </div>
      </section>

      {/* Honest notes */}
      <section className="max-w-7xl mx-auto px-6 mt-14 md:mt-20 mb-16 md:mb-24">
        <div className="rounded-[28px] bg-card ring-1 ring-umber/10 p-8 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl text-umber mb-6">
            How we made it, and what we can claim
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl text-umber mb-2">The method</h3>
              <p className="text-sm text-umber/75">
                The Indian Ocean Dipole and El Niño shape East Africa's short rains. For each area we fitted
                how October–December rain has followed July–September ocean temperatures, {O.years}. This
                year the Dipole was +{O.dmi.toFixed(2)} and Niño 3.4 +{O.nino.toFixed(2)}: a strong El Niño.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">The test</h3>
              <p className="text-sm text-umber/75">
                Across Rwanda it beats the long-term average only slightly (skill score {sign(O.rpss)};
                0 means no better than the average). That is much weaker than our Kenya outlook. It has
                some skill in {O.squaresWithOutlook} of {O.squares} areas, mostly in the south and east, and
                none in the north and north-west. Its strongest calls have been over-confident.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">Too early is no use</h3>
              <p className="text-sm text-umber/75">
                Skill by issue date:{" "}
                {O.rpssByIssue.map((l, i) => (
                  <span key={l.issued}>
                    {i ? ", " : ""}
                    {l.issued} {sign(l.rpss)}
                  </span>
                ))}
                . From July there is no signal at all, so we only publish from early October.
              </p>
            </div>
          </div>
          <p className="text-xs text-umber/55 mt-8 max-w-3xl">
            Data: CHIRPS satellite rainfall (Climate Hazards Center, UC Santa Barbara), NOAA OISST sea-surface
            temperatures, FAO GAUL district boundaries. It cannot tell you when the rains start or about dry
            spells within the season. Treat it as a guide alongside Meteo Rwanda and what you see in your own
            area, never as a replacement for them.
          </p>
          <p className="text-sm text-umber/75 mt-6">
            Looking for Kenya?{" "}
            <Link to="/forage-maps" className="underline underline-offset-4 hover:text-honey">
              See the Kenya bee maps
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
