"use client";

import { useState } from "react";
import { allCampaigns, type Campaign } from "@/lib/mockData";
import { calculateProgress } from "@/shared/utils/formatters";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { AboutSection } from "@/components/campaign-details/AboutSection";
import { DocumentsSection } from "@/components/campaign-details/DocumentsSection";
import { TeamSection } from "@/components/campaign-details/TeamSection";
import { formatNumber } from "@/lib/utils/formatters";
import { FinancialBudgetSection } from "@/components/financial-budget-section";
import { InvestmentBudgetSection } from "@/components/financial-sections/InvestmentBudgetSection";
import { RevenueItemsSection } from "@/components/financial-sections/RevenueItemsSection";
import { SalesTargetsSection } from "@/components/financial-sections/SalesTargetsSection";
import { CashFlowSection } from "@/components/financial-sections/CashFlowSection";
import { MediaGallerySection } from "@/components/campaign-details/MediaGallerySection";
import { InvestorsSection } from "@/components/campaign-details/InvestorsSection";
import { UpdatesSection } from "@/components/campaign-details/UpdatesSection";
import { FAQSection } from "@/components/campaign-details/FAQSection";
import { CampaignFormSection } from "@/components/campaign-details/CampaignFormSection";
import { PaymentSection } from "@/components/campaign-details/PaymentSection";
import { ProductSection } from "@/components/campaign-details/ProductSection";
import { MarketSection } from "@/components/campaign-details/MarketSection";
import { AnalysisSection } from "@/components/campaign-details/AnalysisSection";
import { FinancialSection } from "@/components/campaign-details/FinancialSection";

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
];

export default function CampaignDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeAnalysisSection, setActiveAnalysisSection] =
    useState("SWOT Analizi");
  const [activeFinancialSection, setActiveFinancialSection] =
    useState("Özet Bilanço");

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Kampanya verisini ID'ye göre bul
  const campaign = allCampaigns.find((c) => c.id === params.id);

  // Type guard function to check if campaign exists and has necessary properties
  const isValidCampaign = (
    campaign: Campaign | undefined
  ): campaign is Campaign => {
    return (
      !!campaign &&
      !!campaign.endDate &&
      !!campaign.goalAmount &&
      !!campaign.currentAmount
    );
  };

  if (!isValidCampaign(campaign)) {
    return <div>Kampanya bulunamadı veya eksik bilgi içeriyor.</div>;
  }

  const progress = calculateProgress(
    campaign.currentAmount,
    campaign.goalAmount
  );
  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const prevTab = tabs[currentTabIndex - 1];
  const nextTab = tabs[currentTabIndex + 1];

  // Add these interfaces at the top of the file
  interface FinancialItem {
    name: string;
    values: [number, number];
    expandable?: boolean;
    subitems?: FinancialSubItem[];
  }

  interface FinancialSubItem {
    name: string;
    values: [number, number];
  }

  function FinancialSection({ title, items }: { title: string; items: any[] }) {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="border border-gray-200 rounded-lg shadow-sm">
        <div
          className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100 rounded-t-lg"
          onClick={() => setExpanded(!expanded)}
        >
          <h3 className="text-lg font-medium">{title}</h3>
          <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
            {expanded ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
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
                  <div className="text-right">
                    {formatNumber(item.values[0])}
                  </div>
                  <div className="text-right">
                    {formatNumber(item.values[1])}
                  </div>
                </div>
                {item.expandable && item.subitems && (
                  <div className="ml-4">
                    {item.subitems.map((subitem: FinancialSubItem) => (
                      <div
                        key={subitem.name}
                        className="border-b border-gray-200 py-2 ml-4"
                      >
                        <div className="grid grid-cols-3">
                          <div>{subitem.name}</div>
                          <div className="text-right">
                            {formatNumber(subitem.values[0])}
                          </div>
                          <div className="text-right">
                            {formatNumber(subitem.values[1])}
                          </div>
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
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gradient-to-br">
        {/* Header */}
        <div
          className={`border-b bg-[#f3f4f6] sticky top-[72px] z-40 transition-all duration-300 ${
            isExpanded ? "pb-4" : "pb-2"
          }`}
        >
          <div className="container">
            <div className="flex justify-between items-center mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-kfs">
                {campaign.campaign_name}
              </h1>
              <Button onClick={toggleExpand} variant="ghost" size="sm">
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
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
                    className={`p-2 rounded-full ${
                      activeTab === tab.id
                        ? "bg-kfs text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
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
                      onClick={() =>
                        setActiveTab(prevTab?.id || tabs[tabs.length - 1].id)
                      }
                      disabled={!prevTab}
                      className="w-7 h-7 rounded-full border-2 border-kfs hover:bg-kfshover hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current flex items-center justify-center"
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
                      className="w-7 h-7 rounded-full border-2 border-kfs hover:bg-kfshover hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current flex items-center justify-center"
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
              {activeTab === "about" && (
                <AboutSection campaign={campaign} progress={progress} />
              )}
              {activeTab === "documents" && <DocumentsSection />}
              {activeTab === "team" && <TeamSection />}
              {activeTab === "product" && <ProductSection />}
              {activeTab === "market" && <MarketSection />}
              {activeTab === "analysis" && <AnalysisSection />}
              {activeTab === "risks" && <div>Risks Content</div>}
              {activeTab === "financials" && (
                <FinancialSection title="Financial Overview" items={[]} />
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
  );
}

interface TabButtonProps {
  tab: { id: string; label: string; icon: React.ElementType };
  activeTab: string;
  setActiveTab: (id: string) => void;
  isCollapsed?: boolean;
}

function TabButton({
  tab,
  activeTab,
  setActiveTab,
  isCollapsed,
}: TabButtonProps) {
  const Icon = tab.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-200 p-2",
        activeTab === tab.id ? "ring-2 ring-kfs" : "",
        isCollapsed ? "p-1" : "p-2"
      )}
      onClick={() => setActiveTab(tab.id)}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "rounded-full",
            activeTab === tab.id
              ? "bg-kfs text-white"
              : "bg-gray-100 text-gray-600",
            isCollapsed ? "p-1" : "p-1.5 mb-1"
          )}
        >
          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        {!isCollapsed && (
          <h3 className="text-[12px] font-medium text-center line-clamp-2">
            {tab.label}
          </h3>
        )}
      </div>
    </motion.div>
  );
}
