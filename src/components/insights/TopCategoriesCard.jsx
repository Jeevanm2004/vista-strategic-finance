import { useApp } from "../../context/AppContext"
import formatCurrency from "../../utils/formatCurrency"
import RefractiveCard from "../ui/RefractiveCard"

function getCategoryRanking(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense")
  const map = {}
  expenses.forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount })
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
}

export default function TopCategoriesCard() {
  const { state } = useApp()
  const top3 = getCategoryRanking(state.transactions)
  const maxAmount = top3[0]?.amount || 1

  return (
    <RefractiveCard className="nuance-card rounded-[2.5rem] p-8 hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-1 leading-none">Expense Allocation</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Categories Performance</p>
        </div>
      </div>

      <div className="space-y-6">
        {top3.map((item) => {
          const barWidth = (item.amount / maxAmount) * 100
          return (
            <div key={item.category} className="group/item relative z-10">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-500 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors">{item.category}</span>
                <span className="text-[13px] font-black text-zinc-900 dark:text-white tabular-nums tracking-widest">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-white/[0.03] rounded-full h-[2px] overflow-hidden">
                <div
                  className="h-full bg-indigo-500 dark:bg-white transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)] dark:shadow-[0_0_8px_white]"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </RefractiveCard>
  )
}
