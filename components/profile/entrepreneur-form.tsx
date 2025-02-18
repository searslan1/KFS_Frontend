"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function EntrepreneurForm() {
  const [formData, setFormData] = useState({
    name: "Mustafa",
    surname: "Sineci",
    email: "mustafasineci2004@gmail.com",
    phone: "505 027 25 41",
    idNumber: "17534420006",
    gender: "",
    birthDate: "",
    city: "",
    district: "",
    postalCode: "",
    address: "",
    educationLevel: "",
    profession: "",
    sector: "",
    expertise: "",
    experience: "",
    bankName: "",
    iban: "",
    website: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-2">
          <Label>Adınız *</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-lg"
          />
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
          <Label>E-Posta</Label>
          <Input
            value={formData.email}
            type="email"
            onChange={(e) => handleChange("email", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>T.C. Kimlik Numarası</Label>
          <Input
            value={formData.idNumber}
            onChange={(e) => handleChange("idNumber", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>Cinsiyet *</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Erkek</SelectItem>
              <SelectItem value="female">Kadın</SelectItem>
              <SelectItem value="other">Diğer</SelectItem>
            </SelectContent>
          </Select>
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

        {/* Location Information */}
        <div className="space-y-2">
          <Label>Şehir *</Label>
          <Select
            value={formData.city}
            onValueChange={(value) => handleChange("city", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="istanbul">İstanbul</SelectItem>
              <SelectItem value="ankara">Ankara</SelectItem>
              <SelectItem value="izmir">İzmir</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>İlçe *</Label>
          <Select
            value={formData.district}
            onValueChange={(value) => handleChange("district", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kadikoy">Kadıköy</SelectItem>
              <SelectItem value="besiktas">Beşiktaş</SelectItem>
              <SelectItem value="sisli">Şişli</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Posta Kodu *</Label>
          <Input
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Adres *</Label>
          <Textarea
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="rounded-lg"
            rows={3}
          />
        </div>

        {/* Professional Information */}
        <div className="space-y-2">
          <Label>Eğitim Durumu *</Label>
          <Select
            value={formData.educationLevel}
            onValueChange={(value) => handleChange("educationLevel", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lisans">Lisans</SelectItem>
              <SelectItem value="yuksek-lisans">Yüksek Lisans</SelectItem>
              <SelectItem value="doktora">Doktora</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Meslek *</Label>
          <Select
            value={formData.profession}
            onValueChange={(value) => handleChange("profession", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="muhendis">Mühendis</SelectItem>
              <SelectItem value="doktor">Doktor</SelectItem>
              <SelectItem value="ogretmen">Öğretmen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Faaliyet Gösterdiği Sektör *</Label>
          <Select
            value={formData.sector}
            onValueChange={(value) => handleChange("sector", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teknoloji">Teknoloji</SelectItem>
              <SelectItem value="saglik">Sağlık</SelectItem>
              <SelectItem value="egitim">Eğitim</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <div className="col-span-2 space-y-2">
          <Label>Uzmanlık Alanları *</Label>
          <Textarea
            value={formData.expertise}
            onChange={(e) => handleChange("expertise", e.target.value)}
            className="rounded-lg"
            rows={3}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label>İş Deneyimi *</Label>
          <Textarea
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            className="rounded-lg"
            rows={5}
          />
        </div>

        {/* Bank Information */}
        <div className="space-y-2">
          <Label>Banka Adı</Label>
          <Select
            value={formData.bankName}
            onValueChange={(value) => handleChange("bankName", value)}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ziraat">Ziraat Bankası</SelectItem>
              <SelectItem value="is">İş Bankası</SelectItem>
              <SelectItem value="garanti">Garanti BBVA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>IBAN</Label>
          <Input
            value={formData.iban}
            onChange={(e) => handleChange("iban", e.target.value)}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label>Web Sitesi</Label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-kfs hover:bg-kfshover/90 text-white px-8 rounded-full"
        >
          Kaydet
        </Button>
      </div>
    </form>
  );
}
