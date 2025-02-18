"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  FileText,
  Download,
  Eye,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentItem {
  id: string;
  title: string;
  type?: string;
  url?: string;
  children?: DocumentItem[];
}

const documents: DocumentItem[] = [
  {
    id: "1",
    title: "Esas Sözleşme",
    type: "pdf",
    url: "#",
  },
  {
    id: "2",
    title: "Fon Kullanım Raporu",
    type: "pdf",
    url: "#",
  },
  {
    id: "3",
    title: "Pay Satış Tutarı Tespit Raporu",
    type: "pdf",
    url: "#",
  },
  {
    id: "4",
    title: "Ek Belgeler",
    children: Array.from({ length: 21 }, (_, i) => ({
      id: `4.${i + 1}`,
      title: `Nolu Belge (${i + 1})`,
      type: "pdf",
      url: "#",
    })),
  },
  {
    id: "5",
    title: "SWOT Analizi",
    type: "pdf",
    url: "#",
  },
  {
    id: "6",
    title: "Yatırımcı Sunumu",
    type: "pdf",
    url: "#",
  },
  {
    id: "7",
    title: "Özgeçmişler",
    children: [
      {
        id: "7.1",
        title: "Nolu Belge ( Muhammet Barış Sütcü )",
        type: "pdf",
        url: "#",
      },
      {
        id: "7.2",
        title: "Nolu Belge ( İsmail Kalkan )",
        type: "pdf",
        url: "#",
      },
      {
        id: "7.3",
        title: "Nolu Belge ( Fatih Şenkavak )",
        type: "pdf",
        url: "#",
      },
      {
        id: "7.4",
        title: "Nolu Belge ( Mehmet Evcimen )",
        type: "pdf",
        url: "#",
      },
      {
        id: "7.5",
        title: "Nolu Belge ( Büşra Giynas )",
        type: "pdf",
        url: "#",
      },
      {
        id: "7.6",
        title: "Nolu Belge ( Hela Tasimbora )",
        type: "pdf",
        url: "#",
      },
      { id: "7.7", title: "Nolu Belge ( Taha Kocaro )", type: "pdf", url: "#" },
      {
        id: "7.8",
        title: "Nolu Belge ( Halil Yüksekdük )",
        type: "pdf",
        url: "#",
      },
      {
        id: "7.9",
        title: "Nolu Belge ( Şahin Şenildük )",
        type: "pdf",
        url: "#",
      },
    ],
  },
];

interface DocumentItemProps {
  item: DocumentItem;
  level?: number;
  expandedItems: string[];
  toggleItem: (id: string) => void;
}

function DocumentItemComponent({
  item,
  level = 0,
  expandedItems,
  toggleItem,
}: DocumentItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.id);

  return (
    <div className="w-full">
      <div
        className={cn(
          "group flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors",
          isExpanded && "bg-gray-50"
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={() => hasChildren && toggleItem(item.id)}
      >
        {hasChildren ? (
          <div className="w-6 h-6 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
        ) : (
          <FileText className="w-4 h-4 text-gray-400" />
        )}
        <span className="flex-grow text-sm">{item.title}</span>
        {item.type === "pdf" && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.children?.map((child) => (
              <DocumentItemComponent
                key={child.id}
                item={child}
                level={level + 1}
                expandedItems={expandedItems}
                toggleItem={toggleItem}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CampaignFormSection() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kampanya Bilgi Formu</h2>
        <Button className="bg-kfs hover:bg-kfshover/90">
          <FileText className="w-4 h-4 mr-2" />
          PDF Olarak Görüntüle
        </Button>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-blue-100">
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900">Bilgi Formu Ekleri</h3>
            <p className="text-sm text-blue-700">
              İlgili mevzuat bilgi formları, hukuki/teknik/finansal belgeler ve
              sunumlar sadece bilgilendirme amaçlıdır.
            </p>
          </div>
        </div>
      </Card>

      {/* Documents List */}
      <Card>
        <ScrollArea className="h-[600px] w-full rounded-md border">
          <div className="p-4">
            {documents.map((doc) => (
              <DocumentItemComponent
                key={doc.id}
                item={doc}
                expandedItems={expandedItems}
                toggleItem={toggleItem}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
