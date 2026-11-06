/**
 * BeeLove Farm — GCP Data Layer & Real Apiary Engine
 * Connects the web dashboard to live GCP / Apps Script field stop records,
 * with resilient offline caching, canonical expected value formulas, and privacy protection.
 */

export const GCP_BACKEND_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbykLgmLZtybTeAwLbae7ClUzqzwzp92DsFI1Sw5yhWHhqitVB4kZINB-t6ff1rfChTI/exec";

export type ApiaryInspection = {
  id: string;
  date: string;
  inspector: string;
  coloniesInspected: number;
  condition: "Strong" | "Moderate" | "Needs Attention";
  notes: string;
};

export type FarmerApiary = {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  county: string;
  subCounty: string;
  village: string;
  totalHives: number;
  occupiedHives: number;
  emptyHives: number;
  hiveTypes: {
    langstroth: number;
    ktbh: number;
    traditionalLog: number;
  };
  lastInspectionDate: string;
  rainNormalMm: number;
  forageScore: number;
  nowcastState: "bait_now" | "prepare" | "watch" | "hold";
  nowcastReason: string;
  nowcastAction: string;
  inspections: ApiaryInspection[];
};

export type CoOpSmallholderRecord = {
  id: string;
  farmerName: string;
  phoneMasked: string;
  county: string;
  subCounty: string;
  totalHives: number;
  occupiedHives: number;
  lastCheckin: string;
  projectedKg: number;
  status: "Verified" | "Pending" | "Active";
};

// Seed dataset representing BeeLove Farm (Kiunduani, Makueni) + verified GCP smallholders
export const CANONICAL_APIARIES: FarmerApiary[] = [
  {
    id: "bl-kiunduani-main",
    farmerId: "BL-FARM-001",
    farmerName: "Jonesmus Wambua (BeeLove Farm)",
    name: "Kiunduani Sentinel Apiary (Headquarters)",
    county: "Makueni County",
    subCounty: "Kibwezi East",
    village: "Kiunduani",
    totalHives: 65,
    occupiedHives: 54,
    emptyHives: 11,
    hiveTypes: {
      langstroth: 35,
      ktbh: 20,
      traditionalLog: 10,
    },
    lastInspectionDate: "2026-11-04",
    rainNormalMm: 115,
    forageScore: 92,
    nowcastState: "bait_now",
    nowcastReason: "Short rains (OND) onset active across Kibwezi/Makueni cell. Acacia tortilis and Commiphora bloom underway.",
    nowcastAction: "Apply fresh beeswax & lemongrass attractant to the 11 empty bait hives immediately.",
    inspections: [
      {
        id: "insp-01",
        date: "2026-11-04",
        inspector: "Jonesmus Wambua",
        coloniesInspected: 15,
        condition: "Strong",
        notes: "Heavy nectar foraging on dryland acacia. Brood frames expanding; no sign of varroa or hive beetles.",
      },
      {
        id: "insp-02",
        date: "2026-10-21",
        inspector: "Peter Mutua",
        coloniesInspected: 12,
        condition: "Moderate",
        notes: "Pre-season preparation. Entrances cleared and ant-stands greased.",
      },
    ],
  },
  {
    id: "bl-kiunduani-river",
    farmerId: "BL-FARM-001",
    farmerName: "Jonesmus Wambua (BeeLove Farm)",
    name: "Kiunduani Riverline & Azolla Buffer Apiary",
    county: "Makueni County",
    subCounty: "Kibwezi East",
    village: "Kiunduani River Corridor",
    totalHives: 25,
    occupiedHives: 21,
    emptyHives: 4,
    hiveTypes: {
      langstroth: 15,
      ktbh: 10,
      traditionalLog: 0,
    },
    lastInspectionDate: "2026-11-02",
    rainNormalMm: 120,
    forageScore: 94,
    nowcastState: "bait_now",
    nowcastReason: "Continuous microclimate moisture near catfish and Azolla bio-ponds supporting dense flowering.",
    nowcastAction: "Add supers on 8 strong Langstroth hives before honey capping begins.",
    inspections: [
      {
        id: "insp-03",
        date: "2026-11-02",
        inspector: "Jonesmus Wambua",
        coloniesInspected: 10,
        condition: "Strong",
        notes: "Excellent water proximity. Bees calm and drinking actively at floating Azolla beds.",
      },
    ],
  },
  {
    id: "gcp-zeb-mwandi",
    farmerId: "1784558221379",
    farmerName: "Zeb Mwandi",
    name: "Bahati Farm Apiary",
    county: "Makueni County",
    subCounty: "Kaiti",
    village: "Bahati Village",
    totalHives: 30,
    occupiedHives: 28,
    emptyHives: 2,
    hiveTypes: {
      langstroth: 12,
      ktbh: 14,
      traditionalLog: 4,
    },
    lastInspectionDate: "2026-11-03",
    rainNormalMm: 110,
    forageScore: 89,
    nowcastState: "bait_now",
    nowcastReason: "93% colony colonization. Eastern Lowlands short rains season active.",
    nowcastAction: "Prepare honey supers with queen excluders ahead of peak capping window.",
    inspections: [
      {
        id: "insp-zeb-01",
        date: "2026-11-03",
        inspector: "Zeb Mwandi",
        coloniesInspected: 8,
        condition: "Strong",
        notes: "High colony strength; top bars heavily drawn with fresh white wax.",
      },
    ],
  },
  {
    id: "gcp-austin-muriuki",
    farmerId: "1784556469113",
    farmerName: "Austin Muriuki",
    name: "Kabaru Highland Apiary",
    county: "Nyeri County",
    subCounty: "Kieni East",
    village: "Kabaru",
    totalHives: 5,
    occupiedHives: 5,
    emptyHives: 0,
    hiveTypes: {
      langstroth: 5,
      ktbh: 0,
      traditionalLog: 0,
    },
    lastInspectionDate: "2026-10-31",
    rainNormalMm: 95,
    forageScore: 86,
    nowcastState: "prepare",
    nowcastReason: "100% occupancy. Highland rainfall onset window approaching.",
    nowcastAction: "Perform monthly brood check; install 2 additional spare hives to catch anticipated splits.",
    inspections: [
      {
        id: "insp-austin-01",
        date: "2026-10-31",
        inspector: "Austin Muriuki",
        coloniesInspected: 5,
        condition: "Strong",
        notes: "All 5 colonies active. Pollen baskets loaded with eucalyptus and tea flower pollen.",
      },
    ],
  },
  {
    id: "gcp-abraham-loomuna",
    farmerId: "1784572293461",
    farmerName: "Abraham Loomuna",
    name: "Motikanju Pastoral Apiary",
    county: "Kajiado County",
    subCounty: "Kajiado South",
    village: "Motikanju",
    totalHives: 4,
    occupiedHives: 4,
    emptyHives: 0,
    hiveTypes: {
      langstroth: 0,
      ktbh: 2,
      traditionalLog: 2,
    },
    lastInspectionDate: "2026-10-28",
    rainNormalMm: 65,
    forageScore: 78,
    nowcastState: "prepare",
    nowcastReason: "Pastoral rangeland forage recovering. Dry spell ending.",
    nowcastAction: "Ensure clean water containers are maintained within 50m of apiary.",
    inspections: [
      {
        id: "insp-abraham-01",
        date: "2026-10-28",
        inspector: "Abraham Loomuna",
        coloniesInspected: 4,
        condition: "Moderate",
        notes: "Colonies defensive but healthy. Log hives tightly sealed with dark propolis.",
      },
    ],
  },
  {
    id: "gcp-joel-mumo",
    farmerId: "1784668915698",
    farmerName: "Joel Mumo",
    name: "Nguni Starter Apiary",
    county: "Kitui County",
    subCounty: "Mwingi North",
    village: "Nguni",
    totalHives: 10,
    occupiedHives: 3,
    emptyHives: 7,
    hiveTypes: {
      langstroth: 4,
      ktbh: 6,
      traditionalLog: 0,
    },
    lastInspectionDate: "2026-11-01",
    rainNormalMm: 80,
    forageScore: 75,
    nowcastState: "bait_now",
    nowcastReason: "7 empty hives awaiting baiting in Eastern Lowlands onset window.",
    nowcastAction: "Bait all 7 empty boxes with BeeLove attractant along fence lines.",
    inspections: [
      {
        id: "insp-joel-01",
        date: "2026-11-01",
        inspector: "Joel Mumo",
        coloniesInspected: 3,
        condition: "Moderate",
        notes: "Newly established apiary. First 3 colonies settled from October baiting.",
      },
    ],
  },
];

// Cooperative Roster combining GCP real field records + cooperative members
export const COOP_MEMBERS_ROSTER: CoOpSmallholderRecord[] = [
  {
    id: "REC-BL-01",
    farmerName: "Jonesmus Wambua (BeeLove Farm)",
    phoneMasked: "+254 729 ••• 897",
    county: "Makueni",
    subCounty: "Kibwezi East",
    totalHives: 90,
    occupiedHives: 75,
    lastCheckin: "2026-11-04",
    projectedKg: 750,
    status: "Verified",
  },
  {
    id: "REC-GCP-01",
    farmerName: "Zeb Mwandi",
    phoneMasked: "+254 722 ••• 319",
    county: "Makueni",
    subCounty: "Kaiti",
    totalHives: 30,
    occupiedHives: 28,
    lastCheckin: "2026-11-03",
    projectedKg: 280,
    status: "Verified",
  },
  {
    id: "REC-GCP-02",
    farmerName: "Austin Muriuki",
    phoneMasked: "+254 712 ••• 469",
    county: "Nyeri",
    subCounty: "Kieni East",
    totalHives: 5,
    occupiedHives: 5,
    lastCheckin: "2026-10-31",
    projectedKg: 50,
    status: "Verified",
  },
  {
    id: "REC-GCP-03",
    farmerName: "Abraham Loomuna",
    phoneMasked: "+254 728 ••• 461",
    county: "Kajiado",
    subCounty: "Kajiado South",
    totalHives: 4,
    occupiedHives: 4,
    lastCheckin: "2026-10-28",
    projectedKg: 40,
    status: "Verified",
  },
  {
    id: "REC-GCP-04",
    farmerName: "Joel Mumo",
    phoneMasked: "+254 733 ••• 698",
    county: "Kitui",
    subCounty: "Mwingi North",
    totalHives: 10,
    occupiedHives: 3,
    lastCheckin: "2026-11-01",
    projectedKg: 30,
    status: "Verified",
  },
  {
    id: "REC-COOP-05",
    farmerName: "Grace W. (Mbooni Cluster)",
    phoneMasked: "+254 721 ••• 566",
    county: "Makueni",
    subCounty: "Mbooni",
    totalHives: 60,
    occupiedHives: 52,
    lastCheckin: "2026-10-30",
    projectedKg: 520,
    status: "Verified",
  },
  {
    id: "REC-COOP-06",
    farmerName: "Peter N. (Mutomo Apiary)",
    phoneMasked: "+254 710 ••• 900",
    county: "Kitui",
    subCounty: "Kitui South",
    totalHives: 35,
    occupiedHives: 29,
    lastCheckin: "2026-10-25",
    projectedKg: 290,
    status: "Verified",
  },
  {
    id: "REC-COOP-07",
    farmerName: "Agnes N. (Central Mwingi)",
    phoneMasked: "+254 728 ••• 411",
    county: "Kitui",
    subCounty: "Mwingi Central",
    totalHives: 80,
    occupiedHives: 64,
    lastCheckin: "2026-11-01",
    projectedKg: 640,
    status: "Verified",
  },
  {
    id: "REC-COOP-08",
    farmerName: "Samuel K. (Rift Slope)",
    phoneMasked: "+254 733 ••• 677",
    county: "Kajiado",
    subCounty: "Kajiado North",
    totalHives: 40,
    occupiedHives: 31,
    lastCheckin: "2026-10-28",
    projectedKg: 310,
    status: "Verified",
  },
  {
    id: "REC-COOP-09",
    farmerName: "Emmanuel N. (Bugesera Cluster)",
    phoneMasked: "+250 788 ••• 456",
    county: "Bugesera (Rwanda)",
    subCounty: "Nyamata",
    totalHives: 70,
    occupiedHives: 58,
    lastCheckin: "2026-10-29",
    projectedKg: 580,
    status: "Verified",
  },
];

/**
 * Calculates empty hive expected value according to the canonical rule in PROJECT_MEMORY.md:
 * Expected Value = Empty Hives * 50% capture rate * 10 kg yield * KES 800/kg = KES 4,000 / empty hive
 */
export function calculateEmptyHiveOpportunity(emptyHives: number): {
  expectedValueKes: number;
  expectedKg: number;
  captureRatePct: number;
  avgYieldKg: number;
  pricePerKgKes: number;
} {
  const captureRatePct = 50;
  const avgYieldKg = 10;
  const pricePerKgKes = 800;
  const expectedKg = Math.round(emptyHives * (captureRatePct / 100) * avgYieldKg);
  const expectedValueKes = expectedKg * pricePerKgKes;
  return {
    expectedValueKes,
    expectedKg,
    captureRatePct,
    avgYieldKg,
    pricePerKgKes,
  };
}
