export const cart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
    },
    {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 5,
    },
];

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