// ============================================
// RESEARCH PAGE SCRIPT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Set active nav link
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (currentPage === 'research.html' && href === 'research.html') {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // ============================================
    // 3D CAROUSEL FUNCTIONALITY
    // ============================================
    const carouselTrack = document.querySelector('.research-carousel-track');
    const slides = document.querySelectorAll('.research-carousel-slide');
    const indicators = document.querySelectorAll('.research-indicator');
    const prevBtn = document.querySelector('.research-carousel-prev');
    const nextBtn = document.querySelector('.research-carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Function to update carousel
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === currentSlide - 1 || (currentSlide === 0 && index === totalSlides - 1)) {
                slide.classList.add('prev');
            } else if (index === currentSlide + 1 || (currentSlide === totalSlides - 1 && index === 0)) {
                slide.classList.add('next');
            }
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetAutoSlide();
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    const carouselContainer = document.querySelector('.research-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Initialize carousel
    updateCarousel();

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animations
    const animatedElements = document.querySelectorAll(
        '.research-diary-entry, .research-highlight-card, .research-quote-container'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`;
        observer.observe(el);
    });

    // ============================================
    // PARALLAX EFFECT FOR HIGHLIGHT CARD
    // ============================================
    const highlightCard = document.querySelector('.research-highlight-card');
    if (highlightCard) {
        document.addEventListener('mousemove', (e) => {
            const rect = highlightCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            highlightCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        highlightCard.addEventListener('mouseleave', () => {
            highlightCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }

    // ============================================
    // FOOTER FADE-IN ANIMATION
    // ============================================
    const footer = document.querySelector('.footer');
    if (footer) {
        // Force red background via JavaScript as final override
        footer.style.setProperty('background', 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)', 'important');
        footer.style.setProperty('background-color', '#8B0000', 'important');
        footer.style.setProperty('background-image', 'none', 'important');
        footer.style.setProperty('--purple-deep', '#8B0000', 'important');
        footer.style.setProperty('--purple-medium', '#DC143C', 'important');
        
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('visible');
                    // Re-apply red background when visible
                    footer.style.setProperty('background', 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)', 'important');
                    footer.style.setProperty('background-color', '#8B0000', 'important');
                    footer.style.setProperty('background-image', 'none', 'important');
                    footer.style.setProperty('--purple-deep', '#8B0000', 'important');
                    footer.style.setProperty('--purple-medium', '#DC143C', 'important');
                    // Force opacity and transform when visible
                    footer.style.setProperty('opacity', '1', 'important');
                    footer.style.setProperty('transform', 'translateY(0)', 'important');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Check if footer is already in viewport on load
        const rect = footer.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight;
        if (isInViewport) {
            footer.classList.add('visible');
            footer.style.setProperty('opacity', '1', 'important');
            footer.style.setProperty('transform', 'translateY(0)', 'important');
        } else {
            footerObserver.observe(footer);
        }
    }
    
    // Hide purple background animation
    const bgAnimation = document.querySelector('.background-animation');
    if (bgAnimation) {
        bgAnimation.style.display = 'none';
    }

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Only prevent default for hash links (same-page navigation)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

