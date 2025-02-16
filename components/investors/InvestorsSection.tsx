"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/shared/utils/formatters"
import { motion } from "framer-motion"
import { User } from "lucide-react"

interface Investor {
  id: string
  name: string
  avatarUrl?: string
  amount: number
  date: string
  isVerified?: boolean
}

const mockInvestors: Investor[] = [
  {
    id: "1",
    name: "Orhan Mutlu Topal",
    avatarUrl: "/placeholder.svg",
    amount: 400000,
    date: "2024-12-27T08:36:00",
    isVerified: true,
  },
  {
    id: "2",
    name: "İsmail Ertem",
    avatarUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M7nMOpwJstRMSJlp7U6ZCCdXXalqRK.png",
    amount: 200000,
    date: "2023-01-02T15:50:00",
  },
  {
    id: "3",
    name: "T**** G****",
    amount: 300000,
    date: "2025-01-09T21:30:00",
  },
  {
    id: "4",
    name: "M**** P****",
    amount: 250000,
    date: "2024-12-26T11:55:00",
  },
  {
    id: "5",
    name: "Y**** Y****",
    amount: 250000,
    date: "2024-12-31T12:34:00",
  },
  {
    id: "6",
    name: "M**** K****",
    amount: 210000,
    date: "2024-12-26T10:06:00",
  },
  {
    id: "7",
    name: "İsmail Ertem",
    avatarUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Du3iDwbNhrz54oB8ODX2iWxTfHtvxU.png",
    amount: 200000,
    date: "2023-01-03T08:31:00",
  },
  {
    id: "8",
    name: "Y**** Y****",
    amount: 183000,
    date: "2023-01-07T11:12:00",
  },
  {
    id: "9",
    name: "H**** A****",
    amount: 110000,
    date: "2023-01-03T16:52:00",
  },
  {
    id: "10",
    name: "Ü**** Y****",
    amount: 105000,
    date: "2023-01-13T15:41:00",
  },
  {
    id: "11",
    name: "İsmail Ertem",
    avatarUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QAgtdSGbP4NMFXUd1WZplQojV2C8c5.png",
    amount: 101000,
    date: "2023-01-06T08:30:00",
  },
  {
    id: "12",
    name: "F**** Ç****",
    amount: 100000,
    date: "2023-01-07T15:43:00",
  },
]

export function InvestorsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Yatırımcılar</h2>
        <div className="text-sm text-gray-500">Toplam Yatırımcı: {mockInvestors.length}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockInvestors.map((investor) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setHoveredCard(investor.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card
              className={`
                relative overflow-hidden cursor-pointer transition-all duration-300
                hover:shadow-lg hover:border-[#4DB05F]/50
                ${hoveredCard === investor.id ? "scale-[1.02]" : "scale-100"}
              `}
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-[#4DB05F]/20">
                    {investor.avatarUrl ? (
                      <AvatarImage src={investor.avatarUrl} alt={investor.name} />
                    ) : (
                      <AvatarFallback className="bg-[#4DB05F]/10">
                        <User className="h-5 w-5 text-[#4DB05F]" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{investor.name}</p>
                    <p className="text-xs text-gray-500">{formatDateTime(investor.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#4DB05F]">{formatCurrency(investor.amount)}</p>
                  </div>
                </div>
              </div>
              {/* Accent line with animation */}
              <div
                className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F]
                  transform origin-left transition-transform duration-300
                  ${hoveredCard === investor.id ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

