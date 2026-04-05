import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Toast from '../ui/Toast'
import TransactionModal from '../transactions/TransactionModal'
import { useApp } from '../../context/AppContext'

export default function Layout() {
  const { state, dispatch } = useApp()
  const location = useLocation()
  const { toasts, isModalOpen, editingTransaction } = state
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSave = (transactionData) => {
    if (editingTransaction && editingTransaction.id) {
      dispatch({ 
        type: "EDIT_TRANSACTION", 
        payload: { ...transactionData, id: editingTransaction.id } 
      })
    } else {
      dispatch({ 
        type: "ADD_TRANSACTION", 
        payload: transactionData 
      })
    }
    dispatch({ type: "CLOSE_MODAL" })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-4 md:p-6 lg:p-8 gap-6 lg:gap-8 relative overflow-x-hidden">
      {/* Sidebar Island */}
      <div className="flex-shrink-0 z-30">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Main Content Island */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex flex-col min-w-0 island-card bg-white/70 dark:bg-[#0c0c0e]/80 rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/5 z-10 shadow-2xl"
      >
        <Navbar onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={location.pathname === '/overview' ? { opacity: 0, y: 10 } : false}
              animate={location.pathname === '/overview' ? { opacity: 1, y: 0 } : false}
              exit={location.pathname === '/overview' ? { opacity: 0, y: -10 } : false}
              transition={location.pathname === '/overview' ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }}
              className="p-6 md:p-10 lg:p-12"
            >
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      {/* Overlays & Portals */}
      <div className="fixed bottom-8 right-8 flex flex-col-reverse gap-4 z-[100] pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div 
              key={toast.id} 
              layout
              className="pointer-events-auto"
            >
              <Toast 
                message={toast.message} 
                type={toast.type} 
                onRemove={() => dispatch({ type: "REMOVE_TOAST", payload: toast.id })} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => dispatch({ type: "CLOSE_MODAL" })} 
        onSave={handleSave}
        initialData={editingTransaction}
      />
    </div>
  )
}
