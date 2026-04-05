import { useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "../../context/AppContext"

const pageTitles = {
  "/overview": "Overview",
  "/transactions": "Transactions",
  "/insights": "Insights",
}

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation()
  const { state, dispatch } = useApp()
  const [roleOpen, setRoleOpen] = useState(false)

  const handleRoleChange = (role) => {
    dispatch({ type: "SET_ROLE", payload: role })
    setRoleOpen(false)
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-20 flex items-center justify-between px-4 md:px-12 bg-transparent sticky top-0 z-30 gap-4"
    >
      <div className="flex items-center gap-2 md:gap-8 min-w-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 btn-satisfying"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2 md:gap-4 min-w-0 overflow-hidden">
           <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-widest uppercase truncate h-8">
             {pageTitles[pathname] || "Dashboard"}
           </h1>
           {pathname === '/overview' && (
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="hidden lg:block text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-600 uppercase pt-1"
             >
               This is your overview dashboard for this month
             </motion.span>
           )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">

        {/* Add Transaction Button - Restricted to Admin & Verified Dark Visibility */}
        {state.role === 'admin' && pathname !== '/overview' && pathname !== '/' && (
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: "OPEN_MODAL" })}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/10 transition-colors border border-transparent dark:border-white/10"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            New
          </motion.button>
        )}
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className="w-10 h-10 flex-shrink-0 rounded-xl nuance-glass hover:bg-zinc-100 dark:hover:bg-white/[0.08] flex items-center justify-center btn-satisfying transition-all group"
          title={state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {state.theme === "dark" ? (
            <svg className="w-[18px] h-[18px] text-zinc-400 group-hover:text-amber-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px] text-zinc-400 group-hover:text-indigo-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Profile / Role Selector */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="flex items-center gap-3 p-1.5 sm:pr-5 rounded-full nuance-glass hover:bg-zinc-100 dark:hover:bg-white/[0.08] transition-all group btn-satisfying"
          >
            <div className="w-9 h-9 rounded-full aspect-square flex-shrink-0 self-center bg-gradient-to-tr from-zinc-200 dark:from-white/10 to-zinc-100 dark:to-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${state.role === 'admin' ? 'James' : 'Kole'}`} 
                 alt="avatar" 
                 className="w-full h-full object-cover object-center rounded-full m-0 p-0" 
               />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-black text-zinc-900 dark:text-white leading-none tracking-widest uppercase">
                {state.role === 'admin' ? 'James Kole' : 'Sarah Chen'}
              </p>
              <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mt-1 opacity-80">
                {state.role === 'admin' ? 'Personal Account' : 'Guest Account'}
              </p>
            </div>
          </button>

          {roleOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setRoleOpen(false)} />
              <div className="absolute right-0 mt-4 w-48 nuance-card rounded-2xl py-2 z-20 animate-scale-in origin-top-right">
                {["admin", "viewer"].map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`flex items-center gap-3 w-full px-5 py-3 text-[10px] font-black tracking-widest uppercase transition-all ${
                      state.role === r ? "text-zinc-900 dark:text-white bg-zinc-50 dark:bg-white/5" : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${state.role === r ? "bg-indigo-500 dark:bg-white" : "bg-transparent ring-1 ring-zinc-300 dark:ring-white/20"}`} />
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
