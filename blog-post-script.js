// Blog Post Page Script
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
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'blog.html') {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let autoPlayInterval;

        // Function to show slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });

            indicators.forEach((indicator, i) => {
                indicator.classList.remove('active');
                if (i === index) {
                    indicator.classList.add('active');
                }
            });

            carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        }

        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
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
                showSlide(currentSlide);
                resetAutoPlay();
            });
        });

        // Auto-play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Start auto-play
        if (slides.length > 1) {
            startAutoPlay();

            // Pause on hover
            const carouselWrapper = document.querySelector('.carousel-wrapper');
            if (carouselWrapper) {
                carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
                carouselWrapper.addEventListener('mouseleave', startAutoPlay);
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        if (carouselTrack) {
            carouselTrack.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            carouselTrack.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    nextSlide();
                    resetAutoPlay();
                }
                if (touchEndX > touchStartX + 50) {
                    prevSlide();
                    resetAutoPlay();
                }
            }
        }
    }

    // Intersection Observer for content animations
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

    // Observe blog content
    const blogContent = document.querySelector('.blog-post-content');
    if (blogContent) {
        blogContent.style.opacity = '0';
        blogContent.style.transform = 'translateY(40px)';
        blogContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(blogContent);
    }

    // Observe paragraphs for staggered animation
    const paragraphs = document.querySelectorAll('.blog-paragraph');
    paragraphs.forEach((para, index) => {
        para.style.opacity = '0';
        para.style.transform = 'translateY(20px)';
        para.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(para);
    });

    // Footer fade-in on scroll
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        footerObserver.observe(footer);
    }
});

