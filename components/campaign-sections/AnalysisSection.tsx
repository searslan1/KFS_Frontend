"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnalysisItem {
  id: string
  content: string
}

interface AnalysisSection {
  id: string
  title: string
  items: AnalysisItem[]
  isExpanded: boolean
}

export function AnalysisSection() {
  const [sections, setSections] = useState<AnalysisSection[]>([
    {
      id: "strengths",
      title: "Ürünün/Projenin Güçlü Yönleri Nelerdir?",
      items: [{ id: "1", content: "" }],
      isExpanded: true,
    },
    {
      id: "weaknesses",
      title: "Ürünün/Projenin Zayıf Yönleri Nelerdir?",
      items: [{ id: "1", content: "" }],
      isExpanded: false,
    },
    {
      id: "opportunities",
      title: "Ürünün/Projenin Ortaya Çıkabildiği Fırsatlar Nelerdir?",
      items: [{ id: "1", content: "" }],
      isExpanded: false,
    },
    {
      id: "threats",
      title: "Ürünün/Projenin Gelişektirmesinde Olası Tehditler Nelerdir?",
      items: [{ id: "1", content: "" }],
      isExpanded: false,
    },
    {
      id: "strategies",
      title: "Zayıf Yönleri Nasıl Güçlendireceksiniz?",
      items: [{ id: "1", content: "" }],
      isExpanded: false,
    },
    {
      id: "improvements",
      title: "Tehditleri Nasıl Ortadan Kaldıracaksınız?",
      items: [{ id: "1", content: "" }],
      isExpanded: false,
    },
  ])

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section)),
    )
  }

  const addItem = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: [...section.items, { id: Math.random().toString(), content: "" }],
            }
          : section,
      ),
    )
  }

  const removeItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter((item) => item.id !== itemId),
            }
          : section,
      ),
    )
  }

  const updateItem = (sectionId: string, itemId: string, content: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? { ...item, content } : item)),
            }
          : section,
      ),
    )
  }

  return (
    <div className="space-y-8">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          SWOT analizi, projenizin güçlü ve zayıf yönlerini, fırsatları ve tehditleri değerlendirmenize yardımcı olur.
          Lütfen her bölümü detaylı bir şekilde doldurun.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <div
              className={cn(
                "p-6 cursor-pointer transition-colors",
                section.isExpanded ? "bg-[#4DB05F]/5" : "hover:bg-gray-50",
              )}
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold cursor-pointer">{section.title}</Label>
                {section.isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            <AnimatePresence>
              {section.isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6 pt-2 space-y-4">
                    {section.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <Textarea
                          value={item.content}
                          onChange={(e) => updateItem(section.id, item.id, e.target.value)}
                          placeholder="Açıklama yazın..."
                          className="min-h-[100px] pr-10"
                        />
                        {section.items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(section.id, item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                    <Button variant="outline" className="w-full mt-2 border-dashed" onClick={() => addItem(section.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Madde Ekle
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </div>
  )
}

