"use client";

import { useState, type React } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Upload, HelpCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MarketSection {
  id: string;
  title: string;
  description: string;
  content: string;
  maxLength: number;
  attachments: File[];
}

export function MarketSection() {
  const [sections, setSections] = useState<MarketSection[]>([
    {
      id: "market",
      title: "Pazar Hakkında Özet Bilgi",
      description:
        "Hedeflediğiniz pazarın büyüklüğü, dinamikleri ve büyüme potansiyelini açıklayın",
      content: "",
      maxLength: 4000,
      attachments: [],
    },
    {
      id: "competition",
      title: "Rekabet Hakkında Özet Bilgi",
      description:
        "Rakipleriniz ve rekabet avantajlarınız hakkında bilgi verin",
      content: "",
      maxLength: 4000,
      attachments: [],
    },
    {
      id: "target",
      title: "Hedef Kitle Hakkında Özet Bilgi",
      description:
        "Hedef müşteri profilinizi ve müşteri kazanım stratejinizi açıklayın",
      content: "",
      maxLength: 4000,
      attachments: [],
    },
    {
      id: "business",
      title: "Ticarileşme Planı ve İş Modeli",
      description: "İş modelinizi ve gelir stratejinizi detaylandırın",
      content: "",
      maxLength: 4000,
      attachments: [],
    },
  ]);

  const [dragOverSection, setDragOverSection] = useState<string | null>(null);

  const handleContentChange = (id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, content: value.slice(0, section.maxLength) }
          : section
      )
    );
  };

  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    setDragOverSection(sectionId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverSection(null);
  };

  const handleDrop = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    setDragOverSection(null);

    const files = Array.from(e.dataTransfer.files);
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, attachments: [...section.attachments, ...files] }
          : section
      )
    );
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: string
  ) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, attachments: [...section.attachments, ...files] }
          : section
      )
    );
  };

  const removeFile = (sectionId: string, fileIndex: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              attachments: section.attachments.filter(
                (_, index) => index !== fileIndex
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="space-y-8">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Pazar, rekabet ve hedef kitle analizleriniz, yatırımcıların projenizi
          değerlendirmesinde önemli rol oynar. Lütfen detaylı ve net bilgiler
          verin.
        </AlertDescription>
      </Alert>

      {sections.map((section) => (
        <Card key={section.id} className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label className="text-lg font-semibold">
                    {section.title}
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{section.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  value={section.content}
                  onChange={(e) =>
                    handleContentChange(section.id, e.target.value)
                  }
                  className="min-h-[200px] resize-y"
                  placeholder={`${section.title} hakkında detaylı bilgi verin...`}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {section.content.length} / {section.maxLength}
                </div>
              </div>

              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 transition-colors",
                  dragOverSection === section.id
                    ? "border-[#4DB05F] bg-kfs/5"
                    : "border-gray-200"
                )}
                onDragOver={(e) => handleDragOver(e, section.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Upload className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      İlgili Dokümanları Yükleyin
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Dosyaları sürükleyip bırakın veya bilgisayarınızdan seçin
                    </p>
                  </div>
                  <label className="cursor-pointer">
                    <Button variant="outline">Dosya Seç</Button>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileSelect(e, section.id)}
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                  </label>
                </div>
              </div>

              {section.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Yüklenen Dosyalar</Label>
                  <div className="grid gap-2">
                    {section.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeFile(section.id, index)}
                        >
                          Sil
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}

      {/* Market Statistics Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Pazar İstatistikleri</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>
                Toplam Pazar Büyüklüğü (TAM)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="ml-1">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Total Addressable Market - Toplam ulaşılabilir pazar
                        büyüklüğü
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input type="number" placeholder="₺" />
            </div>
            <div className="space-y-2">
              <Label>
                Ulaşılabilir Pazar (SAM)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="ml-1">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Serviceable Addressable Market - Hizmet verilebilir
                        pazar büyüklüğü
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input type="number" placeholder="₺" />
            </div>
            <div className="space-y-2">
              <Label>
                Ulaşılabilir Pazar Payı (SOM)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="ml-1">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Serviceable Obtainable Market - Elde edilebilir pazar
                        payı
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input type="number" placeholder="₺" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Pazar Büyüme Projeksiyonu (5 Yıllık)</Label>
            <Textarea placeholder="Pazarın önümüzdeki 5 yıl içindeki büyüme tahminlerini açıklayın" />
          </div>
        </div>
      </Card>
    </div>
  );
}
