/**
 * BeeLove Farm — Unified Dashboard Authentication & Role-Based Access Control
 * Manages secure login for individual smallholder farmers, farm owners, and agricultural cooperatives.
 */

export type UserRole = "farmer" | "organization" | "admin";

export type DashboardUser = {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  county: string;
  subCounty?: string;
  orgName?: string;
  farmerId?: string;
  avatarEmoji: string;
};

export type AuthCredential = {
  user: DashboardUser;
  passwordHash: string; // Plaintext or hashed demo password
  description: string;
};

// Canonical accounts starting with actual BeeLove Farm data on GCP + registered smallholders and cooperatives
export const REGISTERED_ACCOUNTS: Record<string, AuthCredential> = {
  // Farm Owner / Master Smallholder
  "beelovefarm25@gmail.com": {
    passwordHash: "beelove2026",
    description: "BeeLove Farm Founder & Kiunduani Master Apiary",
    user: {
      id: "usr_jonesmus",
      username: "beelovefarm25@gmail.com",
      name: "Jonesmus Wambua (BeeLove Farm)",
      role: "farmer",
      email: "beelovefarm25@gmail.com",
      county: "Makueni County",
      subCounty: "Kibwezi East (Kiunduani)",
      farmerId: "BL-FARM-001",
      avatarEmoji: "🌾",
    },
  },
  "jonesmus": {
    passwordHash: "beelove2026",
    description: "BeeLove Farm Founder (Short Username)",
    user: {
      id: "usr_jonesmus",
      username: "jonesmus",
      name: "Jonesmus Wambua (BeeLove Farm)",
      role: "farmer",
      email: "beelovefarm25@gmail.com",
      county: "Makueni County",
      subCounty: "Kibwezi East (Kiunduani)",
      farmerId: "BL-FARM-001",
      avatarEmoji: "🌾",
    },
  },

  // Registered Smallholder Farmers (from GCP/Apps Script Field Stops)
  "zeb.mwandi": {
    passwordHash: "makueni2026",
    description: "Zeb Mwandi — Bahati Village, Makueni County (30 Hives)",
    user: {
      id: "usr_zeb",
      username: "zeb.mwandi",
      name: "Zeb Mwandi",
      role: "farmer",
      email: "zeb.mwandi@makueni.farmers.ke",
      county: "Makueni County",
      subCounty: "Bahati Village",
      farmerId: "1784558221379",
      avatarEmoji: "🐝",
    },
  },
  "austin.muriuki": {
    passwordHash: "nyeri2026",
    description: "Austin Muriuki — Kabaru, Nyeri County (5 Hives)",
    user: {
      id: "usr_austin",
      username: "austin.muriuki",
      name: "Austin Muriuki",
      role: "farmer",
      email: "austin.muriuki@nyeri.farmers.ke",
      county: "Nyeri County",
      subCounty: "Kabaru",
      farmerId: "1784556469113",
      avatarEmoji: "🍯",
    },
  },
  "abraham.loomuna": {
    passwordHash: "kajiado2026",
    description: "Abraham Loomuna — Motikanju, Kajiado County (4 Hives)",
    user: {
      id: "usr_abraham",
      username: "abraham.loomuna",
      name: "Abraham Loomuna",
      role: "farmer",
      email: "abraham.loomuna@kajiado.farmers.ke",
      county: "Kajiado County",
      subCounty: "Motikanju",
      farmerId: "1784572293461",
      avatarEmoji: "🪵",
    },
  },
  "joel.mumo": {
    passwordHash: "kitui2026",
    description: "Joel Mumo — Nguni, Kitui County (Onboarding)",
    user: {
      id: "usr_joel",
      username: "joel.mumo",
      name: "Joel Mumo",
      role: "farmer",
      email: "joel.mumo@kitui.farmers.ke",
      county: "Kitui County",
      subCounty: "Nguni",
      farmerId: "1784668915698",
      avatarEmoji: "🌱",
    },
  },

  // Agricultural Cooperatives & Extension Hubs
  "makueni.coop": {
    passwordHash: "coop2026",
    description: "Makueni Beekeepers Cooperative & Extension Society",
    user: {
      id: "org_makueni",
      username: "makueni.coop",
      name: "Makueni Beekeepers Cooperative",
      role: "organization",
      email: "director@makuenibeekeepers.co.ke",
      county: "Makueni",
      orgName: "Makueni Beekeepers Cooperative Society",
      avatarEmoji: "🏢",
    },
  },
  "kitui.union": {
    passwordHash: "coop2026",
    description: "Kitui Honey Producers Union & Extension Team",
    user: {
      id: "org_kitui",
      username: "kitui.union",
      name: "Kitui Honey Producers Union",
      role: "organization",
      email: "operations@kituihoneyunion.org",
      county: "Kitui",
      orgName: "Kitui Honey Producers Union",
      avatarEmoji: "📦",
    },
  },
  "bugesera.coop": {
    passwordHash: "rwanda2026",
    description: "Bugesera Honey Producers Cooperative (Rwanda)",
    user: {
      id: "org_bugesera",
      username: "bugesera.coop",
      name: "Bugesera Apiculture Cooperative",
      role: "organization",
      email: "info@bugeserahoney.rw",
      county: "Bugesera (Rwanda)",
      orgName: "Bugesera Honey Cluster",
      avatarEmoji: "🇷🇼",
    },
  },

  // Master Admin
  "admin@beelovefarm.org": {
    passwordHash: "admin2026",
    description: "BeeLove Farm Platform Administrator",
    user: {
      id: "usr_admin",
      username: "admin@beelovefarm.org",
      name: "BeeLove Master Administrator",
      role: "admin",
      email: "admin@beelovefarm.org",
      county: "All Regions",
      avatarEmoji: "🛡️",
    },
  },
};

const STORAGE_KEY = "beelove_dashboard_session_v1";

export function getCurrentSession(): DashboardUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DashboardUser;
  } catch {
    return null;
  }
}

export function saveSession(user: DashboardUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to persist dashboard session", e);
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear dashboard session", e);
  }
}

export function authenticate(
  identifier: string,
  pass: string,
  expectedRole?: UserRole
): { success: boolean; user?: DashboardUser; error?: string } {
  const cleanId = identifier.trim().toLowerCase();
  const entry = Object.entries(REGISTERED_ACCOUNTS).find(
    ([k]) => k.toLowerCase() === cleanId
  );

  if (!entry) {
    return {
      success: false,
      error: "Username or email not found. Please check your credentials.",
    };
  }

  const [_, cred] = entry;
  if (cred.passwordHash !== pass.trim()) {
    return {
      success: false,
      error: "Incorrect password. Please try again.",
    };
  }

  // If user role is admin, they can access both farmer and organization dashboards
  if (expectedRole && cred.user.role !== "admin" && cred.user.role !== expectedRole) {
    return {
      success: false,
      error: `This account is a ${cred.user.role.toUpperCase()} account. Please switch to the ${cred.user.role === "farmer" ? "Farmer" : "Organization"} sign-in tab.`,
    };
  }

  saveSession(cred.user);
  return { success: true, user: cred.user };
}
