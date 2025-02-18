"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Info,
  HelpCircle,
  Trash2,
  Eye,
  Download,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DocumentFile {
  id: string;
  file: File;
  type: string;
  uploadDate: Date;
}

export function OtherDocumentsSection() {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: file.type,
      uploadDate: new Date(),
    }));

    setDocuments((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
    if (type.includes("presentation")) return "📑";
    return "📎";
  };

  return (
    <div className="space-y-8">
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Bu alana kampanyanızla ilgili ek dokümanları yükleyebilirsiniz. Dosya
          yükleme zorunluluğu bulunmamaktadır.
        </AlertDescription>
      </Alert>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-semibold">Diğer Dokümanlar</Label>
              <p className="text-sm text-gray-500">
                Kampanyanızla ilgili ek dokümanları buraya yükleyebilirsiniz
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Desteklenen formatlar: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg transition-colors",
              dragOver ? "border-[#4DB05F] bg-kfs/5" : "border-gray-200",
              documents.length > 0 ? "p-4" : "p-8"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 group hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-2xl">{getFileIcon(doc.file.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{formatFileSize(doc.file.size)}</span>
                        <span>•</span>
                        <span>{doc.uploadDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          const url = URL.createObjectURL(doc.file);
                          window.open(url);
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          const url = URL.createObjectURL(doc.file);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = doc.file.name;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => removeFile(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Daha Fazla Doküman Ekle
                    </Button>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gray-100 mb-4">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">
                    Dokümanları buraya sürükleyin
                  </p>
                  <p className="text-sm text-gray-500">
                    veya bilgisayarınızdan seçin
                  </p>
                </div>
                <label className="mt-4">
                  <Button variant="outline" className="cursor-pointer">
                    Dosya Seç
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
