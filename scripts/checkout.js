import {renderOrderSummary, updateCheckoutHeaderItems} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-oop.js'

// Render order summary when open the checkout page
renderOrderSummary();
// Render payment summary when open the checkout page
renderPaymentSummary();
// Render checkout header items when open the checkout page
updateCheckoutHeaderItems();