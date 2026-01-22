/* ==========================================================================
   MEPFacilities Corporate Website - Professional Animations with GSAP
   ========================================================================== */

// ===== Wait for DOM =====
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursorGlow();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initStatsCounter();
    initCardEffects();
    initContactForm();
    initSmoothScroll();
});

// ===== Loader =====
function initLoader() {
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger hero animations after loader
            setTimeout(animateHero, 300);
        }, 1800);
    });
}

// ===== Cursor Glow Effect =====
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor || window.matchMedia('(max-width: 1024px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== Navbar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });
    }
}

// ===== Hero Animations with GSAP =====
function initHeroAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
}

function animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-logo-main', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        from: { opacity: 0, y: 30 }
    })
        .fromTo('.hero-title .title-line',
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
            '-=0.4'
        )
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            from: { opacity: 0, y: 30 }
        }, '-=0.6')
        .to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            from: { opacity: 0, y: 30 }
        }, '-=0.6')
        .to('.hero-companies', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            from: { opacity: 0, y: 20 }
        }, '-=0.4');
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Stats bar
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.stats-bar',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    // Company cards
    gsap.from('.company-card', {
        scrollTrigger: {
            trigger: '.companies-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Benefit cards
    gsap.from('.benefit-card', {
        scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // CTA section
    gsap.from('.cta-content', {
        scrollTrigger: {
            trigger: '.section-cta',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Contact section
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-form-wrapper', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Contact items
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-details',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count) || 0;
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// ===== Card Mouse Effects =====
function initCardEffects() {
    const cards = document.querySelectorAll('.company-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// ===== Contact Form - FULLY FUNCTIONAL =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    // Set the redirect URL to current page
    const nextInput = form.querySelector('input[name="_next"]');
    if (nextInput) {
        nextInput.value = window.location.href;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset errors
        form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.classList.remove('error');
        });
        form.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('visible');
        });

        // Validate
        let isValid = true;
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        if (!name.value.trim()) {
            showError(name);
            isValid = false;
        }

        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email);
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message);
            isValid = false;
        }

        if (!isValid) return;

        // Show loading
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Send form data using FormSubmit
            const formData = new FormData(form);

            const response = await fetch('https://formsubmit.co/ajax/info@mepfacilities.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success with animation
                form.style.display = 'none';
                formSuccess.classList.add('visible');
                form.reset();
            } else {
                // Fallback to mailto if FormSubmit fails
                openMailtoFallback(name.value, email.value, form.querySelector('#phone')?.value, message.value);
            }
        } catch (error) {
            console.log('Form submission error, using mailto fallback');
            // Fallback to mailto
            openMailtoFallback(name.value, email.value, form.querySelector('#phone')?.value, message.value);
        }

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

// Mailto fallback function
function openMailtoFallback(name, email, phone, message) {
    const subject = encodeURIComponent('Consulta desde la web MEPFacilities');
    const body = encodeURIComponent(
        `Nombre: ${name}\n` +
        `Email: ${email}\n` +
        `Teléfono: ${phone || 'No proporcionado'}\n\n` +
        `Mensaje:\n${message}`
    );
    window.location.href = `mailto:info@mepfacilities.com?subject=${subject}&body=${body}`;
}

function showError(input) {
    input.classList.add('error');
    const error = input.parentElement.querySelector('.form-error');
    if (error) error.classList.add('visible');

    // Shake animation
    gsap.to(input, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: 'power2.out'
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Reset form function (called from HTML)
window.resetForm = function () {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    form.style.display = 'flex';
    formSuccess.classList.remove('visible');
};

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                // Close mobile menu
                document.getElementById('navMenu')?.classList.remove('open');
                document.getElementById('navToggle')?.classList.remove('active');
                document.body.style.overflow = '';

                // Smooth scroll with GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetPosition, autoKill: false },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// ===== Parallax on scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, i) => {
        const speed = 0.05 * (i + 1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, { passive: true });
