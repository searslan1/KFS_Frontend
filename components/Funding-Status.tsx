import React from "react";

interface FundingStatusProps {
  targetLabel: string;
  targetAmount: number;
  currentAmount: number;
  progress: number;
}

export const FundingStatus: React.FC<FundingStatusProps> = ({
  targetLabel,
  targetAmount,
  currentAmount,
  progress,
}) => {
  return (
    <div className="bg-[#EDEDED] rounded-xl p-4 mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-black">{targetLabel}</span>
        <span className="text-sm font-bold">
          ₺ {targetAmount.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-[#E5E5E5] rounded-full h-6 mb-2 relative overflow-hidden">
        <div
          className="bg-gradient-to-r from-kfs via-black to-kfs h-full rounded-full flex items-center justify-end pr-2 relative"
          style={{
            width: `${Math.max(progress, 20)}%`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        >
          <span className="text-white text-xs font-bold truncate relative z-1">
            ₺ {currentAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
