import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Providers } from "@/lib/providers"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ardventurekfs.com"),
  title: {
    default: "ARDVENTURE KFS - Kitle Fonlama Sistemi",
    template: "%s | ARDVENTURE KFS",
  },
  description:
    "Geleceğin projelerine yatırım yapın ve girişimcileri destekleyin. ARDVENTURE KFS ile yenilikçi projelere güvenle yatırım yapabilir veya kendi projeniz için fon toplayabilirsiniz.",
  keywords: ["kitle fonlama", "yatırım", "girişim", "ARDVENTURE", "KFS", "startup", "inovasyon", "finansman"],
  authors: [{ name: "ARDVENTURE KFS Ekibi" }],
  creator: "ARDVENTURE KFS",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.ardventurekfs.com",
    siteName: "ARDVENTURE KFS",
    title: "ARDVENTURE KFS - Geleceğin Projelerine Yatırım Yapın",
    description:
      "Türkiye'nin güvenilir kitle fonlama platformu. Yenilikçi projelere yatırım yapın veya kendi projeniz için fon toplayın.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ARDVENTURE KFS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARDVENTURE KFS - Geleceğin Projelerine Yatırım Yapın",
    description:
      "Türkiye'nin güvenilir kitle fonlama platformu. Yenilikçi projelere yatırım yapın veya kendi projeniz için fon toplayın.",
    images: ["/twitter-image.jpg"],
    creator: "@ardventurekfs",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>
          {" "}
          {/* Sarmalayıcıyı buraya taşı */}
          <LanguageProvider>
            <AuthProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'