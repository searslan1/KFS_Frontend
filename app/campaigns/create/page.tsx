"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Users,
  Factory,
  Target,
  LineChart,
  AlertTriangle,
  Wallet,
  Building2,
  Table2,
  ImageIcon,
  File,
  CheckSquare,
  Eye,
  LayoutDashboard,
  Save,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import the new section components
import { ProfileSection } from "@/components/campaign-sections/ProfileSection";
import { DocumentsSection } from "@/components/campaign-sections/DocumentsSection";
import { TeamSection } from "@/components/campaign-sections/TeamSection";
import { ProductSection } from "@/components/campaign-details/ProductSection";
import { MarketSection } from "@/components/campaign-sections/MarketSection";
import { AnalysisSection } from "@/components/campaign-sections/AnalysisSection";
import { RisksSection } from "@/components/campaign-sections/RisksSection";
import { FundingSection } from "@/components/campaign-sections/FundingSection";
import { EstablishmentSection } from "@/components/campaign-sections/EstablishmentSection";
import { FinancialsSection } from "@/components/campaign-sections/FinancialsSection";
import { MediaSection } from "@/components/campaign-sections/MediaSection";
import { OtherDocumentsSection } from "@/components/campaign-sections/OtherDocumentsSection";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  isCompleted: boolean;
}

const sections: Section[] = [
  {
    id: "profile",
    title: "Kampanya Profili",
    icon: LayoutDashboard,
    isCompleted: false,
  },
  {
    id: "documents",
    title: "Belge/Ödül/Hukuk",
    icon: FileText,
    isCompleted: false,
  },
  {
    id: "team",
    title: "Takım",
    icon: Users,
    isCompleted: false,
  },
  {
    id: "product",
    title: "Ürün/Üretim Modeli",
    icon: Factory,
    isCompleted: false,
  },
  {
    id: "market",
    title: "Pazar/Rekabet/Hedef",
    icon: Target,
    isCompleted: false,
  },
  {
    id: "analysis",
    title: "Analizler",
    icon: LineChart,
    isCompleted: false,
  },
  {
    id: "risks",
    title: "Riskler",
    icon: AlertTriangle,
    isCompleted: false,
  },
  {
    id: "funding",
    title: "Fonlama",
    icon: Wallet,
    isCompleted: false,
  },
  {
    id: "establishment",
    title: "Kuruluş",
    icon: Building2,
    isCompleted: false,
  },
  {
    id: "financials",
    title: "Finansal Tablolar",
    icon: Table2,
    isCompleted: false,
  },
  {
    id: "media",
    title: "Görsel/Video",
    icon: ImageIcon,
    isCompleted: false,
  },
  {
    id: "documents-other",
    title: "Diğer Dokümanlar",
    icon: File,
    isCompleted: false,
  },
];

export default function CampaignCreatePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [completedSections, setCompletedSections] = useState(0);

  useEffect(() => {
    const completed = sections.filter((s) => s.isCompleted).length;
    setCompletedSections(completed);
  }, []);

  const progress = (completedSections / sections.length) * 100;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);

    const updatedSections = sections.map((s) =>
      s.id === activeSection ? { ...s, isCompleted: true } : s
    );
    setCompletedSections(updatedSections.filter((s) => s.isCompleted).length);
  };

  const currentSectionIndex = sections.findIndex((s) => s.id === activeSection);
  const prevSection = sections[currentSectionIndex - 1];
  const nextSection = sections[currentSectionIndex + 1];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br">
      <main className="flex-grow p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Kampanya Oluştur
            </h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {completedSections} / {sections.length}
              </div>
              <Progress value={progress} className="w-full sm:w-48 h-2" />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {sections.slice(0, 12).map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-200 p-2",
                    activeSection === section.id ? "ring-2 ring-kfs" : "",
                    section.isCompleted ? "bg-kfs/5" : "",
                    index >= 6 ? "mt-2 sm:mt-3" : ""
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={cn(
                        "p-1.5 rounded-full mb-1",
                        activeSection === section.id
                          ? "bg-kfs text-white"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <h3 className="text-xs font-medium text-center">
                      {section.title}
                    </h3>
                  </div>
                  {activeSection === section.id && (
                    <div className="bg-kfs h-0.5 w-full mt-1" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-white rounded-xl shadow-md p-4 sm:p-6"
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {sections.find((s) => s.id === activeSection)?.title}
                </h2>
                <div className="flex gap-2 sm:gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setActiveSection(
                              prevSection?.id ||
                                sections[sections.length - 1].id
                            )
                          }
                          disabled={!prevSection}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Önceki Bölüm</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    className="bg-kfs hover:bg-kfshover/90 text-white text-sm sm:text-base px-3 sm:px-4"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Kaydediliyor..." : "Kaydet"}
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setActiveSection(nextSection?.id || sections[0].id)
                          }
                          disabled={!nextSection}
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
              <div className="min-h-[300px] sm:min-h-[400px] space-y-8">
                {activeSection === "profile" && <ProfileSection />}
                {activeSection === "documents" && <DocumentsSection />}
                {activeSection === "team" && <TeamSection />}
                {activeSection === "product" && <ProductSection />}
                {activeSection === "market" && <MarketSection />}
                {activeSection === "analysis" && <AnalysisSection />}
                {activeSection === "risks" && <RisksSection />}
                {activeSection === "funding" && <FundingSection />}
                {activeSection === "establishment" && <EstablishmentSection />}
                {activeSection === "financials" && <FinancialsSection />}
                {activeSection === "media" && <MediaSection />}
                {activeSection === "documents-other" && (
                  <OtherDocumentsSection />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              className="text-[#4DB05F] border-[#4DB05F] hover:bg-kfshover/10 text-sm sm:text-base"
              onClick={() => {}}
            >
              <Eye className="h-4 w-4 mr-2" />
              Önizleme
            </Button>
            <Button
              className="bg-kfs hover:bg-kfshover/90 text-white text-sm sm:text-base"
              onClick={() => {}}
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              Onaya Gönder
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
