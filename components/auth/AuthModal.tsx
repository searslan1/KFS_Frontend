"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUser, setLoading, setError } from "@/lib/slices/authSlice";
import { useLanguage } from "@/contexts/language-context";
import { LinkedinIcon, GoogleIcon, AppleIcon } from "@/components/icons";
import { SocialButton } from "./social-button";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import { CustomButton } from "@/components/ui/custom-button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setLoading(true));
    try {
      if (isLogin) {
        // Simule edilmiş login API çağrısı
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setUser({ id: "1", name: "Test Kullanıcı", email }));
        // Giriş çerezi ayarla
        document.cookie = "isLoggedIn=true; path=/; max-age=3600";
        onClose();
        router.push("/profile");
      } else {
        // Simule edilmiş kayıt API çağrısı
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setUser({ id: "1", name: "Test Kullanıcı", email }));
        // Giriş çerezi ayarla
        document.cookie = "isLoggedIn=true; path=/; max-age=3600";
        onClose();
        router.push("/profile");
      }
    } catch (error) {
      dispatch(setError(isLogin ? "Giriş başarısız" : "Kayıt başarısız"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white">
        <div className="flex h-[600px] relative">
          {/* X Kapatma Butonu */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white text-xl font-bold p-2"
          >
            ✕
          </button>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#79e08c] to-[#4d96ca]"
            initial={false}
            animate={{
              clipPath: isLogin
                ? "circle(1000% at 100% 50%)"
                : "circle(1000% at 0% 50%)",
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          />
          
          {/* Sol Panel */}
          <div className="w-1/2 p-8 flex flex-col justify-center items-center relative z-10">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="loginInfo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Hoş Geldiniz
                  </h2>
                  <p className="mb-6 text-white">
                    Hesabınız yok mu? Hemen kaydolun ve fırsatları kaçırmayın!
                  </p>
                  <div className="flex justify-center">
                    <CustomButton onClick={toggleAuthMode} text="Kayıt Ol" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="registerInfo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Merhaba!
                  </h2>
                  <p className="mb-6 text-white">
                    Zaten hesabınız var mı? Hemen giriş yapın!
                  </p>
                  <div className="flex justify-center">
                    <CustomButton onClick={toggleAuthMode} text="Giriş Yap" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sağ Panel */}
          <div className="w-1/2 p-8 flex flex-col justify-center items-center relative z-10">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="loginForm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md"
                >
                  <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    {t("login")}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder={t("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/20 border-transparent focus:border-white focus:ring-white text-white placeholder-white/70"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-10 bg-white/20 border-transparent focus:border-white focus:ring-white text-white placeholder-white/70"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-white text-[#4DB05F] hover:bg-gray-100"
                    >
                      {isLogin ? t("login") : t("register")}
                    </Button>
                  </form>
                  <div className="mt-4 flex justify-center space-x-4">
                    <SocialButton
                      icon={<LinkedinIcon className="w-6 h-6 text-[#4DB05F]" />}
                      onClick={() => console.log("LinkedIn ile giriş")}
                    />
                    <SocialButton
                      icon={<GoogleIcon className="w-6 h-6 text-[#4DB05F]" />}
                      onClick={() => console.log("Google ile giriş")}
                    />
                    <SocialButton
                      icon={<AppleIcon className="w-6 h-6 text-[#4DB05F]" />}
                      onClick={() => console.log("Apple ile giriş")}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="registerForm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md"
                >
                  <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    {t("register")}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder={t("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/20 border-transparent focus:border-white focus:ring-white text-white placeholder-white/70"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-10 bg-white/20 border-transparent focus:border-white focus:ring-white text-white placeholder-white/70"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("confirmPassword")}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pr-10 bg-white/20 border-transparent focus:border-white focus:ring-white text-white placeholder-white/70"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <PasswordStrengthIndicator password={password} />
                    <Button
                      type="submit"
                      className="w-full bg-white text-[#4DB05F] hover:bg-gray-100"
                    >
                      {isLogin ? t("login") : t("register")}
                    </Button>
                  </form>
                  <div className="mt-4 flex justify-center space-x-4">
                    <SocialButton
                      icon={<LinkedinIcon className="w-6 h-6 text-[#4DB05F]" />}
                      onClick={() => console.log("LinkedIn ile kayıt")}
                    />
                    <SocialButton
                      icon={<GoogleIcon className="w-6 h-6 text-[#4DB05F]" />}
                      onClick={() => console.log("Google ile kayıt")}
                    />
                    <SocialButton
                      icon={<AppleIcon className="w-6 h-6 text-[#4DB05F]" />}
                      onClick={() => console.log("Apple ile kayıt")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
