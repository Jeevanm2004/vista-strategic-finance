import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useApp } from "../../context/AppContext"

const links = [
  {
    to: "/overview",
    label: "Overview",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    to: "/insights",
    label: "Insights",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { state } = useApp()
  const baseLinkClass =
    "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 relative group btn-satisfying mb-4 mx-auto"
  const activeLinkClass =
    "bg-indigo-500/10 dark:bg-white/5 text-indigo-600 dark:text-white shadow-[0_0_20px_rgba(99,102,241,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-indigo-500/20 dark:ring-white/10"
  const inactiveLinkClass =
    "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const sidebarContent = (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full items-center"
    >
      {/* Brand Logo */}
      <motion.div variants={itemVariants} className="py-10">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl bg-zinc-950 dark:bg-white flex items-center justify-center text-white dark:text-zinc-950 shadow-xl transition-all duration-500 ring-1 ring-white/10 dark:ring-zinc-900/10 cursor-pointer"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 w-full px-2">
        {links.map((link) => (
          <motion.div key={link.to} variants={itemVariants}>
            <NavLink
              to={link.to}
              end={link.to === "/overview"}
              onClick={onClose}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
              title={link.label}
            >
              {({ isActive }) => (
                <>
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                  >
                    {link.icon}
                  </motion.span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 dark:bg-white rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.6)] dark:shadow-[0_0_12px_white]" 
                    />
                  )}
                  {/* Desktop Tooltip */}
                  <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 w-20 px-2 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[8px] font-black uppercase tracking-tighter text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 text-center leading-tight">
                    {link.label}
                  </div>
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer / Profile Minimal */}
      <motion.div variants={itemVariants} className="mt-auto p-6 flex flex-col items-center gap-6">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-black text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group btn-satisfying relative"
        >
          {state.role === 'admin' ? 'JK' : 'SC'}
          <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 w-20 px-2 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[8px] font-black uppercase tracking-tighter text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 text-center leading-tight">
            {state.role === 'admin' ? 'James Kole' : 'Sarah Chen'}
            <span className="block opacity-50 font-medium text-[7px] mt-0.5 tracking-normal">
              {state.role === 'admin' ? 'Admin' : 'Viewer'}
            </span>
          </div>
        </motion.div>
        <motion.button 
          whileHover={{ color: "#f43f5e" }}
          whileTap={{ scale: 0.9 }}
          className="text-zinc-400 dark:text-zinc-600 transition-colors btn-satisfying p-2" 
          title="Log out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )

  return (
    <>
      <aside className="hidden md:flex flex-col w-24 h-[calc(100vh-2rem)] bg-white/60 dark:bg-zinc-950/50 border-r border-zinc-200/50 dark:border-white/5 sticky top-4 self-start ml-0 py-4">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={onClose} 
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-950 flex flex-col z-50 shadow-2xl border-r border-zinc-200 dark:border-white/10"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
