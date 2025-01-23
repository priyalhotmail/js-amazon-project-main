import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

/**
 * @description This function will render the order summary
 */
export function renderOrderSummary() {
  
    // Define and initialize cartSummary HTML
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        // Define productId and assign productId of the added item
        const productId = cartItem.productId;
        // Find the added product details from the product array
        const matchingProduct = getProduct(productId);

        // Define deliveryOptionId and assign deliveryOptionId of the added item
        const deliveryOptionId = cartItem.deliveryOptionId;

        // Find the added product deliveryOption details from the deliveryOptions array
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        // Define today
        const today = dayjs();
        // Define delivery date by adding delivery option dates of the added item
        const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
        // Format delivery date as Day, month, date 
        const dateString = deliveryDate.format('dddd, MMMM, D');

        // Generate HTML code for cart summary
        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" 
                        data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}                
                    </div>
                </div>
                </div>
        `;

        // Update order summary div segment with the generated HTML code
        document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    });

    /**
     * @description This function will generate HTML code for all the delivery options
     * @param {*} matchingProduct : Product to be considered
     * @param {*} cartItem : Added cart item to be considered
     * @returns : html code block for each cart item
     */
    function deliveryOptionsHTML(matchingProduct, cartItem){
        // Define and initialize html code for delivery options
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
        // Define today
        const today = dayjs();
        // Define delivery date by adding delivery option dates of the added item
        const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
        // Format delivery date as Day, month, date 
        const dateString = deliveryDate.format('dddd, MMMM, D');
        // Define Price string for each delivery option
        const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

        // Define checked variable to update selected delivery option's radio button is checked
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        // Generate html code segment for delivery options
        html +=`
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
            ${isChecked ? 'checked' : ''} 
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
            </div>
        </div>
        `
        });
        return html;
    }

    // Add event listner to delete links of each product
    document.querySelectorAll('.js-delete-link')
    .forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            
            // Call the removeFromCart function to remove the product from the cart
            removeFromCart(productId);        

            // Find the product container in the order summery
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            // Remove the product from the order summary
            container.remove();
            
            // Render the Payment summary when delete products from the cart
            renderPaymentSummary();
        });
    });


    // Update delivery date, shipping cost and order summary when a delivery option is selected
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOptions(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
  }

  // Render the order summary when load the checkout page
  renderOrderSummary();
  // Render the Payment summary when load the checkout page
  renderPaymentSummary();