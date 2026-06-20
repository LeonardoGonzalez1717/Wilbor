// ==========================================================================
// PRODUCTS DATABASE
// ==========================================================================
console.log("22");

const PRODUCTS = [
    {
        id: "burger-triple-bacon",
        name: "Wilbor Triple Bacon",
        category: "burgers",
        price: 9.50,
        desc: "Triple carne smash de res premium (120g c/u) con costra dorada perfecta, triple porción de queso cheddar fundido, abundante tocino ahumado ultra crujiente y salsa secreta Wilbor en pan de papa tostado.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
        badge: "Bestseller 🔥"
    },
    {
        id: "burger-clasica-especial",
        name: "Wilbor Clásica Especial",
        category: "burgers",
        price: 7.50,
        desc: "Jugosa carne premium de res de 150g, jamón de pierna, queso de mano fresco, huevo frito, lechuga hidropónica, tomate en rodajas y papas trituradas crujientes con salsas de la casa.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "burger-cheddar-bomb",
        name: "Monster Cheddar Bomb",
        category: "burgers",
        price: 11.00,
        desc: "Doble carne smash (130g c/u), doble cheddar, tocino caramelizado al maple, aros de cebolla crocantes y bañada completamente en una erupción de queso cheddar fundido premium al servir.",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800",
        badge: "Extrema 🧀"
    },
    {
        id: "hotdog-especial",
        name: "Perro Wilbor Especial",
        category: "hotdogs",
        price: 3.50,
        desc: "Salchicha jumbo polaca premium a la plancha, ensalada fresca rallada de repollo y zanahoria, abundante queso de mano llanero rallado, papas ralladas trituradas y el trío de salsas tradicionales.",
        image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=800",
        badge: "El Rey 🌭"
    },
    {
        id: "hotdog-bacon-cheese",
        name: "Perro Bacon Cheese",
        category: "hotdogs",
        price: 4.50,
        desc: "Salchicha jumbo envuelta en crujientes tiras de tocino ahumado, gratinada con abundante queso mozzarella, cheddar fundido de la casa, cebolla picadita y aderezo especial de ajo rostizado.",
        image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "sides-papas-wilbor",
        name: "Papas Wilbor Cargadas",
        category: "sides",
        price: 5.00,
        desc: "Cama gigante de papas fritas rústicas crujientes sazonadas, bañadas en nuestra salsa de queso cheddar caliente fundido, cebollín fresco picado y abundante tocino crujiente triturado.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800",
        badge: "Para Compartir 🍟"
    },
    {
        id: "sides-mozzarella",
        name: "Deditos de Mozzarella",
        category: "sides",
        price: 4.00,
        desc: "6 dedos crujientes rellenos de queso mozzarella premium hilado y fritos a la perfección dorada, acompañados de salsa tártara artesanal de ajo y perejil.",
        image: "https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&q=80&w=800"
    }
];

// ==========================================================================
// APP STATE (CART & MODAL TEMPS)
// ==========================================================================
let cart = JSON.parse(localStorage.getItem('wilbor_cart')) || [];
let activeProduct = null;
let currentQuantity = 1;

// ==========================================================================
// DOM ELEMENTS REFERENCE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("000");
    // Navbar Elements
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar-container');

    // Cart drawer elements
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCountBadge = document.getElementById('cartCountBadge');

    // Pricing sub-elements
    const cartSubtotalAmount = document.getElementById('cartSubtotalAmount');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const cartCheckoutFooter = document.getElementById('cartCheckoutFooter');

    // Checkout input fields
    const checkoutAddress = document.getElementById('checkoutAddress');
    const checkoutInstructions = document.getElementById('checkoutInstructions');
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');

    // Modal elements
    const productModal = document.getElementById('productModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalProductImg = document.getElementById('modalProductImg');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const stepperQtyVal = document.getElementById('stepperQtyVal');
    const stepperDecBtn = document.getElementById('stepperDecBtn');
    const stepperIncBtn = document.getElementById('stepperIncBtn');
    const modalAddCartBtn = document.getElementById('modalAddCartBtn');

    // Catalog Grid and filters
    const menuGrid = document.getElementById('menuGrid');
    console.log("menuGrid", menuGrid);
    const tabButtons = document.querySelectorAll('.tab-btn');
    function renderCatalog(filter = 'all') {
        console.log("filter", filter);
        if (!menuGrid) return;
        menuGrid.innerHTML = '';

        PRODUCTS.forEach(product => {
            if (filter === 'all' || product.category === filter) {
                const card = document.createElement('div');
                card.className = 'menu-card animate-fade-in';
                card.setAttribute('data-id', product.id);

                const badgeHtml = product.badge ? `<span class="card-badge">${product.badge}</span>` : '';

                card.innerHTML = `
                    <div class="card-img-wrapper">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        ${badgeHtml}
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="card-title">${product.name}</h3>
                            <span class="card-price">$${product.price.toFixed(2)}</span>
                        </div>
                        <p class="card-desc">${product.desc}</p>
                        <div class="card-footer">
                            <span class="card-meta">${product.category === 'burgers' ? 'Hamburguesa' : product.category === 'hotdogs' ? 'Perro Caliente' : 'Ración'}</span>
                            <button class="btn-card-action">Ver Detalles</button>
                        </div>
                    </div>
                `;

                // Add click listener to open the modal card details
                card.addEventListener('click', () => {
                    openProductModal(product.id);
                });

                menuGrid.appendChild(card);
            }
        });
    }
    renderCatalog()
    // Tabs Event listener
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-tab');
            renderCatalog(filterValue);
        });
    });

    // ==========================================================================
    // MOBILE NAVBAR CONTROL
    // ==========================================================================
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Shrink navbar size on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.75rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            navbar.style.background = 'rgba(4, 4, 5, 0.95)';
        } else {
            navbar.style.padding = '0';
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 10, 12, 0.75)';
        }
    });

    // ==========================================================================
    // CATALOG GRID RENDERING & FILTERING
    // ==========================================================================


    // // Initialize full catalog
    // renderCatalog();

    // ==========================================================================
    // PRODUCT DETAILS MODAL LOGIC
    // ==========================================================================
    function openProductModal(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        activeProduct = product;
        currentQuantity = 1;

        // Populate Modal DOM elements
        modalProductImg.src = product.image;
        modalProductImg.alt = product.name;
        modalProductTitle.textContent = product.name;
        modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
        modalProductDesc.textContent = product.desc;
        stepperQtyVal.textContent = currentQuantity;

        // Toggle visibility with active class
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // lock scroll background
    }

    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // restore scroll background
        activeProduct = null;
    }

    // Stepper counter triggers
    stepperIncBtn.addEventListener('click', () => {
        currentQuantity++;
        stepperQtyVal.textContent = currentQuantity;
    });

    stepperDecBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            stepperQtyVal.textContent = currentQuantity;
        }
    });

    // Add to cart from within modal
    modalAddCartBtn.addEventListener('click', () => {
        if (activeProduct) {
            addItemToCart(activeProduct.id, currentQuantity);
            closeProductModal();
            openCartDrawer();
        }
    });

    // Close button and backdrop clicks
    modalCloseBtn.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // ==========================================================================
    // CART ENGINE LOGIC
    // ==========================================================================
    function saveCart() {
        localStorage.setItem('wilbor_cart', JSON.stringify(cart));
        updateCartUI();
    }

    function addItemToCart(productId, qty) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        // Check if item already exists in cart list
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.image,
                qty: qty
            });
        }

        saveCart();
    }

    function deleteItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
    }

    function updateItemQuantity(productId, newQty) {
        const item = cart.find(i => i.id === productId);
        if (!item) return;

        if (newQty <= 0) {
            deleteItemFromCart(productId);
        } else {
            item.qty = newQty;
            saveCart();
        }
    }

    // Updates HTML templates inside cart drawer and handles counts
    function updateCartUI() {
        // Compute total quantity badge
        const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountBadge.textContent = totalItemsCount;

        // Handle visual pop pulse animation on badge change
        if (totalItemsCount > 0) {
            cartCountBadge.style.transform = 'scale(1.25)';
            setTimeout(() => {
                cartCountBadge.style.transform = 'scale(1)';
            }, 200);
        }

        // Empty state check
        if (cart.length === 0) {
            cartItemsList.innerHTML = `<div class="cart-empty-message">Tu carrito está vacío. ¡Explora el menú y agrega tu comida favorita! 🍔</div>`;
            cartCheckoutFooter.style.display = 'none';
            return;
        }

        // Render Cart Rows list
        cartItemsList.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const rowTotal = item.price * item.qty;
            subtotal += rowTotal;

            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price-qty">
                        <span>$${item.price.toFixed(2)} x </span>
                        <span class="item-total-val">$${rowTotal.toFixed(2)}</span>
                    </div>
                    <!-- Stepper counts in cart -->
                    <div class="cart-item-stepper">
                        <button class="stepper-mini-btn btn-dec" data-id="${item.id}">-</button>
                        <span class="stepper-mini-val">${item.qty}</span>
                        <button class="stepper-mini-btn btn-inc" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-delete-btn" data-id="${item.id}" aria-label="Eliminar producto">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            `;

            // Delete item button trigger
            row.querySelector('.cart-item-delete-btn').addEventListener('click', () => {
                deleteItemFromCart(item.id);
            });

            // Quantities adjust
            row.querySelector('.btn-dec').addEventListener('click', () => {
                updateItemQuantity(item.id, item.qty - 1);
            });

            row.querySelector('.btn-inc').addEventListener('click', () => {
                updateItemQuantity(item.id, item.qty + 1);
            });

            cartItemsList.appendChild(row);
        });

        // Compute Pricing Summary
        const deliveryCharge = 2.00;
        const total = subtotal + deliveryCharge;

        cartSubtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        cartCheckoutFooter.style.display = 'block';
    }

    // Initialize UI on load
    // updateCartUI();

    // ==========================================================================
    // SIDEBAR CART DRAWER TRANSITIONS
    // ==========================================================================
    function openCartDrawer() {
        cartDrawer.classList.add('active');
        cartDrawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // lock scroll
    }

    function closeCartDrawer() {
        cartDrawer.classList.remove('active');
        cartDrawerOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // restore scroll
    }

    cartToggleBtn.addEventListener('click', openCartDrawer);
    cartCloseBtn.addEventListener('click', closeCartDrawer);
    cartDrawerOverlay.addEventListener('click', closeCartDrawer);

    // ==========================================================================
    // WHATSAPP CHECKOUT ORDER COMPOSER
    // ==========================================================================
    function sendOrderWhatsApp() {
        const address = checkoutAddress.value.trim();
        const instructions = checkoutInstructions.value.trim();

        if (!address) {
            alert('Por favor, ingresa tu dirección de entrega para poder procesar el pedido.');
            checkoutAddress.focus();
            return;
        }

        let orderDetailsStr = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            orderDetailsStr += `• ${item.qty}x *${item.name}* ($${item.price.toFixed(2)} c/u) → *$${itemTotal.toFixed(2)}*\n`;
        });

        const deliveryCharge = 2.00;
        const total = subtotal + deliveryCharge;

        // WhatsApp message builder template
        const phone = "584123474266";
        const msg = `👑 *WILBOR HAMBURGUESAS - NUEVO PEDIDO* 👑
------------------------------------------
🍔 *Detalle de la Orden:*
${orderDetailsStr}
------------------------------------------
💵 *Resumen de Pago:*
*Subtotal:* $${subtotal.toFixed(2)}
*Delivery (Fijo):* $2.00
*Total a Pagar:* *$${total.toFixed(2)}*

📍 *Datos de Entrega:*
*Dirección:* ${address}
${instructions ? `📝 *Instrucciones Especiales:* ${instructions}` : ''}
------------------------------------------
Pedido enviado desde la página web. ¡Gracias! 🏍️`;

        // Encode string correctly and redirect
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

        // Reset cart upon sending
        cart = [];
        saveCart();
        closeCartDrawer();
        checkoutAddress.value = '';
        checkoutInstructions.value = '';

        window.open(waUrl, '_blank');
    }

    cartCheckoutBtn.addEventListener('click', sendOrderWhatsApp);

    // ==========================================================================
    // DYNAMIC BUSINESS HOURS STATUS CHECK
    // ==========================================================================
    // Open Hours: 12:00 PM (12h) to 11:00 PM (23h)
    const OPEN_HOUR = 12;
    const CLOSE_HOUR = 23;

    function checkBusinessStatus() {
        const heroBadge = document.getElementById('heroStatusBadge');
        const infoBadge = document.getElementById('infoStatusBadge');

        if (!heroBadge || !infoBadge) return;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        let isOpen = false;

        if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
            isOpen = true;
        } else if (currentHour === OPEN_HOUR) {
            isOpen = currentMinutes >= 0;
        } else if (currentHour === CLOSE_HOUR) {
            isOpen = currentMinutes < 0; // false at 11:00 PM exactly
        }

        const badges = [heroBadge, infoBadge];
        badges.forEach(badge => {
            badge.className = 'status-badge';
            const dot = badge.querySelector('.status-dot') || document.createElement('span');
            dot.className = 'status-dot';
            const text = badge.querySelector('.status-text') || document.createElement('span');
            text.className = 'status-text';

            badge.innerHTML = '';
            badge.appendChild(dot);
            badge.appendChild(text);

            if (isOpen) {
                badge.classList.add('open');
                text.textContent = 'Abierto • Cierra a las 11:00 PM';
            } else {
                badge.classList.add('closed');
                text.textContent = 'Cerrado • Abre a las 12:00 PM';
            }
        });
    }

    checkBusinessStatus();
    setInterval(checkBusinessStatus, 30000);

    updateCartUI();
});
