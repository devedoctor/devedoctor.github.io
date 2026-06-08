// ==========================================
// Mohamed Abdou Portfolio - JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initTypewriter();
    initScrollAnimations();
    initCounterAnimation();
    initSkillBars();
    initBackToTop();
    initSmoothScroll();
    initContactForm();
    initParallaxEffect();
    initThemeToggle();
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// ==========================================
// Typewriter Effect
// ==========================================
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const roles = [
        'Pharmacist & Full-Stack Developer',
        'HealthTech Specialist',
        '.NET Developer',
        'SQL Database Expert',
        'PMS Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// ==========================================
// Scroll Animations (AOS-like)
// ==========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// Counter Animation
// ==========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// Skill Bars Animation
// ==========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// Back to Top Button
// ==========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
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

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Contact Form Handling
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            
            // Send data to Formspree
            fetch('https://formspree.io/f/xqkyzkyv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Thank you for your message! I will get back to you soon.', 'success');
                    form.reset();
                } else {
                    showNotification('There was an error sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification('There was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
}

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 15px 25px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
        z-index: 9999;
        transform: translateX(150%);
        transition: transform 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ==========================================
// Service Cards Tilt Effect
// ==========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// Project Cards Hover Effect
// ==========================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.project-icon-bg');
        if (icon) {
            icon.style.animation = 'pulse 1s infinite';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.project-icon-bg');
        if (icon) {
            icon.style.animation = '';
        }
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1.2); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(style);

// ==========================================
// Active Navigation Link on Scroll
// ==========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Preloader
// ==========================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});



// Initialize typing effect on hero title
const heroTitle = document.querySelector('.hero-title .gradient-text');
if (heroTitle) {
    const phrase = 'Mohamed Abdou';
    let charIndex = 0;
    let typingSpeed = 300;

    function typeWriter() {
        if (charIndex < phrase.length) {
            heroTitle.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Start typing effect
    setTimeout(typeWriter, 2000);
}

// ==========================================
// Magnetic Button Effect
// ==========================================
document.querySelectorAll('.btn-primary-custom, .btn-outline-custom').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// Skill Card Flip Effect
// ==========================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'rotateY(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 600);
    });
});

// ==========================================
// Timeline Animation Enhancement
// ==========================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.timeline-content').style.borderLeft = '4px solid var(--primary-color)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.timeline-content').style.borderLeft = '1px solid var(--border-color)';
    });
});

// ==========================================
// Form Input Animation
// ==========================================
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ==========================================
// Scroll Velocity Detection for Performance
// ==========================================
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const currentScrollY = window.scrollY;
            const velocity = currentScrollY - lastScrollY;
            
            // Add velocity-based effects
            document.body.style.setProperty('--scroll-velocity', velocity);
            
            lastScrollY = currentScrollY;
            ticking = false;
        });
        
        ticking = true;
    }
});

// ==========================================
// Easter Egg - Konami Code
// ==========================================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ==========================================
// Theme Toggle
// ==========================================
function initThemeToggle() {
    const themeToggleNavbar = document.getElementById('theme-toggle-navbar');
    const themeToggleFooter = document.getElementById('theme-toggle-footer');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Theme toggle functions
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }
    
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icons on all theme toggle buttons
        const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        const buttons = document.querySelectorAll('.theme-toggle-btn');
        buttons.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.className = `fas ${iconClass}`;
        });
    }
    
    // Event listeners for both buttons
    if (themeToggleNavbar) {
        themeToggleNavbar.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleFooter) {
        themeToggleFooter.addEventListener('click', toggleTheme);
    }
}

function activateEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg)';
    showNotification('🎉 Easter Egg Activated! You found the secret!', 'success');
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 3000);
}

console.log('%c👋 Welcome to Mohamed Abdou\'s Portfolio!', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%c💻 Looking for a HealthTech Specialist?', 'font-size: 16px; color: #6366f1;');
console.log('%c📧 Contact: Developerpharmacist@gmail.com', 'font-size: 14px; color: #a78bfa;');
