// ============================================
// SCC PAGE INTERACTIONS AND ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // ACCORDION FUNCTIONALITY
    // ============================================
    const accordionItems = document.querySelectorAll('.scc-accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.scc-accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Close other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animate VMG cards
    const vmgCards = document.querySelectorAll('.scc-vmg-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger animation
            }
        });
    }, observerOptions);

    vmgCards.forEach(card => {
        cardObserver.observe(card);
    });

    // ============================================
    // FOOTER FADE-IN FROM BOTTOM ON SCROLL
    // ============================================
    const footer = document.querySelector('.footer');
    if (footer) {
        // Force green background via JavaScript
        footer.style.setProperty('background', 'linear-gradient(135deg, #4CAF50 0%, #A5D6A7 100%)', 'important');
        footer.style.setProperty('background-color', '#4CAF50', 'important');
        footer.style.setProperty('--purple-deep', '#4CAF50', 'important');
        footer.style.setProperty('--purple-medium', '#A5D6A7', 'important');
        
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Re-apply green background when visible
                    entry.target.style.setProperty('background', 'linear-gradient(135deg, #4CAF50 0%, #A5D6A7 100%)', 'important');
                    entry.target.style.setProperty('background-color', '#4CAF50', 'important');
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

