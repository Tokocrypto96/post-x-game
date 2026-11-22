# 🐱 Kucing Tangkap Dimsum

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Last commit](https://img.shields.io/github/last-commit/Tokocrypto96/post-x-game)
![Repo size](https://img.shields.io/github/repo-size/Tokocrypto96/post-x-game)

Game web offline kecil: seekor kucing lapar menangkap dimsum yang jatuh dari langit. Dibangun dari **satu prompt** untuk lomba [make.fun — The Agent Builds a Game From One Prompt](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709).

## Cara main

- Gerakkan kucing dengan **← →** / **A D**, atau gerakkan **mouse**.
- Tangkap dimsum yang jatuh sebelum menyentuh tanah.
- Dimsum biasa **+10 poin**, dimsum emas **+50 poin**, cabai **−1 nyawa** (hati).
- Waktu **60 detik**. Tiap 150 poin naik satu level — dimsum jatuh makin cepat dan makin banyak.
- Game over saat waktu habis atau nyawa habis. Tekan **R** atau klik tombol untuk main lagi.

## Main offline

Buka `game/index.html` di browser desktop (Chrome). Tanpa server, tanpa internet, semua aset digambar dengan canvas.

## Struktur

```
game/
  index.html   — halaman + canvas + HUD
  config.js    — konstanta permainan (waktu, poin, kecepatan)
  random.js    — RNG kecil (seeded, deterministik untuk tes)
  input.js     — keyboard + mouse
  render.js    — gambar kucing, dimsum, cabai, latar
  main.js      — loop permainan, skor, level, game over
main.ts        — utilitas: salin POST.json ke direktori output
POST.json      — tautan postingan X (diisi setelah posting)
```

## Lisensi

MIT — lihat [LICENSE](LICENSE).
