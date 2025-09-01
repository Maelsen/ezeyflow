import type { Metadata } from "next"
import "./globals.css"

import dynamic from "next/dynamic"
import { Inter, Roboto_Mono } from "next/font/google"

// Wir behalten deine Variablennamen, damit globals.css/Tailwind passt
const Geist = Inter({ subsets: ["latin"], variable: "--font-geist-sans" })
const Geist_Mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

// Client-only Komponenten nicht server-rendern (fix für _not-found/useContext)
const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false })
const CtaRibbon = dynamic(() => import("@/components/layout/CtaRibbon"), { ssr: false })
const ScrollTop = dynamic(() => import("@/components/layout/ScrollTop"), { ssr: false })

import Footer from "@/components/layout/Footer"

// Falls noch nicht vorhanden, leg eine leere Komponente an: src/components/seo/DefaultSEO.tsx (export default () => null)
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${Geist.variable} ${Geist_Mono.variable} antialiased`}>
        <DefaultSEO />
        <Header />
        <CtaRibbon />
        {children}
        <ScrollTop />
        <Footer />
      </body>
    </html>
  )
}
