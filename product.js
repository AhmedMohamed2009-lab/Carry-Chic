/**
 * Carry Chic - Product Detail Pages Logic
 * Image Gallery, Swatches, Quantity Stepper, Tabs, and Cart Integration
 */

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initSwatches();
    initDetailQuantity();
    initSpecsTabs();
    initDetailAddToCart();
});

// Image Gallery Thumbnail Switching
function initGallery() {
    const mainImg = document.getElementById('main-product-img');
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainImg) {
                mainImg.src = thumb.getAttribute('data-img') || thumb.src;
            }
        });
    });
}

// Color Swatch Selection
function initSwatches() {
    const swatches = document.querySelectorAll('.color-swatch');
    const colorLabel = document.getElementById('selected-color-name');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            const colorName = swatch.getAttribute('data-color');
            if (colorLabel && colorName) {
                colorLabel.textContent = colorName;
            }
        });
    });
}

// Quantity Stepper
function initDetailQuantity() {
    const minusBtn = document.getElementById('detail-qty-minus');
    const plusBtn = document.getElementById('detail-qty-plus');
    const input = document.getElementById('detail-qty-input');

    if (!input) return;

    minusBtn?.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) {
            input.value = val - 1;
        }
    });

    plusBtn?.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
    });
}

// Product Specification Tabs
function initSpecsTabs() {
    const tabBtns = document.querySelectorAll('.specs-tab-btn');
    const tabPanes = document.querySelectorAll('.specs-tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.style.display = 'none');

            btn.classList.add('active');
            const activePane = document.getElementById(targetId);
            if (activePane) {
                activePane.style.display = 'block';
            }
        });
    });
}

// Add to Cart from Detail Page
function initDetailAddToCart() {
    const addBtn = document.getElementById('detail-add-to-cart-btn');
    const input = document.getElementById('detail-qty-input');
    const colorLabel = document.getElementById('selected-color-name');

    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        const productId = addBtn.getAttribute('data-id');
        const qty = parseInt(input?.value) || 1;
        const color = colorLabel?.textContent || 'Default';

        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return;

        addToCart({
            id: product.id,
            name: `${product.name} (${color})`,
            price: product.price,
            image: product.image,
            pageUrl: product.pageUrl,
            qty: qty
        });
    });
}
