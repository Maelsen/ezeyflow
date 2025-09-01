"use client"
import { useEffect, useMemo, useState } from "react"

export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] || "")
  const key = useMemo(() => ids.join("|"), [ids])   // stabile Abhängigkeit

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [key, ids])

  return active
}
