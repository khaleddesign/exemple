document.addEventListener('DOMContentLoaded', () => {
  
  // Header Sticky
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Mobile Menu
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      burger.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16M4 6h16M4 18h16"/></svg>';
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      burger.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>';
      document.body.style.overflow = 'hidden';
    }
  }

  burger.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(mobileMenu.classList.contains('open')) toggleMenu();
    });
  });

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in'));
  }

  // Active Menu Link Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    
    sections.forEach(sec => navObserver.observe(sec));
  }

  // Avant-Apres Slider
  const slider = document.querySelector('.slider-wrap');
  if (slider) {
    const beforeWrap = slider.querySelector('.slider-before');
    const handle = slider.querySelector('.slider-handle');
    const btn = slider.querySelector('.handle-btn');
    let isDragging = false;

    function move(x) {
      const rect = slider.getBoundingClientRect();
      const pos = Math.max(0, Math.min(x - rect.left, rect.width));
      const percent = (pos / rect.width) * 100;
      beforeWrap.style.width = percent + '%';
      handle.style.left = percent + '%';
      btn.setAttribute('aria-valuenow', Math.round(percent));
    }

    slider.addEventListener('mousedown', e => { isDragging = true; move(e.clientX); });
    slider.addEventListener('touchstart', e => { isDragging = true; move(e.touches[0].clientX); });
    window.addEventListener('mousemove', e => { if(isDragging) move(e.clientX); });
    window.addEventListener('touchmove', e => { if(isDragging) move(e.touches[0].clientX); });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });
    
    btn.addEventListener('keydown', e => {
      let current = parseFloat(beforeWrap.style.width) || 50;
      if (e.key === 'ArrowLeft') current = Math.max(0, current - 5);
      if (e.key === 'ArrowRight') current = Math.min(100, current + 5);
      beforeWrap.style.width = current + '%';
      handle.style.left = current + '%';
      btn.setAttribute('aria-valuenow', Math.round(current));
    });
  }

  // Contact Form Validation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        const group = input.closest('.input-group') || input.parentElement;
        if (!input.value.trim() || (input.type === 'checkbox' && !input.checked)) {
          isValid = false;
          group.classList.add('invalid');
        } else {
          group.classList.remove('invalid');
        }
      });
      
      if (isValid) {
        const btnSubmit = form.querySelector('.btn-primary');
        const status = form.querySelector('.form-status');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = 'Envoi en cours...';
        
        // Simuler un envoi Fetch
        setTimeout(() => {
          form.reset();
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = `Demande envoyée <span class="icon-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"/></svg></span>`;
          status.textContent = "Votre demande a bien été envoyée. CRB vous rappellera sous [DÉLAI].";
          status.classList.add('success');
        }, 1200);
      }
    });

    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.input-group') || input.parentElement;
        group.classList.remove('invalid');
      });
    });
  }
});
