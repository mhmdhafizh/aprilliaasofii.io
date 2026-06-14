// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu && navMenu.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill bars and other animatable elements
document.querySelectorAll('.skill-progress, .project-card, .timeline-item, .stat-card').forEach(el => {
    observer.observe(el);
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            showMessage('Mohon isi semua field terlebih dahulu', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Mohon masukkan email yang valid', 'error');
            return;
        }

        // Simulate sending (In real scenario, you'd send to a server)
        setTimeout(() => {
            // Show success message
            showMessage('Terima kasih! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 800);
    });
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
    formMessage.style.display = 'block';
}

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', function() {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight);
    
    // Update navbar appearance on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, finalValue, duration = 2000) {
    let startValue = 0;
    const increment = finalValue / (duration / 16);
    
    const counter = setInterval(() => {
        startValue += increment;
        if (startValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(startValue) + '+';
        }
    }, 16);
}

// Animate stat counters when they come into view
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;
            const value = parseInt(text);
            
            if (!isNaN(value)) {
                animateCounter(number, value, 1500);
            }
        }
    });
}, observerOptions);

statCards.forEach(card => statsObserver.observe(card));

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }
});

// ===== PARALLAX EFFECT (Optional Enhancement) =====
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.animated-bg');
    parallaxElements.forEach(el => {
        const scrollPosition = window.pageYOffset;
        el.style.transform = `translateY(calc(-50% + ${scrollPosition * 0.5}px))`;
    });
});

// ===== THEME PREFERENCES =====
// Check for saved theme preference or default to light mode
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Apply theme based on user preference
if (prefersDarkScheme.matches) {
    // Optional: Add dark mode support
    // document.body.classList.add('dark-theme');
}

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Trigger animations for elements that are already in viewport
    const observedElements = document.querySelectorAll('.skill-progress, .project-card, .timeline-item, .stat-card');
    observedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('in-view');
        }
    });
});

// ===== UTILITY FUNCTIONS =====
// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== PRINT OPTIMIZATION =====
window.addEventListener('beforeprint', function() {
    // Hide unnecessary elements for printing
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
});

window.addEventListener('afterprint', function() {
    // Show elements again after printing
    document.querySelector('.navbar').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
});

// ===== PERFORMANCE: Reduce animations on slower devices =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// ===== WELCOME MESSAGE =====
console.log('%c Welcome to Sofi\'s Portfolio! 🎨', 
    'font-size: 16px; color: #ff6b9d; font-weight: bold;');
console.log('%c Made with passion and attention to detail ❤️', 
    'font-size: 12px; color: #1a4d4d;');

// ===== ACTIVE NAVIGATION STYLING =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== SMOOTH TRANSITIONS ON PAGE LOAD =====
document.body.style.opacity = '0';
window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
});