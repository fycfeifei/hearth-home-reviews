/* Hearth & Home — front-end interactions
   - Newsletter form (client-side guard, no third-party tracker)
   - Last-updated date footer
   - Smooth in-page anchor focus
   - Lazy-load attribute polyfill check
*/
(function () {
  'use strict';

  // 1. Newsletter form: prevent default, show inline confirmation only
  //    Real submission needs a server endpoint (Formspree, ConvertKit, etc.)
  const form = document.querySelector('[data-newsletter]');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = /** @type {HTMLInputElement} */ (
        form.querySelector('input[type="email"]')
      );
      const status = form.querySelector('[data-status]');
      if (!email || !email.value) return;
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      if (!valid) {
        if (status) status.textContent = 'Please enter a valid email address.';
        return;
      }
      if (status) {
        status.textContent = 'Thanks! Check your inbox to confirm your subscription.';
      }
      form.reset();
    });
  }

  // 2. Contact form: same pattern — wire to your backend later
  const contact = document.querySelector('[data-contact]');
  if (contact) {
    contact.addEventListener('submit', function (event) {
      event.preventDefault();
      const status = contact.querySelector('[data-status]');
      if (status) {
        status.textContent =
          "Thanks for reaching out — we usually reply within 2 business days.";
      }
      contact.reset();
    });
  }

  // 3. Footer "last updated"
  const stamp = document.querySelector('[data-last-updated]');
  if (stamp) {
    const now = new Date();
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    stamp.textContent = now.toLocaleDateString('en-US', opts);
  }

  // 4. Smooth focus to anchors and skip link behavior
  document.addEventListener('click', function (event) {
    const target = /** @type {HTMLElement} */ (event.target);
    if (!target) return;
    const link = target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    /** @type {HTMLElement} */ (el).setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });

  // 5. Native lazy-loading is widely supported — log warning only if missing
  if (!('loading' in HTMLImageElement.prototype)) {
    document.querySelectorAll('img').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
    });
  }
})();
