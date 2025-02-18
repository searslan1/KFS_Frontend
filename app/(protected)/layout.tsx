import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4">{children}</main>
      <Footer />
    </div>
  )
}

