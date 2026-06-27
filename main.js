import {
  brand,
  contact,
  nav,
  hero,
  sectors,
  services,
  projects,
  projectsCustom,
  testimonials,
  process,
  pricing,
  about,
  organization,
  team,
  guarantees,
  promo,
  comparison,
  faq,
  legal,
  seo,
  portfolio,
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
  document.querySelectorAll('[data-brand="name"]').forEach((el) => {
    el.innerHTML = brand.name
      .replace(/^Bulle/, '<em class="logo__bulle">Bulle</em>')
      .replace('ton site', '<span class="logo__rest">ton site</span>');
  });
  document.querySelectorAll('[data-brand="byline"]').forEach((el) => {
    if (brand.byline) el.textContent = brand.byline;
  });
  document.title = seo.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = seo.description;
}

function initSeo() {
  const ogTitle = document.getElementById('og-title');
  const ogDesc = document.getElementById('og-desc');
  if (ogTitle) ogTitle.content = seo.title;
  if (ogDesc) ogDesc.content = seo.description;

  const schemaEl = document.getElementById('schema-org');
  if (schemaEl) {
    schemaEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organization.brand,
      url: portfolio.url,
      description: seo.description,
      email: contact.email,
      telephone: contact.phoneTel,
      areaServed: 'FR',
      sameAs: [],
    });
  }
}

function initContact() {
  setText('[data-contact]', 'contact', contact);
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
  const privacy = document.getElementById('contact-privacy');
  if (privacy) privacy.textContent = legal.privacyNote;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const activity = data.get('activity');
    const need = data.get('need');
    const budget = data.get('budget');
    const message = data.get('message') || '—';

    const subject = encodeURIComponent(`Devis Bulle ton site — ${activity}`);
    const body = encodeURIComponent(
      `Nom : ${name}\nE-mail : ${email}\nActivité : ${activity}\nBesoin : ${need}\nBudget : ${budget}\n\nMessage :\n${message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    if (status) {
      status.hidden = false;
      status.textContent =
        'Votre client mail va s\'ouvrir avec le message prérempli. Si rien ne s\'affiche, écrivez-nous directement à ' +
        contact.email;
    }
  });
}

function initStickyCta() {
  const cta = document.getElementById('sticky-cta');
  const heroEl = document.getElementById('hero');
  if (!cta || !heroEl) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      cta.hidden = entry.isIntersecting;
    },
    { threshold: 0.05 },
  );
  observer.observe(heroEl);
}

function initHero() {
  setText('[data-hero]', 'hero', hero);
  const chipsEl = document.getElementById('hero-chips');
  if (chipsEl && hero.chips?.length) {
    chipsEl.innerHTML = hero.chips.map((c) => `<li>${c}</li>`).join('');
  }
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
  navEl.innerHTML = nav.map((item) => `<a href="#${item.id}">${item.label}</a>`).join('');

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
    { text: 'Prototype en 2–3 jours', accent: true },
    { text: 'Paiement en 2 fois', accent: true },
  ];
  const items = [...tags, ...tags];
  track.innerHTML = items
    .map((t) => `<span${t.accent ? ' class="marquee__accent"' : ''}>${t.text}</span>`)
    .join('');
}

function initServiceSpotlight() {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--spot-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
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
    </article>`,
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

  if (imgSrc) {
    return `
    <div class="mini-browser mini-browser--preview" data-project-url="${p.url}">
      <div class="mini-browser__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <span class="mini-browser__url">${domain}</span>
      </div>
      <div class="mini-browser__viewport mini-browser__viewport--static">
        <img class="mini-browser__preview-img" src="${imgSrc}" alt="Aperçu ${p.name}" loading="lazy" />
        <button type="button" class="btn btn--sm mini-browser__live-btn">Aperçu interactif</button>
      </div>
    </div>`;
  }

  return `
    <div class="mini-browser" data-project-url="${p.url}">
      <div class="mini-browser__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <span class="mini-browser__url">${domain}</span>
      </div>
      <div class="mini-browser__viewport">
        <div class="mini-browser__scale">
          <iframe class="mini-browser__iframe" src="${p.url}" title="Aperçu ${p.name}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>
        </div>
      </div>
      <p class="mini-browser__fallback">Intégration bloquée — <a href="${p.url}" target="_blank" rel="noopener">ouvrir ${domain}</a></p>
    </div>`;
}

function activateLivePreview(browser, p) {
  if (browser.classList.contains('is-live')) return;
  browser.classList.add('is-live');
  const domain = domainFromUrl(p.url);
  browser.innerHTML = `
    <div class="mini-browser__bar" aria-hidden="true">
      <span></span><span></span><span></span>
      <span class="mini-browser__url">${domain}</span>
    </div>
    <div class="mini-browser__viewport">
      <div class="mini-browser__scale">
        <iframe class="mini-browser__iframe" src="${p.url}" title="Aperçu ${p.name}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>
      </div>
    </div>
    <p class="mini-browser__fallback">Intégration bloquée — <a href="${p.url}" target="_blank" rel="noopener">ouvrir ${domain}</a></p>`;

  const vp = browser.querySelector('.mini-browser__viewport');
  setupMiniViewportDrag(vp);
  observeMiniBrowser(browser);
  browser.querySelector('iframe')?.addEventListener('load', () => {
    fitMiniBrowser(browser);
    setTimeout(() => fitMiniBrowser(browser), 150);
  });
  requestAnimationFrame(() => fitMiniBrowser(browser));
}

function panelHtml(p, realIndex) {
  return `
    <article class="showcase__panel reveal" data-real-index="${realIndex}">
      <div class="showcase__info">
        <p class="showcase__sector">${p.sector}</p>
        <h3>${p.name}</h3>
        ${p.outcome ? `<p class="showcase__outcome">${p.outcome}</p>` : ''}
        <p class="showcase__desc">${p.description}</p>
        <div class="showcase__tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <div class="showcase__actions">
          <a class="btn" href="${p.url}" target="_blank" rel="noopener">Voir le site en ligne →</a>
          <a class="btn btn--ghost" href="#contact">Un site comme celui-ci</a>
        </div>
        <p class="showcase__note">Capture d'écran par défaut · cliquez sur « Aperçu interactif » pour explorer</p>
      </div>
      ${miniBrowserHtml(p)}
    </article>`;
}

function initShowcase(list = projects) {
  const track = document.getElementById('projects-track');
  if (!track) return;

  track.innerHTML = list.map((p, i) => panelHtml(p, i)).join('');

  track.querySelectorAll('.mini-browser--preview').forEach((browser, idx) => {
    const btn = browser.querySelector('.mini-browser__live-btn');
    btn?.addEventListener('click', () => activateLivePreview(browser, list[idx]));
  });

  track.querySelectorAll('.mini-browser:not(.mini-browser--preview)').forEach((browser, idx) => {
    const p = list[idx];
    const vp = browser.querySelector('.mini-browser__viewport');
    setupMiniViewportDrag(vp);
    observeMiniBrowser(browser);
    browser.querySelector('iframe')?.addEventListener('load', () => fitMiniBrowser(browser));
  });

  const panels = () => [...track.querySelectorAll('.showcase__panel')];

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
      p.classList.toggle('is-active', Number(p.dataset.realIndex) === i),
    );
  };

  const scrollToRealIndex = (realIndex, smooth = true) => {
    const target = panels().find((p) => Number(p.dataset.realIndex) === realIndex);
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
    setTimeout(updateActive, smooth ? 400 : 0);
  };

  requestAnimationFrame(() => {
    scrollToRealIndex(0, false);
    updateActive();
  });

  track.addEventListener(
    'wheel',
    (e) => {
      if (e.target.closest('.mini-browser__viewport')) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (e.shiftKey && absY > absX) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
        return;
      }
      if (absX <= absY) return;
      e.preventDefault();
      track.scrollLeft += e.deltaX;
    },
    { passive: false },
  );

  track.addEventListener('scroll', updateActive, { passive: true });

  window.addEventListener('resize', () => scrollToRealIndex(getRealIndex(), false));

  document.getElementById('showcase-prev')?.addEventListener('click', () => {
    scrollToRealIndex((getRealIndex() - 1 + list.length) % list.length);
  });

  document.getElementById('showcase-next')?.addEventListener('click', () => {
    scrollToRealIndex((getRealIndex() + 1) % list.length);
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

function initCustomProjects() {
  const el = document.getElementById('custom-projects');
  if (!el || projectsCustom.length === 0) return;

  el.innerHTML = `
    <div class="custom-projects__head reveal">
      <h3 class="custom-projects__title">Outils <em>sur mesure</em></h3>
      <p class="custom-projects__sub">Au-delà des vitrines : applications métier, PWA et outils internes.</p>
    </div>
    <div class="custom-projects__grid">
      ${projectsCustom
        .map(
          (p) => `
        <article class="custom-card reveal">
          <p class="custom-card__sector">${p.sector}</p>
          <h4>${p.name}</h4>
          <p>${p.description}</p>
          <p class="custom-card__outcome">${p.outcome}</p>
          <div class="showcase__tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          <a class="btn btn--ghost" href="${p.url}" target="_blank" rel="noopener">Voir le projet →</a>
        </article>`,
        )
        .join('')}
    </div>`;
}

function setupMiniViewportDrag(vp) {
  if (!vp) return;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let scrollL = 0;
  let scrollT = 0;

  vp.addEventListener('pointerdown', (e) => {
    if (e.target.closest('iframe, button')) return;
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

function initProjects() {
  initShowcase(projects);
  initCustomProjects();
}

function initTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = testimonials
    .map(
      (t) => `
    <blockquote class="testimonial-card reveal">
      <p class="testimonial-card__quote">« ${t.quote} »</p>
      <footer>
        <cite class="testimonial-card__author">${t.author}</cite>
        <span class="testimonial-card__role">${t.role}</span>
      </footer>
    </blockquote>`,
    )
    .join('');
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
      <p class="timeline__who">${s.who}</p>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </li>`,
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

function initComparison() {
  const title = document.getElementById('compare-title');
  const sub = document.getElementById('compare-sub');
  const table = document.getElementById('compare-table');
  const disclaimer = document.getElementById('compare-disclaimer');
  if (!table) return;

  if (title) title.innerHTML = comparison.title.replace('accompagné', '<em>accompagné</em>');
  if (sub) sub.textContent = comparison.subtitle;
  if (disclaimer) disclaimer.textContent = comparison.disclaimer;

  const head = `
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col" class="compare__us">${comparison.us.label}<span>${comparison.us.hint}</span></th>
        <th scope="col">${comparison.them.label}<span>${comparison.them.hint}</span></th>
      </tr>
    </thead>`;

  const body = comparison.rows
    .map(
      (row) => `
      <tr>
        <th scope="row">${row.label}</th>
        <td class="compare__us">${row.us}</td>
        <td>${row.them}</td>
      </tr>`,
    )
    .join('');

  table.innerHTML = head + `<tbody>${body}</tbody>`;
}

function initPricing() {
  setText('[data-pricing]', 'pricing', pricing);
  const fromEl = document.getElementById('price-from');
  if (fromEl) fromEl.textContent = `${pricing.from} €`;

  const exampleEl = document.getElementById('pricing-example');
  if (exampleEl && pricing.example) {
    exampleEl.innerHTML = `
      <div class="pricing-example__inner">
        <span class="pricing-example__label">${pricing.example.label}</span>
        <strong class="pricing-example__range">${pricing.example.range}</strong>
        <p class="pricing-example__detail">${pricing.example.detail}</p>
      </div>`;
  }

  const grid = document.getElementById('pricing-grid');
  if (grid) {
    grid.innerHTML = pricing.tiers
      .map(
        (t) => `
      <article class="price-card reveal${t.highlight ? ' price-card--highlight' : ''}">
        <div class="price-card__top">${t.badge ? `<span class="price-card__badge">${t.badge}</span>` : ''}</div>
        <h3>${t.label}</h3>
        <p class="price-card__range">${t.range}</p>
        ${t.rangeNote ? `<p class="price-card__devis">${t.rangeNote}</p>` : ''}
        <ul>${t.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </article>`,
      )
      .join('');
  }

  const footnotes = document.getElementById('pricing-footnotes');
  if (footnotes) {
    footnotes.innerHTML = pricing.footnotes.map((f) => `<li>${f}</li>`).join('');
  }
}

function initFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = faq
    .map(
      (item, i) => `
    <details class="faq__item reveal"${i === 0 ? ' open' : ''}>
      <summary class="faq__q">${item.q}</summary>
      <p class="faq__a">${item.a}</p>
    </details>`,
    )
    .join('');
}

function teamInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function initAbout() {
  setText('[data-about]', 'about', about);
  const blurb = document.getElementById('team-blurb');
  if (blurb && about.blurb) blurb.textContent = about.blurb;

  const grid = document.getElementById('team-grid');
  if (!grid) return;

  grid.innerHTML = team
    .map(
      (member) => `
    <article class="team-card reveal">
      ${
        member.photo
          ? `<div class="team-card__avatar team-card__avatar--photo"><img src="${resolveAsset(member.photo)}" alt="${member.name}" width="88" height="88" loading="lazy" decoding="async" /></div>`
          : `<div class="team-card__avatar" aria-hidden="true">${teamInitials(member.name)}</div>`
      }
      <h3 class="team-card__name">${member.name}</h3>
      <p class="team-card__role">${member.role}</p>
    </article>`,
    )
    .join('');
}

function initFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const brandEl = document.getElementById('footer-brand');
  if (brandEl) {
    brandEl.textContent = organization.brand;
  }

  const copyNameEl = document.getElementById('footer-copy-name');
  if (copyNameEl) copyNameEl.textContent = organization.parent;
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  const onScroll = () => header?.classList.toggle('header--scrolled', window.scrollY > 40);
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
    { rootMargin: '-40% 0px -50% 0px' },
  );
  sections.forEach((s) => spy.observe(s));
}

initBrand();
initSeo();
initContact();
initContactForm();
initStickyCta();
initHero();
initNav();
initMarquee();
initTrustBar();
initServices();
initServiceSpotlight();
initProjects();
initTestimonials();
initProcess();
initComparison();
initPricing();
initPromo();
initAbout();
initFaq();
initFooter();
initScrollReveal();
initHeader();
initBubbles();
