import Image from "next/image"
import { Button } from "@/components/ui/button"
import { upcomingCampaigns } from "@/lib/mockData"
import { useLanguage } from "@/contexts/language-context"

export function UpcomingCampaigns() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f2f6fa]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
          {t("upcoming")}
        </h2>
        <div className="w-12 h-1 bg-[#4DB05F] rounded-full mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-[#3F84B6] p-6 rounded-3xl aspect-square relative overflow-hidden">
                <Image
                  src={campaign.imageUrl || "/placeholder.svg"}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src={campaign.imageUrl || "/placeholder.svg"}
                    alt={`${campaign.title} logo`}
                    width={60}
                    height={60}
                    className="rounded-[15px]"
                  />
                  <span className="font-semibold">{campaign.title}</span>
                </div>
                <Button className="w-full bg-black hover:bg-gray-600 text-white">{t("comingSoon")}</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="bg-[#4DB05F] text-white hover:bg-[#366a40] hover:text-white">
            {t("viewMore")}
          </Button>
        </div>
      </div>
    </section>
  )
}

