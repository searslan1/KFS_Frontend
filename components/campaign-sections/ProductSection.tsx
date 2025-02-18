"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductSection() {
  return (
    <div className="space-y-8">
      {/* Product Description */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Ürün/Hizmet Açıklaması</Label>
            <Textarea placeholder="Ürün veya hizmetinizi detaylı bir şekilde açıklayın" className="min-h-[200px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Ürün/Hizmet Kategorisi</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Yazılım</SelectItem>
                  <SelectItem value="hardware">Donanım</SelectItem>
                  <SelectItem value="service">Hizmet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Geliştirme Aşaması</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Aşama seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concept">Konsept</SelectItem>
                  <SelectItem value="prototype">Prototip</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="market">Pazarda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Production Model */}
      <Card className="p-6">
        <div className="space-y-6">
          <Label className="text-base font-semibold">Üretim Modeli</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Üretim Kapasitesi</Label>
              <Input placeholder="Aylık üretim kapasitesi" />
            </div>
            <div className="space-y-2">
              <Label>Üretim Lokasyonu</Label>
              <Input placeholder="Üretim tesisi lokasyonu" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Üretim Süreci</Label>
            <Textarea placeholder="Üretim sürecinizi detaylı bir şekilde açıklayın" className="min-h-[150px]" />
          </div>
        </div>
      </Card>

      {/* Technology */}
      <Card className="p-6">
        <div className="space-y-6">
          <Label className="text-base font-semibold">Teknoloji</Label>
          <div className="space-y-2">
            <Label>Kullanılan Teknolojiler</Label>
            <Textarea placeholder="Ürün/hizmetinizde kullanılan teknolojileri açıklayın" className="min-h-[150px]" />
          </div>
          <div className="space-y-2">
            <Label>Patent/Fikri Mülkiyet</Label>
            <Textarea placeholder="Varsa patent ve fikri mülkiyet haklarınızı belirtin" className="min-h-[150px]" />
          </div>
        </div>
      </Card>
    </div>
  )
}

