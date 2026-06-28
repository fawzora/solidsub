/* =============================================
   SolidSub Modern — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR: add scrolled class on scroll =====
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                // Close mobile nav if open
                const navCollapse = document.getElementById('navmenu');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navCollapse)?.hide();
                }
            }
        });
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('sendBtn');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                contactForm.reset();
                // Show toast
                const toastEl = document.getElementById('successToast');
                if (toastEl) new bootstrap.Toast(toastEl).show();
            }, 1600);
        });
    }

    // ===== SCROLL REVEAL: fade-in elements on scroll =====
    const revealEls = document.querySelectorAll(
        '.step-card, .service-card, .pricing-card, .stat-card, .about-card, .contact-card'
    );
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ===== PRICING: highlight card on hover (add glow) =====
    document.querySelectorAll('.pricing-card:not(.pricing-card--featured)').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--primary)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--border)';
        });
    });

    // ===== STAT COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.opacity = '1';
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(n => {
        n.style.transition = 'opacity 0.6s';
        counterObserver.observe(n);
    });

});
