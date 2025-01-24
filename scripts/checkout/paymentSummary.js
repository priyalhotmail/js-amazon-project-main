import { cart, getCartItemCount } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency} from "../utils/money.js";

/**
 * @description This function renders the payment summary option
 */
export function renderPaymentSummary() {
    let productPriceCents = 0; // Define and initialize the product price in cents
    let shippingPriceCents = 0; // Define and initialize the Shipping cost in cents

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        // Find the product details from the products array
        const product = getProduct(productId); 
        // Calculate each product value by product price and quantity
        const productValue = product.priceCents * cartItem.quantity;
        // Assign the product value to the productPrice in cents
        productPriceCents += productValue;
        // Find the delivery option details
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        // Assign the Shipping cost of delivery method to the shipping cost in cents
        shippingPriceCents += deliveryOption.priceCents;
    });
    
    // Calculate total amount before tax
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    // calculate tax amount based on total amount before tax
    const taxCents = totalBeforeTaxCents * 0.1;
    // calculate total amount by adding total amount before tax and tax amount
    const totalCents = totalBeforeTaxCents + taxCents;
    
    // Define the payment summary HTML
    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${getCartItemCount()}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    // Render the payment summary HTML
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}