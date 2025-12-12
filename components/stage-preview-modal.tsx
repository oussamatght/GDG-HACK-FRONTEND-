"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Stage, World } from "@/lib/game-state"
import { PixelButton } from "./pixel-button"
import { Stage3DPreview } from "./stage-3d-preview"
import { Skull, Clock, Star, Gift, Swords, X } from "lucide-react"

type StagePreviewModalProps = {
  stage: Stage | null
  world: World
  onClose: () => void
  onStart: () => void
}

export function StagePreviewModal({ stage, world, onClose, onStart }: StagePreviewModalProps) {
  if (!stage) return null

  const getDifficultyStars = () => {
    if (stage.isFinalBoss) return 5
    if (stage.isBoss) return 4
    return Math.min(3, Math.ceil(stage.id / 20))
  }

  const getEstimatedTime = () => {
    if (stage.isFinalBoss) return "2-4 hours"
    if (stage.isBoss) return "15-20 min"
    return "8-12 min"
  }

  const getRewards = () => {
    if (stage.isFinalBoss) {
      return { gold: "100-200", diamonds: "10-20", items: "Legendary Item" }
    }
    if (stage.isBoss) {
      return { gold: "30-50", diamonds: "1-3", items: "Rare Item (chance)" }
    }
    return { gold: "3-5", diamonds: "1 (beat timer)", items: "Common Drop" }
  }

  const rewards = getRewards()
  const difficulty = getDifficultyStars()

  return (
    <AnimatePresence>
      {stage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg bg-souls-darker border-4 border-souls-dark overflow-hidden"
            style={{ boxShadow: `0 0 40px ${world.colorPalette.primary}40` }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="p-4 border-b-4 border-souls-dark"
              style={{ backgroundColor: `${world.colorPalette.primary}20` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-souls-light/60 uppercase">
                    {stage.isFinalBoss ? "Final Boss" : stage.isBoss ? "Mini Boss" : `Stage ${stage.id}`}
                  </span>
                  <h2 className="font-mono text-xl text-souls-light uppercase tracking-wider">{stage.name}</h2>
                </div>
                <button onClick={onClose} className="text-souls-light/60 hover:text-souls-light transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="h-48 bg-souls-dark/50 border-b-4 border-souls-dark">
              <Stage3DPreview
                stageNumber={stage.id}
                color={world.colorPalette.primary}
                completed={stage.completed}
                isBoss={stage.isBoss || stage.isFinalBoss}
                className="w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Difficulty & Time */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-mono text-xs text-souls-light/60 uppercase flex items-center gap-1">
                    <Swords className="w-3 h-3" /> Difficulty
                  </span>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Skull
                        key={star}
                        className={`w-4 h-4 ${star <= difficulty ? "text-souls-red" : "text-souls-dark"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-souls-light/60 uppercase flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" /> Est. Time
                  </span>
                  <p className="font-mono text-souls-light">{getEstimatedTime()}</p>
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <span className="font-mono text-xs text-souls-light/60 uppercase">Learning Objectives</span>
                <ul className="mt-2 space-y-1">
                  <li className="font-mono text-sm text-souls-light flex items-center gap-2">
                    <span style={{ color: world.colorPalette.primary }}>{">"}</span>
                    {stage.isFinalBoss
                      ? "Complete a full project from roadmap.sh"
                      : stage.isBoss
                        ? "Apply learned concepts in a timed challenge"
                        : "Master fundamental concepts"}
                  </li>
                  <li className="font-mono text-sm text-souls-light flex items-center gap-2">
                    <span style={{ color: world.colorPalette.primary }}>{">"}</span>
                    Practice real-world coding scenarios
                  </li>
                </ul>
              </div>

              {/* Rewards Preview */}
              <div>
                <span className="font-mono text-xs text-souls-light/60 uppercase flex items-center gap-1">
                  <Gift className="w-3 h-3" /> Rewards
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="bg-souls-dark p-2 text-center">
                    <div className="w-6 h-6 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-yellow-900">
                      G
                    </div>
                    <span className="font-mono text-xs text-souls-gold mt-1 block">{rewards.gold}</span>
                  </div>
                  <div className="bg-souls-dark p-2 text-center">
                    <div className="w-6 h-6 mx-auto bg-cyan-400 rotate-45 flex items-center justify-center">
                      <span className="-rotate-45 text-xs font-bold text-cyan-900">D</span>
                    </div>
                    <span className="font-mono text-xs text-cyan-400 mt-1 block">{rewards.diamonds}</span>
                  </div>
                  <div className="bg-souls-dark p-2 text-center">
                    <div className="w-6 h-6 mx-auto bg-souls-red flex items-center justify-center text-xs">?</div>
                    <span className="font-mono text-xs text-souls-light/60 mt-1 block">{rewards.items}</span>
                  </div>
                </div>
              </div>

              {/* Completed Status */}
              {stage.completed && (
                <div className="bg-green-900/30 border border-green-600 p-3 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= stage.stars ? "text-souls-gold fill-souls-gold" : "text-souls-light/30"}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-sm text-green-400">Completed - {stage.stars}/3 Stars</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t-4 border-souls-dark flex gap-3">
              <PixelButton variant="secondary" size="md" onClick={onClose} className="flex-1">
                Back
              </PixelButton>
              <PixelButton variant="primary" size="md" onClick={onStart} className="flex-1">
                {stage.completed ? "Replay" : "Start"}
              </PixelButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
