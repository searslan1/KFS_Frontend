"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/lib/utils/formatters"

interface FinancialItem {
  name: string
  values: number[]
  expandable?: boolean
  subitems?: FinancialItem[]
}

interface FinancialSectionProps {
  title: string
  items: FinancialItem[]
}

export function FinancialSection({ title, items }: FinancialSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const renderItem = (item: FinancialItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.name)

    return (
      <>
        <div
          className={cn(
            "grid grid-cols-3 items-center py-2 hover:bg-gray-50 transition-colors",
            level > 0 && "text-sm",
          )}
          style={{ paddingLeft: `${level * 2 + 1}rem` }}
        >
          <div className="flex items-center gap-2">
            {item.expandable && (
              <button
                onClick={() => toggleItem(item.name)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                {isExpanded ? <Minus className="w-4 h-4 text-gray-600" /> : <Plus className="w-4 h-4 text-gray-600" />}
              </button>
            )}
            <span>{item.name}</span>
          </div>
          {item.values.map((value, index) => (
            <div key={index} className="text-right">
              {formatNumber(value)}
            </div>
          ))}
        </div>
        {isExpanded && item.subitems?.map((subitem) => renderItem(subitem, level + 1))}
      </>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 font-semibold border-b">{title}</div>
      <div className="divide-y">{items.map((item) => renderItem(item))}</div>
    </div>
  )
}

