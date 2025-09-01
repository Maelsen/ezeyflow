import "./globals.css"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import DefaultSEO from "@/components/seo/DefaultSEO"
import CtaRibbon from "@/components/layout/CtaRibbon"
import ScrollTop from "@/components/layout/ScrollTop"




const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" })

export const metadata: Metadata = {
  title: "ezeyflow – Automatisierungen & Dashboards",
  description: "KI-gestützte Workflows, die Teams hunderte Stunden sparen.",
  metadataBase: new URL("https://ezeyflow.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
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
