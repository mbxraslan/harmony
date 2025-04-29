/**
 * Main JavaScript file for Harmony Carers website
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing site functionality");
    
    // Initialize theme switcher
    initThemeSwitcher();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize scroll effects for smooth animations
    initScrollEffects();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize back to top button
    initBackToTop();
    
    // Add preloader with enhanced colors
    initColorfulPreloader();
    
    // Initialize hover effects for special elements
    initHoverEffects();
});

/**
 * Initializes the theme switcher functionality
 */
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;
    
    function toggleTheme() {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        htmlElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Add event listeners
    if (themeToggle) themeToggle.addEventListener('change', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('change', toggleTheme);
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    function toggleMobileMenu() {
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMobileMenu);
    
    // Optimized scroll handling
    let ticking = false;
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled', 'header-hidden');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Optimized reveal animations
    const revealElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Optimize form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            
            for (let [key, value] of formData.entries()) {
                if (contactForm.querySelector(`[name="${key}"]`).hasAttribute('required') && !value.trim()) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('success', 'Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            } else {
                showFormMessage('error', 'Please fill in all required fields.');
            }
        });
    }
    
    // Optimize image loading
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

/**
 * Initializes mobile navigation functionality
 */
function initMobileNav() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (!mobileMenuBtn || !mobileMenuOverlay || !mobileMenuClose || !mobileNavLinks) {
        console.log("Mobile menu elements not found");
        return;
    }
    
    console.log("Mobile menu initialized");
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    mobileMenuClose.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initializes scroll effects for the header and elements
 */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // Reveal elements on scroll with enhanced timing
        revealElements();
    });
    
    // Initial check for elements in view with slight delay for better visual effect
    setTimeout(revealElements, 800);
}

/**
 * Reveals elements when they enter the viewport
 */
function revealElements() {
    // Get all elements that need to be revealed
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .reveal');
    
    // Only reveal elements in the viewport with staggered effect
    const windowHeight = window.innerHeight;
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 50) {
            // Add staggered delay based on element index
            setTimeout(() => {
                element.classList.add('active');
            }, index * 150); // 150ms delay between each element
        }
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize colorful preloader with pink and blue theme
 */
function initColorfulPreloader() {
    // Create preloader element with enhanced colors
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <svg viewBox="0 0 80 80">
                <circle class="circle-blue" cx="40" cy="40" r="32" />
                <circle class="circle-pink" cx="40" cy="40" r="25" />
            </svg>
            <div class="loader-text">Harmony Carers</div>
        </div>
    `;
    
    // Add styles for the new preloader
    const style = document.createElement('style');
    style.textContent = `
        .circle-blue {
            fill: none;
            stroke: #4361ee;
            stroke-width: 3;
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: loaderBlue 2s linear infinite;
        }
        
        .circle-pink {
            fill: none;
            stroke: #f72585;
            stroke-width: 3;
            stroke-dasharray: 160;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: loaderPink 2s linear infinite reverse;
        }
        
        .loader-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            font-weight: 500;
            color: #212529;
            opacity: 0.8;
            white-space: nowrap;
        }
        
        @keyframes loaderBlue {
            0% {
                stroke-dashoffset: 200;
                transform: rotate(0);
            }
            50% {
                stroke-dashoffset: 0;
                transform: rotate(180deg);
            }
            100% {
                stroke-dashoffset: -200;
                transform: rotate(360deg);
            }
        }
        
        @keyframes loaderPink {
            0% {
                stroke-dashoffset: 160;
                transform: rotate(0);
            }
            50% {
                stroke-dashoffset: 0;
                transform: rotate(180deg);
            }
            100% {
                stroke-dashoffset: -160;
                transform: rotate(360deg);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Hide preloader after page loads with fade-out effect
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
            
            // Reveal hero elements with sequential animation
            const heroElements = document.querySelectorAll('.hero .slide-in-left, .hero .slide-in-right, .hero-title, .hero-subtitle, .hero-buttons .btn');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('active');
                }, 300 + (index * 200)); // Staggered reveal
            });
            
            // Reveal visible elements
            revealElements();
        }, 800);
    });
}

/**
 * Initialize hover effects for special elements
 */
function initHoverEffects() {
    // Add hover effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Add hover effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
} 