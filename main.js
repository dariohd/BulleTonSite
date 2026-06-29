import {
  brand,
  contact,
  nav,
  hero,
  sectors,
  servicesIntro,
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
  form,
  analytics,
} from './config.js';
import { fitMiniBrowser, observeMiniBrowser, observeShowcaseBrowser, fitShowcaseBrowser, resolveAsset, fallbackScreenshotUrl, watchMiniBrowserEmbed } from './mini-browser.js';
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

  const siteUrl = portfolio.url.replace(/\/$/, '');
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `${siteUrl}/`;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = `${siteUrl}/`;

  const imgPath = seo.ogImage.replace(/^\.\//, '');
  const imageUrl = `${siteUrl}/${imgPath}`;

  const ogImage = document.getElementById('og-image') || document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.content = imageUrl;

  const twitterTitle = document.getElementById('twitter-title');
  const twitterDesc = document.getElementById('twitter-desc');
  const twitterImage = document.getElementById('twitter-image');
  if (twitterTitle) twitterTitle.content = seo.title;
  if (twitterDesc) twitterDesc.content = seo.description;
  if (twitterImage) twitterImage.content = imageUrl;

  const schemaEl = document.getElementById('schema-org');
  if (schemaEl) {
    schemaEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: organization.brand,
          url: siteUrl,
          logo: `${siteUrl}/assets/favicon.svg`,
          description: seo.description,
          email: contact.email,
          telephone: contact.phoneTel,
          areaServed: 'FR',
          parentOrganization: {
            '@type': 'Organization',
            name: organization.legalName || organization.parent,
          },
        },
        {
          '@type': 'WebSite',
          name: organization.brand,
          url: siteUrl,
          description: seo.description,
        },
        {
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        },
      ],
    });
  }
}

function initAnalytics() {
  if (!analytics.enabled || !analytics.domain) return;
  if (document.querySelector('script[data-plausible]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.dataset.domain = analytics.domain;
  s.dataset.plausible = 'true';
  s.src = analytics.scriptSrc;
  document.head.appendChild(s);
}

function fillFormSelect(select, options) {
  if (!select || !options?.length) return;
  select.innerHTML = options
    .map((opt) => {
      const attrs = [
        opt.placeholder ? 'value="" disabled selected hidden' : `value="${opt.value}"`,
      ].join(' ');
      return `<option ${attrs}>${opt.label}</option>`;
    })
    .join('');
}

function formatFormSummary(data) {
  const lines = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    data.phone ? `Téléphone : ${data.phone}` : null,
    `Activité : ${data.activity}`,
    `Besoin : ${data.need}`,
    `Budget : ${data.budget}`,
    `Après mise en ligne : ${data.hosting}`,
    `Délai souhaité : ${data.timeline}`,
    '',
    'Message :',
    data.message,
  ].filter(Boolean);
  return lines.join('\n');
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
  if (privacy) {
    privacy.innerHTML = `${legal.privacyNote} <a href="${legal.mentionsUrl}">Mentions légales</a>.`;
  }

  const consentLabel = document.getElementById('contact-consent-label');
  if (consentLabel) {
    consentLabel.innerHTML = `${legal.consentLabel} (<a href="${legal.mentionsUrl}">détail</a>)`;
  }

  fillFormSelect(document.getElementById('contact-need'), form.needs);
  fillFormSelect(document.getElementById('contact-budget'), form.budgets);
  fillFormSelect(document.getElementById('contact-hosting'), form.hosting);
  fillFormSelect(document.getElementById('contact-timeline'), form.timelines);

  const submitBtn = document.querySelector('.contact-form__submit');
  if (submitBtn && form.submitLabel) submitBtn.textContent = form.submitLabel;
}

function initContactForm() {
  const formEl = document.getElementById('contact-form');
  const status = document.getElementById('contact-form-status');
  const submitBtn = formEl?.querySelector('.contact-form__submit');
  if (!formEl) return;

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    const data = new FormData(formEl);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const activity = String(data.get('activity') || '').trim();
    const need = String(data.get('need') || '').trim();
    const budget = String(data.get('budget') || '').trim();
    const hosting = String(data.get('hosting') || '').trim();
    const timeline = String(data.get('timeline') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (data.get('_gotcha')) return;
    if (!data.get('consent')) {
      formEl.reportValidity();
      return;
    }

    const summary = formatFormSummary({
      name,
      email,
      phone,
      activity,
      need,
      budget,
      hosting,
      timeline,
      message,
    });

    const payload = {
      name,
      email,
      phone,
      activity,
      need,
      budget,
      hosting,
      timeline,
      message,
      subject: `Devis Bulle ton site : ${activity} — ${need}`,
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = form.sendingLabel || 'Envoi en cours…';
    }
    if (status) {
      status.hidden = false;
      status.classList.remove('contact-form__status--error');
      status.textContent = 'Envoi de votre demande…';
    }

    try {
      let ok = false;

      if (form.web3formsAccessKey) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: form.web3formsAccessKey,
            name,
            email,
            phone,
            subject: payload.subject,
            message: summary,
            from_name: name,
            replyto: email,
          }),
        });
        const json = await res.json();
        ok = json.success === true;
      } else {
        const targetEmail = form.formsubmitEmail || contact.email;
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            activity,
            need,
            budget,
            hosting,
            timeline,
            message,
            _subject: payload.subject,
            _replyto: email,
            _captcha: 'false',
            _template: 'table',
          }),
        });
        const json = await res.json().catch(() => ({}));
        ok = res.ok && json.success !== 'false';
      }

      if (!ok) throw new Error('submit failed');

      formEl.reset();
      fillFormSelect(document.getElementById('contact-need'), form.needs);
      fillFormSelect(document.getElementById('contact-budget'), form.budgets);
      fillFormSelect(document.getElementById('contact-hosting'), form.hosting);
      fillFormSelect(document.getElementById('contact-timeline'), form.timelines);
      if (status) {
        status.textContent =
          form.successMessage ||
          'Message envoyé. Nous vous répondons sous 48 h. Pensez à vérifier vos spams.';
      }
    } catch {
      if (status) {
        status.classList.add('contact-form__status--error');
        status.textContent = `Envoi impossible pour le moment. Écrivez-nous à ${contact.email} ou appelez le ${contact.phone}.`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = form.submitLabel || 'Envoyer ma demande';
      }
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navEl.classList.contains('is-open')) {
      navEl.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    }
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
  const sub = document.getElementById('services-sub');
  if (sub && servicesIntro?.subtitle) sub.textContent = servicesIntro.subtitle;

  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = services
    .map(
      (s) => `
    <article class="service-card reveal">
      ${s.label ? `<p class="service-card__label">${s.label}</p>` : ''}
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
  const screenshotOnly = p.embed === 'screenshot';
  const imgFallback = p.image ? resolveAsset(p.image) : fallbackScreenshotUrl(p.url);
  const modeClass = screenshotOnly ? ' is-screenshot' : '';

  return `
    <div class="mini-browser mini-browser--16x9${modeClass}" data-project-url="${p.url}" data-embed-mode="${screenshotOnly ? 'screenshot' : 'iframe'}">
      <div class="mini-browser__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <span class="mini-browser__url">${domain}</span>
      </div>
      <div class="mini-browser__viewport">
        <div class="mini-browser__scale">
          ${
            screenshotOnly
              ? ''
              : `<iframe
            class="mini-browser__iframe"
            data-src="${p.url}"
            title="Aperçu ${p.name}"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          ></iframe>`
          }
          <img class="mini-browser__fallback-img" src="${imgFallback}" alt="Aperçu ${p.name}"${screenshotOnly ? '' : ' hidden'} />
        </div>
      </div>
      <p class="mini-browser__fallback">Aperçu indisponible, <a href="${p.url}" target="_blank" rel="noopener">ouvrir ${domain}</a></p>
    </div>`;
}

function loadBrowserIframe(browser) {
  const iframe = browser?.querySelector('.mini-browser__iframe');
  if (!iframe?.dataset.src || iframe.src) return;
  iframe.src = iframe.dataset.src;
  watchMiniBrowserEmbed(browser);
}

function initLiveBrowser(browser) {
  if (!browser || browser.dataset.liveReady === 'true') return;
  browser.dataset.liveReady = 'true';

  const fitted = browser.classList.contains('mini-browser--16x9');
  if (fitted) {
    observeShowcaseBrowser(browser);
    browser.querySelector('.mini-browser__iframe')?.addEventListener('load', () => {
      fitShowcaseBrowser(browser);
    });
    if (browser.dataset.embedMode === 'screenshot') {
      requestAnimationFrame(() => fitShowcaseBrowser(browser));
    }
    return;
  }

  const vp = browser.querySelector('.mini-browser__viewport');
  setupMiniViewportDrag(vp);
  observeMiniBrowser(browser);
  const iframe = browser.querySelector('.mini-browser__iframe');
  iframe?.addEventListener('load', () => {
    fitMiniBrowser(browser);
    setTimeout(() => fitMiniBrowser(browser), 150);
  });
}

function unloadBrowserIframe(browser) {
  const iframe = browser?.querySelector('.mini-browser__iframe');
  if (!iframe?.src) return;
  iframe.removeAttribute('src');
}

function panelHtml(p, realIndex, slideIndex, clone = '') {
  const typeLabel =
    p.category === 'sur-mesure'
      ? '<p class="showcase__type">Outil sur mesure</p>'
      : '<p class="showcase__type showcase__type--empty" aria-hidden="true"></p>';
  const results =
    p.results?.length > 0
      ? `<ul class="showcase__results">${p.results.map((r) => `<li>${r}</li>`).join('')}</ul>`
      : '';

  return `
    <article class="showcase__panel reveal" data-real-index="${realIndex}" data-slide-index="${slideIndex}"${clone ? ` data-clone="${clone}"` : ''}>
      <div class="showcase__info">
        <p class="showcase__sector">${p.sector}</p>
        ${typeLabel}
        <h3>${p.name}</h3>
        ${p.outcome ? `<p class="showcase__outcome">${p.outcome}</p>` : ''}
        ${results}
        <p class="showcase__desc">${p.description}</p>
        <div class="showcase__tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <div class="showcase__actions">
          <a class="btn" href="${p.url}" target="_blank" rel="noopener">Voir le site en ligne →</a>
          <a class="btn btn--ghost" href="#contact">Un site comme celui-ci</a>
        </div>
      </div>
      <div class="showcase__preview">
        ${miniBrowserHtml(p)}
      </div>
    </article>`;
}

function initShowcase(list = projects) {
  const track = document.getElementById('projects-track');
  if (!track || list.length === 0) return;

  const n = list.length;
  const slides =
    n > 1
      ? [
          { p: list[n - 1], real: n - 1, clone: 'start' },
          ...list.map((p, i) => ({ p, real: i, clone: '' })),
          { p: list[0], real: 0, clone: 'end' },
        ]
      : list.map((p, i) => ({ p, real: i, clone: '' }));

  track.innerHTML = slides.map((s, i) => panelHtml(s.p, s.real, i, s.clone)).join('');

  const statusEl = document.createElement('p');
  statusEl.id = 'showcase-status';
  statusEl.className = 'visually-hidden';
  statusEl.setAttribute('aria-live', 'polite');
  statusEl.setAttribute('aria-atomic', 'true');
  track.insertAdjacentElement('afterend', statusEl);

  track.querySelectorAll('.mini-browser').forEach((browser) => initLiveBrowser(browser));

  const panels = () => [...track.querySelectorAll('.showcase__panel')];
  let isJumping = false;
  let scrollSyncTimer = 0;
  let lastFocused = -1;

  const setTrackPadding = () => {
    track.style.paddingLeft = '0';
    track.style.paddingRight = '0';
  };

  const getFocusedSlideIndex = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    panels().forEach((panel, i) => {
      const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
      const dist = Math.abs(center - panelCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  const activatePanel = (panel) => {
    const browser = panel?.querySelector('.mini-browser');
    if (!browser) return;
    loadBrowserIframe(browser);
    requestAnimationFrame(() => fitShowcaseBrowser(browser));
  };

  const updateActive = () => {
    const idx = getFocusedSlideIndex();
    const focused = panels()[idx];
    if (!focused) return;

    panels().forEach((p) => {
      const isFocused = p === focused;
      p.classList.toggle('is-active', isFocused);
      if (!isFocused) unloadBrowserIframe(p.querySelector('.mini-browser'));
    });

    if (idx !== lastFocused) {
      lastFocused = idx;
      activatePanel(focused);
      const realIndex = Number.parseInt(focused.dataset.realIndex ?? '0', 10);
      const project = list[realIndex];
      if (project && statusEl) {
        statusEl.textContent = `${project.name} — ${realIndex + 1} sur ${n}`;
      }
    }
  };

  const scrollToSlide = (slideIndex, smooth = true) => {
    const target = panels()[slideIndex];
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft,
      behavior: smooth && !isJumping ? 'smooth' : 'auto',
    });
    if (!smooth || isJumping) updateActive();
    else setTimeout(updateActive, 420);
  };

  const maybeJumpClone = () => {
    if (n <= 1) return;
    const focused = panels()[getFocusedSlideIndex()];
    if (!focused?.dataset.clone) return;

    isJumping = true;
    if (focused.dataset.clone === 'start') {
      scrollToSlide(n, false);
    } else if (focused.dataset.clone === 'end') {
      scrollToSlide(1, false);
    }
    requestAnimationFrame(() => {
      isJumping = false;
      lastFocused = -1;
      updateActive();
    });
  };

  const goNext = () => scrollToSlide(getFocusedSlideIndex() + 1);
  const goPrev = () => scrollToSlide(getFocusedSlideIndex() - 1);

  const initPosition = () => {
    setTrackPadding();
    scrollToSlide(n > 1 ? 1 : 0, false);
    updateActive();
  };

  requestAnimationFrame(initPosition);

  track.addEventListener(
    'wheel',
    (e) => {
      if (e.target.closest('.mini-browser__viewport')) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const horizontal = e.shiftKey ? absY : absX;
      const vertical = e.shiftKey ? 0 : absY;
      if (horizontal <= vertical) return;
      e.preventDefault();
      if (e.deltaX > 0 || (e.shiftKey && e.deltaY > 0)) goNext();
      else goPrev();
    },
    { passive: false },
  );

  track.addEventListener('scroll', () => {
    if (!isJumping) updateActive();
    clearTimeout(scrollSyncTimer);
    scrollSyncTimer = setTimeout(maybeJumpClone, 140);
  }, { passive: true });

  window.addEventListener('resize', () => {
    const idx = getFocusedSlideIndex();
    setTrackPadding();
    scrollToSlide(idx, false);
    panels().forEach((p) => {
      const browser = p.querySelector('.mini-browser--16x9');
      if (browser) fitShowcaseBrowser(browser);
    });
  });

  document.getElementById('showcase-prev')?.addEventListener('click', goPrev);
  document.getElementById('showcase-next')?.addEventListener('click', goNext);

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  });
}

function initCustomProjects() {
  const el = document.getElementById('custom-projects');
  if (!el || projectsCustom.length === 0) return;

  el.innerHTML = `
    <p class="custom-projects__note reveal">
      Le carrousel inclut aussi des <strong>outils sur mesure</strong> : applications métier, PWA et tableaux de bord.
      Faites défiler jusqu'à <strong>SQCDP</strong> pour un exemple interactif.
    </p>`;
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
  initShowcase([...projects, ...projectsCustom]);
  initCustomProjects();
}

function initTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = testimonials
    .map(
      (t, i) => `
    <blockquote class="quote-bubble reveal quote-bubble--${i + 1}">
      <span class="quote-bubble__mark" aria-hidden="true">«</span>
      <p class="quote-bubble__text">${t.quote}</p>
      <footer class="quote-bubble__foot">
        <cite class="quote-bubble__author">${t.author}</cite>
        <span class="quote-bubble__role">${t.role}</span>
      </footer>
    </blockquote>`,
    )
    .join('');
}

function initCrew() {
  setText('[data-process]', 'process', process);

  const timeline = document.getElementById('timeline');
  const note = document.getElementById('about');

  if (note && about.text) {
    note.innerHTML = about.blurb
      ? `${about.text} <em>${about.blurb}</em>`
      : about.text;
  }

  if (!timeline) return;

  timeline.innerHTML = team
    .map((member, i) => {
      const step = process.steps[i];
      if (!step) return '';

      return `
    <li class="process-path__step reveal process-path__step--${i + 1}">
      <div class="process-path__spine">
        <span class="process-path__node">${step.num}</span>
        <span class="process-path__stem" aria-hidden="true"></span>
        <div class="process-path__photo${member.photo ? '' : ' process-path__photo--fallback'}">
          ${
            member.photo
              ? `<img src="${resolveAsset(member.photo)}" alt="${member.name}" width="72" height="72" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.classList.add('process-path__photo--fallback')" />`
              : ''
          }
          <span class="process-path__initials" aria-hidden="true">${teamInitials(member.name)}</span>
        </div>
      </div>
      <div class="process-path__body">
        <p class="process-path__who">${member.name}</p>
        <p class="process-path__role">${member.role}</p>
        <h3 class="process-path__title">${step.title}</h3>
        <p class="process-path__text">${step.text}</p>
      </div>
    </li>`;
    })
    .join('');
}

function initTrustBar() {
  const el = document.getElementById('trust-bar');
  if (!el) return;
  el.innerHTML = guarantees.map((g) => `<span class="trust-bar__item">${g}</span>`).join('');
}

function initSectors() {
  const el = document.getElementById('sectors-strip');
  if (!el || !sectors.length) return;
  el.innerHTML = `
    <p class="sectors-strip__lead">On accompagne surtout</p>
    <ul class="sectors-strip__list">
      ${sectors.map((s) => `<li>${s}</li>`).join('')}
    </ul>`;
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

  const introEl = document.getElementById('pricing-intro');
  if (introEl && pricing.intro) {
    introEl.innerHTML = `
      <p class="pricing-intro__text">${pricing.intro.text}</p>
      <p class="pricing-intro__from">
        <span>${pricing.intro.fromLabel}</span>
        <strong>${pricing.intro.from} €</strong>
      </p>`;
  }

  const offersEl = document.getElementById('pricing-offers');
  if (offersEl && pricing.offers) {
    offersEl.innerHTML = pricing.offers
      .map(
        (o) => `
      <article class="price-card reveal${o.highlight ? ' price-card--highlight' : ''}">
        <div class="price-card__top">${o.badge ? `<span class="price-card__badge">${o.badge}</span>` : ''}</div>
        <h3>${o.label}</h3>
        ${o.subtitle ? `<p class="price-card__subtitle">${o.subtitle}</p>` : ''}
        <p class="price-card__range">${o.range}</p>
        ${o.rangeNote ? `<p class="price-card__devis">${o.rangeNote}</p>` : ''}
        ${o.description ? `<p class="price-card__desc">${o.description}</p>` : ''}
        <ul>${o.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </article>`,
      )
      .join('');
  }

  const detailsRoot = document.getElementById('pricing-details');
  if (detailsRoot && pricing.identity) {
    const id = pricing.identity;
    const a = pricing.vitrineAnchors;
    const hosting = pricing.hostingIntro;

    detailsRoot.innerHTML = `
      <details class="pricing-fold">
        <summary>
          Identité visuelle
          <span class="pricing-fold__hint">option · ${id.range}</span>
        </summary>
        <div class="pricing-fold__body" id="pricing-identity"></div>
      </details>
      <details class="pricing-fold">
        <summary>
          ${a.title}
          <span class="pricing-fold__hint">fourchettes indicatives</span>
        </summary>
        <div class="pricing-fold__body" id="pricing-anchors"></div>
      </details>
      <details class="pricing-fold">
        <summary>
          ${pricing.examples.title}
        </summary>
        <div class="pricing-fold__body" id="pricing-examples"></div>
      </details>
      <details class="pricing-fold">
        <summary>
          ${hosting.title}
        </summary>
        <div class="pricing-fold__body pricing-fold__body--hosting">
          <div id="pricing-hosting-intro"></div>
          <div class="grid grid--pricing-hosting" id="pricing-hosting"></div>
        </div>
      </details>
      <details class="pricing-fold">
        <summary>
          ${pricing.whyUs.title}
        </summary>
        <div class="pricing-fold__body" id="pricing-why"></div>
      </details>`;

    const identityEl = document.getElementById('pricing-identity');
    if (identityEl) {
      identityEl.innerHTML = `
        <p class="pricing-block__sub">${id.subtitle}</p>
        <p class="price-card__range pricing-block__range">${id.range}</p>
        <p class="price-card__devis">${id.rangeNote}</p>
        <p class="pricing-block__text">${id.description}</p>
        <ul class="pricing-identity-list">
          ${id.items.map((item) => `<li><span>${item.label}</span><em>${item.range}</em></li>`).join('')}
        </ul>
        <p class="pricing-block__meta">${id.contact}</p>`;
    }

    const anchorsEl = document.getElementById('pricing-anchors');
    if (anchorsEl && a) {
      anchorsEl.innerHTML = `
        ${a.hint ? `<p class="pricing-block__sub">${a.hint}</p>` : ''}
        <div class="pricing-anchors-wrap">
          <table class="pricing-anchors">
            <thead>
              <tr><th>Profil</th><th>Contenu type</th><th>Indication</th></tr>
            </thead>
            <tbody>
              ${a.rows.map((r) => `<tr><th scope="row">${r.profile}</th><td>${r.content}</td><td>${r.range}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }

    const examplesEl = document.getElementById('pricing-examples');
    if (examplesEl && pricing.examples) {
      examplesEl.innerHTML = `
        <ul class="pricing-examples-list">
          ${pricing.examples.items
            .map(
              (e) => `
            <li>
              <strong>${e.name}</strong>
              <span>${e.type}</span>
              <em>${e.range}</em>
            </li>`,
            )
            .join('')}
        </ul>`;
    }

    const whyEl = document.getElementById('pricing-why');
    if (whyEl && pricing.whyUs) {
      whyEl.innerHTML = `
        <div class="pricing-pillars__grid">
          ${pricing.whyUs.points
            .map(
              (p) => `
            <article class="pricing-pillar">
              <h4>${p.title}</h4>
              <p>${p.text}</p>
            </article>`,
            )
            .join('')}
        </div>`;
    }

    const hostingIntroEl = document.getElementById('pricing-hosting-intro');
    if (hostingIntroEl && hosting) {
      hostingIntroEl.innerHTML = `<p class="pricing-block__text">${hosting.text}</p>`;
    }

    const hostingEl = document.getElementById('pricing-hosting');
    if (hostingEl && pricing.hosting) {
      hostingEl.innerHTML = pricing.hosting
        .map(
          (h) => `
        <article class="price-card price-card--hosting${h.highlight ? ' price-card--highlight' : ''}">
          <h3>${h.label}</h3>
          <p class="price-card__range">${h.price}</p>
          ${h.priceNote ? `<p class="price-card__devis">${h.priceNote}</p>` : ''}
          <p class="price-card__desc">${h.forWho}</p>
          <ul>${h.features.map((f) => `<li>${f}</li>`).join('')}</ul>
          ${h.note ? `<p class="price-card__note">${h.note}</p>` : ''}
        </article>`,
        )
        .join('');
    }
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
initAnalytics();
initContact();
initContactForm();
initStickyCta();
initHero();
initNav();
initMarquee();
initTrustBar();
initSectors();
initServices();
initServiceSpotlight();
initProjects();
initTestimonials();
initCrew();
initComparison();
initPricing();
initPromo();
initFaq();
initFooter();
initScrollReveal();
initHeader();
initBubbles();
