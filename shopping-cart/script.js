
// Products Data

const products = [
    { id: 1, name: "Laptop", description: "High performance laptop", price: 999.99, image: "https://cdn.mos.cms.futurecdn.net/kaLRpY2Bmy9mA2MxtpxKkH.jpg" },
    { id: 2, name: "Headphones", description: "Noise cancelling headphones", price: 199.99, image: "https://images-cdn.ubuy.com.sa/655790a2d3261729912e3192-vibeadio-hybrid-active-noise-cancelling.jpg" },
    { id: 3, name: "Smartphone", description: "Latest model smartphone", price: 799.99, image: "https://www.pickaboo.com/blog/wp-content/uploads/2023/05/EoY-2022-Best-Phones-on-leather.jpg" },
    { id: 4, name: "Watch", description: "Smart watch with fitness tracking", price: 149.99, image: "https://www.saga.co.uk/helix-contentlibrary/exceptional/2023/01/tracker-vs-smartwatch.jpg?la=en&h=711&w=1263&hash=8A0A88CFABE7695846F71163B568B70D" }
];


// Cart Operations

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    if (quantity < 1) return; // Prevent negative quantity
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = quantity;
        updateCartUI();
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
}

// UI Updates

function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "bg-white p-4 rounded shadow hover:shadow-lg";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover mb-2 rounded">
            <h3 class="font-bold text-lg">${product.name}</h3>
            <p class="text-gray-600 mb-2">${product.description}</p>
            <p class="font-semibold mb-2">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItems.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "flex justify-between items-center";
        cartItem.innerHTML = `
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="flex items-center gap-2">
                <input type="number" min="1" value="${item.quantity}" class="border p-1 w-16 text-center" onchange="updateQuantity(${item.id}, parseInt(this.value))">
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}


// Event Listeners

document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
});

document.getElementById("clear-cart").addEventListener("click", clearCart);


// Initialize

renderProducts();
updateCartUI();
