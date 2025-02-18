import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface BudgetItem {
  id: string
  name: string
  values: number[]
  subItems?: BudgetItem[]
}

const budgetData: BudgetItem[] = [
  {
    id: "1",
    name: "Yatırım Harcamaları",
    values: [0, 0, 0, 0, 0],
    subItems: [
      {
        id: "1.1",
        name: "Arazi Yatırımı",
        values: [0, 0, 0, 0, 0],
      },
      {
        id: "1.2",
        name: "Bina-İnşaat",
        values: [0, 0, 0, 0, 0],
      },
      {
        id: "1.3",
        name: "Makine-Teçhizat",
        values: [1000000, 500000, 250000, 100000, 50000],
      },
      {
        id: "1.4",
        name: "Taşıt Araçları",
        values: [0, 0, 0, 0, 0],
      },
      {
        id: "1.5",
        name: "Demirbaşlar",
        values: [100000, 50000, 25000, 10000, 5000],
      },
    ],
  },
  {
    id: "2",
    name: "Başlangıç İşletme Sermayesi İhtiyacı",
    values: [1000000, 500000, 250000, 100000, 50000],
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
}

const BudgetRow: React.FC<{ item: BudgetItem; level?: number }> = ({ item, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasSubItems = item.subItems && item.subItems.length > 0

  return (
    <>
      <motion.div
        className={cn("grid grid-cols-6 items-center py-2 hover:bg-gray-50 cursor-pointer", level > 0 && "text-sm")}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={() => hasSubItems && setIsExpanded(!isExpanded)}
      >
        <div className="col-span-2 flex items-center gap-2">
          {hasSubItems && (
            <span className="text-gray-400">{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
          )}
          <span className={cn(level === 0 && "font-semibold")}>{item.name}</span>
        </div>
        {item.values.map((value, index) => (
          <div key={index} className="text-right">
            {formatCurrency(value)}
          </div>
        ))}
      </motion.div>
      <AnimatePresence>
        {isExpanded && item.subItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {item.subItems.map((subItem) => (
              <BudgetRow key={subItem.id} item={subItem} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const InvestmentBudgetSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Yatırım Bütçesi</h3>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-b border-gray-200 rounded-lg">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-50">
                  <div className="grid grid-cols-6 gap-2 py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-2">Yatırım Kalemleri</div>
                    <div className="text-right">1. Yıl</div>
                    <div className="text-right">2. Yıl</div>
                    <div className="text-right">3. Yıl</div>
                    <div className="text-right">4. Yıl</div>
                    <div className="text-right">5. Yıl</div>
                  </div>
                </div>
                <div className="bg-white divide-y divide-gray-200">
                  {budgetData.map((item) => (
                    <BudgetRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

