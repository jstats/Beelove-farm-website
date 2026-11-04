import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { wa } from "@/lib/site";
import { 
  Building2, 
  Users, 
  Layers, 
  TrendingUp, 
  Send, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  AlertCircle
} from "lucide-react";

export const Route = createFileRoute("/org-dashboard")({
  head: () => ({
    meta: [
      { title: "Cooperative & Org Portal — BeeLove Farm Intelligence" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Multi-farmer apiary management, regional colonization tracking, bulk SMS/WhatsApp broadcast, and honey yield forecasting.",
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

const SAMPLE_FARMERS: FarmerRecord[] = [
  { id: "F-101", name: "James Mutua", phone: "+254 722 ••• 022", county: "Makueni", subCounty: "Kibwezi East", totalHives: 45, occupiedHives: 38, lastCheckin: "2026-11-02", projectedKg: 570 },
  { id: "F-102", name: "Grace Wambua", phone: "+254 721 ••• 566", county: "Makueni", subCounty: "Mbooni", totalHives: 60, occupiedHives: 52, lastCheckin: "2026-10-30", projectedKg: 780 },
  { id: "F-103", name: "Peter Nzomo", phone: "+254 710 ••• 900", county: "Kitui", subCounty: "Kitui South", totalHives: 30, occupiedHives: 22, lastCheckin: "2026-10-25", projectedKg: 330 },
  { id: "F-104", name: "Agnes Ndinda", phone: "+254 728 ••• 411", county: "Kitui", subCounty: "Mwingi Central", totalHives: 80, occupiedHives: 64, lastCheckin: "2026-11-01", projectedKg: 960 },
  { id: "F-105", name: "Samuel Kimani", phone: "+254 733 ••• 677", county: "Kajiado", subCounty: "Kajiado North", totalHives: 50, occupiedHives: 36, lastCheckin: "2026-10-28", projectedKg: 540 },
  { id: "F-106", name: "Beatrice Achieng", phone: "+254 712 ••• 877", county: "Nairobi", subCounty: "Karura", totalHives: 24, occupiedHives: 20, lastCheckin: "2026-11-03", projectedKg: 300 },
  { id: "F-107", name: "Emmanuel Nkurunziza", phone: "+250 788 ••• 456", county: "Bugesera (Rwanda)", subCounty: "Nyamata", totalHives: 70, occupiedHives: 58, lastCheckin: "2026-10-29", projectedKg: 870 },
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
    a.download = `beelove_farmers_${selectedCounty.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <SiteLayout>
      {/* Privacy & Concept Demo Watermark */}
      <div className="bg-amber/15 border-b border-amber/30 px-6 py-2.5 text-xs text-umber font-semibold flex items-center justify-center gap-2">
        <Building2 className="size-4 text-amber" />
        <span>Interactive Concept Demo &bull; Showing Aggregate Census &amp; Co-op Coordination (Farmer Coordinates Redacted for Security)</span>
      </div>
      <div className="bg-[#0B1713] text-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal/20 border border-teal/40 text-teal text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                <span>🏢 Organization &amp; Cooperative Hub</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
                Beekeeping Aggregation &amp; Field Command
              </h1>
              <p className="text-cream/70 text-sm mt-1">
                Multi-farmer colony census, swarm baiting campaigns, and seasonal harvest forecasting.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="bg-cream/10 border border-cream/20 text-cream text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-cream/20 transition-colors flex items-center gap-2"
              >
                <Download className="size-4 text-honey" />
                <span>Export Roster (CSV)</span>
              </button>

              <button
                onClick={handleBroadcast}
                className="bg-amber text-umber font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-honey transition-colors flex items-center gap-2 shadow-lg"
              >
                <Send className="size-4" />
                <span>Dispatch Swarm Alert</span>
              </button>
            </div>
          </div>

          {/* Broadcast confirmation toast */}
          {broadcastSent && (
            <div className="bg-emerald-900/80 border border-emerald-500/60 p-4 rounded-2xl flex items-center gap-3 text-emerald-200 text-sm animate-in fade-in">
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Campaign Dispatched:</strong> Automated WhatsApp &amp; SMS baiting advisory delivered to {filtered.length} smallholder farmers in selected zones!
              </span>
            </div>
          )}

          {/* Aggregated KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Total Farmers</div>
              <div className="font-display text-3xl font-bold mt-1 text-cream">{filtered.length}</div>
              <div className="text-xs text-cream/60 mt-1">Verified records</div>
            </div>

            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Managed Hives</div>
              <div className="font-display text-3xl font-bold mt-1 text-cream">{totalHives}</div>
              <div className="text-xs text-cream/60 mt-1">{totalEmpty} empty ready to bait</div>
            </div>

            <div className="bg-forest border border-cream/10 rounded-2xl p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-honey">Occupancy Rate</div>
              <div className="font-display text-3xl font-bold mt-1 text-cream">{avgOccupancy}%</div>
              <div className="text-xs text-cream/60 mt-1">{totalOccupied} active colonies</div>
            </div>

            <div className="bg-gradient-to-br from-[#DF7B20] to-[#B4520A] rounded-2xl p-5 text-umber col-span-2 sm:col-span-1 lg:col-span-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#4A1E02]">
                Projected Honey Yield (OND 2026)
              </div>
              <div className="font-display text-3xl font-black mt-1 text-[#4A1E02]">
                {(totalProjectedKg / 1000).toFixed(1)} MT ({totalProjectedKg.toLocaleString()} kg)
              </div>
              <div className="text-xs font-semibold text-[#4A1E02]/80 mt-1">
                Estimated off-take value: ~KES {(totalProjectedKg * 800).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-cream/5 p-4 rounded-2xl border border-cream/10">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="size-4 text-honey shrink-0 ml-1" />
              {["ALL", "Makueni", "Kitui", "Kajiado", "Nairobi", "Rwanda"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCounty(c)}
                  className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                    selectedCounty === c
                      ? "bg-amber text-umber shadow"
                      : "bg-cream/10 text-cream/70 hover:bg-cream/15"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative min-w-[260px]">
              <Search className="size-4 text-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search farmer name, phone or ward..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/30 border border-cream/15 rounded-xl text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-amber"
              />
            </div>
          </div>

          {/* Multi-Farmer Table */}
          <div className="bg-cream/5 border border-cream/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-forest text-cream/80 font-bold uppercase tracking-wider text-[10px] border-b border-cream/10">
                  <tr>
                    <th className="py-3 px-4">Farmer &amp; Phone</th>
                    <th className="py-3 px-4">Zone &bull; County</th>
                    <th className="py-3 px-4 text-center">Hives (Total/Occ)</th>
                    <th className="py-3 px-4 text-center">Occupancy %</th>
                    <th className="py-3 px-4 text-right">Proj. Honey</th>
                    <th className="py-3 px-4 text-right">Last Verified</th>
                    <th className="py-3 px-4 text-center">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/10">
                  {filtered.map((f) => {
                    const pct = Math.round((f.occupiedHives / f.totalHives) * 100);
                    return (
                      <tr key={f.id} className="hover:bg-cream/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-cream text-sm">{f.name}</div>
                          <div className="text-cream/50 text-[11px] font-mono">{f.phone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-cream/90 font-medium">{f.county}</div>
                          <div className="text-cream/50 text-[11px]">{f.subCounty}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold">
                          {f.totalHives} / <span className="text-honey">{f.occupiedHives}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            pct >= 75 ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800"
                          }`}>
                            {pct}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-honey text-sm">
                          {f.projectedKg} kg
                        </td>
                        <td className="py-3.5 px-4 text-right text-cream/60">
                          {f.lastCheckin}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={wa(`Hello ${f.name}, this is BeeLove Cooperative. Rains have commenced in ${f.subCounty}. Please check and bait your ${f.totalHives - f.occupiedHives} empty hives.`)}
                            target="_blank"
                            className="inline-flex items-center gap-1 bg-amber/20 hover:bg-amber/30 text-amber text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber/40 transition-colors"
                          >
                            <span>WhatsApp Alert</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
