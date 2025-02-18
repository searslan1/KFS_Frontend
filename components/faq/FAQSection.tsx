"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer?: string
  userName: string
  timestamp: string
  companyName?: string
  answerTimestamp?: string
}

const mockFAQs: FAQ[] = [
  {
    id: "1",
    question:
      "Öncelikle iyi çalışmalar dilerim. Kariyer seviyesi tam olarak nedir ve ne gibi bir avantaj sağlamaktadır, bu konuya daha net bir açıklama getirebilir misiniz?",
    answer:
      "Sayın Çavuş Merhaba; İnovadi Network sisteminde, siz ve altınızdaki ekibin her ay çevireliği ciro, asıl %3 ile %23 arasında bir seviyeye tuşır ve o seviye o ay sistemden kazanacağınız ciro payını belirler. Örneğin siz ve ekibiniz bu ay 500 bin tl ciro çevirdi. Ekip kazancı seviyeniz % 20 seviyesine ulaşır ve ekip Prim cirosu üzerinden bu yüzdeye göre kazanç elde edersiniz. Bir başka ay siz ve ekibinizin toplam cirosu 50 bin tl'de kaldığını varsayalım. Bu durumda ise %12 ekip primi seviyesinde kazanç elde edersiniz. Köprü yetirım turumuzda ise, yatırım yaptığınız miktarın karşılığı olan % seviyesi alt limit olarak örnek boya sabitlir, aşağıya düşmez yukarıya çıkabilir. Bu durumda örneğin %20 seviyesine sabitlenecek miktarda bir yatırım yaptınız, siz ve ekip cironuz ne kadar olursa olsun en az %20 prim alırsınız. Saygılarımızla. #NGAYT Nogayt Endüstri Ekibi",
    userName: "Niyazi Çavuş",
    timestamp: "29.01.2025 08:52",
    companyName: "Nogayt Endüstri Kimya Arge İç ve Dış Ticaret Anonim Şirketi",
    answerTimestamp: "29.01.2025 13:30",
  },
  {
    id: "2",
    question: "Merhaba kar kolay gelsin fonlama 25.000.000 tl den 10.000.000 tl yemi düştü duyurulardan okudumdai",
    answer:
      "Sayın Karabulut merhaba; Süreç içinde gerçekleşen gelişmeler dolayısı ile ihtiyaç duyulan fonlama miktarı 10 milyon tl seviyesine düşmüştür. Bu sebeple miktarın 10 milyon tl olarak güncellenmesi için dilekçe verdik, bu talebimiz henüz neticelenmedi, olumlu olarak neticelenmesini umuyoruz. Saygılarımızla.",
    userName: "Kubilay Karabulut",
    timestamp: "27.01.2025 15:21",
    companyName: "Nogayt Endüstri Kimya Arge İç ve Dış Ticaret Anonim Şirketi",
    answerTimestamp: "28.01.2025 22:53",
  },
]

export function FAQSection() {
  const [question, setQuestion] = useState("")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle question submission
    console.log("Question submitted:", question)
    setQuestion("")
  }

  return (
    <div className="space-y-6">
      {/* Warning Box */}
      <Alert className="bg-yellow-50 border-yellow-100">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Değerli yatırımcımız, bu bölümde sadece yatırım turuna çıkan girişime yönelik sorular cevaplanmaktadır. Lütfen
          platform ya da kitle fonlama sistemi ile ilgili sorularınızı{" "}
          <a href="mailto:info@fenbahceu.com" className="text-[#4DB05F] hover:underline">
            info@fenbahceu.com
          </a>{" "}
          adresine iletiniz. Girişim ya da girişim şirketi ile ilgili olmayan sorularınız onaylanmayacaktır.
        </AlertDescription>
      </Alert>

      {/* Question Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Girişimciye soru sorun.
            </label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px]"
              placeholder="Sorunuzu buraya yazın..."
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#4DB05F] hover:bg-[#4DB05F]/90">
              <Send className="w-4 h-4 mr-2" />
              Soru Sor
            </Button>
          </div>
        </form>
      </Card>

      {/* FAQ List */}
      <div className="space-y-6">
        {mockFAQs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setHoveredCard(faq.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Question Card */}
            <Card
              className={`
                relative overflow-hidden transition-all duration-300
                hover:shadow-lg hover:border-[#4DB05F]/50
                ${hoveredCard === faq.id ? "scale-[1.01]" : "scale-100"}
              `}
            >
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{faq.userName}</h3>
                      <p className="text-sm text-gray-500">{faq.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{faq.question}</p>
                </div>
              </div>

              {/* Accent line */}
              <div
                className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F]
                  transform origin-left transition-transform duration-300
                  ${hoveredCard === faq.id ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </Card>

            {/* Answer Card (if exists) */}
            {faq.answer && (
              <Card
                className={`
                  relative overflow-hidden transition-all duration-300 ml-8 mt-4
                  hover:shadow-lg hover:border-[#4DB05F]/50
                  ${hoveredCard === faq.id ? "scale-[1.01]" : "scale-100"}
                `}
              >
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{faq.companyName}</h3>
                        <p className="text-sm text-gray-500">{faq.answerTimestamp}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>

                {/* Accent line */}
                <div
                  className={`
                    absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F]
                    transform origin-left transition-transform duration-300
                    ${hoveredCard === faq.id ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </Card>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

