// Smooth scroll voor navigatie links
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

// Verbeterde scroll animaties
const scrollAnimations = () => {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optioneel: stop met observeren na animatie
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    elements.forEach(element => observer.observe(element));
};

// Verbeterde parallax effect
const parallaxEffect = () => {
    const hero = document.querySelector('.hero');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.scrollY;
        const speed = 0.5;
        const opacity = 1 - (scrolled / 700);
        
        hero.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        hero.style.opacity = opacity;
        
        lastScrollY = scrolled;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
            });
            ticking = true;
        }
    }, { passive: true });
};

// Verbeterde header scroll effect
const headerEffect = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled', 'scroll-up');
        } else {
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down', 'scrolled');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up', 'scrolled');
            }
        }
        
        lastScroll = currentScroll;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
            });
            ticking = true;
        }
    }, { passive: true });
};

// Initialiseer alle animaties
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations();
    parallaxEffect();
    headerEffect();
});

// Animeer stats wanneer in beeld
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    observer.observe(stat);
});

// Hamburger menu functionaliteit
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Sluit menu bij klikken op link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sluit menu bij klikken buiten menu
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Dynamisch copyright jaar
document.addEventListener('DOMContentLoaded', () => {
    const copyrightYear = document.querySelector('.footer-info p');
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = `&copy; ${currentYear} Jeffrey Buis. Alle rechten voorbehouden.<br>Made by Nigel Becholtz`;
});

// Scroll to top functionality
const scrollTop = document.querySelector('.scroll-top');

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

// Smooth scroll to top when clicked
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});