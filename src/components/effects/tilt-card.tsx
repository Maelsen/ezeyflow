"use client"

import { useRef } from "react"

type Props = {
  children: React.ReactNode
  max?: number     // max tilt deg
  scale?: number   // scale on hover
  className?: string
}

export default function TiltCard({ children, max = 8, scale = 1.02, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5 // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const rx = (-py * max).toFixed(2)
    const ry = (px * max).toFixed(2)
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return (
    <div className={`tilt-stage ${className}`}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d", transition: "transform .2s ease" }}
      >
        {children}
      </div>
    </div>
  )
}
