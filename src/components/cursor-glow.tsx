"use client"

import { useEffect, useRef } from "react"

export default function CursorGlow() {
  // Disable on touch devices or prefers-reduced-motion
  const isTouch = typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches
  const reduced = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isTouch || reduced) return
    const el = dotRef.current
    if (!el) return

    let raf = 0
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: target.x, y: target.y }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const loop = () => {
      // lerp
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      el.style.transform = `translate3d(${current.x - 120}px, ${current.y - 120}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
    }
  }, [isTouch, reduced])

  if (isTouch || reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* 240x240 radial glow */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          width: 240, height: 240, borderRadius: 9999,
          background:
            "radial-gradient(closest-side, rgba(0,209,255,0.18), rgba(43,108,255,0.16), rgba(122,60,255,0.14), transparent 65%)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
          position: "absolute", left: 0, top: 0,
          transition: "opacity .2s ease",
        }}
      />
    </div>
  )
}
