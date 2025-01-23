/**
 * @description This function will convert the priceCents to price with 2 decimal points
 * @param priceCents : The price in cents
 * @returns : The price in dollars with 2 decimal points
 */

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
} 