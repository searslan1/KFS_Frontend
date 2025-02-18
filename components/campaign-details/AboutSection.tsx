import type React from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import type { Campaign } from "@/lib/mockData";

interface AboutSectionProps {
  campaign: Campaign;
  progress: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  campaign,
  progress,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Kampanya Özeti</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Hedeflenen Fonlama</p>
              <p className="text-lg font-bold">
                {formatCurrency(campaign.goalAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alınan Yatırım</p>
              <p className="text-lg font-bold">
                {formatCurrency(campaign.currentAmount)}
              </p>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    {progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kampanya Bitiş Süresi</p>
              <p className="text-lg font-bold">
                {formatDate(campaign.endDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kategori</p>
              <p className="text-lg font-bold">{campaign.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Yatırımcı Sayısı</p>
              <p className="text-lg font-bold">{campaign.investorCount || 0}</p>
            </div>
          </div>
        </div>
        <Button className="w-full bg-kfs hover:bg-kfshover text-white">
          Yatırım Yap
        </Button>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Proje Hakkında</h3>
          <p className="text-gray-600 leading-relaxed">
            {campaign.about_project}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Proje Özeti</h3>
          <p className="text-gray-600 leading-relaxed">
            {campaign.campaign_summary}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Hedef Kapsam</h3>
          <p className="text-gray-600 leading-relaxed">
            {campaign.goal_coverage_subject}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Girişimci</h3>
          <div className="space-y-2 text-gray-600">
            <p>{campaign.entrepreneur_name}</p>
            <p>İletişim: {campaign.entrepreneurs_mails}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Kampanya Durumu</h3>
          <div className="space-y-2 text-gray-600">
            <p>Durum: {campaign.campaign_status}</p>
            <p>Oluşturulma: {formatDate(campaign.created_at)}</p>
            <p>Son Güncelleme: {formatDate(campaign.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
