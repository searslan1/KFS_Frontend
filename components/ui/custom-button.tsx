"use client";

import * as React from "react";
import { ArrowUpRight, Icon, LucideIcon } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string; // Metin artık zorunlu değil
  icon?: LucideIcon; // Lucide-react'ten gelen bir ikon tipi
  iconPosition?: "right"; // İkonun konumu
  className?: string;
  iconClassName?: string; // İkon için ekstra stil sınıfı
}

export const CustomButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(
  (
    {
      text, // Varsayılan değer kaldırıldı
      icon: IconComponent = ArrowUpRight,
      iconPosition = "right",
      className = "",
      iconClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`relative flex items-center justify-between bg-kfs hover:bg-kfshover text-white rounded-[28px] w-auto h-[50px] group transition-colors duration-200 ${className}`}
        {...props}
      >
        {text && ( // Metin varsa göster
          <span className="text-[20px] font-medium tracking-wide pl-6 pr-2">
            {text}
          </span>
        )}
        {iconPosition === "right" && (
          <div
            className={`bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0 ${iconClassName}`}
          >
            <IconComponent className="w-5 h-5 text-kfs" strokeWidth={2.5} />
          </div>
        )}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";
