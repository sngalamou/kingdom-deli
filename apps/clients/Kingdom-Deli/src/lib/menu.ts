// Menu loader.
//
// Reads the 6 JSON files in src/content/menu/, returns categories sorted by
// displayOrder. Each category has its items inline.
//
// When Sanity is provisioned, swap this file's implementation to query Sanity —
// the consumer (menu.astro) doesn't need to change.

import deli from '../content/menu/deli.json';
import dogs from '../content/menu/dogs.json';
import plates from '../content/menu/plates.json';
import sides from '../content/menu/sides.json';
import drinks from '../content/menu/drinks.json';
import bakery from '../content/menu/bakery.json';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  noPork: boolean;
  squareSku?: string;
  available: boolean;
  featured?: boolean;
}

export interface MenuCategory {
  name: string;
  slug: string;
  displayOrder: number;
  description?: string;
  items: MenuItem[];
}

interface MenuFile {
  category: Omit<MenuCategory, 'items'>;
  items: MenuItem[];
}

const FILES: MenuFile[] = [
  deli as MenuFile,
  dogs as MenuFile,
  plates as MenuFile,
  sides as MenuFile,
  drinks as MenuFile,
  bakery as MenuFile,
];

/** Returns all categories, sorted by displayOrder, items filtered to available. */
export function getMenu(): MenuCategory[] {
  return FILES.map((f) => ({
    ...f.category,
    items: f.items.filter((it) => it.available),
  })).sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Returns just featured items across all categories — useful for home/order pages. */
export function getFeaturedItems(): MenuItem[] {
  return FILES.flatMap((f) => f.items.filter((it) => it.available && it.featured));
}
