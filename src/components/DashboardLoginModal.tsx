import { useState } from "react";
import { Lock, User, Building2, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { authenticate, DashboardUser, UserRole, REGISTERED_ACCOUNTS } from "@/lib/dashboard-auth";

interface DashboardLoginModalProps {
  initialRole?: UserRole;
  onLoginSuccess: (user: DashboardUser) => void;
  title?: string;
  subtitle?: string;
}

export function DashboardLoginModal({
  initialRole = "farmer",
  onLoginSuccess,
  title = "Sign In to Farm Intelligence",
  subtitle = "Secure smallholder telemetry & cooperative registry portal",
}: DashboardLoginModalProps) {
  const [activeTab, setActiveTab] = useState<UserRole>(initialRole);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    const result = authenticate(username, password, activeTab);
    setLoading(false);
    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setError(result.error || "Authentication failed.");
    }
  };

  const handleQuickLogin = (userKey: string, pass: string, role: UserRole) => {
    setActiveTab(role);
    setUsername(userKey);
    setPassword(pass);
    setError(null);
    const result = authenticate(userKey, pass, role);
    if (result.success && result.user) {
      onLoginSuccess(result.user);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 bg-card text-umber rounded-3xl p-6 sm:p-8 border-2 border-amber/30 shadow-2xl relative overflow-hidden">
      {/* Decorative top ribbon */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber via-forest to-honey" />

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-amber/15 text-amber-dark text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
          <ShieldCheck className="size-4 text-amber" />
          <span>BeeLove Authenticated Portal</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-umber">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-umber/70 mt-1 max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Role Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-umber/5 p-1.5 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab("farmer");
            setError(null);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "farmer"
              ? "bg-forest text-cream shadow-md"
              : "text-umber/70 hover:text-umber hover:bg-umber/5"
          }`}
        >
          <User className="size-4 text-honey" />
          <span>Farmer Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("organization");
            setError(null);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "organization"
              ? "bg-forest text-cream shadow-md"
              : "text-umber/70 hover:text-umber hover:bg-umber/5"
          }`}
        >
          <Building2 className="size-4 text-honey" />
          <span>Co-Op / Org Sign In</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-umber/70 mb-1.5">
            {activeTab === "farmer" ? "Farmer Username / Email" : "Organization Username / ID"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={activeTab === "farmer" ? "e.g. beelovefarm25@gmail.com or zeb.mwandi" : "e.g. makueni.coop"}
              className="w-full bg-background border border-umber/20 rounded-xl px-4 py-3 text-sm text-umber placeholder:text-umber/40 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-umber/70 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-background border border-umber/20 rounded-xl px-4 py-3 text-sm text-umber placeholder:text-umber/40 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-forest text-cream font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl hover:bg-forest/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-2"
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <span>Access {activeTab === "farmer" ? "My Apiaries" : "Co-Op Hub"}</span>
              <ArrowRight className="size-4 text-honey" />
            </>
          )}
        </button>
      </form>

      {/* Quick-Access Demo Accounts */}
      <div className="mt-8 pt-6 border-t border-umber/10">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-umber/60 uppercase tracking-wider mb-3">
          <Sparkles className="size-3.5 text-amber" />
          <span>Quick Demo Logins (1-Click Fill)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleQuickLogin("beelovefarm25@gmail.com", "beelove2026", "farmer")}
            className="p-2.5 rounded-xl border border-amber/40 bg-amber/10 hover:bg-amber/20 text-left transition-all flex items-center gap-2"
          >
            <span className="text-base">🌾</span>
            <div>
              <div className="font-bold text-umber">BeeLove Farm (Owner)</div>
              <div className="text-[10px] text-umber/60">Kiunduani Main Apiary &bull; 65 Hives</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin("zeb.mwandi", "makueni2026", "farmer")}
            className="p-2.5 rounded-xl border border-forest/30 bg-forest/5 hover:bg-forest/10 text-left transition-all flex items-center gap-2"
          >
            <span className="text-base">🐝</span>
            <div>
              <div className="font-bold text-umber">Zeb Mwandi (Smallholder)</div>
              <div className="text-[10px] text-umber/60">Bahati Village &bull; 30 Hives (GCP Record)</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin("makueni.coop", "coop2026", "organization")}
            className="p-2.5 rounded-xl border border-umber/20 bg-cream hover:bg-honey/20 text-left transition-all flex items-center gap-2"
          >
            <span className="text-base">🏢</span>
            <div>
              <div className="font-bold text-umber">Makueni Co-op (Extension)</div>
              <div className="text-[10px] text-umber/60">County Hub &bull; 9 Regional Apiaries</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin("admin@beelovefarm.org", "admin2026", "organization")}
            className="p-2.5 rounded-xl border border-umber/20 bg-cream hover:bg-honey/20 text-left transition-all flex items-center gap-2"
          >
            <span className="text-base">🛡️</span>
            <div>
              <div className="font-bold text-umber">Master Admin</div>
              <div className="text-[10px] text-umber/60">All Wards &bull; Raw Data Export</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
