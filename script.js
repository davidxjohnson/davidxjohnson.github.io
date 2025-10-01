// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', highlightActiveSection);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe project cards and case study cards
    const animatedElements = document.querySelectorAll('.project-card, .case-study-card, .cert-section, .stat');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Technology badge hover effects
    const techBadges = document.querySelectorAll('.tech-badge, .tech-tag');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Project card click tracking (for analytics)
    const projectLinks = document.querySelectorAll('.project-card a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            console.log(`Clicked project: ${projectName}`);
            // Here you could add analytics tracking
        });
    });

    // Mobile menu toggle (if needed later)
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        // Check if mobile menu button already exists
        if (nav.querySelector('.mobile-menu-toggle')) return;
        
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.style.display = 'none';
        
        nav.querySelector('.nav-container').appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            const icon = this.querySelector('i');
            icon.className = navMenu.classList.contains('mobile-open') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    // Responsive menu handling
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            createMobileMenu();
            document.querySelector('.mobile-menu-toggle').style.display = 'block';
        } else {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.style.display = 'none';
            }
            document.querySelector('.nav-menu').classList.remove('mobile-open');
        }
    }

    // Initial check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    function debounceScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightActiveSection, 10);
    }

    window.removeEventListener('scroll', highlightActiveSection);
    window.addEventListener('scroll', debounceScroll);

    // Initialize page
    console.log('Portfolio loaded successfully');
});

// Add CSS for animations
const animationStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-menu a.active {
        color: var(--primary-blue);
    }

    .nav-menu a.active::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .mobile-menu-toggle {
            background: none;
            border: none;
            color: var(--gray-600);
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0.5rem;
        }

        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            box-shadow: var(--shadow-lg);
            border-top: 1px solid var(--gray-200);
            display: none;
            padding: var(--spacing-lg);
        }

        .nav-menu.mobile-open {
            display: flex;
        }

        .nav-menu li {
            margin: var(--spacing-sm) 0;
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);