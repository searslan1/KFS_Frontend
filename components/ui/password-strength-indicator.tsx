import React from "react";
import { motion } from "framer-motion";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const criteria = [
    { label: "8+", test: (p: string) => p.length >= 8 },
    { label: "a-z", test: (p: string) => /[a-z]/.test(p) },
    { label: "A-Z", test: (p: string) => /[A-Z]/.test(p) },
    { label: "0-9", test: (p: string) => /[0-9]/.test(p) },
    { label: "@$!", test: (p: string) => /[$@#&!]/.test(p) },
  ];

  const strength = criteria.filter((c) => c.test(password)).length;

  const getColor = (index: number) => {
    if (index < strength) {
      switch (strength) {
        case 1:
          return "bg-red-500";
        case 2:
          return "bg-orange-500";
        case 3:
          return "bg-yellow-500";
        case 4:
          return "bg-lime-500";
        case 5:
          return "bg-green-500";
        default:
          return "bg-gray-300";
      }
    }
    return "bg-white";
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-1">
        {criteria.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 w-full rounded-full ${getColor(index)}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        {criteria.map((criterion, index) => (
          <span
            key={index}
            className={
              criterion.test(password) ? "text-green-500" : "text-white"
            }
          >
            {criterion.label}
          </span>
        ))}
      </div>
    </div>
  );
}
