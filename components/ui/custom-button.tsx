"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ text = "GİRİŞ YAP", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="relative flex items-center justify-between bg-[#4DB05F] hover:bg-[#366a40] text-white rounded-[28px] h-[40px] group transition-colors duration-200"
        {...props}
      >
        <span className="text-[20px] font-medium tracking-wide pl-6 pr-2">{text}</span>
        <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
          <ArrowUpRight className="w-5 h-5 text-[#4DB05F]" strokeWidth={2.5} />
        </div>
      </button>
    )
  },
)

CustomButton.displayName = "CustomButton"

