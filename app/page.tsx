"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { SuccessClub } from "@/components/sections/success-club";
import { FeaturesSection } from "@/components/sections/features-section";
import { AboutSection } from "@/components/sections/about-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { UpcomingCampaigns } from "@/components/sections/upcoming-campaigns";
import { PartnersSection } from "@/components/sections/partners-section";
import { SubsidiariesSection } from "@/components/sections/subsidiaries-section";
import { VerticalNavigation } from "@/components/circular-navigation";
import { CampaignCard } from "@/components/campaign-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { RootState, AppDispatch } from "@/lib/store";
import { setFeaturedCampaigns } from "@/lib/slices/campaignsSlice";
import { allCampaigns } from "@/lib/mockData";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredCampaigns } = useSelector(
    (state: RootState) => state.campaigns
  );
  const { t } = useLanguage();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setFeaturedCampaigns(allCampaigns.slice(0, 4)));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <VerticalNavigation />
        <section id="hero">
          <HeroSection />
        </section>
        <section id="project-showcase">
          <ProjectShowcase />
        </section>
        <section
          id="featured-campaigns"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#f2f6fa]"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-kfs to-[#3B6C8F] bg-clip-text text-transparent">
              {t("featuredCampaigns")}
            </h2>
            <div className="w-12 h-1 bg-kfs rounded-full mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/campaigns">
                <Button
                  variant="outline"
                  className="h-[48px] px-8 bg-kfs text-white hover:bg-kfshover/90 rounded-xl"
                >
                  {t("viewMore")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="upcoming-campaigns">
          <UpcomingCampaigns />
        </section>
        <section id="success-club">
          <SuccessClub />
        </section>
        {!isAuthenticated ? (
          <>
            <section id="stats">
              <StatsSection />
            </section>
            <section id="features">
              <FeaturesSection />
            </section>
            <section id="about">
              <AboutSection />
            </section>
            <section id="partners">
              <PartnersSection />
            </section>
            <section id="subsidiaries">
              <SubsidiariesSection />
            </section>
            <CTASection />
          </>
        ) : null}
      </main>
    </div>
  );
}
