"use client"

import React, { useState, useRef, useLayoutEffect } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring
} from "framer-motion"
import {
  FileText, Bot, Unplug, Network, Search, LayoutDashboard,
  AlertTriangle, ShieldCheck, FileQuestion, FileCheck2,
  ChevronRight, Activity, Code2, Database, Zap, CheckCircle2,
  ArrowRight
} from "lucide-react"

// --- UTIL COMPONENTS ---

// Helper for conditional classes
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// MAGNETIC BUTTON
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// STYLED BUTTON
const Button = ({ children, variant = "primary", size = "default", className, asChild, ...props }: any) => {
  const Comp = asChild ? "div" : "button";

  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] hover:scale-[1.02] border border-transparent",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-base"
  };

  // @ts-ignore
  return (
    <Comp
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
};


// --- DATEN ---
const pairs = [
  {
    id: "p1",
    tag: "Input_Stream",
    problemTitle: "Manuelle Daten-Loops",
    problem: "Copy-Paste-Orgien fressen wertvolle Zeit. Mitarbeiter sind keine Roboter.",
    solutionTitle: "Auto-Scripting Engine",
    solution: "Ich ersetze manuelle Eingaben durch präzise Scripts. Das System arbeitet 24/7 fehlerfrei.",
    problemIcon: <FileText className="h-6 w-6" />,
    solutionIcon: <Bot className="h-6 w-6" />,
    stats: ["100% Präzision", "Zero Latency"],
  },
  {
    id: "p2",
    tag: "System_Link",
    problemTitle: "Getrennte Datensilos",
    problem: "Shop redet nicht mit CRM. Buchhaltung wartet auf Export-Dateien. Chaos.",
    solutionTitle: "API Mesh Network",
    solution: "Echtzeit-Synchronisation zwischen allen Tools. Eine Wahrheit für alle Systeme.",
    problemIcon: <Unplug className="h-6 w-6" />,
    solutionIcon: <Network className="h-6 w-6" />,
    stats: ["Realtime Sync", "Unified Data"],
  },
  {
    id: "p3",
    tag: "Visual_Layer",
    problemTitle: "Analoger Blindflug",
    problem: "Entscheidungen basieren auf alten Excel-Listen statt auf Live-Daten.",
    solutionTitle: "Live-Metrik Dashboard",
    solution: "Alle KPIs auf einen Blick. Visualisiert, aktuell und entscheidungsorientiert.",
    problemIcon: <Search className="h-6 w-6" />,
    solutionIcon: <LayoutDashboard className="h-6 w-6" />,
    stats: ["Live Insights", "Crystal Clear"],
  },
  {
    id: "p4",
    tag: "Debug_Mode",
    problemTitle: "Menschliche Fehler",
    problem: "Ein Tippfehler in der Rechnung, eine vergessene Null. Kostet Geld und Nerven.",
    solutionTitle: "Validierungs-Algorithmus",
    solution: "Logik-Gates prüfen jeden Datensatz. Fehler werden abgefangen, bevor sie passieren.",
    problemIcon: <AlertTriangle className="h-6 w-6" />,
    solutionIcon: <ShieldCheck className="h-6 w-6" />,
    stats: ["Error Rate: 0%", "Risk Shield"],
  },
  {
    id: "p5",
    tag: "Core_Upgrade",
    problemTitle: "Legacy Prozesse",
    problem: "Historisch gewachsenes Chaos. Wissen ist Kopfsache und nicht dokumentiert.",
    solutionTitle: "System Architektur",
    solution: "Refactoring zu klaren, skalierbaren Prozessen. Unabhängig von Einzelpersonen.",
    problemIcon: <FileQuestion className="h-6 w-6" />,
    solutionIcon: <FileCheck2 className="h-6 w-6" />,
    stats: ["Skalierbar", "Future Proof"],
  },
]

// --- ANIMATION COMPONENTS ---
const ScannerLine = () => (
  <motion.div
    initial={{ top: "0%", opacity: 0 }}
    animate={{ top: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
  />
)

const DataStream = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[1px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
        style={{
          left: `${15 + i * 20}%`,
          height: "20%",
          top: "-20%"
        }}
        animate={{ top: "120%" }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
)

// --- HAUPTKOMPONENTE ---
export function UspGrid() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // 1. Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Map Scroll to Index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (hasCompleted) return

    if (latest > 0.99) {
      setHasCompleted(true)
      setActiveIndex(pairs.length - 1)
      return
    }

    const newIndex = Math.min(
      Math.floor(latest * pairs.length),
      pairs.length - 1
    )
    setActiveIndex(newIndex)
  })

  // FIX: Anti-Teleport
  useLayoutEffect(() => {
    if (hasCompleted) {
      const lostHeight = window.innerHeight * 3.5
      window.scrollBy({ top: -lostHeight, behavior: "instant" })
    }
  }, [hasCompleted])

  const handleManualClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section
      ref={containerRef}
      className={`relative font-sans selection:bg-cyan-500/30 transition-all ${hasCompleted ? "min-h-screen" : "h-[450vh]"
        }`}
    >
      <div
        className={`${hasCompleted
            ? "relative min-h-screen flex flex-col overflow-hidden"
            : "sticky top-0 h-screen flex flex-col overflow-hidden"
          }`}
      >

        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <DataStream />
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full py-6 md:py-8 lg:py-10 flex-grow">
          {/* Header Area */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 mb-6 md:mb-8 max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`relative flex h-3 w-3 ${hasCompleted ? "text-emerald-400" : "text-cyan-400"}`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasCompleted ? "bg-emerald-400" : "bg-cyan-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${hasCompleted ? "bg-emerald-500" : "bg-cyan-500"}`}></span>
              </div>
              <span className={`text-xs font-mono uppercase tracking-[0.2em] font-bold ${hasCompleted ? "text-emerald-400" : "text-cyan-400"}`}>
                {hasCompleted ? "System Optimized" : "Ezeyflow Engine Running..."}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              <span className="block text-slate-400 text-2xl md:text-3xl mb-1 font-medium">
                {hasCompleted ? "Transformation abgeschlossen" : "Aktuelle Reibungsverluste"}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-300 drop-shadow-sm">
                {hasCompleted ? "Dein Business läuft auf Autopilot." : "Warum Prozesse scheitern."}
              </span>
            </h2>
          </motion.div>

          {/* PROGRESS BAR */}
          <div className="w-full h-1 bg-slate-900 rounded-full mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-800/50" />
            <motion.div
              className={`relative h-full shadow-[0_0_20px_rgba(6,182,212,0.8)] origin-left ${hasCompleted
                  ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                  : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                }`}
              style={{ scaleX: hasCompleted ? 1 : scaleX }}
            />
          </div>

          {/* Split Layout */}
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-0 items-start">
            {/* LEFT: Navigation / Status List */}
            <div className="lg:col-span-4 flex flex-col gap-2 h-full overflow-y-auto pr-2 custom-scrollbar pb-10 mask-gradient-b">
              {pairs.map((pair, index) => {
                const isActive = index === activeIndex
                const isPast = index < activeIndex || (hasCompleted && index !== activeIndex)

                // --- NEW LOGIC: SHOW ONLY UNLOCKED ITEMS ---
                // Zeige den Punkt nur, wenn:
                // 1. Die gesamte Animation abgeschlossen ist (hasCompleted)
                // 2. ODER der User bis zu diesem Punkt gescrollt hat (index <= activeIndex)
                const isUnlocked = hasCompleted || index <= activeIndex;

                if (!isUnlocked) return null;

                return (
                  <motion.button
                    // Animation für das "Reinfahren" neuer Punkte
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    
                    key={pair.id}
                    onClick={() => handleManualClick(index)}
                    className={`group relative w-full text-left rounded-xl transition-all duration-500 border overflow-hidden ${isActive
                        ? "bg-slate-800/80 border-cyan-500/50 p-5 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30"
                        : "bg-transparent border-transparent p-4 opacity-40 hover:opacity-100 hover:bg-slate-900/40"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      <div
                        className={`relative p-2.5 rounded-lg transition-all duration-500 ${isActive
                            ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 scale-110"
                            : isPast
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-slate-800/50 text-slate-500"
                          }`}
                      >
                        {isPast && !isActive ? <CheckCircle2 className="h-5 w-5" /> : pair.problemIcon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider mb-1 block transition-colors ${isActive
                                ? "text-cyan-400 font-bold"
                                : isPast
                                  ? "text-emerald-500"
                                  : "text-slate-500"
                              }`}
                          >
                            {isPast && !isActive ? "Optimized" : pair.tag}
                          </span>
                        </div>
                        <div
                          className={`font-semibold text-sm transition-colors duration-300 ${isActive || isPast ? "text-white" : "text-slate-400"
                            }`}
                        >
                          {pair.problemTitle}
                        </div>
                      </div>

                      <div
                        className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                          }`}
                      >
                        <ChevronRight className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-l-xl"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* RIGHT: Console */}
            <div className="lg:col-span-8 relative h-full flex flex-col min-h-[450px]">
              <div className="relative flex-grow bg-[#0b0f19] rounded-2xl border border-slate-800/60 overflow-hidden shadow-2xl flex flex-col group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <ScannerLine />

                <div className="h-12 border-b border-white/5 bg-[#080b12] flex items-center px-5 justify-between z-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                    <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                    <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/5 text-[10px] font-mono shadow-inner">
                    <Activity className={`w-3 h-3 ${hasCompleted ? "text-emerald-500" : "text-emerald-500 animate-pulse"}`} />
                    <span className="text-slate-500">process_id:</span>
                    <span className="text-cyan-400">8492_auto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-slate-600" />
                    <Database className="w-4 h-4 text-slate-600" />
                  </div>
                </div>

                <div className="relative flex-grow p-6 md:p-10 overflow-hidden flex items-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                      {/* --- PROBLEM --- */}
                      <div className="relative">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">
                              Detected Issue
                            </span>
                            <span className="text-white font-medium">
                              {pairs[activeIndex].tag}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                          {pairs[activeIndex].problemTitle}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-red-500/20 pl-4">
                          {pairs[activeIndex].problem}
                        </p>

                        <div className="font-mono text-[10px] text-red-300/60 bg-black/40 p-4 rounded-lg border border-white/5 space-y-2 font-medium">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-2"
                          >
                            <span className="text-red-500">➜</span>
                            <span>
                              analyzing_workflow...{" "}
                              <span className="text-red-400">FAILED</span>
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      {/* --- SOLUTION --- */}
                      <div className="relative">
                        <div className="absolute -inset-10 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
                        <div className="mb-6 flex items-center gap-3">
                          <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            {pairs[activeIndex].solutionIcon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
                              Ezeyflow Fix
                            </span>
                            <span className="text-white font-medium">
                              Auto_Script_v2.0
                            </span>
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                          {pairs[activeIndex].solutionTitle}
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed mb-8">
                          {pairs[activeIndex].solution}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {pairs[activeIndex].stats.map((stat, i) => (
                            <motion.div
                              key={stat}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400 uppercase tracking-wide hover:bg-emerald-500/20 transition-colors"
                            >
                              <Zap className="w-3 h-3 fill-current" />
                              {stat}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* CTA Section - NEW CENTERED BUTTON */}
              <div className="mt-12 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="relative z-20"
                >

                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}