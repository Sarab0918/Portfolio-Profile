// Mobile nav toggle
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');

function setExpanded(isExpanded) {
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', String(isExpanded));
}

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isHidden = mobileMenu.hasAttribute('hidden');
    if (isHidden) {
      mobileMenu.removeAttribute('hidden');
      setExpanded(true);
    } else {
      mobileMenu.setAttribute('hidden', '');
      setExpanded(false);
    }
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.setAttribute('hidden', '');
      setExpanded(false);
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (client-side demo)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function setFieldError(input, msg) {
  const errEl = document.querySelector(`[data-error-for="${input.id}"]`);
  if (!errEl) return;
  errEl.textContent = msg || '';
}

function validate() {
  if (!form) return true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let ok = true;

  // Name
  if (!name.value || name.value.trim().length < 2) {
    setFieldError(name, 'Please enter at least 2 characters.');
    ok = false;
  } else {
    setFieldError(name, '');
  }

  // Email
  const emailVal = email.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!emailVal || !emailOk) {
    setFieldError(email, 'Please enter a valid email address.');
    ok = false;
  } else {
    setFieldError(email, '');
  }

  // Message
  if (!message.value || message.value.trim().length < 10) {
    setFieldError(message, 'Please enter at least 10 characters.');
    ok = false;
  } else {
    setFieldError(message, '');
  }

  return ok;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';

    const ok = validate();
    if (!ok) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    // Demo: store message locally
    const payload = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim(),
      at: new Date().toISOString(),
    };

    const key = 'portfolio_contact_messages';
    try {
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      // If storage fails, still show success
    }

    status.textContent = 'Message saved locally. Replace this with your backend/email integration.';
    form.reset();
  });
}

