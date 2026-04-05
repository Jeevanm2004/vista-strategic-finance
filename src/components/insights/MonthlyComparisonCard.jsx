import { useApp } from "../../context/AppContext"
import formatCurrency from "../../utils/formatCurrency"
import { getMonthlyTotals } from "../../utils/insightCalculators"
import RefractiveCard from "../ui/RefractiveCard"

export default function MonthlyComparisonCard() {
  const { state } = useApp()
  const monthly = getMonthlyTotals(state.transactions)

  const feb = monthly.find((m) => m.month.includes("Feb")) || { expenses: 0 }
  const mar = monthly.find((m) => m.month.includes("Mar")) || { expenses: 0 }

  const diff = mar.expenses - feb.expenses
  const pctChange = feb.expenses > 0 ? ((diff / feb.expenses) * 100).toFixed(1) : 0
  const isUp = diff > 0

  return (
    <RefractiveCard className="nuance-card rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[260px] hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
      <div className="flex items-center justify-between relative z-10 mb-8">
        <div>
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-1 leading-none">Market Velocity</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Monthly Peer Analysis</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black shadow-[0_0_12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_12px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          {isUp ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-4 mb-4 relative z-10">
         <span className="text-4xl font-black text-zinc-900 dark:text-white tracking-widest uppercase">{formatCurrency(mar.expenses).split('.')[0]}</span>
         <span className="text-[10px] font-black tracking-widest text-zinc-500 dark:text-zinc-600 uppercase">This Month</span>
      </div>

      <div className={`relative p-6 rounded-[2rem] border transition-all duration-500 ${
        isUp ? "bg-emerald-500/[0.05] border-emerald-500/10" : "bg-rose-500/[0.05] border-rose-500/10"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-1 h-8 rounded-full ${isUp ? "bg-emerald-500" : "bg-rose-500"}`} />
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[12px] font-black tracking-widest uppercase ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                {isUp ? "+" : ""}{pctChange}% {isUp ? "Up" : "Down"}
              </span>
              <p className="text-[10px] font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">
                Net change of {formatCurrency(Math.abs(diff))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </RefractiveCard>
  )
}
