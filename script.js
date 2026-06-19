document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar-mv');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  const filterBar = document.getElementById('filterBar');
  if (filterBar) {
    const param = new URLSearchParams(location.search).get('cat');
    if (param) {
      filterBar.querySelectorAll('.filter-chip').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === param);
      });
      applyFilter(param);
    }

    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  }

  function applyFilter(cat) {
    document.querySelectorAll('.product-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.querySelectorAll('[required]').forEach(field => {
          field.classList.toggle('is-invalid', !field.validity.valid);
          field.classList.toggle('is-valid', field.validity.valid);
        });
        return;
      }
      const fb = document.getElementById('formFeedback');
      fb.style.color = 'var(--sage)';
      fb.textContent = '✓ Message sent! We\'ll get back to you within a few hours.';
      contactForm.reset();
      contactForm.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid'));
    });

    contactForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        if (field.validity.valid) field.classList.add('is-valid');
      });
    });
  }

  document.querySelectorAll('#newsletterForm').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('[type="email"]');
      const fb = form.closest('div, footer').querySelector('[data-newsletter-feedback]');
      if (!input.validity.valid) {
        input.classList.add('is-invalid');
        return;
      }
      input.classList.remove('is-invalid');
      if (fb) { fb.style.color = 'var(--sage-mid)'; fb.textContent = '✓ You\'re in! Talk soon.'; }
      form.reset();
    });
  });

});

  const rxUpload = document.getElementById('rxUpload');
  if (rxUpload) {
    rxUpload.addEventListener('change', () => {
      const file = rxUpload.files[0];
      const fb = document.getElementById('uploadFeedback');
      if (file) fb.textContent = '✓ ' + file.name + ' attached';
    });
  }

  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const required = orderForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        const ok = field.validity.valid;
        field.classList.toggle('is-invalid', !ok);
        field.classList.toggle('is-valid', ok);
        if (!ok) valid = false;
      });
      if (!valid) return;
      const fb = document.getElementById('orderFeedback');
      fb.style.color = 'var(--sage)';
      fb.innerHTML = '✓ Order received! A pharmacist will confirm your order via WhatsApp shortly.';
      orderForm.reset();
      orderForm.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid'));
      document.getElementById('uploadFeedback').textContent = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    orderForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        if (field.validity.valid) field.classList.add('is-valid');
      });
    });
  }