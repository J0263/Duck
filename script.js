// Sample product details (you can replace with dynamic data)
const product = {
    name: 'Duck',
    price: 49.99,
    image: './ImagesTemp/DuckLogo.png', // Placeholder for product image
    colors: ['Red', 'Blue', 'Green', 'Yellow']
};
// Load cart from local storage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
// Function to render the cart
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    // If the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Loop through the cart and create HTML for each item
        cart.forEach((item, index) => {  // <-- 'index' is used to identify each item
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <p>${item.name} (${item.color})</p>
                        <div class="cart-item-quantity">
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-from-cart" data-index="${index}">Remove All</button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });
    }
    updateSubtotal();
    // Add event listeners to all remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);  // <-- Attach click event listener to each "Remove" button
    });
}
// Function to update the subtotal
function updateSubtotal() {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    saveCart();
}
// Function to save cart to local storage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}
// Function to add product to cart
function addToCart() {
    const selectedColor = document.getElementById('color-select').value;
    // Create cart item
    const cartItem = {
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        quantity: 1
    };
    // Check if the item already exists in the cart (by name and color)
    const existingItem = cart.find(item => item.name === cartItem.name && item.color === cartItem.color);
    if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If item does not exist, add it to the cart
        cart.push(cartItem);
    }
    // Re-render the cart
    renderCart();
}
// Add event listener to the "Add to Cart" button
document.getElementById('add-to-cart-button').addEventListener('click', addToCart);
// Render the cart on page load
renderCart();
// Function to handle closing the cart
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-container').classList.add('hide');
});

function removeFromCart(event) {
    const itemIndex = event.target.getAttribute('data-index');  // Get the index of the item to remove
    cart.splice(itemIndex, 1);
    renderCart();
}
document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    
    const modalLink = document.querySelector("#click-modal");
    modalLink.click();
  });