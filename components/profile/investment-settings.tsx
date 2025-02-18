import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InvestmentSettings() {
  const [bankName, setBankName] = useState("")
  const [iban, setIban] = useState("")
  const [investmentStrategy, setInvestmentStrategy] = useState("")

  const handleBankInfoUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Banka bilgilerini güncelleme işlemi
    console.log("Banka bilgileri güncellendi")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Banka Bilgileri</h3>
        <form onSubmit={handleBankInfoUpdate} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="bank-name">Banka Adı</Label>
            <Input id="bank-name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="iban">IBAN</Label>
            <Input id="iban" value={iban} onChange={(e) => setIban(e.target.value)} />
          </div>
          <Button type="submit">Banka Bilgilerini Güncelle</Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium">Yatırım Stratejisi</h3>
        <div className="mt-2">
          <Label htmlFor="investment-strategy">Tercih Ettiğiniz Yatırım Stratejisi</Label>
          <Select value={investmentStrategy} onValueChange={setInvestmentStrategy}>
            <SelectTrigger id="investment-strategy">
              <SelectValue placeholder="Bir strateji seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservative">Muhafazakar</SelectItem>
              <SelectItem value="balanced">Dengeli</SelectItem>
              <SelectItem value="aggressive">Agresif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Yatırım Limitleri</h3>
        <p className="text-sm text-gray-500 mt-1">Yatırım limitlerini ayarlayın ve yönetin.</p>
        <Button className="mt-2">Limitleri Düzenle</Button>
      </div>

      <div>
        <h3 className="text-lg font-medium">Yatırım Raporları</h3>
        <p className="text-sm text-gray-500 mt-1">Yatırım performansınızı ve geçmiş işlemlerinizi görüntüleyin.</p>
        <Button className="mt-2">Raporları Görüntüle</Button>
      </div>

      <div>
        <h3 className="text-lg font-medium">Vergi Bildirimleri</h3>
        <p className="text-sm text-gray-500 mt-1">Yıllık vergi bildirimlerinizi indirin.</p>
        <Button className="mt-2">Vergi Bildirimlerini İndir</Button>
      </div>
    </div>
  )
}

