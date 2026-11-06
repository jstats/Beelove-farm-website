import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  Sparkles,
  LogOut,
  ShieldCheck,
  PlusCircle,
  Clock,
  Layers,
  ChevronRight,
  User,
} from "lucide-react";
import {
  getCurrentSession,
  clearSession,
  DashboardUser,
} from "@/lib/dashboard-auth";
import {
  CANONICAL_APIARIES,
  calculateEmptyHiveOpportunity,
  FarmerApiary,
  ApiaryInspection,
} from "@/lib/gcp-data";
import { DashboardLoginModal } from "@/components/DashboardLoginModal";

export const Route = createFileRoute("/farmer-dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — BeeLove Farm Intelligence" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Private smallholder apiary telemetry, hive check-ins, empty-hive valuations, and localized seasonal rainfall outlooks.",
      },
    ],
  }),
  component: FarmerDashboardPage,
});

function FarmerDashboardPage() {
  const [currentUser, setCurrentUser] = useState<DashboardUser | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [apiaries, setApiaries] = useState<FarmerApiary[]>(CANONICAL_APIARIES);
  const [selectedId, setSelectedId] = useState<string>("");
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  // New Inspection Form State
  const [inspectorName, setInspectorName] = useState("");
  const [coloniesCount, setColoniesCount] = useState(5);
  const [condition, setCondition] = useState<"Strong" | "Moderate" | "Needs Attention">("Strong");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setIsClient(true);
    const session = getCurrentSession();
    setCurrentUser(session);
  }, []);

  // Filter apiaries by logged-in user
  const userApiaries = apiaries.filter((a) => {
    if (!currentUser) return false;
    if (currentUser.role === "admin") return true;
    if (currentUser.farmerId === "BL-FARM-001") {
      // Owner sees BeeLove Farm apiaries + has view-access
      return a.farmerId === "BL-FARM-001" || a.county.includes("Makueni");
    }
    return a.farmerId === currentUser.farmerId;
  });

  const activeApiaryList = userApiaries.length > 0 ? userApiaries : apiaries.slice(0, 2);
  const apiary = activeApiaryList.find((a) => a.id === selectedId) || activeApiaryList[0] || CANONICAL_APIARIES[0];

  const occupancyPct = Math.round((apiary.occupiedHives / apiary.totalHives) * 100);
  const emptyHives = Math.max(0, apiary.totalHives - apiary.occupiedHives);
  const opp = calculateEmptyHiveOpportunity(emptyHives);

  // SVG Radial sweep calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (occupancyPct / 100) * circumference;

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
  };

  const handleLogInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInspection: ApiaryInspection = {
      id: "insp-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      inspector: inspectorName.trim() || currentUser?.name || "Smallholder Inspector",
      coloniesInspected: Number(coloniesCount),
      condition: condition,
      notes: notes.trim() || "Regular seasonal check. All boxes secured.",
    };

    const updated = apiaries.map((a) => {
      if (a.id === apiary.id) {
        return {
          ...a,
          lastInspectionDate: newInspection.date,
          inspections: [newInspection, ...a.inspections],
        };
      }
      return a;
    });

    setApiaries(updated);
    setShowInspectionModal(false);
    setNotes("");
  };

  return (
    <SiteLayout>
      {/* Session / Login Gate */}
      {!currentUser ? (
        <div className="bg-[#0D1E16] text-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/40 text-amber text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
              <span>🔒 Confidential Smallholder Portal</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
              Farmer Dashboard Sign In
            </h1>
            <p className="text-cream/70 text-sm mt-2">
              Sign in with your username and password to view your private apiaries, colony records, and localized swarm weather alerts.
            </p>
          </div>
          <DashboardLoginModal
            initialRole="farmer"
            onLoginSuccess={(u) => setCurrentUser(u)}
            title="Smallholder & Farm Owner Login"
            subtitle="Enter your BeeLove credentials or use the 1-click demo accounts below"
          />
        </div>
      ) : (
        <div className="bg-[#0D1E16] text-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Authenticated User Banner */}
            <div className="bg-forest/60 border border-cream/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-amber/20 border border-amber flex items-center justify-center text-xl shrink-0">
                  {currentUser.avatarEmoji || "🌾"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cream text-sm">
                      {currentUser.name}
                    </span>
                    <span className="bg-amber text-umber text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      {currentUser.role === "admin" ? "Master Admin" : "Verified Smallholder"}
                    </span>
                  </div>
                  <div className="text-xs text-cream/70 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="size-3 text-honey" />
                    <span>{currentUser.county} &bull; {currentUser.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowInspectionModal(true)}
                  className="bg-amber text-umber font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl hover:bg-honey transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle className="size-3.5" />
                  <span>Log Hive Check</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-cream/10 border border-cream/20 text-cream/80 hover:text-cream hover:bg-cream/20 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/40 text-amber text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  <span>🐝 GCP Real Telemetry &amp; Field Records</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl text-cream font-bold">
                  {apiary.name}
                </h1>
                <p className="text-cream/70 text-sm mt-1">
                  Location: {apiary.village}, {apiary.subCounty}, {apiary.county} &bull; Last inspected {apiary.lastInspectionDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/org-dashboard"
                  className="bg-cream/10 border border-cream/20 text-cream font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-cream/20 transition-colors"
                >
                  🏢 Cooperative Hub &rarr;
                </Link>
                <a
                  href={wa(`Hello BeeLove Agronomist, I need advice for my apiary ${apiary.name} in ${apiary.county}.`)}
                  target="_blank"
                  className="bg-amber text-umber font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-honey transition-colors"
                >
                  Ask Agronomist
                </a>
              </div>
            </div>

            {/* Apiary Selector Tabs */}
            {activeApiaryList.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {activeApiaryList.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedId(a.id)}
                    className={`px-5 py-3 rounded-2xl text-left font-display text-sm transition-all flex-shrink-0 border ${
                      apiary.id === a.id
                        ? "bg-forest border-amber text-cream shadow-lg"
                        : "bg-cream/5 border-cream/10 text-cream/70 hover:bg-cream/10"
                    }`}
                  >
                    <div className="font-bold">{a.name}</div>
                    <div className="text-xs opacity-70 font-sans mt-0.5">
                      {a.occupiedHives}/{a.totalHives} Hives Colonized &bull; {a.county}
                    </div>
                  </button>
                ))}
              </div>
            )}

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
                    {apiary.occupiedHives} of {apiary.totalHives} Hives Colonized
                  </div>
                  <div className="text-xs text-cream/60 mt-2 flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-honey" />
                    <span>Inspected {apiary.lastInspectionDate}</span>
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
                      {apiary.occupiedHives}/{apiary.totalHives}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-cream/70">HIVED</span>
                  </div>
                </div>
              </div>

              {/* Empty Hives Callout (Canonical Expected Value Formula) */}
              <div className="bg-gradient-to-br from-[#DF7B20] to-[#B4520A] rounded-3xl p-6 text-[#3D1A04] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-black tracking-wider text-[#4A1E02]">
                      EXPANSION OPPORTUNITY
                    </span>
                    <span className="bg-[#4A1E02] text-amber text-[10px] font-black px-2 py-0.5 rounded-full">
                      KES 4,000 / HIVE
                    </span>
                  </div>
                  <div className="font-display text-4xl font-black mt-2 text-[#2D1201]">
                    {emptyHives} Empty Hives
                  </div>
                  <p className="text-xs font-semibold text-[#4A1E02]/90 mt-2 leading-relaxed">
                    Expected seasonal honey value from baiting:
                  </p>
                  <div className="font-display text-2xl font-black text-[#200B00] mt-1">
                    KES {opp.expectedValueKes.toLocaleString()}
                    <span className="text-xs font-sans font-bold text-[#4A1E02]/80 ml-1.5">
                      (~{opp.expectedKg} kg honey)
                    </span>
                  </div>
                </div>

                <div className="text-[11px] bg-black/15 p-2.5 rounded-xl text-[#3D1A04] mt-3 leading-snug border border-black/10">
                  <strong>Realistic Model:</strong> {emptyHives} empty &times; {opp.captureRatePct}% bait capture &times; {opp.avgYieldKg} kg avg &times; KES {opp.pricePerKgKes}/kg.
                </div>
              </div>

              {/* Localized Weather & Rain Outlook */}
              <div className="bg-cream/5 border border-cream/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-honey">
                      CLIMATE &amp; FORAGE
                    </span>
                    <span className="bg-teal/20 text-teal text-[10px] font-bold px-2 py-0.5 rounded-md">
                      CHIRPS 40-YR
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-4xl font-black text-cream">
                      {apiary.rainNormalMm}
                    </span>
                    <span className="text-xs text-cream/70 font-medium">mm seasonal normal</span>
                  </div>
                  <div className="text-sm text-cream/70 mt-1">
                    {apiary.county} short rains onset window
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-black/20 rounded-xl p-3 border border-cream/10">
                      <div className="text-[10px] text-cream/60 uppercase">Forage Index</div>
                      <div className="text-lg font-bold text-teal mt-0.5">{apiary.forageScore}/100</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-cream/10">
                      <div className="text-[10px] text-cream/60 uppercase">Nowcast State</div>
                      <div className="text-lg font-bold text-amber mt-0.5 uppercase">
                        {apiary.nowcastState.replace("_", " ")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-cream/50 mt-4 flex items-center gap-1.5">
                  <Compass className="size-3 text-honey" />
                  <span>0.25&deg; Grid Nowcast &bull; Africa-South1 GEE Pipeline</span>
                </div>
              </div>
            </div>

            {/* BeeLove Advisor Directive Banner */}
            <div className="bg-card text-umber rounded-3xl p-6 border-2 border-amber shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="bg-[#0F172A] text-[#38BDF8] text-xs font-black px-3 py-1 rounded-lg tracking-wider flex items-center gap-1">
                    <Sparkles className="size-3.5" />
                    <span>BEELOVE ADVISOR DIRECTIVE</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    apiary.nowcastState === "bait_now"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber/15 text-amber-dark"
                  }`}>
                    {apiary.nowcastState === "bait_now" ? "SWARM ONSET ACTIVE" : "PREPARATION PHASE"}
                  </span>
                </div>
                <span className="text-xs text-umber/60 font-medium">
                  Verified Smallholder Field Decision Rule
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-umber mb-2">
                {apiary.nowcastReason}
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="bg-umber/5 border-l-4 border-muted p-3.5 rounded-r-xl text-xs text-umber/80 leading-relaxed">
                  <div className="font-bold text-[10px] uppercase text-umber/60 mb-1">
                    FIELD TELEMETRY ASSESSMENT:
                  </div>
                  {apiary.nowcastReason}
                </div>
                <div className="bg-amber/10 border border-amber/30 p-3.5 rounded-xl text-xs text-amber-dark leading-relaxed font-semibold">
                  <div className="font-bold text-[10px] uppercase text-amber-dark/70 mb-1">
                    RECOMMENDED ACTION:
                  </div>
                  {apiary.nowcastAction}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-umber/10">
                <button
                  onClick={() => setShowInspectionModal(true)}
                  className="bg-forest text-cream font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-forest/90 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="size-4 text-honey" />
                  <span>Log Apiary Inspection</span>
                </button>
              </div>
            </div>

            {/* Hive Infrastructure & Recent Inspections Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hive Types Breakdown */}
              <div className="bg-cream/5 border border-cream/10 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-honey text-xs font-bold uppercase tracking-wider mb-4">
                  <Layers className="size-4" />
                  <span>Hive Infrastructure Roster</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/20 border border-cream/10">
                    <div>
                      <div className="font-bold text-cream text-sm">Langstroth Framed Hives</div>
                      <div className="text-xs text-cream/60">High honey yield &bull; Easy super additions</div>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-xl font-bold text-amber">
                        {apiary.hiveTypes.langstroth}
                      </span>
                      <span className="text-[10px] text-cream/50 block">HIVES</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/20 border border-cream/10">
                    <div>
                      <div className="font-bold text-cream text-sm">Kenya Top Bar Hives (KTBH)</div>
                      <div className="text-xs text-cream/60">Local timber &bull; Excellent wax production</div>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-xl font-bold text-honey">
                        {apiary.hiveTypes.ktbh}
                      </span>
                      <span className="text-[10px] text-cream/50 block">HIVES</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/20 border border-cream/10">
                    <div>
                      <div className="font-bold text-cream text-sm">Traditional Modernized Log Hives</div>
                      <div className="text-xs text-cream/60">Low cost swarm capture &bull; Pest resistant</div>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-xl font-bold text-cream">
                        {apiary.hiveTypes.traditionalLog}
                      </span>
                      <span className="text-[10px] text-cream/50 block">HIVES</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Inspection Timeline */}
              <div className="bg-cream/5 border border-cream/10 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-honey text-xs font-bold uppercase tracking-wider">
                    <Clock className="size-4" />
                    <span>Inspection Audit Trail</span>
                  </div>
                  <button
                    onClick={() => setShowInspectionModal(true)}
                    className="text-xs text-amber font-bold hover:underline"
                  >
                    + Add Record
                  </button>
                </div>

                <div className="space-y-3">
                  {apiary.inspections.map((insp) => (
                    <div
                      key={insp.id}
                      className="p-3.5 rounded-2xl bg-black/20 border border-cream/10 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-cream">
                          {insp.inspector} &bull; {insp.coloniesInspected} Hives Checked
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          insp.condition === "Strong"
                            ? "bg-green-900/60 text-green-300"
                            : "bg-amber-900/60 text-amber-300"
                        }`}>
                          {insp.condition}
                        </span>
                      </div>
                      <p className="text-cream/70 leading-relaxed">
                        {insp.notes}
                      </p>
                      <div className="text-[10px] text-cream/40 mt-1.5">
                        Date: {insp.date} &bull; Recorded to Local Farm Ledger
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Inspection Modal */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-umber rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-amber shadow-2xl relative">
            <h3 className="font-display text-2xl font-bold mb-1">
              Log Apiary Hive Inspection
            </h3>
            <p className="text-xs text-umber/70 mb-5">
              Record colony status for {apiary.name}.
            </p>

            <form onSubmit={handleLogInspectionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-umber/70 mb-1">
                  Inspector Name
                </label>
                <input
                  type="text"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  placeholder={currentUser?.name || "e.g. Jonesmus Wambua"}
                  className="w-full bg-background border border-umber/20 rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-umber/70 mb-1">
                    Colonies Checked
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={apiary.totalHives}
                    value={coloniesCount}
                    onChange={(e) => setColoniesCount(Number(e.target.value))}
                    className="w-full bg-background border border-umber/20 rounded-xl px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-umber/70 mb-1">
                    Colony Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full bg-background border border-umber/20 rounded-xl px-3.5 py-2.5 text-sm"
                  >
                    <option value="Strong">Strong (Good Brood)</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Needs Attention">Needs Attention</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-umber/70 mb-1">
                  Inspection Notes &amp; Observations
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Nectar flow strong, honey super 80% capped, no wax moth observed."
                  className="w-full bg-background border border-umber/20 rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-umber/10">
                <button
                  type="button"
                  onClick={() => setShowInspectionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-umber/20 text-umber/70 hover:bg-umber/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-forest text-cream hover:bg-forest/90"
                >
                  Save Inspection Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
