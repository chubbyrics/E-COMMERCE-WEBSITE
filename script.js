// Product data array
const products = [
    { name: "Macbook Pro", price: 999.99, image: "assets/macbook_pro.png", description: "A powerful laptop for professionals and creators." },
    { name: "IPhone 13", price: 499.99, image: "assets/iphone_13.png", description: "The latest iPhone with improved camera and performance." },
    { name: "Airpods Max", price: 99.99, image: "assets/headphones.png", description: "High-quality wireless headphones for all your music needs." },
    { name: "Garmin Vivoactive 4", price: 199.99, image: "assets/smartwatch.png", description: "A sleek smartwatch that tracks your fitness and syncs with your phone." },
    { name: "GLorious Model O", price: 49.99, image: "assets/gaming_mouse.png", description: "Precision gaming mouse with customizable buttons and RGB lighting." },
    { name: "JBL Flip 6", price: 79.99, image: "assets/bluetooth_speaker.png", description: "Portable speaker with great sound quality for on-the-go music." },
    { name: "Royal Kludge 61", price: 29.99, image: "assets/mechanical_keyboard.png", description: "Wireless mechanical keyboard with dual-mode connectivity." }
];

// Cart array to store selected products
const cart = [];
const productContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const totalContainer = document.getElementById("total");

// Function to show toast notifications
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show"; // Show toast

    setTimeout(() => {
        toast.className = "toast"; // Hide toast after 3 seconds
    }, 3000);
}

// Function to display products dynamically
function displayProducts() {
    products.forEach((product, index) => {
        let div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p><strong>${product.name}</strong></p>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <div class="button-container">
                <button onclick="addToCart(${index})">Add to Cart</button>
                <div class="heart-icon" id="heart-${index}" onclick="toggleWishlist(${index})">&#9825;</div>
            </div>
        `;
        productContainer.appendChild(div);
    });
}

// Function to add a product to the cart
function addToCart(index) {
    const product = products[index];
    cart.push(product);
    updateCart();
}

// Function to update cart display
function updateCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>No items in cart.</p>';
    } else {
        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
                <div class="remove-icon" onclick="removeFromCart(${index})">
                    <img src="assets/trash_can.png" alt="Remove" class="trash-icon">
                </div>
            `;
            cartContainer.appendChild(div);
        });
    }

    updateTotal();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to update the total price
function updateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    totalContainer.textContent = total.toFixed(2);
}

// Function to toggle the wishlist
function toggleWishlist(index) {
    const heartIcon = document.getElementById(`heart-${index}`);
    
    if (heartIcon.classList.contains("filled")) {
        heartIcon.classList.remove("filled");
        heartIcon.innerHTML = "&#9825;"; // Outlined heart (♡)
        showToast(`${products[index].name} removed from wishlist.`);
    } else {
        heartIcon.classList.add("filled");
        heartIcon.innerHTML = "&#9829;"; // Filled heart (♥)
        showToast(`${products[index].name} added to wishlist!`);
    }
}

// Function to handle payment button click
const payButton = document.getElementById('payButton');
const deliveryVan = document.getElementById('deliveryVan');

payButton.addEventListener('click', () => {
    deliveryVan.style.display = 'block';
    deliveryVan.classList.add('van-moving');
    payButton.classList.add('expanding');

    setTimeout(() => {
        payButton.classList.remove('expanding');
    }, 500);

    setTimeout(() => {
        showToast("Your order is on its way!");
        deliveryVan.classList.remove('van-moving');
        deliveryVan.style.display = 'none';
        cart.length = 0;
        updateCart();
    }, 4000);
});

// Initialize the product listing
displayProducts();
