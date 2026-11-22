// main.ts — utilitas kecil untuk lomba make.fun.
// Tugasnya hanya satu: salin POST.json dari direktori bot ke direktori
// output, byte demi byte, supaya file yang disetor sama persis dengan
// yang ada di repo. Tanpa dependensi, tanpa network.
//
// Pemakaian:
//   MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Tanpa env: bot dir "." dan output dir "/output".
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");

// Guard: gagal cepat dengan pesan jelas kalau sumbernya belum ada.
if (!existsSync(source)) {
  console.error("POST.json tidak ditemukan di " + source);
  console.error("Pastikan MAKEFUN_BOT_DIR menunjuk ke root repo (berisi POST.json).");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "POST.json"));
const bytes = statSync(join(outDir, "POST.json")).size;
console.log(`POST.json disalin ke ${join(outDir, "POST.json")} (${bytes} byte, identik)`);
