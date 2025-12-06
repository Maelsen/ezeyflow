import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const ContactSchema = z.object({
  name: z.string().min(2, "Name zu kurz"),
  email: z.string().email("Ungültige E-Mail"),
  company: z.string().optional().default(""),
  message: z.string().min(10, "Bitte etwas ausführlicher"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Bitte Zustimmung geben",
  }),
  // Honeypot (muss leer sein)
  website: z.string().optional().default(""),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = ContactSchema.parse(body)

    // Honeypot: falls ausgefüllt, silently ok (aber kein Versand)
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL || "hi@ezeyflow.com"
    const from = process.env.RESEND_FROM || "onboarding@resend.dev"

    if (apiKey) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from,
        to,
        subject: `Neue Kontaktanfrage – ${data.name} (${data.email})`,
        replyTo: data.email,
        text: `
Name: ${data.name}
E-Mail: ${data.email}
Firma: ${data.company}

Nachricht:
${data.message}
        `.trim(),
      })
    } else {
      console.log("[CONTACT] (SIMULATED SEND)", {
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("[CONTACT_ERROR]", err)
    return NextResponse.json({ ok: false, error: err?.message ?? "Bad Request" }, { status: 400 })
  }
}
