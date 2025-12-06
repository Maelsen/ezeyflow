"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

/* ---------- Tipp-Inhalt ---------- */
const RAW = `// automation.ts
const lead = await fetch('/api/leads/new').then(r => r.json())

await crm.contacts.upsert({
  name: lead.name,
  email: lead.email,
})

await invoicing.create({
  customer: lead.name,
  amount: lead.quote,
  sendEmail: true,
})

await calendar.schedule({
  with: lead.name,
  topic: 'Erstgespräch',
  slots: ['Mo 10:00','Di 14:30'],
})

log.info('Pipeline aktualisiert & E-Mail versendet ✔')`

/* ---------- Mini-Highlighter (VS Code Dark+) ---------- */
function highlightToHtml(src: string) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const pats = [
    { c: "comment", r: /\/\/[^\n]*/y },
    { c: "string", r: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/y },
    { c: "number", r: /\b\d+(?:\.\d+)?\b/y },
    { c: "boolean", r: /\b(?:true|false)\b/y },
    { c: "nullish", r: /\b(?:null|undefined)\b/y },
    { c: "keyword", r: /\b(?:const|let|var|await|async|return|if|else|for|of|in|try|catch|finally|throw|new|function|export|import|from)\b/y },
    { c: "property", r: /\b[A-Za-z_]\w*(?=\s*:)/y },
    { c: "func", r: /\b[A-Za-z_]\w*(?=\s*\()/y },
    { c: "punct", r: /[{}()[\].,;:]/y },
    { c: "op", r: /[+\-/*%=&|^!<>]+/y },
    { c: "ws", r: /\s+/y, raw: true },
    { c: "ident", r: /\b[A-Za-z_]\w*\b/y },
  ]
  let i = 0, out = ""
  while (i < src.length) {
    let m: any = null, p: any = null
    for (const _p of pats) { _p.r.lastIndex = i; const mm = _p.r.exec(src); if (mm) { m = mm; p = _p; break } }
    if (!m) { out += esc(src[i]); i++; continue }
    const t = esc(m[0]); out += p.raw ? t : `<span class="tok tok-${p.c}">${t}</span>`; i = p.r.lastIndex
  }
  return out
}

function Donut({ value = 0.92, run = false }: { value?: number; run?: boolean }) {
  const size = 80, stroke = 8
  const r = (size - stroke) / 2
  const C = 2 * Math.PI * r
  const dash = C * (1 - value)
  return (
    <svg width={size} height={size} className="-rotate-90" style={{ willChange: "transform" }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.12)" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        stroke="hsl(var(--brand-blue))"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        initial={{ strokeDasharray: C, strokeDashoffset: C }}
        animate={run ? { strokeDasharray: C, strokeDashoffset: dash } : { strokeDasharray: C, strokeDashoffset: C }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .2 }}
        style={{ willChange: "stroke-dashoffset" }}
      />
    </svg>
  )
}

/* ---------- Maus ---------- */
function Mouse({ controls, visible }: { controls: ReturnType<typeof useAnimation>, visible: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-[999]"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.25 } }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      <motion.div animate={controls} style={{ willChange: "transform" }}>
        <div className="h-5 w-5 rounded-full bg-white/95 shadow-[0_0_0_2px_rgba(0,0,0,.25)]" />
      </motion.div>
    </motion.div>
  )
}

/* ---------- Haupt-Komponente ---------- */
export default function ShowcaseTypingWaveToDashboard() {
  const SPEED_CHARS_PER_SEC = 180
  const REVEAL_DUR = 2.2
  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
  const PAUSE_BEFORE_MOUSE = 900
  const HOVER_DUR = 0.7
  const HOVER_GAP = 300
  const BEFORE_PAGE = 400

  // NEW: leicht verzögertes “Ende”
  const END_SHRINK_DELAY = 1800        // CHANGED: vorher 1200
  const END_CAPTION_DELAY = 2100       // CHANGED: vorher 1400

  // Start bei Sichtbarkeit
  const START_THRESHOLD = 0.35
  const ROOT_MARGIN = "0px 0px -30% 0px"
  const [activated, setActivated] = useState(false)
  const visibleRef = useRef<HTMLElement | null>(null)

  const [typed, setTyped] = useState(0)
  const [reveal, setReveal] = useState(false)
  const [tabsVisible, setTabsVisible] = useState(false)
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [mouseOn, setMouseOn] = useState(false)
  const [showPage, setShowPage] = useState(false)

  // NEW: Ende-States (Fenster schrumpfen + Satz tippen)
  const [compact, setCompact] = useState(false)
  const [captionChars, setCaptionChars] = useState(0)
  const CAPTION =
    "Von komplexem Code zu klaren, benutzerfreundlichen Dashboards."

  const total = RAW.length
  const start = useRef<number | null>(null)
  const content = RAW.slice(0, typed)
  const highlighted = useMemo(() => highlightToHtml(content), [content])
  const lineCount = useMemo(() => Math.max(20, content.split("\n").length + 2), [content])

  const appRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouse = useAnimation()

  // Sichtbarkeits-Start
  useEffect(() => {
    if (activated) return
    const el = visibleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= START_THRESHOLD) {
          setActivated(true)
          obs.disconnect()
        }
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.75], rootMargin: ROOT_MARGIN }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [activated])

  // Tippen
  useEffect(() => {
    if (!activated) return
    const charsPerMs = SPEED_CHARS_PER_SEC / 1000
    let raf = 0
    const loop = (ts: number) => {
      if (start.current == null) start.current = ts
      const elapsed = ts - start.current
      const next = Math.min(Math.floor(elapsed * charsPerMs), total)
      setTyped(next)
      if (next < total) raf = requestAnimationFrame(loop)
      else setTimeout(() => setReveal(true), 700)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [activated, total])

  // Tabs zeigen wenn Reveal startet
  useEffect(() => { if (reveal) setTabsVisible(true) }, [reveal])

  // Maus-Sequenz
  useEffect(() => {
    if (!tabsVisible) return
    let dead = false
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    const run = async () => {
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      if (dead) return

      const root = appRef.current?.getBoundingClientRect()
      if (!root) return

      await mouse.set({ x: (root.width / 2), y: 12, scale: 1 })
      setMouseOn(true)
      await sleep(PAUSE_BEFORE_MOUSE)

      const centerOf = (el: HTMLElement | null) => {
        if (!el || !root) return { x: 40, y: 60 }
        const r = el.getBoundingClientRect()
        return {
          x: r.left - root.left + Math.min(40, r.width * 0.25),
          y: r.top - root.top + r.height / 2
        }
      }

      for (const idx of [0, 1]) {
        if (dead) return
        setHoverIdx(idx)
        const p = centerOf(tabRefs.current[idx]!)
        await mouse.start({ x: p.x, y: p.y, transition: { duration: HOVER_DUR, ease: [0.22, 1, 0.36, 1] } })
        await sleep(HOVER_GAP)
        setHoverIdx(null)
      }

      const p = centerOf(tabRefs.current[2]!)
      await mouse.start({ x: p.x, y: p.y, transition: { duration: HOVER_DUR, ease: [0.22, 1, 0.36, 1] } })
      setActiveIdx(2)
      await mouse.start({ scale: 0.92, transition: { duration: 0.12 } })
      await mouse.start({ scale: 1.00, transition: { duration: 0.16 } })
      await new Promise(r => setTimeout(r, BEFORE_PAGE))

      setShowPage(true)
    }

    run()
    return () => { dead = true }
  }, [tabsVisible, mouse])

  // NEW: Verzögertes “Ende”: Fenster schrumpfen -> dann Tippen unten mittig
  useEffect(() => {
    if (!showPage) return
    const t1 = setTimeout(() => setCompact(true), END_SHRINK_DELAY)   // CHANGED
    const t2 = setTimeout(() => {
      const full = CAPTION.length
      const id = window.setInterval(() => {
        setCaptionChars(n => {
          if (n >= full) { window.clearInterval(id); return n }
          return n + 1
        })
      }, 18)
    }, END_CAPTION_DELAY)                                             // CHANGED
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [showPage, CAPTION])

  const tabs = ["Rechnungen", "Termine", "Leads", "Workflows", "Lager"]

  return (
    <section ref={visibleRef as any} className="relative py-20" style={{ direction: "ltr" }}>
      {/* CHANGED: kein 2-Spalten-Grid mehr – Caption kommt unten drunter */}
      <div className="container transition-all duration-700"> {/* CHANGED */}
        {/* Fenster */}
        <div className={`relative mx-auto w-full max-w-5xl transition-transform duration-700 ${compact ? "md:scale-90" : ""}`}>
          <div className="card overflow-hidden p-0 shadow-glow">
            {/* Chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c840]" />
              <div className="ml-3 text-xs text-white/50">ezeyflow</div>
            </div>

            <div className="relative h-[460px] w-full">
              {/* Editor */}
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                animate={reveal ? { opacity: 0, scale: 0.985, filter: "blur(1px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: reveal ? 0.35 : 0 }}
              >
                <div className="flex h-full">
                  <div className="select-none border-r border-white/5 bg-black/10 px-2 py-4 text-right text-xs leading-6 text-white/40 basis-[56px] shrink-0">
                    {Array.from({ length: lineCount }).map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <div className="relative h-full min-w-0 flex-1 overflow-hidden">
                    <div className="px-4 py-4 font-mono text-[13.5px] leading-6 whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.92)", WebkitTextFillColor: "currentColor" }}>
                      <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                      <span className="ml-0.5 inline-block h-5 w-[8px] align-[-2px]" style={{ opacity: activated && typed < total ? 1 : 0, background: "rgba(255,255,255,0.95)", animation: "typingPulse 1s infinite" }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Wave + App */}
              <motion.div
                ref={appRef}
                className="absolute inset-0 z-10 will-change-[clip-path]"
                initial={{ clipPath: "circle(0% at 78% 22%)" }}
                animate={reveal ? { clipPath: "circle(140% at 78% 22%)" } : {}}
                transition={{ duration: REVEAL_DUR, ease: EASE }}
                style={{
                  background: "linear-gradient(135deg, rgba(7,17,35,1) 0%, rgba(6,10,24,1) 100%)",
                  willChange: "clip-path",
                  transform: "translateZ(0)"
                }}
              >
                {/* Maus */}
                <Mouse controls={mouse} visible={mouseOn && tabsVisible && !showPage} />

                {/* Ansicht A: Tabs */}
                {tabsVisible && !showPage && (
                  <div className="h-full grid grid-cols-[220px,1fr]">
                    <aside className="border-r border-white/10 bg-white/5 p-3">
                      <div className="text-xs font-semibold text-white/60 mb-1">Bereiche</div>
                      <div className="space-y-2">
                        {tabs.map((label, i) => {
                          const isHover = hoverIdx === i
                          const isActive = activeIdx === i
                          let cls = "rounded-md px-2 py-1 text-sm text-white/80 transition-colors"
                          let style: React.CSSProperties = {}
                          if (isActive) {
                            cls += " bg-brand-gradient text-black"
                          } else if (isHover) {
                            style.background = "linear-gradient(90deg, rgba(59,130,246,0.18) 0%, rgba(168,85,247,0.18) 100%)"
                            cls += " ring-1 ring-white/30"
                          } else {
                            cls += " hover:bg-white/5"
                          }
                          return (
                            <motion.div
                              key={label}
                              ref={el => (tabRefs.current[i] = el)}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: .45, delay: i * 0.12 }}
                              className={cls}
                              style={style}
                            >
                              {label}
                            </motion.div>
                          )
                        })}
                      </div>
                    </aside>
                    <div />
                  </div>
                )}

                {/* Ansicht B: Seite nach Klick (KPIs/Charts) */}
                {showPage && (
                  <motion.div
                    className="h-full grid grid-rows-[auto,1fr] p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="rounded-md bg-brand-gradient px-2 py-1 font-semibold text-black">Leads</span>
                        <span className="ml-3 text-white/60 text-xs">Personalisierte Übersicht</span>
                      </div>
                      <div className="text-xs text-white/50">Live</div>
                    </div>

                    <div className="grid grid-rows-[auto,1fr] gap-4 overflow-hidden">
                      <motion.div
                        className="grid grid-cols-3 gap-3"
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.22, delayChildren: 0.2 } } }}
                      >
                        {[
                          { k: "⏳ Zeitersparnis durch ezeyflow", v: "34 h / Woche" },
                          { k: "⚙️ Aktive Flows", v: "18" },
                          { k: "⬇ Fehlerquote", v: "−72%" },
                        ].map((x) => (
                          <motion.div
                            key={x.k}
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                            className="rounded-xl border border-white/10 bg-surface-700/70 p-3"
                          >
                            <div className="text-[11px] text-white/60">{x.k}</div>
                            <div className="text-sm font-semibold">{x.v}</div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: .6, duration: .6 }}
                          className="rounded-xl border border-white/10 bg-surface-700/70 p-3"
                        >
                          <div className="mb-2 text-xs text-white/60">Ausgeführte Flows (7 Tage)</div>
                          <div className="flex h-24 items-end gap-2">
                            {[32, 54, 47, 61, 70, 64, 82].map((h, i) => (
                              <motion.div
                                key={i}
                                className="flex-1 rounded-sm bg-brand-gradient-soft"
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max(12, h)}%` }}
                                transition={{ delay: .7 + i * 0.08, duration: .5 }}
                              />
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: .7, duration: .6 }}
                          className="rounded-xl border border-white/10 bg-surface-700/70 p-3"
                        >
                          <div className="mb-2 text-xs text-white/60">Erfolgsrate</div>
                          <div className="flex items-center gap-3">
                            <Donut value={0.92} run />
                            <div className="text-sm">
                              <div className="font-semibold">92%</div>
                              <div className="text-xs text-white/60">ohne manuellen Eingriff</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          <style jsx>{`
            @keyframes typingPulse { 0%,100%{opacity:.25} 50%{opacity:1} }
            :global(.tok) { color: inherit }
            :global(.tok-keyword)  { color: #C586C0 }
            :global(.tok-string)   { color: #CE9178 }
            :global(.tok-number)   { color: #B5CEA8 }
            :global(.tok-boolean), :global(.tok-nullish) { color: #569CD6 }
            :global(.tok-property) { color: #9CDCFE }
            :global(.tok-func)     { color: #DCDCAA }
            :global(.tok-punct), :global(.tok-op) { color: #D4D4D4 }
            :global(.tok-comment)  { color: #6A9955 }
          `}</style>
        </div>

        {/* NEW: Unten mittig – erscheint, sobald compact aktiv ist */}
        <div className={`mt-6 ${compact ? "block" : "hidden"}`}> {/* NEW */}
          <motion.p
            className="mx-auto text-center text-xl font-medium leading-relaxed whitespace-nowrap"
            initial={{ opacity: 0, y: 8 }}
            animate={captionChars > 0 ? { opacity: 1, y: 0 } : {}}
          >
            <span className="text-brand-gradient">
              {CAPTION.slice(0, Math.min(captionChars, 22))}
            </span>
            {CAPTION.slice(Math.min(captionChars, 22), captionChars)}
            <span
              className="ml-1 inline-block h-5 w-[10px] align-[-3px] bg-white/70"
              style={{ opacity: captionChars < CAPTION.length ? 1 : 0 }}
            />
          </motion.p>
        </div>
      </div>
    </section>
  )
}
