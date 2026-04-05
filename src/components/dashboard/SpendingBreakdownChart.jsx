import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { useApp } from "../../context/AppContext"
import formatCurrency from "../../utils/formatCurrency"

const COLORS = [
  "url(#colorIndigo1)",
  "url(#colorIndigo2)",
  "url(#colorIndigo3)",
  "url(#colorIndigo4)",
  "url(#colorIndigo5)",
]

const GradientDefs = () => (
  <defs>
    <linearGradient id="colorIndigo1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#6366f1" />
      <stop offset="100%" stopColor="#4f46e5" />
    </linearGradient>
    <linearGradient id="colorIndigo2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#818cf8" />
      <stop offset="100%" stopColor="#6366f1" />
    </linearGradient>
    <linearGradient id="colorIndigo3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#4f46e5" />
      <stop offset="100%" stopColor="#3730a3" />
    </linearGradient>
    <linearGradient id="colorIndigo4" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#3730a3" />
      <stop offset="100%" stopColor="#312e81" />
    </linearGradient>
    <linearGradient id="colorIndigo5" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#1e1b4b" />
      <stop offset="100%" stopColor="#0f172a" />
    </linearGradient>
  </defs>
)

const LEGEND_COLORS = ["#6366f1", "#818cf8", "#4f46e5", "#3730a3", "#1e1b4b"]

function getCategoryBreakdown(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense")
  const map = {}
  expenses.forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount })
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="nuance-glass px-4 py-2 rounded-xl shadow-2xl"
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-500 mb-1">{name}</p>
      <p className="text-sm font-black text-zinc-900 dark:text-white">{formatCurrency(value)}</p>
    </motion.div>
  )
}

export default function SpendingBreakdownChart() {
  const { state } = useApp()
  const data = getCategoryBreakdown(state.transactions)
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const [activeCategory, setActiveCategory] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (data.length === 0) {
    return (
      <div className="nuance-card h-[400px] flex items-center justify-center rounded-[2.5rem]">
        <p className="text-zinc-400 dark:text-zinc-600 font-black uppercase tracking-widest text-[10px] opacity-50">No spending data</p>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="nuance-card rounded-[2.5rem] p-8 h-[400px] flex flex-col group"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-500 mb-1">Saving Wallet</h2>
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest leading-none">Allocates your income</p>
        </div>
        
        {/* Fixed Info Area (Neo-Minimalist approach to avoid overlaps) */}
        <div className="h-8 flex flex-col items-end justify-center">
          <AnimatePresence mode="wait">
            {activeCategory ? (
              <motion.div
                key={activeCategory.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-right"
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500 dark:text-white leading-none mb-1">
                  {activeCategory.name}
                </p>
                <p className="text-[11px] font-black text-zinc-900 dark:text-white tabular-nums leading-none">
                  {formatCurrency(activeCategory.value)}
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
              >
                Hover sectors
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10" style={{ minWidth: 0 }}>
        <div className="relative w-40 h-40 flex items-center justify-center" style={{ minWidth: 0 }}>
          <div style={{ width: '100%', minWidth: 0 }}>
            {isReady && (
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <GradientDefs />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {data.map((entry, i) => (
                      <Cell 
                        key={i} 
                        fill={COLORS[i % COLORS.length]} 
                        onMouseEnter={() => setActiveCategory(entry)}
                        onMouseLeave={() => setActiveCategory(null)}
                        className="hover:opacity-80 transition-opacity outline-none cursor-pointer" 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, type: "spring", bounce: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-1"
          >
            <span className="text-lg font-black text-zinc-900 dark:text-white tracking-widest tabular-nums">
              {formatCurrency(total).split('.')[0]}
            </span>
            <span className="text-[9px] font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.2em] mt-1 opacity-80">Total Spent</span>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-x-6 gap-y-4 w-full"
        >
          {data.slice(0, 4).map((entry, index) => (
            <motion.div key={entry.name} variants={itemVariants} className="flex items-center gap-3 group/item">
              <div 
                className="w-1.5 h-1.5 rounded-full ring-1 ring-zinc-300 dark:ring-white/10" 
                style={{ background: LEGEND_COLORS[index % LEGEND_COLORS.length] }} 
              />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-600 group-hover/item:text-zinc-800 dark:group-hover/item:text-zinc-400 transition-colors">
                  {entry.name}
                </span>
                <span className="text-[10px] font-black text-zinc-900 dark:text-white tabular-nums">
                   {((entry.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
