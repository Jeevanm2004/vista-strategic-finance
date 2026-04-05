/**
 * Format a date string as "15 Jan 2026"
 * @param {string} dateStr - ISO date string (e.g. "2026-01-15")
 * @returns {string}
 */
export default function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00")
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
