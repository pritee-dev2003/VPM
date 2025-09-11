"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp, Clock, Target } from "lucide-react"

interface SearchStatsProps {
  totalResults: number
  searchTime: number
  averageSimilarity: number
}

export default function SearchStats({ totalResults, searchTime, averageSimilarity }: SearchStatsProps) {
  const stats = [
    {
      icon: Target,
      label: "Results Found",
      value: totalResults.toString(),
      color: "text-blue-500",
    },
    {
      icon: Clock,
      label: "Search Time",
      value: `${searchTime.toFixed(2)}s`,
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      label: "Avg. Similarity",
      value: `${Math.round(averageSimilarity * 100)}%`,
      color: "text-purple-500",
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
