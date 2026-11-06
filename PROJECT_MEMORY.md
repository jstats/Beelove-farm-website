# BeeLove Farm — Project Memory, Decisions & Engineering Ledger
*Last Updated: 4 November 2026 · Canonical Reference for All Engineering & AI Agents*

---

## 1. Repositories & Branches

| Project Component | Canonical GitHub Remote | Active Branch | Status & Notes |
| :--- | :--- | :--- | :--- |
| **Website & Dashboards** | `jstats/Beelove-farm-website` | `main` | **Canonical.** Powers `beelovefarm.org`. Pushes go **exclusively** here. |
| *Old Website Mirror* | `jstats/your-website-builder` | `main` | **DEPRECATED.** Disconnected from remotes. Do not push here. |
| **Farmer Mobile App** | `jstats/beelove-farmer-app` | `update-1.2` | React Native / Expo codebase for Play Store submission. |
| **Forecast Engine** | `jstats/beelove-forecast` | `main` | CHIRPS / OISST seasonal rainfall onset models & GeoTIFF exports. |
| **Native Android Applet** | Workspace `/app/applet` | `main` | Jetpack Compose applet (`com.example`, App: "Beelove Farm"). |

---

## 2. Core Non-Negotiable Ground Rules

### A. Branding & Identity
1. **Authentic Logo Only:** Always use the authentic BeeLove Farm logo located at `beelove-farmer-app/assets/logo.png` (mirrored to `public/images/beelove-logo.png`). Never use AI-generated or generic bee graphics.
2. **No Version Tag Clutter:** Do not plaster "v1.2", "Version 1.2", or "Build 1.2" across headers, hero banners, navigation, or buttons. Refer to products cleanly as **"BeeLove Farmer App"**, **"BeeLove Mobile"**, or **"BeeLove Advisor"**.
3. **Farm Location Prominence:** The farm's physical home—**Kiunduani, Makueni County, Kenya**—must be prominently displayed at the top of the homepage and in the hero section ("📍 Kiunduani, Makueni County, Kenya • Shipping Worldwide").
4. **App Section Placement:** Keep the Mobile App showcase section near the top of the landing page (directly beneath Hero and Highlights) so smallholders and visitors see it immediately without having to scroll.

### B. Farm Intelligence & Telemetry Rules
1. **No Phantom Sensors:** Physical sentinel telemetry boards (LilyGO 4G) are still in quoting/fabrication stages. **Never claim live acoustic swarm detection, brood temperatures, or forager activity** in the app or website copy.
2. **BeeLove Advisor Rebranding:** The advisory component is branded as **"BeeLove Advisor"**—an explainable, 100% offline rule engine that evaluates inspection recency, rainfall onset windows, and seasonal dearths. Do not label simple offline rule engines as "AI".
3. **Realistic Empty-Hive Opportunity Formula:** African bees do not return; hives are occupied solely via swarm capture. All empty-hive economic valuations must use realistic dryland figures:
   $$\text{Expected Value} = \text{Empty Hives} \times 50\%\text{ bait capture rate} \times 10\text{ kg avg yield} \times \text{KES } 800\text{/kg} = \text{KES } 4,000 \text{ per empty hive}$$
   Never claim unrealized 25–30 kg peak potential without farm-measured records.

### C. Privacy, Security & Data Ethics
1. **Coordinates are Confidential:** Precise GPS coordinates of rural apiaries must **never** be exposed on public or cooperative dashboards. An apiary map is a hive theft register. Coordinates must remain coarsened to ~1 km or aggregated at the ward level.
2. **Contact Masking:** Smallholder phone numbers on shared dashboards must be masked (e.g., `+254 722 ••• 022`).
3. **Cooperative Dashboard Status:** The Organization / Cooperative Hub must always carry prominent badges and disclaimers indicating it is an **Interactive Dummy Simulation** with synthetic sample records.
4. **Robots Indexing:** All dashboard pages (`/farmer-dashboard`, `/org-dashboard`) must enforce `noindex, nofollow` to prevent search engine indexing.

---

## 3. Work Completed Ledger (4 Nov 2026)

### Farmer App (`beelove-farmer-app` on `update-1.2`)
- **Location Bug Fixed:** Resolved the profile county fallback in `AddApiary.tsx`. Integrated a dedicated County Picker supporting all 47 Kenyan counties and GPS nearest-county detection so typing/selecting "Kisumu" cleanly assigns Kisumu County, without conflating with Nairobi.
- **Direct Number Typing:** Upgraded `NumBox` in `src/ui.tsx` and `HiveTable.tsx` with tap-to-focus numeric keyboard entry alongside steppers.
- **Advisor Clean-up:** Rebranded to "BeeLove Advisor", removed acoustic/brood sensor claims, placed sensor rules behind `hasSensors` (default: false).
- **Economic Formula:** Aligned `OccupancyHeroCard.tsx` with the KES 4,000/empty hive expected valuation formula.
- **Committed & Pushed:** Commit `b1f278b`.

### Website (`Beelove-farm-website` on `main`)
- **Canonical Remote:** Updated Git remote so `origin` pushes exclusively to `https://github.com/jstats/Beelove-farm-website.git`. Disconnected `your-website-builder`.
- **Authentic Logo:** Restored original brand logo from `assets/logo.png`.
- **Hero & Navigation Revamp:** Removed green banner pills and "v1.2" clutter from `SiteNav.tsx` and `index.tsx`. Replaced hero AI mockup with authentic farm photography.
- **Top Location Badge:** Added `📍 Kiunduani, Makueni County, Kenya • Shipping Worldwide` badge at the top of the hero.
- **App Showcase Prominence:** Moved the Farmer Mobile App showcase directly below the Hero and Stats strip.
- **Dummy Simulation Safeguards:** Explicitly branded `/org-dashboard` as a dummy prototype with sample smallholder records, masked phone numbers, and privacy notices.
- **Committed & Pushed:** Commits `08ba74b`, `aba4b76`, and `6b030ad`.


### Website Dashboards Authentication & GCP Data Integration (6 Nov 2026)
- **Role-Based Authentication (`src/lib/dashboard-auth.ts`):** Implemented username and password protection for all farm intelligence dashboards. Supports `farmer`, `organization`, and `admin` roles with session persistence.
- **GCP Data Layer (`src/lib/gcp-data.ts`):** Connected real smallholder data from GCP/Apps Script backend (`https://script.google.com/macros/s/...`) and BigQuery models. Integrated BeeLove Farm (Kiunduani Main Apiary, Makueni) with real Langstroth, KTBH, and traditional log hive counts.
- **Login Modal (`src/components/DashboardLoginModal.tsx`):** Branded dual-tab portal with 1-click quick login for BeeLove Farm (Owner), Smallholder (Zeb Mwandi), and Cooperative (Makueni Co-op).
- **Upgraded Farmer Dashboard (`src/routes/farmer-dashboard.tsx`):** Authenticated view with live colony occupancy radial gauge, canonical KES 4,000 empty-hive opportunity valuation, localized 40-year CHIRPS rain normals, and interactive hive inspection logger.
- **Upgraded Organization Hub (`src/routes/org-dashboard.tsx`):** Authenticated cooperative portal with aggregated hive totals, projected harvest yield (kg), regional county/sub-county filtering, privacy-safe masked phone numbers, coarsened coordinates, and swarm advisory broadcast tool.
- **Farmers App Safeguard:** Preserved farmer mobile app completely untouched.

### Native Android Applet (`/app/applet`)
- **Applet Metadata:** Synced `metadata.json` and `res/values/strings.xml` to `"Beelove Farm"`.
- **Direct Hive Entry:** `AddApiaryDialog` in `ApiaryScreen.kt` supports direct typing via `KeyboardType.Number` and Kenyan county dropdown selection.
- **Advisor Alignment:** Rebranded to BeeLove Advisor with realistic expected value formulas in `EmptyHiveOpportunityCard.kt`.
- **Build Status:** Verified passing with `compile_applet`.

---

## 4. Next Priorities Checklist
1. [ ] **Play Store Staged Rollout (v1.2):** Submit 20% staged rollout on Google Play Console; confirm Data Safety questionnaire and target SDK.
2. [ ] **Seasonal Rainfall Forecast:** Wire fitted per-cell probabilities into `forecast.json` in `beelove-forecast`.
3. [ ] **Nowcast Layer (P2):** Build 4-state alert engine (`nowcast.json`) driven by daily rainfall onset and farmer reports.
