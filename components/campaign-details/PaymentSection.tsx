import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Info,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  Wallet,
  BanknoteIcon as Bank,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PaymentMetrics {
  targetFunding: number;
  additionalFunding: number;
  fundingLimit: string;
  investorCount: number;
  totalInvestment: number;
  shareRatio: number;
  averageInvestment: number;
  highestInvestment: number;
  qualifiedInvestorCount: number;
  qualifiedInvestmentRatio: number;
  fundingStartDate: string;
  fundingEndDate: string;
}

const mockMetrics: PaymentMetrics = {
  targetFunding: 25000000,
  additionalFunding: 5000000,
  fundingLimit: "Yok",
  investorCount: 652,
  totalInvestment: 8504625,
  shareRatio: 10.3,
  averageInvestment: 13043,
  highestInvestment: 518150,
  qualifiedInvestorCount: 240,
  qualifiedInvestmentRatio: 47.26,
  fundingStartDate: "26.12.2024",
  fundingEndDate: "09.02.2025",
};

const quickAmounts = [
  { value: 1000, label: "₺ 1.000" },
  { value: 5000, label: "₺ 5.000" },
  { value: 10000, label: "₺ 10.000" },
  { value: 20000, label: "₺ 20.000" },
  { value: 50000, label: "₺ 50.000" },
  { value: 100000, label: "₺ 100.000" },
];

export function PaymentSection() {
  const [amount, setAmount] = useState<number>(0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value);
  };

  const progress =
    (mockMetrics.totalInvestment / mockMetrics.targetFunding) * 100;

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Hedeflenen Fonlama"
          value={formatCurrency(mockMetrics.targetFunding)}
          icon={TrendingUp}
        />
        <MetricCard
          label="Ek Fonlama"
          value={formatCurrency(mockMetrics.additionalFunding)}
          icon={TrendingUp}
          tooltip="Ek fonlama miktarı"
        />
        <MetricCard
          label="Fonlama Sınırı"
          value={mockMetrics.fundingLimit}
          icon={TrendingUp}
          tooltip="Maksimum fonlama sınırı"
        />
        <MetricCard
          label="Yatırımcı Sayısı"
          value={mockMetrics.investorCount.toString()}
          icon={Users}
        />
      </div>

      {/* Middle Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Alınan Toplam Yatırım"
          value={formatCurrency(mockMetrics.totalInvestment)}
          icon={Wallet}
          progress={progress}
        />
        <MetricCard
          label="Pay Arz Oranı"
          value={`% ${mockMetrics.shareRatio}`}
          icon={TrendingUp}
          tooltip="Toplam pay arz oranı"
        />
        <MetricCard
          label="Ortalama Yatırım"
          value={formatCurrency(mockMetrics.averageInvestment)}
          icon={TrendingUp}
        />
        <MetricCard
          label="En Yüksek Yatırım"
          value={formatCurrency(mockMetrics.highestInvestment)}
          icon={TrendingUp}
        />
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Nitelikli Yatırımcı"
          value={mockMetrics.qualifiedInvestorCount.toString()}
          icon={Users}
        />
        <MetricCard
          label="Nitelikli Yatırım Oranı"
          value={`% ${mockMetrics.qualifiedInvestmentRatio}`}
          icon={TrendingUp}
        />
        <MetricCard
          label="Fonlama Başlangıç"
          value={mockMetrics.fundingStartDate}
          icon={Calendar}
        />
        <MetricCard
          label="Fonlama Bitiş"
          value={mockMetrics.fundingEndDate}
          icon={Calendar}
          tooltip="Son yatırım tarihi"
        />
      </div>

      {/* Investment Input Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Yatırım Yap</h3>
              <p className="text-sm text-gray-500">
                Yatırım tutarını belirleyin
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-[200px]"
                min={0}
                step={1000}
              />
              <span className="text-sm font-medium">₺</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount.value}
                variant="outline"
                onClick={() => handleQuickAmount(quickAmount.value)}
                className={cn(
                  "transition-all",
                  amount === quickAmount.value &&
                    "bg-kfs text-white hover:bg-kfshover/90"
                )}
              >
                {quickAmount.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                Yapacağınız ödemeler fonlama sonuna kadar İstanbul Takas ve
                Saklama Bankası A.Ş'nde saklanacaktır.
              </AlertDescription>
            </Alert>

            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Ödemeyi yapacağınız kredi kartı veya banka hesabı kendi adınıza
                olmalıdır.
              </AlertDescription>
            </Alert>

            <Button
              size="lg"
              className="w-full bg-kfs hover:bg-kfshover/90 text-white"
            >
              <Bank className="w-4 h-4 mr-2" />
              Yatırım Yap
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  tooltip?: string;
  progress?: number;
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tooltip,
  progress,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{label}</span>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Icon className="w-4 h-4 text-[#4DB05F]" />
          </div>
          <div className="text-xl font-bold">{value}</div>
          {progress !== undefined && (
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">
                {progress.toFixed(1)}% tamamlandı
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
