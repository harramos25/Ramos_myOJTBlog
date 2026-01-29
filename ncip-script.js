// ============================================
// NCIP PAGE CAROUSEL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.ncip-carousel-slide');
    const prevButton = document.querySelector('.ncip-carousel-prev');
    const nextButton = document.querySelector('.ncip-carousel-next');
    const indicators = document.querySelectorAll('.ncip-indicator');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Add active class to current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }

        // Add active class to current indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Event listeners for navigation arrows
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-play carousel (infinite loop)
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.ncip-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const carouselTrack = document.querySelector('.ncip-carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            resetAutoPlay();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            resetAutoPlay();
        }
    }

    // Verify all slides exist
    if (slides.length === 0) {
        console.error('No carousel slides found');
        return;
    }

    // Preload images to ensure they're ready
    const carouselImages = document.querySelectorAll('.ncip-carousel-image');
    carouselImages.forEach((img, index) => {
        img.onerror = function() {
            console.error(`Failed to load carousel image ${index + 1}:`, this.src);
        };
        img.onload = function() {
            console.log(`Loaded carousel image ${index + 1}:`, this.src);
        };
    });

    // Initialize first slide and start auto-play
    showSlide(0);
    startAutoPlay();

    // ============================================
    // FOOTER FADE-IN FROM BOTTOM ON SCROLL
    // ============================================
    const footer = document.querySelector('.footer');
    if (footer) {
        // Force yellow background via JavaScript as final override
        footer.style.setProperty('background', 'linear-gradient(135deg, #FFD166 0%, #FFED85 100%)', 'important');
        footer.style.setProperty('background-color', '#FFD166', 'important');
        footer.style.setProperty('--purple-deep', '#FFD166', 'important');
        footer.style.setProperty('--purple-medium', '#FFED85', 'important');
        
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Re-apply yellow background when visible
                    entry.target.style.setProperty('background', 'linear-gradient(135deg, #FFD166 0%, #FFED85 100%)', 'important');
                    entry.target.style.setProperty('background-color', '#FFD166', 'important');
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

