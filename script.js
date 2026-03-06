// ===========================
// DOM ELEMENTS
// ===========================

const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const signupModal = document.getElementById('signupModal');
const ctaButton = document.getElementById('ctaButton');
const closeModalBtn = document.getElementById('closeModal');
const signupForm = document.getElementById('signupForm');
const featureCards = document.querySelectorAll('.feature-card');

// ===========================
// FAQ ACCORDION
// ===========================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const faqContent = faqItem.querySelector('.faq-content-text');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-header').forEach(header => {
        if (header !== button) {
            header.classList.remove('active');
            header.parentElement.querySelector('.faq-content-text').classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    button.classList.toggle('active');
    faqContent.classList.toggle('active');
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top on button click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// MODAL FUNCTIONALITY
// ===========================

// Open modal when CTA button is clicked
ctaButton.addEventListener('click', () => {
    signupModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', () => {
    signupModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the modal content
signupModal.addEventListener('click', (event) => {
    if (event.target === signupModal) {
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && signupModal.classList.contains('active')) {
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// ===========================
// FORM HANDLING
// ===========================

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData);

    // Log the form data (in a real application, you'd send this to a server)
    console.log('Quote request submitted with data:', data);

    // Show success message
    alert(`Thank you for requesting a quote, ${data.fullName}! Our team will contact you at ${data.phone} within 24 hours.`);

    // Reset form
    signupForm.reset();

    // Close modal
    signupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

// Intersection Observer for feature card animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add animation when element comes into view
            entry.target.classList.add('fade-in');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards
featureCards.forEach((card) => {
    observer.observe(card);
});

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        
        // Check if it's an anchor link
        if (href.startsWith('#')) {
            event.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The limit time in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// ADDITIONAL ENHANCEMENTS
// ===========================

// Add fade-in animation to hero content on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.animation = 'fadeInUp 0.8s ease';
});

// Log page performance metrics (optional - for debugging)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded successfully in ${pageLoadTime}ms`);
    });
}

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add keyboard navigation support
document.addEventListener('keydown', (event) => {
    // Tab key navigation for buttons
    if (event.key === 'Tab') {
        // Browser handles tab navigation by default
    }

    // Enter key for button clicks
    if (event.key === 'Enter') {
        if (document.activeElement === ctaButton) {
            ctaButton.click();
        }
    }
});

// ===========================
// INITIALIZATION
// ===========================

console.log('CoreCleen Solutions Ltd - Professional Cleaning Services');
console.log('All scripts loaded successfully!');
