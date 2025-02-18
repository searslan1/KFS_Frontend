"use client"

import { Plus, Info } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

interface Campaign {
  id: string
  title: string
  logo: string
  image: string
  updatedAt: string
  totalInvestment?: string
  investorCount?: number
  targetAmount?: string
  remainingDays?: number
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Yenilenebilir Enerji Projesi",
    logo: "/placeholder.svg",
    image: "/placeholder.svg",
    updatedAt: "27/01/2025",
    totalInvestment: "750,000",
    investorCount: 125,
    targetAmount: "1,000,000",
    remainingDays: 15,
  },
]

export default function EntrepreneurPage() {
  const router = useRouter()
  const canCreateCampaign = mockCampaigns.length < 2

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Alert className="mb-8 border-yellow-200 bg-yellow-50">
          <Info className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-500 font-medium">
            Yıllık kampanya oluşturma limitiniz: {2 - mockCampaigns.length}/2
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Existing Campaigns */}
          <div className="aspect-square bg-white rounded-[32px] overflow-hidden relative shadow-xl">
            {mockCampaigns.length > 0 ? (
              mockCampaigns.map((campaign) => (
                <Link href={`/campaigns/${campaign.id}`} key={campaign.id} className="block w-full h-full">
                  <div className="h-full flex flex-col">
                    <div className="flex-grow bg-[#d9d9d9] flex items-center justify-center text-2xl font-bold text-[#000000]">
                      GÖRSEL
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-b-[32px]">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium shrink-0 overflow-hidden">
                            <img
                              src={campaign.logo || "/placeholder.svg"}
                              alt={`${campaign.title} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-800">{campaign.title}</h3>
                            <span className="text-sm text-gray-500">Güncellenme: {campaign.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-500 block mb-1">Toplam Yatırım</span>
                          <span className="text-lg font-semibold text-kfs">
                            {campaign.totalInvestment || "0"} ₺
                          </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-500 block mb-1">Yatırımcı Sayısı</span>
                          <span className="text-lg font-semibold text-kfs">{campaign.investorCount || "0"}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-500 block mb-1">Hedef</span>
                          <span className="text-lg font-semibold text-kfs">{campaign.targetAmount || "0"} ₺</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-500 block mb-1">Kalan Süre</span>
                          <span className="text-lg font-semibold text-kfs">
                            {campaign.remainingDays || "0"} gün
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-2xl font-bold text-[#000000]">
                Henüz kampanya yok
              </div>
            )}
          </div>

          {/* Create Campaign */}
          <div
            onClick={() => canCreateCampaign && router.push("/campaigns/create")}
            className={`aspect-square bg-[#d9d9d9] rounded-[32px] flex flex-col items-center justify-center gap-4 ${
              canCreateCampaign ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="w-[72px] h-[72px] rounded-full bg-kfs flex items-center justify-center">
              <Plus className="w-10 h-10 text-black" strokeWidth={3} />
            </div>
            <span className="text-xl font-medium text-black">Kampanya Oluştur</span>
          </div>
        </div>
      </main>
    </div>
  )
}

