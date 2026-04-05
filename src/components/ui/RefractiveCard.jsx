import { motion, useMotionValue, useSpring } from "framer-motion"

export default function RefractiveCard({ children, className, variants }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth the mouse movement
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div 
      variants={variants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Refractive "Light Orb" Shimmer */}
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
