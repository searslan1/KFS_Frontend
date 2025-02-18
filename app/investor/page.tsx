"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Wallet, HelpCircle, UserPlus, TrendingUp, RefreshCcw, Users } from "lucide-react"
import React from "react" // Import React

const menuItems = [
  {
    id: "help",
    title: "YARDIM MERKEZİ",
    icon: HelpCircle,
    description: "Sorularınız için destek alın",
  },
  {
    id: "become-investor",
    title: "NASIL YATIRIMCI OLURUM?",
    icon: UserPlus,
    description: "Yatırımcı olma sürecini öğrenin",
  },
  {
    id: "how-to-earn",
    title: "NASIL KAZANÇ SAĞLARIM?",
    icon: TrendingUp,
    description: "Kazanç modelleri hakkında bilgi alın",
  },
  {
    id: "secondary",
    title: "FLIP - İKİNCİL İŞLEMLER",
    icon: RefreshCcw,
    description: "İkincil piyasa işlemlerini keşfedin",
  },
  {
    id: "lic",
    title: "LIC (LEAD INVESTOR CLUB)",
    icon: Users,
    description: "Lider yatırımcı kulübüne katılın",
  },
]

export default function InvestorPage() {
  const [activeSection, setActiveSection] = useState("invest")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Top Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-[100px] flex flex-col items-center justify-center gap-2 p-4",
                      activeSection === item.id ? "bg-[#4DB05F] text-white hover:bg-[#4DB05F]/90" : "hover:bg-gray-100",
                    )}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-semibold text-center">{item.title}</span>
                  </Button>
                </motion.div>
              )
            })}
          </div>

          {/* Content Area */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              {menuItems.find((item) => item.id === activeSection)?.icon && (
                <div
                  className={cn(
                    "p-3 rounded-full",
                    activeSection === menuItems.find((item) => item.id === activeSection)?.id
                      ? "bg-[#4DB05F] text-white"
                      : "bg-gray-100",
                  )}
                >
                  {React.createElement(menuItems.find((item) => item.id === activeSection)?.icon as React.ElementType, {
                    className: "h-6 w-6",
                  })}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">{menuItems.find((item) => item.id === activeSection)?.title}</h2>
                <p className="text-sm text-gray-500">
                  {menuItems.find((item) => item.id === activeSection)?.description}
                </p>
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-500">Bu bölümün içeriği yakında eklenecektir.</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

