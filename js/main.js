// Minimal Academic Portfolio - JavaScript
// Clean and essential interactions only

(function() {
    'use strict';

    // DOM Elements
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Utility Functions
    const throttle = (func, limit) => {
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
    };

    // Navigation Scroll Effect
    const handleNavScroll = () => {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    };

    // Active Navigation Link Highlighting
    const updateActiveNavLink = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    // Smooth Scrolling for Navigation Links
    const initSmoothScrolling = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Simple Button Hover Effects
    const initButtonEffects = () => {
        // 保持原生的CSS hover效果，不添加过多的JavaScript动画
    };

    // Intersection Observer for Fade-in Animations
    const initScrollAnimations = () => {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            const animatedElements = document.querySelectorAll(
                '.publication, .background-section, .contact-item'
            );
            
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        }
    };

    // External Links Security
    const initExternalLinks = () => {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');
        });
    };

    // Initialize all functionality
    const init = () => {
        initSmoothScrolling();
        initButtonEffects();
        initScrollAnimations();
        initExternalLinks();
        
        // Event listeners with throttling
        window.addEventListener('scroll', throttle(() => {
            handleNavScroll();
            updateActiveNavLink();
        }, 16));
        
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('research').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('publications').scrollIntoView({ behavior: 'smooth' });
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
        });
        
        console.log('✨ Minimal portfolio initialized');
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
