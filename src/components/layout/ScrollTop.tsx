"use client"

import { useEffect, useState } from "react"

export default function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <button
      aria-label="Nach oben"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card/80 shadow backdrop-blur transition-all ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑
    </button>
  )
}
