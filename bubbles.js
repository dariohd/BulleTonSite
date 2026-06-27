/**
 * Bulles flottantes en arrière-plan — légères, non bloquantes.
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

  const palette = [
    'rgba(255, 255, 255, 0.55)',
    'rgba(200, 225, 255, 0.45)',
    'rgba(180, 210, 255, 0.35)',
    'rgba(230, 245, 255, 0.5)',
    'rgba(255, 255, 255, 0.35)',
  ];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(28, Math.max(12, Math.floor((w * h) / 80000)));
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
      color: palette[Math.floor(Math.random() * palette.length)],
    };
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

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.stroke();
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
