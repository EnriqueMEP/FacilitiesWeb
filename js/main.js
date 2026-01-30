/* ==========================================================================
   MEPFacilities - Agency-Grade Premium Animations
   Refined GSAP Animations, Magnetic Effects, Webflow Transitions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP with premium defaults
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Global easing presets
    const ease = {
        smooth: 'power3.out',
        expo: 'expo.out',
        elastic: 'elastic.out(1, 0.5)',
        back: 'back.out(1.7)',
        inOut: 'power2.inOut'
    };

    // Initialize all modules
    initThemeToggle();
    initLoader();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initStatsCounter();
    initParallaxEffects();
    initMagneticElements();
    initMicroInteractions();
    initContactForm();
    initSmoothScroll();
    initCursorGlow();
    initScrollToTop();
    initLazyImages();
});

// ===== Loader =====
function initLoader() {
    const loader = document.getElementById('loader');
    const loaderProgress = document.querySelector('.loader-progress');

    // Fallback: hide loader after 3 seconds
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            setTimeout(revealHero, 200);
        }
    }, 3000);

    window.addEventListener('load', () => {
        // Animate progress bar completion
        gsap.to(loaderProgress, {
            width: '100%',
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        loader.classList.add('hidden');
                        revealHero();
                    }
                });
            }
        });
    });
}

// ===== Navbar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    let lastScrollY = 0;

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScrollY > 400 && !navMobile?.classList.contains('open')) {
            if (currentScrollY > lastScrollY + 10) {
                gsap.to(navbar, { y: -100, duration: 0.3, ease: 'power2.out' });
            } else if (currentScrollY < lastScrollY - 10) {
                gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out' });
            }
        } else {
            gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out' });
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle && navMobile) {
        const openMenu = () => {
            navToggle.classList.add('active');
            navMobile.classList.add('open');
            document.body.style.overflow = 'hidden';
            navToggle.setAttribute('aria-label', 'Cerrar menú');
            navToggle.setAttribute('aria-expanded', 'true');
        };

        const closeMenu = () => {
            navToggle.classList.remove('active');
            navMobile.classList.remove('open');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-label', 'Abrir menú');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navMobile.classList.contains('open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on links
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMobile.classList.contains('open')) {
                closeMenu();
            }
        });
    }
}

// ===== Hero Animations with GSAP - Premium =====
function revealHero() {
    const tl = gsap.timeline({
        defaults: { ease: 'expo.out' }
    });

    // Logo entrance with subtle scale
    tl.to('.hero-logo', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        onComplete: () => document.querySelector('.hero-logo')?.classList.add('revealed')
    })
        // Title spans with dramatic stagger
        .to('.hero-title span', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: 'expo.out',
            onComplete: () => document.querySelector('.hero-title')?.classList.add('revealed')
        }, '-=0.6')
        // Subtitle with smooth fade
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            onComplete: () => document.querySelector('.hero-subtitle')?.classList.add('revealed')
        }, '-=0.7')
        // Buttons with bounce
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.4)',
            onComplete: () => document.querySelector('.hero-buttons')?.classList.add('revealed')
        }, '-=0.5')
        // Logos row
        .to('.hero-logos', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            onComplete: () => document.querySelector('.hero-logos')?.classList.add('revealed')
        }, '-=0.4')
        // Floating cards with elastic bounce
        .to('.floating-card', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.6)',
            onComplete: () => {
                document.querySelectorAll('.floating-card').forEach(card => {
                    card.classList.add('revealed');
                });
            }
        }, '-=0.5')
        // Scroll hint with delayed fade
        .to('.scroll-hint', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            onComplete: () => document.querySelector('.scroll-hint')?.classList.add('revealed')
        }, '-=0.3');
}

function initHeroAnimations() {
    // Add mouse parallax effect to floating cards (desktop only)
    if (window.innerWidth > 1024) {
        const heroVisual = document.querySelector('.hero-visual');
        const floatingCards = document.querySelectorAll('.floating-card');

        if (heroVisual && floatingCards.length > 0) {
            heroVisual.addEventListener('mousemove', (e) => {
                const rect = heroVisual.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

                floatingCards.forEach((card, index) => {
                    const depth = (index + 1) * 0.5;
                    gsap.to(card, {
                        x: x * 30 * depth,
                        y: y * 20 * depth,
                        rotateY: x * 10,
                        rotateX: -y * 10,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
            });

            heroVisual.addEventListener('mouseleave', () => {
                floatingCards.forEach((card) => {
                    gsap.to(card, {
                        x: 0,
                        y: 0,
                        rotateY: 0,
                        rotateX: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    });
                });
            });
        }
    }
}

// ===== Scroll-Triggered Animations - Premium =====
function initScrollAnimations() {
    // Section headers with clip-path reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    onEnter: () => header.classList.add('revealed')
                }
            }
        );
    });

    // Cards with staggered reveal and scale
    gsap.utils.toArray('.cards-grid').forEach(grid => {
        const cards = grid.querySelectorAll('.card');
        gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    onEnter: () => cards.forEach(card => card.classList.add('revealed'))
                }
            }
        );
    });

    // Benefits with bounce effect
    gsap.utils.toArray('.benefits-grid').forEach(grid => {
        const benefits = grid.querySelectorAll('.benefit');
        gsap.fromTo(benefits,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    onEnter: () => benefits.forEach(b => b.classList.add('revealed'))
                }
            }
        );
    });

    // Stats
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const stats = statsSection.querySelectorAll('.stat');
        gsap.fromTo(stats,
            { opacity: 0.7, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: statsSection,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    onEnter: () => stats.forEach(stat => stat.classList.add('revealed'))
                }
            }
        );
    }

    // Contact items
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0.7, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    onEnter: () => item.classList.add('revealed')
                }
            }
        );
    });

    // Contact form box
    const contactFormBox = document.querySelector('.contact-form-box');
    if (contactFormBox) {
        gsap.fromTo(contactFormBox,
            { opacity: 0.7, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactFormBox,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    onEnter: () => contactFormBox.classList.add('revealed')
                }
            }
        );
    }

    // CTA section
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        gsap.fromTo(ctaContent,
            { opacity: 0.7, y: 30, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaContent,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    onEnter: () => ctaContent.classList.add('revealed')
                }
            }
        );
    }
}

// ===== Stats Counter with GSAP - Premium =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(el => {
        const target = parseInt(el.dataset.count) || 0;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                // Add glow effect when counting
                gsap.to(el, {
                    textShadow: '0 0 40px rgba(59, 125, 60, 0.5)',
                    duration: 0.3
                });

                gsap.to(el, {
                    duration: 2.2,
                    ease: 'expo.out',
                    onUpdate: function () {
                        const progress = this.progress();
                        const currentValue = Math.floor(target * progress);
                        el.textContent = currentValue;
                    },
                    onComplete: () => {
                        el.textContent = target;
                        // Pulse effect on complete
                        gsap.to(el, {
                            scale: 1.05,
                            duration: 0.15,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        });
    });
}

// ===== Parallax Effects =====
function initParallaxEffects() {
    // Hero background parallax
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // CTA section glow effect
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        gsap.to(ctaSection, {
            '--glow-intensity': 0.5,
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1
            }
        });
    }

    // Floating elements on scroll
    gsap.utils.toArray('.benefit-icon').forEach((icon, index) => {
        gsap.to(icon, {
            y: -10 + (index * 2),
            rotation: 5 - (index * 2),
            scrollTrigger: {
                trigger: icon,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });
}

// ===== Magnetic Hover Effects (Premium) =====
function initMagneticElements() {
    if (window.innerWidth <= 1024) return;

    // Magnetic effect for buttons
    document.querySelectorAll('.btn-primary, .btn-lg').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });

    // Magnetic effect for floating cards
    document.querySelectorAll('.floating-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(card, {
                rotateY: x * 0.1,
                rotateX: -y * 0.1,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 800
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });

    // Magnetic effect for benefit icons
    document.querySelectorAll('.benefit-icon').forEach(icon => {
        const parent = icon.closest('.benefit');

        parent.addEventListener('mousemove', (e) => {
            const rect = parent.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;

            gsap.to(icon, {
                x: x,
                y: y,
                rotation: x * 0.2,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        parent.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });
}

// ===== Micro-Interactions =====
function initMicroInteractions() {
    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)'
            });
        });

        btn.addEventListener('mousedown', () => {
            gsap.to(btn, {
                scale: 0.98,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseup', () => {
            gsap.to(btn, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Card 3D tilt effect (desktop only)
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(card, {
                    rotateY: x * 10,
                    rotateX: -y * 10,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    // Benefit hover icon animation
    document.querySelectorAll('.benefit').forEach(benefit => {
        const icon = benefit.querySelector('.benefit-icon');

        benefit.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.15,
                rotation: 5,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });
        });

        benefit.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Contact item hover
    document.querySelectorAll('a.contact-item').forEach(item => {
        const icon = item.querySelector('.contact-icon');

        item.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Tag hover animation
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                y: -3,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Logo hover effects in footer and hero
    document.querySelectorAll('.footer-logos a, .logos-row a').forEach(link => {
        const logo = link.querySelector('img');
        if (!logo) return;

        link.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                scale: 1.15,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ===== Custom Cursor Glow (Desktop) =====
// Creates an ambient glow that follows the cursor - cursor remains visible
function initCursorGlow() {
    if (window.innerWidth <= 1024) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let isInHero = false;

    hero.addEventListener('mouseenter', () => {
        isInHero = true;
        gsap.to(cursor, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    });

    hero.addEventListener('mouseleave', () => {
        isInHero = false;
        gsap.to(cursor, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    });

    // Use requestAnimationFrame for smoother tracking
    let mouseX = 0, mouseY = 0;

    hero.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        if (isInHero) {
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset errors with animation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.classList.remove('error');
        });
        form.querySelectorAll('.error-msg').forEach(msg => {
            msg.classList.remove('visible');
        });

        // Validate
        let valid = true;
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        if (!name.value.trim()) {
            showError(name);
            valid = false;
        }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email);
            valid = false;
        }
        if (!message.value.trim()) {
            showError(message);
            valid = false;
        }

        if (!valid) {
            // Shake the form
            gsap.to(form, {
                x: [-10, 10, -8, 8, -5, 5, 0],
                duration: 0.5,
                ease: 'power2.out'
            });
            return;
        }

        // Submit
        const btn = form.querySelector('.btn-submit');
        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch('https://formsubmit.co/ajax/info@mepfacilities.com', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Success animation
                gsap.to(form, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.in',
                    onComplete: () => {
                        form.style.display = 'none';
                        formSuccess.classList.add('visible');

                        gsap.fromTo(formSuccess,
                            { opacity: 0, scale: 0.9 },
                            {
                                opacity: 1,
                                scale: 1,
                                duration: 0.5,
                                ease: 'back.out(1.7)'
                            }
                        );
                    }
                });
                form.reset();
            } else {
                openMailto(name.value, email.value, form.querySelector('#phone')?.value, message.value);
            }
        } catch {
            openMailto(name.value, email.value, form.querySelector('#phone')?.value, message.value);
        }

        btn.classList.remove('loading');
        btn.disabled = false;
    });

    // Input focus animations
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                borderColor: 'var(--green)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            if (!input.classList.contains('error')) {
                gsap.to(input, {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

function showError(input) {
    input.classList.add('error');
    const msg = input.parentElement.querySelector('.error-msg');
    if (msg) msg.classList.add('visible');

    // Shake animation with GSAP
    gsap.to(input, {
        x: [-8, 8, -6, 6, -4, 4, 0],
        duration: 0.4,
        ease: 'power2.out'
    });
}

function openMailto(name, email, phone, message) {
    const subject = encodeURIComponent('Consulta desde web MEPFacilities');
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:info@mepfacilities.com?subject=${subject}&body=${body}`;
}

window.resetForm = function () {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    gsap.to(success, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            success.classList.remove('visible');
            form.style.display = 'flex';
            form.style.opacity = '1';
            form.style.transform = 'none';

            gsap.fromTo(form,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    });
};

// ===== Smooth Scroll with GSAP =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (target) {
                const offset = document.querySelector('.navbar').offsetHeight + 20;
                const pos = target.getBoundingClientRect().top + window.scrollY - offset;

                // Close mobile menu if open
                const navMobile = document.getElementById('navMobile');
                const navToggle = document.getElementById('navToggle');

                if (navMobile?.classList.contains('open')) {
                    navMobile.classList.remove('open');
                    navToggle?.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Smooth scroll with GSAP
                gsap.to(window, {
                    scrollTo: { y: pos, autoKill: false },
                    duration: 1,
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// ===== Utility: Debounce =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Handle Resize =====
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// ===== Visibility Change - Pause Animations =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 1.2,
            ease: 'power3.inOut'
        });
    });
}

// ===== Lazy Loading Images =====
function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => img.classList.add('loaded'));
    }
}

function initTextReveal() {
    gsap.utils.toArray('.section-header h2').forEach(heading => {
        gsap.fromTo(heading,
            {
                opacity: 0.5,
                y: 30,
                clipPath: 'inset(0 0 100% 0)'
            },
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ===== Theme Toggle - Light/Dark Mode =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('mepfacilities-theme');

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Default to dark theme
        html.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Add transition class for smooth theme change
        html.classList.add('theme-transitioning');

        // Apply new theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('mepfacilities-theme', newTheme);

        // Animate the toggle button
        gsap.to(themeToggle, {
            rotation: newTheme === 'light' ? 180 : 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });

        // Remove transition class after animation
        setTimeout(() => {
            html.classList.remove('theme-transitioning');
        }, 500);
    });

    // Add initial rotation if light theme
    if (html.getAttribute('data-theme') === 'light') {
        gsap.set(themeToggle, { rotation: 180 });
    }
}
