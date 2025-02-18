"use client"

import { useState } from "react"
import { allCampaigns, type Campaign } from "@/lib/mockData"
import { calculateProgress } from "@/shared/utils/formatters"
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
  ChevronUp,
  ChevronDown,
  Minus,
  Plus,
  TrendingUp,
  TrendingDown,
  Sun,
  Beaker,
  Award,
  Shield,
  CheckCircle,
  Sparkles,
  Leaf,
  Network,
  Globe,
  Globe2,
  Lightbulb,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { AboutSection } from "@/components/campaign-details/AboutSection"
import { DocumentsSection } from "@/components/campaign-details/DocumentsSection"
import { TeamSection } from "@/components/campaign-details/TeamSection"
import { formatNumber } from "@/lib/utils/formatters"
import { FinancialBudgetSection } from "@/components/financial-budget-section"
import { InvestmentBudgetSection } from "@/components/financial-sections/InvestmentBudgetSection"
import { RevenueItemsSection } from "@/components/financial-sections/RevenueItemsSection"
import { SalesTargetsSection } from "@/components/financial-sections/SalesTargetsSection"
import { CashFlowSection } from "@/components/financial-sections/CashFlowSection"
import type React from "react" // Import React
import { MediaGallerySection } from "@/components/media-sections/MediaGallerySection"
import { InvestorsSection } from "@/components/investors/InvestorsSection"
import { UpdatesSection } from "@/components/updates/UpdatesSection"
import TabButton from "@/components/campaign-details/TabButton" // Import TabButton
import { FAQSection } from "@/components/faq/FAQSection"
import { CampaignFormSection } from "@/components/campaign-form/CampaignFormSection"
import { PaymentSection } from "@/components/payment/PaymentSection"

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

// Define interface for SWOT items
interface SWOTItem {
  title: string
  items?: string[]
  color: string
  icon: React.ReactNode
}

export default function CampaignDetailsPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("about")
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeAnalysisSection, setActiveAnalysisSection] = useState("SWOT Analizi")
  const [activeFinancialSection, setActiveFinancialSection] = useState("Özet Bilanço")

  const toggleExpand = () => setIsExpanded(!isExpanded)

  // Kampanya verisini ID'ye göre bul
  const campaign = allCampaigns.find((c) => c.id === params.id)

  // Type guard function to check if campaign exists and has necessary properties
  const isValidCampaign = (campaign: Campaign | undefined): campaign is Campaign => {
    return !!campaign && !!campaign.endDate && !!campaign.goalAmount && !!campaign.currentAmount
  }

  if (!isValidCampaign(campaign)) {
    return <div>Kampanya bulunamadı veya eksik bilgi içeriyor.</div>
  }

  const progress = calculateProgress(campaign.currentAmount, campaign.goalAmount)
  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
  const prevTab = tabs[currentTabIndex - 1]
  const nextTab = tabs[currentTabIndex + 1]

  function SWOTSection({ title, items, color, icon }: SWOTItem) {
    return (
      <div className={`${color} rounded-xl p-6`}>
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <ul className="list-disc list-inside space-y-2">
          {items ? (
            items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">Veri henüz eklenmemiş.</li>
          )}
        </ul>
      </div>
    )
  }

  function FinancialSection({ title, items }: { title: string; items: any[] }) {
    const [expanded, setExpanded] = useState(false)

    return (
      <div className="border border-gray-200 rounded-lg shadow-sm">
        <div
          className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100 rounded-t-lg"
          onClick={() => setExpanded(!expanded)}
        >
          <h3 className="text-lg font-medium">{title}</h3>
          <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
            {expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
        {expanded && (
          <div className="p-4">
            <div className="grid grid-cols-3 bg-gray-100 text-gray-700 p-2 rounded-lg">
              <div>Hesap Kalemleri (TL)</div>
              <div className="text-right">31.12.2023</div>
              <div className="text-right">31.10.2024</div>
            </div>
            {items.map((item) => (
              <div key={item.name} className="border-b border-gray-200 py-2">
                <div className="grid grid-cols-3">
                  <div>{item.name}</div>
                  <div className="text-right">{formatNumber(item.values[0])}</div>
                  <div className="text-right">{formatNumber(item.values[1])}</div>
                </div>
                {item.expandable && item.subitems && (
                  <div className="ml-4">
                    {item.subitems.map((subitem) => (
                      <div key={subitem.name} className="border-b border-gray-200 py-2 ml-4">
                        <div className="grid grid-cols-3">
                          <div>{subitem.name}</div>
                          <div className="text-right">{formatNumber(subitem.values[0])}</div>
                          <div className="text-right">{formatNumber(subitem.values[1])}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-br from-[#4DB05F]/5 to-white">
        {/* Header */}
        <div
          className={`border-b bg-[#f3f4f6] sticky top-[72px] z-40 transition-all duration-300 ${isExpanded ? "pb-4" : "pb-2"}`}
        >
          <div className="container mx-auto p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{campaign.campaign_name}</h1>
              <Button onClick={toggleExpand} variant="ghost" size="sm">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            {isExpanded ? (
              <>
                {/* Navigation Grid */}
                <div className="grid grid-cols-7 gap-2 sm:gap-3">
                  {tabs.slice(0, 7).map((tab) => (
                    <TabButton
                      key={tab.id}
                      tab={tab}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      isCollapsed={!isExpanded}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 sm:gap-3 mt-2">
                  {tabs.slice(7).map((tab) => (
                    <TabButton
                      key={tab.id}
                      tab={tab}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      isCollapsed={!isExpanded}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-2 rounded-full ${activeTab === tab.id ? "bg-[#4DB05F] text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    <tab.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            )}
            {/* Navigation Arrows */}
            <div className="flex justify-center mt-4 gap-2">
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
        </div>

        {/* Content */}
        <div className="container mx-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Tab Content */}
              {activeTab === "about" && <AboutSection campaign={campaign} progress={progress} />}
              {activeTab === "documents" && <DocumentsSection />}
              {activeTab === "team" && <TeamSection />}
              {activeTab === "product" && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Ürün Özellikleri */}
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">Ürünlerin Temel Özellikleri</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Beaker className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Yüksek Teknoloji</h4>
                            <p className="text-gray-600 text-sm">
                              Sıtrett MX, Türkiye Teknoloji Bakanlığı tarafından verilen Teknolojik Ürün Belgesi'ne
                              sahiptir. Bu ürünler çevreye ve insan sağlığına zarar vermeyen formüllerle üretilir.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Geniş Kullanım Alanı</h4>
                            <p className="text-gray-600 text-sm">
                              Market (son kullanıcı), endüstriyel temizlik, otomotiv, kamu ve HORECA
                              (hotel-restoran-kafe) sektörlerine hitap eden zengin bir ürün yelpazesine sahiptir.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Çevre ve Sağlık Duyarlılığı</h4>
                            <p className="text-gray-600 text-sm">
                              Anti-alerjik, toksik içermeyen ve biyolojik olarak parçalanabilir özellikleri sayesinde
                              kullanıcı dostudur.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* İş Modeli */}
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">İş Modeli ve Avantajları</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bggray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-amber-600" />
                          </div>{" "}
                          <div>
                            <h4 className="font-semibold text-gray-900">Devlet Malzeme Ofisi (DMO) Onayı</h4>
                            <p className="text-gray-600 text-sm">
                              Sektörde Türkiye'de DMO Teknolojik Ürünler Kataloğunda yer alan tek marka olması, ihaleye
                              gerek kalmadan doğrudan satış yapma avantajı sağlar.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-rose-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Yüksek Verimlilik ve Ekonomik Çözümler</h4>
                            <p className="text-gray-600 text-sm">
                              Ürünlerin yüksek konsantrasyonu ve yüzey dostu yapısı, kullanıcılara uzun vadeli
                              maliyetlerini düşürür.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proje Vizyonu ve Değerler */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">Proje ve Gelecek Vizyonu</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Ar-Ge ve Yenilikçilik</h4>
                            <p className="text-gray-600 text-sm">
                              SıtrettMX, 7 üniversitenin iş birliğiyle İnovapark Teknoloji Geliştirme Bölgesi'nde
                              faaliyet göstermektedir. Sürekli inovasyon hedefiyle, yeni ürünler geliştirme kapasitesine
                              sahiptir.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                            <Globe className="w-5 h-5 text-cyan-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">İhracat ve Büyüme Potansiyeli</h4>
                            <p className="text-gray-600 text-sm">
                              {" "}
                              Avrupa başta olmak üzere 35'ten fazla ülkeye ihracat yapan marka, ithal ikame avantajıyla
                              Türkiye ekonomisine katkı sağlar.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">Öne Çıkan Değerler</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Sertifikasyon ve Güvenilirlik</h4>
                            <p className="text-gray-600 text-sm">
                              ISO, TÜV, NATO Firma Kodu gibi uluslararası belgeler, ürün kalitesinin ve markanın
                              güvenilirliğinin göstergesidir.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">İnovasyon ve Sürdürülebilirlik</h4>
                            <p className="text-gray-600 text-sm">
                              "En Güzel Boykot Daha iyisini üretmek" ilkesiyle yeni ürünler ve yüksek kaliteye
                              odaklanır.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Marka Özellikleri */}
                  <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Markanın Öne Çıkan Özellikleri</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                          <Leaf className="w-6 h-6 text-teal-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Doğa ve Sağlık Duyarlılığı</h4>
                        <p className="text-gray-600 text-sm">
                          Ürünleri, çevreye ve canlılara zarar vermeyen formüllerle üretilir. Organik içeriklere sahip
                          çözümleriyle dikkat çeker.
                        </p>
                      </div>

                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                          <Network className="w-6 h-6 text-violet-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Network Marketing Gücü</h4>
                        <p className="text-gray-600 text-sm">
                          Şirket, kazanç modeli ile iş ortaklarına sürdürülebilir ve finansal getiri sağlamayı
                          hedeflemektedir.
                        </p>
                      </div>

                      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-fuchsia-100 flex items-center justify-center mb-4">
                          <Globe2 className="w-6 h-6 text-fuchsia-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Uluslararası Vizyon</h4>
                        <p className="text-gray-600 text-sm">
                          Türkiye'de başlayarak dünya çapında operasyonlarını genişletmeyi amaçlamaktadır. Ankara
                          Üniversitesi gibi akademik işbirlikleri dikkat çekmektedir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "market" && (
                <div className="space-y-8">
                  {/* Pazar Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Pazar</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-600">{campaign.market_analysis || "Pazar analizi henüz eklenmemiş."}</p>
                    </div>
                  </div>

                  {/* Rekabet Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Rekabet</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-600">
                        {campaign.competition_analysis || "Rekabet analizi henüz eklenmemiş."}
                      </p>
                    </div>
                  </div>

                  {/* Hedef Kitle Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Hedef Kitle</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-600">
                        {campaign.target_audience || "Hedef kitle analizi henüz eklenmemiş."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "analysis" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">Analizler(SWOT) ve İş Planı</h2>

                  {/* Navigation Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {["SWOT Analizi", "Stratejiler", "İş Planı", "Yatırımcı Sunumu", "Riskler"].map((section) => (
                      <Button
                        key={section}
                        onClick={() => setActiveAnalysisSection(section)}
                        variant={activeAnalysisSection === section ? "default" : "outline"}
                        className="rounded-full"
                      >
                        {section}
                      </Button>
                    ))}
                  </div>

                  {/* Content Area */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    {activeAnalysisSection === "SWOT Analizi" && campaign.swot && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SWOTSection
                          title="Güçlü Yönler"
                          items={campaign.swot.strengths}
                          color="bg-green-100"
                          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                        />
                        <SWOTSection
                          title="Zayıf Yönler"
                          items={campaign.swot.weaknesses}
                          color="bg-red-100"
                          icon={<TrendingDown className="w-6 h-6 text-red-600" />}
                        />
                        <SWOTSection
                          title="Fırsatlar"
                          items={campaign.swot.opportunities}
                          color="bg-blue-100"
                          icon={<Sun className="w-6 h-6 text-blue-600" />}
                        />
                        <SWOTSection
                          title="Tehditler"
                          items={campaign.swot.threats}
                          color="bg-yellow-100"
                          icon={<AlertTriangle className="w-6 h-6 text-yellow-600" />}
                        />
                      </div>
                    )}
                    {activeAnalysisSection === "Stratejiler" && (
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-4">Stratejiler</h3>
                        <p>{campaign.strategies || "Stratejiler henüz eklenmemiş."}</p>
                      </div>
                    )}
                    {activeAnalysisSection === "İş Planı" && (
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-4">İş Planı</h3>
                        <p>{campaign.businessPlan || "İş planı henüz eklenmemiş."}</p>
                      </div>
                    )}
                    {activeAnalysisSection === "Yatırımcı Sunumu" && (
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-4">Yatırımcı Sunumu</h3>
                        <p>{campaign.investorPresentation || "Yatırımcı sunumu henüz eklenmemiş."}</p>
                      </div>
                    )}
                    {activeAnalysisSection === "Riskler" && (
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-4">Riskler</h3>
                        <p>{campaign.risks || "Riskler henüz eklenmemiş."}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === "risks" && <div>Risks Content</div>}
              {activeTab === "financials" && (
                <div className="space-y-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    {/* Financial Sections Navigation */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {[
                        "Özet Bilanço",
                        "İşletme Bütçesi",
                        "Yatırım Bütçesi",
                        "Gelir Kalemleri",
                        "Satış Hedefleri",
                        "Nakit Akım Tablosu",
                      ].map((section) => (
                        <Button
                          key={section}
                          onClick={() => setActiveFinancialSection(section)}
                          variant={activeFinancialSection === section ? "default" : "outline"}
                          className={cn(
                            "rounded-full",
                            activeFinancialSection === section ? "bg-[#4DB05F] text-white" : "",
                          )}
                        >
                          {section}
                        </Button>
                      ))}
                    </div>

                    {/* Financial Content */}
                    <div className="mt-6">
                      {activeFinancialSection === "Özet Bilanço" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 bg-gray-800 text-white p-4 rounded-t-lg">
                            <div>Hesap Kalemleri (TL)</div>
                            <div className="text-right">31.12.2023</div>
                            <div className="text-right">31.10.2024</div>
                          </div>

                          <FinancialSection
                            title="Dönen Varlıklar"
                            items={[
                              {
                                name: "Nakit ve Nakit Benzerleri",
                                values: [7292522, 488969],
                                expandable: true,
                                subitems: [
                                  { name: "Kasa", values: [100000, 150000] },
                                  { name: "Bankalar", values: [7192522, 338969] },
                                ],
                              },
                              {
                                name: "Ticari Alacaklar",
                                values: [7688007, 8882560],
                                expandable: true,
                                subitems: [
                                  { name: "Müşterilerden Alacaklar", values: [7500000, 8700000] },
                                  { name: "Diğer Ticari Alacaklar", values: [188007, 182560] },
                                ],
                              },
                              { name: "Stoklar", values: [3456256, 7159254] },
                            ]}
                          />

                          <FinancialSection
                            title="Duran Varlıklar"
                            items={[
                              { name: "Maddi Duran Varlıklar", values: [5304279, 5106873] },
                              { name: "MaddiOlmayan Duran Varlıklar", values: [297712, 509869] },
                            ]}
                          />

                          <FinancialSection
                            title="Kısa Vadeli Yükümlülükler"
                            items={[
                              {
                                name: "Finansal Borçlar",
                                values: [6990623, 4010062],
                                expandable: true,
                                subitems: [
                                  { name: "Banka Kredileri", values: [500000000, 3000000] },
                                  { name: "Diğer Finansal Borçlar", values: [1990623, 1010062] },
                                ],
                              },
                              { name: "Ticari Borçlar", values: [566047, 1242791] },
                              { name: "Diğer Borçlar", values: [475728, 1548365] },
                            ]}
                          />

                          <FinancialSection
                            title="Özkaynaklar"
                            items={[
                              { name: "Ödenmiş Sermaye", values: [14495073, 14495073] },
                              { name: "Sermaye Yedekleri", values: [201738, 201738] },
                              { name: "Geçmiş Yıllar Karları", values: [318311, 1482781] },
                              { name: "Net Dönem Karı", values: [1164470, 149622] },
                            ]}
                          />

                          <div className="grid grid-cols-3 bg-gray-800 text-white p-4 rounded-lg mt-6">
                            <div>AKTİF TOPLAMI</div>
                            <div className="text-right">{formatNumber(25768063)}</div>
                            <div className="text-right">{formatNumber(24443725)}</div>
                          </div>
                        </div>
                      )}

                      {/* Other financial sections will be implemented similarly */}
                      {activeFinancialSection === "İşletme Bütçesi" && <FinancialBudgetSection />}
                      {activeFinancialSection === "Yatırım Bütçesi" && <InvestmentBudgetSection />}
                      {activeFinancialSection === "Gelir Kalemleri" && <RevenueItemsSection />}
                      {activeFinancialSection === "Satış Hedefleri" && <SalesTargetsSection />}
                      {activeFinancialSection === "Nakit Akım Tablosu" && <CashFlowSection />}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "media" && <MediaGallerySection />}
              {activeTab === "investors" && <InvestorsSection />}
              {activeTab === "updates" && <UpdatesSection />}
              {activeTab === "faq" && <FAQSection />}
              {activeTab === "form" && <CampaignFormSection />}
              {activeTab === "payment" && <PaymentSection />}
              {activeTab !== "about" &&
                activeTab !== "documents" &&
                activeTab !== "team" &&
                activeTab !== "product" &&
                activeTab !== "market" &&
                activeTab !== "analysis" &&
                activeTab !== "risks" &&
                activeTab !== "financials" &&
                activeTab !== "media" &&
                activeTab !== "investors" &&
                activeTab !== "updates" &&
                activeTab !== "faq" &&
                activeTab !== "form" &&
                activeTab !== "payment" && (
                  <div className="flex items-center justify-center h-[400px] text-gray-500">
                    Bu bölümün içeriği yakında eklenecektir.
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

interface TabButtonProps {
  tab: { id: string; label: string; icon: React.ElementType }
  activeTab: string
  setActiveTab: (id: string) => void
  isCollapsed?: boolean
}

function TabButton({ tab, activeTab, setActiveTab, isCollapsed }: TabButtonProps) {
  const Icon = tab.icon
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-200 p-2",
        activeTab === tab.id ? "ring-2 ring-[#4DB05F]" : "",
        isCollapsed ? "p-1" : "p-2",
      )}
      onClick={() => setActiveTab(tab.id)}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "rounded-full",
            activeTab === tab.id ? "bg-[#4DB05F] text-white" : "bg-gray-100 text-gray-600",
            isCollapsed ? "p-1" : "p-1.5 mb-1",
          )}
        >
          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        {!isCollapsed && <h3 className="text-xs font-medium text-center line-clamp-2">{tab.label}</h3>}
      </div>
      {activeTab === tab.id && !isCollapsed && <div className="bg-[#4DB05F] h-0.5 w-full mt-1" />}
    </motion.div>
  )
}

