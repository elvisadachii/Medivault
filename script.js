document.addEventListener('DOMContentLoaded', () => {
  // Smooth navbar scroll effect
  let scrollTimeout;
  const nav = document.querySelector('.navbar-mv');
  if (nav) {
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        nav.classList.toggle('is-scrolled', window.scrollY > 10);
      }, 16);
    }, { passive: true });
  }

  // Smooth filtering with animations
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

    // Keyboard navigation for filter chips
    filterBar.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) return;
      e.preventDefault();
      const buttons = Array.from(filterBar.querySelectorAll('.filter-chip'));
      const current = filterBar.querySelector('.filter-chip:focus');
      let index = buttons.indexOf(current);
      
      if (e.key === 'ArrowLeft') index = (index - 1 + buttons.length) % buttons.length;
      else if (e.key === 'ArrowRight') index = (index + 1) % buttons.length;
      else if (e.key === 'Enter' || e.key === ' ') {
        current?.click();
        return;
      }
      buttons[index]?.focus();
    });
  }

  function applyFilter(cat) {
    const items = document.querySelectorAll('.product-item');
    items.forEach((item, index) => {
      const shouldShow = cat === 'all' || item.dataset.cat === cat;
      const isHidden = item.style.display === 'none';
      
      if (shouldShow && isHidden) {
        item.style.display = '';
        setTimeout(() => item.style.opacity = '1', 10);
      } else if (!shouldShow && !isHidden) {
        item.style.opacity = '0';
        setTimeout(() => item.style.display = 'none', 300);
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.querySelectorAll('[required]').forEach(field => {
          const isValid = field.validity.valid;
          field.classList.remove('is-invalid', 'is-valid');
          if (!isValid) {
            field.classList.add('is-invalid');
            field.style.animation = 'none';
            setTimeout(() => field.style.animation = '', 10);
          }
        });
        return;
      }
      const fb = document.getElementById('formFeedback');
      fb.style.color = 'var(--sage)';
      fb.style.animation = 'fadeInUp .5s ease';
      fb.textContent = '✓ Message sent! We\'ll get back to you within a few hours.';
      contactForm.reset();
      contactForm.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid'));
      setTimeout(() => {
        fb.style.animation = '';
        fb.textContent = '';
      }, 3000);
    });

    contactForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        if (field.validity.valid) {
          field.classList.add('is-valid');
        }
      });
      field.addEventListener('blur', () => {
        if (!field.validity.valid) field.classList.add('is-invalid');
      });
    });
  }

  // Newsletter forms - smooth validation
  document.querySelectorAll('#newsletterForm').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('[type="email"]');
      const fb = form.closest('div, footer').querySelector('[data-newsletter-feedback]');
      if (!input.validity.valid) {
        input.classList.add('is-invalid');
        input.style.animation = 'none';
        setTimeout(() => input.style.animation = '', 10);
        return;
      }
      input.classList.remove('is-invalid');
      if (fb) { 
        fb.style.color = 'var(--sage-mid)';
        fb.style.animation = 'fadeInUp .4s ease';
        fb.textContent = '✓ You\'re in! Talk soon.';
        setTimeout(() => {
          fb.style.animation = '';
          fb.textContent = '';
        }, 2500);
      }
      form.reset();
    });
  });

  // Smooth file upload feedback
  const rxUpload = document.getElementById('rxUpload');
  if (rxUpload) {
    rxUpload.addEventListener('change', () => {
      const file = rxUpload.files[0];
      const fb = document.getElementById('uploadFeedback');
      if (file) {
        fb.style.animation = 'none';
        fb.textContent = '✓ ' + file.name + ' attached';
        setTimeout(() => fb.style.animation = 'fadeInUp .3s ease', 10);
      }
    });
  }

  // Order form with smooth validation
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const required = orderForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        const ok = field.validity.valid;
        field.classList.remove('is-invalid', 'is-valid');
        field.classList.add(ok ? 'is-valid' : 'is-invalid');
        if (!ok) {
          valid = false;
          field.style.animation = 'none';
          setTimeout(() => field.style.animation = '', 10);
        }
      });
      if (!valid) return;
      
      const fb = document.getElementById('orderFeedback');
      fb.style.color = 'var(--sage)';
      fb.style.animation = 'fadeInUp .5s ease';
      fb.innerHTML = '✓ Order received! A pharmacist will confirm your order via WhatsApp shortly.';
      
      orderForm.reset();
      orderForm.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid'));
      document.getElementById('uploadFeedback').textContent = '';
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);

      setTimeout(() => {
        fb.style.animation = '';
        fb.innerHTML = '';
      }, 4000);
    });

    orderForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        if (field.validity.valid) field.classList.add('is-valid');
      });
      field.addEventListener('blur', () => {
        if (!field.validity.valid && field.value) {
          field.classList.add('is-invalid');
        }
      });
    });
  }

  // Add styles for smooth animations if not already in CSS
  const animStyle = document.createElement('style');
  animStyle.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .product-item {
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(animStyle);
});