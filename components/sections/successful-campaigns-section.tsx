"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RootState, AppDispatch } from "@/lib/store"
import { setSuccessfulCampaigns, setLoading, setError } from "@/lib/slices/campaignsSlice"
import type { SuccessfulCampaign } from "@/lib/mockData"
import Image from "next/image"
import { formatCurrency, formatDate } from "@/shared/utils/formatters"

export function SuccessfulCampaignsSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { successfulCampaigns, loading, error } = useSelector((state: RootState) => state.campaigns)

  useEffect(() => {
    const fetchSuccessfulCampaigns = async () => {
      dispatch(setLoading(true))
      try {
        // In a real application, you would fetch data from an API here
        // For now, we'll use mock data
        const mockSuccessfulCampaigns: SuccessfulCampaign[] = [
          {
            id: "sc1",
            title: "Elektrikli Scooter Paylaşım Ağı",
            description: "Şehir içi ulaşımda çevre dostu alternatif",
            imageUrl: "/placeholder.svg",
            raisedAmount: 2000000,
            completionDate: "15 Mart 2024",
          },
          {
            id: "sc2",
            title: "Güneş Enerjili Şarj İstasyonları",
            description: "Yenilenebilir enerji ile elektrikli araç şarj ağı",
            imageUrl: "/placeholder.svg",
            raisedAmount: 1500000,
            completionDate: "1 Nisan 2024",
          },
          {
            id: "sc3",
            title: "Akıllı Geri Dönüşüm Sistemleri",
            description: "IoT tabanlı atık yönetimi ve geri dönüşüm çözümleri",
            imageUrl: "/placeholder.svg",
            raisedAmount: 1000000,
            completionDate: "20 Nisan 2024",
          },
        ]
        dispatch(setSuccessfulCampaigns(mockSuccessfulCampaigns))
      } catch (error) {
        dispatch(setError("Başarılı kampanyalar yüklenirken bir hata oluştu."))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchSuccessfulCampaigns()
  }, [dispatch])

  if (loading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-8">Başaranlar</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {successfulCampaigns.map((campaign) => (
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
                <p className="text-sm font-medium">Toplanan Fon: {formatCurrency(campaign.raisedAmount)}</p>
                <p className="text-sm text-muted-foreground">
                  Tamamlanma Tarihi: {formatDate(campaign.completionDate)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

