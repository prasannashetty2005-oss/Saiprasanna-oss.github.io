/**
 * Sai Prasanna G - Portfolio JS Controls
 * Controls typing effect, stats animations, scroll reveal, mobile menu, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking nav link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 2. Sticky Header & Back to Top Toggle
  // ==========================================
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Header class scroll toggle
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 3. Typing Effect (Hero Section)
  // ==========================================
  const typingTarget = document.getElementById('typing-text');
  const titles = [
    'BCA Student',
    'Cyber Security Enthusiast',
    'Full Stack Developer'
  ];
  
  if (typingTarget) {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        // Deleting characters
        typingTarget.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50; // Faster delete speed
      } else {
        // Adding characters
        typingTarget.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 150; // Normal typing speed
      }

      // Handle transition states
      if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at completion
        typeDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeDelay = 500; // Pause before starting next title
      }

      setTimeout(type, typeDelay);
    }

    // Start typing loop
    setTimeout(type, 1000);
  }

  // ==========================================
  // 4. Scroll Reveal Animations (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we don't need to observe it again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 5. Active Link Highlight on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200; // Offset for accuracy

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 6. Stats Counter Animation
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-num');
  
  const startCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const duration = 2000; // 2 seconds animation
    const stepTime = 20;
    const steps = duration / stepTime;
    let current = 0;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        // Set exact final value
        if (isDecimal) {
          el.textContent = target.toFixed(2);
        } else {
          el.textContent = Math.floor(target) + (el.getAttribute('data-suffix') || '');
        }
      } else {
        if (isDecimal) {
          el.textContent = current.toFixed(2);
        } else {
          el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
        }
      }
    }, stepTime);
  };

  // Observe stats container to trigger counting
  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => startCounter(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 7. Form Validator & Interactive Feedback
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast glass-card`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation';
    
    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <div class="toast-content">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();
      const msgVal = document.getElementById('form-message').value.trim();
      
      if (!nameVal || !emailVal || !msgVal) {
        showToast('Please fill out all fields before sending.', 'error');
        return;
      }
      
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecting...`;
      
      // Format the WhatsApp message text
      const messageText = `Hello Sai Prasanna G,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${msgVal}`;
      const whatsappUrl = `https://wa.me/917483231901?text=${encodeURIComponent(messageText)}`;
      
      setTimeout(() => {
        showToast('Redirecting you to WhatsApp to send message...');
        window.open(whatsappUrl, '_blank');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 800);
    });
  }

});
