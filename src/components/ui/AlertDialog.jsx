import { useEffect, useRef } from "react"

export default function AlertDialog({ isOpen, onClose, onConfirm, title, description, confirmText = "Confirm", cancelText = "Cancel", variant = "danger" }) {
  const modalRef = useRef()

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const variantStyles = variant === "danger" 
    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20" 
    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-white dark:bg-[#0c0c0e] rounded-[1.5rem] p-6 shadow-2xl border border-zinc-200/50 dark:border-zinc-800/80 animate-scale-in"
      >
        <div className="flex flex-col items-center text-center">
          <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${variant === 'danger' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10'}`}>
            {variant === 'danger' ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">{title}</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors btn-satisfying"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-lg transition-all btn-satisfying ${variantStyles}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
