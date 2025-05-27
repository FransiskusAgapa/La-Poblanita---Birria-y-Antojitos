// === cart.js ===

window.menu = [
    { id: 1, name: 'Tacos', price: 3.50, image: '/docs/menu/food1.jpg' },
    { id: 2, name: 'Burritos', price: 7.00, image: '/docs/menu/food2.jpg' },
    { id: 3, name: 'Quesadillas', price: 6.00, image: '/docs/menu/food3.jpg' }
    ];

    const cart = {};

    function addToCart(id) {
    console.log("Adding to cart:", id);
    cart[id] = (cart[id] || 0) + 1;
    updateCartDisplay();
    }

    function removeFromCart(id) {
    if (cart[id]) {
        cart[id] -= 1;
        if (cart[id] <= 0) delete cart[id];
        updateCartDisplay();
    }
    }

    function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartBtn = document.getElementById('cart-button');

    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const total = Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = window.menu.find(i => i.id == id);
        return sum + item.price * qty;
    }, 0);

    cartItems.innerHTML = Object.entries(cart).map(([id, qty]) => {
        const item = window.menu.find(i => i.id == id);
        return `
        <div class="flex justify-between items-center border-b pb-2">
            <div>
            <p class="font-semibold">${item.name}</p>
            <div class="flex items-center gap-2 mt-1">
                <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-2 rounded">-</button>
                <span>${qty}</span>
                <button onclick="addToCart(${item.id})" class="bg-red-600 text-white px-2 rounded">+</button>
            </div>
            </div>
            <p>$${(item.price * qty).toFixed(2)}</p>
        </div>
        `;
    }).join('');

    document.getElementById('cart-total').textContent = total.toFixed(2);

    if (checkoutBtn) {
        if (count === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'You have no order yet';
        } else {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Proceed to Pickup & Payment';
        }
    }

    if (cartBtn) {
        if (count === 0) {
        cartBtn.innerHTML = "🛒 No order made";
        } else {
        cartBtn.innerHTML = `🛒 View Cart (<span id="cart-count">${count}</span>)`;
        }
    }
}
