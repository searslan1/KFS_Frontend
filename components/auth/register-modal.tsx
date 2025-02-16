"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { LinkedinIcon, GoogleIcon, AppleIcon } from "@/components/icons"
import { SocialButton } from "./social-button"
import { Eye, EyeOff } from "lucide-react"
import { calculatePasswordStrength } from "@/lib/utils/password-strength"
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick: () => void
}

export function RegisterModal({ isOpen, onClose, onLoginClick }: RegisterModalProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    //setPasswordStrength(calculatePasswordStrength(password))
  }, [password])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle registration logic here
    console.log("Registration submitted")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-4 border-[#4DB05F] rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">{t("register")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">{t("email")}</label>
            <Input
              type="email"
              placeholder="örnek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#4DB05F] rounded-xl focus:ring-0 focus:border-[#4DB05F] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-sm mb-1 block">{t("password")}</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#4DB05F] rounded-xl focus:ring-0 focus:border-[#4DB05F] focus:outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="mt-2">
              <PasswordStrengthIndicator password={password} />
            </div>
          </div>
          <div>
            <label className="text-sm mb-1 block">{t("confirmPassword")}</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-[#4DB05F] rounded-xl focus:ring-0 focus:border-[#4DB05F] focus:outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <SocialButton
              icon={<LinkedinIcon className="w-6 h-6 text-[#4DB05F]" />}
              onClick={() => console.log("LinkedIn register")}
            />
            <SocialButton
              icon={<GoogleIcon className="w-6 h-6 text-[#4DB05F]" />}
              onClick={() => console.log("Google register")}
            />
            <SocialButton
              icon={<AppleIcon className="w-6 h-6 text-[#4DB05F]" />}
              onClick={() => console.log("Apple register")}
            />
          </div>
          <Button type="submit" className="w-full bg-[#4DB05F] hover:bg-[#4DB05F]/90 rounded-xl h-12">
            {t("register")}
          </Button>
          <p className="text-center text-sm">
            {t("haveAccount")}{" "}
            <button type="button" onClick={onLoginClick} className="text-[#4DB05F] hover:underline">
              {t("login")}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}

