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
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop — Medivault</title>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="page-shell">

    <nav class="navbar navbar-expand-lg navbar-mv sticky-top">
      <div class="container">
        <a class="navbar-brand" href="index.html"><span class="brand-mark">M</span>Medi<em>vault</em></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mvNav" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mvNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-1">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
            <li class="nav-item"><a class="nav-link active" href="products.html">Shop</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
            <li class="nav-item"><a class="nav-link" href="order.html">Order</a></li>
            <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a class="btn-capsule btn-sm" href="order.html">
                <i class="bi bi-cart3"></i> Cart <span class="cart-count" id="navCartCount">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main id="main">
      <section class="section-warm" style="padding:3.5rem 0 2.5rem">
        <div class="container">
          <span class="rx-tag mb-3"><i class="bi bi-bag-heart"></i> Our products</span>
          <h1 class="mt-3 mb-2">Shop <em>genuine</em> health essentials</h1>
          <p class="text-muted-soft" style="max-width:36rem">Every product is PPB-approved and pharmacist-verified. Click any product to see full details.</p>
        </div>
      </section>

      <section class="section-cream">
        <div class="container">
          <div class="d-flex flex-wrap gap-2 mb-5" id="filterBar">
            <button class="filter-chip active" data-filter="all">All</button>
            <button class="filter-chip" data-filter="pain-relief">Pain Relief</button>
            <button class="filter-chip" data-filter="vitamins">Vitamins</button>
            <button class="filter-chip" data-filter="skincare">Skincare</button>
            <button class="filter-chip" data-filter="devices">Devices</button>
          </div>
          <div class="row g-4" id="productGrid"></div>
        </div>
      </section>
    </main>

    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content" style="border-radius:var(--r-lg);border:1px solid var(--sand)">
          <div class="modal-header" style="border-bottom:1px solid var(--sand);padding:1.25rem 1.5rem">
            <h5 class="modal-title" id="productModalLabel" style="font-family:var(--fd);font-size:1.2rem"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="padding:1.5rem" id="productModalBody"></div>
          <div class="modal-footer" style="border-top:1px solid var(--sand);padding:1rem 1.5rem;gap:.75rem">
            <div class="d-flex align-items-center gap-2 me-auto">
              <button class="qty-btn" id="modalQtyMinus">−</button>
              <span id="modalQty" style="font-weight:700;min-width:24px;text-align:center">1</span>
              <button class="qty-btn" id="modalQtyPlus">+</button>
            </div>
            <button class="btn-capsule" id="modalAddToCart"><i class="bi bi-cart-plus"></i> Add to Cart</button>
          </div>
        </div>
      </div>
    </div>

    <footer class="site-footer">
      <div class="container">
        <div class="row g-4 pb-4">
          <div class="col-lg-4">
            <a class="navbar-brand text-white mb-3 d-flex align-items-center gap-2" href="index.html"><span class="brand-mark">M</span>Medi<em style="color:var(--sage-mid)">vault</em></a>
            <p class="small" style="max-width:22rem">Trusted online pharmacy delivering genuine, PPB-licensed health products across Nairobi.</p>
          </div>
          <div class="col-6 col-lg-2">
            <h6>Explore</h6>
            <div class="d-flex flex-column gap-2 small">
              <a href="index.html">Home</a><a href="about.html">About</a><a href="products.html">Shop</a><a href="contact.html">Contact</a>
            </div>
          </div>
          <div class="col-6 col-lg-2">
            <h6>Categories</h6>
            <div class="d-flex flex-column gap-2 small">
              <a href="products.html?cat=pain-relief">Pain Relief</a><a href="products.html?cat=vitamins">Vitamins</a><a href="products.html?cat=skincare">Skincare</a><a href="products.html?cat=devices">Devices</a>
            </div>
          </div>
          <div class="col-lg-4">
            <h6>Stay in the loop</h6>
            <p class="small mb-3">Health tips and restock alerts, once or twice a month.</p>
            <form id="newsletterForm" class="d-flex gap-2" novalidate>
              <label for="newsletterEmail" class="visually-hidden">Email</label>
              <input type="email" id="newsletterEmail" class="form-control form-control-sm" placeholder="you@example.com" style="background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.2)" required>
              <button type="submit" class="btn-capsule btn-sm flex-shrink-0">Join</button>
            </form>
            <div class="small mt-2" data-newsletter-feedback></div>
          </div>
        </div>
        <div class="footer-bottom d-flex flex-wrap justify-content-between gap-2">
          <span>© 2026 Medivault. All rights reserved.</span>
          <span>PPB No. 2021/00456 · Westlands, Nairobi</span>
        </div>
      </div>
    </footer>
  </div>

</body>
</html>