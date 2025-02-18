"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface YearlyData {
  [key: string]: number
}

export function FinancialsSection() {
  const [activeTab, setActiveTab] = useState("profit-forecast")
  const [yearlyData, setYearlyData] = useState<YearlyData>({
    "1.YIL": 0,
    "2.YIL": 0,
    "3.YIL": 0,
    "4.YIL": 0,
    "5.YIL": 0,
  })

  const handleDataChange = (year: string, value: number) => {
    setYearlyData((prev) => ({
      ...prev,
      [year]: value,
    }))
  }

  return (
    <div className="space-y-8">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Finansal tablolar, yatırımcıların projenizi değerlendirmesinde önemli rol oynar. Her bölümü detaylı ve doğru
          bir şekilde doldurunuz.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="profit-forecast">Kar Tahmin ve Beklentileri</TabsTrigger>
          <TabsTrigger value="project-budget">Proje Bütçesi</TabsTrigger>
          <TabsTrigger value="investment-budget">Yatırım Bütçesi</TabsTrigger>
          <TabsTrigger value="revenue-items">Gelir Kalemleri</TabsTrigger>
          <TabsTrigger value="sales-targets">Satış Hedefleri</TabsTrigger>
          <TabsTrigger value="cash-flow">Nakit Akım Tablosu</TabsTrigger>
          <TabsTrigger value="funding-sources">Fon Kaynakları</TabsTrigger>
        </TabsList>

        <TabsContent value="profit-forecast" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg font-semibold">Yatırım Gereksinimleri</Label>
                  <p className="text-sm text-gray-500">Yıllara göre yatırım ihtiyaçlarınızı belirtiniz</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-5 w-5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Kampanyada elde edilecek fon haricinde ihtiyaç duyduğunuz yatırımları giriniz</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid grid-cols-6 gap-4">
                <div className="font-medium">Yatırım Gereksinimleri</div>
                {Object.keys(yearlyData).map((year) => (
                  <div key={year} className="space-y-2">
                    <Label>{year}</Label>
                    <Input
                      type="number"
                      value={yearlyData[year]}
                      onChange={(e) => handleDataChange(year, Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                Kampanyada elde edilecek fon haricinde ihtiyaç duyduğunuz yatırımların girilmesi gerekmektedir.
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg font-semibold">Gelir Tablosu</Label>
                  <p className="text-sm text-gray-500">Yıllara göre gelir tahminlerinizi belirtiniz</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Kalem</th>
                      {Object.keys(yearlyData).map((year) => (
                        <th key={year} className="text-right py-2">
                          {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2">Net Satışlar</td>
                      {Object.keys(yearlyData).map((year) => (
                        <td key={year} className="text-right py-2">
                          <Input type="number" className="text-right w-32" value={0} onChange={() => {}} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2">Satışların Maliyeti (-)</td>
                      {Object.keys(yearlyData).map((year) => (
                        <td key={year} className="text-right py-2">
                          <Input type="number" className="text-right w-32" value={0} onChange={() => {}} />
                        </td>
                      ))}
                    </tr>
                    <tr className="font-medium">
                      <td className="py-2">BRÜT KAR</td>
                      {Object.keys(yearlyData).map((year) => (
                        <td key={year} className="text-right py-2">
                          0
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="project-budget" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg font-semibold">Proje Bütçesi</Label>
                  <p className="text-sm text-gray-500">Projenin yıllık bütçe planlamasını belirtiniz</p>
                </div>
              </div>

              {/* Project Budget content will be implemented here */}
              <div className="text-center text-gray-500 py-8">Bu bölüm yakında eklenecektir.</div>
            </div>
          </Card>
        </TabsContent>

        {/* Other tab contents will follow the same pattern */}
        <TabsContent value="investment-budget" className="space-y-6">
          <Card className="p-6">
            <div className="text-center text-gray-500 py-8">Bu bölüm yakında eklenecektir.</div>
          </Card>
        </TabsContent>

        <TabsContent value="revenue-items" className="space-y-6">
          <Card className="p-6">
            <div className="text-center text-gray-500 py-8">Bu bölüm yakında eklenecektir.</div>
          </Card>
        </TabsContent>

        <TabsContent value="sales-targets" className="space-y-6">
          <Card className="p-6">
            <div className="text-center text-gray-500 py-8">Bu bölüm yakında eklenecektir.</div>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow" className="space-y-6">
          <Card className="p-6">
            <div className="text-center text-gray-500 py-8">Bu bölüm yakında eklenecektir.</div>
          </Card>
        </TabsContent>

        <TabsContent value="funding-sources" className="space-y-6">
          <Card className="p-6">
            <div className="text-center text-gray-500 py-8">Bu bölüm yakında eklenecektir.</div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

