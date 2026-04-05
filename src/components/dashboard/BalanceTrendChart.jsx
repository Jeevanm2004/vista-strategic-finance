import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useApp } from "../../context/AppContext"
import { getMonthlyTotals } from "../../utils/insightCalculators"
import formatCurrency from "../../utils/formatCurrency"

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="nuance-glass px-5 py-4 rounded-2xl shadow-2xl"
    >
      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-3 leading-none">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-8 mb-2 last:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">{entry.name}</span>
          </div>
          <span className="text-[13px] tabular-nums font-black text-zinc-900 dark:text-white">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </motion.div>
  )
}

export default function BalanceTrendChart() {
  const { state } = useApp()
  const data = getMonthlyTotals(state.transactions)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (data.length === 0) {
    return (
      <div className="nuance-card h-[400px] flex items-center justify-center rounded-[2.5rem]">
        <p className="text-zinc-400 dark:text-zinc-600 font-black uppercase tracking-widest text-[10px] opacity-50">No trend data available</p>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="nuance-card rounded-[2.5rem] p-8 h-[400px] flex flex-col relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-1">Activities</h2>
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest flex items-center gap-2">
            Show your money flow <span className="text-emerald-500">+4% from last month</span>
          </p>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-600">Incomes</span>
           </div>
           <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-50" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-600">Expenses</span>
           </div>
        </div>
      </div>

      <div className="flex-1 w-full mt-4 relative z-10 overflow-hidden" style={{ minWidth: 0 }}>
        <div style={{ width: '100%', minWidth: 0 }}>
          {isReady && (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 900, fill: '#71717a', letterSpacing: '0.1em' }} /* zinc-500 for better visibility */
                  dy={15}
                />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99,102,241,0.1)', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorMain)"
                  animationDuration={2000}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#6366f1"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  strokeOpacity={0.3}
                  fill="transparent"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Decorative background number */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.02, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
         <span className="text-9xl font-black text-zinc-900 dark:text-white italic tracking-tighter">403,585</span>
      </motion.div>
    </motion.div>
  )
}
