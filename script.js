// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect (enhanced)
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize all UI/UX enhancements
    initFAQ();
    initLightbox();
    initScrollAnimations();
    initScrollProgress();
    initBackToTop();
    initLazyImageLoading();
});

// =========================================
// FAQ Accordion
// =========================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Optional: Close all other items (Accordion behavior)
            // Uncomment below for single-open accordion
            // const allItems = document.querySelectorAll('.faq-item');
            // allItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            item.classList.toggle('active');
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// =========================================
// Lightbox for Images
// =========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');

    // Select images from history gallery, sub-images and cat intro
    const galleryImages = document.querySelectorAll('.narrative-chapter img, .gallery-item img, .cat-card img');

    galleryImages.forEach(img => {
        // Make image cursor a pointer to indicate clickability
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            const src = img.getAttribute('src');
            lightboxImg.setAttribute('src', src);

            // Check for rotation class
            if (img.classList.contains('rotate-90')) {
                lightboxImg.classList.add('rotate-90');
            } else {
                lightboxImg.classList.remove('rotate-90');
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox functions
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
            lightboxImg.classList.remove('rotate-90');
        }, 300);
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// =========================================
// Scroll Reveal Animations
// =========================================
function initScrollAnimations() {
    // Add animation classes to elements
    const elementsToAnimate = [
        { selector: '.section-header', class: 'fade-in-up' },
        { selector: '.service-card', class: 'fade-in-up' },
        { selector: '.testimonial-card', class: 'fade-in-up' },
        { selector: '.value-item', class: 'scale-in' },
        { selector: '.impact-card', class: 'fade-in-up' },
        { selector: '.principle-card', class: 'fade-in-up' },
        { selector: '.scope-item', class: 'fade-in-up' },
        { selector: '.partner-item', class: 'scale-in' },
        { selector: '.cat-card', class: 'scale-in' },
        { selector: '.gallery-item', class: 'fade-in-up' },
        { selector: '.faq-item', class: 'fade-in-up' },
        { selector: '.contact-card', class: 'fade-in-up' },
        { selector: '.stat-card', class: 'scale-in' },
        { selector: '.narrative-chapter', class: 'fade-in-up' },
        { selector: '.about-hero', class: 'fade-in-up' },
        { selector: '.brand-story', class: 'fade-in-up' },
        { selector: '.strengths-gallery', class: 'fade-in-up' },
    ];

    // Add classes to elements
    elementsToAnimate.forEach(({ selector, class: animClass }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            if (!el.classList.contains(animClass)) {
                el.classList.add(animClass);
                // Add stagger delay for grouped elements
                if (elements.length > 1 && index < 6) {
                    el.classList.add(`stagger-${index + 1}`);
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// =========================================
// Scroll Progress Indicator
// =========================================
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
}

// =========================================
// Back to Top Button
// =========================================
function initBackToTop() {
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', '맨 위로 이동');
    backToTopBtn.setAttribute('title', '맨 위로');
    document.body.appendChild(backToTopBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================================
// Lazy Image Loading Enhancement
// =========================================
function initLazyImageLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach(img => {
        // Mark as loaded when complete
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });

            img.addEventListener('error', () => {
                // Handle broken images gracefully
                img.style.opacity = '0.5';
                console.warn('Image failed to load:', img.src);
            });
        }
    });
}

// =========================================
// Utility: Debounce function
// =========================================
function debounce(func, wait = 20, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// =========================================
// Utility: Throttle function
// =========================================
function throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
