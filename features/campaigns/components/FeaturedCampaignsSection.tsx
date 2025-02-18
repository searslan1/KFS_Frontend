"use client"

import { useEffect } from "react"
import { useCampaigns } from "../hooks/useCampaigns"
import { OptimizedCampaignCard } from "@/shared/components/OptimizedCampaignCard"
import { Button } from "@/shared/components/ui/button"

export function FeaturedCampaignsSection() {
  const { featuredCampaigns, loading, error, fetchFeaturedCampaigns } = useCampaigns()

  useEffect(() => {
    fetchFeaturedCampaigns()
  }, [])

  if (loading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <section id="featured-campaigns" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-8">
          Öne Çıkan Kampanyalar
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCampaigns.map((campaign) => (
            <OptimizedCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        {featuredCampaigns.length > 0 && (
          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => {}}>
              Daha Fazla
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

