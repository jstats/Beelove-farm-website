export const WA_NUMBER = "254729396897";
export const EMAIL = "beelovefarm25@gmail.com";
export const INSTAGRAM = "thebeelovefarm";

export function wa(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop/beekeeping", label: "Beekeeping" },
  { to: "/shop/fish", label: "Fish Farming" },
  { to: "/map", label: "Suitability Map" },
  { to: "/hive-sensors", label: "Hive Sensors" },
  { to: "/contact", label: "Contact" },
] as const;
