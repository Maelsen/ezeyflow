"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const NAV = [
  { href: "#leistungen", id: "leistungen", label: "Leistungen" },
  { href: "#projekte",   id: "projekte",   label: "Projekte" },
  { href: "#about",      id: "about",      label: "Über mich" },
  { href: "#kontakt",    id: "kontakt",    label: "Kontakt" },
]

export default function SiteHeader() {
  // Header-UI
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)

  // Scroll-Spy: aktiver Abschnitt
  const [activeId, setActiveId]   = useState<string | null>(null)
  const sectionIds                = useMemo(() => NAV.map(n => n.id), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-Spy via IntersectionObserver
  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: "-64px 0px -50% 0px",
        threshold: [0.15, 0.35, 0.6, 0.9],
      }
    )

    sections.forEach(sec => obs.observe(sec))
    return () => obs.disconnect()
  }, [sectionIds])

  // Mobile-Menü bei Klick auf Link schließen
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  return (
    <>
      {/* FIXED Header */}
      <header
        className={cn(
          // WICHTIG: fixed + top-0 + inset-x-0, KEINE nav-edge-Klasse mehr
          "fixed inset-x-0 top-0 z-50",
          "glass-nav transition-colors",
          scrolled && "nav-scrolled"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Brand mit Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ezeyflow Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Desktop-Nav */}
          <nav className="relative hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {NAV.map((item) => (
                <li key={item.href} className="relative">
                  <HeaderLink
                    href={item.href}
                    label={item.label}
                    active={activeId === item.id}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop-CTA */}
          <div className="hidden md:block">
            <Button size="md" variant="primary" asChild>
              <a href="#kontakt">Kostenlose Prozess-Analyse buchen</a>
            </Button>
          </div>

          {/* Mobile-Toggle */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/5"
            aria-label="Menü öffnen"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile-Menü */}
        {open && (
          <div className="md:hidden border-t border-white/10">
            <div className="container py-3">
              <ul className="flex flex-col gap-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 hover:bg-white/5",
                        activeId === item.id && "bg-white/5"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <Button size="lg" variant="primary" className="w-full" asChild>
                  <a href="#kontakt" onClick={() => setOpen(false)}>
                    Erstgespräch buchen
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer, damit der fixed Header den Content nicht überlappt */}
      <div className="h-16" aria-hidden />
    </>
  )
}

/* Unterstreichung mit shared layoutId */
function HeaderLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active?: boolean
}) {
  return (
    <a href={href} className="relative py-1 text-white/80 hover:text-white">
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--brand-cyan), var(--brand-blue), var(--brand-violet))",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
    </a>
  )
}
