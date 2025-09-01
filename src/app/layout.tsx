import type { Metadata } from "next"
import { Geist, Geist_Mono } from "geist/font" // stellt --font-geist-sans / --font-geist-mono bereit
import "./globals.css"

import dynamic from "next/dynamic"

// Client-only Komponenten NICHT server-rendern (verhindert useContext-Fehler beim Prerender)
const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false })
const CtaRibbon = dynamic(() => import("@/components/layout/CtaRibbon"), { ssr: false })
const ScrollTop = dynamic(() => import("@/components/layout/ScrollTop"), { ssr: false })

// Footer ist rein präsentational (kein Hook) – kann serverseitig bleiben
import Footer from "@/components/layout/Footer"

// Optionales SEO-Default (falls vorhanden)
import DefaultSEO from "@/components/seo/DefaultSEO"

export const metadata: Metadata = {
  title: "ezeyflow – KI-gestützte Automatisierungen & Dashboards",
  description:
    "Wir bauen KI-Automatisierungen, Dashboards & Integrationen, die Teams hunderte Stunden sparen – benutzerfreundlich und in 1–2 Wochen live.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <head>
        {/* kleine Performance-Hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${Geist.variable} ${Geist_Mono.variable} antialiased`}>
        {/* SEO-Defaults, falls die Komponente existiert */}
        {typeof DefaultSEO !== "undefined" && <DefaultSEO />}

        <Header />
        <CtaRibbon />

        {children}

        <ScrollTop />
        <Footer />
      </body>
    </html>
  )
}
