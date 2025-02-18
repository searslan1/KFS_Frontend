"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockProfileData } from "@/lib/mock-data/profile"
import { EntrepreneurForm } from "@/components/profile/entrepreneur-form"
import { InvestorForm } from "@/components/profile/investor-form"
import { SidebarContent } from "@/components/profile/sidebar-content"
import { ChevronRight, ChevronLeft, Plus, MoreVertical } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsPopup } from "@/components/profile/settings-popup"

export default function ProfilePage() {
  const [activeRole, setActiveRole] = useState<"entrepreneur" | "investor">("entrepreneur")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockProfileData)
  const [showInputs, setShowInputs] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      console.log("Profil güncellendi:", profileData)
      setShowInputs(false)
      setTimeout(() => {
        setIsEditing(false)
      }, 300)
    } else {
      setIsEditing(true)
      setTimeout(() => {
        setShowInputs(true)
      }, 300)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, photoUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSettingsOpen])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "lg:w-3/4" : "lg:w-full"}`}>
            <Card className="border-0 shadow-sm bg-white mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Profil</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    className="bg-[#4DB05F] hover:bg-[#4DB05F]/90 text-white rounded-full px-6"
                    onClick={handleEditToggle}
                  >
                    {isEditing ? "Kaydet" : "Profili Düzenle"}
                  </Button>
                  <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setIsSettingsOpen(true)}>
                    <span className="sr-only">Menüyü aç</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="w-48 h-48 relative rounded-xl overflow-hidden mx-auto md:mx-0 shadow-lg group">
                    <Image
                      src={profileData.photoUrl || "/placeholder.svg"}
                      alt={profileData.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    {isEditing && (
                      <label
                        htmlFor="photo-upload"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Plus className="text-white w-12 h-12" />
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 space-y-6">
                    {isEditing ? (
                      <Input
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="text-3xl font-bold text-gray-800"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Kullanıcı Kimliği</p>
                        <p className="font-medium">989 228 078 310 4</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">E-Posta</p>
                        <div className="relative">
                          <p
                            className={`font-medium transition-opacity duration-300 ${showInputs ? "opacity-0" : "opacity-100"}`}
                          >
                            {profileData.email}
                          </p>
                          <Input
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className={`font-medium absolute top-0 left-0 w-full transition-opacity duration-300 ${showInputs ? "opacity-100" : "opacity-0"}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Telefon</p>
                        <div className="relative">
                          <p
                            className={`font-medium transition-opacity duration-300 ${showInputs ? "opacity-0" : "opacity-100"}`}
                          >
                            {profileData.phone}
                          </p>
                          <Input
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className={`font-medium absolute top-0 left-0 w-full transition-opacity duration-300 ${showInputs ? "opacity-100" : "opacity-0"}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Web Sitesi</p>
                        <div className="relative">
                          <p
                            className={`font-medium transition-opacity duration-300 ${showInputs ? "opacity-0" : "opacity-100"}`}
                          >
                            {profileData.website}
                          </p>
                          <Input
                            name="website"
                            value={profileData.website}
                            onChange={handleInputChange}
                            className={`font-medium absolute top-0 left-0 w-full transition-opacity duration-300 ${showInputs ? "opacity-100" : "opacity-0"}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Akademik Ünvan</p>
                        <div className="relative">
                          <p
                            className={`font-medium transition-opacity duration-300 ${showInputs ? "opacity-0" : "opacity-100"}`}
                          >
                            {profileData.academicTitle}
                          </p>
                          <Input
                            name="academicTitle"
                            value={profileData.academicTitle}
                            onChange={handleInputChange}
                            className={`font-medium absolute top-0 left-0 w-full transition-opacity duration-300 ${showInputs ? "opacity-100" : "opacity-0"}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Doğum Tarihi</p>
                        <div className="relative">
                          <p
                            className={`font-medium transition-opacity duration-300 ${showInputs ? "opacity-0" : "opacity-100"}`}
                          >
                            {profileData.birthDate}
                          </p>
                          <Input
                            name="birthDate"
                            type="date"
                            value={profileData.birthDate}
                            onChange={handleInputChange}
                            className={`font-medium absolute top-0 left-0 w-full transition-opacity duration-300 ${showInputs ? "opacity-100" : "opacity-0"}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="entrepreneur" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mt-20">
                    <TabsTrigger
                      value="entrepreneur"
                      className="data-[state=active]:bg-[#4DB05F] data-[state=active]:text-white"
                      onClick={() => setActiveRole("entrepreneur")}
                    >
                      Girişimci
                    </TabsTrigger>
                    <TabsTrigger
                      value="investor"
                      className="data-[state=active]:bg-[#4DB05F] data-[state=active]:text-white"
                      onClick={() => setActiveRole("investor")}
                    >
                      Yatırımcı
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="entrepreneur" className="mt-6">
                    <EntrepreneurForm />
                  </TabsContent>
                  <TabsContent value="investor" className="mt-6">
                    <InvestorForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out lg:w-1/4 lg:fixed lg:right-4 lg:top-24 lg:bottom-4 overflow-hidden ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <SidebarContent />
          </div>

          <button
            onClick={toggleSidebar}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#4DB05F] text-white p-2 rounded-l-md shadow-md"
          >
            {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>
        <SettingsPopup isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </main>
    </div>
  )
}

