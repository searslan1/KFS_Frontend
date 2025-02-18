import { useState } from "react";
import { allCampaigns, type Campaign } from "@/lib/mockData";
import { calculateProgress } from "@/shared/utils/formatters";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { formatNumber } from "@/lib/utils/formatters";
import { FinancialBudgetSection } from "@/components/financial-budget-section";
import { InvestmentBudgetSection } from "@/components/financial-sections/InvestmentBudgetSection";
import { RevenueItemsSection } from "@/components/financial-sections/RevenueItemsSection";
import { SalesTargetsSection } from "@/components/financial-sections/SalesTargetsSection";
import { CashFlowSection } from "@/components/financial-sections/CashFlowSection";

export const FinancialSection = () => {
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
              variant={
                activeFinancialSection === section ? "default" : "outline"
              }
              className={cn(
                "rounded-full",
                activeFinancialSection === section ? "bg-kfs text-white" : ""
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
                      {
                        name: "Bankalar",
                        values: [7192522, 338969],
                      },
                    ],
                  },
                  {
                    name: "Ticari Alacaklar",
                    values: [7688007, 8882560],
                    expandable: true,
                    subitems: [
                      {
                        name: "Müşterilerden Alacaklar",
                        values: [7500000, 8700000],
                      },
                      {
                        name: "Diğer Ticari Alacaklar",
                        values: [188007, 182560],
                      },
                    ],
                  },
                  { name: "Stoklar", values: [3456256, 7159254] },
                ]}
              />

              <FinancialSection
                title="Duran Varlıklar"
                items={[
                  {
                    name: "Maddi Duran Varlıklar",
                    values: [5304279, 5106873],
                  },
                  {
                    name: "MaddiOlmayan Duran Varlıklar",
                    values: [297712, 509869],
                  },
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
                      {
                        name: "Banka Kredileri",
                        values: [500000000, 3000000],
                      },
                      {
                        name: "Diğer Finansal Borçlar",
                        values: [1990623, 1010062],
                      },
                    ],
                  },
                  {
                    name: "Ticari Borçlar",
                    values: [566047, 1242791],
                  },
                  {
                    name: "Diğer Borçlar",
                    values: [475728, 1548365],
                  },
                ]}
              />

              <FinancialSection
                title="Özkaynaklar"
                items={[
                  {
                    name: "Ödenmiş Sermaye",
                    values: [14495073, 14495073],
                  },
                  {
                    name: "Sermaye Yedekleri",
                    values: [201738, 201738],
                  },
                  {
                    name: "Geçmiş Yıllar Karları",
                    values: [318311, 1482781],
                  },
                  {
                    name: "Net Dönem Karı",
                    values: [1164470, 149622],
                  },
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
          {activeFinancialSection === "İşletme Bütçesi" && (
            <FinancialBudgetSection />
          )}
          {activeFinancialSection === "Yatırım Bütçesi" && (
            <InvestmentBudgetSection />
          )}
          {activeFinancialSection === "Gelir Kalemleri" && (
            <RevenueItemsSection />
          )}
          {activeFinancialSection === "Satış Hedefleri" && (
            <SalesTargetsSection />
          )}
          {activeFinancialSection === "Nakit Akım Tablosu" && (
            <CashFlowSection />
          )}
        </div>
      </div>
    </div>
  );
};
