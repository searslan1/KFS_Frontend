"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Play, ImageIcon, X, ChevronLeft, ChevronRight, Download } from "lucide-react"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  thumbnail: string
  title: string
  description?: string
}

const mockMediaData: MediaItem[] = [
  {
    id: "1",
    type: "image",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M7nMOpwJstRMSJlp7U6ZCCdXXalqRK.png",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M7nMOpwJstRMSJlp7U6ZCCdXXalqRK.png",
    title: "Ürün Görseli 1",
    description: "Ürünümüzün detaylı görseli",
  },
  {
    id: "2",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg",
    title: "Ürün Tanıtım Videosu",
    description: "Ürünümüzün detaylı tanıtım videosu",
  },
  {
    id: "3",
    type: "image",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Du3iDwbNhrz54oB8ODX2iWxTfHtvxU.png",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Du3iDwbNhrz54oB8ODX2iWxTfHtvxU.png",
    title: "Ürün Görseli 2",
    description: "Ürünümüzün farklı bir açıdan görünümü",
  },
  {
    id: "4",
    type: "video",
    url: "https://www.youtube.com/embed/M7lc1UVf-VE",
    thumbnail: "/placeholder.svg",
    title: "Kullanım Kılavuzu",
    description: "Ürünün nasıl kullanılacağını anlatan video",
  },
  {
    id: "5",
    type: "image",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QAgtdSGbP4NMFXUd1WZplQojV2C8c5.png",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QAgtdSGbP4NMFXUd1WZplQojV2C8c5.png",
    title: "Ürün Görseli 3",
    description: "Ürünün paketlenmiş hali",
  },
  {
    id: "6",
    type: "image",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C1NaTZo9xumyN16FyLb7oeGeptp4kD.png",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C1NaTZo9xumyN16FyLb7oeGeptp4kD.png",
    title: "Ürün Görseli 4",
    description: "Ürünün kullanım alanı",
  },
]

export function MediaGallerySection() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredMedia = mockMediaData.filter((item) => {
    if (activeTab === "all") return true
    return item.type === activeTab
  })

  const handlePrevious = () => {
    if (!selectedMedia) return
    const currentIndex = mockMediaData.findIndex((item) => item.id === selectedMedia.id)
    const previousIndex = (currentIndex - 1 + mockMediaData.length) % mockMediaData.length
    setSelectedMedia(mockMediaData[previousIndex])
  }

  const handleNext = () => {
    if (!selectedMedia) return
    const currentIndex = mockMediaData.findIndex((item) => item.id === selectedMedia.id)
    const nextIndex = (currentIndex + 1) % mockMediaData.length
    setSelectedMedia(mockMediaData[nextIndex])
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="image">Görseller</TabsTrigger>
          <TabsTrigger value="video">Videolar</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden cursor-pointer group" onClick={() => setSelectedMedia(item)}>
                  <div className="relative aspect-video">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {item.type === "image" ? (
                        <ImageIcon className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-500" />
                      )}
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    {item.description && <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95">
          <div className="relative flex items-center justify-center min-h-[60vh]">
            {selectedMedia?.type === "image" ? (
              <div className="relative w-full h-full min-h-[60vh]">
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <iframe
                width="100%"
                height="500"
                src={selectedMedia?.url}
                title={selectedMedia?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video"
              />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedMedia?.title}</h3>
                <p className="text-sm text-gray-500">{selectedMedia?.description}</p>
              </div>
              {selectedMedia?.type === "image" && (
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  İndir
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

