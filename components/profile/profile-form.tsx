"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserProfile } from "@/types/profile";

interface ProfileFormProps {
  initialData?: UserProfile;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-8">
      {/* Profile Photo Section */}
      <div className="flex items-start gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {profileImage ? (
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <label
            htmlFor="profile-photo"
            className="absolute bottom-0 right-0 w-8 h-8 bg-kfs rounded-full flex items-center justify-center cursor-pointer hover:bg-kfshover/90"
          >
            <Plus className="w-5 h-5 text-white" />
            <input
              type="file"
              id="profile-photo"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Fotoğraf Seç</h2>
          <p className="text-sm text-gray-500">
            JPG, GIF veya PNG. Maksimum 5MB.
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Adınız
          </label>
          <Input
            id="name"
            defaultValue={initialData?.name}
            className="border-[#4DB05F] rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="surname" className="text-sm font-medium">
            Soyadınız
          </label>
          <Input
            id="surname"
            defaultValue={initialData?.surname}
            className="border-[#4DB05F] rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-Posta
          </label>
          <Input
            id="email"
            type="email"
            defaultValue={initialData?.email}
            className="border-[#4DB05F] rounded-xl"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <label htmlFor="countryCode" className="text-sm font-medium">
              Kod
            </label>
            <Select defaultValue={initialData?.countryCode || "+90"}>
              <SelectTrigger className="border-[#4DB05F] rounded-xl">
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
            <label htmlFor="phone" className="text-sm font-medium">
              Cep Telefonu
            </label>
            <Input
              id="phone"
              type="tel"
              defaultValue={initialData?.phone}
              className="border-[#4DB05F] rounded-xl"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="birthDate" className="text-sm font-medium">
            Doğum Tarihi
          </label>
          <Input
            id="birthDate"
            type="date"
            defaultValue={initialData?.birthDate}
            className="border-[#4DB05F] rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            Web Sitesi
          </label>
          <Input
            id="website"
            type="url"
            defaultValue={initialData?.webSite}
            className="border-[#4DB05F] rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="gender" className="text-sm font-medium">
            Cinsiyet
          </label>
          <Select defaultValue={initialData?.gender}>
            <SelectTrigger className="border-[#4DB05F] rounded-xl">
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
          <label htmlFor="academicTitle" className="text-sm font-medium">
            Akademik Ünvan
          </label>
          <Select defaultValue={initialData?.academicTitle}>
            <SelectTrigger className="border-[#4DB05F] rounded-xl">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Profesör</SelectItem>
              <SelectItem value="docent">Doçent</SelectItem>
              <SelectItem value="doctor">Doktor</SelectItem>
              <SelectItem value="other">Diğer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sosyal Medya Hesapları</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="linkedin" className="text-sm font-medium">
              LinkedIn
            </label>
            <div className="flex gap-4">
              <Input
                id="linkedin"
                defaultValue={initialData?.socialMedia?.linkedin}
                className="border-[#4DB05F] rounded-xl"
              />
              <Input
                type="number"
                placeholder="Takipçi Sayısı"
                defaultValue={initialData?.followers?.linkedin}
                className="border-[#4DB05F] rounded-xl w-32"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="twitter" className="text-sm font-medium">
              Twitter
            </label>
            <div className="flex gap-4">
              <Input
                id="twitter"
                defaultValue={initialData?.socialMedia?.twitter}
                className="border-[#4DB05F] rounded-xl"
              />
              <Input
                type="number"
                placeholder="Takipçi Sayısı"
                defaultValue={initialData?.followers?.twitter}
                className="border-[#4DB05F] rounded-xl w-32"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="instagram" className="text-sm font-medium">
              Instagram
            </label>
            <div className="flex gap-4">
              <Input
                id="instagram"
                defaultValue={initialData?.socialMedia?.instagram}
                className="border-[#4DB05F] rounded-xl"
              />
              <Input
                type="number"
                placeholder="Takipçi Sayısı"
                defaultValue={initialData?.followers?.instagram}
                className="border-[#4DB05F] rounded-xl w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-kfs hover:bg-kfshover/90 text-white px-8"
        >
          Kaydet
        </Button>
      </div>
    </form>
  );
}
