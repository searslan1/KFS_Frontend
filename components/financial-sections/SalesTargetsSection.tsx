"use client"

import { useState } from "react"
import { Search, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface SalesTarget {
  id: string
  name: string
  years: {
    [key: string]: {
      quantity: number
      revenue: number
      cost: number
    }
  }
}

const salesTargets: SalesTarget[] = [
  {
    id: "1",
    name: "SITRETT MX ECO 500 ml",
    years: {
      "1.YIL": { quantity: 1139130, revenue: 78599970, cost: 51260850 },
      "2.YIL": { quantity: 4927500, revenue: 339097500, cost: 221737500 },
      "3.YIL": { quantity: 9855000, revenue: 679995000, cost: 443475000 },
      "4.YIL": { quantity: 14782500, revenue: 1019992500, cost: 665212500 },
      "5.YIL": { quantity: 19700000, revenue: 1359300000, cost: 886500000 },
    },
  },
  {
    id: "2",
    name: "SITRETT MX PRO 5 Kg",
    years: {
      "1.YIL": { quantity: 5500, revenue: 2689500, cost: 1347500 },
      "2.YIL": { quantity: 8250, revenue: 4034250, cost: 2021250 },
      "3.YIL": { quantity: 12375, revenue: 6051375, cost: 3031875 },
      "4.YIL": { quantity: 18562, revenue: 9076818, cost: 4547813 },
      "5.YIL": { quantity: 27843, revenue: 13615227, cost: 6821719 },
    },
  },
  {
    id: "3",
    name: "SITRETT MX PRO 30 Kg",
    years: {
      "1.YIL": { quantity: 750, revenue: 1204500, cost: 607500 },
      "2.YIL": { quantity: 1125, revenue: 1806750, cost: 911250 },
      "3.YIL": { quantity: 1687, revenue: 2700322, cost: 1366875 },
      "4.YIL": { quantity: 2531, revenue: 4064785, cost: 2050313 },
      "5.YIL": { quantity: 3796, revenue: 6096376, cost: 3075469 },
    },
  },
  // Add more products with their targets...
]

type SortConfig = {
  key: string
  direction: "asc" | "desc"
}

export function SalesTargetsSection() {
  const [activeTab, setActiveTab] = useState("quantity")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" })

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const formatNumber = (value: number, type: "quantity" | "currency") => {
    if (type === "quantity") {
      return new Intl.NumberFormat("tr-TR").format(value)
    }
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const filteredAndSortedItems = salesTargets
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      // Sort by year values
      const [year, field] = sortConfig.key.split("-")
      const aValue = a.years[year][field as keyof (typeof a.years)[typeof year]]
      const bValue = b.years[year][field as keyof (typeof b.years)[typeof year]]
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
    })

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6">Satış Hedefleri</h3>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Ürün/Hizmet Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="quantity" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="quantity">Adet</TabsTrigger>
            <TabsTrigger value="revenue">Ciro</TabsTrigger>
            <TabsTrigger value="cost">Doğrudan Maliyet</TabsTrigger>
          </TabsList>

          {/* Table Content */}
          <TabsContent value={activeTab} className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left">
                      <Button
                        variant="ghost"
                        className="hover:bg-gray-200 -ml-4 h-8 font-semibold"
                        onClick={() => handleSort("name")}
                      >
                        ÜRÜN/HİZMET ADI
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    {["1.YIL", "2.YIL", "3.YIL", "4.YIL", "5.YIL"].map((year) => (
                      <th key={year} className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          className="hover:bg-gray-200 -ml-4 h-8 font-semibold"
                          onClick={() => handleSort(`${year}-${activeTab}`)}
                        >
                          {year}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedItems.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "hover:bg-gray-50 transition-colors",
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                      )}
                    >
                      <td className="px-4 py-3">{item.name}</td>
                      {Object.entries(item.years).map(([year, values]) => (
                        <td key={year} className="px-4 py-3 text-right font-medium">
                          {formatNumber(
                            values[activeTab as keyof typeof values],
                            activeTab === "quantity" ? "quantity" : "currency",
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-semibold">TOPLAM</td>
                    {["1.YIL", "2.YIL", "3.YIL", "4.YIL", "5.YIL"].map((year) => (
                      <td key={year} className="px-4 py-3 text-right font-semibold">
                        {formatNumber(
                          filteredAndSortedItems.reduce(
                            (sum, item) => sum + item.years[year][activeTab as keyof (typeof item.years)[typeof year]],
                            0,
                          ),
                          activeTab === "quantity" ? "quantity" : "currency",
                        )}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

