"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/lib/mockData";
import { calculateProgress } from "@/shared/utils/formatters";
import { useLanguage } from "@/contexts/language-context";
import { Heart } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FundingStatus } from "./Funding-Status";
import Link from "next/link";

const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const progress = calculateProgress(
    campaign.currentAmount,
    campaign.goalAmount
  );

  return (
    <>
      <style jsx>{shimmerAnimation}</style>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Kampanya Görseli */}
        <div className="rounded-3xl aspect-square relative overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-50 rounded-full transition-colors duration-200 hover:bg-opacity-100"
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "fill-none text-gray-600"
              } transition-colors duration-200`}
            />
          </button>
          <Image
            src={
              campaign.imageUrl ||
              `/placeholder.svg?text=${campaign.campaign_name}`
            }
            alt={campaign.campaign_name}
            fill
            className="object-cover w-full h-64 z-1"
          />
        </div>

        <div className="p-4">
          {/* Logo ve İsim */}
          <div className="flex items-center gap-3 mb-4 h-20">
            <div className="w-20 h-20 flex-shrink-0">
              <Image
                src={
                  campaign.campaign_logo ||
                  `/placeholder.svg?text=${campaign.entrepreneur_name}`
                }
                alt={`${campaign.entrepreneur_name} logo`}
                width={80}
                height={80}
                className="rounded-[15px] object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-xl truncate">
                {campaign.campaign_name}
              </span>
              <span className="text-sm text-gray-500 truncate">
                {campaign.category}
              </span>
            </div>
          </div>

          {/* Fonlama Durumu */}
          <FundingStatus
            targetLabel={t("target")}
            targetAmount={campaign.funding.need_amount_fund}
            currentAmount={campaign.currentAmount}
            progress={progress}
          />

          {/* Detay Butonu */}
          <Link href={`/campaigns/${campaign.id}`} passHref legacyBehavior>
            <Button className="w-full h-[56px]" >
              {t("viewDetails")}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
