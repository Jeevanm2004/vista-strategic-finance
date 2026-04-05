import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CATEGORIES = ["Food", "Transport", "Salary", "Rent", "Entertainment", "Freelance", "Utilities", "Other"]

export default function TransactionModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
  })
  const initialInputRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      // Small timeout to ensure the modal is rendered before focusing
      setTimeout(() => initialInputRef.current?.focus(), 100)
    }
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  // Reset form when modal opens with new/edit data
  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        description: initialData.description,
        amount: initialData.amount.toString(),
        category: initialData.category,
        type: initialData.type,
      })
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        description: "",
        amount: "",
        category: "Food",
        type: "expense",
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.description || !formData.amount || isNaN(parseFloat(formData.amount))) return

    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
    })
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" 
            onClick={handleBackdropClick} 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0c0c0e] rounded-[2rem] shadow-2xl border border-zinc-200/50 dark:border-zinc-800/80 overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/30 dark:bg-transparent">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {initialData ? "Edit Transaction" : "Add Transaction"}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {initialData ? "Update your record details" : "Keep track of your spending"}
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500/80 dark:text-zinc-500 ml-1">Type</label>
                  <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-zinc-200/50 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: "expense" })}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all btn-satisfying ${
                        formData.type === "expense" 
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" 
                          : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                      }`}
                    >
                      Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: "income" })}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all btn-satisfying ${
                        formData.type === "income" 
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" 
                          : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                      }`}
                    >
                      Income
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500/80 dark:text-zinc-500 ml-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full h-[46px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl px-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500/80 dark:text-zinc-500 ml-1">Description</label>
                <input
                  ref={initialInputRef}
                  type="text"
                  required
                  placeholder="e.g. Starbucks Coffee"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-[46px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl px-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500/80 dark:text-zinc-500 ml-1">Amount</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                      <span className="text-sm font-semibold">₹</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full h-[46px] pl-10 pr-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold tabular-nums focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500/80 dark:text-zinc-500 ml-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-[46px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl px-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all btn-satisfying"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all btn-satisfying"
                >
                  {initialData ? "Save Changes" : "Add Transaction"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
