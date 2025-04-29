document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher functionality
    const themeSwitch = document.getElementById('checkbox');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeSwitch) themeSwitch.checked = true;
        document.querySelector('.theme-label').textContent = 'Light Mode';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeSwitch) themeSwitch.checked = false;
        document.querySelector('.theme-label').textContent = 'Dark Mode';
    }
    
    // Add transition after initial theme is set to prevent flash
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
    
    // Theme toggle event listener
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                document.querySelector('.theme-label').textContent = 'Light Mode';
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                document.querySelector('.theme-label').textContent = 'Dark Mode';
            }
        });
    }
    
    // Set initial icon opacity based on current theme
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        document.querySelector('.moon-icon').style.opacity = '1';
        document.querySelector('.sun-icon').style.opacity = '0.5';
    } else {
        document.querySelector('.moon-icon').style.opacity = '0.5';
        document.querySelector('.sun-icon').style.opacity = '1';
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Page transition effect for all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('page-transition');
    });

    // Testimonial slider functionality
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialContainer && testimonialCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = testimonialCards[0].offsetWidth + 30; // Width + gap
        
        // Initialize testimonial slider
        function updateTestimonialSlider() {
            if (window.innerWidth <= 768) {
                // On mobile, just show the current testimonial
                testimonialCards.forEach((card, index) => {
                    card.style.display = index === currentIndex ? 'block' : 'none';
                });
            } else {
                // On desktop, scroll the container
                testimonialContainer.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        }
        
        // Initial update
        updateTestimonialSlider();
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentIndex < testimonialCards.length - 1) {
                    currentIndex++;
                    updateTestimonialSlider();
                }
            });
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateTestimonialSlider();
                }
            });
        }
        
        // Update on window resize
        window.addEventListener('resize', updateTestimonialSlider);
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
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

    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                highlightError(nameInput, 'Please enter your name');
                valid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                highlightError(emailInput, 'Please enter your email');
                valid = false;
            } else if (!isValidEmail(emailInput.value)) {
                highlightError(emailInput, 'Please enter a valid email');
                valid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightError(messageInput, 'Please enter your message');
                valid = false;
            } else {
                removeError(messageInput);
            }
            
            if (valid) {
                // In a real application, you would send the form data to a server here
                // For demo purposes, just show a success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                contactForm.reset();
                contactForm.appendChild(formMessage);
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper functions for form validation
    function highlightError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        input.parentElement.appendChild(errorElement);
    }
    
    function removeError(input) {
        input.classList.remove('error');
        
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add accessibility features
    document.querySelectorAll('.service-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        // Add keyboard navigation for service cards
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                // Simulate click or perform action
                card.classList.add('clicked');
                setTimeout(() => {
                    card.classList.remove('clicked');
                }, 200);
            }
        });
    });

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
        
        // Also make the toggle button clickable
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the question click
            item.classList.toggle('active');
        });
    });
});
