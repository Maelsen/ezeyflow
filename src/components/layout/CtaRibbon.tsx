"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function CtaRibbon() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-40 px-4 md:hidden transition-all ${
        show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
      }`}
      aria-hidden={!show}
    >
      <div className="mx-auto max-w-md rounded-2xl border bg-card/80 shadow backdrop-blur px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm">Kostenloses Erstgespräch</span>
          <Button asChild size="sm" className="rounded-xl">
            <a href="#funnel">Termin sichern</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
