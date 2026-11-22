// input.js — keyboard (panah / A D) + mouse untuk menggerakkan kucing.
function createInput(canvas) {
  const state = { left: false, right: false, mouseX: null };

  const down = (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") state.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") state.right = true;
  };
  const up = (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") state.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") state.right = false;
  };
  const move = (e) => {
    const rect = canvas.getBoundingClientRect();
    state.mouseX = ((e.clientX - rect.left) / rect.width) * canvas.width;
  };

  window.addEventListener("keydown", down);
  window.addEventListener("keyup", up);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) move(t);
    e.preventDefault();
  }, { passive: false });

  return state;
}
