"use client"

import { useEffect, useState } from "react"

type Particle = {
  x: number
  y: number
  d: number   // Delay
  s: number   // Speed (animation-duration)
}

// einfache, deterministische "Random"-Funktion
function rand(i: number, offset: number) {
  const x = Math.sin(i * 127.1 + offset) * 43758.5453
  return x - Math.floor(x) // 0–1
}

function seed(n: number): Particle[] {
  const arr: Particle[] = []
  for (let i = 0; i < n; i++) {
    const rx = rand(i, 1)
    const ry = rand(i, 2)
    const delay = (i % 20) * 0.15

    // schön verteilt
    const x = 5 + rx * 90
    const y = 8 + ry * 80

    // jetzt schnellere Bewegung: 4–9 Sekunden
    const speed = 4 + rand(i, 3) * 5

    arr.push({ x, y, d: delay, s: speed })
  }
  return arr
}

const PARTICLES = seed(70) // 40–100 ist ok

function dist2(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return dx * dx + dy * dy
}

export default function BrandBackground() {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null)

  // Mausposition tracken
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      const x = (e.clientX / w) * 100
      const y = (e.clientY / h) * 100
      setMouse({ x, y })
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-brand" />

      {/* Logo-Glows */}
      <div
        className="absolute -top-40 -left-10 h-[520px] w-[520px] rounded-full blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--brand-cyan) / 0.36), transparent 62%)",
        }}
      />
      <div
        className="absolute -top-48 right-0 h-[480px] w-[480px] rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--brand-violet) / 0.30), transparent 62%)",
        }}
      />

      {/* Vignette unten */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 120%, rgba(0,0,0,0.35), transparent 60%)",
        }}
      />

      {/* Partikel */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => {
          let isActive = false
          if (mouse) {
            const d = dist2(mouse, { x: p.x, y: p.y })
            const THRESHOLD = 80
            isActive = d < THRESHOLD
          }

          return (
            <span
              key={i}
              className={`particle absolute ${isActive ? "particle-active" : ""}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${p.d}s`,
                animationDuration: `${p.s}s`, // 🟢 jetzt 4–9 Sekunden
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
