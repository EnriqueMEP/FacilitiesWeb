/* ==========================================================================
   MEPFacilities Design Directory - Animations JavaScript
   ========================================================================== */

// ===== Intersection Observer for Reveal Animations =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ===== Parallax Effect on Cards =====
document.querySelectorAll('.landing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.textContent = target;
        return;
    }

    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target) || 0;
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
});

// ===== Staggered Animation Helper =====
function staggerAnimation(elements, className, delay = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add(className);
        }, index * delay);
    });
}

// ===== Header Scroll Effect =====
let lastScroll = 0;
const header = document.querySelector('.directory-header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== Typed Text Effect =====
function typeText(element, text, speed = 50) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.textContent = text;
        return Promise.resolve();
    }

    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';

        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                resolve();
            }
        }, speed);
    });
}

// ===== SVG Draw Animation =====
function animateSVGPath(path, duration = 1000) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        path.style.strokeDasharray = 'none';
        return;
    }

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    path.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
    ], {
        duration,
        easing: 'ease-out',
        fill: 'forwards'
    });
}

// ===== Initialize SVG Animations =====
document.querySelectorAll('.animate-draw').forEach(svg => {
    const paths = svg.querySelectorAll('path, line, polyline, circle, rect');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                paths.forEach((path, i) => {
                    setTimeout(() => animateSVGPath(path), i * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(svg);
});

// ===== Parallax Background =====
document.querySelectorAll('[data-parallax]').forEach(el => {
    window.addEventListener('scroll', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const rect = el.getBoundingClientRect();
        const scrolled = window.pageYOffset;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (scrolled - el.offsetTop) * speed;
            el.style.transform = `translateY(${yPos}px)`;
        }
    }, { passive: true });
});

// ===== Export for global use =====
window.MEPAnimations = {
    animateCounter,
    staggerAnimation,
    typeText,
    animateSVGPath
};
