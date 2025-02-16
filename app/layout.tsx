import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Providers } from "@/lib/providers";
import { LanguageProvider } from "@/contexts/language-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>
          <LanguageProvider>
            <AuthProvider>
              <Header />
              <main className="flex-1 container mx-auto px-4 py-2">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
