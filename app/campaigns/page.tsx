"use client";

import { useState } from "react";
import { CampaignCard } from "@/components/campaign-card";
import { allCampaigns } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type SortOption = "fundingAsc" | "fundingDesc" | "dateAsc" | "dateDesc";
type FundingStatus = "all" | "active" | "completed" | "upcoming";

export default function CampaignsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [fundingRange, setFundingRange] = useState([0, 1000000]);
  const [sortOption, setSortOption] = useState<SortOption>("fundingAsc");
  const [fundingStatus, setFundingStatus] = useState<FundingStatus>("all");
  const [fundingProgress, setFundingProgress] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredCampaigns = allCampaigns
    .filter(
      (campaign) =>
        (selectedSectors.length === 0 ||
          selectedSectors.includes(campaign.sector)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(campaign.category)) &&
        campaign.currentAmount >= fundingRange[0] &&
        campaign.currentAmount <= fundingRange[1] &&
        (fundingStatus === "all" ||
          campaign.campaign_status === fundingStatus) &&
        (fundingProgress === "all" ||
          (fundingProgress === "0-25" &&
            campaign.currentAmount / campaign.goalAmount <= 0.25) ||
          (fundingProgress === "26-50" &&
            campaign.currentAmount / campaign.goalAmount > 0.25 &&
            campaign.currentAmount / campaign.goalAmount <= 0.5) ||
          (fundingProgress === "51-75" &&
            campaign.currentAmount / campaign.goalAmount > 0.5 &&
            campaign.currentAmount / campaign.goalAmount <= 0.75) ||
          (fundingProgress === "76-100" &&
            campaign.currentAmount / campaign.goalAmount > 0.75)) &&
        (campaign.campaign_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          campaign.campaign_description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "fundingAsc":
          return a.currentAmount - b.currentAmount;
        case "fundingDesc":
          return b.currentAmount - a.currentAmount;
        case "dateAsc":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "dateDesc":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        default:
          return 0;
      }
    });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtreleme Bölümü */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-[72px] z-10">
              <h2 className="text-xl font-semibold mb-4">Detaylı Filtreler</h2>
              <Accordion
                type="multiple"
                defaultValue={["sector", "category", "funding-range"]}
                className="w-full"
              >
                <AccordionItem value="sector">
                  <AccordionTrigger>Sektör</AccordionTrigger>
                  <AccordionContent>
                    {["Teknoloji", "Sağlık", "Eğitim", "Finans", "Enerji"].map(
                      (sector) => (
                        <div key={sector} className="flex items-center mb-2">
                          <Checkbox
                            id={`sector-${sector}`}
                            checked={selectedSectors.includes(sector)}
                            onCheckedChange={(checked) => {
                              setSelectedSectors((prev) =>
                                checked
                                  ? [...prev, sector]
                                  : prev.filter((s) => s !== sector)
                              );
                            }}
                          />
                          <label
                            htmlFor={`sector-${sector}`}
                            className="ml-2 text-sm"
                          >
                            {sector}
                          </label>
                        </div>      
                      )
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="category">
                  <AccordionTrigger>Kategori</AccordionTrigger>
                  <AccordionContent>
                    {[
                      "Yazılım",
                      "Biyoteknoloji",
                      "Yenilenebilir Enerji",
                      "E-ticaret",
                      "Yapay Zeka",
                    ].map((category) => (
                      <div key={category} className="flex items-center mb-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            setSelectedCategories((prev) =>
                              checked
                                ? [...prev, category]
                                : prev.filter((c) => c !== category)
                            );
                          }}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="funding-range">
                  <AccordionTrigger>Fonlama Aralığı</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={fundingRange}
                      onValueChange={setFundingRange}
                      min={0}
                      max={1000000}
                      step={10000}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{fundingRange[0]} ₺</span>
                      <span>{fundingRange[1]} ₺</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Kampanya Listesi */}
          <div className="lg:w-3/4">
            {/* Hızlı Filtreleme Barı */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center gap-4 sticky top-[72px] z-20">
              <div className="flex items-center w-full mb-4">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <Input
                  type="text"
                  placeholder="Kampanya ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <Select
                onValueChange={(value) => setSortOption(value as SortOption)}
                defaultValue="fundingAsc"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundingAsc">
                    Fonlama: Azdan Çoğa
                  </SelectItem>
                  <SelectItem value="fundingDesc">
                    Fonlama: Çoktan Aza
                  </SelectItem>
                  <SelectItem value="dateAsc">Tarih: Eskiden Yeniye</SelectItem>
                  <SelectItem value="dateDesc">
                    Tarih: Yeniden Eskiye
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setFundingStatus(value as FundingStatus)
                }
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Fonlama Durumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="upcoming">Yakında</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => setFundingProgress(value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Fonlama İlerlemesi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="0-25">%0 - %25</SelectItem>
                  <SelectItem value="26-50">%26 - %50</SelectItem>
                  <SelectItem value="51-75">%51 - %75</SelectItem>
                  <SelectItem value="76-100">%76 - %100</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="mr-2 h-4 w-4" /> Detaylı Filtreler
              </Button>
            </div>

            {/* Mobil Filtreleme */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Detaylı Filtreler
                </h2>
                <Input
                  type="text"
                  placeholder="Kampanya ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow z-10"
                />
                <Accordion
                  type="multiple"
                  defaultValue={["sector", "category", "funding-range"]}
                  className="w-full"
                >
                  <AccordionItem value="sector">
                    <AccordionTrigger>Sektör</AccordionTrigger>

                    <AccordionContent>
                      {[
                        "Teknoloji",
                        "Sağlık",
                        "Eğitim",
                        "Finans",
                        "Enerji",
                      ].map((sector) => (
                        <div key={sector} className="flex items-center mb-2">
                          <Checkbox
                            id={`mobile-sector-${sector}`}
                            checked={selectedSectors.includes(sector)}
                            onCheckedChange={(checked) => {
                              setSelectedSectors((prev) =>
                                checked
                                  ? [...prev, sector]
                                  : prev.filter((s) => s !== sector)
                              );
                            }}
                          />
                          <label
                            htmlFor={`mobile-sector-${sector}`}
                            className="ml-2 text-sm"
                          >
                            {sector}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="category">
                    <AccordionTrigger>Kategori</AccordionTrigger>
                    <AccordionContent>
                      {[
                        "Yazılım",
                        "Biyoteknoloji",
                        "Yenilenebilir Enerji",
                        "E-ticaret",
                        "Yapay Zeka",
                      ].map((category) => (
                        <div key={category} className="flex items-center mb-2">
                          <Checkbox
                            id={`mobile-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              setSelectedCategories((prev) =>
                                checked
                                  ? [...prev, category]
                                  : prev.filter((c) => c !== category)
                              );
                            }}
                          />
                          <label
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="funding-range">
                    <AccordionTrigger>Fonlama Aralığı</AccordionTrigger>
                    <AccordionContent>
                      <Slider
                        value={fundingRange}
                        onValueChange={setFundingRange}
                        min={0}
                        max={1000000}
                        step={10000}
                        className="mt-2 "
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{fundingRange[0]} ₺</span>
                        <span>{fundingRange[1]} ₺</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {filteredCampaigns.length === 0 ? (
              <p className="text-center text-lg text-gray-600">
                Aradığınız kriterlere uygun kampanya bulunamadı.
                <div className="h-80 w-80 flex justify-center items-center mx-auto">
                  <img src="/png.png" />
                </div>
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
