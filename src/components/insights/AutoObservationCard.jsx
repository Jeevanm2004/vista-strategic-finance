import { useApp } from "../../context/AppContext"
import formatCurrency from "../../utils/formatCurrency"
import {
  getTotalIncome,
  getTotalExpenses,
  getTopCategory,
  getMonthlyTotals,
} from "../../utils/insightCalculators"
import RefractiveCard from "../ui/RefractiveCard"

function generateObservations(transactions) {
  const observations = []
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  const balance = income - expenses
  const top = getTopCategory(transactions)
  const monthly = getMonthlyTotals(transactions)

  if (top.category !== "N/A") {
    const pct = ((top.amount / expenses) * 100).toFixed(0)
    observations.push({
      icon: "📊",
      text: `Your highest expense category is ${top.category} at ${formatCurrency(top.amount)}, accounting for ${pct}% of total spending.`,
    })
  }

  if (income > 0) {
    const savingsRate = ((balance / income) * 100).toFixed(0)
    observations.push({
      icon: "💰",
      text: `You're saving ${savingsRate}% of your income — that's ${formatCurrency(balance)} over the last 3 months.`,
    })
  }

  if (monthly.length >= 2) {
    const latest = monthly[monthly.length - 1]
    const prev = monthly[monthly.length - 2]
    const diff = latest.expenses - prev.expenses

    if (diff < 0) {
      observations.push({
        icon: "📉",
        text: `Great job! Your spending dropped by ${formatCurrency(Math.abs(diff))} in ${latest.month} compared to ${prev.month}.`,
      })
    } else if (diff > 0) {
      observations.push({
        icon: "📈",
        text: `Heads up — spending increased by ${formatCurrency(diff)} in ${latest.month} compared to ${prev.month}.`,
      })
    }
  }

  return observations
}

export default function AutoObservationCard() {
  const { state } = useApp()
  const observations = generateObservations(state.transactions)

  return (
    <RefractiveCard className="nuance-card rounded-[2.5rem] p-8 flex flex-col hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
      <div className="flex items-center gap-4 mb-10 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] text-white dark:text-black flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-1 leading-none">Smart Analysis</h2>
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest leading-none">Automated Intelligence</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {observations.map((obs, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/[0.03] group/obs hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-all duration-300"
          >
            <span className="text-xl flex-shrink-0 grayscale group-hover/obs:grayscale-0 transition-all duration-300 transform group-hover/obs:scale-110">{obs.icon}</span>
            <p className="text-[12px] font-bold text-zinc-600 dark:text-zinc-400 group-hover/obs:text-zinc-900 dark:group-hover/obs:text-white transition-colors leading-relaxed tracking-wide uppercase">{obs.text}</p>
          </div>
        ))}
      </div>
    </RefractiveCard>
  )
}
