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
import type React from "react"; // Import React
import { MediaGallerySection } from "@/components/campaign-details/MediaGallerySection";
import { InvestorsSection } from "@/components/campaign-details/InvestorsSection";
import { UpdatesSection } from "@/components/campaign-details/UpdatesSection";
import { FAQSection } from "@/components/campaign-details/FAQSection";
import { CampaignFormSection } from "@/components/campaign-details/CampaignFormSection";
import { PaymentSection } from "@/components/campaign-details/PaymentSection";
import { ProductSection } from "@/components/campaign-details/ProductSection";
export const RiskSection = () => {
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
  const campaign = allCampaigns.find((c) => c.id === params.id);
  return (
    <div className="space-y-8">
      {/* Pazar Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Pazar</h3>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            {campaign.market_analysis || "Pazar analizi henüz eklenmemiş."}
          </p>
        </div>
      </div>

      {/* Rekabet Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Rekabet</h3>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            {campaign.competition_analysis ||
              "Rekabet analizi henüz eklenmemiş."}
          </p>
        </div>
      </div>

      {/* Hedef Kitle Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Hedef Kitle</h3>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            {campaign.target_audience ||
              "Hedef kitle analizi henüz eklenmemiş."}
          </p>
        </div>
      </div>
    </div>
  );
};
