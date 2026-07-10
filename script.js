// ============================================
// Fearless Kits — Main JavaScript
// ============================================

// Product Data
const products = [
    {
        id: 1,
        name: "Navy Gold Edition",
        club: "Inter Milan",
        league: "serie-a",
        type: "Home Kit 24/25",
        price: "৳1,299",
        image: "images/hero-jersey.png",
        badge: "Hot",
        badgeType: "hot"
    },
    {
        id: 2,
        name: "Devil's Red",
        club: "Manchester United",
        league: "premier-league",
        type: "Home Kit 24/25",
        price: "৳1,299",
        image: "images/jersey-red.png",
        badge: "Popular",
        badgeType: "popular"
    },
    {
        id: 3,
        name: "Royal White",
        club: "Real Madrid",
        league: "la-liga",
        type: "Home Kit 24/25",
        price: "৳1,399",
        image: "images/jersey-white.png",
        badge: "New",
        badgeType: "new"
    },
    {
        id: 4,
        name: "Shadow Black",
        club: "Juventus",
        league: "serie-a",
        type: "Third Kit 24/25",
        price: "৳1,299",
        image: "images/jersey-black.png",
        badge: "",
        badgeType: ""
    },
    {
        id: 5,
        name: "Sky Blue",
        club: "Manchester City",
        league: "premier-league",
        type: "Home Kit 24/25",
        price: "৳1,399",
        image: "images/jersey-blue.png",
        badge: "Bestseller",
        badgeType: "popular"
    },
    {
        id: 6,
        name: "Samba Gold",
        club: "Brazil",
        league: "national",
        type: "Home Kit 2024",
        price: "৳1,499",
        image: "images/jersey-yellow.png",
        badge: "Limited",
        badgeType: "hot"
    }
];

// ============================================
// Preloader
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.add('loaded');
        initAnimations();
        animateCounters();
    }, 1500);
});

// ============================================
// Navbar
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled state
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
    
    // Active nav link
    updateActiveNavLink();
    
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Back to Top
// ============================================
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// Products Grid
// ============================================
function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid');
    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.league === filter);
    
    grid.innerHTML = filtered.map((product, index) => `
        <div class="product-card" data-animate="fade-up" data-delay="${index * 80}" style="animation-delay: ${index * 0.08}s">
            <div class="product-image-wrapper">
                ${product.badge ? `<span class="product-badge ${product.badgeType}">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name} - ${product.club} Player Edition Jersey" class="product-image" loading="lazy">
                <div class="product-overlay">
                    <a href="#contact" class="product-order-btn">Order Now</a>
                </div>
            </div>
            <div class="product-info">
                <span class="product-club">${product.club}</span>
                <h3 class="product-name">${product.name}</h3>
                <span class="product-type">${product.type}</span>
                <div class="product-bottom">
                    <span class="product-price">${product.price}</span>
                    <span class="product-tag">Player Edition</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-observe new elements
    observeElements();
}

// Filter tabs
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        const grid = document.getElementById('products-grid');
        
        // Fade out
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            renderProducts(filter);
            // Fade in
            requestAnimationFrame(() => {
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            });
        }, 300);
    });
});

// Initial render
renderProducts();

// ============================================
// Scroll Animations
// ============================================
function initAnimations() {
    observeElements();
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        if (!el.classList.contains('animated')) {
            observer.observe(el);
        }
    });
}

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 25);
}

// ============================================
// Particles Background
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        container.appendChild(particle);
    }
}

createParticles();

// ============================================
// Hero Image Parallax
// ============================================
const heroImg = document.getElementById('hero-jersey-img');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        if (heroImg && scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * 0.15}px) rotate(${scrolled * 0.02}deg)`;
        }
    }
});

// Mouse parallax on hero
const heroSection = document.querySelector('.hero');

if (window.innerWidth > 1024) {
    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        
        if (heroImg) {
            heroImg.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        if (heroImg) {
            heroImg.style.transform = 'rotateY(0deg) rotateX(0deg)';
            heroImg.style.transition = 'transform 0.5s ease';
        }
    });
    
    heroSection.addEventListener('mouseenter', () => {
        if (heroImg) {
            heroImg.style.transition = 'none';
        }
    });
}

// ============================================
// Contact Form
// ============================================
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('form-submit');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.classList.add('success');
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.disabled = false;
            btn.classList.remove('success');
            document.getElementById('contact-form').reset();
        }, 3000);
    }, 1500);
});

// ============================================
// Marquee pause on hover
// ============================================
const marquee = document.querySelector('.marquee');
if (marquee) {
    marquee.addEventListener('mouseenter', () => {
        marquee.querySelector('.marquee-content').style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
        marquee.querySelector('.marquee-content').style.animationPlayState = 'running';
    });
}

// ============================================
// About Cards hover effect
// ============================================
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        aboutCards.forEach(c => c.classList.add('spread'));
    });
    card.addEventListener('mouseleave', () => {
        aboutCards.forEach(c => c.classList.remove('spread'));
    });
});
