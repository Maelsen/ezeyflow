"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import * as React from "react"

export default function HeroLogoWave({ className = "" }: { className?: string }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -40])

  const STROKE = 28      // Dicke Ring & Welle
  const SHIFT_Y = 28     // Welle nach unten (px)
  const CLIP_PAD = 6     // lässt die Welle ein paar px UNTER den Ring laufen

  const CX = 280,
    CY = 280,
    R = 240
  const clipR = R - STROKE / 2 + CLIP_PAD

  const PATH_D = `
    M40 300
    C100 390, 170 240, 230 185
    S290 320, 330 315
    S450 200, 520 200
  `

  return (
    <motion.div style={{ y }} className={className} aria-hidden>
      <svg
        viewBox="0 0 560 560"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="ezeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--brand-cyan))" />
            <stop offset="50%" stopColor="hsl(var(--brand-blue))" />
            <stop offset="100%" stopColor="hsl(var(--brand-violet))" />
          </linearGradient>

          {/* Clip: etwas größer, damit die Welle unter dem Ring „weiterläuft“ */}
          <clipPath id="insideRing" clipPathUnits="userSpaceOnUse">
            <circle cx={CX} cy={CY} r={clipR} />
          </clipPath>
        </defs>

        {/* WELLE zuerst -> liegt hinter dem Ring */}
        <g clipPath="url(#insideRing)" transform={`translate(0, ${SHIFT_Y})`}>
          <path
            d={PATH_D}
            stroke="url(#ezeyGradient)"
            strokeWidth={STROKE}
            className="stroke-draw wave-glow"
            strokeLinecap="round"
            fill="none"
            pathLength={1}
          />
        </g>

        {/* RING zuletzt -> liegt oben */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          stroke="url(#ezeyGradient)"
          strokeWidth={STROKE}
          className="wave-glow"
          opacity="0.9"
        />
      </svg>
    </motion.div>
  )
}
