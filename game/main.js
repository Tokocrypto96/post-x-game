// main.js — loop permainan: spawn, jatuh, tangkap, skor, level, game over.
// Memakai CONFIG dari config.js (alias C supaya ringkas).
const C = CONFIG;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const hudScore = document.getElementById("score");
const hudTime = document.getElementById("time");
const hudLives = document.getElementById("lives");
const hudLevel = document.getElementById("level");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const overlayBtn = document.getElementById("overlay-btn");

const input = createInput(canvas);
const rng = makeRng((Date.now() % 100000) | 0);

let state;
let last = performance.now();

function reset() {
  state = {
    mode: "title", // title | playing | over
    catX: C.width / 2,
    facing: 1,
    items: [],
    score: 0,
    lives: C.startLives,
    level: 1,
    timeLeft: C.timeLimit,
    spawnTimer: 0.4,
    elapsed: 0,
    caught: 0,
    missed: 0,
  };
  updateHud();
}

function fallSpeed() {
  return C.fallSpeedStart + (state.level - 1) * C.fallSpeedStep;
}

function spawnInterval() {
  return Math.max(C.spawnIntervalMin, C.spawnIntervalStart - (state.level - 1) * 0.09);
}

function spawnItem() {
  const roll = rng();
  let type = "normal";
  if (roll < C.chiliChance) type = "chili";
  else if (roll < C.chiliChance + C.goldenChance) type = "golden";
  state.items.push({
    type,
    x: 30 + rng() * (C.width - 60),
    y: -30,
    vy: fallSpeed() * (0.85 + rng() * 0.4),
    r: type === "golden" ? 20 : 18,
    sway: rng() * Math.PI * 2,
  });
}

function update(dt) {
  if (state.mode !== "playing") return;
  state.elapsed += dt;
  state.timeLeft = Math.max(0, C.timeLimit - state.elapsed);
  if (state.timeLeft <= 0) return endGame("Waktu habis!");

  // Gerak kucing: mouse menang, kalau tidak ada mouse pakai keyboard.
  if (input.mouseX !== null) {
    const target = Math.max(C.catWidth / 2, Math.min(C.width - C.catWidth / 2, input.mouseX));
    state.facing = target >= state.catX ? 1 : -1;
    state.catX += (target - state.catX) * Math.min(1, dt * 14);
  } else {
    if (input.left) { state.catX -= C.catSpeed * dt; state.facing = -1; }
    if (input.right) { state.catX += C.catSpeed * dt; state.facing = 1; }
    state.catX = Math.max(C.catWidth / 2, Math.min(C.width - C.catWidth / 2, state.catX));
  }

  // Spawn.
  state.spawnTimer -= dt;
  if (state.spawnTimer <= 0) {
    spawnItem();
    state.spawnTimer = spawnInterval() * (0.7 + rng() * 0.6);
  }

  // Jatuh + tangkap.
  const catTop = C.groundY - C.catHeight;
  for (const it of state.items) {
    it.y += it.vy * dt;
    it.sway += dt * 2;
    it.x += Math.sin(it.sway) * 12 * dt;
    const caught = it.y + it.r >= catTop - 6 && it.y < C.groundY - 4 &&
      Math.abs(it.x - state.catX) < C.catWidth / 2 + it.r * 0.6;
    if (caught) {
      it.dead = true;
      if (it.type === "chili") {
        state.lives -= 1;
        flash("Aduh, cabai! −1 nyawa");
        if (state.lives <= 0) return endGame("Kucing kepedesan!");
      } else {
        const pts = it.type === "golden" ? C.pointsGolden : C.pointsNormal;
        state.score += pts;
        state.caught += 1;
        const newLevel = Math.floor(state.score / C.pointsPerLevel) + 1;
        if (newLevel > state.level) {
          state.level = newLevel;
          flash("Level " + newLevel + " — makin cepat!");
        }
      }
    } else if (it.y - it.r > C.groundY) {
      it.dead = true;
      if (it.type === "normal") state.missed += 1;
    }
  }
  state.items = state.items.filter((it) => !it.dead);
  updateHud();
}

let flashText = "";
let flashUntil = 0;
function flash(text) {
  flashText = text;
  flashUntil = performance.now() + 1400;
}

function updateHud() {
  hudScore.textContent = state.score;
  hudTime.textContent = Math.ceil(state.timeLeft) + " dtk";
  hudLives.textContent = "❤".repeat(Math.max(0, state.lives)) || "—";
  hudLevel.textContent = "Lv " + state.level;
}

function draw() {
  drawBackground(ctx, C.width, C.height, C.groundY, state.elapsed);
  for (const it of state.items) {
    if (it.type === "chili") drawChili(ctx, it.x, it.y, it.r);
    else drawDimsum(ctx, it.x, it.y, it.r, it.type === "golden");
  }
  drawCat(ctx, state.catX, C.groundY - C.catHeight / 2 + 6, C.catWidth, C.catHeight, state.facing);

  if (performance.now() < flashUntil) {
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(C.width / 2 - 170, 60, 340, 40);
    ctx.fillStyle = "#ffe9a8";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(flashText, C.width / 2, 87);
  }

  if (state.mode === "title") {
    // Judul + tombol ada di overlay HTML; canvas hanya meredupkan latar
    // supaya demo dimsum jatuh tetap kelihatan.
    ctx.fillStyle = "rgba(20,8,40,0.45)";
    ctx.fillRect(0, 0, C.width, C.height);
  }
}

function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

function endGame(reason) {
  state.mode = "over";
  overlayTitle.textContent = "Game Over — " + reason;
  overlayText.textContent = "Skor: " + state.score + " • Dimsum ditangkap: " + state.caught +
    " • Terlewat: " + state.missed + " • Level: " + state.level;
  overlayBtn.textContent = "Main Lagi (R)";
  overlay.classList.remove("hidden");
  updateHud();
}

function startGame() {
  reset();
  state.mode = "playing";
  overlay.classList.add("hidden");
}

overlayBtn.addEventListener("click", startGame);
window.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    if (state.mode !== "playing") startGame();
  }
  if (e.key === "Enter" && state.mode === "title") startGame();
});

// Hook kecil untuk pengetesan otomatis (screenshot / QA di browser).
window.__game = {
  start: startGame,
  getState: () => ({ mode: state.mode, score: state.score, lives: state.lives, level: state.level, items: state.items.length }),
  setTimeLeft: (s) => { state.elapsed = C.timeLimit - s; state.timeLeft = s; },
};
reset();
state.items.push(
  { type: "normal", x: 150, y: 80, vy: 40, r: 18, sway: 0 },
  { type: "golden", x: 420, y: 40, vy: 55, r: 20, sway: 1 },
  { type: "normal", x: 640, y: 120, vy: 35, r: 18, sway: 2 },
);
requestAnimationFrame(loop);
