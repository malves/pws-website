// ===================================
// Powerspace - JavaScript
// ===================================

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 500);
});

// Client Logos Slider (Swiper)
window.addEventListener('load', () => {
    if (document.querySelector('.client-slider')) {
        new Swiper('.client-slider', {
            slidesPerView: 'auto',
            spaceBetween: 100,
            speed: 3000,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            freeMode: true,
            allowTouchMove: false,
        });
    }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolling');
    } else {
        header.classList.remove('scrolling');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (mainNav) {
                mainNav.classList.remove('active');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Tab Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const activeContent = document.querySelector(`[data-content="${tabId}"]`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});

// Pricing Toggle (Monthly/Annual)
const pricingToggle = document.getElementById('pricingToggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        if (pricingToggle.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'block');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'block');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// Form Submission (Hero Form)
const heroForm = document.querySelector('.hero-form');
if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = heroForm.querySelector('input[type="email"]').value;
        
        if (email && validateEmail(email)) {
            window.location.href = `signup.html?email=${encodeURIComponent(email)}`;
        } else {
            alert('Veuillez entrer une adresse email valide.');
        }
    });
}

// Email Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.feature-card, .content-section, .testimonial-card, .pricing-card');
animateElements.forEach(element => {
    observer.observe(element);
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--color-powerspace);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(129, 53, 163, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover Effect Enhancement for Cards
const cards = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add Loading Animation Class
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.hero-content > *, .section-header');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});

// GSAP Tilt Image Effect (Dashboard Screenshot)
if (typeof gsap !== 'undefined' && document.querySelector('.tilt-img')) {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.set('.tilt-img', {
        rotateX: 0,
        scale: 1,
        autoAlpha: 1,
        transformOrigin: 'center center',
    });
    
    gsap.fromTo(
        '.tilt-img',
        {
            scale: 0.95,
            autoAlpha: 0.9,
        },
        {
            scale: 1,
            autoAlpha: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.tilt-img',
                start: 'top 80%',
                end: 'top 30%',
                scrub: true,
            },
        }
    );
}

// Console Log
console.log('%c🚀 Powerspace - Publicité Native sur Newsletters', 'font-size: 20px; color: rgb(129, 53, 163); font-weight: bold;');
console.log('%cSite développé avec ❤️', 'font-size: 14px; color: #6b7280;');
