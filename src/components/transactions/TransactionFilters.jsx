import { useApp } from "../../context/AppContext"

export default function TransactionFilters() {
  const { state, dispatch } = useApp()
  const { filters } = state

  const types = [
    { label: "All", value: "all" },
    { label: "Income", value: "income" },
    { label: "Expenses", value: "expense" },
  ]

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="relative flex-1 w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:scale-110 transition-transform">
          <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search descriptions, categories..."
          value={filters.search}
          onChange={(e) => dispatch({ type: "SET_FILTER", payload: { search: e.target.value } })}
          className="block w-full pl-11 pr-4 py-3.5 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-2xl text-[13px] font-bold text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/70 focus:outline-none focus:bg-white/60 dark:focus:bg-white/10 transition-all shadow-sm"
        />
      </div>

      {/* Type Filter Segmented Control */}
      <div className="flex items-center p-1.5 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/5 self-stretch">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => dispatch({ type: "SET_FILTER", payload: { type: type.value } })}
            className={`relative px-6 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 btn-satisfying ${
              filters.type === type.value
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {filters.type === type.value && (
              <div className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-lg ring-1 ring-black/[0.05] dark:ring-white/[0.05] animate-scale-in" />
            )}
            <span className="relative z-10">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
