import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { 
  Building2, 
  Send, 
  Download, 
  CheckCircle2, 
  MapPin, 
  AlertCircle
} from "lucide-react";

export const Route = createFileRoute("/org-dashboard")({
  head: () => ({
    meta: [
      { title: "Cooperative Portal (Dummy Demo) — BeeLove Farm" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Simulated demonstration portal for agricultural cooperatives and extension teams.",
      },
    ],
  }),
  component: OrgDashboardPage,
});

type FarmerRecord = {
  id: string;
  name: string;
  phone: string;
  county: string;
  subCounty: string;
  totalHives: number;
  occupiedHives: number;
  lastCheckin: string;
  projectedKg: number;
};

// DUMMY SIMULATION DATA - For presentation & conceptual workflow testing only
const SAMPLE_FARMERS: FarmerRecord[] = [
  { id: "DUMMY-101", name: "Simulated Farmer A (James M.)", phone: "+254 722 ••• 022", county: "Makueni", subCounty: "Kibwezi East", totalHives: 45, occupiedHives: 38, lastCheckin: "2026-11-02", projectedKg: 570 },
  { id: "DUMMY-102", name: "Simulated Farmer B (Grace W.)", phone: "+254 721 ••• 566", county: "Makueni", subCounty: "Mbooni", totalHives: 60, occupiedHives: 52, lastCheckin: "2026-10-30", projectedKg: 780 },
  { id: "DUMMY-103", name: "Simulated Farmer C (Peter N.)", phone: "+254 710 ••• 900", county: "Kitui", subCounty: "Kitui South", totalHives: 30, occupiedHives: 22, lastCheckin: "2026-10-25", projectedKg: 330 },
  { id: "DUMMY-104", name: "Simulated Farmer D (Agnes N.)", phone: "+254 728 ••• 411", county: "Kitui", subCounty: "Mwingi Central", totalHives: 80, occupiedHives: 64, lastCheckin: "2026-11-01", projectedKg: 960 },
  { id: "DUMMY-105", name: "Simulated Farmer E (Samuel K.)", phone: "+254 733 ••• 677", county: "Kajiado", subCounty: "Kajiado North", totalHives: 50, occupiedHives: 36, lastCheckin: "2026-10-28", projectedKg: 540 },
  { id: "DUMMY-106", name: "Simulated Farmer F (Beatrice A.)", phone: "+254 712 ••• 877", county: "Nairobi", subCounty: "Karura", totalHives: 24, occupiedHives: 20, lastCheckin: "2026-11-03", projectedKg: 300 },
  { id: "DUMMY-107", name: "Simulated Farmer G (Emmanuel N.)", phone: "+250 788 ••• 456", county: "Bugesera (Rwanda)", subCounty: "Nyamata", totalHives: 70, occupiedHives: 58, lastCheckin: "2026-10-29", projectedKg: 870 },
];

function OrgDashboardPage() {
  const [selectedCounty, setSelectedCounty] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const filtered = SAMPLE_FARMERS.filter((f) => {
    const matchesCounty = selectedCounty === "ALL" || f.county.toLowerCase().includes(selectedCounty.toLowerCase());
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.phone.includes(searchTerm) || f.subCounty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCounty && matchesSearch;
  });

  const totalHives = filtered.reduce((acc, f) => acc + f.totalHives, 0);
  const totalOccupied = filtered.reduce((acc, f) => acc + f.occupiedHives, 0);
  const totalEmpty = totalHives - totalOccupied;
  const avgOccupancy = totalHives > 0 ? Math.round((totalOccupied / totalHives) * 100) : 0;
  const totalProjectedKg = filtered.reduce((acc, f) => acc + f.projectedKg, 0);

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 5000);
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Phone,County,SubCounty,TotalHives,OccupiedHives,LastCheckin,ProjectedKg\n";
    const rows = filtered.map(f => `${f.id},${f.name},${f.phone},${f.county},${f.subCounty},${f.totalHives},${f.occupiedHives},${f.lastCheckin},${f.projectedKg}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `beelove_coop_DUMMY_DATA_${selectedCounty.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <SiteLayout>
      {/* Prominent Dummy Data Warning Bar */}
      <div className="bg-amber-500/20 border-b border-amber-500/40 px-6 py-3 text-xs text-umber font-bold flex flex-wrap items-center justify-center gap-2 text-center">
        <span className="bg-amber-600 text-cream px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-black">Dummy Simulation</span>
        <span>All data shown below is synthetic mock data for demonstration purposes only.</span>
        <span className="text-umber/70 font-normal hidden md:inline">&bull; No real farmer records or live apiary coordinates are exposed.</span>
      </div>

      <div className="bg-[#0B1713] text-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                <span>🏢 Cooperative &amp; Extension Simulation Portal</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
                  Cooperative Field Command
                </h1>
                <span className="bg-amber-900/60 text-amber-200 border border-amber-500/50 text-[11px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                  DUMMY DEMO
                </span>
              </div>
              <p className="text-cream/70 text-sm mt-1">
                Conceptual prototype for multi-farmer colony census, collective swarm baiting alerts, and seasonal planning.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="bg-cream/10 border border-cream/20 text-cream text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-cream/20 transition-colors flex items-center gap-2"
              >
                <Download className="size-4 text-honey" />
                <span>Export Sample Roster (CSV)</span>
              </button>
              <button
                onClick={handleBroadcast}
                className="bg-amber text-umber font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-honey transition-colors flex items-center gap-2 shadow-lg"
              >
                <Send className="size-4" />
                <span>Test Alert Dispatch (Demo)</span>
              </button>
            </div>
          </div>

          {/* Dummy notice callout */}
          <div className="bg-amber-950/40 border border-amber-600/40 rounded-2xl p-4 flex items-start gap-3 text-amber-200/90 text-xs">
            <AlertCircle className="size-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold block text-sm mb-0.5">Prototype Simulation Notice</strong>
              This portal demonstrates how cooperative leaders and extension officers can coordinate regional apiary management. All smallholder names, phone numbers, and numbers shown below are fictional mock figures. Live farmer rosters require authorized organizational credentials and smallholder consent under the Kenya Data Protection Act.
            </div>
          </div>

          {/* Broadcast confirmation toast */}
          {broadcastSent && (
            <div className="bg-emerald-900/80 border border-emerald-500/60 p-4 rounded-2xl flex items-center gap-3 text-emerald-200 text-sm animate-in fade-in">
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Simulated Campaign Dispatched:</strong> Mock notification trigger sent to {filtered.length} simulated smallholder accounts in selected zones.
              </span>
            </div>
          )}

          {/* Aggregated KPI Cards (Labelled Demo) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Simulated Farmers</div>
              <div className="font-display text-3xl font-bold mt-1 text-cream">{filtered.length}</div>
              <div className="text-xs text-cream/60 mt-1">Dummy mock records</div>
            </div>

            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Sample Hives</div>
              <div className="font-display text-3xl font-bold mt-1 text-cream">{totalHives}</div>
              <div className="text-xs text-cream/60 mt-1">{totalEmpty} empty boxes</div>
            </div>

            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Avg Colonization</div>
              <div className="font-display text-3xl font-bold mt-1 text-cream">{avgOccupancy}%</div>
              <div className="text-xs text-cream/60 mt-1">{totalOccupied} colonized hives</div>
            </div>

            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Planning Harvest</div>
              <div className="font-display text-3xl font-bold mt-1 text-honey">{totalProjectedKg} kg</div>
              <div className="text-xs text-cream/60 mt-1">Estimate (KES {(totalProjectedKg * 800).toLocaleString()})</div>
            </div>

            <div className="col-span-2 lg:col-span-1 bg-forest border border-cream/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal">Swarm Season State</div>
                <div className="font-display text-lg font-bold mt-1 text-teal-300">Prepare &bull; Baiting Window</div>
              </div>
              <div className="text-xs text-cream/60 mt-1">Short rains window (OND)</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-forest/80 border border-cream/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-cream/60 font-semibold uppercase tracking-wider mr-2">Filter Region:</span>
              {["ALL", "Makueni", "Kitui", "Kajiado", "Nairobi", "Bugesera"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCounty(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCounty === c 
                      ? "bg-amber text-umber shadow-md" 
                      : "bg-cream/10 text-cream/80 hover:bg-cream/20"
                  }`}
                >
                  {c === "ALL" ? "All Counties" : c}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search dummy farmer or sub-county..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-cream/10 border border-cream/20 rounded-xl px-4 py-2 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-amber w-full md:w-64"
              />
            </div>
          </div>

          {/* Smallholder Census Table (Explicit Dummy Data) */}
          <div className="bg-forest border border-cream/10 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-cream/10 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-cream">
                  Simulated Smallholder Registry (Dummy Data)
                </h3>
                <p className="text-xs text-cream/60 mt-0.5">
                  Illustrative sample entries &mdash; phone numbers masked for data privacy.
                </p>
              </div>
              <span className="text-xs bg-cream/10 px-3 py-1 rounded-full text-honey font-semibold">
                Showing {filtered.length} sample records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream/5 text-cream/70 uppercase tracking-wider text-[10px] border-b border-cream/10">
                  <tr>
                    <th className="py-3 px-4">Demo ID</th>
                    <th className="py-3 px-4">Farmer Name</th>
                    <th className="py-3 px-4">Contact (Masked)</th>
                    <th className="py-3 px-4">County / Ward</th>
                    <th className="py-3 px-4 text-center">Managed Hives</th>
                    <th className="py-3 px-4 text-center">Occupied</th>
                    <th className="py-3 px-4 text-center">Colonization</th>
                    <th className="py-3 px-4 text-right">Projected Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/5 text-cream/90">
                  {filtered.map((f) => {
                    const occPct = Math.round((f.occupiedHives / f.totalHives) * 100);
                    return (
                      <tr key={f.id} className="hover:bg-cream/5 transition-colors">
                        <td className="py-3 px-4 font-mono text-[11px] text-cream/60">{f.id}</td>
                        <td className="py-3 px-4 font-semibold text-cream">{f.name}</td>
                        <td className="py-3 px-4 font-mono text-cream/75">{f.phone}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-honey" />
                            <span>{f.county} &bull; {f.subCounty}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-bold">{f.totalHives}</td>
                        <td className="py-3 px-4 text-center text-honey font-bold">{f.occupiedHives}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            occPct >= 80 
                              ? "bg-emerald-900/60 text-emerald-300" 
                              : occPct >= 60 
                                ? "bg-amber-900/60 text-amber-300" 
                                : "bg-red-900/60 text-red-300"
                          }`}>
                            {occPct}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-honey">
                          {f.projectedKg} kg
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy & Methodology Footer */}
          <div className="p-5 bg-cream/5 rounded-2xl border border-cream/10 text-xs text-cream/70 space-y-2">
            <div className="font-bold text-cream flex items-center gap-2">
              <Building2 className="size-4 text-honey" />
              <span>Smallholder Privacy &amp; Data Ethics Compliance</span>
            </div>
            <p>
              Under Kenya&apos;s Data Protection Act, individual GPS coordinates of rural apiaries are strictly classified as high-risk physical security assets to prevent hive theft and vandalism. This portal presents coarsened ward-level counts and dummy aggregate figures.
            </p>
          </div>

        </div>
      </div>
    </SiteLayout>
  );
}
