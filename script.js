/* ============================================================
   Fearless Kits v2 — Main JavaScript
   Premium Football Jersey Ecommerce Showcase
   Vanilla JS · No Dependencies
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   0. PRODUCT DATA
   ---------------------------------------------------------- */
const products = [
    {
        id: 1,
        name: 'Real Madrid Home Kit 26/27',
        club: 'Real Madrid',
        league: 'la-liga',
        type: 'Player Edition',
        price: '৳1,299',
        priceNum: 1299,
        images: ['images/real-madrid-home.png', 'images/rma_home_1.JPG', 'images/rma_home_2.JPG'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        badge: 'Bestseller',
        badgeType: 'popular',
        description: 'Real Madrid 2026/27 Home Kit Player Edition. Iconic white with gold accents. Emirates Fly Better sponsor.'
    },
    {
        id: 2,
        name: 'Barcelona Home Kit 26/27',
        club: 'FC Barcelona',
        league: 'la-liga',
        type: 'Player Edition',
        price: '৳1,299',
        priceNum: 1299,
        images: ['images/jersey-red.png', 'images/bar_home_1.JPG', 'images/bar_home_2.JPG'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        badge: 'Hot',
        badgeType: 'hot',
        description: 'FC Barcelona 2026/27 Home Kit Player Edition. Classic blaugrana stripes with Spotify sponsor.'
    },
    {
        id: 3,
        name: 'Barcelona Away Kit 26/27',
        club: 'FC Barcelona',
        league: 'la-liga',
        type: 'Player Edition',
        price: '৳1,299',
        priceNum: 1299,
        images: ['images/jersey-yellow.png', 'images/bar_away_1.JPG', 'images/bar_away_2.JPG'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        badge: 'New',
        badgeType: 'new',
        description: 'FC Barcelona 2026/27 Away Kit Player Edition. Stunning golden design with Spotify sponsor.'
    },
    {
        id: 4,
        name: 'Man City Home Kit 26/27',
        club: 'Manchester City',
        league: 'premier-league',
        type: 'Player Edition',
        price: '৳1,299',
        priceNum: 1299,
        images: ['images/jersey-blue.png', 'images/city_home_1.JPG', 'images/city_home_2.JPG'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        badge: 'New',
        badgeType: 'new',
        description: 'Manchester City 2026/27 Home Kit Player Edition. Premium breathable fabric with authentic Etihad Airways sponsor.'
    },
    {
        id: 5,
        name: 'PSG Jordan Special Kit 26/27',
        club: 'Paris Saint-Germain',
        league: 'ligue-1',
        type: 'Player Edition',
        price: '৳1,299',
        priceNum: 1299,
        images: ['images/jersey-black.png', 'images/psg_special_1.JPG', 'images/psg_special_2.JPG'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        badge: 'Limited',
        badgeType: 'hot',
        description: 'PSG 2026/27 Jordan Special Edition. Premium black with Jumpman logo. Limited availability.'
    },
    {
        id: 6, // Make sure this is a unique number for every new jersey
        name: 'Liverpool Home Kit 26/27',
        club: 'Liverpool',
        league: 'premier-league', // This must match the filter category exactly
        type: 'Player Edition',
        price: '৳1,299',
        priceNum: 1299,
        images: [
            'images/liverpool-home-1.png', 
            'images/liverpool-home-2.png', 
            'images/liverpool-home-3.png'
        ], // Update these to match your actual image file names
        sizes: ['M', 'L', 'XL', 'XXL'],
        
        // This creates your upper tag!
        badge: 'Coming Soon', 
        
        // This sets the tag's color. Options are 'hot' (red), 'new' (green), or 'popular' (gold)
        badgeType: 'popular', 
        
        description: 'Liverpool 2026/27 Home Kit Player Edition. Premium breathable fabric. This item is coming soon.'
    }
];

/* ----------------------------------------------------------
   Facebook links used across the site
   ---------------------------------------------------------- */
const FB_PAGE_URL  = 'https://www.facebook.com/fearlesskits';
const FB_MESSENGER = 'https://m.me/fearlesskits';
const INSTAGRAM_URL = 'https://www.instagram.com/fearlesskits/';

/* ----------------------------------------------------------
   1. PRELOADER
   ---------------------------------------------------------- */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Guarantee a minimum 1.5s display time
    const MIN_DISPLAY = 1500;
    const start = Date.now();

    function hidePreloader() {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_DISPLAY - elapsed);

        setTimeout(() => {
            preloader.classList.add('preloader--hidden');
            document.body.classList.remove('no-scroll');
            initScrollAnimations();   // kick off reveals once content is visible
            animateHeroCounters();
        }, remaining);
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
}

/* ----------------------------------------------------------
   2. NAVBAR
   ---------------------------------------------------------- */
function initNavbar() {
    const nav       = document.querySelector('.navbar');
    const links     = document.querySelectorAll('.nav-link[href^="#"]');
    const sections  = document.querySelectorAll('section[id]');
    const burger    = document.querySelector('.nav-toggle, #nav-toggle');
    const mobileNav = document.querySelector('.mobile-menu-overlay, #mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu-overlay a, .mobile-link');

    if (!nav) return;

    let lastScroll = 0;
    let ticking    = false;

    /* --- Scroll show/hide + glassmorphism --- */
    function onScroll() {
        const scrollY = window.scrollY;

        // Add glassmorphism after scrolling past hero
        if (scrollY > 80) {
            nav.classList.add('navbar--scrolled');
        } else {
            nav.classList.remove('navbar--scrolled');
        }

        // Hide on scroll-down, show on scroll-up (after 300px)
        if (scrollY > 300) {
            if (scrollY > lastScroll + 5) {
                nav.classList.add('navbar--hidden');
            } else if (scrollY < lastScroll - 5) {
                nav.classList.remove('navbar--hidden');
            }
        } else {
            nav.classList.remove('navbar--hidden');
        }

        lastScroll = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    /* --- Active section highlighting --- */
    function highlightActive() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.id;
        });
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
    window.addEventListener('scroll', highlightActive, { passive: true });
    highlightActive();

    /* --- Smooth scrolling for anchor links --- */
    function smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile nav if open
        closeMobileNav();
    }
    links.forEach(l => l.addEventListener('click', smoothScroll));
    mobileLinks.forEach(l => l.addEventListener('click', smoothScroll));

    /* --- Mobile hamburger --- */
    function openMobileNav() {
        if (mobileNav) {
            mobileNav.classList.add('open');
            document.body.classList.add('no-scroll');
        }
        if (burger) burger.classList.add('active');
    }
    function closeMobileNav() {
        if (mobileNav) {
            mobileNav.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
        if (burger) burger.classList.remove('active');
    }

    if (burger) {
        burger.addEventListener('click', () => {
            const isOpen = mobileNav && mobileNav.classList.contains('open');
            isOpen ? closeMobileNav() : openMobileNav();
        });
    }
}

/* ----------------------------------------------------------
   3. HERO — Floating Jerseys & Mouse Parallax & Counters
   ---------------------------------------------------------- */
function initHero() {
    const hero = document.querySelector('.hero, #hero');
    if (!hero) return;

    /* --- Floating jersey images (4 floating elements) --- */
    const floatingContainer = hero.querySelector('.hero-floating, .floating-jerseys');
    if (floatingContainer) {
        const floatImages = floatingContainer.querySelectorAll('img, .float-jersey');
        // Each jersey gets a unique animation delay & duration via CSS.
        // JS adds random initial positions for variety.
        floatImages.forEach((img, i) => {
            img.style.animationDelay  = `${i * 0.7}s`;
            img.style.animationDuration = `${4 + i * 0.8}s`;
        });
    }

    /* --- Mouse parallax on desktop --- */
    if (window.matchMedia('(pointer: fine)').matches) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const cx = (clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
            const cy = (clientY / window.innerHeight - 0.5) * 2;

            const layers = hero.querySelectorAll('[data-parallax]');
            layers.forEach(layer => {
                const speed = parseFloat(layer.dataset.parallax) || 20;
                const x = cx * speed;
                const y = cy * speed;
                layer.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

/* --- Counter animation --- */
function animateHeroCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;

        const duration = 2000; // ms
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            // Ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            current = Math.floor(eased * target);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}

/* ----------------------------------------------------------
   4. PRODUCT GRID — Filtering & Rendering
   ---------------------------------------------------------- */
function initProductGrid() {
    const grid      = document.querySelector('.products-grid, #products-grid');
    const filterBar = document.querySelector('.filter-tabs, .product-filters');
    if (!grid) return;

    let activeFilter = 'all';

    /* --- Render cards --- */
    function renderProducts(filter) {
        const filtered = filter === 'all'
            ? products
            : products.filter(p => p.league === filter);

        // Fade-out existing cards
        grid.classList.add('grid--fading');

        setTimeout(() => {
            grid.innerHTML = '';

            filtered.forEach((p, i) => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.style.animationDelay = `${i * 0.08}s`;
                card.dataset.id = p.id;

                card.innerHTML = `
                    <div class="product-card__image-wrap">
                        <span class="product-badge product-badge--${p.badgeType}">${p.badge}</span>
                        <img src="${p.images[0]}" alt="${p.name}" class="product-card__img" loading="lazy">
                        <div class="product-card__overlay">
                            <button class="btn-quick-view" data-id="${p.id}">Quick View</button>
                        </div>
                    </div>
                    <div class="product-card__info">
                        <span class="product-card__club">${p.club}</span>
                        <h3 class="product-card__name">${p.name}</h3>
                        <span class="product-card__type">${p.type}</span>
                        <div class="product-card__footer">
                            <span class="product-card__price">${p.price}</span>
                            <button class="btn-order-now" data-id="${p.id}">Order Now</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });

            // Bind quick-view buttons
            grid.querySelectorAll('.btn-quick-view').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openQuickView(parseInt(btn.dataset.id, 10));
                });
            });

            // Clicking the card itself also opens quick view
            grid.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', () => {
                    openQuickView(parseInt(card.dataset.id, 10));
                });
            });

            // Bind Order Now buttons
            grid.querySelectorAll('.btn-order-now').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.open(FB_MESSENGER, '_blank');
                });
            });

            grid.classList.remove('grid--fading');
        }, 300);
    }

    /* --- Filter tabs --- */
    if (filterBar) {
        const tabs = filterBar.querySelectorAll('[data-filter]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeFilter = tab.dataset.filter;
                renderProducts(activeFilter);
            });
        });
    }

    // Initial render
    renderProducts('all');
}

/* ----------------------------------------------------------
   5. PRODUCT QUICK-VIEW MODAL
   ---------------------------------------------------------- */
function createQuickViewModal() {
    // Only create once
    if (document.getElementById('quick-view-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'quick-view-modal';
    modal.className = 'qv-modal';
    modal.innerHTML = `
        <div class="qv-modal__backdrop"></div>
        <div class="qv-modal__container">
            <button class="qv-modal__close" aria-label="Close">&times;</button>
            <div class="qv-modal__body">
                <!-- Gallery -->
                <div class="qv-gallery">
                    <div class="qv-gallery__main">
                        <img id="qv-main-img" src="" alt="Product Image">
                    </div>
                    <div class="qv-gallery__thumbs" id="qv-thumbs"></div>
                </div>
                <!-- Details -->
                <div class="qv-details">
                    <span class="qv-details__club" id="qv-club"></span>
                    <h2 class="qv-details__name" id="qv-name"></h2>
                    <span class="qv-details__type" id="qv-type"></span>
                    <p class="qv-details__price" id="qv-price"></p>
                    <p class="qv-details__desc" id="qv-desc"></p>

                    <div class="qv-details__sizes">
                        <span class="qv-details__label">Select Size:</span>
                        <div class="qv-size-options" id="qv-sizes"></div>
                    </div>

                    <div class="qv-details__actions">
                        <a href="${FB_PAGE_URL}" target="_blank" rel="noopener" class="btn btn--primary btn--fb-order">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                            Order on Facebook
                        </a>
                        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" class="btn btn--secondary btn--insta-order">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            Order on Instagram
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close handlers
    modal.querySelector('.qv-modal__close').addEventListener('click', closeQuickView);
    modal.querySelector('.qv-modal__backdrop').addEventListener('click', closeQuickView);

    // Instagram button — already an <a> tag, no extra JS needed

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeQuickView();
    });
}

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    createQuickViewModal(); // ensure it exists

    const modal   = document.getElementById('quick-view-modal');
    const mainImg = document.getElementById('qv-main-img');
    const thumbs  = document.getElementById('qv-thumbs');
    const sizes   = document.getElementById('qv-sizes');

    // Populate details
    document.getElementById('qv-name').textContent  = product.name;
    document.getElementById('qv-club').textContent  = product.club;
    document.getElementById('qv-type').textContent  = product.type;
    document.getElementById('qv-price').textContent = product.price;
    document.getElementById('qv-desc').textContent  = product.description;

    // Gallery — main image
    mainImg.src = product.images[0];
    mainImg.alt = product.name;

    // Gallery — thumbnails
    thumbs.innerHTML = '';
    product.images.forEach((src, i) => {
        const thumb = document.createElement('button');
        thumb.className = 'qv-thumb' + (i === 0 ? ' qv-thumb--active' : '');
        thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${i + 1}">`;
        thumb.addEventListener('click', () => {
            mainImg.src = src;
            // Toggle active class
            thumbs.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('qv-thumb--active'));
            thumb.classList.add('qv-thumb--active');
        });
        thumbs.appendChild(thumb);
    });

    // Size selector
    sizes.innerHTML = '';
    product.sizes.forEach((size, i) => {
        const btn = document.createElement('button');
        btn.className = 'qv-size-btn' + (i === 0 ? ' qv-size-btn--active' : '');
        btn.textContent = size;
        btn.addEventListener('click', () => {
            sizes.querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('qv-size-btn--active'));
            btn.classList.add('qv-size-btn--active');
        });
        sizes.appendChild(btn);
    });

    // Open with animation
    requestAnimationFrame(() => {
        modal.classList.add('qv-modal--open');
        document.body.classList.add('no-scroll');
    });
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    modal.classList.remove('qv-modal--open');
    modal.classList.add('qv-modal--closing');

    // Wait for CSS exit animation
    setTimeout(() => {
        modal.classList.remove('qv-modal--closing');
        document.body.classList.remove('no-scroll');
    }, 350);
}

/* ----------------------------------------------------------
   6. CONTACT FORM — Google Forms Integration
   ---------------------------------------------------------- */
function initContactForm() {
    const form = document.querySelector('#contact-form, .contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = form.querySelector('[name="name"]');
        const phone   = form.querySelector('[name="phone"]');
        const message = form.querySelector('[name="message"]');

        if (!name || !phone || !message) return;

        // Validate basic fields
        if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
            showFormFeedback(form, 'Please fill in all fields.', 'error');
            return;
        }

        // Open the Google Form directly for the user to submit
        const GOOGLE_FORM_URL = 'https://forms.gle/2UpxvxSAq6jdkPqx7';
        window.open(GOOGLE_FORM_URL, '_blank');

        // Reset form & show success
        form.reset();
        showFormFeedback(form, 'Google Form opened! Please submit your inquiry there.', 'success');
    });
}

/**
 * Show an animated feedback message below the form.
 */
function showFormFeedback(form, text, type) {
    // Remove any existing feedback
    const old = form.querySelector('.form-feedback');
    if (old) old.remove();

    const el = document.createElement('div');
    el.className = `form-feedback form-feedback--${type}`;
    el.innerHTML = type === 'success'
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M20 6L9 17l-5-5"/>
           </svg> <span>${text}</span>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
           </svg> <span>${text}</span>`;

    form.appendChild(el);

    // Trigger entrance animation
    requestAnimationFrame(() => el.classList.add('form-feedback--visible'));

    // Auto-dismiss after 5s
    setTimeout(() => {
        el.classList.remove('form-feedback--visible');
        setTimeout(() => el.remove(), 400);
    }, 5000);
}

/* ----------------------------------------------------------
   7. PARTICLES BACKGROUND
   ---------------------------------------------------------- */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Create a canvas inside the particles div
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 45;
    let animId;

    function resize() {
        width  = canvas.width  = canvas.parentElement.clientWidth  || window.innerWidth;
        height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x       = Math.random() * width;
            this.y       = Math.random() * height;
            this.radius  = Math.random() * 2.5 + 0.5;
            this.speedX  = (Math.random() - 0.5) * 0.4;
            this.speedY  = -(Math.random() * 0.5 + 0.15); // drift upward
            this.opacity = Math.random() * 0.5 + 0.2;
            this.life    = 0;
            this.maxLife = Math.random() * 300 + 200;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life++;

            // Fade in/out
            const progress = this.life / this.maxLife;
            if (progress < 0.1) {
                this.drawOpacity = this.opacity * (progress / 0.1);
            } else if (progress > 0.8) {
                this.drawOpacity = this.opacity * ((1 - progress) / 0.2);
            } else {
                this.drawOpacity = this.opacity;
            }

            // Reset when off-screen or expired
            if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
                this.y = height + 10;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.drawOpacity})`; // gold
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animId = requestAnimationFrame(animate);
    }

    init();
    animate();

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
        }, 200);
    });
}

/* ----------------------------------------------------------
   8. SCROLL ANIMATIONS (IntersectionObserver)
   ---------------------------------------------------------- */
function initScrollAnimations() {
    const animElements = document.querySelectorAll('[data-animate]');
    if (!animElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el    = entry.target;
                const anim  = el.dataset.animate;   // fade-up, fade-left, fade-right
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.classList.add('animated', `animated--${anim}`);
                }, parseInt(delay, 10));

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------
   9. BACK TO TOP BUTTON
   ---------------------------------------------------------- */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top, #back-to-top');
    if (!btn) return;

    const SHOW_AFTER = 500; // px

    function toggleVisibility() {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ----------------------------------------------------------
   10. MARQUEE — Pause on Hover
   ---------------------------------------------------------- */
function initMarquee() {
    const marquees = document.querySelectorAll('.marquee, .marquee-track');
    marquees.forEach(m => {
        m.addEventListener('mouseenter', () => {
            m.style.animationPlayState = 'paused';
            // Also pause children in case animation is on inner element
            const inner = m.querySelector('.marquee__inner, .marquee-content');
            if (inner) inner.style.animationPlayState = 'paused';
        });
        m.addEventListener('mouseleave', () => {
            m.style.animationPlayState = 'running';
            const inner = m.querySelector('.marquee__inner, .marquee-content');
            if (inner) inner.style.animationPlayState = 'running';
        });
    });
}

/* ----------------------------------------------------------
   11. ABOUT CARDS — Spread on Hover
   ---------------------------------------------------------- */
function initAboutCards() {
    const container = document.querySelector('.about-cards, .about-grid');
    if (!container) return;

    const cards = container.querySelectorAll('.about-card');
    if (cards.length < 2) return;

    container.addEventListener('mouseenter', () => {
        container.classList.add('about-cards--spread');
    });
    container.addEventListener('mouseleave', () => {
        container.classList.remove('about-cards--spread');
    });

    // Individual card hover tilt (subtle)
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
            card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.03)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ----------------------------------------------------------
   12. ORDER NOW BUTTONS — Global Binding
   All "Order Now" buttons open Facebook Messenger / FB page.
   ---------------------------------------------------------- */
function initOrderButtons() {
    // Bind all Order Now / order-now buttons that aren't inside the product grid
    // (grid buttons are bound at render time in initProductGrid)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-order-now, [data-action="order"], .order-now-btn');
        if (!btn) return;

        // Don't double-handle product grid buttons
        if (btn.closest('.products-grid, #products-grid')) return;

        e.preventDefault();
        window.open(FB_MESSENGER, '_blank');
    });

    // CTA buttons in hero / footer that link to order
    document.querySelectorAll('a[href="#order"], a[href="#order-now"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(FB_PAGE_URL, '_blank');
        });
    });
}

/* ----------------------------------------------------------
   UTILITIES
   ---------------------------------------------------------- */

/**
 * Debounce helper
 */
function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
}

/**
 * Throttle helper (rAF-based)
 */
function rafThrottle(fn) {
    let ticking = false;
    return (...args) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                fn(...args);
                ticking = false;
            });
            ticking = true;
        }
    };
}

/* ----------------------------------------------------------
   BOOTSTRAP — Kick everything off on DOM ready
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavbar();
    initHero();
    initProductGrid();
    initContactForm();
    initParticles();
    initBackToTop();
    initMarquee();
    initAboutCards();
    initOrderButtons();
});
