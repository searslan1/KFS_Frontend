"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { setPartners, setLoading, setError } from "@/lib/slices/partnersSlice";
import type { Partner } from "@/lib/mockData";
import Image from "next/image";

export function PartnersSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { partners, loading, error } = useSelector(
    (state: RootState) => state.partners
  );

  useEffect(() => {
    const fetchPartners = async () => {
      dispatch(setLoading(true));
      try {
        // In a real application, you would fetch data from an API here
        // For now, we'll use mock data
        const mockPartners: Partner[] = [
          {
            id: "p1",
            name: "TechInvest A.Ş.",
            logoUrl: "/placeholder.svg",
          },
          {
            id: "p2",
            name: "GreenFuture Holding",
            logoUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images.jpg-wTY5QXZnF4riRKIyZQdGIy3uiQQSLL.jpeg",
          },
          {
            id: "p3",
            name: "InnoVentures Ltd.",
            logoUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-vSrcv9RK0ffwgmtJH6KxUNKS1PYLlM.png",
          },
          {
            id: "p4",
            name: "SmartCapital Yatırım",
            logoUrl: "/placeholder.svg",
          },
        ];
        dispatch(setPartners(mockPartners));
      } catch (error) {
        dispatch(setError("Paydaşlar yüklenirken bir hata oluştu."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPartners();
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f3f4f6]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
            PAYDAŞLARIMIZ
          </h2>
          <div className="w-12 h-1 bg-kfs rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="relative h-32 w-full mb-4 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={partner.logoUrl || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-800 group-hover:text-[#4DB05F] transition-colors">
                  {partner.name}
                </h3>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-kfs/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
