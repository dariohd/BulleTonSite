import {
  brand,
  contact,
  getSlides,
  screenshotUrl,
  pricing,
  compare,
  sectorsZone,
  processDelivery,
  testimonial,
  guarantees,
  team,
  services,
} from './config.js';

const urlParams = new URLSearchParams(location.search);
const shortMode = urlParams.get('short') === '1';
const activeSlides = getSlides(shortMode);

const stage = document.getElementById('stage');
const progressBar = document.getElementById('progress-bar');
const dotsEl = document.getElementById('dots');

let index = 0;
let elapsed = 0;
let playing = true;
let slideEls = [];

function formatTimeNbsp(text) {
  return String(text).replace(/(\d+)\s+h\b/gi, '$1\u00a0h');
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function resolveAsset(path) {
  if (!path || /^(https?:|data:|blob:|file:)/i.test(path)) return path;
  return new URL(path, import.meta.url).href;
}

function captionHtml(text) {
  if (!text) return '';
  return `<p class="slide__caption" aria-hidden="true">${escapeHtml(text)}</p>`;
}

function teamInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function screenImageSrc(screen) {
  if (screen.image) return resolveAsset(screen.image);
  if (screen.url) return screenshotUrl(screen.url);
  return '';
}

function screenImageFallback(screen) {
  if (!screen.url) return '';
  return screenshotUrl(screen.url);
}

function renderBrowser(screen, projectName, zoomed = false) {
  const src = screenImageSrc(screen);
  const fallback = screenImageFallback(screen);
  const zoomClass = zoomed ? ' slide__shot--zoom' : '';
  const onerror = fallback
    ? ` onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.dataset.fallback=''}" data-fallback="${escapeHtml(fallback)}"`
    : '';

  return `
    <div class="slide__browser">
      <div class="slide__browser-bar" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="slide__shot slide__shot--169${zoomClass}">
        <img
          src="${src}"${onerror}
          alt="${escapeHtml(screen.tag)}, ${escapeHtml(projectName)}"
          loading="eager"
        />
      </div>
    </div>`;
}

function renderSlide(data, i) {
  const el = document.createElement('article');
  el.className = 'slide';
  el.dataset.index = String(i);

  if (data.type === 'hook') {
    el.classList.add('slide--hook');
    el.innerHTML = `
      <img class="slide__logo" src="${escapeHtml(resolveAsset(brand.logo))}" alt="" width="56" height="56" />
      <p class="slide__eyebrow">${escapeHtml(brand.name)} · ${escapeHtml(brand.byline)}</p>
      <h1 class="slide__title slide__title--xl">${escapeHtml(data.line1)}<br><em>${escapeHtml(data.line2)}</em></h1>
      <p class="slide__sub">${escapeHtml(data.sub)}</p>
      ${captionHtml(data.caption)}
    `;
  } else if (data.type === 'intro') {
    el.classList.add('slide--intro');
    const titleEm = data.titleEm ? ` <em>${escapeHtml(data.titleEm)}</em>` : '';
    el.innerHTML = `
      <p class="slide__eyebrow">${escapeHtml(data.eyebrow ?? brand.name)}</p>
      <h2 class="slide__title">${escapeHtml(data.title)}${titleEm}</h2>
      <p class="slide__intro-text">${escapeHtml(data.subtitle ?? '')}</p>
      <ul class="slide__bullets slide__bullets--intro">${data.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
    `;
  } else if (data.type === 'team') {
    el.classList.add('slide--team');
    el.innerHTML = `
      <p class="slide__eyebrow">L'équipe</p>
      <h2 class="slide__title">Trois métiers, <em>un site cohérent</em></h2>
      <p class="slide__intro-text">Pas de sous-traitance opaque. Vous savez qui fait quoi à chaque étape.</p>
      <div class="slide__team">
        ${team
          .map(
            (m) => `
          <div class="slide__team-member">
            <div class="slide__team-photo" aria-hidden="true">
              <img src="${escapeHtml(resolveAsset(m.photo))}" alt="" loading="eager" onerror="this.closest('.slide__team-photo').classList.add('slide__team-photo--fallback')" />
              <span class="slide__team-initials">${escapeHtml(teamInitials(m.name))}</span>
            </div>
            <strong>${escapeHtml(m.name)}</strong>
            <span>${escapeHtml(m.role)}</span>
          </div>`,
          )
          .join('')}
      </div>
    `;
  } else if (data.type === 'services') {
    el.classList.add('slide--services');
    el.innerHTML = `
      <p class="slide__eyebrow">Services</p>
      <h2 class="slide__title">Tout pour <em>votre présence en ligne</em></h2>
      <ul class="slide__service-list">
        ${services
          .map(
            (s) => `
          <li>
            <strong>${escapeHtml(s.title)}</strong>
            <span>${escapeHtml(s.text)}</span>
          </li>`,
          )
          .join('')}
      </ul>
    `;
  } else if (data.type === 'compare') {
    el.classList.add('slide--compare');
    el.innerHTML = `
      <p class="slide__eyebrow">La différence</p>
      <h2 class="slide__title">${escapeHtml(compare.title)}</h2>
      <div class="slide__compare-grid">
        <div class="slide__compare-card slide__compare-card--bad">
          <h3>${escapeHtml(compare.bad.label)}</h3>
          <p class="slide__compare-hint">${escapeHtml(compare.bad.hint)}</p>
          <ul>${compare.bad.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
        </div>
        <div class="slide__compare-card slide__compare-card--good">
          <h3>${escapeHtml(compare.good.label)}</h3>
          <p class="slide__compare-hint">${escapeHtml(compare.good.hint)}</p>
          <ul>${compare.good.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  } else if (data.type === 'sectorsZone') {
    el.classList.add('slide--sectors', 'slide--sectors-zone');
    el.innerHTML = `
      <p class="slide__eyebrow">Votre métier</p>
      <h2 class="slide__title">${escapeHtml(sectorsZone.title)} <em>${escapeHtml(sectorsZone.titleEm)}</em></h2>
      <ul class="slide__sector-list slide__sector-list--compact">
        ${sectorsZone.sectorItems.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
      </ul>
      <p class="slide__zone-lead slide__zone-lead--compact">${escapeHtml(sectorsZone.zoneLead)}</p>
    `;
  } else if (data.type === 'processDelivery') {
    const stepsHtml = processDelivery.steps
      .map(
        (s, n) => `
      <div class="slide__process-step">
        <span class="slide__process-num">${String(n + 1).padStart(2, '0')}</span>
        <div>
          <strong>${escapeHtml(s.title)}</strong>
          <p class="slide__process-who">${escapeHtml(s.who ?? '')}</p>
          <p>${escapeHtml(s.text)}</p>
        </div>
      </div>`,
      )
      .join('');
    el.classList.add('slide--process', 'slide--process-delivery');
    el.innerHTML = `
      <p class="slide__eyebrow">Notre méthode</p>
      <h2 class="slide__title">${escapeHtml(processDelivery.title)}</h2>
      <div class="slide__delivery-badges">
        <span><strong>${escapeHtml(processDelivery.firstPreview)}</strong> premier prototype</span>
        <span><strong>${escapeHtml(processDelivery.total)}</strong> livraison</span>
      </div>
      <div class="slide__process slide__process--compact">${stepsHtml}</div>
      <p class="slide__process-footnote">${escapeHtml(processDelivery.footnote)}</p>
    `;
  } else if (data.type === 'guarantees') {
    el.classList.add('slide--reassurance', 'slide--guarantees');
    el.innerHTML = `
      <p class="slide__eyebrow">Rassurance</p>
      <h2 class="slide__title">Votre <em>tranquillité</em></h2>
      <ul class="slide__bullets slide__bullets--compact">${guarantees.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
    `;
  } else if (data.type === 'testimonial') {
    el.classList.add('slide--testimonial');
    el.innerHTML = `
      <p class="slide__eyebrow">Ils nous ont fait confiance</p>
      <blockquote class="slide__quote">
        <p>« ${escapeHtml(testimonial.quote)} »</p>
        <footer>
          <strong>${escapeHtml(testimonial.author)}</strong>
          <span>${escapeHtml(testimonial.role)}</span>
        </footer>
      </blockquote>
    `;
  } else if (data.type === 'project') {
    const screens = data.screens ?? [{ tag: 'Aperçu', url: data.url }];
    const [screen1, screen2] = screens;
    const badge = data.badge ? `<span class="slide__project-badge">${escapeHtml(data.badge)}</span>` : '';

    el.classList.add('slide--project');
    el.innerHTML = `
      <div class="slide__project-head">
        <p class="slide__eyebrow">Réalisation</p>
        ${badge}
        <p class="slide__sector">${escapeHtml(data.sector)}</p>
        <h2 class="slide__title slide__title--project">${escapeHtml(data.name)}</h2>
        ${data.url ? `<a class="slide__project-url" href="${escapeHtml(data.url)}" target="_blank" rel="noopener">${escapeHtml(data.url.replace(/^https?:\/\/(www\.)?/, ''))}</a>` : ''}
      </div>
      <p class="slide__screen-tag">${escapeHtml(screen1.tag)}</p>
      ${renderBrowser(screen1, data.name)}
      <div class="slide__project-text">
        <p>${escapeHtml(data.betweenText ?? '')}</p>
      </div>
      ${
        screen2
          ? `
        <p class="slide__screen-tag">${escapeHtml(screen2.tag)}</p>
        ${renderBrowser(screen2, data.name, true)}
      `
          : ''
      }
    `;
  } else if (data.type === 'pricing') {
    const cardsHtml = pricing.tiers
      .map(
        (t) => `
      <div class="slide__price-card${t.highlight ? ' slide__price-card--main' : ''}">
        <strong>${escapeHtml(t.label)}</strong>
        <div class="slide__price-amount"><em>${escapeHtml(t.range)}</em></div>
      </div>`,
      )
      .join('');

    el.classList.add('slide--pricing');
    el.innerHTML = `
      <p class="slide__eyebrow">Tarifs</p>
      <h2 class="slide__title slide__title--pricing">${escapeHtml(pricing.hook)}</h2>
      <p class="slide__price-from">À partir de <em>${pricing.from} €</em></p>
      <p class="slide__sub slide__sub--gold">${escapeHtml(formatTimeNbsp(pricing.tagline))}</p>
      <div class="slide__price-cards">${cardsHtml}</div>
      <p class="slide__price-example">${escapeHtml(pricing.example)}</p>
      ${pricing.maintenance ? `<p class="slide__price-maint-compact">${escapeHtml(pricing.maintenance)}</p>` : ''}
      ${captionHtml(data.caption)}
    `;
  } else if (data.type === 'cta') {
    const tel = contact.phone.replace(/\s/g, '');
    const titleEm = data.titleEm
      ? `<em class="slide__title-accent">${escapeHtml(formatTimeNbsp(data.titleEm))}</em>`
      : '';
    el.classList.add('slide--cta');
    el.innerHTML = `
      <img class="slide__logo slide__logo--cta" src="${escapeHtml(resolveAsset(brand.logo))}" alt="" width="64" height="64" />
      <p class="slide__eyebrow">Contact</p>
      <h2 class="slide__title slide__title--cta">
        <span class="slide__title-line">${escapeHtml(data.title)}</span>
        ${titleEm}
      </h2>
      <p class="slide__sub">${escapeHtml(formatTimeNbsp(data.sub))}</p>
      <p class="slide__cta-response">${escapeHtml(formatTimeNbsp(contact.responseTime))}</p>
      <div class="slide__contact">
        <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>
        <a href="tel:${tel}">${escapeHtml(contact.phone)}</a>
        <span>${escapeHtml(contact.zone)}</span>
      </div>
      <p class="slide__cta-portfolio">
        <a href="${escapeHtml(brand.url)}" target="_blank" rel="noopener">${escapeHtml(brand.url.replace(/^https?:\/\//, ''))}</a>
      </p>
      ${captionHtml(data.caption)}
    `;
  }

  return el;
}

function build() {
  const progress = document.getElementById('progress');
  progress.remove();
  stage.innerHTML = '';
  dotsEl.innerHTML = '';

  slideEls = activeSlides.map((s, i) => {
    const el = renderSlide(s, i);
    stage.appendChild(el);
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.dataset.index = String(i);
    dotsEl.appendChild(dot);
    return el;
  });

  stage.appendChild(progress);
  show(0, false);
}

function show(i, animate = true) {
  slideEls.forEach((el, j) => {
    el.classList.remove('slide--active', 'slide--exit');
    if (j === i) el.classList.add('slide--active');
    else if (animate && j < i) el.classList.add('slide--exit');
  });
  dotsEl.querySelectorAll('.dot').forEach((d, j) => {
    d.classList.toggle('dot--on', j === i);
  });
  index = i;
  elapsed = 0;
  updateProgressBar();
}

function updateProgressBar() {
  const dur = activeSlides[index].duration;
  const pct = Math.min(100, (elapsed / dur) * 100);
  progressBar.style.width = `${pct}%`;
}

function next() {
  if (index < activeSlides.length - 1) show(index + 1);
  else show(0);
}

function prev() {
  if (index > 0) show(index - 1);
  else show(activeSlides.length - 1);
}

function tick(dt) {
  if (!playing) return;
  elapsed += dt;
  updateProgressBar();
  if (elapsed >= activeSlides[index].duration) next();
}

let last = performance.now();
function loop(now) {
  tick((now - last) / 1000);
  last = now;
  requestAnimationFrame(loop);
}

document.getElementById('btn-play').addEventListener('click', () => {
  playing = !playing;
  document.getElementById('btn-play').textContent = playing ? 'Pause' : 'Lecture';
});

document.getElementById('btn-restart').addEventListener('click', () => {
  show(0, false);
  playing = true;
  document.getElementById('btn-play').textContent = 'Pause';
});

document.getElementById('btn-fullscreen').addEventListener('click', async () => {
  const wrap = document.getElementById('stage-wrap');
  if (!document.fullscreenElement) await wrap.requestFullscreen();
  else await document.exitFullscreen();
});

document.getElementById('btn-hide-ui').addEventListener('click', () => {
  document.getElementById('rec-ui').classList.add('hidden');
  document.getElementById('rec-hint').classList.add('hidden');
});

document.getElementById('btn-version').addEventListener('click', () => {
  const params = new URLSearchParams(location.search);
  if (shortMode) params.delete('short');
  else params.set('short', '1');
  const q = params.toString();
  location.search = q ? `?${q}` : '';
});

if (shortMode) {
  document.getElementById('btn-version').textContent = 'Version complète';
  document.body.classList.add('short-mode');
} else {
  document.getElementById('btn-version').textContent = 'Version courte';
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  } else if (e.key === 'p') {
    playing = !playing;
  } else if (e.key === 'h') {
    document.getElementById('rec-ui').classList.toggle('hidden');
    document.getElementById('rec-hint').classList.toggle('hidden');
  } else if (e.key === 'v') {
    document.getElementById('btn-version').click();
  }
});

build();

function initExportMode() {
  const params = new URLSearchParams(location.search);
  if (params.get('export') !== '1') return;
  document.body.classList.add('export-mode');
  document.getElementById('rec-ui')?.classList.add('hidden');
  document.getElementById('rec-hint')?.classList.add('hidden');
  if (dotsEl) dotsEl.style.display = 'none';
  if (params.get('short') === '1') document.body.classList.add('short-mode');
  playing = true;
  show(0, false);
}

initExportMode();

window.__promoExport = {
  goTo(i) {
    show(i, false);
    elapsed = 0;
    updateProgressBar();
  },
  slideCount: activeSlides.length,
  getDuration(i) {
    return activeSlides[i].duration;
  },
};

const totalSec = Math.round(activeSlides.reduce((a, s) => a + s.duration, 0));
const hint = document.getElementById('rec-hint');
if (hint) {
  hint.textContent = `${shortMode ? 'Court' : 'Complet'} ~${totalSec} s · ${activeSlides.length} slides · V = version · Espace = suivant · M = musique · H = masquer`;
}

requestAnimationFrame(loop);
