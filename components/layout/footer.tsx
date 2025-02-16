import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adventurelogo-VL0fSrKJQK3JloJmfqmbdl6dKyoep7.png"
              alt="ARDVENTURE Logo"
              width={180}
              height={40}
              priority
            />
            <p className="mt-4 text-sm text-muted-foreground">
              ARDVENTURE, yenilikçi projeleri destekleyen ve girişimcileri yatırımcılarla buluşturan öncü bir kitle
              fonlama platformudur.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-primary">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/campaigns" className="transition-colors hover:text-primary">
                    Kampanyalar
                  </Link>
                </li>
                <li>
                  <Link href="/investor" className="transition-colors hover:text-primary">
                    Yatırımcı
                  </Link>
                </li>
                <li>
                  <Link href="/entrepreneur" className="transition-colors hover:text-primary">
                    Girişimci
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Yardım</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/faq" className="transition-colors hover:text-primary">
                    Sıkça Sorulan Sorular
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-primary">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="transition-colors hover:text-primary">
                    Destek
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Yasal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-primary">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-primary">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition-colors hover:text-primary">
                    Çerez Politikası
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Bülten</h4>
              <form className="flex flex-col gap-2">
                <Input type="email" placeholder="E-posta adresiniz" />
                <Button type="submit" variant="outline">
                  Abone Ol
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">© 2025 ARDVENTURE Tüm hakları saklıdır.</div>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

