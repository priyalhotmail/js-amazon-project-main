// Define the cart array and initialize it with the cart array from local storage

export let cart = JSON.parse(localStorage.getItem('cart')); 

if(!cart) {
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        },
        {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 5,
            deliveryOptionId: '3'
        },
    ];
}


// Define the saveToLocalStorage function to save the cart array to local storage
export function saveToLocalStorage() {
    // Save the cart array to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Define the addToCart function to add given product to the cart
export function addToCart(productId) {
    let matchingItem; // Define a variable to store the matching item

    // Find the product already in the cart
    cart.forEach((cartItem) => {        
        if(productId === cartItem.productId) {
        matchingItem = cartItem;
        }
    });

    const qtyElement = document.querySelector(`.js-quantity-selector-${productId}`);

    // If the product is already in the cart, increment the quantity otherwise push the product to the cart array
    if(matchingItem){
        // If the product is already in the cart, increment the quantity
        matchingItem.quantity += parseInt(qtyElement.value);
    }else{
        // Push the product to the cart array
        cart.push({
        productId: productId,
        quantity: parseInt(qtyElement.value),
        deliveryOptionId: '1',
        });
    }

    saveToLocalStorage(); // Save the cart array to local storage
}

export function removeFromCart(productId) {
    // Define a new cart array
    const newCart = [];

    // Loop through the cart array and add all items except the one with the given product ID
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    // Update the cart array with the new cart array
    cart = newCart;

    saveToLocalStorage(); // Save the cart array to local storage
}