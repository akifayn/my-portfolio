import { useState } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'

interface StatCounterProps {
  value: number
  suffix?: string
  decimals?: number
}

// Görünüme girince 0'dan hedef değere sayar; prefers-reduced-motion'da direkt hedefte belirir
export default function StatCounter({ value, suffix = '', decimals = 0 }: StatCounterProps) {
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  return (
    <motion.span
      className="tabular-nums"
      viewport={{ once: true, amount: 0 }}
      onViewportEnter={() => {
        if (reduceMotion) {
          setDisplay(value)
          return
        }
        animate(0, value, {
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplay(v),
        })
      }}
    >
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}
