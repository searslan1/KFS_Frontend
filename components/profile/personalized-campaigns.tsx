import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Campaign {
  id: string
  title: string
  description: string
  imageUrl: string
  progress: number
  goal: number
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Akıllı Tarım Teknolojileri",
    description: "Sürdürülebilir tarım için IoT çözümleri",
    imageUrl: "/placeholder.svg",
    progress: 75000,
    goal: 100000,
  },
  {
    id: "2",
    title: "Yenilenebilir Enerji Projesi",
    description: "Güneş enerjisi depolama sistemleri",
    imageUrl: "/placeholder.svg",
    progress: 50000,
    goal: 150000,
  },
  {
    id: "3",
    title: "Biyoteknoloji Girişimi",
    description: "Yeni nesil biyoplastik üretimi",
    imageUrl: "/placeholder.svg",
    progress: 30000,
    goal: 200000,
  },
]

export function PersonalizedCampaigns() {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-4">Size Özel Kampanyalar</h3>
      {mockCampaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <div className="aspect-video relative">
            <Image src={campaign.imageUrl || "/placeholder.svg"} alt={campaign.title} layout="fill" objectFit="cover" />
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">{campaign.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-[#4DB05F] h-2.5 rounded-full"
                style={{ width: `${(campaign.progress / campaign.goal) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>{campaign.progress.toLocaleString()} ₺ toplandı</span>
              <span>{campaign.goal.toLocaleString()} ₺ hedef</span>
            </div>
            <Button className="w-full bg-[#4DB05F] hover:bg-[#4DB05F]/90 text-white">Detayları Gör</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

