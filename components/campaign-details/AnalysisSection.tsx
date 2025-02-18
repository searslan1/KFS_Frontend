import { useState } from "react";
import { allCampaigns, type Campaign } from "@/lib/mockData";
import { calculateProgress } from "@/shared/utils/formatters";
import {

  AlertTriangle,

  TrendingUp,
  TrendingDown,
  Sun,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import type React from "react"; // Import React

interface SWOTItem {
  title: string;
  items?: string[];
  color: string;
  icon: React.ReactNode;
}

export const AnalysisSection = () => {
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
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Analizler(SWOT) ve İş Planı
      </h2>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4">
        {[
          "SWOT Analizi",
          "Stratejiler",
          "İş Planı",
          "Yatırımcı Sunumu",
          "Riskler",
        ].map((section) => (
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
            <p>
              {campaign.investorPresentation ||
                "Yatırımcı sunumu henüz eklenmemiş."}
            </p>
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
  );
};
