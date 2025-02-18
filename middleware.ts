import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Profil sayfası için olan korumayı kaldırdık
  // Eğer başka korumalı sayfalarınız varsa, onları burada kontrol edebilirsiniz
  return NextResponse.next()
}

export const config = {
  // Profil sayfası artık korumalı değil, bu yüzden matcher'dan kaldırıldı
  matcher: ["/dashboard/:path*", "/settings/:path*"],
}

