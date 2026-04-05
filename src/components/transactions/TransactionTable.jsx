import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useApp } from "../../context/AppContext"
import formatCurrency from "../../utils/formatCurrency"
import formatDate from "../../utils/formatDate"
import AlertDialog from "../ui/AlertDialog"

export default function TransactionTable({ onEdit }) {
  const { state, dispatch } = useApp()
  const { transactions, filters, role } = state
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [deleteId, setDeleteId] = useState(null)

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = filters.type === "all" || t.type === filters.type
      const matchSearch =
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      return matchType && matchSearch
    })
  }, [transactions, filters])

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredTransactions, sortConfig])

  const confirmDelete = () => {
    if (deleteId) {
      dispatch({ type: "DELETE_TRANSACTION", payload: deleteId })
      setDeleteId(null)
    }
  }

  const getIcon = (description) => {
    const d = description.toLowerCase()
    if (d.includes('play')) return { char: 'P', color: 'bg-indigo-600' }
    if (d.includes('net')) return { char: 'N', color: 'bg-zinc-400 dark:bg-zinc-800' }
    if (d.includes('star')) return { char: 'S', color: 'bg-emerald-600' }
    return { char: description[0].toUpperCase(), color: 'bg-zinc-400 dark:bg-zinc-800' }
  }

  if (transactions.length === 0) {
    return (
      <div className="nuance-card rounded-[2.5rem] p-12 text-center">
        <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-2">No activities</h3>
        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">Your financial history will appear here.</p>
      </div>
    )
  }

  return (
    <div className="nuance-card rounded-[2.5rem] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-700">
              <th className="px-10 py-8">Date</th>
              <th className="px-10 py-8">Activity</th>
              <th className="px-10 py-8">Category</th>
              <th className="px-10 py-8 text-right">Amount</th>
              {role === "admin" && <th className="px-10 py-8 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.02]">
            {sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} className="px-10 py-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white leading-none">No transactions found</p>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-600 leading-none">Try adjusting your search or filters</p>
                    </div>
                    </div>
                </td>
              </tr>
            ) : (
              sortedTransactions.map((t) => {
                const { char, color } = getIcon(t.description)
                return (
                  <tr 
                    key={t.id} 
                    className="group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <td className="px-10 py-6 text-[11px] font-bold text-zinc-600 dark:text-zinc-600 uppercase tracking-widest">{formatDate(t.date)}</td>
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-black text-xs shadow-2xl`}>
                             {char}
                          </div>
                          <div>
                             <p className="text-[13px] font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-wide">{t.description}</p>
                             <p className="text-[9px] font-black text-zinc-600 dark:text-zinc-600 uppercase tracking-widest mt-1">Foundations • {formatDate(t.date)}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-6">
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-500 opacity-80">
                         {t.category}
                       </span>
                    </td>
                    <td className="px-10 py-6 text-right tabular-nums">
                      <span className={`text-[14px] font-black tracking-tighter ${t.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </span>
                    </td>
                    {role === "admin" && (
                      <td className="px-10 py-6 text-right whitespace-nowrap">
                        <button onClick={() => onEdit(t)} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white mr-4 transition-colors">Edit</button>
                        <button onClick={() => setDeleteId(t.id)} className="text-[10px] font-black uppercase tracking-widest text-rose-500 dark:text-rose-900 hover:text-rose-600 transition-colors">Delete</button>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Activity"
        description="Are you sure you want to remove this record?"
        confirmText="Remove"
      />
    </div>
  )
}
