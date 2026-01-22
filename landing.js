/* ==========================================================================
   MEPFacilities Design Directory - Landing Page JavaScript
   ========================================================================== */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initLandingPage();
});

function initLandingPage() {
  // Initialize components
  initContactForm();
  initSmoothScroll();
  initNavHighlight();
  initMobileMenu();
  
  // Add page-load animation class removal
  document.body.classList.add('loaded');
}

// ============================================================================
// Contact Form
// ============================================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', handleFormSubmit);
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;
  
  // Validate all fields
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
      </svg>
      Enviando...
    `;
    
    // Simulate API call
    setTimeout(() => {
      // Hide form, show success
      form.style.display = 'none';
      
      const successMessage = document.querySelector('.form-success');
      if (successMessage) {
        successMessage.classList.add('visible');
      }
      
      // Reset form for future use
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1500);
  }
}

function validateField(input) {
  const value = input.value.trim();
  const type = input.type;
  const required = input.hasAttribute('required');
  
  // Remove existing error
  input.classList.remove('error');
  const existingError = input.parentElement.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Check required
  if (required && !value) {
    showFieldError(input, 'Este campo es obligatorio');
    return false;
  }
  
  // Check email format
  if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(input, 'Por favor, introduce un email válido');
      return false;
    }
  }
  
  // Check phone format (optional, basic validation)
  if (type === 'tel' && value) {
    const phoneRegex = /^[+]?[\d\s-]{9,}$/;
    if (!phoneRegex.test(value)) {
      showFieldError(input, 'Por favor, introduce un teléfono válido');
      return false;
    }
  }
  
  // Check minimum length for textarea
  if (input.tagName === 'TEXTAREA' && value && value.length < 10) {
    showFieldError(input, 'El mensaje debe tener al menos 10 caracteres');
    return false;
  }
  
  return true;
}

function showFieldError(input, message) {
  input.classList.add('error');
  
  const errorEl = document.createElement('span');
  errorEl.className = 'form-error';
  errorEl.textContent = message;
  
  input.parentElement.appendChild(errorEl);
}

// ============================================================================
// Smooth Scroll
// ============================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.landing-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu?.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        }
      }
    });
  });
}

// ============================================================================
// Navigation Highlight on Scroll
// ============================================================================
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  let ticking = false;
  
  function updateNavHighlight() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavHighlight);
      ticking = true;
    }
  }, { passive: true });
}

// ============================================================================
// Mobile Menu
// ============================================================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
    
    // Toggle body scroll
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================================
// Header Scroll Effect
// ============================================================================
(function() {
  const header = document.querySelector('.landing-header');
  if (!header) return;
  
  let lastScroll = 0;
  let ticking = false;
  
  function updateHeader() {
    const currentScroll = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================================================
// Lazy Load Images
// ============================================================================
(function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
})();

// ============================================================================
// Animated Spin Keyframes
// ============================================================================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

// Export for use
window.MEPLanding = {
  initContactForm,
  initSmoothScroll,
  initNavHighlight
};
