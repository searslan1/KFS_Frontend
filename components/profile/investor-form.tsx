"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function InvestorForm() {
  const [formData, setFormData] = useState({
    name: "Mustafa",
    surname: "Sineci",
    email: "mustafasineci2004@gmail.com",
    phone: "505 027 25 41",
    countryCode: "+90",
    idNumber: "17534420006",
    birthDate: "",
    mkkNo: "",
    annualIncome: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-2">
          <Label>Adınız *</Label>
          <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="rounded-lg" />
        </div>
        <div className="space-y-2">
          <Label>Soyadınız *</Label>
          <Input
            value={formData.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>E-Posta *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label>Kod *</Label>
            <Select value={formData.countryCode} onValueChange={(value) => handleChange("countryCode", value)}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Kod" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+90">+90</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Cep Telefonu *</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>T.C. Kimlik Numarası *</Label>
          <Input
            value={formData.idNumber}
            onChange={(e) => handleChange("idNumber", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>Doğum Tarihi *</Label>
          <Input
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>MKK No (Varsa)</Label>
          <Input
            value={formData.mkkNo}
            onChange={(e) => handleChange("mkkNo", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>Gelir Beyanı (Yıllık) TL *</Label>
          <Input
            type="number"
            value={formData.annualIncome}
            onChange={(e) => handleChange("annualIncome", e.target.value)}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-[#4DB05F] hover:bg-[#4DB05F]/90 text-white px-8 rounded-full">
          Kaydet
        </Button>
      </div>
    </form>
  )
}

