"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
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
            <a href="#why" className="opacity-80 hover:opacity-100">Warum wir</a>
            <a href="#demo" className="opacity-80 hover:opacity-100">Demo</a>
            <a href="#portfolio" className="opacity-80 hover:opacity-100">Projekte</a>
          </nav>
          <Button asChild className="rounded-xl">
            <a href="#funnel">Kostenloses Erstgespräch</a>
          </Button>
        </div>
      </header>
    </>
  )
}
