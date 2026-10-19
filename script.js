/* ============================================================
   ASTRONOMAD — script.js
   Assignment 4: JavaScript Fundamentals
   Author: Smail Balaussa
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     TASK 1: FORM VALIDATION
     ============================================================ */
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    const fields = {
      name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
      email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
      password: { input: document.getElementById('password'), error: document.getElementById('passwordError') },
      confirmPassword: { input: document.getElementById('confirmPassword'), error: document.getElementById('confirmError') }
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, message) {
      if (field.error) field.error.textContent = message;
      if (field.input) field.input.classList.toggle('invalid', Boolean(message));
    }

    function validateName() {
      if (!fields.name.input) return true;
      const v = fields.name.input.value.trim();
      if (!v) { setError(fields.name, 'Full name is required.'); return false; }
      if (v.length < 2) { setError(fields.name, 'Name must be at least 2 characters.'); return false; }
      setError(fields.name, '');
      return true;
    }

    function validateEmail() {
      if (!fields.email.input) return true;
      const v = fields.email.input.value.trim();
      if (!v) { setError(fields.email, 'Email is required.'); return false; }
      if (!emailRegex.test(v)) { setError(fields.email, 'Please enter a valid email address.'); return false; }
      setError(fields.email, '');
      return true;
    }

    function validatePassword() {
      if (!fields.password.input) return true;
      const v = fields.password.input.value;
      if (!v) { setError(fields.password, 'Password is required.'); return false; }
      if (v.length < 6) { setError(fields.password, 'Password must be at least 6 characters.'); return false; }
      setError(fields.password, '');
      return true;
    }

    function validateConfirm() {
      if (!fields.confirmPassword.input) return true;
      const v = fields.confirmPassword.input.value;
      if (!v) { setError(fields.confirmPassword, 'Please confirm your password.'); return false; }
      if (v !== fields.password.input.value) { setError(fields.confirmPassword, 'Passwords do not match.'); return false; }
      setError(fields.confirmPassword, '');
      return true;
    }

    // Real-time validation on blur
    if (fields.name.input) fields.name.input.addEventListener('blur', validateName);
    if (fields.email.input) fields.email.input.addEventListener('blur', validateEmail);
    if (fields.password.input) fields.password.input.addEventListener('blur', validatePassword);
    if (fields.confirmPassword.input) fields.confirmPassword.input.addEventListener('blur', validateConfirm);

    // Re-check confirm when password changes
    if (fields.password.input) {
      fields.password.input.addEventListener('input', function () {
        if (fields.confirmPassword.input && fields.confirmPassword.input.value) {
          validateConfirm();
        }
      });
    }

    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const valid = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirm()
      ].every(Boolean);

      const successEl = document.getElementById('formSuccess');

      if (valid) {
        if (successEl) {
          successEl.textContent = '✅ Message sent successfully! I will reply soon.';
          successEl.style.color = '#4ade80';
        }
        registerForm.reset();
        Object.values(fields).forEach(f => {
          if (f.input) f.input.classList.remove('invalid');
        });
      } else {
        if (successEl) successEl.textContent = '';
      }
    });
  }

  /* ============================================================
     TASK 2: ACCORDION
     ============================================================ */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Close all currently open items
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.classList.remove('open');
        c.style.maxHeight = null;
      });
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
      });

      // Open clicked item if it was previously closed
      if (!isOpen) {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        this.classList.add('active');
      }
    });
  });

  /* ============================================================
     TASK 3: POPUP FORM
     ============================================================ */
  const popupOverlay = document.getElementById('popupOverlay');
  const openPopupBtn = document.getElementById('openPopup');
  const openPopupBtn2 = document.getElementById('openPopup2');
  const closePopupBtn = document.getElementById('closePopup');
  const subscribeForm = document.getElementById('subscribeForm');
  const subMessage = document.getElementById('subMessage');

  if (popupOverlay) {
    function openPopup(e) {
      if (e) e.preventDefault();
      popupOverlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closePopup() {
      popupOverlay.classList.remove('show');
      document.body.style.overflow = '';
      if (subMessage) subMessage.textContent = '';
    }

    if (openPopupBtn) openPopupBtn.addEventListener('click', openPopup);
    if (openPopupBtn2) openPopupBtn2.addEventListener('click', openPopup);
    if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);

    // Close when clicking outside the popup box
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) closePopup();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popupOverlay.classList.contains('show')) {
        closePopup();
      }
    });

    // Handle popup form submission
    if (subscribeForm) {
      const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('subEmail');
        
        if (emailInput) {
          const email = emailInput.value.trim();
          
          if (!emailRegex2.test(email)) {
            if (subMessage) {
              subMessage.textContent = '❌ Please enter a valid email.';
              subMessage.style.color = '#f87171';
            }
            return;
          }

          if (subMessage) {
            subMessage.textContent = '✅ Thank you for subscribing!';
            subMessage.style.color = '#4ade80';
          }
          subscribeForm.reset();
          
          // Automatically close popup after 2 seconds
          setTimeout(closePopup, 2000);
        }
      });
    }
  }

  /* ============================================================
     TASK 4: CHANGE BACKGROUND COLOR
     ============================================================ */
  const colorBtn = document.getElementById('colorBtn');

  if (colorBtn) {
    const colors = [
      { name: 'Default (Space)', value: '#050510' },
      { name: 'Deep Purple', value: '#1e1b4b' },
      { name: 'Cosmic Blue', value: '#0c1445' },
      { name: 'Nebula Pink', value: '#2d0a2e' },
      { name: 'Galaxy Green', value: '#0a2e1e' },
      { name: 'Solar Orange', value: '#2e1a0a' },
      { name: 'Dark Space', value: '#000000' }
    ];
    let colorIndex = 0;

    colorBtn.addEventListener('click', function () {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex].value;
      colorBtn.textContent = '🎨 ' + colors[colorIndex].name;
    });
  }

  /* ============================================================
     TASK 5: CURRENT DATE AND TIME
     ============================================================ */
  const dateTimeEl = document.getElementById('dateTime');

  if (dateTimeEl) {
    function updateDateTime() {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      dateTimeEl.textContent = now.toLocaleString('en-US', options);
    }
    
    updateDateTime(); // Initial call
    setInterval(updateDateTime, 1000); // Update every second
  }

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

});