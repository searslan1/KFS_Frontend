import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SecuritySettings } from "./security-settings"
import { PrivacySettings } from "./privacy-settings"
import { InvestmentSettings } from "./investment-settings"

const tabs = [
  { id: "security", label: "Güvenlik & Girişler" },
  { id: "privacy", label: "Gizlilik & Bildirim" },
  { id: "investment", label: "Yatırım Hesabım" },
]

export function SettingsPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("security")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Ayarlar</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r p-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`w-full justify-start mb-2 ${activeTab === tab.id ? "bg-[#4DB05F] text-white" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div className="w-2/3 p-4 overflow-auto">
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "privacy" && <PrivacySettings />}
            {activeTab === "investment" && <InvestmentSettings />}
          </div>
        </div>
      </Card>
    </div>
  )
}

