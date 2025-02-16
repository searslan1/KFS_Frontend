import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-background flex justify-center">
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
              ARDVENTURE, yenilikçi projeleri destekleyen ve girişimcileri
              yatırımcılarla buluşturan öncü bir kitle fonlama platformudur.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/campaigns"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Kampanyalar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investor"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Yatırımcı
                  </Link>
                </li>
                <li>
                  <Link
                    href="/entrepreneur"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Girişimci
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Yardım</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/faq"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Sıkça Sorulan Sorular
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Destek
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Yasal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="transition-colors hover:text-[#4DB05F]"
                  >
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
          <div className="text-sm text-muted-foreground">
            © 2025 ARDVENTURE Tüm hakları saklıdır.
          </div>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-[#4DB05F]"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-[#4DB05F]"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-[#4DB05F]"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-[#4DB05F]"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
