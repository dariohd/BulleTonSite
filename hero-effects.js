import { projects } from './config.js';
import { fitHeroStack, resolveAsset } from './mini-browser.js';

function domainFrom(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function cardMedia(project, iframe = false) {
  if (iframe) {
    return `<iframe src="${project.url}" title="${project.name}" loading="eager" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>`;
  }
  if (project.image) {
    return `<img src="${resolveAsset(project.image)}" alt="${project.name}" />`;
  }
  return `<iframe src="${project.url}" title="${project.name}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>`;
}

function cardHtml(project, role, iframeFront = false) {
  return `
    <div class="hero-card hero-card--${role}" data-project-id="${project.id ?? project.name}">
      <div class="hero-card__chrome">
        <i></i><i></i><i></i>
        <span class="hero-card__url">${domainFrom(project.url)}</span>
      </div>
      <div class="hero-card__viewport">${cardMedia(project, iframeFront)}</div>
    </div>`;
}

function initHeroStack() {
  const stack = document.getElementById('hero-stack');
  const label = document.getElementById('hero-stage-label');
  if (!stack || projects.length === 0) return;

  let frontIdx = 0;

  const render = (animate = false) => {
    const n = projects.length;
    const backI = (frontIdx + n - 2) % n;
    const midI = (frontIdx + n - 1) % n;
    const frontI = frontIdx;
    const pFront = projects[frontI];

    if (animate) {
      const front = stack.querySelector('.hero-card--front');
      front?.classList.add('is-switching');
      setTimeout(() => {
        stack.innerHTML =
          cardHtml(projects[backI], 'back') +
          cardHtml(projects[midI], 'mid') +
          cardHtml(pFront, 'front', true);
        if (label) label.textContent = pFront.name;
        fitHeroStack(stack);
      }, 280);
    } else {
      stack.innerHTML =
        cardHtml(projects[backI], 'back') +
        cardHtml(projects[midI], 'mid') +
        cardHtml(pFront, 'front', true);
      if (label) label.textContent = pFront.name;
    }
    fitHeroStack(stack);
  };

  render();

  window.addEventListener('resize', () => fitHeroStack(stack));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    setInterval(() => {
      frontIdx = (frontIdx + 1) % projects.length;
      render(true);
    }, 5000);
  }
}

export function initStatCounters() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function initIntro() {
  document.body.classList.add('is-loaded');
  setTimeout(initStatCounters, 400);
}

initHeroStack();
initIntro();
