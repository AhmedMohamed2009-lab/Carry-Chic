/**
 * Carry Chic - Luxury E-Commerce & Interactive Experience
 * Shopping Cart, Drawer, Wishlist, Filter, Checkout & Toast System
 */

// Global Product Catalog Data
const PRODUCTS_DATA = [
    {
        id: 'bag-1',
        name: 'Classic Artisan Handbag',
        arabicName: 'حقيبة كلاسيك يدوية الصنع',
        category: 'crochet',
        categoryLabel: 'Signature Knit & Crochet',
        price: 120,
        originalPrice: 150,
        image: 'images/Bag1.png',
        badge: 'Best Seller',
        badgeClass: 'badge-gold',
        rating: 4.9,
        reviewsCount: 38,
        pageUrl: 'product.html',
        description: 'Exquisitely hand-knitted from organic cotton rope, featuring reinforced luxury leather handles and satin interior lining.'
    },
    {
        id: 'bag-2',
        name: 'Modern Chic Carry Bag',
        arabicName: 'حقيبة مودرن شيك للكتف',
        category: 'tote',
        categoryLabel: 'Artisan Shoulder Bag',
        price: 145,
        originalPrice: 175,
        image: 'images/Bag2.jpg',
        badge: 'New Arrival',
        badgeClass: 'badge-green',
        rating: 5.0,
        reviewsCount: 29,
        pageUrl: 'product2.html',
        description: 'Clean architectural lines meet traditional handcrafting. Generous compartment with bespoke gold-tone hardware.'
    },
    {
        id: 'bag-3',
        name: 'Boho Artisan Woven Tote',
        arabicName: 'حقيبة توت بوهو منسوجة',
        category: 'tote',
        categoryLabel: 'Bohemian Weave',
        price: 130,
        originalPrice: 160,
        image: 'images/Bag3.jpg',
        badge: 'Trending',
        badgeClass: 'badge-wine',
        rating: 4.8,
        reviewsCount: 44,
        pageUrl: 'product3.html',
        description: 'Textured geometric weave crafted from natural eco-fibers. Spacious interior designed for work, travel, and weekend strolls.'
    },
    {
        id: 'bag-4',
        name: 'Vintage Bloom Crossbody',
        arabicName: 'حقيبة كروس فينتاج بلوم',
        category: 'leather',
        categoryLabel: 'Heritage Crossbody',
        price: 110,
        originalPrice: 140,
        image: 'images/Bag4.jpg',
        badge: 'Limited Edition',
        badgeClass: 'badge-gold',
        rating: 4.9,
        reviewsCount: 31,
        pageUrl: 'product4.html',
        description: 'A nostalgic silhouette with modern handcrafted touch. Adjustable genuine strap and secure magnetic vintage closure.'
    },
    {
        id: 'bag-5',
        name: 'Celestial Pearl Knot Bag',
        arabicName: 'حقيبة العقدة باللؤلؤ الملكي',
        category: 'clutch',
        categoryLabel: 'Evening & Occasion',
        price: 160,
        originalPrice: 195,
        image: 'images/Bag5.jpg',
        badge: 'Exclusive',
        badgeClass: 'badge-wine',
        rating: 5.0,
        reviewsCount: 26,
        pageUrl: 'product5.html',
        description: 'Intricately embellished with lustrous pearls along artisan cord weaves. The quintessential statement piece for galas and evenings.'
    },
    {
        id: 'bag-6',
        name: 'Velvet Mirage Chic Clutch',
        arabicName: 'كلاتش فيلفيت ميراج الفاخر',
        category: 'clutch',
        categoryLabel: 'Luxury Clutch',
        price: 135,
        originalPrice: 165,
        image: 'images/Bag6.jpg',
        badge: 'Bestseller',
        badgeClass: 'badge-green',
        rating: 4.9,
        reviewsCount: 52,
        pageUrl: 'product6.html',
        description: 'Silky tactile touch crafted with rich textured stitches, brass chain strap, and an effortless magnetic foldover.'
    }
];

// Initialize Cart & Wishlist from localStorage
let cart = JSON.parse(localStorage.getItem('carrychic_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('carrychic_wishlist')) || [];

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProductsGrid();
    initCartSystem();
    initCheckoutModal();
    initFaqAccordion();
    initContactForms();
    updateCartCountBadge();
    checkUrlHashScroll();
});

// Navigation & Header Scroll
function initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function checkUrlHashScroll() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
}

// Products Rendering & Filtering
function initProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    renderProducts(PRODUCTS_DATA);

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            if (category === 'all') {
                renderProducts(PRODUCTS_DATA);
            } else {
                const filtered = PRODUCTS_DATA.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
}

function renderProducts(items) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = items.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        return `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="card-image-box">
                    <span class="card-badge ${product.badgeClass}">${product.badge}</span>
                    <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                            onclick="toggleWishlist('${product.id}', this)" 
                            title="Add to Wishlist"
                            aria-label="Wishlist">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <a href="${product.pageUrl}">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                    </a>
                    <div class="card-overlay-actions">
                        <button class="quick-add-btn" onclick="addToCartById('${product.id}')">
                            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
                        </button>
                        <a href="${product.pageUrl}" class="quick-view-btn" title="View Details">
                            <i class="fa-regular fa-eye"></i>
                        </a>
                    </div>
                </div>
                <div class="card-content">
                    <span class="card-category">${product.categoryLabel}</span>
                    <h3 class="card-title">
                        <a href="${product.pageUrl}">${product.name}</a>
                    </h3>
                    <div class="card-rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <span class="rating-count">(${product.reviewsCount})</span>
                    </div>
                    <div class="card-bottom">
                        <div class="card-price">
                            <span class="current-price">$${product.price}</span>
                            <span class="original-price">$${product.originalPrice}</span>
                        </div>
                        <a href="${product.pageUrl}" class="view-details-link">
                            Details <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Shopping Cart System
function initCartSystem() {
    const cartBtn = document.getElementById('open-cart-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');

    if (cartBtn) {
        cartBtn.addEventListener('click', openCartDrawer);
    }
    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeCartDrawer);
    }
    if (overlay) {
        overlay.addEventListener('click', closeCartDrawer);
    }

    renderCartDrawer();
}

function openCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    renderCartDrawer();
    overlay?.classList.add('active');
    drawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    overlay?.classList.remove('active');
    drawer?.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCartById(productId, qty = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        pageUrl: product.pageUrl,
        qty: qty
    });
}

function addToCart(item) {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    if (existingIndex > -1) {
        cart[existingIndex].qty += (item.qty || 1);
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            pageUrl: item.pageUrl || 'carrychic.html',
            qty: item.qty || 1
        });
    }

    saveCart();
    renderCartDrawer();
    updateCartCountBadge();
    showToast(`✨ Added "${item.name}" to your shopping bag!`);
    openCartDrawer();
}

function updateCartQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();
    renderCartDrawer();
    updateCartCountBadge();
}

function removeFromCart(id) {
    const removedItem = cart.find(c => c.id === id);
    cart = cart.filter(c => c.id !== id);
    saveCart();
    renderCartDrawer();
    updateCartCountBadge();
    if (removedItem) {
        showToast(`Removed "${removedItem.name}" from your bag.`);
    }
}

function saveCart() {
    localStorage.setItem('carrychic_cart', JSON.stringify(cart));
}

function updateCartCountBadge() {
    const count = cart.reduce((total, item) => total + item.qty, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => {
        b.textContent = count;
        b.style.display = count > 0 ? 'flex' : 'none';
    });
}

function renderCartDrawer() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const shippingEl = document.getElementById('cart-shipping');
    const progressFill = document.getElementById('free-shipping-fill');
    const progressText = document.getElementById('free-shipping-text');
    const checkoutBtn = document.getElementById('checkout-drawer-btn');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <h4 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--primary); margin-bottom: 8px;">Your Shopping Bag is Empty</h4>
                <p style="font-size: 0.9rem; margin-bottom: 20px;">Explore our handcrafted collections and treat yourself to something unique.</p>
                <button class="btn-primary" onclick="closeCartDrawer(); window.location.href='carrychic.html#bags'">
                    Shop The Collection
                </button>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        if (totalEl) totalEl.textContent = '$0.00';
        if (shippingEl) shippingEl.textContent = '$0.00';
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = 'Add $150.00 more for Free Shipping!';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const freeShippingThreshold = 200;
    const isFreeShipping = subtotal >= freeShippingThreshold;
    const shippingCost = isFreeShipping ? 0 : 15;
    const finalTotal = subtotal + shippingCost;

    if (progressFill && progressText) {
        const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
        progressFill.style.width = `${progressPercent}%`;
        if (isFreeShipping) {
            progressText.innerHTML = '🎉 <strong>Congratulations!</strong> You unlocked FREE Luxury Shipping!';
        } else {
            const needed = (freeShippingThreshold - subtotal).toFixed(0);
            progressText.innerHTML = `Add <strong>$${needed}</strong> more to unlock <strong>FREE Shipping</strong>!`;
        }
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div>
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-price">$${item.price}</span>
                </div>
                <div class="cart-item-controls">
                    <div class="qty-stepper">
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" aria-label="Decrease">&minus;</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" aria-label="Increase">&plus;</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
}

// Wishlist Functionality
function toggleWishlist(productId, btnElement) {
    const index = wishlist.indexOf(productId);
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    const name = product ? product.name : 'Item';

    if (index > -1) {
        wishlist.splice(index, 1);
        btnElement?.classList.remove('active');
        const icon = btnElement?.querySelector('i');
        if (icon) {
            icon.className = 'fa-regular fa-heart';
        }
        showToast(`Removed "${name}" from your wishlist.`);
    } else {
        wishlist.push(productId);
        btnElement?.classList.add('active');
        const icon = btnElement?.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-heart';
        }
        showToast(`❤️ Saved "${name}" to your wishlist!`);
    }

    localStorage.setItem('carrychic_wishlist', JSON.stringify(wishlist));
}

// Checkout Modal & WhatsApp Order Flow
function initCheckoutModal() {
    const checkoutBtn = document.getElementById('checkout-drawer-btn');
    const modalOverlay = document.getElementById('checkout-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const checkoutForm = document.getElementById('checkout-order-form');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            closeCartDrawer();
            openCheckoutModal();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCheckoutModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeCheckoutModal();
            }
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
}

function openCheckoutModal() {
    const modalOverlay = document.getElementById('checkout-modal-overlay');
    const summaryItems = document.getElementById('modal-summary-items');
    const modalTotal = document.getElementById('modal-total-amount');

    if (summaryItems) {
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const shipping = subtotal >= 200 ? 0 : 15;
        const total = subtotal + shipping;

        summaryItems.innerHTML = cart.map(item => `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                <span>${item.qty}x ${item.name}</span>
                <span style="font-weight:600;">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `).join('');

        if (modalTotal) modalTotal.textContent = `$${total.toFixed(2)}`;
    }

    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modalOverlay = document.getElementById('checkout-modal-overlay');
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.customer_name?.value || '';
    const phone = form.customer_phone?.value || '';
    const city = form.customer_city?.value || '';
    const address = form.customer_address?.value || '';
    const notes = form.customer_notes?.value || '';
    const payment = form.payment_method?.value || 'Cash on Delivery';

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = subtotal >= 200 ? 0 : 15;
    const total = subtotal + shipping;
    const orderNumber = 'CC-' + Math.floor(100000 + Math.random() * 900000);

    // Format WhatsApp Message for instant confirmation
    const itemsListText = cart.map(i => `• ${i.qty}x ${i.name} ($${i.price})`).join('%0A');
    const waText = `*Carry Chic - New Order ${orderNumber}*%0A%0A` +
                   `*Customer:* ${encodeURIComponent(name)}%0A` +
                   `*Phone:* ${encodeURIComponent(phone)}%0A` +
                   `*City:* ${encodeURIComponent(city)}%0A` +
                   `*Address:* ${encodeURIComponent(address)}%0A` +
                   `*Payment:* ${encodeURIComponent(payment)}%0A%0A` +
                   `*Items:*%0A${itemsListText}%0A%0A` +
                   `*Total Amount:* $${total.toFixed(2)}%0A` +
                   (notes ? `*Notes:* ${encodeURIComponent(notes)}%0A` : '');

    // Show Success State in Modal
    const modalContent = document.querySelector('.checkout-modal-card');
    if (modalContent) {
        modalContent.innerHTML = `
            <div style="text-align:center; padding: 20px 10px;">
                <div style="width:70px; height:70px; border-radius:50%; background:#eef7f2; color:#2b7a4b; font-size:2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h3 style="font-family:var(--font-serif); font-size:2rem; color:var(--primary); margin-bottom:8px;">Thank You, ${name}!</h3>
                <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:20px;">
                    Your handcrafted order <strong>#${orderNumber}</strong> has been received with love. We will prepare your luxury package shortly.
                </p>
                <div style="background:var(--bg-surface); padding:16px; border-radius:var(--radius-md); text-align:left; margin-bottom:24px; font-size:0.9rem;">
                    <div><strong>Total:</strong> $${total.toFixed(2)}</div>
                    <div><strong>Delivery to:</strong> ${city}, ${address}</div>
                    <div><strong>Payment:</strong> ${payment}</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <a href="https://wa.me/?text=${waText}" target="_blank" class="btn-primary" style="background:#25d366; justify-content:center;">
                        <i class="fa-brands fa-whatsapp" style="font-size:1.2rem;"></i> Confirm Order via WhatsApp
                    </a>
                    <button class="btn-secondary" style="color:var(--primary); border-color:var(--border);" onclick="location.reload()">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;
    }

    // Clear cart
    cart = [];
    saveCart();
    updateCartCountBadge();
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}

// Contact & Newsletter Forms
function initContactForms() {
    const contactForm = document.getElementById('custom-order-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('[name="name"]')?.value || 'Dear client';
            showToast(`💌 Thank you ${name}! We received your inquiry and will reply within 24 hours.`);
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('🎁 Welcome to Chic Club! Use promo code "CHIC10" for 10% off.');
            newsletterForm.reset();
        });
    }
}

// Toast Notifications System
function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'site-toast';
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }

    toast.innerHTML = message;
    toast.classList.add('show');

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3800);
}
