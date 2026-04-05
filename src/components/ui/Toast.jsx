import { useEffect } from "react"
import { motion } from "framer-motion"

const TOAST_TYPES = {
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
  error: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20",
  info: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20",
}

export default function Toast({ message, type = "success", duration = 3000, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, duration)
    return () => clearTimeout(timer)
  }, [duration, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-center gap-3 px-4 py-3 rounded-[12px] border shadow-[0_8px_24px_rgba(0,0,0,0.08)] pointer-events-auto ${TOAST_TYPES[type] || TOAST_TYPES.success}`}
    >
      <div className={`w-2 h-2 rounded-full ${
        type === "success" ? "bg-emerald-500" : type === "error" ? "bg-rose-500" : "bg-indigo-500"
      } shadow-[0_0_8px_currentColor]`} />
      <span className="text-sm font-semibold tracking-tight">{message}</span>
      <button 
        onClick={onRemove}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  )
}
