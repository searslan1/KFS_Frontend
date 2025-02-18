"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// 10 kampanya verisi
const campaigns = [
  {
    id: 1,
    title: "ChatterBug",
    description: "Beta Süreci Sona Erdi, Yayında!",
  },
  {
    id: 2,
    title: "SmartFarm",
    description: "Akıllı Tarım Teknolojileri",
  },
  {
    id: 3,
    title: "EcoEnergy",
    description: "Yenilenebilir Enerji Çözümleri",
  },
  {
    id: 4,
    title: "MediTech",
    description: "Dijital Sağlık Platformu",
  },
  {
    id: 5,
    title: "AquaPure",
    description: "Su Arıtma Teknolojileri",
  },
  {
    id: 6,
    title: "CyberGuard",
    description: "Siber Güvenlik Sistemleri",
  },
  {
    id: 7,
    title: "RoboTech",
    description: "Endüstriyel Robotik Çözümler",
  },
  {
    id: 8,
    title: "SpaceLab",
    description: "Uzay Teknolojileri Araştırmaları",
  },
  {
    id: 9,
    title: "GreenCity",
    description: "Sürdürülebilir Şehir Projeleri",
  },
  {
    id: 10,
    title: "BioInnovate",
    description: "Biyoteknoloji İnovasyonları",
  },
]

export function ProjectShowcase() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % campaigns.length)
    }, 5000) // Her 5 saniyede bir değişecek
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="rounded-[32px] bg-[#3B6C8F] overflow-hidden w-full">
          <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-white text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight">
                  {campaigns[activeSlide].title}
                </h2>
                <p className="text-white/90 text-xl md:text-2xl">{campaigns[activeSlide].description}</p>
              </div>
              <div className="relative flex justify-end">
                <div className="bg-[#3F84B6] rounded-[24px] p-6 w-full max-w-[500px] aspect-[5/4] flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chatterbug-o0KMxR51QnVBx3bNXflhrIY8SA1vsL.png"
                    alt={campaigns[activeSlide].title}
                    width={350}
                    height={350}
                    className="w-auto h-auto max-w-full max-h-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-8 gap-3">
            {campaigns.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeSlide ? "bg-red-500" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

