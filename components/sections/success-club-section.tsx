"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { RootState, AppDispatch } from "@/lib/store"
import { setSuccessfulCampaigns } from "@/lib/slices/campaignsSlice"
import { successfulCampaigns as mockSuccessfulCampaigns } from "@/lib/mockData"
import { useLanguage } from "@/contexts/language-context"
import { formatCurrency, formatDate } from "@/shared/utils/formatters"

export function SuccessClubSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { successfulCampaigns } = useSelector((state: RootState) => state.campaigns)
  const { t } = useLanguage()

  useEffect(() => {
    dispatch(setSuccessfulCampaigns(mockSuccessfulCampaigns))
  }, [dispatch])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#EDEDED]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-12">{t("successClub")}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {successfulCampaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-white rounded-3xl overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={campaign.imageUrl || "/placeholder.svg"}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t("raisedAmount")}:</span>
                  <span className="font-semibold">{formatCurrency(campaign.raisedAmount)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">{t("completionDate")}:</span>
                  <span className="font-semibold">{formatDate(campaign.completionDate)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

