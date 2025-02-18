"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const sections = [
  { id: "hero", name: "Ana Sayfa" },
  { id: "project-showcase", name: "Projeler" },
  { id: "featured-campaigns", name: "Öne Çıkanlar" },
  { id: "stats", name: "İstatistikler" },
  { id: "upcoming-campaigns", name: "Yakında" },
  { id: "success-club", name: "Başaranlar" },
  { id: "features", name: "Özellikler" },
  { id: "about", name: "Hakkımızda" },
  { id: "partners", name: "Partnerler" },
  { id: "subsidiaries", name: "İştirakler" },
];

export function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return isMobile ? null : (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <ul className="flex flex-col items-end space-y-6">
        {sections.map((section) => (
          <li key={section.id} className="relative">
            <button
              onClick={() => handleClick(section.id)}
              className={`text-xs font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? "text-[#4DB05F]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {section.name}
            </button>
            {activeSection === section.id && (
              <motion.div
                className="absolute right-0 top-1/2 w-8 h-0.5 bg-kfs transform -translate-y-1/2"
                layoutId="activeSection"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
