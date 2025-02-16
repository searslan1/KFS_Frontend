import { User, UserSquare2, Users, Shield, Bell, Megaphone, Heart, Wallet } from "lucide-react"
import type { SidebarItem } from "@/types/profile"

export const PROFILE_MENU_ITEMS: SidebarItem[] = [
  {
    id: "profile",
    label: "Mustafa Sineci",
    icon: User,
    href: "/profile",
  },
  {
    id: "entrepreneur",
    label: "Girişimci Kayıt Formu",
    icon: UserSquare2,
    href: "/profile/entrepreneur",
  },
  {
    id: "investor",
    label: "Yatırımcı Kayıt Formu",
    icon: Users,
    href: "/profile/investor",
  },
  {
    id: "security",
    label: "Güvenlik & Girişler",
    icon: Shield,
    href: "/profile/security",
  },
  {
    id: "privacy",
    label: "Gizlilik & Bildirim",
    icon: Bell,
    href: "/profile/privacy",
  },
  {
    id: "campaigns",
    label: "Kampanyalarım",
    icon: Megaphone,
    href: "/profile/campaigns",
  },
  {
    id: "favorites",
    label: "Favorilerim",
    icon: Heart,
    href: "/profile/favorites",
  },
  {
    id: "investment",
    label: "Yatırım Hesabım",
    icon: Wallet,
    href: "/profile/investment",
  },
]

