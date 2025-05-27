// === script.js ===

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartDisplay();

    const cartPanel = document.getElementById('cart-panel');
    const cartBtn = document.getElementById('cart-button');
    const closeBtn = document.getElementById('close-cart');

    // === View Cart Button Toggle ===
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
        if (cartPanel.classList.contains('hidden')) {
            cartPanel.classList.remove('hidden');
            setTimeout(() => {
            cartPanel.classList.remove('translate-y-full', 'md:translate-x-full');
            }, 10);
        } else {
            cartPanel.classList.add('translate-y-full', 'md:translate-x-full');
            setTimeout(() => {
            cartPanel.classList.add('hidden');
            }, 300);
        }
        });
    }

    // === Close Button (X) ===
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
        cartPanel.classList.add('translate-y-full', 'md:translate-x-full');
        setTimeout(() => {
            cartPanel.classList.add('hidden');
        }, 300);
        });
    }

    // === Auto-hide View Cart on Scroll ===
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (cartBtn) {
        if (scrollTop > lastScrollTop) {
            cartBtn.style.opacity = '0';
            cartBtn.style.pointerEvents = 'none';
        } else {
            cartBtn.style.opacity = '1';
            cartBtn.style.pointerEvents = 'auto';
        }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    });

    function renderMenu() {
    const container = document.getElementById('menu-items');

    if (!container || !window.menu || !window.menu.length) {
        console.error('Menu container or items not available.');
        return;
    }

    container.innerHTML = '';

    window.menu.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-orange-100 p-6 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl";

        // Image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = "w-full h-40 object-cover rounded mb-4 shadow";

        const title = document.createElement('h3');
        title.className = "text-lg sm:text-xl font-bold mb-2 text-red-700";
        title.textContent = item.name;

        const price = document.createElement('p');
        price.className = "text-sm sm:text-base mb-4 text-gray-700";
        price.textContent = `$${item.price.toFixed(2)}`;

        const button = document.createElement('button');
        button.className = "bg-red-600 text-white text-sm sm:text-base px-4 py-2 rounded shadow hover:bg-red-700 active:scale-95 transition-transform duration-200 ease-in-out cursor-pointer";
        button.textContent = "Add to Cart";
        button.addEventListener('click', () => {
        addToCart(item.id);
        console.log("Item added to cart:", item.id);
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(button);
        container.appendChild(card);
    });
    }

    // === Homepage slider logic ===
    const sliderImages = [
        '/docs/previews/preview1.jpg',
        '/docs/previews/preview2.jpg',
        '/docs/previews/preview3.jpg',
        '/docs/previews/preview4.jpg',
        '/docs/previews/preview5.jpg'
    ];

    let currentSlide = 0;
    const sliderElement = document.getElementById('slider-image');

    if (sliderElement && sliderImages.length > 0) {
    setInterval(() => {
        sliderElement.style.opacity = 0;
        setTimeout(() => {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        sliderElement.src = sliderImages[currentSlide];
        sliderElement.style.opacity = 1;
        }, 300);
    }, 3500);
}
