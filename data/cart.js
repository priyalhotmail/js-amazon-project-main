export const cart = [];

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
        });
    }
}