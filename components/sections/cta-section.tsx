"use client"

import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import type { RootState, AppDispatch } from "@/lib/store"
import { setUser } from "@/lib/slices/authSlice"
import { updateCTA } from "@/lib/slices/ctaSlice"

export function CTASection() {
  const dispatch = useDispatch<AppDispatch>()
  const { title, description, buttonText } = useSelector((state: RootState) => state.cta)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const handleCTAClick = () => {
    if (isAuthenticated) {
      // Redirect to dashboard or show personalized content
      dispatch(
        updateCTA({
          title: `Hoş geldiniz, ${user?.name}!`,
          description: "Kampanyaları keşfetmeye devam edin",
          buttonText: "Kampanyaları Gör",
        }),
      )
    } else {
      // Show login/signup modal
      // For now, let's just simulate a login
      dispatch(setUser({ id: "1", name: "Test User", email: "test@example.com" }))
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{title}</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="w-full min-[400px]:w-auto" onClick={handleCTAClick}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

