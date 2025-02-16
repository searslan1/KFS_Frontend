"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Campaign } from "@/lib/mockData"
import { calculateProgress } from "@/shared/utils/formatters"
import { useLanguage } from "@/contexts/language-context"
import { CampaignDetails } from "./campaign-details"
import { Heart } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"

// Add this new CSS keyframe animation
const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t } = useLanguage()
  const [showDetails, setShowDetails] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const progress = calculateProgress(campaign.currentAmount, campaign.goalAmount)

  return (
    <>
      <style jsx>{shimmerAnimation}</style>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Kampanya Görseli */}
        <div className="rounded-3xl aspect-square relative overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-50 rounded-full transition-colors duration-200 hover:bg-opacity-100"
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked ? "fill-red-500 text-red-500" : "fill-none text-gray-600"
              } transition-colors duration-200`}
            />
          </button>
          <Image
            src={campaign.imageUrl || `/placeholder.svg?text=${campaign.campaign_name}`}
            alt={campaign.campaign_name}
            fill
            className="object-cover w-full h-64"
          />
        </div>

        <div className="p-4">
          {/* Logo ve İsim */}
          <div className="flex items-center gap-3 mb-4 h-20">
            <div className="w-20 h-20 flex-shrink-0">
              <Image
                src={campaign.campaign_logo || `/placeholder.svg?text=${campaign.entrepreneur_name}`}
                alt={`${campaign.entrepreneur_name} logo`}
                width={80}
                height={80}
                className="rounded-[15px] object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-xl truncate">{campaign.campaign_name}</span>
              <span className="text-sm text-gray-500 truncate">{campaign.category}</span>
            </div>
          </div>

          {/* Fonlama Durumu */}
          <div className="bg-[#EDEDED] rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">{t("target")}</span>
              <span className="text-sm font-bold">₺ {campaign.funding.need_amount_fund.toLocaleString()}</span>
            </div>
            <div className="w-full bg-[#E5E5E5] rounded-full h-6 mb-2 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#4DB05F] via-[#3B6C8F] to-[#4DB05F] h-full rounded-full flex items-center justify-end pr-2 relative"
                style={{
                  width: `${Math.max(progress, 20)}%`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                <span className="text-white text-xs font-bold truncate relative z-10">
                  ₺ {campaign.currentAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Detay Butonu */}
          <Link href={`/campaigns/${campaign.id}`}>
            <Button className="w-full h-[56px] bg-[#4DB05F] hover:bg-[#366a40] text-white text-lg font-medium rounded-xl">
              {t("viewDetails")}
            </Button>
          </Link>
        </div>
      </div>

      <CampaignDetails campaign={campaign} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}

