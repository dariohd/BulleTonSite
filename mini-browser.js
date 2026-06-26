export const MINI_W = 1280;
export const MINI_H = 820;
export const MAX_SCALE = 0.44;

export function centerViewport(vp) {
  if (!vp) return;
  vp.scrollLeft = Math.max(0, (vp.scrollWidth - vp.clientWidth) / 2);
  vp.scrollTop = Math.max(0, (vp.scrollHeight - vp.clientHeight) / 2);
}

export function fitMiniBrowser(browser) {
  const vp = browser?.querySelector('.mini-browser__viewport');
  const scaleWrap = browser?.querySelector('.mini-browser__scale');
  if (!vp || !scaleWrap) return;

  const fallbackImg = scaleWrap.querySelector('.mini-browser__fallback-img');
  if (browser.classList.contains('is-blocked') && fallbackImg) {
    fallbackImg.style.width = '100%';
    fallbackImg.style.height = '100%';
    fallbackImg.style.transform = 'none';
    fallbackImg.style.objectFit = 'contain';
    fallbackImg.style.objectPosition = 'center top';
    scaleWrap.style.width = '100%';
    scaleWrap.style.height = '100%';
    return;
  }

  const pad = 24;
  const availW = Math.max(vp.clientWidth - pad, 220);
  const availH = Math.max(vp.clientHeight - pad, 180);
  const s = Math.min(availW / MINI_W, availH / MINI_H, MAX_SCALE);
  const w = MINI_W * s;
  const h = MINI_H * s;

  scaleWrap.style.width = `${w}px`;
  scaleWrap.style.height = `${h}px`;

  scaleWrap.querySelectorAll('iframe, .mini-browser__fallback-img').forEach((el) => {
    el.style.width = `${MINI_W}px`;
    el.style.height = `${MINI_H}px`;
    el.style.transform = `scale(${s})`;
    el.style.transformOrigin = 'top left';
  });

  requestAnimationFrame(() => centerViewport(vp));
}

export function observeMiniBrowser(browser) {
  const vp = browser?.querySelector('.mini-browser__viewport');
  if (!vp || typeof ResizeObserver === 'undefined') return;

  const ro = new ResizeObserver(() => fitMiniBrowser(browser));
  ro.observe(vp);
}

export function fitHeroCard(card) {
  const vp = card?.querySelector('.hero-card__viewport');
  const media = vp?.querySelector('iframe, img');
  if (!vp || !media) return;

  const pad = 12;
  const availW = Math.max(vp.clientWidth - pad, 120);
  const availH = Math.max(vp.clientHeight - pad, 90);
  const s = Math.min(availW / MINI_W, availH / MINI_H, 0.36);

  media.style.width = `${MINI_W}px`;
  media.style.height = `${MINI_H}px`;
  media.style.transform = `scale(${s})`;
  media.style.transformOrigin = 'top left';
  media.style.marginLeft = `${Math.max(0, (availW - MINI_W * s) / 2)}px`;
}

export function fitHeroStack(stack) {
  if (!stack) return;
  stack.querySelectorAll('.hero-card').forEach((card) => fitHeroCard(card));
}
