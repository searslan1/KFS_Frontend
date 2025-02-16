"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, X, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { AuthModal } from "../auth/AuthModal"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import Image from "next/image"
import { CustomButton } from "@/components/ui/custom-button"

interface HeaderProps {
  hideSearch?: boolean
  isHomePage?: boolean
  onSearch?: (term: string) => void
}

export function Header({ hideSearch = false, isHomePage = false, onSearch }: HeaderProps) {
  const { t, language, toggleLanguage } = useLanguage()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (onSearch) {
      onSearch(searchTerm)
    }
  }, [searchTerm, onSearch])

  const handleLoginClick = () => {
    setShowLoginModal(true)
    setShowRegisterModal(false)
  }

  const handleRegisterClick = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setShowSearch(false)
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-[#f3f4f6]/70 backdrop-blur-lg shadow-md" : "bg-[#f3f4f6]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between relative z-10 py-4 gap-4 h-[72px]">
        <div>
          <Link href="/" className="text-[#4DB05F] text-3xl font-bold">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adventurelogo-VL0fSrKJQK3JloJmfqmbdl6dKyoep7.png"
              alt="ARDVENTURE Logo"
              width={180}
              height={40}
              priority
            />
          </Link>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {showSearch ? (
            <motion.div
              key="search"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-[#EDEDED] rounded-full px-6 flex items-center flex-1 mx-4 max-w-xl h-[48px] flex-shrink-0"
            >
              <Search className="w-6 h-6 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder={t("search")}
                className="bg-transparent outline-none text-black w-full text-lg"
                autoFocus
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  if (onSearch) {
                    onSearch(e.target.value)
                  }
                }}
              />
              <button onClick={handleClearSearch} className="ml-3 text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          ) : (
            <motion.nav
              key="nav"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-transparent rounded-full px-8 flex items-center mx-4 h-[48px] flex-shrink-0"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className={`transition-colors font-medium text-lg ${
                      router.pathname === "/" ? "text-[#4DB05F]" : "text-black hover:text-[#4DB05F]"
                    }`}
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href="/campaigns"
                    className={`transition-colors font-medium text-lg ${
                      router.pathname === "/campaigns" ? "text-[#4DB05F]" : "text-black hover:text-[#4DB05F]"
                    }`}
                  >
                    {t("campaigns")}
                  </Link>
                  <Link
                    href="/investor"
                    className={`transition-colors font-medium text-lg ${
                      router.pathname === "/investor" ? "text-[#4DB05F]" : "text-black hover:text-[#4DB05F]"
                    }`}
                  >
                    {t("investor").toUpperCase()}
                  </Link>
                  <Link
                    href="/entrepreneur"
                    className={`transition-colors font-medium text-lg ${
                      router.pathname === "/entrepreneur" ? "text-[#4DB05F]" : "text-black hover:text-[#4DB05F]"
                    }`}
                  >
                    {t("entrepreneur").toUpperCase()}
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  {!hideSearch && !isHomePage && (
                    <button
                      onClick={() => setShowSearch(true)}
                      className="text-black hover:text-[#4DB05F] transition-colors font-medium text-lg"
                    >
                      {t("search")}
                    </button>
                  )}
                  <button
                    onClick={toggleLanguage}
                    className="text-black hover:text-[#4DB05F] transition-colors font-medium text-lg"
                  >
                    {language === "tr" ? "EN" : "TR"}
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        <div>
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="bg-[#4DB05F] hover:bg-[#4DB05F]/90 text-white rounded-full px-8 py-4 flex items-center gap-4 text-xl h-[40px] pr-4"
            >
              {t("profile")}
              <div className="bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-[#4DB05F]" />
              </div>
            </Link>
          ) : (
            <CustomButton onClick={() => setShowAuthModal(true)} />
          )}
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    </header>
  )
}

