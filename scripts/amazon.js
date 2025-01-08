import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;    
});

// Add the products to the Amazon page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Define the addedMessageTimeouts object
let addedMessageTimeoutId; 

// Define the add to cart buttons
document.querySelectorAll('.js-add-to-cart')
  .forEach((button, index) => {
    button.addEventListener('click', () => {
      //console.log(button.dataset); // All data attributes can be accessed via the dataset property
      const productId = button.dataset.productId; // data-product-id data attribute becomes dataset.productId
      
      let matchingItem; // Define a variable to store the matching item

      // Find the product already in the cart
      cart.forEach((item) => {        
        if(productId === item.productId) {
          matchingItem = item;
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
      
      let cartQuantity = 0; // Define a variable to store the cart quantity
      
      cart.forEach((item) => {
        cartQuantity += item.quantity; // Increment the cart quantity
      });

      // Update the cart quantity in the header
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      // Log the cart array to the console
      console.log(cart);

      // Log the cart Quantity to the console
      console.log(cartQuantity);
      
      // Locate the element for added to cart message
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

      // Show the added to cart message      
      addedMessage.classList.add('added-to-cart-visible');

      if(addedMessageTimeoutId){
        clearTimeout(addedMessageTimeoutId); // Clear the previous timeout
      }

      const timeoutId = setTimeout(() => {
        // Hide the added to cart message after 2 seconds
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      // Store the timeout id in the addedMessageTimeouts object
      addedMessageTimeoutId = timeoutId;
    });
  });