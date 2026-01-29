// ============================================
// CV PAGE ANIMATIONS AND INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // INTERSECTION OBSERVER FOR EDUCATION CARDS
    // ============================================
    const educationCards = document.querySelectorAll('.cv-education-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger animation
            }
        });
    }, observerOptions);

    educationCards.forEach(card => {
        cardObserver.observe(card);
    });

    // ============================================
    // TIMELINE LINE EXPANSION ANIMATION
    // ============================================
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'expand-line 1.5s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });

        timelineObserver.observe(timelineLine);
    }

    // ============================================
    // FOOTER FADE IN ANIMATION
    // ============================================
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        footerObserver.observe(footer);
    }

    // ============================================
    // SOCIAL ICONS GLOW ANIMATION
    // ============================================
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        setInterval(() => {
            icon.style.boxShadow = '0 0 20px rgba(224, 170, 255, 0.6)';
            setTimeout(() => {
                icon.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
            }, 500);
        }, 3000);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

