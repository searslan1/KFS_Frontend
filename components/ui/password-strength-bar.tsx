import React from "react"
import { motion } from "framer-motion"

interface PasswordStrengthBarProps {
  strength: number
}

export function PasswordStrengthBar({ strength }: PasswordStrengthBarProps) {
  const getColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-lime-500"
      case 5:
        return "bg-green-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${getColor(strength)}`}
        initial={{ width: 0 }}
        animate={{ width: `${(strength / 5) * 100}%` }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

