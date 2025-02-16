import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Şifre güncelleme işlemi burada gerçekleştirilecek
    console.log("Şifre güncelleme işlemi")
  }

  const handleEDevletVerification = () => {
    // E-Devlet doğrulama işlemi burada gerçekleştirilecek
    console.log("E-Devlet doğrulama işlemi")
  }

  const handleAccountDeletion = () => {
    // Hesap silme işlemi burada gerçekleştirilecek
    console.log("Hesap silme işlemi")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Şifre Güncelleme</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="current-password">Mevcut Şifre</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="new-password">Yeni Şifre</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Şifreyi Güncelle</Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium">E-Devlet Doğrulaması</h3>
        <p className="text-sm text-gray-500 mt-1">Hesabınızı E-Devlet ile doğrulayarak güvenliğinizi artırın.</p>
        <Button onClick={handleEDevletVerification} className="mt-2">
          E-Devlet ile Doğrula
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-medium">Hesap Girişleri</h3>
        <p className="text-sm text-gray-500 mt-1">Son hesap giriş bilgilerinizi görüntüleyin.</p>
        <ul className="mt-2 space-y-2">
          <li>İstanbul, Türkiye - 10 Haziran 2023, 15:30</li>
          <li>Ankara, Türkiye - 5 Haziran 2023, 09:15</li>
          <li>İzmir, Türkiye - 1 Haziran 2023, 18:45</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium">Hesap Silme</h3>
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Dikkat</AlertTitle>
          <AlertDescription>
            Hesabınızı silmek geri alınamaz bir işlemdir. Tüm verileriniz kalıcı olarak silinecektir.
          </AlertDescription>
        </Alert>
        <Button variant="destructive" onClick={handleAccountDeletion} className="mt-4">
          Hesabımı Sil
        </Button>
      </div>
    </div>
  )
}

