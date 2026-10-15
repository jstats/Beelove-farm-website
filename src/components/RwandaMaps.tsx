import { useEffect, useState, type ReactNode } from "react";
import { RWANDA_DISTRICTS, RWANDA_OUTLOOK, type RwandaDistrict } from "@/lib/rwandaOutlook";

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

/** Rwanda: October–December rain outlook (shown on /forage-maps when Rwanda is chosen). */
export function RwandaMaps() {
  const O = RWANDA_OUTLOOK;
  const withOutlook = RWANDA_DISTRICTS.filter((d) => d.outlook);
  const wetter = withOutlook.filter((d) => d.pAbove >= 0.5).length;
  const noOutlook = RWANDA_DISTRICTS.filter((d) => !d.outlook).map((d) => d.name);

  return (
    <>
      {/* At a glance */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-card ring-1 ring-umber/10 p-5">
            <div className="font-display text-3xl text-umber">
              {O.squaresWithOutlook} of {O.squares}
            </div>
            <div className="text-sm text-umber/70">areas have an outlook this season</div>
          </div>
          <div className="rounded-2xl bg-card ring-1 ring-umber/10 p-5">
            <div className="font-display text-3xl text-umber">Wetter</div>
            <div className="text-sm text-umber/70">
              leaning wetter in {wetter} of {RWANDA_DISTRICTS.length} districts, most clearly in the east
            </div>
          </div>
          <div className="rounded-2xl bg-card ring-1 ring-umber/10 p-5">
            <div className="font-display text-3xl text-umber">44 years</div>
            <div className="text-sm text-umber/70">of rainfall records behind it; the dots show how far to trust each area</div>
          </div>
        </div>
      </section>

      <MapPanel
        title={`Season Ahead — ${O.season}`}
        blurb="The chance of more or less rain than usual, area by area, from Beelove's seasonal rain model. Hatched areas are where it has not worked in past seasons, so we show no outlook there."
        image="/images/map-forecast-ond-2026-rwanda.png"
        alt="Map of Rwanda for October to December 2026. Most of the south and east is shaded towards wetter than usual, strongest around Kirehe and Kayonza. The north and north-west, and a few other areas, are hatched: no useful outlook."
        legend={OUTLOOK_LEGEND}
        caption={`Chance of above- or below-normal rainfall, ${O.season}. Updated ${O.computed}. Read it alongside Meteo Rwanda's seasonal forecast.`}
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
        blurb="We tested the model against every season since 1982. This map shows where it has done better than simply expecting a usual season. The dots are the same ones the Beelove app shows."
        image="/images/map-skill-ond-rwanda.png"
        alt="Map of Rwanda showing forecast skill. No skill across the north and north-west and in a few other areas; weak to fair skill across most of the south and east, best in one area of the east."
        legend={SKILL_LEGEND}
        caption={`Tested against every season, ${O.years}. Each area is about 28 km across.`}
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
            What it is, and what we can claim
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl text-umber mb-2">Beelove's own model</h3>
              <p className="text-sm text-umber/75">
                Built on 44 years of satellite rainfall records ({O.years}) for every area of Rwanda, about 28 km
                across, and the signals that shape East Africa's short rains before they begin.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">Tested, not guessed</h3>
              <p className="text-sm text-umber/75">
                We test it against every past season it has not seen. Rwanda's rain is harder to call than
                Kenya's, so we show an outlook only where it has worked before ({O.squaresWithOutlook} of{" "}
                {O.squares} areas) and mark how far to trust each one.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-umber mb-2">Published when it counts</h3>
              <p className="text-sm text-umber/75">
                The outlook comes out in early October, once it is reliable enough to plan with. We don't
                publish earlier guesses.
              </p>
            </div>
          </div>
          <p className="text-xs text-umber/55 mt-8 max-w-3xl">
            Rainfall records: CHIRPS (Climate Hazards Center, UC Santa Barbara). District boundaries: FAO GAUL.
            It cannot tell you when the rains start or about dry spells within the season. Treat it as a guide
            alongside Meteo Rwanda and what you see in your own area, never as a replacement for them.
          </p>
        </div>
      </section>
    </>
  );
}
