"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Type, Bold, Italic, Underline, List, ListOrdered, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface RiskSection {
  id: string
  title: string
  content: string
  maxLength: number
  description: string
}

const FORMAT_BUTTONS = [
  { icon: Bold, label: "Kalın" },
  { icon: Italic, label: "İtalik" },
  { icon: Underline, label: "Altı Çizili" },
  { icon: Type, label: "Başlık" },
  { icon: List, label: "Liste" },
  { icon: ListOrdered, label: "Numaralı Liste" },
]

export function RisksSection() {
  const [sections, setSections] = useState<RiskSection[]>([
    {
      id: "project",
      title: "Proje İlişkin Riskler",
      content: "",
      maxLength: 5000,
      description: "Projenin başarısını etkileyebilecek teknik, operasyonel ve finansal riskleri belirtin.",
    },
    {
      id: "sector",
      title: "Sektöre İlişkin Riskler",
      content: "",
      maxLength: 5000,
      description: "Sektördeki rekabet, regülasyon ve pazar koşullarına bağlı riskleri açıklayın.",
    },
    {
      id: "shares",
      title: "Paylara İlişkin Riskler",
      content: "",
      maxLength: 3000,
      description: "Pay sahipliği ve likidite ile ilgili potansiyel riskleri belirtin.",
    },
    {
      id: "other",
      title: "Diğer Riskler",
      content: "",
      maxLength: 3000,
      description: "Yukarıdaki kategorilere girmeyen diğer önemli riskleri açıklayın.",
    },
  ])

  const [activeSection, setActiveSection] = useState<string | null>("project")
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)

  const handleContentChange = (id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === id ? { ...section, content: value.slice(0, section.maxLength) } : section)),
    )
  }

  const applyFormat = (format: string) => {
    setSelectedFormat(format)
    // Format uygulama mantığı burada implement edilecek
  }

  return (
    <div className="space-y-8">
      <Alert className="bg-yellow-50 border-yellow-200">
        <Info className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-700">
          Risk analizi, yatırımcıların projenizi değerlendirmesinde önemli bir rol oynar. Her risk kategorisini detaylı
          bir şekilde açıklayın ve olası etki azaltma stratejilerini belirtin.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card
            key={section.id}
            className={cn(
              "overflow-hidden transition-shadow hover:shadow-md",
              activeSection === section.id && "ring-2 ring-[#4DB05F]",
            )}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-semibold">{section.title}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{section.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden" onClick={() => setActiveSection(section.id)}>
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-1 p-2 bg-gray-50 border-b">
                  {FORMAT_BUTTONS.map((button) => (
                    <TooltipProvider key={button.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn("h-8 w-8 p-0", selectedFormat === button.label && "bg-gray-200")}
                            onClick={() => applyFormat(button.label)}
                          >
                            <button.icon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{button.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                {/* Editor Area */}
                <div className="relative">
                  <textarea
                    value={section.content}
                    onChange={(e) => handleContentChange(section.id, e.target.value)}
                    placeholder="Risk açıklamasını buraya yazın..."
                    className="w-full min-h-[200px] p-4 resize-y bg-white focus:outline-none focus:ring-0 border-0"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {section.content.length} / {section.maxLength}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Risk Matrix Visualization - Optional Enhancement */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Risk Matrisi</Label>
          <p className="text-sm text-gray-500">
            Belirlediğiniz risklerin olasılık ve etki değerlendirmesi için risk matrisi yakında eklenecektir.
          </p>
          <div className="h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
            <p className="text-gray-400">Risk Matrisi Görselleştirmesi</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

