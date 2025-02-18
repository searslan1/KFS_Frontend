"use client"

import { useState } from "react"
import { Search, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RevenueItem {
  id: string
  name: string
  salesPrice: number
  directCost: number
}

const revenueItems: RevenueItem[] = [
  { id: "1", name: "SITRETT MX ECO 500 ml", salesPrice: 69, directCost: 45 },
  { id: "2", name: "SITRETT MX PRO 5 Kg", salesPrice: 489, directCost: 245 },
  { id: "3", name: "SITRETT MX PRO 30 Kg", salesPrice: 1650, directCost: 810 },
  { id: "4", name: "İNOVADİ Güneş Kremi", salesPrice: 758, directCost: 505 },
  { id: "5", name: "İNOVADİ Saç Serumu", salesPrice: 348, directCost: 290 },
  { id: "6", name: "İNOVADİ Cilt Serumu", salesPrice: 299, directCost: 249 },
  { id: "7", name: "İNOVADİ Selülit Kremi", salesPrice: 477, directCost: 397 },
  { id: "8", name: "İNOVADİ Nem Bombası", salesPrice: 299, directCost: 249 },
  { id: "9", name: "İNOVADİ Organik Şampuan", salesPrice: 399, directCost: 332 },
  { id: "10", name: "İNOVADİ Zayıflama Kahvesi", salesPrice: 0, directCost: 0 },
  { id: "11", name: "İNOVADİ Uyku ve Huzur Parfümü", salesPrice: 399, directCost: 332 },
  { id: "12", name: "İNOVADİ Multiforce Enerji İstasyonu", salesPrice: 527, directCost: 439 },
  { id: "13", name: "İNOVADİ Güneş Neydio Gıda Takviyesi", salesPrice: 1249, directCost: 1000 },
  { id: "14", name: "İNOVADİ Güneş Collagendini Gıda Takviyesi", salesPrice: 1249, directCost: 1040 },
  { id: "15", name: "İNOVADİ İmmun Plus Bağışıklık Sistem Destekleyici", salesPrice: 499, directCost: 415 },
]

type SortConfig = {
  key: keyof RevenueItem
  direction: "asc" | "desc"
}

export function RevenueItemsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" })

  const handleSort = (key: keyof RevenueItem) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredAndSortedItems = revenueItems
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6">Gelir Kalemleri</h3>

        {/* Search and Filter Bar */}
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

        {/* Table */}
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
                <th className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    className="hover:bg-gray-200 -ml-4 h-8 font-semibold"
                    onClick={() => handleSort("salesPrice")}
                  >
                    SATIŞ FİYATI
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    className="hover:bg-gray-200 -ml-4 h-8 font-semibold"
                    onClick={() => handleSort("directCost")}
                  >
                    DOĞRUDAN MALİYET
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn("hover:bg-gray-50 transition-colors", index % 2 === 0 ? "bg-white" : "bg-gray-50/50")}
                >
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.salesPrice)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.directCost)}</td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100">
              <tr>
                <td className="px-4 py-3 font-semibold">TOPLAM</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {formatCurrency(filteredAndSortedItems.reduce((sum, item) => sum + item.salesPrice, 0))}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {formatCurrency(filteredAndSortedItems.reduce((sum, item) => sum + item.directCost, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

