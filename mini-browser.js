export const MINI_W = 1280;

export const MINI_H = 720;



/** Chemin asset résolu depuis la page (fiable en local et sur Vercel). */

export function resolveAsset(path) {

  if (!path || /^(https?:|data:|blob:|file:)/i.test(path)) return path;

  const clean = path.replace(/^\.\//, '');

  const base = document.baseURI || window.location.href;

  return new URL(clean, base).href;

}



function ensureFrame(scaleWrap) {

  let frame = scaleWrap.querySelector('.mini-browser__frame');

  if (frame) return frame;

  frame = document.createElement('div');

  frame.className = 'mini-browser__frame';

  while (scaleWrap.firstChild) frame.appendChild(scaleWrap.firstChild);

  scaleWrap.appendChild(frame);

  return frame;

}



export function fitShowcaseBrowser(browser) {
  const vp = browser?.querySelector('.mini-browser__viewport');
  const scale = browser?.querySelector('.mini-browser__scale');
  const iframe = browser?.querySelector('.mini-browser__iframe');
  if (!vp || !scale || !iframe) return;

  const availW = vp.clientWidth;
  const availH = vp.clientHeight;
  if (availW < 2 || availH < 2) return;

  const s = Math.min(availW / MINI_W, availH / MINI_H);
  const scaledW = MINI_W * s;
  const scaledH = MINI_H * s;

  scale.style.width = `${scaledW}px`;
  scale.style.height = `${scaledH}px`;
  iframe.style.width = `${MINI_W}px`;
  iframe.style.height = `${MINI_H}px`;
  iframe.style.transform = `scale(${s})`;
  iframe.style.transformOrigin = 'top left';
}

export function observeShowcaseBrowser(browser) {
  const vp = browser?.querySelector('.mini-browser__viewport');
  if (!vp || typeof ResizeObserver === 'undefined') return;
  const ro = new ResizeObserver(() => fitShowcaseBrowser(browser));
  ro.observe(vp);
}

export function fitMiniBrowser(browser) {

  const vp = browser?.querySelector('.mini-browser__viewport');

  const scaleWrap = browser?.querySelector('.mini-browser__scale');

  if (!vp || !scaleWrap) return;



  const availW = vp.clientWidth;

  const availH = vp.clientHeight;

  if (availW < 20 || availH < 20) return;



  const fallbackImg = scaleWrap.querySelector('.mini-browser__fallback-img');



  if (browser.classList.contains('is-blocked') && fallbackImg) {

    const frame = scaleWrap.querySelector('.mini-browser__frame');

    if (frame && fallbackImg.parentElement !== scaleWrap) {

      scaleWrap.appendChild(fallbackImg);

      frame.remove();

    }

    scaleWrap.style.width = '100%';

    scaleWrap.style.height = '100%';

    scaleWrap.style.minHeight = `${availH}px`;

    scaleWrap.style.transform = 'none';

    fallbackImg.hidden = false;

    fallbackImg.style.cssText =

      'width:100%;height:100%;min-height:100%;object-fit:cover;object-position:top center;display:block;border:0;';

    vp.scrollLeft = 0;

    vp.scrollTop = 0;

    return;

  }



  const s = Math.max(availW / MINI_W, availH / MINI_H);

  const scaledW = MINI_W * s;

  const scaledH = MINI_H * s;



  const frame = ensureFrame(scaleWrap);



  scaleWrap.style.width = `${scaledW}px`;

  scaleWrap.style.height = `${scaledH}px`;

  scaleWrap.style.minHeight = '';

  scaleWrap.style.transform = 'none';



  frame.style.width = `${MINI_W}px`;

  frame.style.height = `${MINI_H}px`;

  frame.style.transform = `scale(${s})`;

  frame.style.transformOrigin = 'top left';

  frame.style.overflow = 'hidden';



  frame.querySelectorAll('iframe, .mini-browser__fallback-img').forEach((el) => {

    el.style.width = `${MINI_W}px`;

    el.style.height = `${MINI_H}px`;

    el.style.transform = 'none';

    el.style.border = '0';

    el.style.display = 'block';

    el.style.margin = '0';

  });



  requestAnimationFrame(() => {

    vp.scrollLeft = Math.max(0, (scaledW - availW) / 2);

    vp.scrollTop = 0;

  });

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



  const availW = vp.clientWidth;

  const availH = vp.clientHeight;

  if (availW < 20 || availH < 20) return;



  const s = Math.max(availW / MINI_W, availH / MINI_H);

  const scaledW = MINI_W * s;

  const scaledH = MINI_H * s;



  let holder = vp.querySelector('.hero-card__holder');

  if (!holder) {

    holder = document.createElement('div');

    holder.className = 'hero-card__holder';

    holder.appendChild(media);

    vp.appendChild(holder);

  }



  holder.style.width = `${scaledW}px`;

  holder.style.height = `${scaledH}px`;

  holder.style.marginLeft = `${Math.max(0, (availW - scaledW) / 2)}px`;

  holder.style.overflow = 'hidden';



  media.style.width = `${MINI_W}px`;

  media.style.height = `${MINI_H}px`;

  media.style.transform = `scale(${s})`;

  media.style.transformOrigin = 'top left';

  media.style.display = 'block';

}



export function fitHeroStack(stack) {

  if (!stack) return;

  stack.querySelectorAll('.hero-card').forEach((card) => fitHeroCard(card));

}

