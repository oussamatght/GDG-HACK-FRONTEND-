"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ChallengeTimerProps = {
  initialSeconds: number
  onTimeUp: () => void
  isPaused?: boolean
}

export function ChallengeTimer({ initialSeconds, onTimeUp, isPaused = false }: ChallengeTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (isPaused || seconds <= 0) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, seconds, onTimeUp])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const percentage = (seconds / initialSeconds) * 100
  const isLow = percentage <= 25

  return (
    <motion.div
      className={cn(
        "flex items-center gap-3 px-4 py-2 bg-souls-dark border-2",
        isLow ? "border-red-500" : "border-souls-darker",
      )}
      animate={isLow ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5, repeat: isLow ? Number.POSITIVE_INFINITY : 0 }}
    >
      <svg className="w-5 h-5" fill="none" stroke={isLow ? "#EF4444" : "#888"} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className="flex-1">
        <div className="w-32 h-2 bg-souls-darker">
          <motion.div
            className={cn("h-full", isLow ? "bg-red-500" : "bg-souls-red")}
            initial={{ width: "100%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <span className={cn("font-mono text-lg tabular-nums", isLow ? "text-red-400" : "text-souls-light")}>
        {String(minutes).padStart(2, "0")}:{String(remainingSeconds).padStart(2, "0")}
      </span>
    </motion.div>
  )
}
