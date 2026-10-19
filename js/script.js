document.addEventListener('DOMContentLoaded', function () {

  /* TASK 1: FORM VALIDATION */
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    const fields = {
      name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
      email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
      password: { input: document.getElementById('password'), error: document.getElementById('passwordError') },
      confirmPassword: { input: document.getElementById('confirmPassword'), error: document.getElementById('confirmError') }
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function setError(f, m) { if (f.error) f.error.textContent = m; if (f.input) f.input.classList.toggle('invalid', Boolean(m)); }
    
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      if (!fields.name.input.value.trim() || fields.name.input.value.trim().length < 2) { setError(fields.name, 'Name must be at least 2 characters.'); valid = false; } else setError(fields.name, '');
      if (!emailRegex.test(fields.email.input.value.trim())) { setError(fields.email, 'Valid email is required.'); valid = false; } else setError(fields.email, '');
      if (fields.password.input.value.length < 6) { setError(fields.password, 'Password must be at least 6 characters.'); valid = false; } else setError(fields.password, '');
      if (fields.confirmPassword.input.value !== fields.password.input.value) { setError(fields.confirmPassword, 'Passwords do not match.'); valid = false; } else setError(fields.confirmPassword, '');

      if (valid) { document.getElementById('formSuccess').textContent = '✅ Message sent successfully!'; registerForm.reset(); }
    });
  }

  /* TASK 2: ACCORDION */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isOpen = content.classList.contains('open');
      document.querySelectorAll('.accordion-content').forEach(c => { c.classList.remove('open'); c.style.maxHeight = null; });
      document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
      if (!isOpen) { content.classList.add('open'); content.style.maxHeight = content.scrollHeight + 'px'; this.classList.add('active'); }
    });
  });

  /* TASK 3: POPUP FORM */
  const popupOverlay = document.getElementById('popupOverlay');
  const openPopupBtn = document.getElementById('openPopup');
  const openPopupBtn2 = document.getElementById('openPopup2');
  const closePopupBtn = document.getElementById('closePopup');
  if (popupOverlay) {
    function openPopup(e) { if (e) e.preventDefault(); popupOverlay.classList.add('show'); }
    function closePopup() { popupOverlay.classList.remove('show'); }
    if (openPopupBtn) openPopupBtn.addEventListener('click', openPopup);
    if (openPopupBtn2) openPopupBtn2.addEventListener('click', openPopup);
    if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function (e) { if (e.target === popupOverlay) closePopup(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && popupOverlay.classList.contains('show')) closePopup(); });
    
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('subEmail');
        const subMessage = document.getElementById('subMessage');
        if (emailInput) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            if (subMessage) { subMessage.textContent = '❌ Please enter a valid email.'; subMessage.style.color = '#f87171'; }
            return;
          }
          if (subMessage) { subMessage.textContent = '✅ Thank you for subscribing!'; subMessage.style.color = '#4ade80'; }
          subscribeForm.reset();
          setTimeout(closePopup, 2000);
        }
      });
    }
  }

  /* TASK 4: BACKGROUND COLOR */
  const colorBtn = document.getElementById('colorBtn');
  if (colorBtn) {
    const colors = [
      { name: 'Default', value: '#050510' }, { name: 'Purple', value: '#1e1b4b' },
      { name: 'Blue', value: '#0c1445' }, { name: 'Pink', value: '#2d0a2e' },
      { name: 'Green', value: '#0a2e1e' }, { name: 'Orange', value: '#2e1a0a' }, { name: 'Black', value: '#000000' }
    ];
    let colorIndex = 0;
    colorBtn.addEventListener('click', function () {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex].value;
      colorBtn.textContent = '🎨 ' + colors[colorIndex].name;
    });
  }

  /* TASK 5: DATE AND TIME */
  const dateTimeEl = document.getElementById('dateTime');
  if (dateTimeEl) {
    function updateDateTime() {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      dateTimeEl.textContent = now.toLocaleString('en-US', options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }

  /* MOBILE NAV */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
  }
});