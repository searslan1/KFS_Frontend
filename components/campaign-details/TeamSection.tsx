import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Phone } from "lucide-react"

export const TeamSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Ekibimiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                name: "Muhammet Barış Sütçü",
                role: "Kurucu Girişimci / Ekip Lideri",
                image: "/placeholder.svg",
                linkedin: "#",
                email: "baris@example.com",
                phone: "+90 555 555 55 55",
              },
              // ... (other team members)
            ].map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Profile Image Container */}
                <div className="relative w-full pt-[100%] bg-gray-100">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay with social links */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-[#4DB05F] hover:bg-white"
                        onClick={() => window.open(member.linkedin, "_blank")}
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-[#4DB05F] hover:bg-white"
                        onClick={() => (window.location.href = `mailto:${member.email}`)}
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-[#4DB05F] hover:bg-white"
                        onClick={() => (window.location.href = `tel:${member.phone}`)}
                      >
                        <Phone className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Info Section */}
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Stats Section */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Takım Üyeleri", value: "9+" },
          { label: "Ortalama Deneyim", value: "5+ Yıl" },
          { label: "Başarılı Projeler", value: "50+" },
          { label: "Mutlu Müşteriler", value: "100+" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#4DB05F] mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

