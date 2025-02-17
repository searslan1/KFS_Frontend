import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-6 w-6 text-kfs" />,
    title: "Güvenli ve Yasal",
    description:
      "SPK lisanslı platformumuz, yatırımlarınızı güvence altına alır.",
  },
  {
    icon: <Zap className="h-6 w-6 text-kfs" />,
    title: "Hızlı ve Kolay",
    description:
      "Kullanıcı dostu arayüzümüz ile hızlıca yatırım yapın veya fon toplayın.",
  },
  {
    icon: <Users className="h-6 w-6 text-kfs" />,
    title: "Geniş Ağ",
    description:
      "Binlerce yatırımcı ve girişimciden oluşan aktif topluluğumuza katılın.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-kfs" />,
    title: "Yüksek Potansiyel",
    description:
      "Geleceğin unicorn'larına erken aşamada yatırım yapma fırsatı.",
  },
];

export function WhyUsSection() {
  return null;
}
