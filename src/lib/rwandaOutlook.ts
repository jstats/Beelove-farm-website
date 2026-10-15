// Generated from jstats/beelove-forecast (rwanda/build_rwanda.py), computed 15 Oct 2026.
// District averages of the 0.25° squares. outlook=false: no skill there, so 1-in-3 odds and usual rain are shown.

export type RwandaDistrict = {
  name: string;
  province: string;
  outlook: boolean;
  pBelow: number;
  pAbove: number;
  predMm: number;
  normalMm: number;
  dots: 0 | 1 | 2 | 3;
};

export const RWANDA_OUTLOOK = {
  season: "October–December 2026",
  computed: "15 Oct 2026",
  years: "1982–2025",
  squares: 50,
  squaresWithOutlook: 34,
} as const;

export const RWANDA_DISTRICTS: RwandaDistrict[] = [
  {
    "name": "Bugesera",
    "province": "Eastern",
    "outlook": true,
    "pBelow": 0.18,
    "pAbove": 0.58,
    "predMm": 355,
    "normalMm": 322,
    "dots": 1
  },
  {
    "name": "Burera",
    "province": "Northern",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 392,
    "normalMm": 392,
    "dots": 0
  },
  {
    "name": "Gakenke",
    "province": "Northern",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 381,
    "normalMm": 381,
    "dots": 0
  },
  {
    "name": "Gasabo",
    "province": "Kigali City",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 334,
    "normalMm": 334,
    "dots": 0
  },
  {
    "name": "Gatsibo",
    "province": "Eastern",
    "outlook": true,
    "pBelow": 0.23,
    "pAbove": 0.48,
    "predMm": 356,
    "normalMm": 334,
    "dots": 1
  },
  {
    "name": "Gicumbi",
    "province": "Northern",
    "outlook": true,
    "pBelow": 0.21,
    "pAbove": 0.48,
    "predMm": 376,
    "normalMm": 352,
    "dots": 1
  },
  {
    "name": "Gisagara",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.26,
    "pAbove": 0.47,
    "predMm": 422,
    "normalMm": 399,
    "dots": 1
  },
  {
    "name": "Huye",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.22,
    "pAbove": 0.58,
    "predMm": 428,
    "normalMm": 387,
    "dots": 2
  },
  {
    "name": "Kamonyi",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.18,
    "pAbove": 0.57,
    "predMm": 369,
    "normalMm": 336,
    "dots": 1
  },
  {
    "name": "Karongi",
    "province": "Western",
    "outlook": true,
    "pBelow": 0.19,
    "pAbove": 0.5,
    "predMm": 428,
    "normalMm": 394,
    "dots": 1
  },
  {
    "name": "Kayonza",
    "province": "Eastern",
    "outlook": true,
    "pBelow": 0.18,
    "pAbove": 0.61,
    "predMm": 362,
    "normalMm": 329,
    "dots": 2
  },
  {
    "name": "Kicukiro",
    "province": "Kigali City",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 332,
    "normalMm": 332,
    "dots": 0
  },
  {
    "name": "Kirehe",
    "province": "Eastern",
    "outlook": true,
    "pBelow": 0.14,
    "pAbove": 0.63,
    "predMm": 374,
    "normalMm": 338,
    "dots": 1
  },
  {
    "name": "Muhanga",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.2,
    "pAbove": 0.53,
    "predMm": 402,
    "normalMm": 370,
    "dots": 1
  },
  {
    "name": "Musanze",
    "province": "Northern",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 439,
    "normalMm": 439,
    "dots": 0
  },
  {
    "name": "Ngoma",
    "province": "Eastern",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 347,
    "normalMm": 347,
    "dots": 0
  },
  {
    "name": "Ngororero",
    "province": "Western",
    "outlook": true,
    "pBelow": 0.21,
    "pAbove": 0.48,
    "predMm": 409,
    "normalMm": 382,
    "dots": 1
  },
  {
    "name": "Nyabihu",
    "province": "Western",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 411,
    "normalMm": 411,
    "dots": 0
  },
  {
    "name": "Nyagatare",
    "province": "Eastern",
    "outlook": true,
    "pBelow": 0.15,
    "pAbove": 0.55,
    "predMm": 361,
    "normalMm": 331,
    "dots": 1
  },
  {
    "name": "Nyamagabe",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.19,
    "pAbove": 0.53,
    "predMm": 489,
    "normalMm": 447,
    "dots": 2
  },
  {
    "name": "Nyamasheke",
    "province": "Western",
    "outlook": true,
    "pBelow": 0.16,
    "pAbove": 0.53,
    "predMm": 522,
    "normalMm": 479,
    "dots": 2
  },
  {
    "name": "Nyanza",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.2,
    "pAbove": 0.58,
    "predMm": 408,
    "normalMm": 369,
    "dots": 2
  },
  {
    "name": "Nyarugenge",
    "province": "Kigali City",
    "outlook": true,
    "pBelow": 0.21,
    "pAbove": 0.52,
    "predMm": 364,
    "normalMm": 337,
    "dots": 1
  },
  {
    "name": "Nyaruguru",
    "province": "Southern",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 480,
    "normalMm": 480,
    "dots": 0
  },
  {
    "name": "Rubavu",
    "province": "Western",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 398,
    "normalMm": 398,
    "dots": 0
  },
  {
    "name": "Ruhango",
    "province": "Southern",
    "outlook": true,
    "pBelow": 0.2,
    "pAbove": 0.59,
    "predMm": 375,
    "normalMm": 340,
    "dots": 1
  },
  {
    "name": "Rulindo",
    "province": "Northern",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 360,
    "normalMm": 360,
    "dots": 0
  },
  {
    "name": "Rusizi",
    "province": "Western",
    "outlook": true,
    "pBelow": 0.22,
    "pAbove": 0.47,
    "predMm": 520,
    "normalMm": 491,
    "dots": 1
  },
  {
    "name": "Rutsiro",
    "province": "Western",
    "outlook": false,
    "pBelow": 0.33,
    "pAbove": 0.33,
    "predMm": 384,
    "normalMm": 384,
    "dots": 0
  },
  {
    "name": "Rwamagana",
    "province": "Eastern",
    "outlook": true,
    "pBelow": 0.21,
    "pAbove": 0.53,
    "predMm": 353,
    "normalMm": 329,
    "dots": 1
  }
];
