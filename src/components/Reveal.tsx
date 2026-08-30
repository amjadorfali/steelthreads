import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Enter-on-scroll wrapper. Under prefers-reduced-motion the movement is dropped
 * but a short opacity fade stays, so content never teleports in.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(20px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reduce ? { duration: 0.2, ease: 'easeOut' } : { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
