// ============================================
// SMOOTH SCROLL & NAVBAR ACTIVE STATE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash;

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Check if link matches current page
            if (href === currentPage || 
                (currentPage === 'index.html' && (href === '#home' || href === 'index.html' || href === '')) ||
                (currentPage === 'about.html' && href === 'about.html') ||
                (currentPage === 'cv.html' && href === 'cv.html') ||
                (currentPage === 'research.html' && href === 'research.html') ||
                (currentPage === 'ncip.html' && href === 'ncip.html') ||
                (currentPage === 'scc.html' && href === 'scc.html') ||
                (currentPage === 'ched.html' && href === 'ched.html') ||
                (currentHash && href === currentHash)) {
                link.classList.add('active');
            }
        });
    }

    // Set active link on page load
    setActiveNavLink();

    // Navbar scroll effect - add scrolled class when scrolling
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Ensure HOME link stays active on home page when scrolling
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'index.html') {
            const homeLink = document.querySelector('.nav-link[href="#home"], .nav-link[href="index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
        
        lastScroll = currentScroll;
    });

    // Update active nav link on scroll (for same-page navigation)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Store the active link that was clicked (for page navigation)
    let clickedActiveLink = null;

    function updateActiveNav() {
        // Don't update active nav if a link was clicked (for page navigation)
        // Only update for same-page hash navigation
        if (clickedActiveLink) {
            return;
        }

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // If on home page, keep HOME link active
        if (currentPage === 'index.html') {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === '#home' || href === 'index.html' || href === '') {
                    link.classList.add('active');
                    return; // Skip further processing for HOME link
                }
            });
        }
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Only update if it's a hash link (same-page navigation) and not HOME on index.html
            if (href && href.startsWith('#')) {
                // Skip HOME link on index.html - it should always be active
                if (currentPage === 'index.html' && (href === '#home')) {
                    return;
                }
                link.classList.remove('active');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll for nav links and set active state
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
            // For external links (like about.html), allow normal navigation
            // Active state will be set when the new page loads via setActiveNavLink()
        });
    });

    // Handle hash navigation when page loads (for links from other pages like index.html#blog)
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            // Wait for page to fully load, then scroll
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 100);
            });
        }
    }

    // ============================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all glass cards and sections
    const animatedElements = document.querySelectorAll('.glass-card, .glass-container, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // ============================================
    // PARALLAX EFFECT FOR BACKGROUND ORBS
    // ============================================
    const orbs = document.querySelectorAll('.orb');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // GLASS CARD HOVER EFFECTS
    // ============================================
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // SOCIAL ICON HOVER EFFECTS
    // ============================================
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 0 25px rgba(224, 170, 255, 0.8)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        });
    });

    // ============================================
    // SCROLL INDICATOR CLICK
    // ============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('.about-site-section');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ============================================
    // TYPING EFFECT FOR HERO TITLE (OPTIONAL)
    // ============================================
    // Uncomment if you want a typing effect
    /*
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }
    */

    // ============================================
    // MOUSE MOVE PARALLAX FOR GLASS CARDS (Subtle)
    // ============================================
    // Commented out for now - can be enabled if desired
    /*
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.glass-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        cards.forEach((card, index) => {
            const speed = (index % 3) * 0.2;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Reset transform on mouse leave
    document.addEventListener('mouseleave', function() {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.style.transform = 'translate(0, 0)';
        });
    });
    */
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});


