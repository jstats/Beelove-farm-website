import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Building2,
  Send,
  Download,
  CheckCircle2,
  MapPin,
  AlertCircle,
  ShieldCheck,
  LogOut,
  Users,
  Layers,
  Sparkles,
  Search,
  Filter,
  Eye,
  Lock,
} from "lucide-react";
import {
  getCurrentSession,
  clearSession,
  DashboardUser,
} from "@/lib/dashboard-auth";
import {
  COOP_MEMBERS_ROSTER,
  CoOpSmallholderRecord,
} from "@/lib/gcp-data";
import { DashboardLoginModal } from "@/components/DashboardLoginModal";

export const Route = createFileRoute("/org-dashboard")({
  head: () => ({
    meta: [
      { title: "Cooperative & Extension Portal — BeeLove Farm Intelligence" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Authenticated cooperative hub for smallholder census, harvest forecasting, and regional swarm advisory broadcasts.",
      },
    ],
  }),
  component: OrgDashboardPage,
});

function OrgDashboardPage() {
  const [currentUser, setCurrentUser] = useState<DashboardUser | null>(null);
  const [selectedCounty, setSelectedCounty] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [roster, setRoster] = useState<CoOpSmallholderRecord[]>(COOP_MEMBERS_ROSTER);

  useEffect(() => {
    const session = getCurrentSession();
    setCurrentUser(session);
  }, []);

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
  };

  // Filter roster by county and search keyword
  const filtered = roster.filter((f) => {
    // If organization has a specific county and is not admin, default to their county
    if (currentUser?.role === "organization" && currentUser.county && currentUser.county !== "All Regions") {
      if (selectedCounty === "ALL" && !f.county.toLowerCase().includes(currentUser.county.toLowerCase().replace("county", "").trim())) {
        // Allow user to filter or view their org county
      }
    }
    const matchesCounty =
      selectedCounty === "ALL" ||
      f.county.toLowerCase().includes(selectedCounty.toLowerCase());
    const matchesSearch =
      f.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.phoneMasked.includes(searchTerm) ||
      f.subCounty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCounty && matchesSearch;
  });

  const totalHives = filtered.reduce((sum, f) => sum + f.totalHives, 0);
  const totalOccupied = filtered.reduce((sum, f) => sum + f.occupiedHives, 0);
  const totalProjectedKg = filtered.reduce((sum, f) => sum + f.projectedKg, 0);
  const occupancyRatio = totalHives > 0 ? Math.round((totalOccupied / totalHives) * 100) : 0;

  const handleExportCsv = () => {
    const headers = ["ID", "Farmer Name", "Masked Phone", "County", "Sub-County", "Total Hives", "Occupied Hives", "Last Check-in", "Projected Honey (Kg)", "Status"];
    const rows = filtered.map((f) => [
      f.id,
      f.farmerName,
      f.phoneMasked,
      f.county,
      f.subCounty,
      f.totalHives,
      f.occupiedHives,
      f.lastCheckin,
      f.projectedKg,
      f.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `beelove_smallholders_${selectedCounty.toLowerCase()}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SiteLayout>
      {/* Session / Login Gate */}
      {!currentUser ? (
        <div className="bg-[#0B1528] text-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/40 text-amber text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
              <span>🏢 Cooperative &amp; Extension Society Portal</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
              Organization Hub Sign In
            </h1>
            <p className="text-cream/70 text-sm mt-2">
              Sign in with your cooperative or agricultural extension credentials to access smallholder censuses, regional swarm forecasting, and harvest analytics.
            </p>
          </div>
          <DashboardLoginModal
            initialRole="organization"
            onLoginSuccess={(u) => setCurrentUser(u)}
            title="Cooperative & Extension Login"
            subtitle="Access regional smallholder censuses, production projections, and alert broadcasts"
          />
        </div>
      ) : (
        <div className="bg-[#0B1528] text-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Authenticated Org Banner */}
            <div className="bg-[#13223E] border border-blue-400/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-xl shrink-0">
                  {currentUser.avatarEmoji || "🏢"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cream text-sm">
                      {currentUser.name}
                    </span>
                    <span className="bg-blue-500/30 text-blue-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-400/30">
                      {currentUser.role === "admin" ? "Master Admin" : "Cooperative Officer"}
                    </span>
                  </div>
                  <div className="text-xs text-cream/70 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="size-3 text-honey" />
                    <span>Jurisdiction: {currentUser.county} &bull; {currentUser.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  to="/farmer-dashboard"
                  className="bg-cream/10 border border-cream/20 text-cream/90 hover:text-cream text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                >
                  🌾 Farmer View
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-cream/10 border border-cream/20 text-cream/80 hover:text-cream hover:bg-cream/20 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Header Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  <span>🏢 Agricultural Cooperative Hub</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
                  Smallholder Apiary Census &amp; Harvest Forecasts
                </h1>
                <p className="text-cream/70 text-sm mt-1">
                  Verified field stops from GCP storage &bull; Privacy-protected smallholder registry
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCsv}
                  className="bg-cream/10 border border-cream/20 text-cream font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-cream/20 transition-colors flex items-center gap-2"
                >
                  <Download className="size-4 text-honey" />
                  <span>Export CSV</span>
                </button>
                <a
                  href="#broadcast-section"
                  className="bg-amber text-umber font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-honey transition-colors flex items-center gap-1.5"
                >
                  <Send className="size-3.5" />
                  <span>Swarm Broadcast</span>
                </a>
              </div>
            </div>

            {/* Privacy & Anti-Theft Notice */}
            <div className="bg-[#142646] border border-blue-400/30 rounded-2xl p-4 text-xs text-blue-100 flex items-start gap-3">
              <ShieldCheck className="size-5 text-amber shrink-0 mt-0.5" />
              <div>
                <strong className="text-cream block mb-0.5 font-bold">
                  Confidential Apiary Protection Standard:
                </strong>
                Rural apiary GPS coordinates are confidential and coarsened to ward level to prevent hive theft. Phone numbers are masked in shared cooperative views.
              </div>
            </div>

            {/* Aggregated KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#13223E] border border-cream/10 rounded-2xl p-5 shadow-lg">
                <div className="text-xs uppercase font-extrabold tracking-wider text-blue-300 flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  <span>Farmers</span>
                </div>
                <div className="font-display text-3xl font-black text-cream mt-2">
                  {filtered.length}
                </div>
                <div className="text-[11px] text-cream/60 mt-1">
                  Active in selected view
                </div>
              </div>

              <div className="bg-[#13223E] border border-cream/10 rounded-2xl p-5 shadow-lg">
                <div className="text-xs uppercase font-extrabold tracking-wider text-amber flex items-center gap-1.5">
                  <Layers className="size-3.5" />
                  <span>Managed Hives</span>
                </div>
                <div className="font-display text-3xl font-black text-cream mt-2">
                  {totalHives}
                </div>
                <div className="text-[11px] text-cream/60 mt-1">
                  {totalOccupied} colonies colonized
                </div>
              </div>

              <div className="bg-[#13223E] border border-cream/10 rounded-2xl p-5 shadow-lg">
                <div className="text-xs uppercase font-extrabold tracking-wider text-green-400 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" />
                  <span>Colonization</span>
                </div>
                <div className="font-display text-3xl font-black text-cream mt-2">
                  {occupancyRatio}%
                </div>
                <div className="text-[11px] text-cream/60 mt-1">
                  Regional network avg
                </div>
              </div>

              <div className="bg-[#13223E] border border-cream/10 rounded-2xl p-5 shadow-lg">
                <div className="text-xs uppercase font-extrabold tracking-wider text-honey flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  <span>Projected Honey</span>
                </div>
                <div className="font-display text-3xl font-black text-cream mt-2">
                  {totalProjectedKg.toLocaleString()} <span className="text-sm font-sans font-bold">kg</span>
                </div>
                <div className="text-[11px] text-cream/60 mt-1">
                  ~KES {(totalProjectedKg * 800).toLocaleString()} value
                </div>
              </div>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#13223E] border border-cream/10 p-4 rounded-2xl">
              {/* County Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {["ALL", "Makueni", "Kitui", "Kajiado", "Nyeri", "Bugesera"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCounty(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      selectedCounty === c
                        ? "bg-amber text-umber shadow"
                        : "bg-cream/5 text-cream/70 hover:bg-cream/10"
                    }`}
                  >
                    {c === "ALL" ? "All Counties" : c}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px]">
                <Search className="size-4 text-cream/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search farmer or ward..."
                  className="w-full bg-black/20 border border-cream/10 rounded-xl pl-9 pr-4 py-2 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-amber"
                />
              </div>
            </div>

            {/* Smallholders Table */}
            <div className="bg-[#13223E] border border-cream/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/30 text-cream/70 uppercase text-[10px] font-extrabold tracking-wider border-b border-cream/10">
                    <tr>
                      <th className="py-3.5 px-4">Smallholder Name</th>
                      <th className="py-3.5 px-4">Contact (Masked)</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4 text-center">Total Hives</th>
                      <th className="py-3.5 px-4 text-center">Colonized</th>
                      <th className="py-3.5 px-4 text-center">Last Check-in</th>
                      <th className="py-3.5 px-4 text-right">Est. Honey</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream/5">
                    {filtered.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-cream/5 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-cream">
                          {item.farmerName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-cream/70">
                          {item.phoneMasked}
                        </td>
                        <td className="py-3.5 px-4 text-cream/80">
                          <span className="font-semibold">{item.subCounty}</span>
                          <span className="text-cream/50 block text-[10px]">{item.county}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-display font-bold text-cream">
                          {item.totalHives}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-bold text-amber">
                            {item.occupiedHives}
                          </span>
                          <span className="text-[10px] text-cream/50 block">
                            {item.totalHives > 0 ? Math.round((item.occupiedHives / item.totalHives) * 100) : 0}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center text-cream/60">
                          {item.lastCheckin}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-honey">
                          {item.projectedKg} kg
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="bg-green-500/20 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/30">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Regional Swarm Advisory Broadcast Section */}
            <div id="broadcast-section" className="bg-[#13223E] border border-cream/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-amber text-xs font-bold uppercase tracking-wider mb-2">
                <Send className="size-4" />
                <span>Regional Swarm Advisory Broadcast</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-cream mb-2">
                Send Swarm Timing Advisory to Farmers in Onset Zone
              </h3>
              <p className="text-xs text-cream/70 max-w-2xl mb-4 leading-relaxed">
                When satellite onset triggers indicate swarm season in Eastern Lowlands (Makueni/Kitui), broadcast an explainable advisory directly to smallholders.
              </p>

              {broadcastSent ? (
                <div className="p-4 rounded-2xl bg-green-900/40 border border-green-500/40 text-green-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-400" />
                    <span>
                      Broadcast successfully queued for {filtered.length} smallholders in {selectedCounty === "ALL" ? "active zones" : selectedCounty}!
                    </span>
                  </div>
                  <button
                    onClick={() => setBroadcastSent(false)}
                    className="text-xs text-green-300 underline font-bold"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 bg-black/20 border border-cream/10 rounded-xl px-4 py-3 text-xs text-cream/90 font-mono">
                    &ldquo;BeeLove Advisor: Short rains onset active in {selectedCounty === "ALL" ? "Makueni/Kitui" : selectedCounty}. Bait all empty hives with lemongrass/beeswax this week!&rdquo;
                  </div>
                  <button
                    onClick={() => setBroadcastSent(true)}
                    className="bg-forest text-cream hover:bg-forest/90 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    <Send className="size-3.5 text-honey" />
                    <span>Transmit Advisory</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
