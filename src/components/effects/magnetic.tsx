"use client"

import { useRef } from "react"

type Props = {
  children: React.ReactNode
  strength?: number // px max shift
  className?: string
}

export default function Magnetic({ children, strength = 10, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)))
    const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate3d(0,0,0)"
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform .15s ease" }}
    >
      {children}
    </div>
  )
}
