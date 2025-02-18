"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RootState, AppDispatch } from "@/lib/store"
import { setUpcomingCampaigns, setLoading, setError } from "@/lib/slices/campaignsSlice"
import type { UpcomingCampaign } from "@/lib/mockData"
import Image from "next/image"
import { formatDate } from "@/shared/utils/formatters"

export function UpcomingCampaignsSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { upcomingCampaigns, loading, error } = useSelector((state: RootState) => state.campaigns)

  useEffect(() => {
    const fetchUpcomingCampaigns = async () => {
      dispatch(setLoading(true))
      try {
        // In a real application, you would fetch data from an API here
        // For now, we'll use mock data
        const mockUpcomingCampaigns: UpcomingCampaign[] = [
          {
            id: "uc1",
            title: "Akıllı Şehir Çözümleri",
            description: "Şehirleri daha yaşanabilir ve sürdürülebilir hale getiren IoT tabanlı çözümler",
            imageUrl: "/placeholder.svg",
            expectedLaunchDate: "1 Ağustos 2024",
          },
          {
            id: "uc2",
            title: "Biyoplastik Üretim Tesisi",
            description: "Çevre dostu, biyolojik olarak parçalanabilen plastik üretimi",
            imageUrl: "/placeholder.svg",
            expectedLaunchDate: "15 Eylül 2024",
          },
          {
            id: "uc3",
            title: "Yapay Zeka Destekli Tarım",
            description: "Tarımda verimliliği artırmak için AI ve drone teknolojileri",
            imageUrl: "/placeholder.svg",
            expectedLaunchDate: "1 Ekim 2024",
          },
        ]
        dispatch(setUpcomingCampaigns(mockUpcomingCampaigns))
      } catch (error) {
        dispatch(setError("Yaklaşan kampanyalar yüklenirken bir hata oluştu."))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchUpcomingCampaigns()
  }, [dispatch])

  if (loading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-8">Yakında</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingCampaigns.map((campaign) => (
            <Card key={campaign.id}>
              <Image
                src={campaign.imageUrl || "/placeholder.svg"}
                alt={campaign.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{campaign.description}</p>
                <p className="text-sm font-medium">Beklenen Başlangıç: {formatDate(campaign.expectedLaunchDate)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

