import { createContext, useContext, useReducer, useEffect } from "react"
import mockTransactions from "../data/mockTransactions"

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light"
  }
  return "light"
}

const AppContext = createContext(null)

const getInitialTransactions = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("transactions")
    if (saved) return JSON.parse(saved)
  }
  return [...mockTransactions]
}

const getInitialFilters = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("filters")
    if (saved) return JSON.parse(saved)
  }
  return { type: "all", search: "" }
}

const getInitialRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role") || "viewer"
  }
  return "viewer"
}

const initialState = {
  transactions: getInitialTransactions(),
  filters: getInitialFilters(),
  role: getInitialRole(),
  theme: getInitialTheme(),
  toasts: [],
  isModalOpen: false,
  editingTransaction: null,
}

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [
          ...state.transactions,
          { ...action.payload, id: Date.now() },
        ],
        toasts: [...state.toasts, { message: "Transaction added successfully!", type: "success", id: Date.now() }],
      }

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
        toasts: [...state.toasts, { message: "Transaction updated!", type: "success", id: Date.now() }],
      }

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload
        ),
        toasts: [...state.toasts, { message: "Transaction deleted.", type: "info", id: Date.now() }],
      }

    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }

    case "SET_ROLE":
      return {
        ...state,
        role: action.payload,
      }

    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return {
        ...state,
        theme: newTheme,
      }

    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, editingTransaction: action.payload || null }

    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, editingTransaction: null }

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      }

    default:
      return state
    }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [state.theme])

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions))
    localStorage.setItem("filters", JSON.stringify(state.filters))
    localStorage.setItem("role", state.role)
  }, [state.transactions, state.filters, state.role])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export default AppContext
