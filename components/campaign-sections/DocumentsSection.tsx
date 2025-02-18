"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, HelpCircle, Trash2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  description: string;
  file?: File;
  date?: string;
}

export function DocumentsSection() {
  const [patents, setPatents] = useState<Document[]>([]);
  const [awards, setAwards] = useState<Document[]>([]);
  const [permits, setPermits] = useState<Document[]>([]);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent, section: string) => {
    e.preventDefault();
    setDragOver(section);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = async (e: React.DragEvent, section: string) => {
    e.preventDefault();
    setDragOver(null);

    const files = Array.from(e.dataTransfer.files);
    const newDocs = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      description: "",
      file,
      date: new Date().toISOString(),
    }));

    switch (section) {
      case "patents":
        setPatents((prev) => [...prev, ...newDocs]);
        break;
      case "awards":
        setAwards((prev) => [...prev, ...newDocs]);
        break;
      case "permits":
        setPermits((prev) => [...prev, ...newDocs]);
        break;
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string
  ) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    const newDocs = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      description: "",
      file,
      date: new Date().toISOString(),
    }));

    switch (section) {
      case "patents":
        setPatents((prev) => [...prev, ...newDocs]);
        break;
      case "awards":
        setAwards((prev) => [...prev, ...newDocs]);
        break;
      case "permits":
        setPermits((prev) => [...prev, ...newDocs]);
        break;
    }
  };

  const removeDocument = (id: string, section: string) => {
    switch (section) {
      case "patents":
        setPatents((prev) => prev.filter((doc) => doc.id !== id));
        break;
      case "awards":
        setAwards((prev) => prev.filter((doc) => doc.id !== id));
        break;
      case "permits":
        setPermits((prev) => prev.filter((doc) => doc.id !== id));
        break;
    }
  };

  const DocumentUploadArea = ({
    section,
    title,
    description,
  }: {
    section: string;
    title: string;
    description: string;
  }) => (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 transition-colors",
        dragOver === section ? "border-[#4DB05F] bg-kfs/5" : "border-gray-200"
      )}
      onDragOver={(e) => handleDragOver(e, section)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, section)}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-gray-100">
          <Upload className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <label className="cursor-pointer">
          <Button variant="outline">Dosya Seç</Button>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(e) => handleFileChange(e, section)}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Yüklediğiniz tüm belgeler platform yöneticileri tarafından incelenecek
          ve onaylanacaktır.
        </AlertDescription>
      </Alert>

      {/* Patent ve Belgeler */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">
                Patent, Marka Tescil ve Belge Bilgileri
              </Label>
              <p className="text-sm text-gray-500">
                Patent, marka tescil ve diğer resmi belgelerinizi yükleyin
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desteklenen formatlar: PDF, DOC, DOCX, JPG, PNG</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <DocumentUploadArea
            section="patents"
            title="Patent ve Belgeleri Yükleyin"
            description="Dosyaları sürükleyip bırakın veya bilgisayarınızdan seçin"
          />

          <AnimatePresence>
            {patents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FileText className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-grow space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(doc.date!).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDocument(doc.id, "patents")}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Belge hakkında açıklama ekleyin"
                    value={doc.description}
                    onChange={(e) =>
                      setPatents((prev) =>
                        prev.map((d) =>
                          d.id === doc.id
                            ? { ...d, description: e.target.value }
                            : d
                        )
                      )
                    }
                    className="min-h-[60px]"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      {/* Ödüller */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Ödül ve Başarılar</Label>
              <p className="text-sm text-gray-500">
                Aldığınız ödül ve başarı belgelerini yükleyin
              </p>
            </div>
          </div>

          <DocumentUploadArea
            section="awards"
            title="Ödül Belgelerini Yükleyin"
            description="Dosyaları sürükleyip bırakın veya bilgisayarınızdan seçin"
          />

          <AnimatePresence>
            {awards.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FileText className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-grow space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(doc.date!).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDocument(doc.id, "awards")}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Ödülü Veren Kuruluş" />
                    <Input type="date" />
                  </div>
                  <Textarea
                    placeholder="Ödül hakkında açıklama ekleyin"
                    value={doc.description}
                    onChange={(e) =>
                      setAwards((prev) =>
                        prev.map((d) =>
                          d.id === doc.id
                            ? { ...d, description: e.target.value }
                            : d
                        )
                      )
                    }
                    className="min-h-[60px]"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      {/* İzinler */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">İzin ve Onaylar</Label>
              <p className="text-sm text-gray-500">
                Gerekli izin ve onay belgelerini yükleyin
              </p>
            </div>
          </div>

          <DocumentUploadArea
            section="permits"
            title="İzin Belgelerini Yükleyin"
            description="Dosyaları sürükleyip bırakın veya bilgisayarınızdan seçin"
          />

          <AnimatePresence>
            {permits.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FileText className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-grow space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(doc.date!).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDocument(doc.id, "permits")}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="İzni Veren Kurum" />
                    <Input type="date" />
                  </div>
                  <Textarea
                    placeholder="İzin belgesi hakkında açıklama ekleyin"
                    value={doc.description}
                    onChange={(e) =>
                      setPermits((prev) =>
                        prev.map((d) =>
                          d.id === doc.id
                            ? { ...d, description: e.target.value }
                            : d
                        )
                      )
                    }
                    className="min-h-[60px]"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
