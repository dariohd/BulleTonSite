import {
  brand,
  contact,
  nav,
  hero,
  sectors,
  services,
  projects,
  process,
  pricing,
  about,
  guarantees,
  promo,
  themes,
  defaultTheme,
} from './config.js';
import { fitMiniBrowser, observeMiniBrowser, resolveAsset } from './mini-browser.js';
import { initBubbles } from './bubbles.js';

function setText(sel, key, obj) {
  document.querySelectorAll(sel).forEach((el) => {
    if (el.tagName === 'IMG') return;
    const k = el.dataset[key];
    if (k && obj[k] != null) el.textContent = obj[k];
  });
}

function initBrand() {
  setText('[data-brand]', 'brand', brand);
  document.title = `${brand.name} — ${brand.tagline}`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = brand.description;
}

function initContact() {
  setText('[data-contact]', 'contact', contact);
  document.querySelectorAll('[data-contact="photo"]').forEach((img) => {
    img.src = resolveAsset(contact.photo);
    img.alt = `${contact.name} — ${brand.tagline}`;
    img.addEventListener(
      'error',
      () => {
        if (!img.src.endsWith('/assets/hugo-portrait.png')) {
          img.src = '/assets/hugo-portrait.png';
        }
      },
      { once: true }
    );
  });
  const emailLink = document.querySelector('[data-contact="email-link"]');
  if (emailLink) {
    emailLink.href = `mailto:${contact.email}`;
    emailLink.textContent = contact.email;
  }
  const phoneLink = document.querySelector('[data-contact="phone-link"]');
  if (phoneLink) {
    phoneLink.href = `tel:${contact.phoneTel}`;
    phoneLink.textContent = contact.phone;
  }
}

function initHero() {
  setText('[data-hero]', 'hero', hero);
  const statsEl = document.getElementById('hero-stats');
  if (!statsEl) return;

  statsEl.innerHTML = hero.stats
    .map((s) => {
      const isNumeric = /^\d+$/.test(String(s.value));
      const valueHtml = isNumeric
        ? `<span data-count="${s.value}">0</span>`
        : `<span>${s.value}</span>`;
      return `
    <div class="stat">
      <div class="stat__value"><span class="stat__num">${valueHtml}</span><span class="stat__suffix">${s.suffix}</span></div>
      <div class="stat__label">${s.label}</div>
    </div>`;
    })
    .join('');
}

function initNav() {
  const navEl = document.getElementById('nav');
  if (!navEl) return;
  navEl.innerHTML = nav
    .map((item) => `<a href="#${item.id}">${item.label}</a>`)
    .join('');

  const toggle = document.getElementById('nav-toggle');
  toggle?.addEventListener('click', () => {
    const open = navEl.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navEl.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navEl.classList.remove('is-open'));
  });
}

function initMarquee() {
  const track = document.getElementById('marquee');
  if (!track) return;
  const tags = [
    ...sectors.map((s) => ({ text: s, accent: false })),
    { text: 'Devis gratuit', accent: true },
    { text: 'Référencement local', accent: true },
    { text: 'Paiement en 2 fois', accent: true },
  ];
  const items = [...tags, ...tags];
  track.innerHTML = items
    .map(
      (t) =>
        `<span${t.accent ? ' class="marquee__accent"' : ''}>${t.text}</span>`
    )
    .join('');
}

function initServiceSpotlight() {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--spot-x', `${x}%`);
      card.style.setProperty('--spot-y', `${y}%`);
    });
  });
}

function initServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = services
    .map(
      (s) => `
    <article class="service-card reveal">
      <div class="service-card__icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </article>`
    )
    .join('');
}

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function miniBrowserHtml(p) {
  const domain = domainFromUrl(p.url);
  const imgSrc = p.image ? resolveAsset(p.image) : '';
  const fallbackImg = imgSrc
    ? `<img class="mini-browser__fallback-img" src="${imgSrc}" alt="${p.name}" loading="lazy" hidden />`
    : '';

  return `
    <div class="mini-browser">
      <div class="mini-browser__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <span class="mini-browser__url">${domain}</span>
      </div>
      <div class="mini-browser__viewport">
        <div class="mini-browser__scale">
          <iframe
            class="mini-browser__iframe"
            src="${p.url}"
            title="Aperçu ${p.name}"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
          ${fallbackImg}
        </div>
      </div>
      <p class="mini-browser__fallback">Intégration bloquée par le site — <a href="${p.url}" target="_blank" rel="noopener">ouvrir ${domain}</a></p>
    </div>`;
}

function setupEmbed(browser, p) {
  const iframe = browser.querySelector('.mini-browser__iframe');
  const fallback = browser.querySelector('.mini-browser__fallback-img');
  if (!iframe) return;

  if (!fallback) return;

  const activateFallback = () => {
    if (browser.classList.contains('is-blocked')) return;
    browser.classList.add('is-blocked');
    iframe.remove();
    fallback.hidden = false;
    requestAnimationFrame(() => fitMiniBrowser(browser));
  };

  let loaded = false;
  iframe.addEventListener('load', () => {
    loaded = true;
    setTimeout(() => {
      try {
        const doc = iframe.contentDocument;
        if (doc?.body && doc.body.childElementCount === 0) activateFallback();
      } catch {
        /* cross-origin : en général l’iframe est autorisée */
      }
    }, 500);
  });

  iframe.addEventListener('error', activateFallback);
  setTimeout(() => {
    if (!loaded) activateFallback();
  }, 9000);
}

function panelHtml(p, realIndex) {
  return `
    <article class="showcase__panel reveal" data-real-index="${realIndex}">
      <div class="showcase__info">
        <p class="showcase__sector">${p.sector}</p>
        <h3>${p.name}</h3>
        ${p.outcome ? `<p class="showcase__outcome">${p.outcome}</p>` : ''}
        <p class="showcase__desc">${p.description}</p>
        <div class="showcase__tags">
          ${p.tags.map((t) => `<span>${t}</span>`).join('')}
        </div>
        <div class="showcase__actions">
          <a class="btn" href="${p.url}" target="_blank" rel="noopener">Voir le site en ligne →</a>
          <a class="btn btn--ghost" href="#contact">Un site comme celui-ci</a>
        </div>
        <p class="showcase__note">Faites glisser la souris dans l'aperçu pour explorer la page</p>
      </div>
      ${miniBrowserHtml(p)}
    </article>`;
}

function initShowcase() {
  const showcase = document.getElementById('showcase');
  const track = document.getElementById('projects-track');
  if (!track || !showcase) return;

  track.innerHTML = projects.map((p, i) => panelHtml(p, i)).join('');

  track.querySelectorAll('.mini-browser').forEach((browser, idx) => {
    setupEmbed(browser, projects[idx]);
    const vp = browser.querySelector('.mini-browser__viewport');
    setupMiniViewportDrag(vp);
    observeMiniBrowser(browser);
    browser.querySelector('iframe')?.addEventListener('load', () => {
      fitMiniBrowser(browser);
      setTimeout(() => fitMiniBrowser(browser), 150);
    });
  });

  const refitAll = () => track.querySelectorAll('.mini-browser').forEach(fitMiniBrowser);

  const panels = () => [...track.querySelectorAll('.showcase__panel')];

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.mini-browser').forEach((b) => {
            fitMiniBrowser(b);
            setTimeout(() => fitMiniBrowser(b), 120);
          });
        }
      });
    },
    { threshold: 0.35 }
  );
  panels().forEach((p) => visibilityObserver.observe(p));

  const getRealIndex = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    panels().forEach((panel) => {
      const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
      const dist = Math.abs(center - panelCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = Number(panel.dataset.realIndex);
      }
    });
    return best;
  };

  const updateActive = () => {
    const i = getRealIndex();
    panels().forEach((p) =>
      p.classList.toggle('is-active', Number(p.dataset.realIndex) === i)
    );
  };

  const scrollToRealIndex = (realIndex, smooth = true) => {
    const target = panels().find((p) => Number(p.dataset.realIndex) === realIndex);
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
    setTimeout(() => {
      updateActive();
      target.querySelectorAll('.mini-browser').forEach(fitMiniBrowser);
    }, smooth ? 400 : 0);
  };

  requestAnimationFrame(() => {
    scrollToRealIndex(0, false);
    updateActive();
    refitAll();
    setTimeout(refitAll, 250);
  });

  track.addEventListener(
    'wheel',
    (e) => {
      if (e.target.closest('.mini-browser__viewport')) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY * 0.85;
    },
    { passive: false }
  );

  track.addEventListener(
    'scroll',
    () => {
      updateActive();
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    scrollToRealIndex(getRealIndex(), false);
    refitAll();
  });

  document.getElementById('showcase-prev')?.addEventListener('click', () => {
    const prev = (getRealIndex() - 1 + projects.length) % projects.length;
    scrollToRealIndex(prev);
  });

  document.getElementById('showcase-next')?.addEventListener('click', () => {
    const next = (getRealIndex() + 1) % projects.length;
    scrollToRealIndex(next);
  });

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      document.getElementById('showcase-prev')?.click();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      document.getElementById('showcase-next')?.click();
    }
  });
}

function setupMiniViewportDrag(vp) {
  if (!vp) return;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let scrollL = 0;
  let scrollT = 0;

  vp.addEventListener('pointerdown', (e) => {
    if (e.target.closest('iframe')) return;
    dragging = true;
    vp.classList.add('is-dragging');
    startX = e.clientX;
    startY = e.clientY;
    scrollL = vp.scrollLeft;
    scrollT = vp.scrollTop;
    vp.setPointerCapture(e.pointerId);
  });

  vp.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    vp.scrollLeft = scrollL - (e.clientX - startX);
    vp.scrollTop = scrollT - (e.clientY - startY);
  });

  const stopDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    vp.classList.remove('is-dragging');
    try {
      vp.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };
  vp.addEventListener('pointerup', stopDrag);
  vp.addEventListener('pointercancel', stopDrag);
}

function initThemePicker() {
  const picker = document.getElementById('theme-picker');
  if (!picker) return;

  const saved = localStorage.getItem('site-theme');
  const initial = saved && themes.some((t) => t.id === saved) ? saved : defaultTheme;
  document.documentElement.dataset.theme = initial;
  document.body.dataset.theme = initial;

  picker.innerHTML = `
    <span class="theme-picker__label">Palette</span>
    ${themes
      .map(
        (t) =>
          `<button type="button" class="theme-picker__btn${t.id === initial ? ' is-active' : ''}" data-theme="${t.id}" style="background:${t.swatch}" title="${t.label}" aria-label="${t.label}"></button>`
      )
      .join('')}`;

  picker.querySelectorAll('.theme-picker__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.theme;
      document.documentElement.dataset.theme = id;
      document.body.dataset.theme = id;
      localStorage.setItem('site-theme', id);
      picker.querySelectorAll('.theme-picker__btn').forEach((b) => b.classList.toggle('is-active', b === btn));
    });
  });
}

function initProjects() {
  initShowcase();
}

function initProcess() {
  setText('[data-process]', 'process', process);
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  timeline.innerHTML = process.steps
    .map(
      (s) => `
    <li class="timeline__item reveal">
      <div class="timeline__num">${s.num}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </li>`
    )
    .join('');
}

function initTrustBar() {
  const el = document.getElementById('trust-bar');
  if (!el) return;
  el.innerHTML = guarantees.map((g) => `<span class="trust-bar__item">${g}</span>`).join('');
}

function initPromo() {
  const section = document.getElementById('promo');
  if (!section) return;
  section.innerHTML = `
    <div class="container promo-band reveal">
      <div class="promo-band__text">
        <h2 class="promo-band__title">${promo.title}</h2>
        <p class="promo-band__lead">${promo.text}</p>
      </div>
      <a class="btn btn--lg" href="#contact">${promo.cta}</a>
    </div>`;
}

function initPricing() {
  setText('[data-pricing]', 'pricing', pricing);
  const fromEl = document.getElementById('price-from');
  if (fromEl) fromEl.textContent = `${pricing.from} €`;

  const grid = document.getElementById('pricing-grid');
  if (grid) {
    grid.innerHTML = pricing.tiers
      .map(
        (t) => `
      <article class="price-card reveal${t.highlight ? ' price-card--highlight' : ''}">
        ${t.badge ? `<span class="price-card__badge">${t.badge}</span>` : ''}
        <h3>${t.label}</h3>
        <p class="price-card__range">${t.range}</p>
        <ul>${t.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </article>`
      )
      .join('');
  }

  const footnotes = document.getElementById('pricing-footnotes');
  if (footnotes) {
    footnotes.innerHTML = pricing.footnotes.map((f) => `<li>${f}</li>`).join('');
  }
}

function initAbout() {
  setText('[data-about]', 'about', about);
  const list = document.getElementById('about-list');
  if (list) list.innerHTML = about.bullets.map((b) => `<li>${b}</li>`).join('');
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  const onScroll = () => {
    header?.classList.toggle('header--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
  const links = document.querySelectorAll('.nav a');

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => spy.observe(s));
}

function initFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

initBrand();
initContact();
initHero();
initNav();
initMarquee();
initTrustBar();
initServices();
initServiceSpotlight();
initProjects();
initProcess();
initPricing();
initPromo();
initAbout();
initFooter();
initScrollReveal();
initHeader();
initBubbles();
