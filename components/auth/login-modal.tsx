"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUser, setLoading, setError } from "@/lib/slices/authSlice";
import { useLanguage } from "@/contexts/language-context";
import { LinkedinIcon, GoogleIcon, AppleIcon } from "@/components/icons";
import { SocialButton } from "./social-button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
}: LoginModalProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setLoading(true));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(setUser({ id: "1", name: "Test Kullanıcı", email }));
      // Set login cookie
      document.cookie = "isLoggedIn=true; path=/; max-age=3600";
      onClose();
      router.push("/profile");
    } catch (error) {
      dispatch(setError("Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-4 border-[#4DB05F] rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {t("login")}
          </DialogTitle>
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
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <SocialButton
              icon={<LinkedinIcon className="w-6 h-6 text-[#4DB05F]" />}
              onClick={() => console.log("LinkedIn login")}
            />
            <SocialButton
              icon={<GoogleIcon className="w-6 h-6 text-[#4DB05F]" />}
              onClick={() => console.log("Google login")}
            />
            <SocialButton
              icon={<AppleIcon className="w-6 h-6 text-[#4DB05F]" />}
              onClick={() => console.log("Apple login")}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-kfs hover:bg-kfshover/90 rounded-xl h-12"
          >
            {t("login")}
          </Button>
          <p className="text-center text-sm">
            {t("noAccount")}{" "}
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-[#4DB05F] hover:underline"
            >
              {t("register")}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
