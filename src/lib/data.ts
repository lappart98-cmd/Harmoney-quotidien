export interface Product {
  id: string;
  name: string;
  price: number;
  svg: string;
  color: string;
}

export interface FlocOption {
  id: string;
  name: string;
  price: number;
}

export interface Technique {
  id: string;
  name: string;
  badge: string;
  desc: string;
  rec: boolean;
}

export interface Menu {
  name: string;
  min: number;
  max: number;
  label: string;
}

const SVG_TSHIRT =
  '<svg viewBox="0 0 48 48" fill="currentColor"><path d="M16 8L8 16l4 4 4-3v21h16V17l4 3 4-4-8-8c0 3.5-3 6-8 6s-8-2.5-8-6z"/></svg>';
const SVG_HOODIE =
  '<svg viewBox="0 0 48 48" fill="currentColor"><path d="M15 8L7 16l4 5 4-4v21h18V17l4 4 4-5-8-8c0 4-4 7-9 7s-9-3-9-7z"/><ellipse cx="24" cy="7" rx="5" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
const SVG_BAG =
  '<svg viewBox="0 0 48 48" fill="currentColor"><rect x="10" y="18" width="28" height="24" rx="2"/><path d="M18 18v-5a6 6 0 0 1 12 0v5" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>';
const SVG_CAP =
  '<svg viewBox="0 0 48 48" fill="currentColor"><path d="M8 28c0-10 7-16 16-16s16 6 16 16H8z"/><rect x="6" y="27" width="18" height="5" rx="2.5"/></svg>';
const SVG_POLO =
  '<svg viewBox="0 0 48 48" fill="currentColor"><path d="M16 8L8 16l4 4 4-3v21h16V17l4 3 4-4-8-8c0 3.5-3 6-8 6s-8-2.5-8-6z"/><path d="M20 8l4 7 4-7" fill="none" stroke="#f4f0e8" stroke-width="2"/></svg>';

export const PRODUCTS: Product[] = [
  { id: "tshirt-b", name: "T-Shirt Basique 190G", price: 9, svg: SVG_TSHIRT, color: "#e8e2d0" },
  { id: "tshirt-o", name: "T-Shirt Oversize 220G", price: 15, svg: SVG_TSHIRT, color: "#2a2722" },
  { id: "sweat", name: "Sweat Col Rond 280G", price: 23, svg: SVG_HOODIE, color: "#2a2722" },
  { id: "hoodie", name: "Hoodie Classic 260G", price: 17, svg: SVG_HOODIE, color: "#3a3832" },
  { id: "tote", name: "Tote Bag", price: 5, svg: SVG_BAG, color: "#2a2722" },
  { id: "casquette", name: "Casquette Snapback", price: 8, svg: SVG_CAP, color: "#2a2722" },
  { id: "polo", name: "Polo 210G", price: 11, svg: SVG_POLO, color: "#2a2722" },
];

export const MENUS: Record<string, Menu> = {
  solo: { name: "LE P'TIT SOLO", min: 1, max: 4, label: "1 A 4 pieces" },
  team: { name: "LE MENU TEAM", min: 5, max: 14, label: "5 A 14 pieces" },
  bestof: { name: "LE MAXI BEST-OF", min: 15, max: 40, label: "15 A 40 pieces" },
};

export const FLOCS: FlocOption[] = [
  { id: "dos", name: "Dos", price: 5 },
  { id: "coeur", name: "Coeur", price: 3 },
];

export const TECHS: Technique[] = [
  { id: "dtf", name: "DTF", badge: "Recommande", desc: "Impression haute qualite, couleurs vives, tous textiles", rec: true },
  { id: "stickers", name: "Stickers UV", badge: "Sur demande", desc: "Vitrophanie, stickers, surfaces rigides", rec: false },
  { id: "broderie", name: "Broderie", badge: "Sur demande", desc: "Rendu premium, ideal logos & casquettes", rec: false },
];
