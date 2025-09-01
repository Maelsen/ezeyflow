"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { CALENDLY_URL } from "@/lib/config"

export default function Funnel() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <section id="funnel" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-2xl md:text-3xl font-bold">Bereit, Ihr Team smarter arbeiten zu lassen?</h2>
      <p className="mt-2 text-muted-foreground">Buchen Sie ein Erstgespräch oder schicken Sie uns kurz Ihr Anliegen.</p>

      <Tabs defaultValue="calendar" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="form">Formular</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <div className="overflow-hidden rounded-2xl border bg-card/60 shadow">
            {/* Ersetze die src später mit deinem echten Calendly/TidyCal-Link */}
            <div className="aspect-[16/10] md:aspect-[16/8]">
              <iframe
                title="Termin buchen"
                src={CALENDLY_URL}
                className="h-full w-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Hinweis: Demo-Embed. Wir verknüpfen später deinen echten Kalender (Prefill mit Name/E-Mail möglich).
          </p>
        </TabsContent>

        <TabsContent value="form" className="mt-6">
          <form
            ref={formRef}
            className="grid gap-4 rounded-2xl border bg-card/60 p-5 shadow md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              alert("Danke! (Demo) – Wir melden uns zeitnah.")
              formRef.current?.reset()
            }}
          >
            <div>
              <label className="mb-1 block text-sm">Name</label>
              <Input name="name" placeholder="Max Mustermann" required />
            </div>
            <div>
              <label className="mb-1 block text-sm">E-Mail</label>
              <Input type="email" name="email" placeholder="max@firma.de" required />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm">Anliegen</label>
              <textarea
                name="message"
                placeholder="Kurz Ihr Prozess/Problem – wir schlagen die passende Automation vor."
                className="h-28 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="rounded-xl">Absenden</Button>
            </div>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            DSGVO-Hinweis: Wir verarbeiten Ihre Angaben ausschließlich zur Kontaktaufnahme.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  )
}
