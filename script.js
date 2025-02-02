// Array to hold product data (name, price, image, description)
const products = [
    { name: "Macbook Pro", price: 999.99, image: "assets/macbook_pro.png", description: "A powerful laptop for professionals and creators." },
    { name: "IPhone 13", price: 499.99, image: "assets/iphone_13.png", description: "The latest iPhone with improved camera and performance." },
    { name: "Airpods Max", price: 99.99, image: "assets/headphones.png", description: "High-quality wireless headphones for all your music needs." },
    { name: "Garmin Vivoactive 4", price: 199.99, image: "assets/smartwatch.png", description: "A sleek smartwatch that tracks your fitness and syncs with your phone." },
    { name: "GLorious Model O", price: 49.99, image: "assets/gaming mouse.png", description: "Precision gaming mouse with customizable buttons and RGB lighting." },
    { name: "JBL Flip 6", price: 79.99, image: "assets/bluetooth_speaker.png", description: "Portable speaker with great sound quality for on-the-go music." },
    { name: "Royal Kludge 61", price: 29.99, image: "assets/mechanical keyboard.png", description: "Wireless mechanical keyboard with dual-mode connectivity." }
];

// Cart array to hold products added to the cart
const cart = [];
const productContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const totalContainer = document.getElementById("total");

// Function to display a toast message (temporary notification)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show"; // Show toast

    setTimeout(() => {
        toast.className = "toast"; // Hide toast after 3 seconds
    }, 3000);
}

// Function to dynamically generate product cards and display them
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
    
    // Add product to cart array
    cart.push(product);
    
    // Update the cart display
    updateCart();
}

// Function to update the shopping cart display
function updateCart() {
    // Clear current cart display
    cartContainer.innerHTML = '';

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>No items in cart.</p>';
    } else {
        // Loop through the cart and display each item
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

    // Update the total price
    updateTotal();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Remove the item from the cart array
    cart.splice(index, 1);

    // Update the cart display after removal
    updateCart();
}

// Function to calculate and display the total price of the cart
function updateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    totalContainer.textContent = total.toFixed(2);
}

// Function to handle the wishlist toggle (heart icon functionality)
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

// Trigger the animation when the Pay Button is clicked
payButton.addEventListener('click', () => {
    // Ensure the van is visible when clicked
    deliveryVan.style.display = 'block';

    // Add the van-moving class to start the van's animation
    deliveryVan.classList.add('van-moving');

    // Temporarily expand the button
    payButton.classList.add('expanding');

    // After the button expansion animation finishes, remove the expansion
    setTimeout(() => {
        payButton.classList.remove('expanding');
    }, 500); // The duration of the button expansion (500ms)

    // After the animation ends (4s), you can trigger other actions
    setTimeout(() => {
        showToast("Your order is on its way!");
        // Optionally reset the van position or hide the van after the animation
        deliveryVan.classList.remove('van-moving');
        deliveryVan.style.display = 'none'; // Hide van again after the animation
        
        // Empty the cart after payment
        cart.length = 0;
        updateCart(); // Update cart after clearing
    }, 4000); // Duration of the van animation (4 seconds)
});

// Initialize the product listing
displayProducts();
