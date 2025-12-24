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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
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




    // Initialize FAQ Accordion
    initFAQ();

    // Initialize Lightbox
    initLightbox();
});

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items (Accordion behavior)


            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
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
        });
    });

    // Close lightbox functions
    const closeLightbox = () => {
        lightbox.classList.remove('active');
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
