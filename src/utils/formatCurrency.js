/**
 * Format a number as Indian Rupee currency (₹1,000.00)
 * @param {number} amount
 * @returns {string}
 */
export default function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
