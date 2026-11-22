// render.js — semua gambar digambar langsung di canvas (tanpa file aset).
// Kucing oranye, dimsum putih berlipit, dimsum emas, dan cabai merah.

function drawBackground(ctx, w, h, groundY, t) {
  // Langit senja bergradasi.
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#2b1a4d");
  sky.addColorStop(0.55, "#7b2d6b");
  sky.addColorStop(1, "#ff9a5c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Bintang-bintang kecil.
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  for (let i = 0; i < 40; i++) {
    const x = (i * 173) % w;
    const y = (i * 97) % 180;
    const tw = 0.5 + 0.5 * Math.sin(t * 2 + i);
    ctx.globalAlpha = 0.25 + 0.55 * tw;
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;

  // Bulan.
  ctx.fillStyle = "#ffe9a8";
  ctx.beginPath();
  ctx.arc(w - 90, 70, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f2cf7d";
  ctx.beginPath();
  ctx.arc(w - 100, 62, 7, 0, Math.PI * 2);
  ctx.arc(w - 78, 82, 5, 0, Math.PI * 2);
  ctx.fill();

  // Tanah.
  ctx.fillStyle = "#3d2b1f";
  ctx.fillRect(0, groundY, w, h - groundY);
  ctx.fillStyle = "#5a4632";
  ctx.fillRect(0, groundY, w, 6);
}

function drawCat(ctx, x, y, w, h, facing) {
  ctx.save();
  ctx.translate(x, y);
  if (facing < 0) ctx.scale(-1, 1);

  // Ekor.
  ctx.strokeStyle = "#f59e42";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-w / 2 + 6, 6);
  ctx.quadraticCurveTo(-w / 2 - 26, -6, -w / 2 - 18, -34);
  ctx.stroke();

  // Badan.
  ctx.fillStyle = "#f59e42";
  ctx.beginPath();
  ctx.ellipse(0, 0, w / 2, h / 2 - 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Kepala.
  ctx.beginPath();
  ctx.arc(w / 2 - 6, -h / 2 + 6, 26, 0, Math.PI * 2);
  ctx.fill();

  // Telinga.
  ctx.beginPath();
  ctx.moveTo(w / 2 - 26, -h / 2 - 8);
  ctx.lineTo(w / 2 - 18, -h / 2 - 28);
  ctx.lineTo(w / 2 - 8, -h / 2 - 10);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w / 2 + 4, -h / 2 - 10);
  ctx.lineTo(w / 2 + 12, -h / 2 - 28);
  ctx.lineTo(w / 2 + 20, -h / 2 - 8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff8fa3";
  ctx.beginPath();
  ctx.moveTo(w / 2 - 21, -h / 2 - 11);
  ctx.lineTo(w / 2 - 18, -h / 2 - 22);
  ctx.lineTo(w / 2 - 12, -h / 2 - 12);
  ctx.closePath();
  ctx.fill();

  // Mata + hidung + kumis.
  ctx.fillStyle = "#26221f";
  ctx.beginPath();
  ctx.arc(w / 2 + 4, -h / 2 + 2, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff7d9c";
  ctx.beginPath();
  ctx.arc(w / 2 + 18, -h / 2 + 12, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(38,34,31,0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w / 2 + 14, -h / 2 + 10);
  ctx.lineTo(w / 2 + 34, -h / 2 + 4);
  ctx.moveTo(w / 2 + 14, -h / 2 + 14);
  ctx.lineTo(w / 2 + 34, -h / 2 + 16);
  ctx.stroke();

  // Garis belang.
  ctx.strokeStyle = "rgba(180,90,20,0.55)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-18, -h / 2 + 6);
  ctx.lineTo(-10, -h / 2 + 18);
  ctx.moveTo(2, -h / 2 + 8);
  ctx.lineTo(10, -h / 2 + 18);
  ctx.stroke();

  ctx.restore();
}

function drawDimsum(ctx, x, y, r, golden) {
  // Keranjang bambu kecil di bawah dimsum.
  ctx.fillStyle = "#b98a4a";
  ctx.beginPath();
  ctx.ellipse(x, y + r * 0.9, r * 1.15, r * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  // Badan dimsum.
  ctx.fillStyle = golden ? "#ffd94d" : "#fff6e8";
  ctx.strokeStyle = golden ? "#d9a400" : "#e0c9a8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Lipatan atas.
  ctx.strokeStyle = golden ? "#c78f00" : "#d8b98a";
  ctx.beginPath();
  for (let i = -2; i <= 2; i++) {
    ctx.moveTo(x + i * (r / 2.6), y - r * 0.15);
    ctx.quadraticCurveTo(x + i * (r / 2.6), y - r * 0.8, x, y - r * 0.95);
  }
  ctx.stroke();
  // Kilau.
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.beginPath();
  ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.22, 0, Math.PI * 2);
  ctx.fill();
}

function drawChili(ctx, x, y, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.5);
  ctx.fillStyle = "#e63946";
  ctx.beginPath();
  ctx.moveTo(-r, 0);
  ctx.quadraticCurveTo(0, -r * 1.1, r, 0);
  ctx.quadraticCurveTo(r * 0.4, r * 0.9, -r, 0);
  ctx.fill();
  ctx.strokeStyle = "#2f9e44";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(r * 0.8, -r * 0.1);
  ctx.quadraticCurveTo(r * 1.4, -r * 0.9, r * 1.1, -r * 1.3);
  ctx.stroke();
  ctx.restore();
}
