 
    //  1. DARK MODE / LIGHT MODE
    
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;


  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }


  
    //  2. NAVBAR DYNAMIQUE (scroll + hamburger)
    
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }


 
    //  3. ANIMATIONS AU SCROLL
     
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  faders.forEach(el => observer.observe(el));


  
    //  4. COMPTEURS ANIMÉS 
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500; 
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  };

  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));


  
    //  5. COMPTE À REBOURS (hero index.html)
    
  const countdownEl = document.getElementById('countdown');

  if (countdownEl) {
   
    const eventDate = new Date('2026-10-15T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        countdownEl.innerHTML = '<p>L\'événement a commencé !</p>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


 
    //  6. ONGLETS PROGRAMME (programme.html)
     
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.target);
      target.classList.add('active');
    });
  });


  
    //  7. FILTRAGE DYNAMIQUE INTERVENANTS
     
     
  const filterBtns = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      speakerCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? 'block' : 'none';
      });
    });
  });


 
  const form = document.getElementById('registration-form');
  
  //  8. VALIDATION FORMULAIRE (contact.html)
   
  if (form) {
    
    const validateField = (field, isValid, errorId, message) => {
      const errorEl = document.getElementById(errorId);
      if (!isValid) {
        field.classList.add('error');
        field.classList.remove('valid');
        errorEl.textContent = message;
      } else {
        field.classList.remove('error');
        field.classList.add('valid');
        errorEl.textContent = '';
      }
      return isValid;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullname = document.getElementById('fullname');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const participation = document.getElementById('participation');
      const country = document.getElementById('country');
      const message = document.getElementById('message');

      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      const phoneDigits = phone.value.replace(/\D/g, '');

      const isFullnameValid = validateField(
        fullname, fullname.value.trim().length > 0,
        'fullname-error', 'Le nom complet est requis.'
      );

      const isEmailValid = validateField(
        email, emailRegex.test(email.value),
        'email-error', 'Adresse email invalide.'
      );

      const isPhoneValid = validateField(
        phone, phoneDigits.length >= 8,
        'phone-error', 'Le téléphone doit contenir au moins 8 chiffres.'
      );

      const isParticipationValid = validateField(
        participation, participation.value !== '',
        'participation-error', 'Veuillez choisir un type de participation.'
      );

      const isCountryValid = validateField(
        country, country.value !== '',
        'country-error', 'Veuillez choisir un pays.'
      );

      const isMessageValid = validateField(
        message, message.value.trim().length >= 20,
        'message-error', 'Le message doit contenir au moins 20 caractères.'
      );

      const allValid = isFullnameValid && isEmailValid && isPhoneValid &&
                        isParticipationValid && isCountryValid && isMessageValid;

      const successEl = document.getElementById('success-message');

      if (allValid) {
        successEl.classList.add('show');
        form.reset();
        
        form.querySelectorAll('.valid').forEach(f => f.classList.remove('valid'));

        
        setTimeout(() => successEl.classList.remove('show'), 4000);
      } else {
        successEl.classList.remove('show');
      }
    });
  }


 
    //  9. BOUTON RETOUR EN HAUT
    
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  
    //  10. ANNÉE DYNAMIQUE DANS LE FOOTER
     
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

