"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-brand-gradient">Seite nicht gefunden</h1>
      <p className="text-muted-foreground">Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
      <Link href="/" className="underline underline-offset-4 decoration-primary/50">Zur Startseite</Link>
    </main>
  )
}
