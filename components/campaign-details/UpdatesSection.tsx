"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";

interface Update {
  id: string;
  date: string;
  content: string;
  hasAttachment?: boolean;
  attachmentUrl?: string;
}

const mockUpdates: Update[] = [
  {
    id: "1",
    date: "27.01.2025",
    content:
      "Kıymetli paydaşlarımız; Gümüşhane Gençlik ve spor İl müdürlüğü Devlet Malzeme Ofisi üzerinden 768.000 TL Çamaşır Makinesi Deterjanı siparişi vermiştir. Tüm sevenlerimize hayırlı olsun. #NGAYT NOGAYT Endüstri Ekibi",
  },
  {
    id: "2",
    date: "24.01.2025",
    content:
      "Nogayt Endüstri Kimya Arge Anonim Şirketi girişimcilerin talebi üzere Yatırım Komitemizce yapılan değerlendirme sonucunda, hali hazırda platformumuzda yatırım tura devam eden Nogayt Endüstri Kimya Arge Anonim Şirketi'nin 26.12.2024 tarih ve saat 10.00 itibariyle 30 gün süre ile başlayan kampanya sürecinde, Krile Forlaması Tebliğinin 17/2. Maddesi çerçevesinde belirtilen azami sürenin kullanılması amacıyla kampanya bitiş tarihinin 15 gün uzatılarak 09.02.2025 saat 23:59'a kadar sürmesine oy birliği ile karar verilmiştir.",
    hasAttachment: true,
    attachmentUrl: "#",
  },
  {
    id: "3",
    date: "24.01.2025",
    content:
      "Kıymetli paydaşlarımız ; Çorum Gençlik ve spor İl müdürlüğü 388 bin tl + KDV miktarında çamaşır makinesi deterjanı Devlet Malzeme Ofisi Teknolojik Ürünler Kataloğundan sipariş geçilmiştir. Saygılarımızla. #NGAYT NOGAYT Endüstri Ekibi",
  },
  {
    id: "4",
    date: "24.01.2025",
    content:
      "Kıymetli paydaşlarımız ; Afyon Gençlik ve spor İl müdürlüğü 809 bin tl + KDV miktarında çamaşır makinesi deterjanı Devlet Malzeme Ofisi Teknolojik Ürünler Kataloğundan sipariş geçilmiştir. Ocak ayı içinde gelen ve geleceği bilgisi verilen DMO sipariş tutarının 4 milyon TL olması ön görülmektedir. Saygılarımızla. #NGAYT NOGAYT Endüstri Ekibi",
  },
  {
    id: "5",
    date: "13.01.2025",
    content:
      "Girişim şirketimizin güncel gelişmelerini içeren bilgilendirme dokümanı ektedir.",
    hasAttachment: true,
    attachmentUrl: "#",
  },
  {
    id: "6",
    date: "03.01.2025",
    content:
      "Bize inanan ve güvenen tüm yatırımcılarımıza teşekkür ederiz. Yatırım turumuzda 323 yatırımcı ile %17 fonlama oranına ulaşarak 4.273.015 TL fon topladık. Kampanyamıza sadece ilk tur yatırımcılarına açık olduğu 7 gün tamamlanmış ve tüm yatırımcılara açılmıştır.",
  },
  {
    id: "7",
    date: "26.12.2024",
    content:
      "Nogayt Endüstri Kimya Arge A.Ş. girişim şirketine ait kampanya bilgi formunun otuz sekizinci sayfasında yer alan 2023 yılına ait gelir tablosunda Esas Faaliyet Karı ve Esas Faaliyet Zararı kalemlerinin hatalı olarak yer verildiği görüldüğünden söz konusu tablonun aşağıdaki şekilde düzeltilmesi sağlanmış ve bu konuda alınan yatırım komitesi kararı ek eklenmiştir.",
    hasAttachment: true,
    attachmentUrl: "#",
  },
  {
    id: "8",
    date: "26.12.2024",
    content: "Yatırım turumuz başlamıştır.",
  },
  {
    id: "9",
    date: "26.12.2024",
    content:
      "Ön Talep Toplama Sürecine Dair Açıklama: 26 Aralık 2024 Perşembe günü saat 10.00'da başlayacak yatırım turumuz için yapılan ön talep toplama süreci tamamlanmış olup 1285 yatırımcı toplam 17.920.425,00 TL ön talep toplamıştır.",
  },
];

export function UpdatesSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Güncellemeler</h2>
        <div className="text-sm text-gray-500">
          Toplam: {mockUpdates.length} güncelleme
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[35px] top-0 bottom-0 w-px bg-gray-200" />

        <div className="space-y-6">
          {mockUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(update.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-[70px] h-[26px] bg-white">
                  <div
                    className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${
                      hoveredCard === update.id
                        ? "bg-kfs scale-125"
                        : "bg-gray-300"
                    }
                  `}
                  />
                </div>

                {/* Card */}
                <Card
                  className={`
                    flex-1 relative overflow-hidden transition-all duration-300
                    hover:shadow-lg hover:border-[#4DB05F]/50
                    ${hoveredCard === update.id ? "scale-[1.01]" : "scale-100"}
                  `}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">
                          {formatDate(update.date)}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {update.content}
                        </p>
                        {update.hasAttachment && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-[#4DB05F] hover:text-[#4DB05F] hover:bg-kfshover/10"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Dosya Ekini İndir
                          </Button>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${
                            hoveredCard === update.id
                              ? "bg-kfs/10"
                              : "bg-gray-100"
                          }
                          transition-colors duration-300
                        `}
                        >
                          <CheckCircle2
                            className={`
                            w-5 h-5
                            ${
                              hoveredCard === update.id
                                ? "text-[#4DB05F]"
                                : "text-gray-400"
                            }
                            transition-colors duration-300
                          `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accent line */}
                  <div
                    className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F]
                      transform origin-left transition-transform duration-300
                      ${hoveredCard === update.id ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
