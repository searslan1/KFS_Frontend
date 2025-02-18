"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { ImageIcon, X, Plus, Youtube, Info, HelpCircle, Trash2, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MediaFile {
  id: string
  file: File
  preview: string
  type: "showcase" | "other"
}

interface VideoLink {
  id: string
  url: string
  platform: "youtube" | "vimeo" | null
}

export function MediaSection() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([])
  const [newVideoLink, setNewVideoLink] = useState("")
  const [dragOver, setDragOver] = useState<"showcase" | "other" | null>(null)

  const handleDragOver = (e: React.DragEvent, type: "showcase" | "other") => {
    e.preventDefault()
    setDragOver(type)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
  }

  const handleDrop = async (e: React.DragEvent, type: "showcase" | "other") => {
    e.preventDefault()
    setDragOver(null)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

    handleFiles(files, type)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "showcase" | "other") => {
    if (!e.target.files?.length) return

    const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))
    handleFiles(files, type)
  }

  const handleFiles = (files: File[], type: "showcase" | "other") => {
    // If it's a showcase image, only keep one
    if (type === "showcase") {
      setMediaFiles((prev) => prev.filter((file) => file.type !== "showcase"))
    }

    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type,
    }))

    setMediaFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setMediaFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter((file) => file.id !== id)
    })
  }

  const addVideoLink = () => {
    if (!newVideoLink.trim()) return

    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/

    let platform: "youtube" | "vimeo" | null = null
    if (youtubeRegex.test(newVideoLink)) {
      platform = "youtube"
    } else if (vimeoRegex.test(newVideoLink)) {
      platform = "vimeo"
    }

    setVideoLinks((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        url: newVideoLink,
        platform,
      },
    ])
    setNewVideoLink("")
  }

  const removeVideoLink = (id: string) => {
    setVideoLinks((prev) => prev.filter((link) => link.id !== id))
  }

  const getVideoThumbnail = (url: string, platform: "youtube" | "vimeo" | null) => {
    if (platform === "youtube") {
      const match = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
      )
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      }
    }
    // For Vimeo, we would need to use their API to get thumbnails
    return "/placeholder.svg"
  }

  return (
    <div className="space-y-8">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Kampanyanızı en iyi şekilde tanıtmak için yüksek kaliteli görseller ve videolar kullanın. Vitrin fotoğrafı
          kampanya listeleme sayfasında görünecek ana görseldir.
        </AlertDescription>
      </Alert>

      {/* Showcase Photo Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Vitrin Fotoğrafı</Label>
              <p className="text-sm text-gray-500">Kampanyanızı en iyi yansıtan bir görsel seçin</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Önerilen boyut: 1200x630px, maksimum 5MB</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg transition-colors",
              dragOver === "showcase" ? "border-[#4DB05F] bg-[#4DB05F]/5" : "border-gray-200",
              mediaFiles.some((file) => file.type === "showcase") ? "p-4" : "p-8",
            )}
            onDragOver={(e) => handleDragOver(e, "showcase")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "showcase")}
          >
            {mediaFiles.some((file) => file.type === "showcase") ? (
              mediaFiles
                .filter((file) => file.type === "showcase")
                .map((file) => (
                  <div key={file.id} className="relative">
                    <Image
                      src={file.preview || "/placeholder.svg"}
                      alt="Showcase preview"
                      width={1200}
                      height={630}
                      className="rounded-lg object-cover w-full aspect-[1200/630]"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        onClick={() => window.open(file.preview, "_blank")}
                      >
                        <Eye className="h-4 w-4 text-white" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gray-100 mb-4">
                  <ImageIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">Vitrin fotoğrafını buraya sürükleyin</p>
                  <p className="text-sm text-gray-500">veya bilgisayarınızdan seçin</p>
                </div>
                <label className="mt-4">
                  <Button variant="outline" className="cursor-pointer">
                    Dosya Seç
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, "showcase")}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Other Photos Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Diğer Fotoğraflar</Label>
              <p className="text-sm text-gray-500">Kampanyanızı detaylı anlatan görseller ekleyin</p>
            </div>
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg transition-colors",
              dragOver === "other" ? "border-[#4DB05F] bg-[#4DB05F]/5" : "border-gray-200",
              mediaFiles.some((file) => file.type === "other") ? "p-4" : "p-8",
            )}
            onDragOver={(e) => handleDragOver(e, "other")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "other")}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFiles
                .filter((file) => file.type === "other")
                .map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square"
                  >
                    <Image
                      src={file.preview || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        onClick={() => window.open(file.preview, "_blank")}
                      >
                        <Eye className="h-4 w-4 text-white" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              <motion.label
                className={cn(
                  "relative aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer",
                  "hover:border-[#4DB05F] hover:bg-[#4DB05F]/5 transition-colors",
                )}
              >
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Fotoğraf Ekle</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileSelect(e, "other")}
                />
              </motion.label>
            </div>
          </div>
        </div>
      </Card>

      {/* Videos Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Videolar</Label>
              <p className="text-sm text-gray-500">YouTube veya Vimeo video linklerini ekleyin</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              value={newVideoLink}
              onChange={(e) => setNewVideoLink(e.target.value)}
              placeholder="Video linkini yapıştırın..."
              className="flex-1"
            />
            <Button
              onClick={addVideoLink}
              className="bg-[#4DB05F] hover:bg-[#4DB05F]/90 text-white"
              disabled={!newVideoLink.trim()}
            >
              Ekle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoLinks.map((link) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-lg overflow-hidden border"
              >
                <div className="aspect-video relative">
                  <Image
                    src={getVideoThumbnail(link.url, link.platform) || "/placeholder.svg"}
                    alt="Video thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Youtube className="h-12 w-12 text-white opacity-75" />
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between bg-gray-50">
                  <div className="truncate flex-1 mr-2">
                    <p className="text-sm truncate">{link.url}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeVideoLink(link.id)}
                    className="flex-shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

