"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "tr" | "en"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  tr: {
    login: "GİRİŞ YAP",
    register: "KAYIT OL",
    email: "E-posta",
    password: "Şifre",
    confirmPassword: "Şifre Tekrarı",
    noAccount: "Hesabınız yok mu?",
    haveAccount: "Hesabınız var mı?",
    home: "ANA SAYFA",
    campaigns: "KAMPANYALAR",
    search: "ARA",
    featuredCampaigns: "ÖNE ÇIKAN KAMPANYALAR",
    successClub: "BAŞARANLAR KULÜBÜ",
    upcoming: "YAKINDA",
    target: "Hedef",
    viewDetails: "Detayları Gör",
    viewMore: "Daha Fazla Gör",
    comingSoon: "Yakında",
    raisedAmount: "Toplanan Tutar",
    completionDate: "Tamamlanma Tarihi",
    investor: "YATIRIMCI",
    entrepreneur: "GİRİŞİMCİ",
    profile: "PROFİL",
    exploreProjects: "Kampanyaları Keşfet",
    futureProjects: "Geleceğin Projelerine",
    invest: "Yatırım Yapın",
    platformDescription:
      "Güvenli, şeffaf ve yasal kitle fonlama platformu ile yenilikçi projelere yatırım yapın veya projeniz için fon toplayın.",
  },
  en: {
    login: "LOGIN",
    register: "REGISTER",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    home: "HOME",
    campaigns: "CAMPAIGNS",
    search: "SEARCH",
    featuredCampaigns: "FEATURED CAMPAIGNS",
    successClub: "SUCCESS CLUB",
    upcoming: "UPCOMING",
    target: "Target",
    viewDetails: "View Details",
    viewMore: "View More",
    comingSoon: "Coming Soon",
    raisedAmount: "Raised Amount",
    completionDate: "Completion Date",
    investor: "INVESTOR",
    entrepreneur: "ENTREPRENEUR",
    profile: "PROFILE",
    exploreProjects: "Explore Projects",
    futureProjects: "Invest in Future",
    invest: "Projects",
    platformDescription:
      "Invest in innovative projects or raise funds for your project with a secure, transparent, and legal crowdfunding platform.",
  },
}

type LanguageContextType = {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "tr"
    }
    return "tr"
  })

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "tr" ? "en" : "tr"))
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}

