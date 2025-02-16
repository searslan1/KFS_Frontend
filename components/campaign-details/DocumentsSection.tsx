import type React from "react"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download } from "lucide-react"

export const DocumentsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Patent, Marka Tescil ve Belge Bilgileri</h3>
          <div className="grid gap-4">
            {[
              {
                id: 1,
                title: "Milli Savunma Bakanlığı Askeri Fabrikalar Genel Müdürlüğü Onaylı Tedarikçi Belgesi",
                date: "2024-01-15",
                type: "pdf",
                size: "2.4 MB",
              },
              {
                id: 2,
                title: "Teknolojik Ürün Belgesi",
                date: "2024-01-20",
                type: "pdf",
                size: "1.8 MB",
              },
              {
                id: 3,
                title: "Güzel Üretim Uygulamaları",
                date: "2024-01-25",
                type: "pdf",
                size: "3.1 MB",
              },
              {
                id: 4,
                title: "ISO 9001",
                date: "2024-02-01",
                type: "pdf",
                size: "1.2 MB",
              },
              {
                id: 5,
                title: "ISO 14001",
                date: "2024-02-05",
                type: "pdf",
                size: "1.5 MB",
              },
            ].map((doc) => (
              <div
                key={doc.id}
                className="group relative flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#4DB05F] transition-all duration-200 bg-white hover:shadow-md"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{doc.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{doc.date}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-[#4DB05F]"
                    onClick={() => {
                      /* Preview handler */
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-[#4DB05F]"
                    onClick={() => {
                      /* Download handler */
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add the Awards and Certificates, and Legal Status sections here */}
    </div>
  )
}

