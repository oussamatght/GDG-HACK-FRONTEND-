"use client"

import { motion } from "framer-motion"
import type { Stage, World } from "@/lib/game-state"
import { cn } from "@/lib/utils"

type StageNodeProps = {
  stage: Stage
  position: { x: number; y: number }
  world: World
  isCurrent: boolean
  onClick: () => void
  delay: number
}

export function StageNode({ stage, position, world, isCurrent, onClick, delay }: StageNodeProps) {
  const getNodeStyle = () => {
    if (stage.isFinalBoss) {
      return {
        size: "w-16 h-16",
        bg: `bg-gradient-to-br from-red-600 to-red-900`,
        border: "border-4 border-red-400",
        icon: "BOSS",
      }
    }
    if (stage.isBoss) {
      return {
        size: "w-14 h-14",
        bg: `bg-gradient-to-br from-${world.theme === "hell" ? "orange" : world.theme === "ocean" ? "cyan" : world.theme === "desert" ? "yellow" : "green"}-600 to-${world.theme === "hell" ? "red" : world.theme === "ocean" ? "blue" : world.theme === "desert" ? "orange" : "emerald"}-800`,
        border: "border-4 border-yellow-400",
        icon: "MB",
      }
    }
    if (stage.locked) {
      return {
        size: "w-12 h-12",
        bg: "bg-souls-darker",
        border: "border-2 border-souls-dark",
        icon: "LOCK",
      }
    }
    if (stage.completed) {
      return {
        size: "w-12 h-12",
        bg: "bg-souls-dark",
        border: `border-2`,
        borderColor: world.colorPalette.primary,
        icon: String(stage.id),
      }
    }
    return {
      size: "w-12 h-12",
      bg: "bg-souls-dark",
      border: "border-2 border-souls-light/30",
      icon: String(stage.id),
    }
  }

  const style = getNodeStyle()

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x - 24,
        top: position.y - 24,
        zIndex: stage.isBoss || stage.isFinalBoss ? 20 : 10,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.button
        onClick={onClick}
        disabled={stage.locked}
        className={cn(
          "relative flex items-center justify-center font-mono text-xs uppercase",
          style.size,
          style.bg,
          style.border,
          stage.locked ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
        style={{
          borderColor: style.borderColor || undefined,
          boxShadow: isCurrent ? `0 0 20px ${world.colorPalette.primary}` : "2px 2px 0px rgba(0,0,0,0.5)",
        }}
        whileHover={stage.locked ? {} : { scale: 1.1 }}
        whileTap={stage.locked ? {} : { scale: 0.95 }}
      >
        {/* Current Stage Pulse */}
        {isCurrent && (
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: world.colorPalette.primary }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        )}

        {/* Icon/Number */}
        <span
          className={cn(
            "relative z-10",
            stage.locked ? "text-souls-light/30" : "text-souls-light",
            (stage.isBoss || stage.isFinalBoss) && "font-bold text-sm",
          )}
        >
          {stage.locked ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            style.icon
          )}
        </span>
      </motion.button>

      {/* Stars Display */}
      {stage.completed && !stage.isBoss && !stage.isFinalBoss && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-0.5">
          {[1, 2, 3].map((star) => (
            <motion.span
              key={star}
              className={cn("text-xs", star <= stage.stars ? "text-yellow-400" : "text-souls-dark")}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + star * 0.1 }}
            >
              *
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
