/**
 * Bulles flottantes, rose · violet · bleu pastel (palette bulle).
 */
export function initBubbles() {
  const canvas = document.getElementById('site-bubbles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let bubbles = [];
  let mouse = { x: 0, y: 0 };
  let raf = 0;

  const tints = [
    { core: [167, 139, 250], edge: [244, 114, 182], rim: [103, 232, 249] },
    { core: [139, 92, 246], edge: [236, 72, 153], rim: [125, 211, 252] },
    { core: [192, 132, 252], edge: [249, 168, 212], rim: [147, 197, 253] },
    { core: [180, 120, 255], edge: [251, 113, 180], rim: [56, 189, 248] },
    { core: [155, 135, 245], edge: [244, 63, 150], rim: [103, 232, 249] },
  ];

  function rgba(rgb, a) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(34, Math.max(16, Math.floor((w * h) / 65000)));
    bubbles = Array.from({ length: count }, () => mkBubble());
  }

  function mkBubble() {
    const r = Math.random() * 48 + 28;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r,
      vy: -(Math.random() * 0.35 + 0.12),
      vx: (Math.random() - 0.5) * 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.008,
      tint: tints[Math.floor(Math.random() * tints.length)],
      glowBias: 0.35 + Math.random() * 0.45,
    };
  }

  function drawBubble(b) {
    const { x, y, r, tint, glowBias } = b;

    const body = ctx.createRadialGradient(
      x - r * 0.1,
      y - r * 0.25,
      r * 0.05,
      x + r * 0.1,
      y + r * 0.15,
      r,
    );
    body.addColorStop(0, rgba(tint.core, 0.55 * glowBias + 0.2));
    body.addColorStop(0.4, rgba(tint.edge, 0.38 * glowBias + 0.15));
    body.addColorStop(0.72, rgba(tint.rim, 0.42 * glowBias + 0.12));
    body.addColorStop(1, rgba(tint.rim, 0.1));

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    const sheen = ctx.createRadialGradient(
      x - r * 0.32,
      y - r * 0.38,
      0,
      x - r * 0.2,
      y - r * 0.25,
      r * 0.55,
    );
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    sheen.addColorStop(0.35, 'rgba(255, 220, 245, 0.4)');
    sheen.addColorStop(1, 'rgba(200, 180, 255, 0)');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = sheen;
    ctx.fill();

    const pinkTop = ctx.createRadialGradient(
      x - r * 0.15,
      y - r * 0.45,
      0,
      x - r * 0.1,
      y - r * 0.35,
      r * 0.55,
    );
    pinkTop.addColorStop(0, `rgba(244, 114, 182, ${0.35 * glowBias})`);
    pinkTop.addColorStop(1, 'rgba(244, 114, 182, 0)');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = pinkTop;
    ctx.fill();

    const cyanEdge = ctx.createRadialGradient(
      x + r * 0.35,
      y + r * 0.3,
      0,
      x + r * 0.25,
      y + r * 0.2,
      r * 0.5,
    );
    cyanEdge.addColorStop(0, `rgba(103, 232, 249, ${0.3 * glowBias})`);
    cyanEdge.addColorStop(1, 'rgba(103, 232, 249, 0)');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = cyanEdge;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.32, r * 0.13, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(167, 139, 250, ${0.4 * glowBias + 0.2})`;
    ctx.lineWidth = Math.max(1.2, r * 0.045);
    ctx.arc(x, y, r * 0.98, 0, Math.PI * 2);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const b of bubbles) {
      b.wobble += b.wobbleSpeed;
      b.x += b.vx + Math.sin(b.wobble) * 0.15;
      b.y += b.vy;

      const dx = mouse.x - b.x;
      const dy = mouse.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 200 && dist > 0) {
        b.x -= (dx / dist) * 0.5;
        b.y -= (dy / dist) * 0.5;
      }

      if (b.y < -b.r * 2) {
        b.y = h + b.r;
        b.x = Math.random() * w;
      }
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;

      drawBubble(b);
    }
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener(
    'pointermove',
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true },
  );

  resize();
  draw();

  return () => cancelAnimationFrame(raf);
}
