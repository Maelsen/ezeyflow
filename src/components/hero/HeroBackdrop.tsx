"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function HeroBackdrop() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.8])

  // leichter Maus-Parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 12, y: (e.clientY / window.innerHeight - 0.5) * 12 })
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])

  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y, opacity }}>
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0)`,
          background:
            "radial-gradient(60% 60% at 20% 10%, hsla(var(--brand-start)/0.22), transparent 60%), radial-gradient(50% 50% at 80% 10%, hsla(var(--brand-end)/0.18), transparent 60%)",
        }}
      />
      <div
        className="absolute -bottom-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, hsla(var(--brand-end)/0.28), transparent 70%)" }}
      />
    </motion.div>
  )
}
