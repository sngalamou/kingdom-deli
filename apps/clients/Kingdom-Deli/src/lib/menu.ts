// Menu loader.
// C:\Users\sngalamou\dev\ngc\kingdom-deli\apps\clients\Kingdom-Deli\src\lib
// Reads the 6 JSON files in src/content/menu/, returns categories sorted by
// displayOrder. Each category has its items inline.
//
// This file also NORMALIZES the item shape for the UI: the JSON stores `image`
// as a bare public/ path string, while @ngc/ui MenuItem consumes an object
// ({ url, alt }). normalizeItem() bridges the two, so the consumer
// (menu.astro) is written against the final shape.
//
// When Sanity is provisioned, swap this file's implementation to query Sanity
// and rewrite normalizeItem() to map the Sanity asset -> { url, alt }.
// The consumer does not need to change.

import deli from '../content/menu/deli.json';
import dogs from '../content/menu/dogs.json';
import plates from '../content/menu/plates.json';
import sides from '../content/menu/sides.json';
import drinks from '../content/menu/drinks.json';
import bakery from '../content/menu/bakery.json';

/** The six menu sections. An item's badge is derived from this. */
export type CategorySlug = 'deli' | 'dogs' | 'plates' | 'sides' | 'drinks' | 'bakery';

/** Normalized image the UI consumes. Mirrors @ngc/ui MenuItemImage. */
export interface MenuImage {
  url: string;
  alt?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  /** Drives the category badge (and, for 'dogs', the No-Pork stamp). */
  category: CategorySlug;
  available: boolean;
  featured?: boolean;
  image?: MenuImage;
}

/** Shape as stored in the JSON files - `image` is a bare public/ path string. */
interface RawMenuItem extends Omit<MenuItem, 'image'> {
  image?: string;
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
  items: RawMenuItem[];
}

const FILES: MenuFile[] = [
  deli as MenuFile,
  dogs as MenuFile,
  plates as MenuFile,
  sides as MenuFile,
  drinks as MenuFile,
  bakery as MenuFile,
];

/**
 * JSON string path -> { url, alt }. Items with no `image` key stay imageless,
 * which renders as a compact text-only card (see MenuItem.astro).
 * This is the single seam to rewrite when the data source becomes Sanity.
 */
function normalizeItem(raw: RawMenuItem): MenuItem {
  const { image, ...rest } = raw;
  return image ? { ...rest, image: { url: image, alt: raw.name } } : rest;
}

/** Returns all categories, sorted by displayOrder, items filtered to available. */
export function getMenu(): MenuCategory[] {
  return FILES.map((f) => ({
    ...f.category,
    items: f.items.filter((it) => it.available).map(normalizeItem),
  })).sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Returns just featured items across all categories - useful for home/order pages. */
export function getFeaturedItems(): MenuItem[] {
  return FILES.flatMap((f) =>
    f.items.filter((it) => it.available && it.featured).map(normalizeItem)
  );
}