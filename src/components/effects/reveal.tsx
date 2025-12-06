"use client"

import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
  delay?: number
  dir?: "up" | "down" | "left" | "right"
  className?: string
}

export default function Reveal({ children, delay = 0, dir = "up", className = "" }: Props) {
  const offset = 14
  const from =
    dir === "up" ? { y: offset } :
    dir === "down" ? { y: -offset } :
    dir === "left" ? { x: offset } :
    { x: -offset }

  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
