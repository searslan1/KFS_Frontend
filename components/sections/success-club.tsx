import Image from "next/image"
import { Button } from "@/components/ui/button"
import { successClubCampaigns } from "@/lib/mockData"
import { useLanguage } from "@/contexts/language-context"

const backgroundColors = [
  "bg-white",
  "bg-[#F7F8E0]",
  "bg-[#E3E0F8]",
  "bg-[#E0F8F3]",
  "bg-[#F8E0E0]",
  "bg-[#E0F6F8]",
  "bg-[#E5F8E0]",
]

export function SuccessClub() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
          {t("successClub")}
        </h2>
        <div className="w-12 h-1 bg-[#4DB05F] rounded-full mx-auto mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {successClubCampaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className={`${backgroundColors[index % backgroundColors.length]} rounded-2xl p-4 shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={campaign.logo || "/placeholder.svg"}
                  alt={`${campaign.title} logo`}
                  width={60}
                  height={60}
                  className="rounded-[15px]"
                />
                <span className="font-semibold text-sm">
                  {campaign.title === "Elektrikli Scooter Paylaşım Ağı" ? campaign.companyName : campaign.title}
                </span>
              </div>
              <div className="text-[#4DB05F] font-bold text-sm mb-2">₺ {campaign.amount.toLocaleString()}</div>
              <Button size="sm" className="w-full bg-[#4DB05F] hover:bg-[#4DB05F]/90 text-white text-xs">
                {t("viewDetails")}
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="bg-[#4DB05F] text-white hover:bg-[#4DB05F]/90 hover:text-white">
            {t("viewMore")}
          </Button>
        </div>
      </div>
    </section>
  )
}

