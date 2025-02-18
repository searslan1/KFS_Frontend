"use client"

import { useState } from "react"
import { Plus, Minus } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Recharts components with no SSR to avoid hydration issues
const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
)
const Line = dynamic(
  () => import('recharts').then((mod) => mod.Line),
  { ssr: false }
)
const XAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
)
const YAxis = dynamic(
  () => import('recharts').then((mod) => mod.YAxis),
  { ssr: false }
)
const CartesianGrid = dynamic(
  () => import('recharts').then((mod) => mod.CartesianGrid),
  { ssr: false }
)
const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
)
const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
)

import { formatNumber } from "@/lib/utils/formatters"

interface BudgetItem {
  category: string
  years: {
    [key: string]: number
  }
}

const budgetData: BudgetItem[] = [
  {
    category: "PERSONEL GİDERLERİ",
    years: {
      "1.Yıl": 6998000,
      "2.Yıl": 16808000,
      "3.Yıl": 32592000,
      "4.Yıl": 45625000,
      "5.Yıl": 65000000,
    },
  },
  {
    category: "İLETİŞİM/HABERLEŞME GİDERLERİ",
    years: {
      "1.Yıl": 64000,
      "2.Yıl": 200000,
      "3.Yıl": 300000,
      "4.Yıl": 410000,
      "5.Yıl": 610000,
    },
  },
  {
    category: "ENERJİ/SU/DİĞER GİDERLER",
    years: {
      "1.Yıl": 182000,
      "2.Yıl": 575000,
      "3.Yıl": 1150000,
      "4.Yıl": 1975000,
      "5.Yıl": 3500000,
    },
  },
  {
    category: "OFİS GİDERLERİ",
    years: {
      "1.Yıl": 31000,
      "2.Yıl": 63000,
      "3.Yıl": 104000,
      "4.Yıl": 155000,
      "5.Yıl": 206000,
    },
  },
  {
    category: "SEYAHAT GİDERLERİ",
    years: {
      "1.Yıl": 500000,
      "2.Yıl": 2180000,
      "3.Yıl": 4350000,
      "4.Yıl": 6500000,
      "5.Yıl": 7750000,
    },
  },
  {
    category: "TEMSİL GİDERLERİ",
    years: {
      "1.Yıl": 150000,
      "2.Yıl": 200000,
      "3.Yıl": 500000,
      "4.Yıl": 600000,
      "5.Yıl": 1100000,
    },
  },
  {
    category: "KİRA GİDERLERİ",
    years: {
      "1.Yıl": 2600000,
      "2.Yıl": 6500000,
      "3.Yıl": 12850000,
      "4.Yıl": 25450000,
      "5.Yıl": 37050000,
    },
  },
  {
    category: "REKLAM GİDERLERİ",
    years: {
      "1.Yıl": 4162000,
      "2.Yıl": 35575000,
      "3.Yıl": 70835000,
      "4.Yıl": 136115000,
      "5.Yıl": 221800000,
    },
  },
  {
    category: "MÜŞAVİRLİK GİDERLERİ",
    years: {
      "1.Yıl": 275000,
      "2.Yıl": 410000,
      "3.Yıl": 750000,
      "4.Yıl": 900000,
      "5.Yıl": 1100000,
    },
  },
  {
    category: "ÜRETİM",
    years: {
      "1.Yıl": 3550000,
      "2.Yıl": 8075000,
      "3.Yıl": 13100000,
      "4.Yıl": 17750000,
      "5.Yıl": 23500000,
    },
  },
  {
    category: "TEMİZLİK GİDERLERİ",
    years: {
      "1.Yıl": 50000,
      "2.Yıl": 100000,
      "3.Yıl": 150000,
      "4.Yıl": 200000,
      "5.Yıl": 250000,
    },
  },
  {
    category: "ÖNGÖRÜLEMEYEN GİDERLER",
    years: {
      "1.Yıl": 100000,
      "2.Yıl": 2500000,
      "3.Yıl": 3000000,
      "4.Yıl": 5000000,
      "5.Yıl": 10000000,
    },
  },
]

const yearlyTotals = {
  "1.Yıl": 18662000,
  "2.Yıl": 73386000,
  "3.Yıl": 139381000,
  "4.Yıl": 240680000,
  "5.Yıl": 371766000,
}

const chartData = Object.entries(yearlyTotals).map(([year, total]) => ({
  year,
  total,
}))

export function FinancialBudgetSection() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (category: string) => {
    setExpandedItems((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">5 Yıllık İşletme Bütçesi Detayları</h3>

          {/* Table Header */}
          <div className="grid grid-cols-6 bg-gray-100 p-3 rounded-lg mb-2 font-medium text-sm">
            <div className="col-span-1">Yıllar</div>
            <div className="col-span-1 text-right">1.Yıl</div>
            <div className="col-span-1 text-right">2.Yıl</div>
            <div className="col-span-1 text-right">3.Yıl</div>
            <div className="col-span-1 text-right">4.Yıl</div>
            <div className="col-span-1 text-right">5.Yıl</div>
          </div>

          {/* Table Body */}
          <div className="space-y-1">
            {budgetData.map((item) => (
              <div key={item.category} className="hover:bg-gray-50 transition-colors rounded-lg overflow-hidden">
                <div className="grid grid-cols-6 p-3 cursor-pointer" onClick={() => toggleItem(item.category)}>
                  <div className="col-span-1 flex items-center gap-2">
                    {expandedItems.includes(item.category) ? (
                      <Minus className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Plus className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="font-medium text-sm">{item.category}</span>
                  </div>
                  {Object.values(item.years).map((value, index) => (
                    <div key={index} className="col-span-1 text-right text-sm">
                      ₺ {formatNumber(value)}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Totals Row */}
            <div className="grid grid-cols-6 p-3 bg-gray-800 text-white rounded-lg mt-4">
              <div className="col-span-1 font-medium">TOPLAM</div>
              {Object.values(yearlyTotals).map((total, index) => (
                <div key={index} className="col-span-1 text-right font-medium">
                  ₺ {formatNumber(total)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6">İşletme Giderleri 5 Yıllık Grafik</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `₺ ${formatNumber(value)}`}
                labelStyle={{ color: "black" }}
                contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4DB05F"
                strokeWidth={2}
                dot={{ fill: "#4DB05F", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

