class Cart{
    cartItem;
    loadFromLocalStorage;

    constructor(loadFromLocalStorage){
        this.localStorageKey = this.localStorageKey;
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        // Define the cart array and initialize it with the cart array from local storage
        this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey)); 
    
        if(!this.cartItem) {
            this.cartItem = [
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
    }

    // Define the saveToLocalStorage function to save the cart array to local storage
    saveToLocalStorage() {
        // Save the cart array to local storage
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
    }

    // Define the addToCart function to add given product to the cart
    addToCart(productId) {
        let matchingItem; // Define a variable to store the matching item

        // Find the product already in the cart
        this.cartItem.forEach((cartItem) => {        
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
            this.cartItem.push({
            productId: productId,
            quantity: parseInt(qtyElement.value),
            deliveryOptionId: '1',
            });
        }

        this.saveToLocalStorage(); // Save the cart array to local storage
    }

    removeFromCart(productId) {
        // Define a new cart array
        const newCart = [];
    
        // Loop through the cart array and add all items except the one with the given product ID
        this.cartItem.forEach((cartItem) => {
            if(cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
    
        // Update the cart array with the new cart array
        this.cartItem = newCart;
    
        saveToLocalStorage(); // Save the cart array to local storage
    }

    /**
     * @description This function will update the delivery options and update the local storage
     * @param productId : The product ID to be find the product in the cart
     * @param deliveryOptionId : The delivery option ID to be updated
     */
    updateDeliveryOptions(productId, deliveryOptionId) {
        let matchingItem; // Define a variable to store the matching item

        // Find the product already in the cart
        this.cartItem.forEach((cartItem) => {        
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        // Update cart in local storage
        saveToLocalStorage();
    }

    getCartItemCount(){
        let count = 0;
    
        this.cartItem.forEach((cartItem) => {
            count += cartItem.quantity;
        })
    
        console.log(`cart count: ${count}`);
        
        return count;
    }
} 

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
