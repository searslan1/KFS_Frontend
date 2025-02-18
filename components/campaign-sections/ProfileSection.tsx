"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, HelpCircle, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ProfileSection() {
  return (
    <div className="space-y-8">
      {/* Logo Upload Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-semibold">Kampanya Logosu</Label>
              <p className="text-sm text-gray-500">
                Kampanyanızı temsil edecek bir logo yükleyin (PNG, JPG, SVG)
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Önerilen boyut: 400x400px, max 2MB</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-12 h-12 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    Logo yüklemek için tıklayın
                  </span>{" "}
                  veya sürükleyip bırakın
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG veya SVG (MAX. 2MB)
                </p>
              </div>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
        </div>
      </Card>

      {/* Campaign Details Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <Label className="text-base font-semibold">Kampanya Adı</Label>
            <Input
              placeholder="Kampanyanızın adını girin"
              className="max-w-xl"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-base font-semibold">
              Kampanyanızı Bir Cümle İle Anlatın
            </Label>
            <Input placeholder="Kısa ve etkileyici bir açıklama yazın" />
            <p className="text-sm text-gray-500">
              Bu metin kampanya listeleme sayfasında görünecektir
            </p>
          </div>

          <div className="space-y-1">
            <Label className="text-base font-semibold">
              Kapsam, Amaç ve Konusu
            </Label>
            <Textarea
              placeholder="Projenizin kapsamını, amacını ve konusunu detaylı bir şekilde açıklayın"
              className="min-h-[200px]"
            />
            <div className="flex justify-end">
              <span className="text-sm text-gray-500">0/2500</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Business Categories Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-base font-semibold">
                Girişim Ana Kategorisi
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Teknoloji</SelectItem>
                  <SelectItem value="health">Sağlık</SelectItem>
                  <SelectItem value="education">Eğitim</SelectItem>
                  <SelectItem value="finance">Finans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-base font-semibold">
                Girişim İş Modelleri
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="İş modeli seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b2b">B2B</SelectItem>
                  <SelectItem value="b2c">B2C</SelectItem>
                  <SelectItem value="b2b2c">B2B2C</SelectItem>
                  <SelectItem value="c2c">C2C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-base font-semibold">Girişim Sektörü</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sektör seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Yazılım</SelectItem>
                  <SelectItem value="hardware">Donanım</SelectItem>
                  <SelectItem value="biotech">Biyoteknoloji</SelectItem>
                  <SelectItem value="ai">Yapay Zeka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-base font-semibold">
                Girişim Lokasyonu
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Şehir seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="istanbul">İstanbul</SelectItem>
                  <SelectItem value="ankara">Ankara</SelectItem>
                  <SelectItem value="izmir">İzmir</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Team Members Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-semibold">
                Katılımcı Girişimciler
              </Label>
              <p className="text-sm text-gray-500">
                Kampanyada yer alacak diğer girişimcileri ekleyin
              </p>
            </div>
            <Button className="bg-kfs hover:bg-kfshover/90">
              <Plus className="h-4 w-4 mr-2" />
              Girişimci Ekle
            </Button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              Henüz girişimci eklenmemiş
            </p>
          </div>
        </div>
      </Card>

      {/* Previous Campaigns Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Geçmiş Kampanyalar Hakkında Bilgiler
          </Label>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input type="radio" name="previous-campaigns" className="mt-1" />
              <div>
                <Label>
                  Daha önce paya dayalı kitle fonlaması kampanyası yapıldı mı?
                </Label>
                <p className="text-sm text-gray-500">
                  Eğer daha önce kampanya yaptıysanız, lütfen detayları belirtin
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Varsa önceki kampanyalarınız hakkında bilgi verin"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
