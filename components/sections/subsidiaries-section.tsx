"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RootState, AppDispatch } from "@/lib/store"
import { setSubsidiaries, setLoading, setError } from "@/lib/slices/subsidiariesSlice"
import type { Subsidiary } from "@/lib/mockData"
import Image from "next/image"

export function SubsidiariesSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { subsidiaries, loading, error } = useSelector((state: RootState) => state.subsidiaries)

  useEffect(() => {
    const fetchSubsidiaries = async () => {
      dispatch(setLoading(true))
      try {
        // In a real application, you would fetch data from an API here
        // For now, we'll use mock data
        const mockSubsidiaries: Subsidiary[] = [
          {
            id: "bilisim",
            name: "ARD Bilişim",
            description:
              "Deloitte EMEA Fast 500 ve Turkey Fast 50 Winner! ARD Bilişim bir ARD GRUP HOLDİNG AŞ. iştirakidir.",
            logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M7nMOpwJstRMSJlp7U6ZCCdXXalqRK.png",
          },
          {
            id: "enerji",
            name: "ARD Enerji",
            description: "Çevreye duyarlı teknolojiler… ARD Enerji bir ARD GRUP HOLDİNG AŞ. iştirakidir.",
            logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Du3iDwbNhrz54oB8ODX2iWxTfHtvxU.png",
          },
          {
            id: "saglik",
            name: "ARD Sağlık",
            description: "Sağlık alanında en ileri teknoloji. ARD Sağlık bir ARD GRUP HOLDİNG AŞ. iştirakidir.",
            logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QAgtdSGbP4NMFXUd1WZplQojV2C8c5.png",
          },
          {
            id: "insaat",
            name: "ARD İnşaat",
            description: "Geleceği inşa ediyoruz! ARD İnşaat bir ARD GRUP HOLDİNG AŞ. iştirakidir.",
            logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C1NaTZo9xumyN16FyLb7oeGeptp4kD.png",
          },
          {
            id: "savunma",
            name: "ARD Savunma",
            description: "En yeni teknoloji, en yüksek kalite! ARD Savunma bir ARD GRUP HOLDİNG AŞ. iştirakidir.",
            logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6UDGjADUrPtPLnCvaehPBdJhVt9CHo.png",
          },
          {
            id: "danismanlik",
            name: "ARD Danışmanlık",
            description:
              "Kurumunuzun Geleceğini Şansa Bırakmayın. ARD Danışmanlık bir ARD GRUP HOLDİNG AŞ. iştirakidir.",
            logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AXUVmHgdtCnnWWE96U7I7u4B1eleDe.png",
          },
        ]
        dispatch(setSubsidiaries(mockSubsidiaries))
      } catch (error) {
        dispatch(setError("İştirakler yüklenirken bir hata oluştu."))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchSubsidiaries()
  }, [dispatch])

  if (loading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata: {error}</div>

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f3f4f6]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
            İŞTİRAKLERİMİZ
          </h2>
          <div className="w-12 h-1 bg-[#4DB05F] rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground md:text-lg">
            ARD HOLDİNG, 2006 yılından bu yana Türkiye ve Dünya pazarında büyük iştiraklerde bulunan firmaların bir
            kurumsal kimlik altında bir araya gelmesiyle oluşturulmuştur.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subsidiaries.map((subsidiary) => (
            <Card key={subsidiary.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="w-full h-20 relative flex items-center justify-center bg-gradient-to-r from-background to-muted rounded-t-lg overflow-hidden">
                  <Image
                    src={subsidiary.logoUrl || "/placeholder.svg"}
                    alt={subsidiary.name}
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-xl text-center">{subsidiary.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">{subsidiary.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

