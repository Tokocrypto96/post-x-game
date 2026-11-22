// config.js — semua konstanta permainan di satu tempat.
// Ubah angka di sini untuk menyetel kesulitan tanpa menyentuh logika.
// (Script biasa, tanpa modul, supaya game jalan langsung dari file://.)
const CONFIG = {
  width: 800,
  height: 520,
  groundY: 480,
  timeLimit: 60, // detik
  startLives: 3,
  catSpeed: 420, // px per detik
  catWidth: 92,
  catHeight: 64,
  spawnIntervalStart: 0.85, // detik antar dimsum
  spawnIntervalMin: 0.34,
  fallSpeedStart: 130,
  fallSpeedStep: 26, // tambah per level
  pointsPerLevel: 150,
  pointsNormal: 10,
  pointsGolden: 50,
  goldenChance: 0.12,
  chiliChance: 0.14,
};
