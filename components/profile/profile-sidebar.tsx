"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PROFILE_MENU_ITEMS } from "@/lib/constants/profile-menu"

export function ProfileSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
      <nav className="space-y-2">
        {PROFILE_MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-[#4DB05F] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-[#4DB05F]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

