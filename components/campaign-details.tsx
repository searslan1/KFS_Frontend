"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { Campaign } from "@/lib/mockData"
import { formatCurrency, calculateProgress, formatDate } from "@/shared/utils/formatters"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  FileText,
  Users,
  Factory,
  Target,
  LineChart,
  AlertTriangle,
  Table2,
  ImageIcon,
  Users2,
  RefreshCw,
  HelpCircle,
  FileSpreadsheet,
  Wallet,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CampaignDetailsProps {
  campaign: Campaign
  open: boolean
  onOpenChange: (open: boolean) => void
}

const tabs = [
  { id: "about", label: "Kampanya Hakkında", icon: CreditCard },
  { id: "documents", label: "Belge, Ödül ve Hukuki Durum", icon: FileText },
  { id: "team", label: "Takım", icon: Users },
  { id: "product", label: "Ürün ve Üretim", icon: Factory },
  { id: "market", label: "Pazar/Rekabet/Hedef Kitle", icon: Target },
  { id: "analysis", label: "Analizler(SWOT) ve İş Planı", icon: LineChart },
  { id: "risks", label: "Riskler", icon: AlertTriangle },
  { id: "financials", label: "Finansal Tablolar", icon: Table2 },
  { id: "media", label: "Görseller ve Videolar", icon: ImageIcon },
  { id: "investors", label: "Yatırımcılar", icon: Users2 },
  { id: "updates", label: "Güncellemeler", icon: RefreshCw },
  { id: "faq", label: "Soru ve Cevaplar", icon: HelpCircle },
  { id: "form", label: "Kampanya Bilgi Formu", icon: FileSpreadsheet },
  { id: "payment", label: "Pay Satış Ekranı", icon: Wallet },
]

export function CampaignDetails({ campaign, open, onOpenChange }: CampaignDetailsProps) {
  const [activeTab, setActiveTab] = useState("about")
  const progress = calculateProgress(campaign.currentAmount, campaign.goalAmount)

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
  const prevTab = tabs[currentTabIndex - 1]
  const nextTab = tabs[currentTabIndex + 1]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
        <div className="flex flex-col h-full bg-gradient-to-br from-[#4DB05F]/5 to-white">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{campaign.campaign_name}</h1>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {formatCurrency(campaign.currentAmount)} / {formatCurrency(campaign.goalAmount)}
                  </div>
                  <Progress value={progress} className="w-full sm:w-48 h-2" />
                </div>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {tabs.slice(0, 7).map((tab) => (
                  <TabButton key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 sm:gap-3 mt-2">
                {tabs.slice(7).map((tab) => (
                  <TabButton key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </h2>
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setActiveTab(prevTab?.id || tabs[tabs.length - 1].id)}
                              disabled={!prevTab}
                              className="w-10 h-10 rounded-full border-2 border-[#4DB05F] hover:bg-[#4DB05F] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current flex items-center justify-center"
                            >
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Önceki Bölüm</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setActiveTab(nextTab?.id || tabs[0].id)}
                              disabled={!nextTab}
                              className="w-10 h-10 rounded-full border-2 border-[#4DB05F] hover:bg-[#4DB05F] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current flex items-center justify-center"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sonraki Bölüm</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "about" ? (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Proje Hakkında</h3>
                        <p className="text-gray-600 leading-relaxed">{campaign.about_project}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Proje Özeti</h3>
                        <p className="text-gray-600 leading-relaxed">{campaign.campaign_summary}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Hedef Kapsam</h3>
                        <p className="text-gray-600 leading-relaxed">{campaign.goal_coverage_subject}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Girişimci</h3>
                          <div className="space-y-2 text-gray-600">
                            <p>{campaign.entrepreneur_name}</p>
                            <p>İletişim: {campaign.entrepreneurs_mails}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2">Kampanya Durumu</h3>
                          <div className="space-y-2 text-gray-600">
                            <p>Durum: {campaign.campaign_status}</p>
                            <p>Oluşturulma: {formatDate(campaign.created_at)}</p>
                            <p>Son Güncelleme: {formatDate(campaign.updated_at)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px] text-gray-500">
                      Bu bölümün içeriği yakında eklenecektir.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface TabButtonProps {
  tab: { id: string; label: string; icon: React.ElementType }
  activeTab: string
  setActiveTab: (id: string) => void
}

function TabButton({ tab, activeTab, setActiveTab }: TabButtonProps) {
  const Icon = tab.icon
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-200 p-2",
        activeTab === tab.id ? "ring-2 ring-[#4DB05F]" : "",
      )}
      onClick={() => setActiveTab(tab.id)}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "p-1.5 rounded-full mb-1",
            activeTab === tab.id ? "bg-[#4DB05F] text-white" : "bg-gray-100 text-gray-600",
          )}
        >
          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        <h3 className="text-xs font-medium text-center line-clamp-2">{tab.label}</h3>
      </div>
      {activeTab === tab.id && <div className="bg-[#4DB05F] h-0.5 w-full mt-1" />}
    </motion.div>
  )
}

