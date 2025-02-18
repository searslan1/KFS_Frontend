"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Plus, Trash2, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"

interface FoundingPartner {
  id: string
  name: string
  title: string
  education: string
  university: string
  citizenship: string
  shareAmount: number
  sharePercentage: number
  votingRights: boolean
  privileges: string
  experience: string
  expertise: string
}

export function EstablishmentSection() {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    capital: "",
    province: "",
    address: "",
  })

  const [partners, setPartners] = useState<FoundingPartner[]>([
    {
      id: "1",
      name: "",
      title: "",
      education: "",
      university: "",
      citizenship: "",
      shareAmount: 0,
      sharePercentage: 0,
      votingRights: false,
      privileges: "",
      experience: "",
      expertise: "",
    },
  ])

  const addPartner = () => {
    setPartners((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name: "",
        title: "",
        education: "",
        university: "",
        citizenship: "",
        shareAmount: 0,
        sharePercentage: 0,
        votingRights: false,
        privileges: "",
        experience: "",
        expertise: "",
      },
    ])
  }

  const removePartner = (id: string) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== id))
  }

  const updatePartner = (id: string, field: keyof FoundingPartner, value: any) => {
    setPartners((prev) => prev.map((partner) => (partner.id === id ? { ...partner, [field]: value } : partner)))
  }

  return (
    <div className="space-y-8">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Şirket kuruluş bilgilerini ve kurucu ortakların detaylarını eksiksiz doldurunuz. Bu bilgiler şirket kuruluş
          işlemlerinde kullanılacaktır.
        </AlertDescription>
      </Alert>

      {/* Company Details */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Kurulacak Şirket Hakkında</Label>
              <p className="text-sm text-gray-500">Şirket kuruluş bilgilerini giriniz</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Ünvan</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Şirketin tam ticari ünvanı</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                value={companyDetails.name}
                onChange={(e) => setCompanyDetails((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Şirket ünvanı"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Sermaye</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Şirketin kuruluş sermayesi</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                type="number"
                value={companyDetails.capital}
                onChange={(e) => setCompanyDetails((prev) => ({ ...prev, capital: e.target.value }))}
                placeholder="0.00"
                className="text-right"
              />
              <div className="text-sm text-gray-500 text-right">TL</div>
            </div>

            <div className="space-y-2">
              <Label>İl</Label>
              <Select
                value={companyDetails.province}
                onValueChange={(value) => setCompanyDetails((prev) => ({ ...prev, province: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="İl seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="istanbul">İstanbul</SelectItem>
                  <SelectItem value="ankara">Ankara</SelectItem>
                  <SelectItem value="izmir">İzmir</SelectItem>
                  {/* Add more cities */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Adres</Label>
              <Textarea
                value={companyDetails.address}
                onChange={(e) => setCompanyDetails((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Şirket adresi"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Founding Partners */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Fonlama Sonrası Kurucu Ortaklar</Label>
              <p className="text-sm text-gray-500">Kurucu ortakların bilgilerini giriniz</p>
            </div>
            <Button onClick={addPartner} className="bg-[#4DB05F] hover:bg-[#4DB05F]/90">
              <Plus className="h-4 w-4 mr-2" />
              Ortak Ekle
            </Button>
          </div>

          <div className="space-y-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 border rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-semibold">Kurucu Ortak {index + 1}</h3>
                  {partners.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePartner(partner.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Adı Soyadı / Ticaret Ünvanı</Label>
                    <Input value={partner.name} onChange={(e) => updatePartner(partner.id, "name", e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Görevi / Ünvanı</Label>
                    <Input value={partner.title} onChange={(e) => updatePartner(partner.id, "title", e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Mezun Olunan Okul/Üniversite</Label>
                    <Input
                      value={partner.university}
                      onChange={(e) => updatePartner(partner.id, "university", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Vatandaşı Olunan Ülkeler</Label>
                    <Input
                      value={partner.citizenship}
                      onChange={(e) => updatePartner(partner.id, "citizenship", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sermayedeki Pay Tutarı</Label>
                    <Input
                      type="number"
                      value={partner.shareAmount}
                      onChange={(e) => updatePartner(partner.id, "shareAmount", Number(e.target.value))}
                      className="text-right"
                    />
                    <div className="text-sm text-gray-500 text-right">TL</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sermayedeki Pay Oranı</Label>
                    <Input
                      type="number"
                      value={partner.sharePercentage}
                      onChange={(e) => updatePartner(partner.id, "sharePercentage", Number(e.target.value))}
                      className="text-right"
                      max={100}
                      min={0}
                    />
                    <div className="text-sm text-gray-500 text-right">%</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Oy Hakkı</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`voting-rights-${partner.id}`}
                        checked={partner.votingRights}
                        onCheckedChange={(checked) => updatePartner(partner.id, "votingRights", checked)}
                      />
                      <label
                        htmlFor={`voting-rights-${partner.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Oy hakkına sahip
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>İmtiyazlar</Label>
                    <Input
                      value={partner.privileges}
                      onChange={(e) => updatePartner(partner.id, "privileges", e.target.value)}
                      placeholder="Varsa imtiyazları belirtiniz"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>İş Deneyimi</Label>
                    <Textarea
                      value={partner.experience}
                      onChange={(e) => updatePartner(partner.id, "experience", e.target.value)}
                      placeholder="İş deneyimlerini açıklayınız"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Uzmanlık Alanları</Label>
                    <Textarea
                      value={partner.expertise}
                      onChange={(e) => updatePartner(partner.id, "expertise", e.target.value)}
                      placeholder="Uzmanlık alanlarını açıklayınız"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

