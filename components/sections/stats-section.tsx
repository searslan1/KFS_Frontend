"use client"

import { useSelector } from "react-redux"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart, Users, TrendingUp, Award } from "lucide-react"
import type { RootState } from "@/lib/store"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

const iconMap: { [key: string]: React.ReactNode } = {
  BarChart: <BarChart className="h-6 w-6" />,
  Award: <Award className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
}

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

export function StatsSection() {
  const stats = useSelector((state: RootState) => state.stats.stats)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="stats" ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-[#f3f4f6]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center mb-2 bg-gradient-to-r from-[#4DB05F] to-[#3B6C8F] bg-clip-text text-transparent">
          RAKAMLARLA ARDVENTURE
        </h2>
        <div className="w-12 h-1 bg-[#4DB05F] rounded-full mx-auto mb-12" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card text-card-foreground rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              <motion.div
                className="text-[#4DB05F] mb-4"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + 0.2 }}
              >
                {stat.icon === "BarChart" && <BarChart size={56} />}
                {stat.icon === "Award" && <Award size={56} />}
                {stat.icon === "Users" && <Users size={56} />}
                {stat.icon === "TrendingUp" && <TrendingUp size={56} />}
              </motion.div>
              <motion.h3
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 + 0.4 }}
              >
                {inView ? (
                  <CountUp
                    start={0}
                    end={Number.parseFloat(stat.value.replace(/[^0-9.-]+/g, ""))}
                    duration={2}
                    separator=","
                    decimals={stat.value.includes(".") ? 1 : 0}
                    suffix={stat.value.includes("%") ? "%" : ""}
                    prefix={stat.value.includes("₺") ? "₺" : ""}
                  />
                ) : (
                  "0"
                )}
              </motion.h3>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 + 0.6 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

