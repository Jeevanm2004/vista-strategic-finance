import { useState } from "react"
import { useApp } from "../context/AppContext"
import TransactionFilters from "../components/transactions/TransactionFilters"
import TransactionTable from "../components/transactions/TransactionTable"
import TransactionModal from "../components/transactions/TransactionModal"

export default function Transactions() {
  const { state, dispatch } = useApp()
  const { role, transactions, filters } = state

  const handleEdit = (transaction) => {
    dispatch({ type: "OPEN_MODAL", payload: transaction })
  }

  // Removed local handleSave as it's now in Layout.jsx

  const handleAddNew = () => {
    dispatch({ type: "OPEN_MODAL" })
  }

  const getFilteredTransactions = () => {
    return transactions.filter((t) => {
      const matchType = filters.type === "all" || t.type === filters.type
      const matchSearch =
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      return matchType && matchSearch
    })
  }

  const handleExportCSV = () => {
    const filtered = getFilteredTransactions()
    const headers = ["ID", "Date", "Description", "Amount", "Category", "Type"]
    
    const csvContent = [
      headers.join(","),
      ...filtered.map(t => `${t.id},${t.date},"${t.description.replace(/"/g, '""')}",${t.amount},${t.category},${t.type}`)
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "transactions-export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExportJSON = () => {
    const filtered = getFilteredTransactions()
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "transactions-export.json")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none font-heading">
            Transactions
          </h1>
          <p className="text-[13px] font-bold text-zinc-400 dark:text-zinc-500 mt-3 uppercase tracking-widest">
            Detailed financial record management
          </p>
        </div>
        
        {role === "admin" && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Export CSV
            </button>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export JSON
            </button>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl hover:shadow-[0_8px_24px_rgba(79,70,229,0.4)] active:scale-[0.98] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              New Transaction
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <TransactionFilters />
        <TransactionTable onEdit={handleEdit} />
      </div>
    </div>
  )
}
