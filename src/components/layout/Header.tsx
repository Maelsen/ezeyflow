"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import useActiveSection from "@/lib/useActiveSection"

export default function Header() {
  // Hook MUSS im Body stehen (nicht top-level!)
  const active = useActiveSection(["why", "demo", "portfolio", "process", "faq", "funnel"])
  const link = (id: string) =>
    `opacity-80 hover:opacity-100 transition-colors ${
      active === id ? "text-foreground font-semibold underline underline-offset-4 decoration-primary/50" : ""
    }`

  return (
    <>
      <a href="#funnel" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 rounded bg-primary px-3 py-2 text-sm text-primary-foreground">
        Zum Erstgespräch
      </a>
      <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="font-bold">
            <span className="text-brand-gradient">ezeyflow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#why" className={link("why")}>Warum wir</a>
            <a href="#demo" className={link("demo")}>Demo</a>
            <a href="#portfolio" className={link("portfolio")}>Projekte</a>
            <a href="#process" className={link("process")}>Ablauf</a>
            <a href="#faq" className={link("faq")}>FAQ</a>
          </nav>
          <Button asChild className="rounded-xl">
            <a href="#funnel">Kostenloses Erstgespräch</a>
          </Button>
        </div>
      </header>
    </>
  )
}
