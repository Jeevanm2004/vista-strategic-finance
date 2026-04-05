import { motion } from "framer-motion"
import { useApp } from "../../context/AppContext"
import NumericTicker from "../ui/NumericTicker"
import RefractiveCard from "../ui/RefractiveCard"
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
} from "../../utils/insightCalculators"

function NuanceCurrency({ amount, isHero = false }) {
  return (
    <div className={`font-black tracking-tighter leading-none flex items-baseline ${isHero ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-3xl'}`}>
      <NumericTicker value={amount} className="text-zinc-900 dark:text-white" />
      <NumericTicker 
        value={amount} 
        isCents={true} 
        className={`text-zinc-400 dark:text-zinc-600 ml-1 ${isHero ? 'text-base sm:text-lg md:text-2xl' : 'text-sm'}`} 
      />
      {isHero && (
        <svg className="w-5 h-5 ml-4 text-zinc-300 dark:text-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      )}
    </div>
  )
}

export default function SummaryCards() {
  const { state } = useApp()
  const { transactions } = state

  const balance = getBalance(transactions)
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Hero Balance Section */}
      <motion.div variants={itemVariants} className="py-2">
         <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-500">Personal Plan</p>
         </div>
         <NuanceCurrency amount={balance} isHero={true} />
         <p className="text-[11px] font-bold text-zinc-600 dark:text-zinc-600 uppercase tracking-widest mt-6 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            Last transaction: <span className="text-zinc-900 dark:text-zinc-400 font-black italic">You earned +$205.99 from James</span> 
            <span className="opacity-60">• 2 mins ago</span>
         </p>
      </motion.div>

      {/* Grid for Income/Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { label: "Total Income", amount: income, trend: "+12%", color: "text-emerald-500" },
          { label: "Total Expenses", amount: expenses, trend: "-8%", color: "text-rose-500" }
        ].map((card, idx) => (
          <RefractiveCard 
            key={idx}
            variants={itemVariants}
            className="nuance-card rounded-[2.5rem] p-8 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors"
          >
             <div className="flex items-center justify-between mb-8 relative z-20">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-500">{card.label}</h3>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 ${card.color}`}>
                   {card.trend}
                </span>
             </div>
             <div className="relative z-20">
               <NuanceCurrency amount={card.amount} />
               <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mt-4">vs last month</p>
             </div>
             
             {/* Decorative glow background */}
             <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/5 dark:bg-white/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 dark:group-hover:bg-white/10 transition-colors z-0" />
          </RefractiveCard>
        ))}
      </div>
    </motion.div>
  )
}
