"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, Briefcase, Star, Clock, Trophy, BarChart, Zap, Info, Users, Building } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

const sections = [
  { id: "hero", name: "Ana Sayfa", icon: Home },
  { id: "project-showcase", name: "Projeler", icon: Briefcase },
  { id: "featured-campaigns", name: "Öne Çıkanlar", icon: Star },
  { id: "upcoming-campaigns", name: "Yakında", icon: Clock },
  { id: "success-club", name: "Başaranlar", icon: Trophy },
]

// Giriş yapmamış kullanıcılar için ek bölümler
const additionalSections = [
  { id: "stats", name: "İstatistikler", icon: BarChart },
  { id: "features", name: "Özellikler", icon: Zap },
  { id: "about", name: "Hakkımızda", icon: Info },
  { id: "partners", name: "Partnerler", icon: Users },
  { id: "subsidiaries", name: "İştirakler", icon: Building },
]

export function VerticalNavigation() {
  const [activeSection, setActiveSection] = useState("")
  const [hoveredSection, setHoveredSection] = useState("")
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const visibleSections = isAuthenticated ? sections : [...sections, ...additionalSections]
    visibleSections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isAuthenticated])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Giriş durumuna göre görünecek bölümleri belirle
  const visibleSections = isAuthenticated ? sections : [...sections, ...additionalSections]

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4 relative">
        {visibleSections.map((section) => {
          const Icon = section.icon

          return (
            <motion.div key={section.id} whileHover={{ scale: 1.1 }}>
              <motion.button
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection("")}
                className={`relative flex items-center justify-end rounded-full transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-[#4DB05F] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                } ${activeSection === section.id ? "ring-2 ring-[#4DB05F] ring-offset-2" : ""}`}
              >
                <motion.div
                  className="absolute right-12 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: hoveredSection === section.id ? 1 : 0,
                    x: hoveredSection === section.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="whitespace-nowrap text-gray-800 font-medium">{section.name}</span>
                </motion.div>
                <div className="w-10 h-10 flex items-center justify-center">
                  <Icon size={20} />
                </div>
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </nav>
  )
}

