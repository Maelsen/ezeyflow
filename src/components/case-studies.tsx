"use client"

import { useState, useEffect } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion"
import {
  X,
  ArrowRight,
  CheckCircle2,
  Play,
  Loader2,
  Zap,
  FileText,
  Terminal,
  Leaf,
  Wind,
  Download,
  FileArchive,
  Video,
  Cpu,
  Clock,
  Server,
  Activity,
  Database,
  Globe,
  Mail,
  Receipt,
  RefreshCcw,
  TrendingUp,
  Building2,
  Euro,
  Bell,
  Map,
  Trophy,
  BarChart3,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// --- LOCAL COMPONENTS ---

// Inline Implementation of TiltCard
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  return (
    <motion.div
      className={cn("perspective-1000", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- DATEN ---
type Project = {
  id: string
  category: string
  title: string
  shortDesc: string
  stats: { label: string; value: string }[]
  fullDesc: {
    problem: string[]
    solution: string[]
    result: string[]
  }
  animationType: "certificates" | "video-automation" | "pms-simulation" | "bundesland-simulation" | "placeholder"
}

const PROJECTS: Project[] = [
  {
    id: "cert-engine",
    category: "AUTOMATION & API → Hohe Komplexität, maximale Skalierbarkeit",
    title: "Automatisierte Zertifikate",
    shortDesc: "Von 15 Stunden manueller Arbeit zu 30 Sekunden: Vollautomatische Engine zur Berechnung und Erstellung hunderter individueller Nachhaltigkeits-Nachweise.",
    stats: [
      { label: "Dauer", value: "30 Sek" },
      { label: "Volumen", value: "Bulk 200+" },
      { label: "Fehler", value: "0%" },
    ],
    fullDesc: {
      problem: [
        "Extrem manueller Prozess: Ein Teammitglied musste quartalsweise Daten aus verschiedenen Projekten (CO₂, Waldfläche, Plastik) händisch zusammensuchen.",
        "Komplexe Logik: Da Projekte unterschiedliche KPIs hatten (z.B. Bildung in Ghana vs. Plastik in Philippinen), war keine einfache Hochrechnung möglich.",
        "Unskalierbar: Design-Anpassung in Canva und manueller Export führten zu 15 Stunden Arbeit und hoher Fehleranfälligkeit."
      ],
      solution: [
        "Entwicklung einer eigenen Daten-Engine (API), die qualifizierte Kunden identifiziert und alle KPIs (Bäume, CO₂, Impact) live berechnet.",
        "Dynamische PDF-Generierung: Upload von SVG-Vorlagen (Weihnachten, Events), in die das System Daten pixelgenau injiziert.",
        "Bulk-Processing: Ein 'Gamechanger'-Feature generiert 100–1000 Zertifikate mit einem Klick, inkl. Vorschau und ZIP-Download."
      ],
      result: [
        "Zeitersparnis: Ein kompletter 15-Stunden-Zyklus auf einen 30-Sekunden-Klick reduziert.",
        "Architektur: 100% Serverless auf Google Cloud Run (0€ Fixkosten, null Wartung).",
        "Qualität: Volle Datenkonsistenz und Eliminierung menschlicher Übertragungsfehler."
      ]
    },
    animationType: "certificates"
  },
  {
    id: "pms-integration",
    category: "SYSTEM INTEGRATION → Tiefe technische Integrationen in externe Plattformen",
    title: "PMS-Integration (Hotels)",
    shortDesc: "Vollautomatische Upsells im Checkout – von manueller Arbeit zur One-Click-Lösung im Marktplatz. Skalierbar und wartungsfrei.",
    stats: [
      { label: "Setup", value: "1 Klick" },
      { label: "Admin", value: "0 Min" },
      { label: "Kosten", value: "0€ Fix" },
    ],
    fullDesc: {
      problem: [
        "Enorme Hürden bei der Integration: Hotels mussten Upsell-Buttons manuell in ihren Checkout coden und Verkäufe händisch in Excel tracken.",
        "Fehlende Infrastruktur: Es gab keine Datenbank und keine Webhooks. Das führte zu Fehlern, verlorenen Einnahmen und fehlender Transparenz.",
        "Keine Skalierung: Da der Aufwand für die Partner zu hoch war, nutzten nur 1–2 Hotels das System, rein auf Vertrauensbasis."
      ],
      solution: [
        "Entwicklung einer datensparsamen Webhook-API, die DSGVO-konform nur relevante Daten (Baum-Anzahl, Hotel-ID) empfängt.",
        "Bau einer wartungsfreien Serverless-Datenbank (0€ Fixkosten) und einer Engine für vollautomatische PDF-Rechnungsstellung per E-Mail.",
        "Offizielles Marktplatz-Plugin für PMS-Systeme: Hotels aktivieren den Upsell jetzt mit einem einzigen Klick im Checkout."
      ],
      result: [
        "Vom manuellen Vertrieb zum Selbstläufer: Hunderte Hotels aktivieren die Funktion eigenständig über den PMS-Marktplatz.",
        "100% Automatisierung: Keine manuellen Reports, kein 'Zahlen melden', keine Rechnungen schreiben. Alles läuft im Hintergrund.",
        "Revenue Impact: Erschließung einer neuen, skalierbaren Einnahmequelle ohne zusätzlichen Personalaufwand."
      ]
    },
    animationType: "pms-simulation"
  },
  {
    id: "video-automation",
    category: "END-TO-END PIPELINE → Komplette Automationssysteme ohne menschliche Schritte",
    title: "Automatisierte Kunden-Videos",
    shortDesc: "Von Bestellung zu personalisiertem Video in unter 60 Sekunden: Dynamische After-Effects-Renderings – vollautomatisch, 24/7.",
    stats: [
      { label: "Speed", value: "< 60 Sek" },
      { label: "Volumen", value: "1.000+" },
      { label: "Kosten", value: "5€ / Mon" },
    ],
    fullDesc: {
      problem: [
        "Wunsch nach emotionalen, personalisierten Videos (Name direkt in After-Effects-Szenen integriert), aber fehlende Server-Infrastruktur.",
        "Manuelles Rendern von hunderten Videos pro Woche war unmöglich und fehleranfällig.",
        "Keine direkte Verbindung zwischen WooCommerce-Bestellungen, Render-Software und E-Mail-Versand (Brevo)."
      ],
      solution: [
        "Setup eines 24/7 Linux-Servers (5€/Monat) mit Webhook-Listener für eingehende WooCommerce-Bestellungen.",
        "Entwicklung einer 'Watchdog'-Logik, die Render-Jobs via API ansteuert und Texte in AE-Templates dynamisch ersetzt.",
        "Vollautomatischer Upload zu Google Drive und Triggerung des E-Mail-Versands via Brevo API."
      ],
      result: [
        "Automatisierung: Reduktion von 30 Min manueller Arbeit auf < 60 Sekunden Prozesszeit pro Video.",
        "Skalierbarkeit: Problemlos 1.000+ Videos im Monat ohne manuelles Eingreifen.",
        "Kosten & Qualität: Nur 5€ Serverkosten bei 0% Fehlerquote (keine falschen Namen oder Anhänge)."
      ]
    },
    animationType: "video-automation"
  },
  {
    id: "bundesland-campaign",
    category: "GAMIFICATION & GROWTH → Automation, die Engagement & Umsatz steigert",
    title: "Bundesländer-Kampagne",
    shortDesc: "Ein viraler Wettbewerb: Automatische Zuordnung aller Bestellungen zu Bundesländern in Echtzeit. Gamification treibt Engagement und Sales.",
    stats: [
      { label: "Dauer", value: "Echtzeit" },
      { label: "Volumen", value: "1.000+" },
      { label: "Fehler", value: "0%" },
    ],
    fullDesc: {
      problem: [
        "Das Unternehmen wollte einen Wettbewerb starten: 'Wer pflanzt die meisten Bäume?'. Die Umsetzung scheiterte jedoch fast an der manuellen Arbeit.",
        "Um ein Live-Ranking zu ermöglichen, hätte jemand jede Bestellung prüfen, die Rechnungs-PLZ auslesen und dem Bundesland zuordnen müssen, hunderte Stunden Aufwand.",
        "Es gab keine Infrastruktur für Echtzeit-Mapping, PLZ-Logik oder ein dynamisches Dashboard."
      ],
      solution: [
        "Entwicklung einer 'Clean-Data-Engine', die Webhooks aus dem Shop empfängt und über eine PLZ-Datenbank vollautomatisch das Bundesland ermittelt.",
        "Implementierung einer Logik, die nur bezahlte ('Completed') Bestellungen im Kampagnenzeitraum zählt, um die Datenqualität zu sichern.",
        "Bereitstellung einer schnellen Live-API, die das Frontend-Dashboard (Ranking & Heatmap) in Echtzeit füttert."
      ],
      result: [
        "Virales Engagement: Nutzer sahen das Live-Ranking und kauften spontan mehr Bäume, um ihr Bundesland nach vorne zu bringen.",
        "Null manueller Aufwand: Das System lief vollautomatisch – von der Bestellung bis zum Update auf der Landingpage.",
        "Skalierbarkeit: Die Engine ist wiederverwendbar und kann für zukünftige Aktionen (z.B. Städte-Ranking) sofort eingesetzt werden."
      ]
    },
    animationType: "bundesland-simulation"
  }
]

// --- SHARED TYPES ---
type GenFile = { id: number; name: string; size: string; time: string }

// --- ANIMATION 1: CERTIFICATES (Old Logic) ---

const CERT_CODE_SNIPPET = `// 1. Fetch qualified partners
const partners = await api.getPartners({ 
  trees: { $gt: 100 } 
});

// 2. Generate certificates
for (const p of partners) {
  const impact = calculateCO2(p.trees);
    
  await pdfEngine.create({
    template: 'quarterly_q3',
    data: { 
      name: p.name, 
      co2: impact,
      date: Date.now() 
    }
  });
}

// 3. Automation Complete
return { status: 'success', count: partners.length };`;

function CertificateSimulation() {
  const [phase, setPhase] = useState<"idle" | "coding" | "dashboard">("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [filesGenerated, setFilesGenerated] = useState(0);
  const [treesCount, setTreesCount] = useState(0);
  const [co2Count, setCo2Count] = useState(0);
  const [fileList, setFileList] = useState<GenFile[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (phase === "coding") {
      setTypedChars(0);
      const interval = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= CERT_CODE_SNIPPET.length) {
            clearInterval(interval);
            setTimeout(() => setPhase("dashboard"), 600);
            return prev;
          }
          return prev + 5;
        });
      }, 12);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "dashboard") {
      setFilesGenerated(0); setTreesCount(0); setCo2Count(0); setFileList([]); setShowSuccess(false);
      const targetFiles = 245; const duration = 3800; const intervalTime = 30;
      const filesPerStep = targetFiles / (duration / intervalTime);
      let currentFiles = 0; let stepCount = 0;

      const interval = setInterval(() => {
        currentFiles += filesPerStep; stepCount++;
        if (currentFiles >= targetFiles) {
          currentFiles = targetFiles;
          setFilesGenerated(245); setTreesCount(12450); setCo2Count(142);
          setShowSuccess(true); clearInterval(interval);
        } else {
          setFilesGenerated(Math.floor(currentFiles));
          setTreesCount(Math.floor(currentFiles * 50.8));
          setCo2Count(Math.floor(currentFiles * 0.58));
          if (stepCount % 5 === 0) {
            setFileList(prev => [{
              id: stepCount, name: `GreenCo_Cert_Q3_${1000 + stepCount}.pdf`, size: "1.2 MB", time: "Just now"
            }, ...prev].slice(0, 8));
          }
        }
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const reset = (e: React.MouseEvent) => { e.stopPropagation(); setPhase("idle"); setShowSuccess(false); };

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0F1115] rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl group">
      <div className={cn("px-4 py-3 flex items-center justify-between border-b transition-colors duration-500 z-20",
        phase === "dashboard" ? "bg-white border-gray-100" : "bg-white/5 border-white/10"
      )}>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className={cn("tracking-widest font-semibold text-[10px] transition-colors",
          phase === "dashboard" ? "text-gray-400" : "text-white/30"
        )}>
          {phase === "dashboard" ? "GREENCO_PARTNER_PORTAL" : "AUTOMATION_V1.ts"}
        </div>
      </div>

      <div className="relative flex-1 bg-[#0F1115] overflow-hidden">
        <motion.div
          className="absolute inset-0 p-6 font-mono text-xs overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "dashboard" ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {phase === "idle" && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                <Terminal className="w-8 h-8 text-brand-blue" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Automation Engine</h4>
                <p className="text-white/50 text-xs max-w-[200px] mx-auto">Startet den Prozess: API Abruf, Berechnung & Generierung der Zertifikate.</p>
              </div>
              <Button onClick={() => setPhase("coding")} className="bg-brand-blue hover:bg-brand-blue/90 text-white gap-2"><Play className="w-3.5 h-3.5" /> Start Automation</Button>
            </div>
          )}
          {phase === "coding" && (
            <>
              <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
                <span dangerouslySetInnerHTML={{
                  __html: CERT_CODE_SNIPPET.slice(0, typedChars)
                    .replace(/\/\/.*/g, '<span class="text-green-500">$&</span>')
                    .replace(/\b(await|const|for|of|if|return)\b/g, '<span class="text-purple-400">$1</span>')
                    .replace(/\b(fetch|generatePdf|api|getPartners|create)\b/g, '<span class="text-yellow-300">$1</span>')
                }} />
                <span className="animate-pulse inline-block w-2 h-4 bg-brand-blue align-middle ml-1" />
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-2 text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded text-xs">
                <Loader2 className="w-3 h-3 animate-spin" /> Processing Bulk Data...
              </div>
            </>
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[#F8F9FB] flex flex-col"
          initial={{ y: "100%" }}
          animate={{ y: phase === "dashboard" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <div className="bg-white border-b border-gray-100 p-6 pb-4 shadow-sm z-10">
            <div className="flex justify-between items-start mb-6">
              <div><h3 className="text-gray-900 font-bold text-lg">Partner Certificates</h3><p className="text-gray-400 text-xs">Q3 Campaign • Automated Run</p></div>
              <Button variant="ghost" size="sm" onClick={reset} className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"><X className="w-4 h-4" /></Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 text-green-600 mb-1"><Leaf className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wider">Trees</span></div>
                <div className="text-xl font-bold text-gray-800 tabular-nums">{treesCount.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 text-blue-600 mb-1"><Wind className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wider">CO2 Saved</span></div>
                <div className="text-xl font-bold text-gray-800 tabular-nums">{co2Count}<span className="text-sm font-normal text-gray-500 ml-0.5">t</span></div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 relative overflow-hidden">
                <motion.div className="absolute bottom-0 left-0 h-1 bg-purple-200" initial={{ width: "0%" }} animate={{ width: `${(filesGenerated / 245) * 100}%` }} transition={{ ease: "linear", duration: 0.1 }} />
                <div className="flex items-center gap-2 text-purple-600 mb-1"><FileText className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-wider">Generated</span></div>
                <div className="text-xl font-bold text-gray-800 tabular-nums">{filesGenerated}<span className="text-sm text-gray-400 font-normal ml-0.5">/245</span></div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 relative">
            <div className="flex justify-between items-center px-2 mb-2 sticky top-0 bg-[#F8F9FB] pb-2 z-10 border-b border-gray-100/50">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Live Output</span>
              {showSuccess && (<motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Fertig</motion.span>)}
            </div>
            <div className="relative min-h-[200px] pb-20">
              <AnimatePresence initial={false}>
                {fileList.map((file) => (
                  <motion.div key={file.id} layout initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center text-purple-400"><FileText className="w-4 h-4" /></div>
                      <div><div className="text-xs font-semibold text-gray-700">{file.name}</div><div className="text-[10px] text-gray-400">{file.size} • {file.time}</div></div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-gray-50"><Download className="w-3.5 h-3.5 text-gray-400" /></Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {fileList.length === 0 && filesGenerated === 0 && (<div className="text-center py-10 text-gray-300 text-xs italic">Waiting for stream...</div>)}
            </div>
          </div>
          <AnimatePresence>
            {showSuccess && (
              <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "100%", opacity: 0 }} className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                    <div><div className="text-sm font-bold text-gray-900">Zertifikate erstellt</div><div className="text-[11px] text-gray-500">245 Dateien bereit zum Download</div></div>
                  </div>
                  <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white gap-2 shadow-lg shadow-blue-500/20"><FileArchive className="w-4 h-4" /> Download (.zip)</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

// --- ANIMATION 2: SERVER LOOP (Video Automation) ---

const FAKE_NAMES = ["Julia S.", "Markus K.", "Sarah L.", "Tim B.", "Lena M.", "Jan P.", "Felix R.", "Anna H.", "Tom W."]

type VideoJob = {
  id: number
  customer: string
  status: "queued" | "rendering" | "uploading" | "sent"
  progress: number
}

function VideoAutomationSimulation() {
  const [jobs, setJobs] = useState<VideoJob[]>([])
  const [cpu, setCpu] = useState(12)
  const [ram, setRam] = useState(24)
  const [uptime, setUptime] = useState(1400) // Hours

  // 1. ADD NEW JOBS (Loop)
  useEffect(() => {
    // Start with some data
    setJobs([
      { id: 1, customer: "Lisa M.", status: "sent", progress: 100 },
      { id: 2, customer: "David B.", status: "sent", progress: 100 }
    ])

    const interval = setInterval(() => {
      const newJob: VideoJob = {
        id: Date.now(),
        customer: FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)],
        status: "queued",
        progress: 0
      }
      setJobs(prev => [newJob, ...prev].slice(0, 6)) // Keep list short
    }, 2800) // New order every ~3s

    return () => clearInterval(interval)
  }, [])

  // 2. PROCESS JOBS & STATS (Game Loop)
  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter stats
      setCpu(prev => Math.max(5, Math.min(60, prev + (Math.random() * 10 - 5))))
      setRam(prev => Math.max(20, Math.min(45, prev + (Math.random() * 4 - 2))))

      setJobs(prevJobs => prevJobs.map(job => {
        if (job.status === "sent") return job

        let { status, progress } = job
        const speed = 2; // Tick speed

        if (status === "queued") {
          // Wait a bit then start
          if (Math.random() > 0.95) status = "rendering"
        }
        else if (status === "rendering") {
          progress += speed
          if (progress >= 100) {
            progress = 0
            status = "uploading"
          }
        }
        else if (status === "uploading") {
          progress += speed * 2 // Upload is faster
          if (progress >= 100) {
            status = "sent"
          }
        }

        return { ...job, status, progress }
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0A0A0B] rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl font-mono text-xs">

      {/* HEADER: Server Status */}
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          </div>
          <div className="text-green-400 font-semibold tracking-widest text-[10px]">SYSTEM ONLINE</div>
        </div>
        <div className="text-white/30 text-[10px]">NODE-01 // LINUX-VM</div>
      </div>

      {/* BODY: Metrics & Log */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
            <div className="text-white/40 text-[10px] mb-1 flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU LOAD</div>
            <div className="text-white font-bold text-lg">{Math.round(cpu)}%</div>
            <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
              <motion.div className="h-full bg-purple-500" animate={{ width: `${cpu}%` }} transition={{ type: "spring", bounce: 0 }} />
            </div>
          </div>
          <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
            <div className="text-white/40 text-[10px] mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> MEMORY</div>
            <div className="text-white font-bold text-lg">{Math.round(ram)}%</div>
            <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
              <motion.div className="h-full bg-blue-500" animate={{ width: `${ram}%` }} transition={{ type: "spring", bounce: 0 }} />
            </div>
          </div>
          <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
            <div className="text-white/40 text-[10px] mb-1 flex items-center gap-1"><Server className="w-3 h-3" /> UPTIME</div>
            <div className="text-white font-bold text-lg">99.9%</div>
            <div className="text-[10px] text-green-500 mt-1">Stable</div>
          </div>
        </div>

        {/* Live Process List */}
        <div className="flex-1 relative z-10">
          <div className="text-white/40 text-[10px] uppercase tracking-wider mb-3 flex justify-between">
            <span>Live Process Queue</span>
            <span>Auto-Scroll: ON</span>
          </div>

          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {jobs.map(job => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center gap-4"
                >
                  {/* Icon based on status */}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    {job.status === "queued" && <Clock className="w-4 h-4 text-white/40" />}
                    {job.status === "rendering" && <Video className="w-4 h-4 text-purple-400 animate-pulse" />}
                    {job.status === "uploading" && <Download className="w-4 h-4 text-blue-400 rotate-180" />}
                    {job.status === "sent" && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium truncate">Order #{job.id.toString().slice(-4)} • {job.customer}</span>
                      <span className={cn("text-[10px] font-bold uppercase",
                        job.status === "queued" && "text-white/40",
                        job.status === "rendering" && "text-purple-400",
                        job.status === "uploading" && "text-blue-400",
                        job.status === "sent" && "text-green-400",
                      )}>
                        {job.status === "sent" ? "Delivered via Brevo" : job.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {job.status !== "sent" && job.status !== "queued" && (
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full", job.status === "rendering" ? "bg-purple-500" : "bg-blue-500")}
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                        />
                      </div>
                    )}
                    {job.status === "sent" && <div className="text-[10px] text-white/30">Video rendered & email sent successfully.</div>}
                    {job.status === "queued" && <div className="text-[10px] text-white/30">Waiting for worker node...</div>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- ANIMATION 3: PMS SIMULATION (CEO DASHBOARD STYLE) ---

const SIM_HOTELS = [
  { id: "h-102", name: "Alpenblick Hotel", pms: "Muse PMS", initTrees: 142, color: "bg-orange-500" },
  { id: "h-145", name: "Seaside Resort", pms: "Oracle", initTrees: 89, color: "bg-blue-500" },
  { id: "h-099", name: "City Stay Berlin", pms: "Mews", initTrees: 310, color: "bg-purple-500" },
  { id: "h-201", name: "Grand Hotel Wien", pms: "Opera", initTrees: 56, color: "bg-emerald-500" },
]

type PmsLog = { id: number, type: "income" | "invoice" | "mail", title: string, sub: string, amount?: string }

function PMSSimulation() {
  const [logs, setLogs] = useState<PmsLog[]>([])
  const [stats, setStats] = useState<Record<string, { trees: number, revenue: number }>>({})
  const [lastUpdated, setLastUpdated] = useState<string | null>(null) // ID of hotel that updated
  const [totalRevenue, setTotalRevenue] = useState(0)

  // Init stats
  useEffect(() => {
    const initial: Record<string, { trees: number, revenue: number }> = {}
    let total = 0
    SIM_HOTELS.forEach(h => {
      const rev = h.initTrees * 5
      initial[h.id] = { trees: h.initTrees, revenue: rev }
      total += rev
    })
    setStats(initial)
    setTotalRevenue(total)
  }, [])

  // The Loop (SLOWER: 3.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      const hotel = SIM_HOTELS[Math.floor(Math.random() * SIM_HOTELS.length)]
      const action = Math.random()

      // Reset highlight before new action
      setLastUpdated(null)

      setTimeout(() => {
        setLastUpdated(hotel.id)

        if (action < 0.75) {
          // New Revenue (most common)
          const trees = Math.floor(Math.random() * 2) + 1
          const income = trees * 5

          setStats(prev => ({
            ...prev,
            [hotel.id]: {
              trees: (prev[hotel.id]?.trees || 0) + trees,
              revenue: (prev[hotel.id]?.revenue || 0) + income
            }
          }))
          setTotalRevenue(prev => prev + income)

          addLog({
            id: Date.now(),
            type: "income",
            title: "Neuer Baum gepflanzt",
            sub: `${hotel.name} (Gast Checkout)`,
            amount: `+${income}€`
          })
        } else {
          // System Event
          addLog({
            id: Date.now(),
            type: "invoice",
            title: "Rechnung erstellt",
            sub: `Automatisch versendet an ${hotel.name}`,
            amount: "PDF"
          })
        }
      }, 100) // Small delay for highlight effect feel

    }, 3500) // Slower for CEO readability

    return () => clearInterval(interval)
  }, [])

  const addLog = (log: PmsLog) => {
    setLogs(prev => [log, ...prev].slice(0, 4))
  }

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0A0A0B] rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl font-sans">

      {/* DASHBOARD HEADER */}
      <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">Live Revenue Dashboard</div>
            <div className="text-white/40 text-[11px]">Real-time PMS Connection</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Gesamtumsatz</div>
          <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
            {totalRevenue.toLocaleString()}€
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8 overflow-hidden relative bg-gradient-to-b from-[#0A0A0B] to-[#111216]">

        {/* GRID: PARTNER HOTELS */}
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {SIM_HOTELS.map(hotel => {
            const data = stats[hotel.id] || { trees: 0, revenue: 0 }
            const isUpdating = lastUpdated === hotel.id

            return (
              <motion.div
                layout
                key={hotel.id}
                animate={{
                  borderColor: isUpdating ? "rgba(59, 130, 246, 0.5)" : "rgba(255,255,255,0.05)",
                  backgroundColor: isUpdating ? "rgba(59, 130, 246, 0.05)" : "rgba(255,255,255,0.02)"
                }}
                transition={{ duration: 0.3 }}
                className="border border-white/5 rounded-xl p-4 flex flex-col justify-between h-[100px] relative overflow-hidden group"
              >
                {/* Flash Effect Overlay */}
                <AnimatePresence>
                  {isUpdating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-blue-500/10 z-0 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", hotel.color)} />
                    <span className="text-xs font-medium text-white/90 truncate max-w-[90px]">{hotel.name}</span>
                  </div>
                  <div className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-medium">{hotel.pms}</div>
                </div>

                <div className="flex items-end justify-between relative z-10 mt-2">
                  <div>
                    <div className="text-[10px] text-white/40">Bäume</div>
                    <div className="text-lg font-bold text-white tabular-nums">{data.trees}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40">Umsatz</div>
                    <div className="text-lg font-bold text-blue-400 tabular-nums">{data.revenue}€</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ACTIVITY FEED */}
        <div className="flex-1 relative z-10 min-h-0 flex flex-col bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <span className="text-xs font-semibold text-white/70">Live Aktivitäten</span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-500 font-medium uppercase tracking-wide">Live</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {logs.map(log => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] border border-white/5"
                >
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    log.type === "income" ? "bg-emerald-500/20 text-emerald-400" : "bg-purple-500/20 text-purple-400"
                  )}>
                    {log.type === "income" ? <Euro className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white">{log.title}</div>
                    <div className="text-[10px] text-white/50 truncate">{log.sub}</div>
                  </div>
                  {log.amount && (
                    <div className={cn("text-xs font-bold tabular-nums",
                      log.type === "income" ? "text-emerald-400" : "text-white/40"
                    )}>
                      {log.amount}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && <div className="text-center text-white/20 text-xs py-4">Warte auf Transaktionen...</div>}
          </div>
        </div>

      </div>
    </div>
  )
}

// --- ANIMATION 4: BUNDESLAND SIMULATION (LIGHT MODE & FAST) ---

type State = { id: string, name: string, count: number, color: string, colorBg: string }

const INITIAL_STATES: State[] = [
  { id: "by", name: "Bayern", count: 14250, color: "bg-blue-600", colorBg: "bg-blue-100" },
  { id: "nrw", name: "Nordrhein-Westfalen", count: 13980, color: "bg-emerald-600", colorBg: "bg-emerald-100" },
  { id: "bw", name: "Baden-Württemberg", count: 13850, color: "bg-amber-500", colorBg: "bg-amber-100" },
  { id: "nds", name: "Niedersachsen", count: 9200, color: "bg-red-500", colorBg: "bg-red-100" },
  { id: "he", name: "Hessen", count: 8400, color: "bg-violet-500", colorBg: "bg-violet-100" },
]

function BundeslandSimulation() {
  const [states, setStates] = useState<State[]>(INITIAL_STATES)
  const [isActive, setIsActive] = useState(true)
  const [totalTrees, setTotalTrees] = useState(59680)

  useEffect(() => {
    // Reset on mount
    setStates(INITIAL_STATES)
    setTotalTrees(59680)
    setIsActive(true)

    const interval = setInterval(() => {
      // Logic: Pick a random state, boost it significantly to create "race" feeling
      setStates(prev => {
        const sorted = [...prev].sort((a, b) => b.count - a.count)

        // Bias towards top 3 to keep the race tight at the top
        const updateIdx = Math.random() > 0.3 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * prev.length)
        const targetId = sorted[updateIdx].id

        // Random huge jump vs small jump
        const isBigJump = Math.random() > 0.7
        const increment = isBigJump ? Math.floor(Math.random() * 200) + 50 : Math.floor(Math.random() * 40) + 10

        // Update Total
        setTotalTrees(t => t + increment)

        const newState = prev.map(s =>
          s.id === targetId ? { ...s, count: s.count + increment } : s
        )

        return newState.sort((a, b) => b.count - a.count)
      })

    }, 800) // Fast updates for excitement

    // Stop after 12 seconds
    const timeout = setTimeout(() => {
      setIsActive(false)
      clearInterval(interval)
    }, 12000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const maxCount = Math.max(...states.map(s => s.count)) * 1.1 // slightly larger for visual buffer

  return (
    <div className="relative w-full h-full min-h-[400px] bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col shadow-xl font-sans text-slate-900">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Live Kampagne</div>
          <div className="font-bold text-lg text-slate-900">Bundesländer-Race 🌳</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-gray-400">Gesamt</div>
          <div className="font-mono font-bold text-xl tabular-nums text-slate-900">
            {totalTrees.toLocaleString()}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 p-6 flex flex-col gap-3 relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          {states.map((state, index) => (
            <motion.div
              key={state.id}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn("relative flex items-center p-3 rounded-lg border-2 bg-white z-10",
                index === 0 ? "border-yellow-400/30 shadow-[0_4px_20px_-10px_rgba(250,204,21,0.5)]" : "border-transparent bg-gray-50"
              )}
            >
              {/* Rank Badge */}
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 shrink-0 shadow-sm",
                index === 0 ? "bg-yellow-400 text-yellow-900" :
                  index === 1 ? "bg-slate-300 text-slate-700" :
                    index === 2 ? "bg-amber-600 text-amber-100" : "bg-white text-gray-400 border border-gray-200"
              )}>
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-bold text-sm text-slate-800">{state.name}</span>
                  <span className="font-mono text-sm font-bold text-slate-600 tabular-nums">{state.count.toLocaleString()}</span>
                </div>

                {/* Bar */}
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", state.color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${(state.count / maxCount) * 100}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }} // Smooth bar growth
                  />
                </div>
              </div>

              {/* "Hot" Icon for top place or active changes? */}
              {index === 0 && isActive && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> LEAD
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Status Footer */}
        {!isActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-x-0 bottom-4 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium shadow-lg cursor-pointer" onClick={() => window.location.reload()}>
              <RefreshCcw className="w-3 h-3" /> Kampagne beendet. Replay?
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function PlaceholderSimulation() {
  return (
    <div className="w-full h-[300px] bg-[#0F1115] border border-white/10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
        <Zap className="h-6 w-6 text-white/20" />
      </div>
      <div className="text-white/40 text-sm">Demo folgt in Kürze</div>
    </div>
  )
}


export function CaseStudies() {
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
  }, [selected])

  return (
    <section id="projekte" className="section-anchor relative py-20 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gradient mb-3">Ausgewählte Arbeiten</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">Echte Probleme. <br /><span className="text-brand-gradient">Gelöst durch Code.</span></h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl relative pl-4">
            <span aria-hidden="true" className="pointer-events-none absolute left-0 top-1 h-[70%] w-[2px] bg-brand-gradient rounded-full" />
            Ich habe über ein Jahr als Lead Automation Engineer gearbeitet und Systeme gebaut, die skalieren.
            Hier sind 4 ausgewählte Projekte, die zeigen, wie ich Probleme löse.
          </p>

          {/* NEW DISCLAIMER */}
          <div className="mt-6 flex items-center gap-2 text-xs text-white/40 font-medium bg-white/5 w-fit px-3 py-2 rounded-lg border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
            <span>Hinweis: Aus Datenschutzgründen werden alle Projekte als Simulationen mit fiktiven Daten dargestellt.</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TiltCard>
                <motion.div
                  layoutId={`card-${project.id}`}
                  onClick={() => setSelected(project)}
                  className="card relative flex h-full flex-col overflow-hidden border border-white/15 bg-surface-800/95 group cursor-pointer"
                >
                  <div className="pointer-events-none absolute inset-0 bg-brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 md:p-8 flex flex-col h-full z-10">
                    <div className="flex justify-between items-start mb-4">
                      {/* UPDATE: Category Pill mit längeren Texten & ohne Uppercase Zwang */}
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.7rem] font-medium text-brand-cyan tracking-wide">
                        {project.category}
                      </span>

                      {/* UPDATE: Arrow mit "Mehr Details" Text */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider group-hover:text-brand-cyan transition-colors hidden sm:block">
                          Mehr Details
                        </span>
                        <div className="bg-white/10 p-2 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 text-brand-gradient">{project.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-8">{project.shortDesc}</p>

                    {/* --- ORIGINAL STATS --- */}
                    <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                      {project.stats.map((s, i) => (
                        <div key={i}>
                          <div className="text-[10px] uppercase text-white/40 mb-1 tracking-wider">{s.label}</div>
                          <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* --- PREVIEW: CERTIFICATES (Updated with List) --- */}
                    {project.id === "cert-engine" && (
                      <div className="mt-6 -mx-6 -mb-6 md:-mx-8 md:-mb-8 border-t border-white/10 bg-[#F8F9FB] relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 ease-out h-[260px]">
                        <div className="p-6 md:p-8">
                          {/* Preview Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-gray-900 font-bold text-sm leading-tight">Partner Certificates</h4>
                              <p className="text-gray-500 text-[10px] mt-0.5">Q3 Campaign • Automated Run</p>
                            </div>
                            <div className="flex gap-1.5 mt-1">
                              <div className="w-2 h-2 rounded-full bg-red-400/30" />
                              <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
                              <div className="w-2 h-2 rounded-full bg-green-400/30" />
                            </div>
                          </div>

                          {/* Preview Body */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-white p-2.5 rounded border border-gray-100 shadow-sm">
                              <div className="flex items-center gap-1.5 text-green-600 mb-1">
                                <Leaf className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Trees</span>
                              </div>
                              <div className="text-lg font-bold text-gray-800 leading-none">12.450</div>
                            </div>
                            <div className="bg-white p-2.5 rounded border border-gray-100 shadow-sm">
                              <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                                <Wind className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">CO2</span>
                              </div>
                              <div className="text-lg font-bold text-gray-800 leading-none">142t</div>
                            </div>
                            <div className="bg-white p-2.5 rounded border border-gray-100 shadow-sm">
                              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                                <FileText className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Files</span>
                              </div>
                              <div className="text-lg font-bold text-gray-800 leading-none">245</div>
                            </div>
                          </div>

                          {/* NEW: Live Output List */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live Output</span>
                              <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Fertig
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center text-purple-600">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-gray-700">GreenCo_Cert_Q3_1042.pdf</div>
                                    <div className="text-[9px] text-gray-400">1.2 MB • Just now</div>
                                  </div>
                                </div>
                                <Download className="w-3.5 h-3.5 text-gray-300" />
                              </div>
                              <div className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-lg shadow-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center text-purple-600">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-gray-700">GreenCo_Cert_Q3_1041.pdf</div>
                                    <div className="text-[9px] text-gray-400">1.1 MB • Just now</div>
                                  </div>
                                </div>
                                <Download className="w-3.5 h-3.5 text-gray-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- PREVIEW: PMS INTEGRATION (Existing) --- */}
                    {project.id === "pms-integration" && (
                      <div className="mt-6 -mx-6 -mb-6 md:-mx-8 md:-mb-8 border-t border-white/10 bg-[#0A0A0B] relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 ease-out h-[260px]">
                        <div className="p-6 md:p-8">
                          {/* Preview Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-blue-500/10 rounded text-blue-400 border border-blue-500/20">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-white font-bold text-sm leading-tight">Live Revenue Dashboard</h4>
                                <p className="text-white/40 text-[10px] mt-0.5">Real-time PMS Connection</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Gesamt</div>
                              <div className="text-lg font-bold text-white leading-none">2.985€</div>
                            </div>
                          </div>

                          {/* Preview Body */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span className="text-[10px] font-medium text-white/90 truncate">Alpenblick Hotel</span>
                              </div>
                              <div className="flex justify-between items-end">
                                <div><div className="text-[9px] text-white/40">Bäume</div><div className="text-sm font-bold text-white leading-none">142</div></div>
                                <div className="text-right"><div className="text-[9px] text-white/40">Umsatz</div><div className="text-sm font-bold text-blue-400 leading-none">710€</div></div>
                              </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-medium text-white/90 truncate">Seaside Resort</span>
                              </div>
                              <div className="flex justify-between items-end">
                                <div><div className="text-[9px] text-white/40">Bäume</div><div className="text-sm font-bold text-white leading-none">89</div></div>
                                <div className="text-right"><div className="text-[9px] text-white/40">Umsatz</div><div className="text-sm font-bold text-blue-400 leading-none">445€</div></div>
                              </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                <span className="text-[10px] font-medium text-white/90 truncate">City Stay Berlin</span>
                              </div>
                              <div className="flex justify-between items-end">
                                <div><div className="text-[9px] text-white/40">Bäume</div><div className="text-sm font-bold text-white leading-none">310</div></div>
                                <div className="text-right"><div className="text-[9px] text-white/40">Umsatz</div><div className="text-sm font-bold text-blue-400 leading-none">1.550€</div></div>
                              </div>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-medium text-white/90 truncate">Grand Hotel Wien</span>
                              </div>
                              <div className="flex justify-between items-end">
                                <div><div className="text-[9px] text-white/40">Bäume</div><div className="text-sm font-bold text-white leading-none">56</div></div>
                                <div className="text-right"><div className="text-[9px] text-white/40">Umsatz</div><div className="text-sm font-bold text-blue-400 leading-none">280€</div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- PREVIEW: VIDEO AUTOMATION (Existing) --- */}
                    {project.id === "video-automation" && (
                      <div className="mt-6 -mx-6 -mb-6 md:-mx-8 md:-mb-8 border-t border-white/10 bg-[#0A0A0B] relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 ease-out h-[260px] font-mono text-xs">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                        {/* Header */}
                        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                            </div>
                            <div className="text-green-400 font-semibold tracking-widest text-[10px]">SYSTEM ONLINE</div>
                          </div>
                          <div className="text-white/30 text-[10px]">NODE-01 // LINUX-VM</div>
                        </div>

                        <div className="p-6 relative z-10 flex flex-col gap-6">
                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
                              <div className="text-white/40 text-[10px] mb-1 flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU LOAD</div>
                              <div className="text-white font-bold text-lg">35%</div>
                              <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[35%]" />
                              </div>
                            </div>
                            <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
                              <div className="text-white/40 text-[10px] mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> MEMORY</div>
                              <div className="text-white font-bold text-lg">25%</div>
                              <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[25%]" />
                              </div>
                            </div>
                            <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
                              <div className="text-white/40 text-[10px] mb-1 flex items-center gap-1"><Server className="w-3 h-3" /> UPTIME</div>
                              <div className="text-white font-bold text-lg">99.9%</div>
                              <div className="text-[10px] text-green-500 mt-1">Stable</div>
                            </div>
                          </div>

                          {/* Process List */}
                          <div>
                            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-3 flex justify-between">
                              <span>Live Process Queue</span>
                              <span>Auto-Scroll: ON</span>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-white font-medium truncate">Order #1042 • Lisa M.</span>
                                    <span className="text-[10px] font-bold uppercase text-green-400">Delivered via Brevo</span>
                                  </div>
                                  <div className="text-[10px] text-white/30">Video rendered & email sent successfully.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-white font-medium truncate">Order #1043 • David B.</span>
                                    <span className="text-[10px] font-bold uppercase text-green-400">Delivered via Brevo</span>
                                  </div>
                                  <div className="text-[10px] text-white/30">Video rendered & email sent successfully.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- PREVIEW: BUNDESLAND CAMPAIGN (Existing) --- */}
                    {project.id === "bundesland-campaign" && (
                      <div className="mt-6 -mx-6 -mb-6 md:-mx-8 md:-mb-8 border-t border-white/10 bg-white relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 ease-out h-[260px] font-sans text-slate-900">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Live Kampagne</div>
                            <div className="font-bold text-lg text-slate-900">Bundesländer-Race 🌳</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase font-bold text-gray-400">Gesamt</div>
                            <div className="font-mono font-bold text-xl tabular-nums text-slate-900">59.762</div>
                          </div>
                        </div>

                        {/* List */}
                        <div className="p-6 flex flex-col gap-3 relative">
                          {/* Item 1 */}
                          <div className="relative flex items-center p-3 rounded-lg border-2 bg-white z-10 border-yellow-400/30 shadow-[0_4px_20px_-10px_rgba(250,204,21,0.5)]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 shrink-0 shadow-sm bg-yellow-400 text-yellow-900">1</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-end mb-1">
                                <span className="font-bold text-sm text-slate-800">Bayern</span>
                                <span className="font-mono text-sm font-bold text-slate-600 tabular-nums">14.250</span>
                              </div>
                              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-blue-600 w-[90%]" />
                              </div>
                            </div>
                            <div className="absolute -top-1 -right-1">
                              <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> LEAD
                              </div>
                            </div>
                          </div>

                          {/* Item 2 */}
                          <div className="relative flex items-center p-3 rounded-lg border-2 border-transparent bg-gray-50">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 shrink-0 shadow-sm bg-slate-300 text-slate-700">2</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-end mb-1">
                                <span className="font-bold text-sm text-slate-800">Nordrhein-Westfalen</span>
                                <span className="font-mono text-sm font-bold text-slate-600 tabular-nums">13.980</span>
                              </div>
                              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-emerald-600 w-[85%]" />
                              </div>
                            </div>
                          </div>

                          {/* Item 3 */}
                          <div className="relative flex items-center p-3 rounded-lg border-2 border-transparent bg-gray-50">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 shrink-0 shadow-sm bg-amber-600 text-amber-100">3</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-end mb-1">
                                <span className="font-bold text-sm text-slate-800">Baden-Württemberg</span>
                                <span className="font-mono text-sm font-bold text-slate-600 tabular-nums">13.850</span>
                              </div>
                              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-amber-500 w-[82%]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-surface-900/90 backdrop-blur-md" />
            <motion.div layoutId={`card-${selected.id}`} className="relative w-full max-w-5xl max-h-[90vh] bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-[101]">
              <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"><X className="h-5 w-5" /></button>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-[#0F1115] border border-white/10 border-r-0 rounded-l-2xl">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue mb-2">Case Study</div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-brand-gradient">{selected.title}</h2>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-300 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-red-400" />Das Problem</div>
                    <ul className="space-y-2 pl-4 border-l border-white/10">{selected.fullDesc.problem.map((pt, i) => (<li key={i} className="text-sm text-white/60">{pt}</li>))}</ul>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Die Lösung</div>
                    <ul className="space-y-2 pl-4 border-l border-white/10">{selected.fullDesc.solution.map((pt, i) => (<li key={i} className="text-sm text-white/60">{pt}</li>))}</ul>
                  </div>
                  <div className="bg-brand-gradient-soft p-5 rounded-xl border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-3">Ergebnis</div>
                    <ul className="space-y-2">{selected.fullDesc.result.map((pt, i) => (<li key={i} className="flex gap-2 text-sm font-medium text-white/90"><CheckCircle2 className="h-4 w-4 text-brand-cyan shrink-0" />{pt}</li>))}</ul>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[45%] bg-[#050608] border-t md:border-t-0 md:border-l border-white/10 p-8 flex flex-col justify-center relative rounded-r-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="relative z-10 w-full h-full flex flex-col">
                  {selected.animationType === "certificates" && <CertificateSimulation />}
                  {selected.animationType === "video-automation" && <VideoAutomationSimulation />}
                  {selected.animationType === "pms-simulation" && <PMSSimulation />}
                  {selected.animationType === "bundesland-simulation" && <BundeslandSimulation />}
                  {selected.animationType === "placeholder" && <PlaceholderSimulation />}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}