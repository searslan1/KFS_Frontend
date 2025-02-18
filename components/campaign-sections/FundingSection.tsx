"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, HelpCircle, Bold, Italic, Underline, List, ListOrdered } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FundingDetails {
  targetAmount: number
  sharePercentage: number
  shareCount: number
  sharePrice: number
  duration: number
  fundingSources: Array<{
    id: string
    source: string
    amount: number
  }>
  additionalInfo: string
  termsAccepted: boolean
}

const FORMAT_BUTTONS = [
  { icon: Bold, label: "Kalın" },
  { icon: Italic, label: "İtalik" },
  { icon: Underline, label: "Altı Çizili" },
  { icon: List, label: "Liste" },
  { icon: ListOrdered, label: "Numaralı Liste" },
]

export function FundingSection() {
  const [fundingDetails, setFundingDetails] = useState<FundingDetails>({
    targetAmount: 0,
    sharePercentage: 0,
    shareCount: 0,
    sharePrice: 0,
    duration: 30,
    fundingSources: [{ id: "1", source: "", amount: 0 }],
    additionalInfo: "",
    termsAccepted: false,
  })

  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)

  const handleAmountChange = (value: number) => {
    setFundingDetails((prev) => ({
      ...prev,
      targetAmount: value,
      sharePrice: value / prev.shareCount || 0,
    }))
  }

  const handleShareCountChange = (value: number) => {
    setFundingDetails((prev) => ({
      ...prev,
      shareCount: value,
      sharePrice: prev.targetAmount / value || 0,
    }))
  }

  const addFundingSource = () => {
    setFundingDetails((prev) => ({
      ...prev,
      fundingSources: [...prev.fundingSources, { id: Math.random().toString(), source: "", amount: 0 }],
    }))
  }

  const removeFundingSource = (id: string) => {
    setFundingDetails((prev) => ({
      ...prev,
      fundingSources: prev.fundingSources.filter((source) => source.id !== id),
    }))
  }

  const updateFundingSource = (id: string, field: "source" | "amount", value: string | number) => {
    setFundingDetails((prev) => ({
      ...prev,
      fundingSources: prev.fundingSources.map((source) => (source.id === id ? { ...source, [field]: value } : source)),
    }))
  }

  return (
    <div className="space-y-8">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Fonlama hedeflerinizi ve kaynaklarınızı detaylı bir şekilde belirtmeniz, yatırımcıların projenizi
          değerlendirmesinde önemli rol oynayacaktır.
        </AlertDescription>
      </Alert>

      {/* Funding Target Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Kampanya Sonrası Oluşan Değerler</Label>
              <p className="text-sm text-gray-500">Hedeflediğiniz fonlama miktarını ve pay dağılımını belirtin</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Hedeflenen Fonlama Tutarı</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Projeniz için toplamayı hedeflediğiniz tutar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={fundingDetails.targetAmount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="text-right"
                placeholder="0.00"
              />
              <div className="text-sm text-gray-500 text-right">TL</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Şirket Değeri</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fonlama sonrası oluşacak şirket değeri</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={fundingDetails.targetAmount * (100 / fundingDetails.sharePercentage) || 0}
                readOnly
                className="text-right bg-gray-50"
              />
              <div className="text-sm text-gray-500 text-right">TL</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pay Oranı</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Yatırımcılara sunulacak toplam pay oranı</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={fundingDetails.sharePercentage}
                onChange={(e) => setFundingDetails((prev) => ({ ...prev, sharePercentage: Number(e.target.value) }))}
                className="text-right"
                max={100}
                min={0}
              />
              <div className="text-sm text-gray-500 text-right">%</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pay Adedi</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Satışa sunulacak toplam pay adedi</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={fundingDetails.shareCount}
                onChange={(e) => handleShareCountChange(Number(e.target.value))}
                className="text-right"
                min={0}
              />
              <div className="text-sm text-gray-500 text-right">Adet</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pay Birim Fiyatı</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Her bir payın satış fiyatı</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input type="number" value={fundingDetails.sharePrice} readOnly className="text-right bg-gray-50" />
              <div className="text-sm text-gray-500 text-right">TL</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Campaign Duration */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Kampanya Süresi</Label>
          <Select
            value={fundingDetails.duration.toString()}
            onValueChange={(value) => setFundingDetails((prev) => ({ ...prev, duration: Number(value) }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kampanya süresini seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 Gün</SelectItem>
              <SelectItem value="45">45 Gün</SelectItem>
              <SelectItem value="60">60 Gün</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Funding Sources */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Ek Finansman Kaynakları</Label>
              <p className="text-sm text-gray-500">Diğer finansman kaynaklarınızı belirtin</p>
            </div>
            <Button variant="outline" onClick={addFundingSource} className="border-dashed border-2">
              Kaynak Ekle
            </Button>
          </div>

          <div className="space-y-4">
            {fundingDetails.fundingSources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
              >
                <div className="space-y-2">
                  <Label>Finansman Kaynağı {index + 1}</Label>
                  <Input
                    value={source.source}
                    onChange={(e) => updateFundingSource(source.id, "source", e.target.value)}
                    placeholder="Örn: Öz sermaye, Banka kredisi, vb."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tutar</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={source.amount}
                      onChange={(e) => updateFundingSource(source.id, "amount", Number(e.target.value))}
                      className="text-right"
                    />
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFundingSource(source.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Additional Information */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            Mevcut ile Fonlama Sonrası Ortaklık Yapısının Karşılaştırılması
          </Label>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 p-2 bg-gray-50 border rounded-lg">
            {FORMAT_BUTTONS.map((button) => (
              <TooltipProvider key={button.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("h-8 w-8 p-0", selectedFormat === button.label && "bg-gray-200")}
                      onClick={() => setSelectedFormat(button.label)}
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

          <Textarea
            value={fundingDetails.additionalInfo}
            onChange={(e) => setFundingDetails((prev) => ({ ...prev, additionalInfo: e.target.value }))}
            placeholder="Mevcut ve fonlama sonrası ortaklık yapısını karşılaştırmalı olarak açıklayın..."
            className="min-h-[200px]"
          />
        </div>
      </Card>

      {/* General Terms */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Genel Gerekçe ve Temel Bilgiler</Label>
          <div className="prose max-w-none text-sm text-gray-600">
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Kitle fonlaması kampanyası yürütülmesine ve pay satışına ilişkin yönetim kurulu kararı alınmıştır.
              </li>
              <li>Şirketin mevcut sermayesi tamamen ödenmiştir.</li>
              <li>Şirket sermayesinin tamamı nama yazılı paylardan oluşmaktadır.</li>
              <li>Şirket payları üzerinde herhangi bir imtiyaz bulunmamaktadır.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

