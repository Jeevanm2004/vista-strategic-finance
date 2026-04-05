import { useApp } from "../../context/AppContext"
import formatCurrency from "../../utils/formatCurrency"
import RefractiveCard from "../ui/RefractiveCard"

export default function TopCategoryCard() {
  const { state } = useApp()
  const expenses = state.transactions.filter((t) => t.type === "expense")
  
  const categoryMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
  
  const sorted = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])
  const top = sorted.length > 0 ? { category: sorted[0][0], amount: sorted[0][1] } : { category: "", amount: 0 }
  
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)
  const pct = totalExpenses > 0 ? Math.round((top.amount / totalExpenses) * 100) : 0

  return (
    <RefractiveCard className="nuance-card rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[260px] hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-1 leading-none">Top Allocation</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Relative Influence</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_12px_rgba(255,255,255,0.2)] text-white dark:text-black flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div>
           <div className="mb-4">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-600 block mb-1">Highest Spend</span>
              <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-widest uppercase">{formatCurrency(top.amount).split('.')[0]}</p>
           </div>
           <span className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-700 dark:text-zinc-400 opacity-80 italic">{top.category || "No Analysis"}</span>
        </div>
        
        <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 border-[0.5px] border-zinc-200 dark:border-white/5 rounded-full scale-125" />
            <div className="text-center">
               <p className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter tabular-nums leading-none">{pct}</p>
               <p className="text-[9px] font-black tracking-widest uppercase text-zinc-700 dark:text-zinc-600 mt-1">% OF VOL</p>
            </div>
        </div>
      </div>
    </RefractiveCard>
  )
}
