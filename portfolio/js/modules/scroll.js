// Smooth scroll and active section highlight
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[data-section]');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            updateActiveLink(link.getAttribute('data-section'));
        }
    });
});

// Update active nav link based on scroll position
function updateActiveLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for section visibility
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            updateActiveLink(sectionId);
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Close menu when clicking outside
    if (navList.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});

function closeMenuOnClickOutside(e) {
    if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});