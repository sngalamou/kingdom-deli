// verify-orderable.ts
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { resolveVariationId } from './src/lib/orderable.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MENU_DIR = join(__dirname, 'src', 'content', 'menu');

const NO_PRICE = new Map<string, string>([
  ['TPUU6TIXNKNSDKNPSAWS4A5G', 'Buffalo Wings — no price set in Square'],
]);

type Row = { file: string; name: string; id: string | undefined };

const rows: Row[] = [];
for (const file of readdirSync(MENU_DIR).filter((f) => f.endsWith('.json'))) {
  const raw = JSON.parse(readFileSync(join(MENU_DIR, file), 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.items ?? [];
  for (const it of items) {
    if (!it?.name) continue;
    rows.push({ file, name: it.name, id: resolveVariationId(it.name) });
  }
}

const ok = rows.filter((r) => r.id);
const missing = rows.filter((r) => !r.id);
const pad = (s: string, n: number) => s.padEnd(n);

console.log(`\n  Menu items scanned: ${rows.length}  (${ok.length} orderable, ${missing.length} no button)\n`);

let lastFile = '';
console.log('  WILL show an Add button:');
for (const r of ok.sort((a, b) => a.file.localeCompare(b.file) || a.name.localeCompare(b.name))) {
  if (r.file !== lastFile) { console.log(`   -- ${r.file}`); lastFile = r.file; }
  const warn = NO_PRICE.get(r.id!) ? `   [!] ${NO_PRICE.get(r.id!)}` : '';
  console.log(`      ${pad(r.name, 34)} -> ${r.id}${warn}`);
}

lastFile = '';
console.log('\n  NO button (not in Square catalog / no alias):');
for (const r of missing.sort((a, b) => a.file.localeCompare(b.file) || a.name.localeCompare(b.name))) {
  if (r.file !== lastFile) { console.log(`   -- ${r.file}`); lastFile = r.file; }
  console.log(`      ${r.name}`);
}

const byId = new Map<string, string[]>();
for (const r of ok) {
  const arr = byId.get(r.id!) ?? [];
  arr.push(r.name);
  byId.set(r.id!, arr);
}
const dups = [...byId.entries()].filter(([, names]) => names.length > 1);
if (dups.length) {
  console.log('\n  [!] Multiple menu items map to the SAME Square item:');
  for (const [id, names] of dups) console.log(`      ${id}  <-  ${names.join('  +  ')}`);
}
console.log('');
