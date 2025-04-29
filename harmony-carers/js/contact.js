document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordions
    initFAQAccordion();
    
    // Initialize contact form validation
    initContactForm();
});

/**
 * Initializes the FAQ accordion functionality
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');
        
        // Make both question and toggle clickable
        question.addEventListener('click', () => {
            toggleFAQ(item, answer);
        });
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the question click
            toggleFAQ(item, answer);
        });
    });
}

function toggleFAQ(item, answer) {
    const wasActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }
        }
    });

    // Toggle clicked item with smooth animation
    if (!wasActive) {
        item.classList.add('active');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    } else {
        item.classList.remove('active');
        if (answer) {
            answer.style.maxHeight = null;
        }
    }
}

/**
 * Initializes the contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showFormMessage('success', 'Thank you! Your message has been sent successfully.');
            
            // Reset form after successful submission
            contactForm.reset();
            
            // In a real implementation, you would submit the form data to a server here
            // For demonstration purposes, we're just showing a success message
            
            // Simulate form submission delay
            /*
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
            */
        }
    });
    
    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error messages as user types
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
    });
}

/**
 * Validates the entire form
 * @returns {boolean} - Whether the form is valid
 */
function validateForm() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validates a single input field
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    // Skip validation for non-required fields if empty
    if (!input.hasAttribute('required') && !input.value.trim()) {
        return true;
    }
    
    // Remove any existing error messages
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.classList.remove('is-invalid');
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate based on input type and name
    switch (input.name) {
        case 'name':
            if (!input.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your name';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!input.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your email address';
            } else if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (input.value.trim()) {
                // Only validate phone if provided (might not be required)
                const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
                if (!phoneRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }
            break;
            
        case 'subject':
            if (!input.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter a subject';
            }
            break;
            
        case 'message':
            if (!input.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your message';
            } else if (input.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Your message is too short';
            }
            break;
            
        case 'consent':
            if (!input.checked) {
                isValid = false;
                errorMessage = 'You must consent to our Privacy Policy';
            }
            break;
    }
    
    // Display error message if invalid
    if (!isValid) {
        input.classList.add('is-invalid');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        
        input.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

/**
 * Shows a form message (success/error)
 * @param {string} type - The message type ('success' or 'error')
 * @param {string} message - The message text
 */
function showFormMessage(type, message) {
    const contactForm = document.getElementById('contactForm');
    
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}-message`;
    messageElement.textContent = message;
    
    // Style based on type
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#721c24';
    }
    
    messageElement.style.padding = '15px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.marginBottom = '20px';
    
    // Insert at the top of the form
    contactForm.parentElement.insertBefore(messageElement, contactForm);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Initialize Google Map (this function would be called by the Google Maps API script)
function initMap() {
    // This function will be called when the Google Maps API is loaded
    // For demonstration purposes, we're not implementing the actual map initialization here
    // In a real implementation, you would create a map instance and set markers
    
    console.log('Google Maps initialized');
} 