"use client";

import { useSelector } from "react-redux";
import { BarChart, Lock, Users } from "lucide-react";
import type { RootState } from "@/lib/store";

const iconMap: { [key: string]: React.ReactNode } = {
  Lock: <Lock className="h-12 w-12 mx-auto" />,
  BarChart: <BarChart className="h-12 w-12 mx-auto" />,
  Users: <Users className="h-12 w-12 mx-auto" />,
};

export function FeaturesSection() {
  const features = useSelector((state: RootState) => state.features.features);

  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-[#f2f6fa]"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-kfs to-[#3B6C8F] bg-clip-text text-transparent">
              NEDEN ARDVENTURE?
            </h2>
            <div className="w-12 h-1 bg-kfs rounded-full mx-auto mb-4" />
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Modern ve güvenli kitle fonlama platformumuz ile projelere yatırım
              yapmanın veya fon toplamanın avantajları
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={iconMap[feature.icon]}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col justify-center space-y-4">
      {icon}
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
}
