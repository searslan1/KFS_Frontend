import React from "react"
import { Check, X } from "lucide-react"

interface PasswordCriteriaProps {
  password: string
}

export function PasswordCriteria({ password }: PasswordCriteriaProps) {
  const criteria = [
    { label: "8+ karakter", test: (p: string) => p.length >= 8 },
    { label: "Küçük harf", test: (p: string) => /[a-z]/.test(p) },
    { label: "Büyük harf", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Rakam", test: (p: string) => /[0-9]/.test(p) },
    { label: "Özel karakter", test: (p: string) => /[$@#&!]/.test(p) },
  ]

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {criteria.map((criterion, index) => (
        <div
          key={index}
          className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            criterion.test(password) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
          }`}
        >
          {criterion.test(password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          {criterion.label}
        </div>
      ))}
    </div>
  )
}

