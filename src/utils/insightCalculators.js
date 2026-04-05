/**
 * Calculate total income from transactions
 * @param {Array} transactions
 * @returns {number}
 */
export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calculate total expenses from transactions
 * @param {Array} transactions
 * @returns {number}
 */
export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calculate net balance (income - expenses)
 * @param {Array} transactions
 * @returns {number}
 */
export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions)
}

/**
 * Find the category with the highest total spending
 * @param {Array} transactions
 * @returns {{ category: string, amount: number }}
 */
export function getTopCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense")

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  const topCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0]

  return topCategory
    ? { category: topCategory[0], amount: topCategory[1] }
    : { category: "N/A", amount: 0 }
}

/**
 * Get income & expense totals grouped by month
 * @param {Array} transactions
 * @returns {Array<{ month: string, income: number, expenses: number }>}
 */
export function getMonthlyTotals(transactions) {
  const monthMap = {}

  transactions.forEach((t) => {
    const date = new Date(t.date + "T00:00:00")
    const key = date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    })

    if (!monthMap[key]) {
      monthMap[key] = { month: key, income: 0, expenses: 0 }
    }

    if (t.type === "income") {
      monthMap[key].income += t.amount
    } else {
      monthMap[key].expenses += t.amount
    }
  })

  return Object.values(monthMap)
}
