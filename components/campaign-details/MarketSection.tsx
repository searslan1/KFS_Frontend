import { useState } from "react";
import { allCampaigns, type Campaign } from "@/lib/mockData";
import { calculateProgress } from "@/shared/utils/formatters";

import { useParams } from "next/navigation";

import type React from "react"; // Import React

export const MarketSection = () => {
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
