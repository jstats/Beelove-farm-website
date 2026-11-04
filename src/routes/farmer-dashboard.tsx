import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import { 
  Compass, 
  Droplets, 
  Calendar, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  MapPin, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const Route = createFileRoute("/farmer-dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — BeeLove Farm Intelligence" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Monitor apiaries, track hive occupancy, log inspections, and view localized 40-year rainfall outlooks.",
      },
    ],
  }),
  component: FarmerDashboardPage,
});

type ApiaryData = {
  id: string;
  name: string;
  county: string;
  totalHives: number;
  occupied: number;
  lastInspection: string;
  rainNormalMm: number;
  forageScore: number;
  aiDirective: {
    type: "opportunity" | "critical" | "optimal";
    title: string;
    reason: string;
    action: string;
  };
};

const SAMPLE_APIARIES: ApiaryData[] = [
  {
    id: "karura",
    name: "Karura Forest Apiary",
    county: "Nairobi County",
    totalHives: 40,
    occupied: 34,
    lastInspection: "2026-11-02",
    rainNormalMm: 85,
    forageScore: 88,
    aiDirective: {
      type: "opportunity",
      title: "6 empty hives ready for baiting",
      reason: "Onset rains active in Nairobi square. Acacia nilotica nectar flow probability 84%.",
      action: "Apply fresh beeswax and lemongrass lure to top bars of spare boxes today.",
    },
  },
  {
    id: "kibiko",
    name: "Kibiko Ridge Apiary",
    county: "Kajiado County",
    totalHives: 50,
    occupied: 36,
    lastInspection: "2026-10-28",
    rainNormalMm: 62,
    forageScore: 82,
    aiDirective: {
      type: "critical",
      title: "Inspection overdue (>21 days)",
      reason: "Congested Langstroth brood nest during active forage risks queen cups and swarming.",
      action: "Open 3-4 representative hives between 9am-11am to assess brood expansion.",
    },
  },
  {
    id: "makueni",
    name: "Makueni South Apiary",
    county: "Makueni County",
    totalHives: 30,
    occupied: 28,
    lastInspection: "2026-11-03",
    rainNormalMm: 110,
    forageScore: 92,
    aiDirective: {
      type: "optimal",
      title: "Optimal colony balance",
      reason: "93% occupancy. Recent seasonal rains driving abundant dryland acacia bloom.",
      action: "Add honey supers with queen excluders ahead of peak capping window.",
    },
  },
];

function FarmerDashboardPage() {
  const [selectedId, setSelectedId] = useState("karura");
  const [inspectedHives, setInspectedHives] = useState<string[]>([]);

  const apiary = SAMPLE_APIARIES.find((a) => a.id === selectedId) || SAMPLE_APIARIES[0];
  const occupancyPct = Math.round((apiary.occupied / apiary.totalHives) * 100);
  const emptyHives = Math.max(0, apiary.totalHives - apiary.occupied);

  // SVG Radial sweep calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (occupancyPct / 100) * circumference;

  const handleLogInspection = () => {
    if (!inspectedHives.includes(apiary.id)) {
      setInspectedHives([...inspectedHives, apiary.id]);
    }
  };

  return (
    <SiteLayout>
      {/* Privacy & Concept Demo Watermark */}
      <div className="bg-amber/15 border-b border-amber/30 px-6 py-2.5 text-xs text-umber font-semibold flex items-center justify-center gap-2">
        <Sparkles className="size-4 text-honey" />
        <span>Interactive Concept Demo &bull; Illustrating upcoming cloud sync &amp; satellite telemetry for BeeLove Farmer mobile users</span>
      </div>
      <div className="bg-[#0D1E16] text-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/40 text-amber text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                <span>🐝 Farmer Self-Service Hub</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
                My Apiaries &amp; Live Telemetry
              </h1>
              <p className="text-cream/70 text-sm mt-1">
                Connected to BeeLove Farmer Mobile App Offline sync enabled
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/beelove_v3_visuals.html"
                target="_blank"
                className="bg-amber text-umber font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-honey transition-colors"
              >
                📱 Mobile Simulator &rarr;
              </a>
              <a
                href={wa(`Hello BeeLove, I need technical advice for ${apiary.name}.`)}
                target="_blank"
                className="bg-cream/10 border border-cream/20 text-cream font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-cream/20 transition-colors"
              >
                Ask Agronomist
              </a>
            </div>
          </div>

          {/* Apiary Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SAMPLE_APIARIES.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={`px-5 py-3 rounded-2xl text-left font-display text-sm transition-all flex-shrink-0 border ${
                  selectedId === a.id
                    ? "bg-forest border-amber text-cream shadow-lg"
                    : "bg-cream/5 border-cream/10 text-cream/70 hover:bg-cream/10"
                }`}
              >
                <div className="font-bold">{a.name}</div>
                <div className="text-xs opacity-70 font-sans mt-0.5">
                  {a.occupied}/{a.totalHives} Hives &bull; {a.county}
                </div>
              </button>
            ))}
          </div>

          {/* Top Metrics Row */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Radial Occupancy Hero */}
            <div className="bg-forest border border-cream/15 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-honey">
                  COLONY OCCUPANCY
                </span>
                <div className="font-display text-5xl font-black text-cream mt-1 mb-1">
                  {occupancyPct}%
                </div>
                <div className="text-sm text-cream/80 font-medium">
                  {apiary.occupied} of {apiary.totalHives} Hives Colonized
                </div>
                <div className="text-xs text-cream/60 mt-2 flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-honey" />
                  <span>Inspected {apiary.lastInspection}</span>
                </div>
              </div>

              {/* Radial SVG Gauge */}
              <div className="relative size-28 shrink-0">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#1E4432"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#F58320"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-base font-bold text-cream">
                    {apiary.occupied}/{apiary.totalHives}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-cream/70">HIVED</span>
                </div>
              </div>
            </div>

            {/* Empty Hives Callout */}
            <div className="bg-gradient-to-br from-[#DF7B20] to-[#B4520A] rounded-3xl p-6 text-[#3D1A04] flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-black tracking-wider text-[#4A1E02]">
                    EXPANSION OPPORTUNITY
                  </span>
                  <span className="text-2xl">🐝</span>
                </div>
                <div className="font-display text-5xl font-black mt-2 mb-1">
                  {emptyHives}
                </div>
                <div className="font-bold text-base leading-snug">
                  Empty Hives Ready to Bait
                </div>
                <p className="text-xs mt-2 text-[#4A1E02]/90 leading-relaxed">
                  Local onset rains are active. Preparing spare hives now with lemongrass lures has a predicted 84% colonization rate.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#4A1E02]/20 flex items-center justify-between text-xs font-black uppercase">
                <span>Lemongrass Traps</span>
                <span className="underline">Bait Guide &rarr;</span>
              </div>
            </div>

            {/* Localized GEE Satellite Weather Square */}
            <div className="bg-cream/5 border border-cream/15 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-honey">
                  0.25&deg; FORECAST CELL
                </span>
                <div className="font-display text-2xl font-bold text-cream mt-2 mb-1">
                  ~{apiary.rainNormalMm} mm Rainfall
                </div>
                <div className="text-sm text-cream/70">
                  Normal seasonal expectation for {apiary.county}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-black/20 rounded-xl p-3 border border-cream/10">
                    <div className="text-[10px] text-cream/60 uppercase">Forage Index</div>
                    <div className="text-lg font-bold text-teal mt-0.5">{apiary.forageScore}/100</div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-3 border border-cream/10">
                    <div className="text-[10px] text-cream/60 uppercase">Swarm Risk</div>
                    <div className="text-lg font-bold text-amber mt-0.5">Moderate</div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-cream/50 mt-4 flex items-center gap-1.5">
                <Compass className="size-3 text-honey" />
                <span>CHIRPS Daily &bull; GEE 10m Sentinel Sentinel-2</span>
              </div>
            </div>
          </div>

          {/* BeeLove Advisor Directive Banner */}
          <div className="bg-card text-umber rounded-3xl p-6 border-2 border-amber shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#0F172A] text-[#38BDF8] text-xs font-black px-3 py-1 rounded-lg tracking-wider flex items-center gap-1">
                  <Sparkles className="size-3.5" />
                  <span>ON-DEVICE AI ADVISOR</span>
                </div>
                <span className="bg-amber/15 text-amber-dark text-xs font-bold px-2.5 py-1 rounded-md">
                  {apiary.aiDirective.type === "opportunity"
                    ? "SWARM OPPORTUNITY"
                    : apiary.aiDirective.type === "critical"
                    ? "ACTION REQUIRED"
                    : "OPTIMAL STATE"}
                </span>
              </div>

              <span className="text-xs text-umber/60 font-medium">
                Autonomous Telemetry Anomaly Evaluation
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-umber mb-2">
              {apiary.aiDirective.title}
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-umber/5 border-l-4 border-muted p-3.5 rounded-r-xl text-xs text-umber/80 leading-relaxed">
                <div className="font-bold text-[10px] uppercase text-umber/60 mb-1">
                  AI TELEMETRY ASSESSMENT:
                </div>
                {apiary.aiDirective.reason}
              </div>

              <div className="bg-amber/10 border border-amber/30 p-3.5 rounded-xl text-xs text-amber-dark leading-relaxed font-semibold">
                <div className="font-bold text-[10px] uppercase text-amber-dark/70 mb-1">
                  RECOMMENDED ACTION:
                </div>
                {apiary.aiDirective.action}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-umber/10">
              <button
                onClick={handleLogInspection}
                className="bg-forest text-cream font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-forest/90 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="size-4 text-honey" />
                <span>{inspectedHives.includes(apiary.id) ? "Inspection Logged ✓" : "Log Hive Check"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
