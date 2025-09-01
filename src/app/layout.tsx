import type { Metadata } from "next"
import "./globals.css"

import { Inter, Roboto_Mono } from "next/font/google"

// Fonts als CSS-Variablen, passend zu deiner globals.css
const Geist = Inter({ subsets: ["latin"], variable: "--font-geist-sans" })
const Geist_Mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

// Client-Komponenten NORMAL importieren – Next setzt automatisch Client-Boundaries
import Header from "@/components/layout/Header"
import CtaRibbon from "@/components/layout/CtaRibbon"
import ScrollTop from "@/components/layout/ScrollTop"
import Footer from "@/components/layout/Footer"

// Falls noch nicht vorhanden, lege src/components/seo/DefaultSEO.tsx mit "export default () => null" an
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
