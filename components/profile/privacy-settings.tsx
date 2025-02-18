import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function PrivacySettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bildirim Tercihleri</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications">SMS Bildirimleri</Label>
            <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Gizlilik Ayarları</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="profile-visibility">Profil Görünürlüğü</Label>
            <Switch id="profile-visibility" checked={profileVisibility} onCheckedChange={setProfileVisibility} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="data-sharing">Veri Paylaşımı</Label>
            <Switch id="data-sharing" checked={dataSharing} onCheckedChange={setDataSharing} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Veri ve Gizlilik</h3>
        <p className="text-sm text-gray-500 mt-1">Kişisel verilerinizin nasıl kullanıldığını öğrenin ve yönetin.</p>
        <Button className="mt-2">Veri Raporumu İndir</Button>
      </div>

      <div>
        <h3 className="text-lg font-medium">İzinler</h3>
        <p className="text-sm text-gray-500 mt-1">Uygulamanın hangi verilerinize erişebileceğini yönetin.</p>
        <Button className="mt-2">İzinleri Yönet</Button>
      </div>
    </div>
  )
}

