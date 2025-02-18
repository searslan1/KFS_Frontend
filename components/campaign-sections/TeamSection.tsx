"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export function TeamSection() {
  return (
    <div className="space-y-8">
      {/* Team Members List */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Takım Üyeleri</Label>
            <Button className="bg-kfs hover:bg-kfshover/90">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Üye Ekle
            </Button>
          </div>

          <div className="space-y-4">
            {/* Team Member Card */}
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/placeholder.svg"
                        alt="Team member"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Fotoğraf Değiştir
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>İsim Soyisim</Label>
                    <Input placeholder="İsim Soyisim" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pozisyon</Label>
                    <Input placeholder="Pozisyon" />
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <div className="space-y-2">
                    <Label>Özgeçmiş</Label>
                    <Textarea
                      placeholder="Kişinin deneyimleri ve yetenekleri hakkında bilgi verin"
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn Profili</Label>
                    <Input placeholder="LinkedIn profil linki" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Üyeyi Sil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Team Structure */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Organizasyon Yapısı</Label>
          <Textarea
            placeholder="Ekibinizin organizasyon yapısını ve görev dağılımını açıklayın"
            className="min-h-[200px]"
          />
        </div>
      </Card>
    </div>
  );
}
