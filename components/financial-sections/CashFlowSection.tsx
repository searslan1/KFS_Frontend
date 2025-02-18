"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface CashFlowItem {
  id: string
  name: string
  values: number[]
  isTotal?: boolean
  isSubItem?: boolean
}

const cashFlowData: CashFlowItem[] = [
  { id: "sales", name: "SATIŞ GELİRLERİ", values: [82493970, 345838500, 688755697, 1033134104, 1679211603] },
  { id: "equity", name: "ÖZ SERMAYE", values: [13302503, 0, 0, 0, 0] },
  { id: "funding", name: "FONLAMA GELİRİ", values: [25000000, 0, 0, 0, 0] },
  {
    id: "total-income",
    name: "TOPLAM GİRİŞLER",
    values: [120796473, 345838500, 688755697, 1033134104, 1679211603],
    isTotal: true,
  },
  { id: "operating", name: "YILLIK İŞLETME GİDERLERİ", values: [18662000, 73386000, 139381000, 240680000, 371766000] },
  { id: "investments", name: "YATIRIMLAR", values: [500000, 10000000, 15000000, 20000000, 50000000] },
  {
    id: "cogs",
    name: "DOĞRUDAN SATIŞ MALİYETLERİ",
    values: [53215850, 224670000, 447873345, 671810300, 1138046295],
  },
  {
    id: "total-expenses",
    name: "TOPLAM ÇIKIŞLAR",
    values: [72377850, 308056000, 602254345, 932490300, 1559812295],
    isTotal: true,
  },
]

const summaryData: CashFlowItem[] = [
  { id: "total-cash", name: "TOPLAM NAKİT VARLIK", values: [0, 48418625, 86201123, 172702475, 273346279] },
  {
    id: "total-income-sum",
    name: "TOPLAM GİRİŞLER",
    values: [120796473, 345838500, 688755697, 1033134104, 1679211603],
  },
  {
    id: "total-expenses-sum",
    name: "TOPLAM ÇIKIŞLAR",
    values: [72377850, 308056000, 602254345, 932490300, 1559812295],
  },
  {
    id: "cumulative",
    name: "KÜMÜLATİF N.V. DEVİR",
    values: [48418623, 86201123, 172702475, 273346279, 392745587],
  },
]

const chartData = [
  { year: "1.YIL", income: 120796473, expenses: 72377850 },
  { year: "2.YIL", income: 345838500, expenses: 308056000 },
  { year: "3.YIL", income: 688755697, expenses: 602254345 },
  { year: "4.YIL", income: 1033134104, expenses: 932490300 },
  { year: "5.YIL", income: 1679211603, expenses: 1559812295 },
]

export function CashFlowSection() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["income", "expenses", "summary"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const Section = ({ title, items, id }: { title: string; items: CashFlowItem[]; id: string }) => {
    const isExpanded = expandedSections.includes(id)

    return (
      <div className="border rounded-lg overflow-hidden bg-white mb-4">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm">
                        <th className="text-left font-medium p-2 bg-gray-50">Kalem</th>
                        <th className="text-right font-medium p-2 bg-gray-50">1.YIL</th>
                        <th className="text-right font-medium p-2 bg-gray-50">2.YIL</th>
                        <th className="text-right font-medium p-2 bg-gray-50">3.YIL</th>
                        <th className="text-right font-medium p-2 bg-gray-50">4.YIL</th>
                        <th className="text-right font-medium p-2 bg-gray-50">5.YIL</th>
                        <th className="text-right font-medium p-2 bg-gray-50">TOPLAM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className={cn(
                            "border-t hover:bg-gray-50 transition-colors",
                            item.isTotal && "font-semibold bg-gray-50",
                            item.isSubItem && "text-sm",
                          )}
                        >
                          <td className="p-2">{item.name}</td>
                          {item.values.map((value, index) => (
                            <td key={index} className="text-right p-2">
                              {formatCurrency(value)}
                            </td>
                          ))}
                          <td className="text-right p-2 font-medium">
                            {formatCurrency(item.values.reduce((a, b) => a + b, 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Section title="Gelirler" items={cashFlowData.slice(0, 4)} id="income" />
      <Section title="Giderler" items={cashFlowData.slice(4, 8)} id="expenses" />
      <Section title="Özet" items={summaryData} id="summary" />

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Kümülatif Nakit Akışı</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `₺${(value / 1000000).toFixed(0)}M`}
                label={{ value: "Milyon TL", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: "black" }}
                contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                name="Kümülatif Girişler"
                stroke="#4DB05F"
                strokeWidth={2}
                dot={{ fill: "#4DB05F" }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Kümülatif Çıkışlar"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: "#EF4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

