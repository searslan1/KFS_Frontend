import { CustomButton } from "@/components/ui/custom-button"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 bg-[#f3f4f6]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-medium tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="text-[#4DB05F]">{t("futureProjects")}</div>
              <div className="text-[#4DB05F]">{t("invest")}</div>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("platformDescription")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center w-full"
            >
              <CustomButton
                text="Explore Projects"
                className="mt-8"
                onClick={() => {
                  const featuredCampaigns = document.getElementById("featured-campaigns")
                  if (featuredCampaigns) {
                    featuredCampaigns.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

