// ============================================
// CHED PAGE INTERACTIONS AND ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animate about section cards
    const aboutCards = document.querySelectorAll('.ched-glass-card, .ched-logo-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Stagger animation
            }
        });
    }, observerOptions);

    aboutCards.forEach(card => {
        cardObserver.observe(card);
    });

    // ============================================
    // FOOTER FADE-IN FROM BOTTOM ON SCROLL
    // ============================================
    const footer = document.querySelector('.footer');
    if (footer) {
        // Force blue background via JavaScript
        footer.style.setProperty('background', 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)', 'important');
        footer.style.setProperty('background-color', '#2196F3', 'important');
        footer.style.setProperty('--purple-deep', '#2196F3', 'important');
        footer.style.setProperty('--purple-medium', '#64B5F6', 'important');
        
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Re-apply blue background when visible
                    entry.target.style.setProperty('background', 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)', 'important');
                    entry.target.style.setProperty('background-color', '#2196F3', 'important');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        footerObserver.observe(footer);
    }

    // Hide purple background animation
    const bgAnimation = document.querySelector('.background-animation');
    if (bgAnimation) {
        bgAnimation.style.display = 'none';
    }
});

