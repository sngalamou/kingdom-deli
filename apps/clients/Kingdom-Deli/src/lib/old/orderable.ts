// src/lib/orderable.ts — menu display name → Square catalog variation ID.
export type CatalogEntry = { label: string; variationId: string };

const CATALOG: CatalogEntry[] = [
  { label: 'Chicago Style Polish', variationId: 'Q5HJPVGCAQSIVVJUJ7TDIQGL' },
  { label: 'Pastrami', variationId: 'TTDYROT7TBMUOKNA7GNVBB3A' },
  { label: 'Chicago Style Hot Dog', variationId: 'PDOEH5DDMCBP4WJPJGLBHYG7' },
  { label: 'Corn beef', variationId: 'Z22IVJ347E34OVUU46FEIED6' },
  { label: 'Chicken Wings 4pc', variationId: '2NWP2B3ZWKKJ5PGOX7XDVYIR' },
  { label: 'Steak Tacos', variationId: 'DK6ZVUZQLS7A7C5J3KJXHQ4D' },
  { label: 'Cheeseburger', variationId: 'XE5BWCKPKMA3JTUZ3VNE4YND' },
  { label: 'Hamburger', variationId: 'OZHVAWV3GGVVD3X77UH6XS57' },
  { label: 'Chicken Wrap', variationId: '5PGJ4ZOTESMMYXO7V3K6HBW3' },
  { label: 'Jerk Chicken Tips', variationId: 'CZETE4YTI2QANKX225NJQJBX' },
  { label: 'Soda Regular', variationId: '5ZY4AAWWKGZ4SHHGWIJGT4IC' },
  { label: 'Old Fashion Butter Cookies', variationId: 'IYGI7PN6EGF64IIZBINO5QDL' },
  { label: 'Pizza Puffs', variationId: '5DZA57YMXTRTVBFXMQJ7WNWW' },
  { label: 'Jerk Philly', variationId: 'H3Q67UD7EVLWBZCRKSK7BOAK' },
  { label: 'Veggie Wrap', variationId: 'OZGGRN5VDY5IG2MCPBWNC74C' },
  { label: 'Jerk Tacos 3', variationId: '3OYTKPEOA3PKDYEXIJU4GMIY' },
  { label: 'Chicken On A Stick', variationId: 'JDDEZPRRZL2L3MYODMQOGHBF' },
  { label: 'Chicken Rings', variationId: 'NVY7Q6FSCBKT2HZGBFW6VV5H' },
  { label: 'Bottled Water', variationId: 'FJEK73ZEDUZYS7VNHCYLLNGN' },
  { label: 'Chicken Tacos', variationId: 'RXIHOOXMH5Y6DML57E5YQZGC' },
  { label: 'Italian Beef', variationId: 'MUQDTKCODGIXI4C5HSLWUGCF' },
  { label: 'Cakes', variationId: '4HPTU3RKMMAJFM4KIA6GFR7F' },
  { label: 'Chicken & Waffles', variationId: 'MJMAS6AFEM4CSDET3F3RKKME' },
  { label: 'Maxwell Polish', variationId: 'URYLCKAMESMWELI3ZAETQ35Z' },
  { label: 'Chicken Wings 6pcs', variationId: 'FDIKWT357MXTEBMIBSOYPBVW' },
  { label: 'Jerk Wrap', variationId: 'XDCCY7MDSPAQMZH47OHPATLT' },
  { label: 'Fries', variationId: 'E63PYKGPROEHHD4BT6B7V34L' },
  { label: 'Soda Large', variationId: 'Z2ODWEYNCDQ7MFHWMMO2ZIL4' },
  { label: 'Add Combo', variationId: 'YIY2DQ7SGC5XWUVYIZGRKZ73' },
  { label: 'Wing & Tip Combo', variationId: 'OR55GQJNEFTCHTM677G5RLL2' },
  { label: 'Buffalo Wings', variationId: 'TPUU6TIXNKNSDKNPSAWS4A5G' }, // ⚠ no price in Square
  { label: 'Chicken & Mild Sauce', variationId: 'SIJUO7P66A3DOGWL3FRLLHBI' },
  { label: 'Jamaica Jerk Chicken', variationId: 'WDIRD44LS56RM37NNEVOFNSS' },
  { label: 'Mexican style tacos', variationId: 'CAFI3OZ6QR3EMKFYVY5A4X2R' },
  { label: "Mama's Cole Slaw", variationId: 'BWDALFKWWBQZWTEE27PUIEZB' },
  { label: 'Chocolate Cake', variationId: 'TPSR5TFZZEB7DZBHE2TV2GLD' },
  { label: 'German Chocolate Cake', variationId: 'DXWDMFPSEPBHYXADWXDIWNM4' },
  { label: 'Pound Cake', variationId: 'PKRO3P3G53GXNIIFCTZNXSLQ' },
  { label: 'Coconut Cake', variationId: 'DB5DWRO4SVL445SFVRGPNWWP' },
  { label: 'Lemonade — Large', variationId: '7EIEVHPKQKC6SN2ACAOMSHXG' },
  { label: 'Lemonade', variationId: 'EOF7YEDDJDXRFXEEDVUUQVKS' },
  { label: 'Cheese Fries', variationId: 'QEVFRX67UYERLRVHHD423GW3' },
  { label: 'Beef Tacos — 3 Tacos', variationId: 'YOESLGWK4TDWCDRZYFTJHR7P' },
  { label: 'Beef Tacos — Taco Dinner', variationId: 'O5DZQJHTJHPG6QY3XUI5JYGL' },
];

const norm = (s: string): string =>
  s.toLowerCase()
    .replace(/\s*—\s*regular$/i, '')
    .replace(/\(\d+\)/g, '')
    .replace(/['’.,&]/g, '')
    .replace(/\bsandwich\b/g, '')
    .replace(/^the\s+/, '')
    .replace(/[—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const ALIAS: Record<string, string> = {
  'corned beef': 'corn beef',
  'polish sausage': 'chicago style polish',
  'chicago dog': 'chicago style hot dog',
  'slaw': 'mamas cole slaw',
  'jerk chicken plate': 'jerk chicken tips',
  'beef tacos': 'beef tacos 3 tacos',
  'fountain soda': 'soda regular',
  'chicago lunchroom butter cookie': 'old fashion butter cookies',

  // ── added for the Square customer-facing display names ──
  'jamaican jerk chicken': 'jamaica jerk chicken',
  'chicken wings (4 pc)': 'chicken wings 4pc',
  'chicken wings (6 pc)': 'chicken wings 6pcs',
  'jerk tacos': 'jerk tacos 3',
  'make it a combo': 'add combo',
  'soda (regular)': 'soda regular',
  'soda (large)': 'soda large',
  'old fashioned butter cookies': 'old fashion butter cookies',
};

const byNorm = new Map<string, string>();
for (const e of CATALOG) byNorm.set(norm(e.label), e.variationId);

export const resolveVariationId = (name: string): string | undefined => {
  if (!name) return undefined;
  const n = norm(name);
  return byNorm.get(n) ?? (ALIAS[n] ? byNorm.get(ALIAS[n]) : undefined);
};

export const findUnresolved = (names: string[]): string[] =>
  names.filter((n) => !resolveVariationId(n));