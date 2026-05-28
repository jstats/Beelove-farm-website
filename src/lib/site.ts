export const WA_NUMBER = "254729396897";
export const EMAIL = "beelovefarm25@gmail.com";
export const INSTAGRAM = "thebeelovefarm";

export function wa(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * 6-item top nav. Three of the items are dropdown groups so we collapse
 * Shop + Training (and the two intelligence tools) into a single label each.
 *
 * `children` is undefined for plain links, or an array of {to, label, desc}
 * for dropdown groups.
 */
export type NavChild = { to: string; label: string; desc: string };
export type NavItem = { to: string; label: string; children?: NavChild[] };

export const NAV_LINKS: readonly NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    to: "/shop/beekeeping",
    label: "Beekeeping",
    children: [
      { to: "/shop/beekeeping", label: "Shop honey & products", desc: "Raw honey, hives, gear and processing equipment" },
      { to: "/training/beekeeping", label: "Training", desc: "Hands-on apiculture courses and farmer groups" },
    ],
  },
  {
    to: "/shop/fish",
    label: "Fish Farming",
    children: [
      { to: "/shop/fish", label: "Fingerlings & Azolla", desc: "Tilapia, catfish fingerlings and Azolla feed" },
      { to: "/training/fish", label: "Training", desc: "Aquaculture, pond setup and Azolla integration" },
    ],
  },
  {
    to: "/map",
    label: "Farm Intelligence",
    children: [
      { to: "/map", label: "Suitability Map", desc: "Find where your land suits bees, fish or Azolla" },
      { to: "/hive-sensors", label: "Hive Sensors", desc: "IoT monitoring for traditional beekeepers" },
    ],
  },
  { to: "/contact", label: "Contact" },
] as const;
