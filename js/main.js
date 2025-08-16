// Main JavaScript file for static site

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    let isMenuOpen = false;
    
    // Create mobile menu if it doesn't exist
    let mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu && mobileMenuButton) {
        // Create mobile menu dynamically
        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'fixed inset-x-0 top-[73px] bg-white border-b border-border p-4 md:hidden transform -translate-x-full transition-transform duration-300 z-50';
        mobileMenu.innerHTML = `
            <div class="flex flex-col gap-4">
                <button onclick="scrollToSection('home')" class="text-foreground hover:text-primary transition-colors font-medium block py-2 text-left">Home</button>
                <button onclick="scrollToSection('services')" class="text-foreground hover:text-primary transition-colors font-medium block py-2 text-left">Services</button>
                <button onclick="scrollToSection('about')" class="text-foreground hover:text-primary transition-colors font-medium block py-2 text-left">About</button>
                <button onclick="scrollToSection('team')" class="text-foreground hover:text-primary transition-colors font-medium block py-2 text-left">Team</button>
                <button onclick="scrollToSection('contact')" class="text-foreground hover:text-primary transition-colors font-medium block py-2 text-left">Contact</button>
                <button onclick="scrollToSection('contact')" class="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                    Get Started
                </button>
            </div>
        `;
        document.querySelector('header').appendChild(mobileMenu);
    }
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('-translate-x-full');
                mobileMenu.classList.add('translate-x-0');
            } else {
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
            }
        });
    }
    
    // Smooth scrolling function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // React appears to scroll to the exact top of the section
            // without any offset adjustment
            const offsetPosition = section.offsetTop;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (isMenuOpen && mobileMenu) {
                isMenuOpen = false;
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
            }
        }
    };
    
    // Add click handlers to navigation buttons
    const navButtons = document.querySelectorAll('nav button:not(.bg-primary)');
    const sections = ['home', 'services', 'about', 'team', 'contact'];
    
    navButtons.forEach((button, index) => {
        if (sections[index]) {
            button.addEventListener('click', function() {
                scrollToSection(sections[index]);
            });
        }
    });
    
    // Add click handler to Get Started button in header
    const headerGetStartedButton = document.querySelector('nav button.bg-primary');
    if (headerGetStartedButton) {
        headerGetStartedButton.addEventListener('click', function() {
            scrollToSection('contact');
        });
    }
    
    // Add click handlers to hero CTA buttons
    const exploreButton = document.querySelector('button:has-text("Explore Our Services")') || 
                         Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Explore Our Services'));
    const scheduleButton = document.querySelector('button:has-text("Schedule Consultation")') || 
                          Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Schedule Consultation'));
    
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            scrollToSection('services');
        });
    }
    
    if (scheduleButton) {
        scheduleButton.addEventListener('click', function() {
            scrollToSection('contact');
        });
    }
    
    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
        
        lastScroll = currentScroll;
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Add animation delay if specified
        const delay = el.style.animationDelay;
        if (delay) {
            el.style.transitionDelay = delay;
        }
        
        observer.observe(el);
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover\\:shadow-elevated');
    cards.forEach(card => {
        // CSS hover effects should handle this, but add JS backup
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add parallax effect for hero section
    const heroSection = document.querySelector('#home .bg-cover');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Add active state to navigation based on scroll position
    const sections2 = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav button');
    
    function updateActiveNavItem() {
        const scrollPosition = window.pageYOffset;
        
        sections2.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach((item, navIndex) => {
                    if (navIndex < sections.length && sections[navIndex] === sectionId) {
                        item.classList.add('text-primary');
                        item.classList.remove('text-foreground');
                    } else if (navIndex < sections.length) {
                        item.classList.remove('text-primary');
                        item.classList.add('text-foreground');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavItem);
    updateActiveNavItem();
    
    // Add smooth hover transitions
    document.querySelectorAll('[class*="hover:"]').forEach(element => {
        if (!element.style.transition) {
            element.style.transition = 'all 0.3s ease';
        }
    });
    
    // Handle Learn More button
    const learnMoreButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Learn More About Our Approach')
    );
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function() {
            scrollToSection('about');
        });
    }
    
    // Add floating animation to scroll indicator
    const scrollIndicator = document.querySelector('.animate-float');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToSection('services');
        });
        scrollIndicator.style.cursor = 'pointer';
    }
    
    // Handle footer navigation buttons
    const footerNavButtons = document.querySelectorAll('footer nav button');
    footerNavButtons.forEach((button, index) => {
        if (sections[index]) {
            button.addEventListener('click', function() {
                scrollToSection(sections[index]);
            });
        }
    });
    
    // Handle CTA buttons
    const startTransformButtons = document.querySelectorAll('button');
    startTransformButtons.forEach(button => {
        if (button.textContent.includes('Start Your Transformation Today')) {
            button.addEventListener('click', function() {
                scrollToSection('contact');
            });
        }
    });
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization for scroll events
const optimizedScroll = throttle(function() {
    // Scroll-based animations and effects are handled above
}, 100);

window.addEventListener('scroll', optimizedScroll);