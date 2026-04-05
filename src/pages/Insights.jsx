import { motion } from "framer-motion"
import TopCategoryCard from "../components/insights/TopCategoryCard"
import MonthlyComparisonCard from "../components/insights/MonthlyComparisonCard"
import TopCategoriesCard from "../components/insights/TopCategoriesCard"
import AutoObservationCard from "../components/insights/AutoObservationCard"

export default function Insights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-white shadow-[0_0_12px_rgba(99,102,241,0.6)] dark:shadow-[0_0_12px_white]" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">AI Intelligence</p>
           </div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-widest uppercase">
            Market Velocity
          </h1>
          <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em] mt-6 flex items-center gap-2">
             Live Status: <span className="text-emerald-500 font-black italic">Financial Velocity +4.2%</span> 
             <span className="opacity-40">• Optimized</span>
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 nuance-glass rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-widest">Real-time Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <TopCategoryCard />
        <MonthlyComparisonCard />
        <TopCategoriesCard />
        <AutoObservationCard />
      </div>
    </div>
  )
}
