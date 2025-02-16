"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import type { RootState, AppDispatch } from "@/lib/store"
import { setFeaturedCampaigns } from "@/lib/slices/campaignsSlice"
import { allCampaigns } from "@/lib/mockData"
import { useLanguage } from "@/contexts/language-context"
import { CampaignCard } from "@/components/campaign-card"
import Link from "next/link"

export function FeaturedCampaigns() {
  const dispatch = useDispatch<AppDispatch>()
  const { featuredCampaigns } = useSelector((state: RootState) => state.campaigns)
  const { t } = useLanguage()

  useEffect(() => {
    dispatch(setFeaturedCampaigns(allCampaigns.slice(0, 4)))
  }, [dispatch])

  return (
    <section id="featured-campaigns" className="w-full py-12 md:py-24 lg:py-32 bg-[#f2f6fa]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
          {t("featuredCampaigns")}
        </h2>
        <div className="w-12 h-1 bg-[#4DB05F] rounded-full mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/campaigns">
            <Button variant="outline" className="h-[48px] px-8 bg-[#4DB05F] text-white hover:bg-[#366a40] rounded-xl">
              {t("viewMore")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

