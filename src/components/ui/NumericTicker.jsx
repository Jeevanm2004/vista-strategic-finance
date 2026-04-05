import { useEffect, useRef } from "react"
import { useSpring, useTransform, motion } from "framer-motion"
import formatCurrency from "../../utils/formatCurrency"

export default function NumericTicker({ value, className, isCents = false }) {
  // Spring configuration for that premium "weighted" feel
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  })

  // Synchronize spring with the value prop
  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  // Transformer to format the numeric spring value into currency main or cents
  const displayValue = useTransform(spring, (latest) => {
    const formatted = formatCurrency(latest)
    const parts = formatted.split(".")
    return isCents ? (parts[1] || "00") : parts[0]
  })

  return <motion.span className={className}>{displayValue}</motion.span>
}
